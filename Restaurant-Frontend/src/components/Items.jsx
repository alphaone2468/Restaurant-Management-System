import React, { useState } from 'react';

const mockProducts = [
  {
    id: 1,
    name: 'Double Cheeseburger',
    category: 'Burgers',
    price: '₹ 250',
    description: 'Juicy burger with double cheese',
    emoji: '🍔',
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'Grilled Chicken Burger',
    category: 'Burgers',
    price: '₹ 280',
    description: 'Tender grilled chicken patty',
    emoji: '🍗',
    badge: null
  },
  {
    id: 3,
    name: 'Vegetable Burger',
    category: 'Burgers',
    price: '₹ 200',
    description: 'Fresh vegetable medley',
    emoji: '🥗',
    badge: 'Vegan'
  },
  {
    id: 4,
    name: 'Classic Burger',
    category: 'Burgers',
    price: '₹ 180',
    description: 'Our signature burger',
    emoji: '🍔',
    badge: null
  },
  {
    id: 5,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: '₹ 320',
    description: 'Cheese and tomato',
    emoji: '🍕',
    badge: 'Best Seller'
  },
  {
    id: 6,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: '₹ 380',
    description: 'With pepperoni slices',
    emoji: '🍕',
    badge: 'Popular'
  },
  {
    id: 7,
    name: 'Veggie Pizza',
    category: 'Pizza',
    price: '₹ 300',
    description: 'Loaded with vegetables',
    emoji: '🥒',
    badge: null
  },
  {
    id: 8,
    name: 'BBQ Chicken Pizza',
    category: 'Pizza',
    price: '₹ 400',
    description: 'Smoky BBQ flavor',
    emoji: '🍕',
    badge: null
  },
  {
    id: 9,
    name: 'Caesar Salad',
    category: 'Salads',
    price: '₹ 220',
    description: 'Fresh romaine with dressing',
    emoji: '🥗',
    badge: 'Healthy'
  },
  {
    id: 10,
    name: 'Greek Salad',
    category: 'Salads',
    price: '₹ 250',
    description: 'Feta and olives',
    emoji: '🥗',
    badge: null
  },
  {
    id: 11,
    name: 'Chicken Salad',
    category: 'Salads',
    price: '₹ 280',
    description: 'Grilled chicken strips',
    emoji: '🍗',
    badge: 'Healthy'
  },
  {
    id: 12,
    name: 'Caprese Salad',
    category: 'Salads',
    price: '₹ 260',
    description: 'Tomato, mozzarella & basil',
    emoji: '🍅',
    badge: null
  },
  {
    id: 13,
    name: 'Coca-Cola',
    category: 'Beverages',
    price: '₹ 60',
    description: 'Chilled soft drink',
    emoji: '🥤',
    badge: null
  },
  {
    id: 14,
    name: 'Iced Tea',
    category: 'Beverages',
    price: '₹ 70',
    description: 'Fresh iced tea',
    emoji: '🧋',
    badge: null
  },
  {
    id: 15,
    name: 'Fresh Juice',
    category: 'Beverages',
    price: '₹ 80',
    description: 'Freshly squeezed juice',
    emoji: '🥤',
    badge: 'Fresh'
  },
  {
    id: 16,
    name: 'Coffee',
    category: 'Beverages',
    price: '₹ 90',
    description: 'Hot brewed coffee',
    emoji: '☕',
    badge: null
  },
  {
    id: 17,
    name: 'Apple Pie',
    category: 'Desserts',
    price: '₹ 120',
    description: 'Warm apple pie',
    emoji: '🥧',
    badge: 'Popular'
  },
  {
    id: 18,
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: '₹ 150',
    description: 'Rich chocolate flavor',
    emoji: '🍰',
    badge: 'Best Seller'
  },
  {
    id: 19,
    name: 'Ice Cream',
    category: 'Desserts',
    price: '₹ 100',
    description: 'Creamy vanilla ice cream',
    emoji: '🍦',
    badge: null
  },
  {
    id: 20,
    name: 'Brownie',
    category: 'Desserts',
    price: '₹ 130',
    description: 'Fudgy chocolate brownie',
    emoji: '🍫',
    badge: null
  }
];

const ProductCard = ({ product, isFirst }) => (
  <div className={`productCard ${isFirst ? 'featured' : ''}`}>
    <div className="productImage">
      <div className="imageLabel">Image</div>
    </div>
    <div className="productDetails">
      <div className="productName">Name: {product.name}</div>
      <div className="productDescription">Description: {product.description}</div>
      <div className="productPrice">Price: {product.price}</div>
      <div className="productMeta">Average Prep Time: 20 Min</div>
      <div className="productMeta">Category: {product.category}</div>
    </div>
  </div>
);

export default function Items() {
  return (
    <>
      <style>{styles}</style>
      <div className="itemsContainer">
        <div className="productsGrid">
          {mockProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </>
  );
}

const styles = `
  

  .itemsContainer {
    padding: 24px;
    background-color: #f0f5f3;
  }

  .productsGrid {
    display: grid;
    grid-template-columns:1fr 1fr 1fr ;
    gap : 100px;
    background-color: #f0f5f3;
    padding-right: 50px;
  }

  .productCard {
    background: white;
    border-radius: 20px;
    padding: 16px 16px 48px 16px;
  }

  .productImage {
    background-color: #e5e7eb;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #6b7280;
    border-radius: 30px;
    padding: 16px;

  }

  .imageLabel {
    text-align: center;
  }

  .productDetails {
    padding: 16px;
  }

  .productName {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .productDescription {
    font-size: 13px;
    color: #4b5563;
    margin-bottom: 6px;
  }

  .productPrice {
    font-size: 13px;
    color: #1f2937;
    margin-bottom: 6px;
  }

  .productMeta {
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .productInStock {
    font-size: 13px;
    color: #059669;
    margin-top: 8px;
    font-weight: 500;
  }
`;