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
import SellOrder from "../pages/RetailOrders/SellOrder";
import ViewStaff from "../pages/AddNewStaffMember/ViewStaff/ViewStaff";
import SafalUsers from "../pages/Customers/ViewAllSafalUsers/ViewSafalUsers";
import Customer from "../pages/Customers/ViewSingleUser/Customer";
import AgentDetails from "../pages/Agents/AgentCompleteDetails/AgentDetails";
import SafalOrder from "../pages/RetailOrders/SingleOrder";
import NewRetailOrder from "../pages/RetailOrders/NewRetailOrder";
import Home from "../pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
const MainHome = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            onLoginSuccess={() => {
              navigate("/home");
            }}
          />
        }
      />
      <Route element={<AuthenticatedLayout />}>
        {/* Home */}
        <Route path="/home" element={<AuthRoute element={<Home />} />} />
        {/* insurance */}
        <Route
          path="/insurance"
          element={<AuthRoute element={<Insurance />} />}
        />
        <Route
          path="/insurance/:id"
          element={<AuthRoute element={<ViewSingleInsurance />} />}
        />
        {/* order */}
        <Route path="/order" element={<AuthRoute element={<OurOrders />} />} />
        <Route
          path="/order/new"
          element={<AuthRoute element={<CreateNewOrder />} />}
        />
        <Route path="/order/:id" element={<AuthRoute element={<Order />} />} />
        {/* Staff */}
        <Route
          path="/staff"
          element={<AuthRoute element={<AddNewLogin />} />}
        />
        <Route
          path="/staff/view-all"
          element={<AuthRoute element={<ViewStaff />} />}
        />
        {/* sale */}
        <Route path="/sell" element={<AuthRoute element={<SellOrder />} />} />
        <Route
          path="/retail/sell/:id"
          element={<AuthRoute element={<SafalOrder />} />}
        />
        <Route
          path="/retail/new/order"
          element={<AuthRoute element={<NewRetailOrder />} />}
        />
        {/* Agents */}
        <Route
          path="/createAgent"
          element={<AuthRoute element={<CreateAgent />} />}
        />
        <Route
          path="/agents"
          element={<AuthRoute element={<ViewAgents />} />}
        />
        <Route
          path="/agent/:id"
          element={<AuthRoute element={<EditAgent />} />}
        />
        <Route
          path="/agent/info/:id"
          element={<AuthRoute element={<AgentDetails />} />}
        />
        {/* USER */}
        <Route path="/user/:id" element={<AuthRoute element={<User />} />} />
        <Route
          path="/user/:id/sell"
          element={<AuthRoute element={<UserSellData />} />}
        />
        {/*Products  */}
        <Route
          path="/products"
          element={<AuthRoute element={<AllProduct />} />}
        />
        <Route
          path="/product/new"
          element={<AuthRoute element={<AddNewProduct />} />}
        />
        <Route
          path="/product/:id"
          element={<AuthRoute element={<ViewProduct />} />}
        />
        {/* safal users */}
        <Route
          path="/safal/users"
          element={<AuthRoute element={<SafalUsers />} />}
        />
        <Route
          path="/safal/user/:id"
          element={<AuthRoute element={<Customer />} />}
        />
      </Route>
    </Routes>
  );
};
export default MainHome;
