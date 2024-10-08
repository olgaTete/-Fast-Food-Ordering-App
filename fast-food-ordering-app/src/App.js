import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import ThemeToggle from './components/ThemeToggle';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState('menu');
  const [customer, setCustomer] = useState(null); // Track logged-in user

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

  const handleRegisterClick = () => {
    setView('register');
  };

  const handleLoginClick = () => {
    setView('login');
  };

  const handleAuthSuccess = (user) => {
    console.log('Logged In User:', user); // Add this to check if fullName exists in the user object
    setCustomer(user);
    setView('menu');
  };

  const handleMenuClick = () => {
    setView('menu');
  };

  // Fetch Menu items from backend
  useEffect(() => {
    axios.get('/api/Menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

    // Construct the order payload using customer data
    const placeOrder = () => {
      if (!customer) {
        console.error('User not authenticated! Redirecting to login...');
        setView('login'); // Redirect to login if the user is not authenticated
        return;
      }
    
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User not authenticated! Token missing.');
        return;
      }
      // Check if fullName exists
  if (!customer.fullName) {
    console.error('FullName is missing from customer object:', customer);
    return;
  }
      // Construct the order payload using customer data
      const payload = {
        orderId: uuidv4(), // Generate unique ID using uuidv4
        orderDate: new Date().toISOString(), // Current date in ISO format
        totalAmount: totalPrice, // Total price for the order
        user: {
          id: customer.id, // Use customer data from state
          userName: customer.email,
          email: customer.email,
          fullName: customer.fullName,
        },
        //items: order.map(item => ({
        //  itemId: item.id,
        //  name: item.name,
        //  quantity: item.quantity,
        //  price: item.price,
       // })),
      };
    
      axios.post(
        'api/Order',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        console.log('Order placed successfully:', response.data);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Backend Error:', error.response.data); // Print the backend error message
        } else {
          console.error('Error placing order:', error);
        }});
    };    

  return (
    <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}>
      <div className="container">
        <header className="my-4">
        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <h1>Fast-Food Ordering App</h1>
  <div>
  <button className="btn btn-info mx-2" onClick={handleMenuClick}>
              Menu
            </button>
            {customer ? (
              <>
                <span className="mx-2">Hello, {customer.fullName || 'Guest'}!</span>
                <button className="btn btn-danger mx-2" onClick={() => {
                  setCustomer(null);
                  localStorage.removeItem('token');
                }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary mx-2" onClick={handleRegisterClick}>
                  Register
                </button>
                <button className="btn btn-secondary mx-2" onClick={handleLoginClick}>
                  Login
                </button>
              </>
            )}
              </div>
        </header>
        //<Menu menuItems={menuItems} addToOrder={addToOrder} />
        //<OrderSummary order={order} updateQuantity={updateQuantity} totalPrice={totalPrice} />
        {view === 'menu' && (
          <>
            <Menu menuItems={menuItems} addToOrder={addToOrder} />
            <OrderSummary 
              order={order} 
              updateQuantity={updateQuantity} 
              totalPrice={totalPrice} 
              placeOrder={placeOrder} 
            />
          </>
        )}
        {view === 'register' && <Register onAuthSuccess={handleAuthSuccess} />}
        {view === 'login' && <Login onAuthSuccess={handleAuthSuccess} />}
      </div>
    </div>
  );
}

export default App;
