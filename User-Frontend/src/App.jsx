import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import UserDetails from "./components/UserDetails";
import ProductMenu from "./components/ProductMenu";
import OrderSummary from "./components/OrderSummary";
import SuccessMessage from "./components/SuccessMessage";
import toast, { Toaster } from 'react-hot-toast';


export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: '',
    persons: '',
    address: '',
    contact: ''
  });
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [orderType, setOrderType] = useState('Dine In');
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isOrdered, setIsOrdered] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [cookingInstructions, setCookingInstructions] = useState('');
  
  const swipeRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const taxes = 5;

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (orderType === 'Take Away') {
      setDeliveryCharge(0);
    } else {
      setDeliveryCharge(50);
    }
  }, [orderType]);

  const fetchItems = async () => {
    let response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/items');
    response = await response.json();
    console.log("Fetched Items:", response);
    response = response.map(item => ({ ...item, quantity: 0 }));
    setItems(response);
  };

  const calculateTotals = () => {
    const itemTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = itemTotal + deliveryCharge + taxes;
    return { itemTotal, grandTotal };
  };

  const { itemTotal, grandTotal } = calculateTotals();

  const handleFormSubmit = async () => {
    let saveClient = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    saveClient = await saveClient.json();
    console.log('Client saved:', saveClient.client);
    setUser(saveClient.client);
    setCurrentStep(2);
  };

  const handleIncrement = (id) => {
    setItems(items.map(item => 
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id) => {
    setItems(items.map(item => 
      item._id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id) => {
    setItems(items.map(item => 
      item._id === id && item.quantity > 0 ? { ...item, quantity: 0 } : item
    ));
  };

  const handleNextToSummary = () => {
    const hasItems = items.some(item => item.quantity > 0);
    if (hasItems) {
      setCurrentStep(3);
    } else {
      alert('Please add at least one item to proceed');
    }
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
    if (progress >= maxSwipe * 0.85) handleOrder();
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
    if (progress >= maxSwipe * 0.85) handleOrder();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (!isOrdered && swipeProgress < (swipeRef.current.offsetWidth - 70) * 0.85) {
      setSwipeProgress(0);
    }
  };

  // const [lastCall,setLastCall] = useState(Date.now());
    const lastCall = useRef(false);

  const handleOrder = async () => {
    if (lastCall.current) {
      return;
    }
    lastCall.current = true;

    setIsOrdered(true);
    setSwipeProgress(swipeRef.current.offsetWidth - 70);
    setTimeout(async () => {
      setCurrentStep(4);
      const orderData = {
        orderType: orderType,
        items: items.filter(item => item.quantity > 0).map(item => ({
          itemId: item._id,
          quantity: item.quantity,
        })),
        orderedBy: user._id,
        capacity: userDetails.persons,
        cookingInstructions:cookingInstructions
      };
      console.log("Order Data:", orderData);
      // setLastCall(Date.now());
      // console.log("Time since last call:", Date.now() , lastCall , Date.now() - lastCall);
      // if (Date.now() - lastCall < 5000) {
      //   return;
      // }

      const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const savedOrder = await response.json();
      console.log('Order placed successfully:', savedOrder);
      
      
      setTimeout(() => {
        setCurrentStep(1);
        setItems(items.map(item => ({ ...item, quantity: 0 })));
        setUserDetails({ name: '', persons: '', address: '', contact: '' });
        setInstructions('');
        setOrderType('Dine In');
        setSwipeProgress(0);
        setIsOrdered(false);
        setCookingInstructions("");
        lastCall.current = false;
      }, 3000);
    }, 500);
  };

  return (
    <div className="bodyContainer">
       <Toaster position="top-center" reverseOrder={false} />
      {currentStep === 1 && (
        <UserDetails
          onSubmit={handleFormSubmit}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}

      {(currentStep === 1 || currentStep === 2) && (
        <ProductMenu
          currentStep={currentStep}
          items={items}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleNextToSummary={handleNextToSummary}
        />
      )}

      {currentStep === 3 && (
        <OrderSummary
          items={items}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleRemove={handleRemove}
          instructions={instructions}
          setInstructions={setInstructions}
          orderType={orderType}
          setOrderType={setOrderType}
          itemTotal={itemTotal}
          deliveryCharge={deliveryCharge}
          taxes={taxes}
          grandTotal={grandTotal}
          userDetails={userDetails}
          swipeRef={swipeRef}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          handleMouseDown={handleMouseDown}
          swipeProgress={swipeProgress}
          isOrdered={isOrdered}
          cookingInstructions={cookingInstructions}
          setCookingInstructions={setCookingInstructions}
        />
      )}

      {currentStep === 4 && <SuccessMessage />}
    </div>
  );
}
