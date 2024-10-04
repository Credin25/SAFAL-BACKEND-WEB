import styles from '../../../styles/pages/Products/addNewProduct.module.css';
import Header from "../../../components/PageHeader/Header";
import TextField from '@mui/material/TextField';
import BlueButton from "../../../components/Buttons/BlueButton";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
function AddNewProduct() {
    const navigate = useNavigate();
    const [data, setFormData] = useState({
        name: "",
        MRP: "",
        safalAppPrice: "",
        agentAppPrice: "",
        safalBackendPrice: "",
        description: ""

    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...data, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const rqstData = {
            name: data.name,
            MRP: parseInt(data.MRP),
            price: {
                safalAppPrice: parseInt(data.safalAppPrice),
                agentAppPrice: parseInt(data.agentAppPrice),
                safalBackendPrice: parseInt(data.safalBackendPrice),
            },
            description: data.description


        }
        // console.log(rqstData);
        try {
            const res = await axios.post("http://localhost:5000/api/product", rqstData);
            if (res.data.success) {
                console.log(res.data)
                toast.success(res.data.message);
                navigate("/products")
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={styles.parentDiv}>
            <Header heading="Add New Product" />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.Formrow}>
                        <TextField label="Name" sx={{ width: "30%" }} required value={data.name} onChange={handleInput} name="name" />
                        <TextField label="MRP" sx={{ width: "30%" }} required value={data.MRP} onChange={handleInput} name="MRP" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Price for Agent App" sx={{ width: "30%" }} required value={data.agentAppPrice} onChange={handleInput} name="agentAppPrice" />
                        <TextField label="Price for SAFAL App" sx={{ width: "30%" }} required value={data.safalAppPrice} onChange={handleInput} name="safalAppPrice" />
                    </div>
                    <div className={styles.Formrow}>
                        <TextField label="Price for our Staff" sx={{ width: "30%" }} required value={data.safalBackendPrice} onChange={handleInput} name="safalBackendPrice" />

                    </div>
                    <div className={styles.Formrow}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Discription"
                            multiline
                            rows={4}
                            name="description"
                            required
                            sx={{ width: "100%" }}
                            value={data.description} onChange={handleInput}
                        />
                    </div>
                    <div className={styles.ButtonRow}>
                        <BlueButton text="Add Product" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewProduct