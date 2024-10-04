import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Staff/AddStaff.module.css";
import TextField from '@mui/material/TextField';
import BlueButton from "../../../components/Buttons/BlueButton";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { safalBackend } from '../../../constants/apiRoutes';

const AddNewLogin = () => {
    const LoggedInUser = localStorage.getItem('email');
    const [data, setData] = useState({
        name: "", email: "", staffId: "", password: "", mobile: "", created_by: LoggedInUser, branch: "", pan: "", 
        address: {
            pinCode: "", state: "", district: "", city: "", addressLine1: ""
        }
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleAddressInput = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            address: { ...data.address, [name]: value }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${safalBackend}/auth/register`, { ...data });
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "", email: "", staffId: "", password: "", mobile: "", created_by: "", branch: "", pan: "",
                    address: { pinCode: "", state: "", district: "", city: "", addressLine1: "" }
                });
            }
        } catch (error) {
            if (error.response?.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error creating agent. Please try again later.");
            }
        }
    };

    return (
        <div className={styles.parentDiv}>
            <Header heading="Add New Staff" />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.Formrow}>
                        <TextField label="Name" sx={{ width: "30%" }} required value={data.name} onChange={handleInput} name="name" />
                        <TextField label="Email" sx={{ width: "30%" }} required value={data.email} onChange={handleInput} name="email" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Staff Id" sx={{ width: "30%" }} required value={data.staffId} onChange={handleInput} name="staffId" />
                        <TextField label="Password" sx={{ width: "30%" }} required value={data.password} onChange={handleInput} name="password" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Mobile Number" sx={{ width: "30%" }} required value={data.mobile} onChange={handleInput} name="mobile" />
                        <TextField label="Branch" sx={{ width: "30%" }} required value={data.branch} onChange={handleInput} name="branch" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="PAN Number" sx={{ width: "30%" }} required value={data.pan} onChange={handleInput} name="pan" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Pincode" sx={{ width: "30%" }} required value={data.address.pinCode} onChange={handleAddressInput} name="pinCode" />
                        <TextField label="City" sx={{ width: "30%" }} required value={data.address.city} onChange={handleAddressInput} name="city" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="State" sx={{ width: "30%" }} required value={data.address.state} onChange={handleAddressInput} name="state" />
                        <TextField label="District" sx={{ width: "30%" }} required value={data.address.district} onChange={handleAddressInput} name="district" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Address Line 1" sx={{ width: "30%" }} required value={data.address.addressLine1} onChange={handleAddressInput} name="addressLine1" />
                    </div>
                    <div className={styles.ButtonRow}>
                        <BlueButton text="Add Staff" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewLogin;
