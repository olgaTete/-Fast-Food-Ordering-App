import React, { useState } from 'react';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import foodImage from './food.jpg';


function App() {
  const [menuItems] = useState([
    { id: 1, name: 'Burger', description: 'A delicious burger with all the fixings.' , price: 79.99, image: foodImage },
    { id: 2, name: 'Pizza ', description: 'Classic pizza with your favorite toppings.' , price: 99.99, image: foodImage },
    { id: 3, name: 'Fries ', description: 'Crispy golden fries served hot and fresh.' , price: 59.99, image: foodImage },
  ]);

  const [order, setOrder] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addToOrder = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setOrder(order.filter((item) => item.id !== itemId));
    } else {
      setOrder(
        order.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalPrice = order.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
      <div className="container">
        <header className="my-4">
        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <h1>Fast-Food Ordering App</h1>
        </header>
        <Menu menuItems={menuItems} addToOrder={addToOrder} />
        <OrderSummary order={order} updateQuantity={updateQuantity} totalPrice={totalPrice} />
      </div>
    </div>
  );
}

export default App;
