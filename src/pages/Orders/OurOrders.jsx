import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Orders/supplements.module.css";
import TableComponent from "./Table";
import { useState, useEffect } from "react";
import axios from "axios";
import EditButton from "../../components/Buttons/EditButton";
import { useNavigate } from "react-router-dom";
const OurOrders = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/order');
                if (response.data.success) {
                    const orders = response.data.data.map(order => ({
                        orderId: order.orderId,
                        id: order._id,
                        source: order.source,
                        orderedBy: order.userDetails.name,
                        orderedItems: order.orderedItems.map(item => `${item.productId.name} (x${item.quantity})`).join(', '),
                        orderDate: new Date(order.orderDate).toLocaleDateString(),
                        orderStatus: order.orderStatus,
                    }));
                    // console.log(response.data.data);
                    setData(orders);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    //  console.log(data);
    const columns = ["orderId", "source", "orderedBy", "orderedItems", "orderDate", "orderStatus", "action"];
    const createNewOrder = async () => {
        navigate("/order/new")
    }
    return (
        <div className={styles.parentDiv}>
            <Header heading="Our Recent Orders" />
            <div className={styles.container}>
                <div className={styles.button}>
                    < EditButton text={"Create New Order"} onClickFunction={createNewOrder} />

                </div>
                <TableComponent headers={columns} rows={data} />
            </div>
        </div>
    );
};

export default OurOrders;
