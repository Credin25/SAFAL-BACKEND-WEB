import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Sale/SellOrder.module.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import TableComponent from "./Table";
import axios from "axios";
function SellOrder() {
  const [age, setAge] = useState('');
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agent/all');
        if (response.data.success) {
          setAllData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const rows = allData.map((Agent) => {
      console.log(Agent);
      const obj = {
      }
      obj.name = `${Agent.firstName} ${Agent.lastName}`;
      obj.phone = Agent.phone;
      obj.pannumber = Agent.panNumber;
      obj.aadharnumber = Agent.aadharNumber;
      obj.voterid = Agent.voterId;
      obj.id = Agent._id;
      return obj;
    });
    setRows(rows);
  }, [allData])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const columns = [
    "Name", "Phone", "PanNumber", "aadharNumber", "voterId", "Action"
  ];
  return (
    <div className={styles.parentDiv}>
      <Header heading="Our Selling Orders" />
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <FormControl sx={
            {
              
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