import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Реєстрація не вдалася');
        }
    };

    return (
        <div className="register-form">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
