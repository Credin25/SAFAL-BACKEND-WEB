import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRoute = ({ element }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return Cookies.get('refreshToken') ? element : null;
};

AuthRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default AuthRoute;
