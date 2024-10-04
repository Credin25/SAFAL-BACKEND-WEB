import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Agent/createAgent.module.css";
import TextField from '@mui/material/TextField';
import BlueButton from "../../../components/Buttons/BlueButton";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { toast } from "react-toastify";
import { safalBackend } from '../../../constants/apiRoutes';
import { useNavigate } from 'react-router-dom';
function EditAgent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState({});
    // eslint-disable-next-line
    const [gender, setGender] = useState('');

    const fetchData = async () => {
        if (!id) {
            toast.error("Invalid agent ID.");
            return;
        }
        try {
            const response = await axios.get(`${safalBackend}/agent/${id}`);
            if (response.data.success) {
                setInitialData(response.data.data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while fetching agent. Please try again later.");
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInitialData({ ...initialData, [name]: value });
    };

    const handleAddressInput = (e) => {
        const { name, value } = e.target;
        setInitialData({
            ...initialData,
            address: { ...initialData.address, [name]: value },
        });
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setInitialData({ ...initialData, gender: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${safalBackend}/agent/${id}`, initialData);
            if (response.data.success) {
                toast.success("Agent updated successfully!");
                setInitialData(response.data.data);
                navigate('/agents')
            } else {
                toast.error("Failed to update agent.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while updating agent.");
        }
    };

    return (
        <div className={styles.parentDiv}>
            <Header heading="Edit Agent" />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.Formrow}>
                        <TextField
                            label="First Name"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.firstName || ""}
                            onChange={handleInput}
                            name="firstName"
                        />
                        <TextField
                            label="Last Name"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.lastName || ""}
                            onChange={handleInput}
                            name="lastName"
                        />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            label="Pan Number"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.panNumber || ""}
                            onChange={handleInput}
                            name="panNumber"
                            disabled
                        />
                        <TextField
                            label="Aadhar Number"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.aadharNumber || ""}
                            onChange={handleInput}
                            name="aadharNumber"
                        />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            label="Voter Id"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.voterId || ""}
                            onChange={handleInput}
                            name="voterId"
                        />
                        <TextField
                            label="Mobile Number"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.phone || ""}
                            onChange={handleInput}
                            name="phone"
                            disabled
                        />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            label="Email"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.email || ""}
                            onChange={handleInput}
                            name="email"
                        />
                        <TextField
                            label="Password"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.password || ""}
                            onChange={handleInput}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            label="Pincode"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.address?.pinCode || ""}
                            onChange={handleAddressInput}
                            name="pinCode"
                        />
                        <TextField
                            label="City"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.address?.city || ""}
                            onChange={handleAddressInput}
                            name="city"
                        />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            label="State"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.address?.state || ""}
                            onChange={handleAddressInput}
                            name="state"
                        />
                        <TextField
                            label="District"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.address?.district || ""}
                            onChange={handleAddressInput}
                            name="district"
                        />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            label="Address Line 1"
                            sx={{ width: "30%" }}
                            required
                            value={initialData?.address?.addressLine1 || ""}
                            onChange={handleAddressInput}
                            name="addressLine1"
                        />
                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                value={initialData?.gender || ""}
                                label="Gender"
                                onChange={handleGenderChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.ButtonRow}>
                        <BlueButton text="Update Agent" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAgent;
