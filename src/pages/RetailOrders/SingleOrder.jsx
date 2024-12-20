import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Orders/order.module.css";
import { useEffect, useState } from "react";
import Header from "../../components/PageHeader/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { safalBackend } from "../../constants/apiRoutes";
const SafalOrder = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`${safalBackend}/order/${id}`);
            if (response.data.success) {

                setData(response.data.data);
                setStatus(response.data.data.order.orderStatus);
            }

        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while fetching order. Please try again later.");
            }
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        try {
            const response = await axios.patch(`${safalBackend}/order/${id}`, {
                orderStatus: newStatus,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchData();
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while updating order. Please try again later.");
            }
        }
    };


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [id]);

    function formatDateAndTime(orderDate) {
        // Convert the order date to a JavaScript Date object
        const dateObj = new Date(orderDate);
    
        // Format the date in dd-mm-yyyy
        const date = dateObj.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    
        // Format the time in HH:MM:SS
        const time = dateObj.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    
        return `${date} ${time}`;
    }
    
    // Example usage:
    console.log(formatDateAndTime("2024-12-20T10:00:00Z"));
    
    console.log(data?.order);
    return (
        <div className={styles.parentDiv}>
            <Header heading="Order" />
            <div className={styles.container}>
                <div className={styles.userDetails} >
                    <div>
                        <p> <span>Name:</span> {data?.user?.firstName} {data?.user?.lastName} {data?.order?.user?.customerName} </p>
                        <p> <span>Phone:</span> {data?.user?.phone} {data?.order?.user?.customerMobile} </p>
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
                        {data?.order?.orderedBy && <p>Order By: {data?.order?.orderedBy}</p>}
                        <p>Order Date: {formatDateAndTime(data?.order?.createdAt)}</p>

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



export default SafalOrder;