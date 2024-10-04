import Sidebar from "../sidebar/Sidebar";
import { Outlet } from 'react-router-dom';
const AuthenticatedLayout = () => {
    return (
        <Sidebar>
            <Outlet />
        </Sidebar>

    );
};
export default AuthenticatedLayout;