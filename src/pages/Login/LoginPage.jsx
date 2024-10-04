import { useState } from 'react';
import styles from '../../styles/pages/Login/login.module.css';
import logo from '../../../public/vite.svg';
import axios from 'axios';
import { safalBackend } from '../../constants/apiRoutes';
   {/* eslint-disable-next-line */}
function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simple email and password validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        const responce = await axios.post(`${safalBackend}/auth/login`, {
            email, password
        });
        if (responce.data.success) {
            const { accessToken, refreshToken } = responce.data.data;
            localStorage.setItem('accessToken', accessToken); 
            localStorage.setItem('refreshToken', refreshToken); 
            localStorage.setItem('email', email); 
            onLoginSuccess();
        }
        setEmail('');
        setPassword('');
        setError('');
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
                    © 2024 Upkram Technologies. All rights reserved.
                </div>
            </form>
        </div>
    );
}

export default LoginPage;