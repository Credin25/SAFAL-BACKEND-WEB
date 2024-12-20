import styles from '../../../styles/pages/Orders/createNewOrder.module.css';
import Header from "../../../components/PageHeader/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import BlueButton from "../../../components/Buttons/BlueButton";
import { Modal, Checkbox, TextField, Button } from '@mui/material';
import { safalBackend } from '../../../constants/apiRoutes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function AddNewOrder() {
    const navigate = useNavigate();
    const [allAgents, setAllAgents] = useState([]);
    const [agent, setAgent] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [useDefaultAddress, setUseDefaultAddress] = useState(true);
    const [newAddress, setNewAddress] = useState({
        pincode: '',
        district: '',
        state: '',
        city: '',
        addressLine1: '',
    });
    const email = localStorage.getItem('email')

    const fetchAllAgents = async () => {
        try {
            const response = await axios.get(`${safalBackend}/agent/all`);
            if (response.data.success) {
                setAllAgents(response.data.data);
            }
        } catch (error) {
            if(error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error while fetching agents. Please try again later');
            }
        }
    };

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`${safalBackend}/product`);
            if (response.data.success) {
                setAllProducts(response.data.data.products);
            }
        } catch (error) {
            if(error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error while fetching products. Please try again later');
            }
        }
    };

    useEffect(() => {
        fetchAllProducts();
        fetchAllAgents();
    }, []);

    const handleAgentChange = (e) => {
        setAgent(e.target.value); 
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const selectedProduct = allProducts.find(product => product._id === productId);

        if (!selectedProducts.some(product => product._id === productId)) {
            setSelectedProducts([...selectedProducts, { ...selectedProduct, quantity: 1 }]);
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        if (quantity < 1) return;
        setSelectedProducts(
            selectedProducts.map(product =>
                product._id === productId ? { ...product, quantity: parseInt(quantity) } : product
            )
        );
    };
    

    const handleRemoveProduct = (productId) => {
        setSelectedProducts(selectedProducts.filter(product => product._id !== productId));
    };

    const handleProceedButton = () => {
        setIsModalOpen(true);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleOrderButton = async () => {
        // Calculate the total price of selected products 
        const totalAmount = selectedProducts.reduce((acc, prod) => acc + (prod.MRP * prod.quantity), 0);

        let body = {
            orderedFor: agent,
            orderedItems: selectedProducts.map((prod) => ({
                productId: prod._id,
                quantity: prod.quantity
            })),
            source: "STAFF",
            orderCategory:"BULK",
            deliveryAddress: {},
            deliveryContactNumber: 0, 
            orderedBy: email, 
            amount: totalAmount,
        };
        const selectedAgent = allAgents.find(ag => ag._id === agent);
        if (useDefaultAddress) {
            if (selectedAgent && selectedAgent.address) {
                body.deliveryAddress = {
                    pincode: selectedAgent.address.pinCode || '',
                    district: selectedAgent.address.district || '',
                    state: selectedAgent.address.state || '',
                    city: selectedAgent.address.city || '',
                    addressLine1: selectedAgent.address.addressLine1 || '',
                };

            } else {
                console.error("No address found for the selected agent");
            }
        } else {
            body.deliveryAddress = newAddress;
        }
        body.deliveryContactNumber = parseInt(selectedAgent.phone); // Agent's phone number

        try {
            const response = await axios.post(`${safalBackend}/order`, body);
            if (response.data.success) {
                toast.success(response.data.message);
                setIsModalOpen(false);
                navigate("/order") 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if(error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error while placing order. Please try again later');
            }
            console.error("Error while placing order", error);
        }
    };


    return (
        <div className={styles.parentDiv}>
            <Header heading="Create New Order" />
            <div className={styles.container}>
                <form className={styles.form}>
                    <h2>Choose Agent You want to create order for</h2>
                    <select onChange={handleAgentChange} value={agent}>
                        <option value="" disabled>Select an agent</option>
                        {
                            allAgents.map(agent => (
                                <option key={agent._id} value={agent._id}>
                                    {agent.firstName} {agent.lastName} {agent.phone}
                                </option>
                            ))
                        }
                    </select>
                </form>

                {agent && (
                    <div>
                        <form className={styles.form}>
                            <h2>Choose Products you want to order</h2>
                            <select onChange={handleProductChange}>
                                <option>Select a product</option>
                                {
                                    allProducts.map(product => (
                                        <option key={product._id} value={product._id}>
                                            {product.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </form>

                        {/* Display selected products and their quantities */}
                        <div>
                            {selectedProducts.length > 0 && (
                                <div>
                                    <h3>Selected Products</h3>
                                    <ul>
                                        {selectedProducts.map(product => (
                                            <li key={product._id}>
                                                {product.name} -
                                                Quantity:
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={product.quantity}
                                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                                />
                                                <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {
                    agent && selectedProducts.length > 0 && (
                        <BlueButton text="Proceed" onClickFunction={handleProceedButton} />
                    )
                }

                {/* Modal for selecting or adding an address */}
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent}>
                        <h3>Select Delivery Address</h3>
                        <div className={styles.modalCheckboxGroup}>
                            <div>
                                <Checkbox
                                    checked={useDefaultAddress}
                                    onChange={() => setUseDefaultAddress(true)}
                                />
                                <label>Default Address</label>
                            </div>
                            <div>
                                <Checkbox
                                    checked={!useDefaultAddress}
                                    onChange={() => setUseDefaultAddress(false)}
                                />
                                <label>Add New Address</label>
                            </div>
                        </div>

                        {/* If the user opts for adding a new address, show the form */}
                        {!useDefaultAddress && (
                            <div className={styles.newAddressForm}>
                                <TextField
                                    label="Pincode"
                                    name="pincode"
                                    value={newAddress.pincode}
                                    onChange={handleAddressChange}
                                    className={styles.textFieldContainer}
                                    fullWidth
                                />
                                <TextField
                                    label="District"
                                    name="district"
                                    value={newAddress.district}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="State"
                                    name="state"
                                    value={newAddress.state}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="City"
                                    name="city"
                                    value={newAddress.city}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Address Line 1"
                                    name="addressLine1"
                                    value={newAddress.addressLine1}
                                    onChange={handleAddressChange}
                                    className={styles.textFieldContainer}
                                    fullWidth
                                />
                            </div>
                        )}

                        <Button onClick={handleOrderButton} variant="contained" color="primary">
                            Order
                        </Button>
                    </div>
                </Modal>

            </div>
        </div>
    );
}

export default AddNewOrder;
