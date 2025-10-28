import React, { useState } from "react";
import closeLogo from "../assets/close.png";
import deliveryLogo from "../assets/location.png";
import time from "../assets/time.png";
import rightArrow from "../assets/rightArrow.png";
import Remove from "../assets/remove.png";
import "../styles/OrderSummary.css";
export default function OrderSummary({
  items,
  handleIncrement,
  handleDecrement,
  handleRemove,
  instructions,
  setInstructions,
  orderType,
  setOrderType,
  itemTotal,
  deliveryCharge,
  taxes,
  grandTotal,
  userDetails,
  swipeRef,
  handleMouseMove,
  handleMouseUp,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleMouseDown,
  swipeProgress,
  isOrdered,
  cookingInstructions,
  setCookingInstructions,
}) {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [tempInstructions, setTempInstructions] = useState(instructions);

  const handleOpenModal = () => {
    setTempInstructions(instructions);
    setShowInstructionsModal(true);
  };

  const handleSaveInstructions = () => {
    setInstructions(tempInstructions);
    setShowInstructionsModal(false);
  };

  const handleCancelInstructions = () => {
    setTempInstructions(instructions);
    setShowInstructionsModal(false);
  };

  return (
    <>
      <div style={{ height: "100vh", overflowY: "auto" }}>
        <div>
          <p className="heading headingLg">Good Evening</p>
          <p className="heading headingSm">Place Your Order Here</p>

          {/* Search Input */}
          <div className="search">
            <input
              type="text"
              placeholder="Search for food, coffee, etc.."
              id="searchInput"
            />
          </div>
        </div>
        <div className="card summaryCard">
          <div className="image-container">
            {items
              .filter((e) => e.quantity > 0)
              .map((item) => (
                <div key={item.id} className="item summaryItem">
                  {/* Cross button in top right */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="removeBtn"
                  >
                    <img src={Remove} height="27px" />
                  </button>

                  <div className="item-image itemImageAuto" style={{
          width: "120px",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border:"3px solid #d9d9d9",
          borderRadius:"10px",
          boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.1)"
        }}>
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div style={{ marginLeft: "20px", marginTop: "13px" }}>
                    <p className="item-name">{item.name}</p>

                    <div
                      className="item-footer"
                      style={{ gap: "20px", width: "180px" }}
                    >
                      <p className="item-price">₹ {item.price}</p>

                      {item.quantity === 0 ? (
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="add-btn"
                        >
                          +
                        </button>
                      ) : (
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleDecrement(item._id)}
                            className="quantity-button"
                            style={{ width: "24px", height: "24px" }}
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item._id)}
                            className="quantity-button"
                            style={{ width: "24px", height: "24px" }}
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

          <div className="content">
            <div
              className="instructions-container instrContainer"
              onClick={handleOpenModal}
            >
              <input
                type="text"
                placeholder="Add cooking instructions (optional)"
                value={cookingInstructions}
                readOnly
                className="instructions-input instrInput"
              />
            </div>

            <div className="toggle-container">
              <button
                onClick={() => setOrderType("Dine In")}
                className={`toggle-button ${
                  orderType === "Dine In" ? "active" : ""
                }`}
              >
                Dine In
              </button>
              <button
                onClick={() => setOrderType("Take Away")}
                className={`toggle-button ${
                  orderType === "Take Away" ? "active" : ""
                }`}
              >
                Take Away
              </button>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span className="price-label">Item Total</span>
                <span className="price-value">₹{itemTotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span className="price-label">Delivery Charge</span>
                <span className="price-value">₹{deliveryCharge}</span>
              </div>
              <div className="price-row">
                <span className="price-label">Taxes</span>
                <span className="price-value">₹{taxes.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Grand Total</span>
                <span className="total-value">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="delivery-info">
              <p className="delivery-title deliveryTitle">Your details</p>
              <p className="delivery-text deliveryText">
                {userDetails.name}, {userDetails.contact}
              </p>

              <div className="deliveryBlock">
                <div className="deliveryRow">
                  <img src={deliveryLogo} alt="" height="20px" />
                  <p className="delivery-address">
                    Delivery At Home - {userDetails.address}
                  </p>
                </div>

                <div className="deliveryRow">
                  <img src={time} alt="" height="16px" />
                  <p className="delivery-time">Delivery in 42 mins</p>
                </div>
              </div>
            </div>

            <div
              ref={swipeRef}
              className="swipe-container"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="swipe-text"
                style={{ opacity: 1 - swipeProgress / 150 }}
              >
                Swipe to Order
              </div>

              <div
                className="swipe-button"
                style={{
                  transform: `translateX(${swipeProgress}px)`,
                  backgroundColor: isOrdered ? "#10b981" : "#D9D9D9",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
              >
                <div>
                  <img src={rightArrow} alt="" height="24px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Modal */}
        {showInstructionsModal && (
          <>
            <div
              className="modal-overlay modalOverlay"
              onClick={handleCancelInstructions}
            />
            <div className="instructions-modal instrModal">
              <div className="instrModalHeader">
                <h3 className="instrModalTitle">Add Cooking Instructions</h3>
              </div>

              <textarea
                value={cookingInstructions}
                onChange={(e) => setCookingInstructions(e.target.value)}
                placeholder=""
                className="instrTextarea"
              />

              <p style={{ fontSize: "12px", color: "gray" }}>
                The restaurant will try its best to follow your request.
                However, refunds or cancellations in this regard won’t be
                possible
              </p>

              <div className="instrButtons">
                <button
                  onClick={handleCancelInstructions}
                  className="btnCancel"
                >
                  Cancel
                </button>
                <button onClick={handleSaveInstructions} className="btnNext">
                  Next
                </button>
              </div>
            </div>

            <div className="floatingClose" onClick={handleCancelInstructions}>
              <img
                src={closeLogo}
                alt=""
                height="28px"
                className="floatingCloseImg"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
