import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import SignInForm from '../SingForm/SingForm';
import '../../styles/LoginForm.scss';
import promoImg from '../../img/promo.svg';
import RegisterForm from '../RegistrationForm/RegistrationForm';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [error, setError] = useState<string | null>(null); 
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  if (!globalContext) {
    return <div>Loading...</div>;
  }

  const { loginUser, error  } = globalContext;

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      navigate('/dashboard');
    } catch (err) {
      console.error('Невірні облікові дані', err);
    }
  };

  const handleRegisterOpen = () => {
    setShowRegister(true);
};

const handleRegisterClose = () => {
    setShowRegister(false);
};

  return (
    <div className="container">
      <section className="form">
        <div className="form-content">
          <h1 className="form-title">Увійти</h1>
          <p className="form-subtitle">
          Якщо у Вас немає облікового запису, Ви можете <a href="#" onClick={handleRegisterOpen}>Зареєструватися тут!</a>
          </p>
          {error && <p className="error">{error}</p>}
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin}
          />
        </div>
      </section>
      {showRegister && <RegisterForm onClose={handleRegisterClose} />}
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
