import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Staff/ViewStaff.module.css";
import TableComponent from "./Table";
import { useEffect, useState } from "react";
import axios from "axios";
import FullWidthTextField from "../../../components/SearchBar/SearchBar";
import EditButton from "../../../components/Buttons/EditButton";
import { useNavigate } from "react-router-dom";
import { safalBackend } from "../../../constants/apiRoutes";
import { toast } from "react-toastify";
function ViewStaff() {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${safalBackend}/staff`);
                if (response.data.success) {
                    setAllData(response.data.data);
                }
            } catch (error) {
               if (error.response?.data?.message) {
                   toast.error(error.response.data.message);
               } else {
                   toast.error("Error while fetching staff. Please try again later");
               }
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        const rows = allData.map((Staff) => {
            console.log(Staff);
            const obj = {
            }
            obj.name = Staff.name;
            obj.mobile = Staff.mobile;
            obj.pannumber = Staff.pan;
            obj.email = Staff.email;
            obj.createdby = Staff.created_by;
            obj.id = Staff._id;
            obj.staffid = Staff.staffId
            obj.branch = Staff.branch
            return obj;
        });
        setRows(rows);
    }, [allData])

    const columns = [
        "Name", "Email", "StaffID", "Mobile", "CreatedBy", "Branch", "PanNumber"
    ];
    const serachFunction = async (searchStr) => {

        try {
            const response = await axios.post(`${safalBackend}/staff/search`, {
                "searchQuery": searchStr
            });
            if (response.data.statusCode === 200) {
                setAllData(response.data.data);
            }
        } catch (error) {
            if(error.response?.data?.message){
                toast.error(error.response.data.message);
            }else{
                toast.error("Error while fetching staff. Please try again later");
            }
        }
    };
    const handleAddNewStaff = async () => {
        navigate("/staff");
    }
    return (
        <div className={styles.parentDiv}>
            <Header heading="All Staff" />
            <div className={styles.container}>
                <div className={styles.topHeader}>
                    <FullWidthTextField placeholder="Search By Phone Number / Pan Number / Name / Email" onSearch={serachFunction} />
                    <div>
                        <EditButton text="New Staff" onClickFunction={handleAddNewStaff} />
                    </div>

                </div>
                <TableComponent rows={rows} headers={columns} />
            </div>
        </div>
    )
}


export default ViewStaff