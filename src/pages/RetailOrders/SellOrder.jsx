import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Sale/SellOrder.module.css";
import { useState, useEffect } from "react";
import TableComponent from "./Table";
import axios from "axios";
import { safalBackend } from "../../constants/apiRoutes";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import EditButton from "../../components/Buttons/EditButton";
function SellOrder() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filters, setFilters] = useState({
    source: 'all',
    status: 'all',
    timeframe: 'all'
  });
  const filterOptions = {
    source: [
      { value: 'all', label: 'All Sources' },
      { value: 'agent', label: 'Agent' },
      { value: 'safal', label: 'Safal' }
    ],
    status: [
      { value: 'all', label: 'All Statuses' },
      { value: 'PENDING', label: 'Pending' },
      { value: 'ACCEPTED_ORDER', label: 'Accepted' },
      { value: 'DISPATCHED', label: 'Dispatched' },
      { value: 'DELIVERED', label: 'Delivered' }
    ],
    timeframe: [
      { value: 'all', label: 'All Time' },
      { value: 'today', label: 'Today' },
      { value: 'monthly', label: 'Current Month' },
      { value: 'yearly', label: 'Current Year' }
    ]
  };
  const FilterContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  }));
  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 300,
    margin: theme.spacing(1),
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${safalBackend}/sell`, { withCredentials: true });
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
      const obj = {
      }
      obj.safalorderuniqueid = SingleSale?.orderUniqueId; // mongodb id for changing order status of safal orders
      obj.orderid = SingleSale?.orderID;
      obj.date = SingleSale?.Date
      obj.ordertable = SingleSale?.orderTable;
      obj.amount = SingleSale?.amount;
      obj.customername = SingleSale?.customerName;
      obj.customernumber = SingleSale?.customerNumber;
      obj.orderstatus = SingleSale?.orderStatus;
      obj.agentname = SingleSale?.agentName;
      obj.paymentmode = SingleSale?.paymentMode;
      obj.ordereditems = SingleSale.orderedItems.map(item => `${item?.productName} (x${item?.quantity})`).join(', ')
      return obj;
    });
    setRows(rows);
  }, [allData]);

  useEffect(() => {
    let filteredData = [...rows];

    // Filter by source
    if (filters.source !== 'all') {
      filteredData = filteredData.filter((singleData) => {
        return singleData.ordertable === (filters.source === 'agent' ? 'AGENT' : 'SAFAL');
      });
    }
    // Filter by timeframe
    if (filters.timeframe !== 'all') {
      const today = new Date();
      filteredData = filteredData.filter((singleData) => {
        const orderDate = new Date(singleData.date); // Make sure date is a Date object
        if (filters.timeframe === 'today') {
          return orderDate.toDateString() === today.toDateString();
        } else if (filters.timeframe === 'monthly') {
          return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
        } else if (filters.timeframe === 'yearly') {
          return orderDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }
    // Debug status filter logic
    if (filters.status !== 'all') {
      filteredData = filteredData.filter((singleData) => {
        return singleData.orderstatus === filters.status;
      });
    }
    setFilteredRows(filteredData);
  }, [filters, rows]);

  const columns = [
    "Date", "orderID", "orderTable", "agentName", "orderStatus", "amount", "customerName", "customerNumber", "orderedItems", "paymentmode", "action"
  ];
  // Handle filter changes
  const handleFilterChange = (filterType) => (event) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: event.target.value
    }));
  };

  return (
    <div className={styles.parentDiv}>
      <Header heading="Retail Orders" />
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div className={styles.createButton}>
            <EditButton text={"Create New Order"} onClickFunction={() => navigate("/retail/new/order")}  />
          </div>
          <FilterContainer>
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <StyledFormControl key={filterType}>
                <InputLabel id={`${filterType}-label`}>
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </InputLabel>
                <Select
                  labelId={`${filterType}-label`}
                  value={filters[filterType]}
                  label={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  onChange={handleFilterChange(filterType)}
                >
                  {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            ))}
          </FilterContainer>
        </div>
        <TableComponent headers={columns} rows={filteredRows} />
      </div>
    </div>
  )
}

export default SellOrder