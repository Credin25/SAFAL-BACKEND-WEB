import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthRoute = ({ element }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return token ? element : null; // Render nothing while navigating
};

AuthRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default AuthRoute;
