import React from "react";
import "./App.css";
import logo from "./assets/logo.jpg";
import downArrow from "./assets/downArrow.png";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Tables from "./components/Tables";
import Orders from "./components/Orders";
import Items from "./components/Items";
import dashboardLogo from "./assets/dashboard.png";
import tablesLogo from "./assets/tables.png";
import ordersLogo from "./assets/orders.png";
import itemsLogo from "./assets/items.png";

export default function App() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" width={55} />
        </div>

        <div className="searchContainer">
          <input type="text" placeholder="Filter..." />
          <button className="dropdownBtn">
            <img src={downArrow} alt="" />
          </button>
        </div>
      </header>

      <div className="contentContainer">
        <aside className="sidebar">
          <div className="topContainer">
            <div className="logo">
              <Link to="/">
                <img src={dashboardLogo} alt="Logo" width={55} />
              </Link>
            </div>
            <div className="logo">
              <Link to="/tables">
              <img src={tablesLogo} alt="Logo" width={55} />
              </Link>
            </div>
            <div className="logo">
              <Link to="/orders">
              <img src={ordersLogo} alt="Logo" width={55} />
              </Link>
            </div>
            <div className="logo">
              <Link to="/items">
              <img src={itemsLogo} alt="Logo" width={55} />
              </Link>
            </div>
          </div>

          <div className="bottomContainer">
            <div className="logo">
              <img src={logo} alt="Logo" width={55} />
            </div>
          </div>
        </aside>

        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/tables" element={<Tables/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/items" element={<Items/>} />
          </Routes>
          
        </div>
      </div>
    </div>
  );
}
