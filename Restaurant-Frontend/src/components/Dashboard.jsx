import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { day: 'Mon', revenue: 2400 },
  { day: 'Tue', revenue: 2210 },
  { day: 'Wed', revenue: 2290 },
  { day: 'Thu', revenue: 2500 },
  { day: 'Fri', revenue: 2800 },
  { day: 'Sat', revenue: 3100 },
  { day: 'Sun', revenue: 2900 },
];

const orderData = [
  { name: 'Served', value: 45, color: '#1a1a1a' },
  { name: 'Dine In', value: 30, color: '#666666' },
  { name: 'Take Away', value: 25, color: '#cccccc' },
];

const chefData = [
  { name: 'Manesh', orders: 3 },
  { name: 'Pritam', orders: 7 },
  { name: 'Yash', orders: 5 },
  { name: 'Tenzen', orders: 8 },
];

const styles = `
  

  .dashboardContent {
    // border:2px solid black;
    transform-origin: top left; 
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 80px);
  }

  .pageTitle {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin-bottom: 30px;
  }

  .analyticsContainer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .statCard {
    background: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .statIcon {
    width: 50px;
    height: 50px;
    background: #e3f2fd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .statContent h3 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 4px;
    margin: 0;
  }

  .statContent p {
    font-size: 11px;
    color: #999;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin: 4px 0 0 0;
  }

  .statTrend {
    font-size: 11px;
    color: #f44336;
    margin-top: 4px;
  }

  .summaryContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .card {
    background: white;
    border-radius: 8px;
    padding: 25px;
    background-color:#f0f5f3;
  }

  .cardTitle {
    font-size: 14px;
    color: #666;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 20px 0;
  }

  .dailyBadge {
    font-size: 11px;
    background: #f0f0f0;
    color: #999;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .orderSummaryContent {
    display: flex;
    gap: 25px;
    margin-bottom: 20px;
  }

  .orderStat {
    text-align: left;
  }

  .orderNumber {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin-bottom: 4px;
    margin: 0;
  }

  .orderLabel {
    font-size: 11px;
    color: #999;
    margin: 4px 0 0 0;
  }

  .pieChartContainer {
    display: flex;
    justify-content: center;
    height: 180px;
  }

  .revenueChart {
    position: relative;
    height: 250px;
  }

  .tablesGrid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  .tableCell {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tableCell.available {
    background: #4caf50;
    color: white;
  }

  .tableCell.available:hover {
    background: #45a049;
  }

  .tableCell.unavailable {
    background: #e0e0e0;
    color: #999;
  }

  .tableCell.unavailable:hover {
    background: #d0d0d0;
  }

  .tableLabel {
    font-size: 10px;
    line-height: 1;
  }

  .tableNumber {
    font-size: 16px;
    margin: 3px 0;
    line-height: 1;
  }

  .chefDetailsTable {
    width: 100%;
    border-collapse: collapse;
  }

  .chefDetailsTable thead tr {
    border-bottom: 1px solid #e0e0e0;
  }

  .chefDetailsTable th {
    text-align: left;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #666;
  }

  .chefDetailsTable tbody tr {
    border-bottom: 1px solid #f5f5f5;
    transition: background-color 0.2s ease;
  }

  .chefDetailsTable tbody tr:hover {
    background-color: #fafafa;
  }

  .chefDetailsTable td {
    padding: 12px 16px;
    font-size: 14px;
    color: #333;
  }

  .chefDetailsTable td:last-child {
    color: #999;
  }
`;

const StatCard = ({ icon, value, label, trend }) => (
  <div className="statCard">
    <div className="statIcon">{icon}</div>
    <div className="statContent">
      <h3>{value}</h3>
      <p>{label}</p>
      {trend && <div className="statTrend">↑ {trend}</div>}
    </div>
  </div>
);

const TableCell = ({ number, available }) => (
  <div className={`tableCell ${available ? 'available' : 'unavailable'}`}>
    <div className="tableLabel">Table</div>
    <div className="tableNumber">{number}</div>
  </div>
);

export default function Dashboard() {
  const availableTables = [4, 5, 7, 9, 12, 17, 21, 23, 25, 26, 27, 28, 30];

  return (
    <>
      <style>{styles}</style>
      <div className="dashboardContent">
        <h1 className="pageTitle">Analytics</h1>

        {/* Analytics Container - KPI Cards */}
        <div className="analyticsContainer">
          <StatCard icon="🍳" value="04" label="TOTAL CHEF" />
          <StatCard icon="₹" value="12K" label="TOTAL REVENUE" trend="12K" />
          <StatCard icon="📋" value="20" label="TOTAL ORDERS" />
          <StatCard icon="👥" value="65" label="TOTAL CLIENTS" />
        </div>

        {/* Summary Container */}
        <div className="summaryContainer">
          {/* Order Summary */}
          <div className="card">
            <h3 className="cardTitle">Order Summary</h3>
            <div className="orderSummaryContent">
              <div className="orderStat">
                <h3 className="orderNumber">09</h3>
                <p className="orderLabel">Served</p>
              </div>
              <div className="orderStat">
                <h3 className="orderNumber">05</h3>
                <p className="orderLabel">Dine In</p>
              </div>
              <div className="orderStat">
                <h3 className="orderNumber">06</h3>
                <p className="orderLabel">Take Away</p>
              </div>
            </div>
            <div className="pieChartContainer">
              <ResponsiveContainer width={200} height={180}>
                <PieChart>
                  <Pie data={orderData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="card">
            <h3 className="cardTitle">
              <span>Revenue</span>
              <span className="dailyBadge">Daily</span>
            </h3>
            <div className="revenueChart">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#333" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tables */}
          <div className="card">
            <h3 className="cardTitle">Tables</h3>
            <div className="tablesGrid">
              {Array.from({ length: 30 }, (_, i) => {
                const num = String(i + 1).padStart(2, '0');
                const available = availableTables.includes(i + 1);
                return <TableCell key={i} number={num} available={available} />;
              })}
            </div>
          </div>
        </div>

        {/* Chef Details */}
        <div className="card chefDetails">
          <table className="chefDetailsTable">
            <thead>
              <tr>
                <th>Chef Name</th>
                <th>Order Taken</th>
              </tr>
            </thead>
            <tbody>
              {chefData.map((chef, index) => (
                <tr key={index}>
                  <td>{chef.name}</td>
                  <td>0{chef.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}