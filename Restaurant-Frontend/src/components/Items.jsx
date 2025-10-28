import React, { useState, useEffect } from 'react';
import '../styles/Items.css';

const mockProducts = [
  {
    id: 1,
    name: 'Double Cheeseburger',
    category: 'Burgers',
    price: 250,
    description: 'Juicy burger with double cheese',
    preparationTime: 20,
    image: null
  },
  {
    id: 2,
    name: 'Grilled Chicken Burger',
    category: 'Burgers',
    price: 280,
    description: 'Tender grilled chicken patty',
    preparationTime: 20,
    image: null
  }
];

const ProductCard = ({ product, isFirst }) => (
  <div className={`productCard ${isFirst ? 'featured' : ''}`}>
    <div className="productImage">
      {product.image ? (
        <img className="productImageEl" src={product.image} alt={product.name} />
      ) : (
        <div className="imageLabel">Image</div>
      )}
    </div>
    <div className="productDetails">
      <div className="productName">Name: {product.name}</div>
      <div className="productDescription">Description: {product.description}</div>
      <div className="productPrice">Price: ₹ {product.price}</div>
      <div className="productMeta">Average Prep Time: {product.preparationTime} Min</div>
      <div className="productMeta">Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
    </div>
  </div>
);

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://restaurant-management-system-1-pz2f.onrender.com/api/items');
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      // Fallback to mock data if API fails
      setItems(mockProducts);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="itemsContainer">
        {loading ? (
          <div className="loadingText">Loading items...</div>
        ) : (
          <div className="productsGrid">
            {items.map((product, index) => (
              <ProductCard key={product._id || product.id} product={product} isFirst={index === 0} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
