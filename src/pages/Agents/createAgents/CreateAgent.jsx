import Header from "../../../components/PageHeader/Header";
import styles from "../../../styles/pages/Agent/createAgent.module.css";
import TextField from '@mui/material/TextField';
import BlueButton from "../../../components/Buttons/BlueButton";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const CreateAgent = () => {
    const [gender, setGender] = useState('');
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        panNumber: "",
        aadharNumber: "",
        voterId: "",
        phone: "",
        email: "",
        address: {
            pinCode: "",
            city: "",
            state: "",
            district: "",
            addressLine1: ""
        },
        password: ""
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

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setData({ ...data, gender: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post('http://localhost:5000/api/agent/add', data);
            if (response.data.statusCode === 200) {
                // console.log('Agent created successfully:', response.data);
                toast.success(response.data.message);
            }

            setData({
                firstName: "",
                lastName: "",
                panNumber: "",
                aadharNumber: "",
                voterId: "",
                phone: "",
                email: "",
                address: {
                    pinCode: "",
                    city: "",
                    state: "",
                    district: "",
                    addressLine1: ""
                },
                password: ""
            });
        } catch (error) {
            if (error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error creating agent. Please try again later.");
            }
        }
    };

    return (
        <div className={styles.parentDiv}>
            <Header heading="Create New Agent" />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.Formrow}>
                        <TextField label="First Name" sx={{ width: "30%" }} required value={data.firstName} onChange={handleInput} name="firstName" />
                        <TextField label="Last Name" sx={{ width: "30%" }} required value={data.lastName} onChange={handleInput} name="lastName" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Pan Number" sx={{ width: "30%" }} required value={data.panNumber} onChange={handleInput} name="panNumber" />
                        <TextField label="Aadhar Number" sx={{ width: "30%" }} required value={data.aadharNumber} onChange={handleInput} name="aadharNumber" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Voter Id" sx={{ width: "30%" }} required value={data.voterId} onChange={handleInput} name="voterId" />
                        <TextField label="Mobile Number" sx={{ width: "30%" }} required value={data.phone} onChange={handleInput} name="phone" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Email" sx={{ width: "30%" }} required value={data.email} onChange={handleInput} name="email" />
                        <TextField label="Password" sx={{ width: "30%" }} required value={data.password} onChange={handleInput} name="password" type="password" />
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
                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                value={gender}
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
                        <BlueButton text="Create Agent" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAgent;
