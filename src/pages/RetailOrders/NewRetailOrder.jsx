import { useState, useEffect } from "react";
import styles from "../../styles/pages/Sale/NewRetailOrder.module.css";
import Header from "../../components/PageHeader/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { safalBackend } from "../../constants/apiRoutes";
import BlueButton from "../../components/Buttons/BlueButton";
import { Modal, Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    boxShadow: 24,
    p: 4,
};

const NewRetailOrder = () => {
    // State management
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    // Form states combined into a single object
    const [formData, setFormData] = useState({
        contactNumber: "",
        city: "",
        state: "",
        district: "",
        pincode: "",
        addressLine1: "",
        addressLine2: "",
        paymentMethod: "COD"

    });
    const [customerDetailsModalOpen, setCustomerDetailsModalOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        customerName: "",
        customerMobile: "",
    });
    const [customerErrors, setCustomerErrors] = useState({});


    // Modal states
    const [deliveryAddressModalOpen, setDeliveryAddressModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    // Validation state
    const [errors, setErrors] = useState({});

    // Fetch initial product data with error handling and loading state
    const fetchInitialData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${safalBackend}/product`);
            if (response.data.success) {
                setItems(response.data.data.products);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching products.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    // Calculate cart total
    const cartTotal = cart.reduce((total, item) => {
        return total + (item.MRP * item.quantity);
    }, 0);

    const getItemQuantity = (itemId) =>
        cart.find((cartItem) => cartItem.id === itemId)?.quantity || 0;

    const updateQuantity = (itemId, increment = true) => {
        setCart((prevCart) => {
            const itemInCart = prevCart.find((cartItem) => cartItem.id === itemId);
            if (itemInCart) {
                return prevCart
                    .map((cartItem) =>
                        cartItem.id === itemId
                            ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + (increment ? 1 : -1)) }
                            : cartItem
                    )
                    .filter(cartItem => cartItem.quantity > 0);
            } else if (increment) {
                const item = items.find((product) => product._id === itemId);
                return [...prevCart, { ...item, id: item._id, quantity: 1 }];
            }
            return prevCart;
        });
    };
    const handleCustomerDetailsChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (customerErrors[name]) {
            setCustomerErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    // Form handling
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateDeliveryForm = () => {
        const newErrors = {};
        if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.pincode) newErrors.pincode = "Pincode is required";
        if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleOrderSubmit = () => {
        if (cart.length === 0) {
            toast.warn("Cart is empty!");
            return;
        }
        setDeliveryAddressModalOpen(true);
    };

    const handleProceedToPayment = () => {
        if (validateDeliveryForm()) {
            setDeliveryAddressModalOpen(false);
            setPaymentModalOpen(true);
        }
    };
    const validateCustomerDetails = () => {
        const errors = {};
        if (!customerDetails.customerName) errors.customerName = "Customer name is required.";
        if (!customerDetails.customerMobile || customerDetails.customerMobile.length !== 10)
            errors.customerMobile = "Valid mobile number is required.";

        setCustomerErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePaymentSubmit = () => {
        if (validateDeliveryForm()) {
            setDeliveryAddressModalOpen(false);
            setPaymentModalOpen(false);
            setCustomerDetailsModalOpen(true); // Open customer details modal
        }
    };
    const handleCustomerDetailsSubmit = async () => {
        if (validateCustomerDetails()) {
            setCustomerDetailsModalOpen(false);

            try {
                setIsSubmitting(true);
                const orderData = {
                    orderedItems: cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                    deliveryAddress: {
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode,
                        district: formData.district,
                        addressLine: `${formData.addressLine1}, ${formData.addressLine2}` || formData.addressLine1,
                    },
                    deliveryContactNumber: formData.contactNumber,
                    paymentMode: formData.paymentMethod,
                    amount: cartTotal,
                    source: "STAFF",
                    orderedBy: email,
                    orderCategory: "RETAIL",
                    customer: { ...customerDetails },
                };
                
                const response = await axios.post(`${safalBackend}/order/add/new/order`, orderData);
                if (response.data.success) {
                    toast.success("Order placed successfully!");
                    // Reset all forms
                    setCart([]);
                    setFormData({
                        contactNumber: "",
                        city: "",
                        state: "",
                        pincode: "",
                        addressLine1: "",
                        addressLine2: "",
                        paymentMethod: "COD",
                    });
                    setCustomerDetails({ customerName: "", customerMobileNumber: "" });
                    navigate("/sell");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error placing order.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };


    if (isLoading) {
        return <div className={styles.parentDiv}>Loading...</div>;
    }

    return (
        <div className={styles.parentDiv}>
            <Header heading="New Retail Order" />
            <div className={styles.container}>
                <div className={styles.itemList}>
                    {items.map((item) => (
                        <div key={item._id} className={styles.itemCard}>
                            <img src={item.image[0]} alt={item.name} className={styles.itemImage} />
                            <h3>{item.name}</h3>
                            <p>Price: ₹{item.MRP}</p>
                            <div className={styles.quantityControls}>
                                <button
                                    onClick={() => updateQuantity(item._id, false)}
                                    disabled={getItemQuantity(item._id) === 0}
                                >
                                    -
                                </button>
                                <span>{getItemQuantity(item._id)}</span>
                                <button onClick={() => updateQuantity(item._id)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.orderForm}>
                    <p>Total Amount: ₹{cartTotal}</p>
                    <BlueButton
                        text="Place Order"
                        onClickFunction={handleOrderSubmit}
                        disabled={cart.length === 0 || isSubmitting}
                    />
                </div>

                {/* Delivery Address Modal */}
                <Modal
                    open={deliveryAddressModalOpen}
                    onClose={() => setDeliveryAddressModalOpen(false)}
                >
                    <Box sx={style}>
                        <h3>Delivery Address</h3>
                        <TextField
                            label="City"
                            name="city"
                            fullWidth
                            variant="outlined"
                            value={formData.city}
                            onChange={handleInputChange}
                            error={!!errors.city}
                            helperText={errors.city}
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="District"
                            name="district"
                            fullWidth
                            variant="outlined"
                            value={formData.district}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="State"
                            name="state"
                            fullWidth
                            variant="outlined"
                            value={formData.state}
                            onChange={handleInputChange}
                            error={!!errors.state}
                            helperText={errors.state}
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="Pincode"
                            name="pincode"
                            fullWidth
                            variant="outlined"
                            value={formData.pincode}
                            type="number"
                            onChange={handleInputChange}
                            error={!!errors.pincode}
                            helperText={errors.pincode}
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="Address Line 1"
                            name="addressLine1"
                            fullWidth
                            variant="outlined"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            error={!!errors.addressLine1}
                            helperText={errors.addressLine1}
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="Address Line 2"
                            name="addressLine2"
                            fullWidth
                            variant="outlined"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="Contact Number"
                            name="contactNumber"
                            fullWidth
                            variant="outlined"
                            value={formData.contactNumber}
                            type="number"
                            onChange={handleInputChange}
                            error={!!errors.contactNumber}
                            helperText={errors.contactNumber}
                            sx={{ marginBottom: '10px' }}
                        />
                        <Button
                            onClick={handleProceedToPayment}
                            disabled={isSubmitting}
                        >
                            Proceed
                        </Button>
                    </Box>
                </Modal>


            </div>
            {/* Payment Modal */}
            <Modal
                open={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
            >
                <Box sx={{ ...style, width: 300 }}>
                    <h3>Payment Method</h3>
                    <Select
                        fullWidth
                        variant="outlined"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            paymentMethod: e.target.value
                        }))}
                        sx={{ marginBottom: '10px' }}
                    >
                        <MenuItem>Select Payment Method</MenuItem>
                        <MenuItem value="COD">Cash on Delivery</MenuItem>
                    </Select>
                    <Button
                        onClick={handlePaymentSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Confirm Order'}
                    </Button>
                </Box>
            </Modal>
            {/* customer details modal */}
            <Modal open={customerDetailsModalOpen}>
                <Box sx={{ ...style, width: 300 }}>
                    <h3>Customer Details</h3>
                    <TextField
                        label="Customer Name"
                        name="customerName"
                        fullWidth
                        variant="outlined"
                        value={customerDetails.customerName}
                        onChange={handleCustomerDetailsChange}
                        error={!!customerErrors.customerName}
                        helperText={customerErrors.customerName}
                        sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                        label="Customer Mobile Number"
                        name="customerMobile"
                        fullWidth
                        variant="outlined"
                        value={customerDetails.customerMobile}
                        onChange={handleCustomerDetailsChange}
                        error={!!customerErrors.customerMobile}
                        helperText={customerErrors.customerMobile}
                        sx={{ marginBottom: "10px" }}
                    />
                    <Button
                        onClick={handleCustomerDetailsSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Submit"}
                    </Button>
                </Box>
            </Modal>
        </div >
    );
};

export default NewRetailOrder;