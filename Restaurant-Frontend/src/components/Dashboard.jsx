import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Bar } from 'recharts';
import totalChefs from '../assets/totalChefs.png'
import totalClients from '../assets/totalClients.png'
import totalOrdersImage from '../assets/totalOrders.png'
import totalRevenue from '../assets/totalRevenue.png'
import '../styles/Dashboard.css';

const TableCell = ({ number, available }) => (
  <div className={`tableCell ${available ? 'available' : 'unavailable'}`}>
    <div className="tableLabel">Table</div>
    <div className="tableCount">{number}</div>
  </div>
);

export default function Dashboard({searchQuery}) {
  const [tables, setTables] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [chefs, setChefs] = useState([]);
  const dashboardElements = ["TOTAL CHEFS", "TOTAL REVENUE", "TOTAL ORDERS", "TOTAL CLIENTS", "ORDER SUMMARY", "REVENUE", "TABLES"];
  const [filteredElements, setFilteredElements] = useState(["TOTAL REVENUE", "TOTAL ORDERS", "TABLES"]);
  const [selectedOrderPeriod, setSelectedOrderPeriod] = useState('daily');
  const [selectedRevenuePeriod, setSelectedRevenuePeriod] = useState('daily');
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({
    served: 0,
    dineIn: 0,
    takeAway: 0
  });
  const [revenueData, setRevenueData] = useState([]);
  const [periodRevenue, setPeriodRevenue] = useState(0);

  // console.log(searchQuery);

  useEffect(() => {
    fetchTables();
    fetchAnalytics();
    fetchChefs();
    fetchOrders();
  }, [])

  // Recalculate order stats and revenue when period changes
useEffect(() => {
  if (orders.length > 0) {
    calculateOrderStats(orders, selectedOrderPeriod);
    calculateRevenueData(orders, selectedRevenuePeriod);
  }
}, [selectedOrderPeriod, selectedRevenuePeriod, orders]);


useEffect(()=>{
  setFilteredElements(dashboardElements.filter(element => element.toLowerCase().includes(searchQuery.toLowerCase())));
},[searchQuery])

  // console.log(filteredElements);

  const fetchTables = async () => {
    const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/tables');
    const data = await response.json();
    //console.log(data)
    setTables(data);
  }

  const fetchAnalytics = async () => {
    const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/analytics');
    const data = await response.json();
    //console.log(data);
    setAnalytics(data);
  }

  const fetchChefs = async () => {
    const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/chefs');
    const data = await response.json();
    //console.log(data);
    setChefs(data);
  }

  const isOrderServed = (order) => {
    if (!order.items || order.items.length === 0) return false;
    
    const totalPrepTime = Math.max(...order.items.map(item => item.itemId.preparationTime));
    const orderedTime = new Date(order.createdAt);
    const currentTime = new Date();
    const elapsedMinutes = (currentTime - orderedTime) / (1000 * 60);
    
    return elapsedMinutes >= totalPrepTime;
  }

  const calculateOrderRevenue = (order) => {
    return order.items.reduce((sum, item) => {
      const price = item.itemId?.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }

const filterOrdersByPeriod = (orders, period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'daily':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      break;
    case 'weekly':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'monthly':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(0);
  }

  return orders.filter(order => new Date(order.createdAt) >= startDate);
};

  const calculateOrderStats = (allOrders,period) => {
    const filteredOrders = filterOrdersByPeriod(allOrders, period);
    
    let served = 0;
    let dineIn = 0;
    let takeAway = 0;

    filteredOrders.forEach(order => {
      if (order.orderType === 'Dine In') {
        if (isOrderServed(order)) {
          served++;
        } 
        dineIn++;
      } else if (order.orderType === 'Take Away') {
        takeAway++;
      }
    });

    setOrderStats({ served, dineIn, takeAway });
  }

  const calculateRevenueData = (allOrders, period) => {
  const filteredOrders = filterOrdersByPeriod(allOrders, period);
  const now = new Date();
  let chartData = [];
  let totalRevenue = 0;

  if (period === 'daily') {
    // Group by hours for today
    const hourlyRevenue = Array(24).fill(0);

    filteredOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const hour = orderDate.getHours();
      const revenue = calculateOrderRevenue(order);
      hourlyRevenue[hour] += revenue;
      totalRevenue += revenue;
    });

    const currentHour = now.getHours();
    const startHour = Math.max(0, currentHour - 11);

    chartData = Array.from({ length: Math.min(12, currentHour + 1) }, (_, i) => {
      const hour = startHour + i;
      const displayHour =
        hour === 0 ? '12 AM' :
        hour === 12 ? '12 PM' :
        hour < 12 ? `${hour} AM` : `${hour - 12} PM`;

      return {
        day: displayHour,
        revenue: hourlyRevenue[hour],
        barValue: hourlyRevenue[hour] * 1.2
      };
    });

  } else if (period === 'weekly') {
    // Group by days for last 7 days
    const dailyRevenue = Array(7).fill(0);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    filteredOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const daysAgo = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
      if (daysAgo < 7) {
        const revenue = calculateOrderRevenue(order);
        dailyRevenue[6 - daysAgo] += revenue;
        totalRevenue += revenue;
      }
    });

    chartData = dailyRevenue.map((revenue, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - index));
      return {
        day: dayNames[date.getDay()],
        revenue: revenue,
        barValue: revenue * 1.2
      };
    });

  } else if (period === 'monthly') {
    // Group by weeks for last 30 days
    const weeklyRevenue = Array(5).fill(0);

    filteredOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const daysAgo = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(daysAgo / 7);
      if (weekIndex < 5) {
        const revenue = calculateOrderRevenue(order);
        weeklyRevenue[4 - weekIndex] += revenue;
        totalRevenue += revenue;
      }
    });

    chartData = weeklyRevenue.map((revenue, index) => ({
      day: `Week ${index + 1}`,
      revenue: revenue,
      barValue: revenue * 1.2
    }));
  }

  setRevenueData(chartData);
  setPeriodRevenue(totalRevenue);
};


  const fetchOrders = async () => {
    const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/orders');
    const data = await response.json();
    //console.log(data);
    setOrders(data);
  }


  const analyticsMetaData = [
    {
      name: "TOTAL CHEFS",
      value: analytics?.totalChefs,
      image: totalChefs
    },
    {
      name: "TOTAL REVENUE",
      value: `${analytics?.totalRevenue || 0}`,
      image: totalRevenue
    },
    {
      name: "TOTAL ORDERS",
      value: analytics?.totalOrders,
      image: totalOrdersImage
    },
    {
      name: "TOTAL CLIENTS",
      value: analytics?.totalClients,
      image: totalClients
    }
  ];

  // Calculate order data dynamically
  const totalOrders = orderStats.served + orderStats.dineIn + orderStats.takeAway;
  const orderData = [
    { 
      name: 'Take Away', 
      value: orderStats.takeAway, 
      percentage: totalOrders > 0 ? Math.round((orderStats.takeAway / totalOrders) * 100) : 0, 
      color: '#5b5b5b' 
    },
    { 
      name: 'Served', 
      value: orderStats.served, 
      percentage: orderStats.dineIn > 0 ? Math.round((orderStats.served / orderStats.dineIn) * 100) : 0, 
      color: '#828282' 
    },
    { 
      name: 'Dine In', 
      value: orderStats.dineIn, 
      percentage: totalOrders > 0 ? Math.round((orderStats.dineIn / totalOrders) * 100) : 0, 
      color: '#2c2c2c' 
    }
  ];



  return (
    <>
      <div className="dashboardContent">
        <h1 className="pageTitle">Analytics</h1>

        {/* Analytics Container - KPI Cards */}
        <div className="analyticsContainer">
          {analyticsMetaData.map((element, index) => (
            <div key={index} className="statCard" style={{filter:(filteredElements.includes(element.name) ? "blur(0px)" :"blur(3px")}}>
              <div className="statIcon">
                <img src={element.image} alt={element.name} />
              </div>
              <div className="statContent">
                <h3>{element.value ?? 0}</h3>
                <p>{element.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Container */}
        <div className="summaryContainer">
          {/* Order Summary */}
          <div className="card" style={{filter:(filteredElements.includes("ORDER SUMMARY")) ? "blur(0px)":"blur(3px)"}}>
            <div className="cardHeader">
              <h3 className="cardTitle">Order Summary</h3>
              <select 
  className="periodDropdown"
  value={selectedOrderPeriod}
  onChange={(e) => setSelectedOrderPeriod(e.target.value)}
>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
</select>
            </div>

            <div className="orderSummaryContent">
              <div className="orderStat">
                <h3 className="orderNumber">{String(orderStats.served).padStart(2, '0')}</h3>
                <p className="orderLabel">Served</p>
              </div>
              <div className="orderStat">
                <h3 className="orderNumber">{String(orderStats.dineIn).padStart(2, '0')}</h3>
                <p className="orderLabel">Dine In</p>
              </div>
              <div className="orderStat">
                <h3 className="orderNumber">{String(orderStats.takeAway).padStart(2, '0')}</h3>
                <p className="orderLabel">Take Away</p>
              </div>
            </div>

            <div className="chartSection">
              <div className="pieChartContainer">
                <ResponsiveContainer width={160}>
                  <PieChart>
                    <Pie data={orderData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                      {orderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="chartLegend">
                {orderData.map((entry, index) => (
                  <div key={index} className="legendItem">
                    <span className="legendText">{entry.name}</span>
                    <span className="legendPercent">({entry.percentage}%)</span>
                      <div className="legendBar" style={{ 
                        background: `linear-gradient(to right, ${entry.color} ${entry.percentage}%, white ${entry.percentage}%)` 
                      }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="revenueContainer" style={{filter:(filteredElements.includes("REVENUE")) ? "blur(0px)":"blur(3px)"}}>
            <div className="card">
              <div className="cardHeader">
                <div>
                  <h3 className="cardTitle">Revenue</h3>
                </div>
                <select 
  className="periodDropdown"
  value={selectedRevenuePeriod}
  onChange={(e) => setSelectedRevenuePeriod(e.target.value)}
>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
</select>
              </div>
              
              <div className="revenueChart">
                <ResponsiveContainer width="100%" style={{backgroundColor:"white",borderRadius:"10px",border:'2px solid #d9d9d9',padding:"10px"}}>
                  <ComposedChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" stroke="#f5f5f5" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 13 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 13 }}
                      hide={true}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      formatter={(value) => [`₹${value}`, 'Revenue']}
                    />
                    <Bar 
                      dataKey="barValue" 
                      fill="#e5e7eb" 
                      radius={[8, 8, 0, 0]}
                      barSize={40}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#1f2937" 
                      strokeWidth={2.5} 
                      dot={false}
                      activeDot={{ r: 6, fill: '#1f2937' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="card" style={{filter:(filteredElements.includes("TABLES")) ? "blur(0px)":"blur(3px)"}}>
            <h3 className="cardTitle" style={{margin:"16px 16px 0px 16px"}}>Tables</h3>
            <div style={{display:"flex",justifyContent:'center',gap:"10px",borderBottom:"2px solid #d9d9d9",padding:"8px 10px"}}>
            <div style={{display:"flex",gap:"5px"}}>
              <div style={{width:"9px",height:"9px",backgroundColor:"#3dc35f",borderRadius:"5px"}}></div>
            <p style={{fontSize:"9px"}}>Reserved</p>
            </div>
            <div style={{display:"flex",gap:"5px"}} >
              <div style={{width:"9px",height:"9px",backgroundColor:"white",borderRadius:"5px"}}></div>
            <p style={{fontSize:"9px"}}>Avaiable</p>
            </div>
            </div>
            <div className="tablesContainer">
              {tables.map((e, i) => {
                return <TableCell key={i} number={i + 1} available={e.avaliableSeats === e.capacity} />;
              })}
            </div>
          </div>
        </div>

        {/* Chef Details */}
              <div className="chefDetails">
  <table className="chefDetailsTable" >
    <thead style={{ backgroundColor: "#f0f0f0" }}>
      <tr>
        <th style={{ width: "25%" }}>Chef Name</th>
        <th style={{ width: "75%" }}>Order Taken</th>
      </tr>
    </thead>
    <tbody>
      {chefs.map((chef, index) => (
        <tr key={index}>
          <td style={{ width: "25%" }}>{chef.name}</td>
          <td style={{ width: "75%" }}>0{chef.ordersAssigned.length}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </>
  );
}
