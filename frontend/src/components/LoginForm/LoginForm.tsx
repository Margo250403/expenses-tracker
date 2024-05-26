import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import SignInForm from '../SingForm/SingForm';
import '../../styles/LoginForm.scss';
import promoImg from '../../img/promo.svg';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  if (!globalContext) {
    return <div>Loading...</div>;
  }

  const { loginUser, registerUser } = globalContext;
  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ username: email, email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="container">
      <section className="form">
        <div className="form-content">
          <h1 className="form-title">Увійти</h1>
          <p className="form-subtitle">
          Якщо у вас немає облікового запису, ви можете <a href="#">Зареєструватися тут!</a>
          </p>
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        </div>
      </section>
      <section className="promo">
        <div className="promo-box">
          <div className="promo__content">
            <img src={promoImg} alt="promo" className="promo__image" />
          </div>
          <h2 className="promo__title">Ласкаво просимо на цю сторінку!</h2>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
