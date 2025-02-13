import { useState, useEffect } from 'react';
import styles from '../../styles/pages/Login/login.module.css';
import logo from '../../../public/favicon.ico';
import axios from 'axios';
import { safalBackend } from '../../constants/apiRoutes';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
{/* eslint-disable-next-line */ }
function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
            navigate('/home', { replace: true });
        }
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple email and password validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {
            const response = await axios.post(`${safalBackend}/auth/login`, {
                email, password
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                const { email, accessToken, refreshToken } = response.data.data;
                // Cookies.set('accessToken', accessToken);
                // Cookies.set('refreshToken', refreshToken);
                Cookies.set('accessToken', accessToken, {
                        sameSite: 'None', 
                        secure: true,
                });
                Cookies.set('refreshToken', refreshToken, {
                        sameSite: 'None', 
                        secure: true,
                });
                localStorage.setItem('email', email);
                onLoginSuccess();
            }
            // Clear the form and error message
            setEmail('');
            setPassword('');
            setError('');
        } catch (error) {
            console.error(error);  
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        }
    };


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <img src={logo} alt="Company Logo" className={styles.logo} />
                <div className={styles.companyName}> Upkram Technologies </div>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={styles.input}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.button}>
                    Login
                </button>

                {/* Footer */}
                <div className={styles.footer}>
                    © {new Date().getFullYear()} Upkram Technologies. All rights reserved.
                </div>
            </form>
        </div>
    );
}

export default LoginPage;