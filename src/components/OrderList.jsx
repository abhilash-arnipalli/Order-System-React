import PropTypes from 'prop-types';
import './OrderList.css';

// OrderList component to display the list of orders
const OrderList = ({ orders }) => {
    return (
        <div className="order-list">
            <h2>Order List</h2>
            {orders.length === 0 ? (
                // display a message if there are no orders
                <p>No orders yet. Please add an order.</p>
            ) : (
                <ul>
                    {orders.map((order, index) => {
                        // calculate the total cost of the order
                        const orderTotal = order.items.reduce((total, item) => total + item.price * item.count, 0);
                        return (
                            <li key={index}>
                                <p>Type: {order.type}</p>
                                {order.type === 'Delivery' && <p>Address: {order.address}</p>}
                                <h3>Items:</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.name}</td>
                                                <td>{item.count}</td>
                                                <td>${item.price.toFixed(2)} each</td>
                                                <td>${(item.price * item.count).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <h4>Total: ${orderTotal.toFixed(2)}</h4>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

// PropTypes for validation
OrderList.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            address: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    price: PropTypes.number.isRequired,
                    count: PropTypes.number.isRequired
                }).isRequired
            ).isRequired
        }).isRequired
    ).isRequired
};

export default OrderList;
