import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Orders/supplements.module.css";
import TableComponent from "./Table";
import { useState, useEffect } from "react";
import axios from "axios";
import EditButton from "../../components/Buttons/EditButton";
import GreyButton from "../../components/Buttons/GreyButton";
import BlueButton from "../../components/Buttons/BlueButton";
import { useNavigate } from "react-router-dom";
import { safalBackend } from "../../constants/apiRoutes";
import { toast } from "react-toastify";

const OurOrders = () => {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();

    const fetchData = async (page = pageNumber) => {
        try {
            const response = await axios.get(`${safalBackend}/order?page=${page}`);
            if (response.data.success) {
                const orders = response?.data?.data?.map(order => ({
                    orderId: order?.orderId,
                    id: order?._id,
                    source: order?.source,
                    orderedBy: order?.userDetails?.name,
                    orderedItems: order?.orderedItems.map(item => `${item?.productId?.name} (x${item?.quantity})`).join(', '),
                    orderDate: new Date(order?.orderDate).toLocaleDateString('en-GB'),
                    orderStatus: order?.orderStatus,
                    amount: order?.amount,
                    agentMobile: order.source === "STAFF" ? order?.orderedFor?.phone : order?.orderedBy,
                    agentId: order.source === "STAFF" ? order?.orderedFor?._id : order?.userDetails._id,
                    orderedFor: order?.orderedFor
                        ? `${order?.orderedFor?.firstName} ${order?.orderedFor?.lastName}`
                        : ' '
                }));
                setData(orders);
            }
        } catch (error) {
            console.log(error)
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error while fetching orders. Please try again later.");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    const columns = ["orderDate", "source", "orderId", "orderedBy", "orderedFor","agentMobile", "orderedItems", , "orderStatus", "action"];

    const createNewOrder = async () => {
        navigate("/order/new");
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
            <Header heading="Bulk Orders" />
            <div className={styles.container}>
                <div className={styles.button}>
                    <EditButton text={"Create New Order"} onClickFunction={createNewOrder} />
                </div>
                <TableComponent headers={columns} rows={data} />
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
    );
};

export default OurOrders;
