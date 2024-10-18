import styles from '../../../styles/pages/Products/allProducts.module.css';
import Header from '../../../components/PageHeader/Header';
import TableComponent from './Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditButton from '../../../components/Buttons/EditButton';
import { useNavigate } from 'react-router-dom';
import { safalBackend } from '../../../constants/apiRoutes';
import { toast } from 'react-toastify';
function AllProduct() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const fetchInitialData = async () => {
        try {
            const response = await axios.get(`${safalBackend}/product`);
            if (response.data.success) {
                setData(response?.data?.data?.products);
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while fetching products. Please try again later.");
            }
        }
    }
    useEffect(() => {
        fetchInitialData();
    }, []);

    const columns = ["name", "MRP", "stockAvailable", "action"];
    const AddNewProduct = () => {
        navigate('/product/new');
    }
    return (
        <div className={styles.parentDiv}>
            <Header heading="All Products" />
            <div className={styles.container}>
                <div className={styles.button}>
                    < EditButton text={"Add New Product"} onClickFunction={AddNewProduct} />
                </div>
                <TableComponent headers={columns} rows={data} />

            </div>
        </div>
    )
}

export default AllProduct