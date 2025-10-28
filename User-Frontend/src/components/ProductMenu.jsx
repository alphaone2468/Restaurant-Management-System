import React, { useState } from "react";
import burger from "../assets/burger.png";
import pizza from "../assets/pizza.png";
import drink from "../assets/drink.png";
import fries from "../assets/fries.png";
import veggies from "../assets/veggies.png";

export default function ProductMenu({
  currentStep,
  items,
  handleIncrement,
  handleDecrement,
  handleNextToSummary,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("pizza");

  const categories = [
    { id: 1, name: "Pizza", image: pizza, category: "pizza" },
    { id: 2, name: "Burger", image: burger, category: "burger" },
    { id: 3, name: "Drink", image: drink, category: "drinks" },
    { id: 4, name: "French Fries", image: fries, category: "fries" },
    { id: 5, name: "Veggies", image: veggies, category: "veggies" },
  ];

  const handleRightArrowClick = () => {
    const container = document.querySelector(".categories");
    if (container) container.scrollLeft += 150;
  };

  const handleLeftArrowClick = () => {
    const container = document.querySelector(".categories");
    if (container) container.scrollLeft -= 150;
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        opacity: currentStep === 1 ? 0.4 : 1,
        pointerEvents: currentStep === 1 ? "none" : "auto",
        padding:'10px'
      }}
    >
      <p className="heading" style={{ fontSize: "18px" }}>Good Evening</p>
      <p className="heading" style={{ fontSize: "14px" }}>Place Your Order Here</p>

      {/* Search Input */}
      <div className="search">
        <input
          type="text"
          placeholder="Search for food, coffee, etc.."
          id="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categoriesContainer">
        <div className="leftArrow arrow" onClick={handleLeftArrowClick}>
          &#8592;
        </div>

        <div className="categories">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category"
              onClick={() => {
                  setSelectedCategory(category.category);
                  document.getElementById("items").scrollTo(0, 0);
                }
              }
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: selectedCategory === category.category ? '2px solid #FF6B35' : '2px solid gray',
                padding:'10px',
                width:'60px',
                height:'60px',
                borderRadius:'8px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === category.category ? '#FFF5F0' : 'transparent'
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
                style={{ height: "30px" , mixBlendMode:'exclusion'}}
              />
              <p style={{fontSize:'12px'}}>{category.name}</p>
            </div>
          ))}
        </div>

        <div className="rightArrow arrow" onClick={handleRightArrowClick}>
          &#8594;
        </div>
      </div>

      {/* Items Section */}
      <div className="itemsContainer" >
        <h1 className="title">Menu</h1>
        <div className="items" id="items">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div
                  className="item-details"
                  style={{ display: "flex", flexDirection: "column", height: "55%" }}
                >
                  <p className="item-name" style={{ flex: "1", minHeight: "40px" }}>
                    {item.name}
                  </p>
                  <div className="item-footer" style={{ marginTop: "auto" }}>
                    <p className="item-price">₹ {item.price}</p>

                    {item.quantity === 0 ? (
                      <button onClick={() => handleIncrement(item._id)} className="add-btn">
                        +
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="control-btn"
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="control-btn"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>No items found.</p>
          )}
        </div>

        {/* Fixed Bottom Next Button */}
        <div
          className="nextBtnContainer"
          style={{
          
          }}
        >
          <button onClick={handleNextToSummary} className="nextBtn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}