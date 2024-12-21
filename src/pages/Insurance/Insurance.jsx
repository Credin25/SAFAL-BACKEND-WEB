import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Insurance/insurance.module.css";
import TableComponent from "./Table";
import { useState, useEffect } from "react";
import axios from "axios";
import FullWidthTextField from "../../components/SearchBar/SearchBar";
import { safalBackend } from "../../constants/apiRoutes";
import { toast } from "react-toastify";
import { useDebounce } from 'use-debounce';

const Insurance = () => {
    const [allData, setAllData] = useState([]);
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${safalBackend}/insurance/all-insurance`, { withCredentials: true });
            if (response.data.success) {
                setAllData(response?.data?.data);
            }
        } catch (error) {
            if (error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while fetching insurance. Please try again later.");
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const rows = allData.map((Agent) => ({
            name: Agent?.name || "",
            insurancenumber: Agent?.insuranceNumber || "",
            mobile: Agent?.mobile || "",
            id: Agent?._id || "",
        }));
        setRows(rows);
    }, [allData]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            serachFunction(debouncedSearchTerm);
        } else {
            fetchData();
        }
    }, [debouncedSearchTerm]);

    const columns = [
        "Name", "InsuranceNumber", "Mobile", "Action"
    ];

    const serachFunction = async (searchStr) => {
        try {
            const response = await axios.post(`${safalBackend}/insurance/search`, {
                "searchQuery": searchStr
            });
            if (response.data.statusCode === 200) {
                setAllData(response.data.data);
            }
        } catch (error) {
            if (error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while searching insurance. Please try again later.");
            }
        }
    }

    return (
        <div className={styles.parentDiv}>
            <Header heading="Insurance" />
            <div className={styles.container}>
                <FullWidthTextField
                    placeholder="Search By Phone Number / Insurance Number / Aadhar Number / Name"
                    onSearch={(value) => setSearchTerm(value)}
                />
                <TableComponent rows={rows} headers={columns} />
            </div>
        </div>
    );
};

export default Insurance;
