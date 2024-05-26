import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/RegistrationForm.scss'; // Додайте стилі для модального вікна

const RegisterForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleRegister}>
                    <h2>Створити профіль</h2>
                    {error && <p className="error">{error}</p>}
                    <input type="text" placeholder="Введіть username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Введіть свій email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Введіть свій пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Зареєструватись</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
