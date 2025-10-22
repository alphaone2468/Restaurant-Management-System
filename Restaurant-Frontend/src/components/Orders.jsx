import React from 'react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
  }

  .mainContainer {
    padding: 30px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .pageTitle {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin-bottom: 30px;
  }

  .ordersSection {
    margin-bottom: 30px;
  }

  .ordersGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .orderCard {
    border-radius: 12px;
    padding: 20px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
  }

  

  .orderCardOrange {
    background: linear-gradient(135deg, #ffecd2 0%, #fcdbae 100%);
  }

  .orderCardGreen {
    background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
  }

  .orderCardGray {
    background: linear-gradient(135deg, #cfd8dc 0%, #b0bec5 100%);
  }

  .orderCardHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
  }

  .orderNumber {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .statusBadge {
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    min-width: 90px;
    border: 2px solid;
    padding: 10px;
    background-color: red;
  }

  .statusOngoing {
    background: rgba(255, 255, 255, 0.7);
    color: #f57c00;
  }

  .statusServed {
    background: rgba(255, 255, 255, 0.7);
    color: #4caf50;
  }

  .statusNotPickedup {
    background: rgba(255, 255, 255, 0.7);
    color: #607d8b;
  }

  .statusTakeaway {
    background: rgba(255, 255, 255, 0.7);
    color: #f57c00;
  }

  .orderTime {
    font-size: 12px;
    color: #666;
  }

  .orderTableInfo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #555;
    margin-bottom: 4px;
  }

  .tableIcon {
    font-size: 16px;
  }

  .itemCount {
    font-size: 13.5px;
    color: #666;
    margin-bottom: 15px;
    font-weight: 500;
  }

  .orderItemsContainer {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    flex-grow: 1;
  }

  .orderItemsTitle {
    font-size: 12px;
    font-weight: 600;
    color: #555;
    margin-bottom: 10px;
  }

  .orderItem {
    font-size: 12px;
    color: #666;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .orderItemQty {
    font-weight: 600;
    color: #333;
  }

  .actionButton {
    padding: 10px 16px;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    width: 50%;
    margin: 0 auto;
  }

  .actionButtonOrange {
    background: #ffc97d;
    color: #f57c00;
  }

  .actionButtonOrange:hover {
    background: #ffb84d;
  }

  .actionButtonGreen {
    background: #81c784;
    color: white;
  }

  .actionButtonGreen:hover {
    background: #66bb6a;
  }

  .actionButtonGray {
    background: #90a4ae;
    color: white;
  }

  .actionButtonGray:hover {
    background: #78909c;
  }

  .actionIcon {
    font-size: 14px;
  }

  .emptyState {
    text-align: center;
    padding: 40px;
    color: #999;
  }
`;

const mockOrders = [
  {
    id: 1,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Ongoing',
    statusColor: 'orange',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 2,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Served',
    statusColor: 'green',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 3,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Not Picked up',
    statusColor: 'gray',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 4,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Ongoing',
    statusColor: 'orange',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 5,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Take Away',
    statusColor: 'gray',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 6,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Served',
    statusColor: 'green',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 7,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Ongoing',
    statusColor: 'orange',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  },
  {
    id: 8,
    orderNumber: 108,
    table: 'Table-01',
    time: '9:37 AM',
    status: 'Ongoing',
    statusColor: 'orange',
    itemCount: 3,
    items: [
      { name: 'Value Set Meals', qty: 1 },
      { name: 'Double Cheeseburger', qty: 1 },
      { name: 'Apple Pie', qty: 1 },
      { name: 'Coca-Cola L', qty: 1 }
    ]
  }
];

const OrderCard = ({ order }) => {
  const getCardClass = () => {
    if (order.statusColor === 'orange') return 'orderCardOrange';
    if (order.statusColor === 'green') return 'orderCardGreen';
    return 'orderCardGray';
  };

  const getStatusClass = () => {
    if (order.statusColor === 'orange') return 'statusOngoing';
    if (order.statusColor === 'green') return 'statusServed';
    if (order.status === 'Take Away') return 'statusTakeaway';
    return 'statusNotPickedup';
  };

  const getActionButtonClass = () => {
    if (order.statusColor === 'orange') return 'actionButtonOrange';
    if (order.statusColor === 'green') return 'actionButtonGreen';
    return 'actionButtonGray';
  };

  const getActionText = () => {
    if (order.status === 'Ongoing') return '⏳ Processing';
    if (order.status === 'Served') return '✓ Order Done';
    if (order.status === 'Not Picked up') return '✓ Order Done';
    return '⏳ Processing';
  };

  const getActionIcon = () => {
    if (order.status === 'Ongoing') return '👤';
    if (order.status === 'Served') return '✓';
    if (order.status === 'Not Picked up') return '✓';
    return '👤';
  };

  return (
    <div className={`orderCard ${getCardClass()}`}>
      <div className="orderCardHeader">
        <div>
          <div className="orderNumber">🍴 # {order.orderNumber}</div>
          <div className="orderTableInfo">
            {/* <span className="tableIcon">📍</span> */}
            <span>{order.table}</span>
          </div>
          <div className="orderTime">{order.time}</div>
      <div className="itemCount">{order.itemCount} Item</div>
        </div>
        <div className={`statusBadge ${getStatusClass()}`}>
          <p>{order.status}</p>
          <p>{order.status}</p>
        </div>
      </div>


      <div className="orderItemsContainer">
        <div className="orderItemsTitle">1x Value Set Meals</div>
        {order.items.map((item, idx) => (
          <div key={idx} className="orderItem">
            <span className="orderItemQty">1x</span> {item.name}
          </div>
        ))}
      </div>

      <button className={`actionButton ${getActionButtonClass()}`}>
        <span className="actionIcon">{getActionIcon()}</span>
        {getActionText()}
      </button>
    </div>
  );
};

export default function Orders() {
  return (
    <>
      <style>{styles}</style>
      <div className="mainContainer">
        <h1 className="pageTitle">Orders</h1>

        <div className="ordersSection">
          <div className="ordersGrid">
            {mockOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}