import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Sale/SellOrder.module.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import TableComponent from "./Table";
import axios from "axios";
import { safalBackend } from "../../constants/apiRoutes";
import { toast } from "react-toastify";
function SellOrder() {
  const [age, setAge] = useState('');
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${safalBackend}/sell`);
        if (response.data.success) {
          setAllData(response.data.data);
        }
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error while fetching orders. Please try again later");
        }
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const rows = allData.map((SingleSale) => {
      console.log(SingleSale);
      const obj = {
      }
      obj.orderid = SingleSale.orderID;
      obj.date = new Date(SingleSale.Date).toLocaleDateString();
      obj.ordertable = SingleSale.orderTable;
      obj.amount = SingleSale.amount;
      obj.customername = SingleSale.customerName;
      obj.customernumber = SingleSale.customerNumber;
      obj.ordereditems = SingleSale.orderedItems.map(item => `${item.productName} (x${item.quantity})`).join(', ')
      return obj;
    });
    setRows(rows);
  }, [allData])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const columns = [
    "orderID", "Date", "orderTable", "amount", "customerName", "customerNumber", "orderedItems"
  ];
  return (
    <div className={styles.parentDiv}>
      <Header heading="Our Selling Orders" />
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <FormControl sx={
            {
              minWidth: 300,
            }
          }>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Today</MenuItem>
              <MenuItem value={20}>Current Month</MenuItem>
              <MenuItem value={30}>Current Year</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableComponent headers={columns} rows={rows} />
      </div>
    </div>
  )
}

export default SellOrder