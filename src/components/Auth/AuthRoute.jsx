import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AuthRoute = ({ element }) => {
    const value = Cookies.get('refreshToken');
    const navigate = useNavigate();
    const [refreshToken] = useState(value);
    useEffect(() => {
        if (!refreshToken) {
            navigate('/login', { replace: true });
        }
    }, [refreshToken, navigate]);

    return refreshToken ? element : null;
};

AuthRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default AuthRoute;

// const AuthRoute = ({ element }) => {
//     return element;
// };
// export default AuthRoute;

