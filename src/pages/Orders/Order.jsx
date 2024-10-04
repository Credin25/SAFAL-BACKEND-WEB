import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Orders/order.module.css";
import { useEffect, useState } from "react";
import Header from "../../components/PageHeader/Header";
import axios from "axios";
import { toast } from "react-toastify";
function Order() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState(""); // New state for order status

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/order/${id}`);
            if (response.data.success) {
                setData(response.data.data);
                setStatus(response.data.data.order.orderStatus); // Initialize status
                console.log(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        try {
            const response = await axios.patch(`http://localhost:5000/api/order/${id}`, {
                orderStatus: newStatus, // Send the new status to the backend
            });
            console.log(response.data)
            if (response.data.success) {
                toast.success(response.data.message);
                fetchData(); // Fetch data again to update the component
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [id]);

    const handleUserClick = () => {
        window.location.href = `/user/${data?.user?._id}`;
    };


    function formatDateAndTime(orderDate) {
        // Convert the order date to a JavaScript Date object
        const dateObj = new Date(orderDate);

        // Adjust the time to IST (UTC+5:30)
        dateObj.setHours(dateObj.getHours() + 5.5);

        // Format the date and time in dd-mm-yyyy HH:MM:SS format
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return formattedDate;
    }
    return (
        <div className={styles.parentDiv}>
            <Header heading="Order" />
            <div className={styles.container}>
                <div className={styles.userDetails} onClick={handleUserClick}>
                    <div>
                        <p> <span>Name:</span> {data?.user?.firstName} {data?.user?.lastName} </p>
                        <p> <span>Phone:</span> {data?.user?.phone} </p>
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" width={100}></img>
                    </div>
                </div>
                <div className={styles.orderDetails}>
                    <div className={styles.leftdiv}>
                        <p>Order Id: {data?.order?.orderId}</p>
                        <p>Source: {data?.order?.source}</p>
                        <p>Amount: {data?.order?.amount}</p>
                        <p>Current Order Status:  {data?.order?.orderStatus}</p>
                        <p>Order Date: {formatDateAndTime(data?.order?.orderDate)}</p>
                    </div>
                    <div className={styles.rightdiv}>
                        <p>Order Status:</p>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="PENDING">Pending</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="RETURNED">Return</option>
                            <option value="AWAITING_PAYMENT">Awaiting Payment</option>
                            <option value="ON_CREDIT">ON Credit</option>
                            <option value="ACCEPTED_ORDER">Order Accepted</option>
                        </select>

                        <p>Ordered Items:</p>
                        <ul>
                            {data?.order?.orderedItems?.map((item, index) => (
                                <li key={index}>
                                    <p>{item.productId?.name} * {item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
