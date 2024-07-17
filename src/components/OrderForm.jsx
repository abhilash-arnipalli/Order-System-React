import { useState } from 'react';
import PropTypes from 'prop-types';
import './OrderForm.css';
import { createOrder } from '../services/apiService';

// OrderForm component for adding new orders
const OrderForm = ({ addOrder, menuItems }) => {
    // State hooks to manage the form inputs and selected items
    const [orderType, setOrderType] = useState('Delivery');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [currentItemCount, setCurrentItemCount] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);

    // Handler for changing the order type
    const handleOrderTypeChange = (e) => {
        setOrderType(e.target.value);
    };

    // Handler for changing the delivery address
    const handleAddressChange = (e) => {
        setDeliveryAddress(e.target.value);
    };

    // Handler for changing the selected menu item
    const handleItemChange = (e) => {
        setCurrentItem(e.target.value);
    };

    // Handler for changing the item count
    const handleItemCountChange = (e) => {
        setCurrentItemCount(e.target.value);
    };

    // Handler for adding an item to the selected items list
    const handleAddItem = () => {
        const item = menuItems.find(item => item.id === parseInt(currentItem));
        setSelectedItems([...selectedItems, { ...item, count: currentItemCount }]);
        setCurrentItem('');
        setCurrentItemCount(1);
    };

    // Handler for submitting the order form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedItems.length === 0) {
            alert("Please add at least one item to the order.");
            return;
        }
        const newOrder = {
            type: orderType,
            address: orderType === 'Delivery' ? deliveryAddress : null,
            items: selectedItems,
        };
        try {
            await createOrder(newOrder);
            addOrder(newOrder);
            setOrderType('Delivery');
            setDeliveryAddress('');
            setSelectedItems([]);
            setCurrentItem('');
            setCurrentItemCount(1);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="order-form">
            {/* Order type selection */}
            <div className="form-group">
                <label>Order Type:</label>
                <select value={orderType} onChange={handleOrderTypeChange}>
                    <option value="Delivery">Delivery</option>
                    <option value="Takeout">Takeout</option>
                </select>
            </div>
            {/* Delivery address input if order type is Delivery */}
            {orderType === 'Delivery' && (
                <div className="form-group">
                    <label>Delivery Address:</label>
                    <input type="text" value={deliveryAddress} onChange={handleAddressChange} required />
                </div>
            )}
            {/* Menu item selection and quantity input */}
            <div className="form-group">
                <label>Menu Items:</label>
                <select value={currentItem} onChange={handleItemChange}>
                    <option value="">Select an item</option>
                    {menuItems.map(item => (
                        <option key={item.id} value={item.id}>{item.name} - ${item.price.toFixed(2)}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Quantity:</label>
                <input
                    type="number"
                    value={currentItemCount}
                    min="1"
                    onChange={handleItemCountChange}
                    className="quantity-input"
                />
            </div>
            <div className="form-group">
                <button type="button" onClick={handleAddItem} disabled={!currentItem} className="add-button">
                    Add Item
                </button>
            </div>
            {/* Display selected items */}
            {selectedItems.length > 0 && (
                <div>
                    <h3>Selected Items:</h3>
                    <ul>
                        {selectedItems.map((item, idx) => (
                            <li key={idx}>
                                {item.name} x {item.count} - ${item.price.toFixed(2)} each
                                <br />
                                Subtotal: ${(item.price * item.count).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Finish order button */}
            <button type="submit" className="finish-button">Finish Order</button>
        </form>
    );
};

// PropTypes for validation
OrderForm.propTypes = {
    addOrder: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        })
    ).isRequired,
};

export default OrderForm;