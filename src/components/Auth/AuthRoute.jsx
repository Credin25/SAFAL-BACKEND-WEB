import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AuthRoute = ({ element }) => {
    const value = Cookies.get('accessToken');
    const navigate = useNavigate();
    const [accessToken] = useState(value);
    useEffect(() => {
        if (!accessToken) {
            navigate('/', { replace: true });
        }
    }, [accessToken, navigate]);

    return accessToken ? element : null;
};

AuthRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default AuthRoute;


