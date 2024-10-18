import AuthenticatedLayout from "../components/Auth/AuthLayout";
import AuthRoute from "../components/Auth/AuthRoute";
import LoginPage from "../pages/Login/LoginPage";
import AddNewLogin from "../pages/AddNewStaffMember/AddStaff/AddLogin";
import Insurance from "../pages/Insurance/Insurance";
import ViewSingleInsurance from "../pages/Insurance/ViewSingleInsurance";
import CreateAgent from "../pages/Agents/createAgents/CreateAgent";
import ViewAgents from "../pages/Agents/viewAgents/ViewAgents";
import EditAgent from "../pages/Agents/EditAgents/EditAgent";
import OurOrders from "../pages/Orders/OurOrders";
import Order from "../pages/Orders/Order";
import CreateNewOrder from "../pages/Orders/NewOrder/NewOrder";
import AllProduct from "../pages/Products/allProducts/AllProduct";
import ViewProduct from "../pages/Products/ViewProduct/ViewProduct";
import AddNewProduct from "../pages/Products/NewProduct/AddNewProduct";
import User from "../pages/Users/User";
import UserSellData from "../pages/Users/UserSellData";
import SellOrder from "../pages/Sale/SellOrder";
import ViewStaff from "../pages/AddNewStaffMember/ViewStaff/ViewStaff";
import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import { useState, useEffect } from "react";


const MainHome = () => {
    const [, forceUpdate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        forceUpdate({});
    }, []);

    return (
        <Routes>
            <Route path="/" element={<LoginPage onLoginSuccess={() => {
                // forceUpdate({});
                navigate('/insurance');
            }} />} />
            <Route element={<AuthenticatedLayout />}>
                {/* insurance */}
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/insurance/:id" element={<ViewSingleInsurance />} />
                {/* order */}
                <Route path="/order" element={<OurOrders />} />
                <Route path="/order/new" element={<CreateNewOrder />} />
                <Route path="/order/:id" element={<Order />} />
                {/* Staff */}
                <Route path="/staff" element={<AddNewLogin />} />
                <Route path="/staff/view-all" element={<ViewStaff />} />
                {/* sale */}
                <Route path="/sell" element={<SellOrder />} />
                {/* Agents */}
                <Route path="/createAgent" element={<CreateAgent />} />
                <Route path="/agents" element={<ViewAgents />} />
                <Route path="/agent/:id" element={<EditAgent />} />
                {/* USER */}
                <Route path="/user/:id" element={<User />} />
                <Route path="/user/:id/sell" element={<UserSellData />} />
                {/*Products  */}
                <Route path="/products" element={<AllProduct />} />
                <Route path="/product/new" element={<AddNewProduct />} />
                <Route path="/product/:id" element={<ViewProduct />} />
            </Route>

        </Routes>
    );
}
export default MainHome;
