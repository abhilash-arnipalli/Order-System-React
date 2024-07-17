import { useState } from 'react';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import './App.css';

// define a list of menu items for the bakery/dessert shop with their names and prices
const menuItems = [
    { id: 1, name: 'Cookie', price: 1.99 },
    { id: 2, name: 'Donut', price: 2.49 },
    { id: 3, name: 'Muffin', price: 3.99 },
    { id: 4, name: 'Cake', price: 25.99 },
    { id: 5, name: 'Brownie', price: 5.49 },
    { id: 6, name: 'Cupcake', price: 2.99 },
    { id: 7, name: 'Cheesecake', price: 14.99 },
    { id: 8, name: 'Bagel', price: 3.49 },
    { id: 9, name: 'Toast', price: 1.49 },
    { id: 10, name: 'Croissant', price: 2.99 },
    { id: 11, name: 'Pastry', price: 3.29 },
    { id: 12, name: 'Tart', price: 4.99 },
    { id: 13, name: 'Pie', price: 13.99 },
    { id: 14, name: 'Cookie Cake', price: 22.99 },
    { id: 15, name: 'Cannoli', price: 7.49 },
];

function App() {
    // initialize state to keep track of orders
    const [orders, setOrders] = useState([]);

    // function to add a new order to the list of orders
    const addOrder = (order) => {
        setOrders([...orders, order]);
    };

    return (
        <div className="App">
            <h1>Order Processing System</h1>
            <OrderForm addOrder={addOrder} menuItems={menuItems} />
            <OrderList orders={orders} />
        </div>
    );
}

export default App;