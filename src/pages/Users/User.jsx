import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from "../../components/PageHeader/Header";
import axios from 'axios';
import styles from "../../styles/pages/Users/user.module.css";
import { useNavigate } from 'react-router-dom';
import { safalBackend } from '../../constants/apiRoutes';
import { toast } from 'react-toastify';
function User() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${safalBackend}/users/${id}`);
                if (response.data.success) {
                    setData(response.data.data);
                    console.log(response.data.data);
                }
            } catch (error) {
                if(error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Error while fetching user. Please try again later");
                }
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className={styles.parentDiv}>
            <Header heading="User" />
            <div className={styles.container}>
                <div className={styles.userInfoSection}>
                    <div className={styles.userDetails}>
                        <h1 className={styles.userName}>{data?.User?.firstName} {data?.User?.lastName}</h1>
                        <p className={styles.userPhone}>{data?.User?.phone}</p>
                    </div>

                    <div className={styles.userStats}>
                        <div className={styles.statItem}>
                            <p className={styles.statLabel}>Total Orders:</p>
                            <p className={styles.statValue}>{data?.totalOrders}</p>
                        </div>
                        <div className={styles.statItem}>
                            <p className={styles.statLabel}>Monthly Orders:</p>
                            <p className={styles.statValue}>{data?.totalCurrentMonthOrders}</p>
                        </div>
                    </div>

                    <div className={styles.userBalance}>
                        <p className={styles.balanceLabel}>Amount left to be Paid:</p>
                        <p className={styles.balanceValue}>₹ 10,000</p>
                    </div>
                </div>

                {
                    data?.Sale?.length > 0 ? <div className={styles.table}>
                        <h3 style={{ padding: '0 20px' }}>Sell</h3>
                        <table className={styles.tablediv} onClick={() =>
                            navigate(`/user/${id}/sell`)
                        }>
                            <thead>
                                <tr>
                                    <th className={styles.header}>Customer Name</th>
                                    <th className={styles.header}>Products Buy</th>
                                    <th className={styles.header}>Amount</th>
                                    <th className={styles.header}>Date</th>
                                    <th className={styles.header}>Customer Mobile Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.Sale?.map((sale, index) => (
                                    <tr key={index}>
                                        <td className={styles.row}>{sale.orderId}</td>
                                        <td className={styles.row}>
                                            {sale?.sellItems?.map((item, index) => (
                                                <p key={index}>
                                                    {item.productId.name} <span> x {item.quantity}</span>
                                                </p>
                                            ))}
                                        </td>
                                        <td className={styles.row}>{sale.amount}</td>
                                        <td className={styles.row}>{sale.createdAt}</td>
                                        <td className={styles.row}>{sale.customerContactNumber}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : " "
                }
                <br>
                </br>
                <br>
                </br>
                <br></br>
                {
                    data?.Orders?.length > 0 ? <div className={styles.table}>
                        <h3 style={{ padding: '0 20px' }}>Buy</h3>
                        <table className={styles.tablediv} >
                            <thead>
                                <tr>
                                    <th className={styles.header}>Order ID</th>
                                    <th className={styles.header}>Order Date</th>
                                    <th className={styles.header}>Order Amount</th>
                                    <th className={styles.header}> Ordered Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.Orders?.map((order, index) => (
                                    <tr key={index}>
                                        <td className={styles.row}>{order.orderId}</td>
                                        <td className={styles.row}>{order.orderDate}</td>
                                        <td className={styles.row}>{order.amount}</td>
                                        <td className={styles.row}>
                                            {order?.orderedItems?.map((item, index) => (
                                                <p key={index}>
                                                    {item.productId.name} <span> x {item.quantity}</span>
                                                </p>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : " "
                }


            </div>
        </div>
    );
}

export default User;
