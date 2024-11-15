import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Customers/viewCustomer.module.css";
import TableComponent from "./Table";
import FullWidthTextField from "../../../components/SearchBar/SearchBar";
import EditButton from "../../../components/Buttons/EditButton";
import GreyButton from "../../../components/Buttons/GreyButton";
import BlueButton from "../../../components/Buttons/BlueButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { safalBackend } from "../../../constants/apiRoutes";
const SafalUsers = () => {
    const [allData, setAllData] = useState([]);
    const [rows, setRows] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${safalBackend}/users/get-all-users?page=${pageNumber}`);
            if (response.data.success) {
                const allsafalUsers = response?.data?.data?.map(user => ({
                    phone: user?.phone,
                    id: user?._id,
                    pan: user?.PAN,
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                    aadhar: user?.aadhar
                }));
                setRows(allsafalUsers);
            };

            setAllData(response.data.data);
        } catch (error) {
            console.log(error)
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while fetching Users. Please try again later.");
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    const columns = ["phone", "name", "PAN", "email", "aadhar", "action"];
    const serachFunction = async (searchStr) => {
        try {
            const response = await axios.post(`${safalBackend}/users/safal/user/search`, {
                "searchQuery": searchStr
            });
            if(response.data.success){
                const allsafalUsers = response?.data?.data?.map(user => ({
                    phone: user?.phone,
                    id: user?._id,
                    pan: user?.PAN,
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                    aadhar: user?.aadhar
                }));
                setRows(allsafalUsers);
            }
        } catch (error) {
            if (error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while searching users. Please try again later.");
            }
        }
    };
    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1);
        }
    };

    const goToNextPage = () => {
        setPageNumber(prev => prev + 1);
    };


    return (

        <div className={styles.parentDiv}>
            <Header heading="Safal Customers" />
            <div className={styles.container}>
                <div className={styles.topHeader}>
                    <FullWidthTextField placeholder="Search By Phone Number / Pan Number / Name" onSearch={serachFunction} />
                </div>
                <TableComponent rows={rows} headers={columns} />

                <div className={styles.buttonDiv}>
                    <GreyButton text="Back" onClickFunction={() => { }} />
                    <div className={styles.pageDiv}>
                        <BlueButton text="Previous" onClickFunction={goToPreviousPage} />
                        <span className={styles.pageNo}>{pageNumber}</span>
                        <BlueButton text="Next" onClickFunction={goToNextPage} />
                    </div>
                </div>

            </div>
        </div>
    )
};


export default SafalUsers;