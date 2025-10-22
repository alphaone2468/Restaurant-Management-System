import React, { useState, useEffect, useRef } from "react";
import "./App.css";
export default function App() {
  const categories = [
    {
      id: 1,
      name: "Pizza",
      image: "pizza.png",
    },
    {
      id: 2,
      name: "Burger",
      image: "burger.png",
    },
    {
      id: 3,
      name: "HotDog",
      image: "hotdog.png",
    },
    {
      id: 4,
      name: "Drink",
      image: "drink.png",
    },
    {
      id: 5,
      name: "Donut",
      image: "donut.png",
    },
    {
      id: 6,
      name: "Donut",
      image: "donut.png",
    },
    {
      id: 7,
      name: "Donut",
      image: "donut.png",
    },
    {
      id: 8,
      name: "Donut",
      image: "donut.png",
    },
  ];

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Capricciosa",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 2,
      name: "Sicilian",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 3,
      name: "Marinara",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 4,
      name: "Pepperoni",
      price: 300,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 5,
      name: "Marinara",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&h=300&fit=crop",
      quantity: 1,
    },
    {
      id: 6,
      name: "Pepperoni",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 1,
      name: "Capricciosa",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 2,
      name: "Sicilian",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 3,
      name: "Marinara",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 4,
      name: "Pepperoni",
      price: 300,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      quantity: 0,
    },
    {
      id: 5,
      name: "Marinara",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&h=300&fit=crop",
      quantity: 1,
    },
    {
      id: 6,
      name: "Pepperoni",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
      quantity: 0,
    },
  ]);

  const styles = {
  
  card: {
    width: '100%',
    maxWidth: '448px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '192px',
    objectFit: 'cover'
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderRadius: '50%',
    padding: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  productInfo: {
    padding: '20px 24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  price: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937'
  },
  content: {
    padding: '0 24px 24px'
  },
  sizeQuantityRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '16px',
    marginBottom: '16px'
  },
  size: {
    fontSize: '16px',
    color: '#6b7280'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: 'auto'
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#6b7280',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    width: '32px',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '16px'
  },
  instructionsContainer: {
    marginBottom: '24px'
  },
  instructionsInput: {
    width: '100%',
    padding: '12px 0',
    fontSize: '14px',
    color: '#6b7280',
    border: 'none',
    borderBottom: '1px solid #e5e7eb',
    outline: 'none',
    fontFamily: 'inherit'
  },
  toggleContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    backgroundColor:"#e4e4e4",
    padding: "10px",
    borderRadius: "32px"
  },
  toggleButton: {
    flex: '1',
    padding: '12px',
    borderRadius: '24px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    transition: 'all 0.2s'
  },
  toggleButtonActive: {
    backgroundColor: '#1f2937',
    color: '#ffffff'
  },
  priceBreakdown: {
    marginBottom: '24px',
    fontSize: '14px',
    backgroundColor: '#fffdef',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  priceLabel: {
    color: '#6b7280'
  },
  priceValue: {
    color: '#6b7280'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '12px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '4px'
  },
  totalLabel: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2937'
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2937'
  },
  deliveryInfo: {
    marginBottom: '24px',
    fontSize: '14px',
    color: '#6b7280'
  },
  deliveryTitle: {
    fontWeight: '600',
    marginBottom: '4px',
    marginTop: '0'
  },
  deliveryText: {
    fontSize: '12px',
    margin: '4px 0'
  },
  deliveryAddress: {
    fontSize: '12px',
    marginTop: '8px',
    marginBottom: '4px'
  },
  deliveryTime: {
    fontSize: '12px',
    color: '#10b981',
    margin: '4px 0'
  },
  swipeContainer: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '40px',
    height: '64px',
    overflow: 'hidden',
    userSelect: 'none',
    border:"1px solid grey"
  },
  swipeText: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontWeight: '500',
    fontSize: '15px',
    pointerEvents: 'none'
  },
  swipeButton: {
    position: 'absolute',
    left: '4px',
    top: '4px',
    bottom: '4px',
    width: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
    backgroundColor:'#D9D9D9',
  },
  
  };

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [orderType, setOrderType] = useState('Dine In');
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isOrdered, setIsOrdered] = useState(false);
  const swipeRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const basePrice = 200;
  const deliveryCharge = 50;
  const taxes = 5;
  
  const itemTotal = basePrice * quantity;
  const grandTotal = itemTotal + deliveryCharge + taxes;

  useEffect(() => {
    console.log(window.innerWidth);
  }, []);

  const handleRightArrowClick = () => {
    const container = document.querySelector(".categories");
    container.scrollLeft += 150;
  };

  const handleLeftArrowClick = () => {
    const container = document.querySelector(".categories");
    container.scrollLeft -= 150;
  };

  const handleIncrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    const maxSwipe = swipeRef.current.offsetWidth - 70;
    const progress = Math.max(0, Math.min(diff, maxSwipe));
    
    setSwipeProgress(progress);
    
    if (progress >= maxSwipe * 0.85) {
      handleOrder();
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (!isOrdered && swipeProgress < (swipeRef.current.offsetWidth - 70) * 0.85) {
      setSwipeProgress(0);
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    const maxSwipe = swipeRef.current.offsetWidth - 70;
    const progress = Math.max(0, Math.min(diff, maxSwipe));
    
    setSwipeProgress(progress);
    
    if (progress >= maxSwipe * 0.85) {
      handleOrder();
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (!isOrdered && swipeProgress < (swipeRef.current.offsetWidth - 70) * 0.85) {
      setSwipeProgress(0);
    }
  };

  const handleOrder = () => {
    setIsOrdered(true);
    setSwipeProgress(swipeRef.current.offsetWidth - 70);
    setTimeout(() => {
      alert('Order placed successfully!');
      setSwipeProgress(0);
      setIsOrdered(false);
    }, 500);
  };


  return (
    <div className="bodyContainer">
      <div className="itemsContainer">
        <p>Good Evening</p>
        <p>Place Your Order Here</p>

        <div className="search">
          <input type="text" placeholder="Search for food, coffe, etc.." />
        </div>

        <div className="categoriesContainer">
          <div className="leftArrow arrow" onClick={handleLeftArrowClick}>
            &#8592;
          </div>

          <div className="categories">
            {categories.map((category) => (
              <div className="category">
                {/* <img src={category.image} alt="" /> */}
                <p>{category.name}</p>
              </div>
            ))}
          </div>

          <div className="rightArrow arrow" onClick={handleRightArrowClick}>
            &#8594;
          </div>
        </div>

        <div className="itemsContainer">
          <h1 className="title">Pizza Menu</h1>

          <div className="items">
            {items.map((item) => (
              <div key={item.id} className="item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-details">
                  <p className="item-name">{item.name}</p>

                  <div className="item-footer">
                    <p className="item-price">₹ {item.price}</p>

                    {item.quantity === 0 ? (
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="add-btn"
                      >
                        +
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="control-btn"
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="control-btn"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

         <div style={styles.card}>
        {/* Product Image & Info */}
        <div style={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80" 
            alt="Marinara Pizza"
            style={styles.image}
          />
          <button style={styles.closeButton}>
            X
          </button>
          
          <div style={styles.productInfo}>
            <h2 style={styles.title}>Marinara</h2>
            <span style={styles.price}>₹ {basePrice}</span>
          </div>
        </div>

        <div style={styles.content}>
          {/* Size & Quantity */}
          <div style={styles.sizeQuantityRow}>
            <span style={styles.size}>14"</span>
            <div style={styles.quantityControls}>
              <button onClick={handleDecrement} style={styles.quantityButton}>
                −
              </button>
              <span style={styles.quantity}>{quantity}</span>
              <button onClick={handleIncrement} style={styles.quantityButton}>
                +
              </button>
            </div>
          </div>

          {/* Cooking Instructions */}
          <div style={styles.instructionsContainer}>
            <input
              type="text"
              placeholder="Add cooking instructions (optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              style={styles.instructionsInput}
            />
          </div>

          {/* Order Type Toggle */}
          <div style={styles.toggleContainer}>
            <button
              onClick={() => setOrderType('Dine In')}
              style={{
                ...styles.toggleButton,
                ...(orderType === 'Dine In' ? styles.toggleButtonActive : {})
              }}
            >
              Dine In
            </button>
            <button
              onClick={() => setOrderType('Take Away')}
              style={{
                ...styles.toggleButton,
                ...(orderType === 'Take Away' ? styles.toggleButtonActive : {})
              }}
            >
              Take Away
            </button>
          </div>

          {/* Price Breakdown */}
          <div style={styles.priceBreakdown}>
            <div style={styles.priceRow}>
              <span style={styles.priceLabel}>Item Total</span>
              <span style={styles.priceValue}>₹{itemTotal.toFixed(2)}</span>
            </div>
            <div style={styles.priceRow}>
              <span style={styles.priceLabel}>Delivery Charge</span>
              <span style={styles.priceValue}>₹{deliveryCharge}</span>
            </div>
            <div style={styles.priceRow}>
              <span style={styles.priceLabel}>Taxes</span>
              <span style={styles.priceValue}>₹{taxes.toFixed(2)}</span>
            </div>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Grand Total</span>
              <span style={styles.totalValue}>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div style={styles.deliveryInfo}>
            <p style={styles.deliveryTitle}>Your details</p>
            <p style={styles.deliveryText}>Surya Signature, 9100 100 100</p>
            <p style={styles.deliveryAddress}>
              Delivery at Home - Flat no. 301, SVR Enclave, Hyper Nagar, vasak...
            </p>
            <p style={styles.deliveryTime}>Delivery in 42 mins</p>
          </div>

          {/* Swipe to Order */}
          <div 
            ref={swipeRef}
            style={styles.swipeContainer}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              style={{
                ...styles.swipeText,
                opacity: 1 - (swipeProgress / 150)
              }}
            >
              Swipe to Order
            </div>
            
            <div
              style={{
                ...styles.swipeButton,
                transform: `translateX(${swipeProgress}px)`,
                backgroundColor: isOrdered ? '#10b981' : '#f3f4f6'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
            >
              <p>--</p>
            </div>
          </div>
        </div>
      </div>



          <div className="successContainer">
            <div></div>
          <div className="successMessage">
            <h2>Thanks For Ordering</h2>
          </div>
          <div style={{fontSize:"19px"}}>Redirecting in 3 seconds</div>
          </div>

      </div>
    </div>
  );
}
