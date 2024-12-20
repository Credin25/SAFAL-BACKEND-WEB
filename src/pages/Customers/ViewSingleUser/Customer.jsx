import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/PageHeader/Header';
import { useState, useEffect } from 'react';
import { safalBackend } from '../../../constants/apiRoutes';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from "../../../styles/pages/Customers/customer.module.css";

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  const fetchInitialData = async () => {
    try {
      const response = await axios.get(`${safalBackend}/users/${id}`);
      if (response.data.success) {
        setCustomer(response.data.data);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error while fetching customer information. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [id]);
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.parentDiv}>
      <Header heading={`${customer?.User?.firstName || ''} ${customer?.User?.lastName || ''}`} />
      <div className={styles.container}>
        <div className={styles.userInfoSection}>
          <div className={styles.userDetails}>
            <p className={styles.userPhone}>Mobile Number: {customer?.User?.phone || 'Phone not available'}</p>
            <p className={styles.gender}>Gender: {customer?.User?.gender || 'Gender not specified'}</p>
            <p className={styles.gender}>Pan Number: {customer?.User?.PAN || 'Pan not available'}</p>
          </div>


          <div className={styles.userStats}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Total Orders:</p>
              <p className={styles.statValue}>{customer?.totalOrders || 0}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>Monthly Orders:</p>
              <p className={styles.statValue}>{customer?.totalCurrentMonthOrders || 0}</p>
            </div>
          </div>
        </div>
        <br />
        <br></br>
        {
          customer?.Orders?.length > 0 ? <div className={styles.table}>
            <h3 style={{ padding: '0 20px' }}>Order History</h3>
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
                {customer?.Orders?.slice().reverse().map((order, index) => (
                  <tr key={index}>
                    <td className={styles.row}>{order?.orderId}</td>
                    <td className={styles.row}>{formatDate(order?.orderDate)}</td>
                    <td className={styles.row}>{order?.amount}</td>
                    <td className={styles.row}>
                      {order?.orderedItems?.map((item, index) => (
                        <p key={index}>
                          {item?.productId?.name} <span> x {item?.quantity}</span>
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

export default Customer;
