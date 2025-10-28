import React, { useEffect, useState } from 'react';
import processingOrder from '../assets/processingOrder.png';
import orderDone from '../assets/orderDone.png'
import '../styles/Orders.css';



const styles = ``;

const OrderCard = ({ order }) => {
  // Calculate total preparation time and check if order is done
  const calculateOrderStatus = () => {
    // Calculate total preparation time (max of all items)
    const totalPrepTime = Math.max(...order.items.map(item => item.itemId.preparationTime));
    
    // Calculate time elapsed since order was created
    const orderedTime = new Date(order.createdAt);
    const currentTime = new Date();
    const elapsedMinutes = (currentTime - orderedTime) / (1000 * 60);
    
    // Check if order is done based on preparation time
    const isOrderDone = elapsedMinutes >= totalPrepTime;
    
    return { isOrderDone, totalPrepTime, elapsedMinutes };
  };

  const { isOrderDone } = calculateOrderStatus();

  const getCardClass = () => {
    if (isOrderDone) return (order.orderType === 'Dine In' ? 'orderCardGreen' : 'orderCardGray');
    return 'orderCardOrange';
  };

  const getStatusClass = () => {
    if (isOrderDone) return (order.orderType === 'Dine In' ? 'statusServed' : 'statusNotPickedup');
    return 'statusOngoing';
  };

  const getActionButtonClass = () => {
    if (isOrderDone) return (order.orderType === 'Dine In' ? 'actionButtonGreen' : 'actionButtonGray');
    return 'actionButtonOrange';
  };

  const getHeadingText = () =>{
    if(isOrderDone) {
      if(order.orderType === 'Dine In') return 'Done';
      else return 'Take Away';
    }
    return order.orderType;
  }

 
  
  const getStatusText = () => {
    if (isOrderDone) return (order.orderType === 'Dine In' ? 'Served' : 'Not Picked up');
    const totalPrepTime = Math.max(...order.items.map(item => item.itemId.preparationTime));
    const orderedTime = new Date(order.createdAt);
    const currentTime = new Date();
    const elapsedMinutes = (currentTime - orderedTime) / (1000 * 60);
    return `Ongoing  : ${totalPrepTime-Math.ceil(elapsedMinutes)} Min`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`orderCard ${getCardClass()}`}>
      <div className="orderCardHeader">
        <div>
          <div className="orderNumber">🍴 # {order.orderNumber}</div>
          {(order?.tableNumber) &&
          <div className="orderTableInfo">
            <span>table - {order.tableNumber}</span>
          </div>
          }
          
          <div className="orderTime">{formatTime(order.createdAt)}</div>
          <div className="itemCount">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</div>
        </div>
        <div className={`statusBadge ${getStatusClass()}`}>
          <p >{getHeadingText()}</p>
          <p style={{color:'gray'}}>{getStatusText()}</p>
        </div>
      </div>

      <div className="orderItemsContainer">
        {order.items.map((item, idx) => (
          <div key={idx} className="orderItem">
            <span className="orderItemQty">{item.quantity}x</span> {item.itemId.name}
          </div>
        ))}
      </div>

      <div className={`actionButton ${getActionButtonClass()}`}>
        <p>{(isOrderDone) ? 'Order Done' : 'Processing'}</p>
        <img src={(!isOrderDone) ? processingOrder : orderDone} alt="" height='18px'/>
      </div>
    </div>
  );
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="mainContainer">
        <h1 className="pageTitle">Orders</h1>

        <div className="ordersSection">
          {loading && (
            <div className="loadingContainer">
              Loading orders...
            </div>
          )}
          
          {error && (
            <div className="errorContainer">
              Error: {error}
            </div>
          )}
          
          {!loading && !error && (
            <div className="ordersGrid">
              {orders.map(order => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
