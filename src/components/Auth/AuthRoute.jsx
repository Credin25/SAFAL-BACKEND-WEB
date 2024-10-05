import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { safalBackend } from '../../constants/apiRoutes';
import axios from 'axios';

const AuthRoute = ({ element }) => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        const fetchAccessToken = async () => {
            if (!accessToken && refreshToken) {
                try {
                    const res = await axios.post(`${safalBackend}/auth/refresh-token`, {
                        refreshToken: refreshToken,
                    });
                    if (res.data.success) {
                        // Store the new access token in localStorage
                        localStorage.setItem('accessToken', res.data.data.accessToken);
                        setAccessToken(res.data.data.accessToken); // Update state to trigger re-render
                    }
                } catch (err) {
                    console.error(err);
                    navigate('/login', { replace: true });
                }
            } else if (!accessToken && !refreshToken) {
                navigate('/login', { replace: true });
            }
        };

        fetchAccessToken(); // Call the async function
    }, [accessToken, refreshToken, navigate]);

    return accessToken ? element : null; // Render the element if the token is available
};

AuthRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default AuthRoute;
