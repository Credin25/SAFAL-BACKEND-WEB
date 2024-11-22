import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Orders/order.module.css";
import { useEffect, useState } from "react";
import Header from "../../components/PageHeader/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { safalBackend } from "../../constants/apiRoutes";
import BlueButton from "../../components/Buttons/BlueButton";
function Order() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [status, setStatus] = useState("");
    const [agentPricing, setAgentPricing] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${safalBackend}/order/${id}`);
            if (response.data.success) {
                setData(response.data.data);
                setStatus(response.data.data.order.orderStatus);
                const initialPricing = response.data.data.order.orderedItems.map(item => ({
                    productId: item.productId._id,
                    price: 0  
                }));
                setAgentPricing(initialPricing);
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
    };
    const handleAgentPricing = (price, productId) => {
        setAgentPricing(prevPricing => 
            prevPricing.map(item => 
                item.productId === productId 
                    ? { ...item, price: Number(price) }  
                    : item  
            )
        );
    };
    const updateAgentPricing = async (productId) => {
        const productPricing = agentPricing.find(item => item.productId === productId);
        if (!productPricing) return;

        try {
          const body = {
            productId: productPricing.productId,
            price: productPricing.price,
            orderId: id,
          };
          const responce = await axios.patch(`${safalBackend}/order/update/agent-price`, body);
          if(responce.data.success){
            toast.success(responce.data.message);
            fetchData();
          }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while updating agent pricing. Please try again later.");
            }
        }
    };
    const handleRecalculate = async () => {
        console.log("Recalculating agent pricing...");
       const res = await axios.get(`${safalBackend}/order/recalculate-amount/${id}`);
      if(res.data.success){
        toast.success(res.data.message);
        fetchData();

      }
    }
    return (
        <div className={styles.parentDiv}>
            <Header heading="Order" />
            <div className={styles.container}>
                <div className={styles.userDetails} >
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
                        <ul>
                            Agent Pricing
                            {data?.order?.agentPricing?.map((item, index) => (
                                <li key={index}>
                                    <p>{item?.productId?.name} * {item?.price}</p>
                                </li>
                            ))}
                        </ul>
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
                        <p>Agent Pricing</p>
                        <ul>
                            {data?.order?.orderedItems?.map((item, index) => (
                                <li key={index}>
                                    <p>{item.productId?.name} * {item.quantity}</p> <input type="number" onChange={(e) => handleAgentPricing(e.target.value, item.productId._id)} /> <button onClick={() => updateAgentPricing(item.productId._id)}>Add</button>
                                </li>
                            ))}
                        </ul>
                        <p>Ordered Items:</p>
                        <ul>
                            {data?.order?.orderedItems?.map((item, index) => (
                                <li key={index}>
                                    <p>{item.productId?.name} * {item.quantity}</p>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <p>After updating all agent pricing, click to recalculate order amount</p>
                          <BlueButton text="Recalculate" onClickFunction={handleRecalculate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
