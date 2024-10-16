import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../../components/PageHeader/Header";
import axios from "axios";
import styles from "../../../styles/pages/Products/viewProduct.module.css";
import { toast } from "react-toastify";
import { safalBackend } from "../../../constants/apiRoutes";
export default function ViewProduct() {
    const { id } = useParams();
    const [Product, setProduct] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        safalAppPrice: '',
        agentAppPrice: '',
        safalBackendPrice: '',
        stockAvailable: ''
    });
    const [slideIndex, setSlideIndex] = useState(0);


    const fetchInitialData = async () => {
        try {
            const response = await axios.get(`${safalBackend}/product/${id}`);
            if (response.data.success) {
                setProduct(response.data.data);
                setFormData({
                    description: response.data.data.description,
                    safalAppPrice: response.data.data.price.safalAppPrice,
                    agentAppPrice: response.data.data.price.agentAppPrice,
                    safalBackendPrice: response.data.data.price.safalBackendPrice,
                    stockAvailable: response.data.data.stockAvailable
                });
            }
        } catch (error) {
           if(error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while fetching product. Please try again later");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = async (e) => {
        const form = new FormData();
        form.append("file", e.target.files[0]);

        try {
            const res = await axios.patch(
                `:${safalBackend}/product/${id}`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setProduct(res.data.data);
                setIsEditing(false);
                fetchInitialData();
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.patch(`${safalBackend}/product/edit/${id}`, {
                description: formData.description,
                price: {
                    safalAppPrice: formData.safalAppPrice,
                    agentAppPrice: formData.agentAppPrice,
                    safalBackendPrice: formData.safalBackendPrice
                },
                stockAvailable: parseInt(formData.stockAvailable)
            });
            if (response.data.success) {
                setProduct(response.data.data);
                setIsEditing(false);
                fetchInitialData();
            }
        } catch (error) {
            if(error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while editing product. Please try again later");
            }
        }
    };

    useEffect(() => {
        fetchInitialData();
        // Fetch initial data here
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        // Set up an interval to auto-update the slide index every 2 seconds
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % (Product?.image?.length || 1));
        }, 2000); // Change slide every 2 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [Product?.image]);

    return (
        <div className={styles.parentDiv}>
            <Header heading={Product?.name} />
            <div className={styles.container}>
                <div className={styles.topControls}>
                    <button className={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel Edit" : "Edit"}
                    </button>
                </div>

                <div className={styles.details}>
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <label className={styles.label}>Description:</label>
                            <textarea
                                className={styles.inputField}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                            />
                            <label className={styles.label}>SAFAL APP Price:</label>
                            <input
                                type="text"
                                name="safalAppPrice"
                                value={formData.safalAppPrice}
                                onChange={handleInputChange}
                                className={styles.inputField}
                            />
                            <label className={styles.label}>AGENT APP Price:</label>
                            <input
                                type="text"
                                name="agentAppPrice"
                                value={formData.agentAppPrice}
                                onChange={handleInputChange}
                                className={styles.inputField}
                            />
                            <label className={styles.label}>OUR STAFF Price:</label>
                            <input
                                type="text"
                                name="safalBackendPrice"
                                value={formData.safalBackendPrice}
                                onChange={handleInputChange}
                                className={styles.inputField}
                            />
                            <label className={styles.label}>Update Available Stock:</label>
                            <input
                                type="text"
                                name="stockAvailable"
                                value={formData.stockAvailable}
                                onChange={handleInputChange}
                                className={styles.inputField}
                            />
                            <br />
                            <label className={styles.label}>Upload Product Image</label>
                            <input type='file' onChange={
                                handleImageChange} accept="image/*" className={styles.inputField} />
                            <button className={styles.saveButton} onClick={handleSave}>Save</button>
                        </div>
                    ) : (
                        <>
                            <h3>Description:</h3>
                            <p className={styles.description}>{Product?.description}</p>
                            <div className={styles.info}>
                                <p className={styles.mrp}>MRP: ₹{Product?.MRP}</p>
                                <p className={styles.mrp}>Stock Available: {Product?.stockAvailable}</p>
                            </div>
                            <div className={styles.prices}>
                                <h3>Selling Prices:</h3>
                                <p>SAFAL APP: ₹{Product?.price?.safalAppPrice}</p>
                                <p>AGENT APP: ₹{Product?.price?.agentAppPrice}</p>
                                <p>OUR STAFF: ₹{Product?.price?.safalBackendPrice}</p>
                            </div>

                            <div className={styles.imageContainer}>
                                {Product?.image?.map((image, index) => (
                                    <div
                                        key={image}
                                        className={`${styles.imageWrapper} ${slideIndex === index ? styles.active : ''}`}
                                    >
                                        <div className={styles.numbertext}>
                                            {index + 1}/ {Product?.image?.length}
                                        </div>
                                        <img
                                            src={image}
                                            alt="Product Image"
                                            className={styles.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
