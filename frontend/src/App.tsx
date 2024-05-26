import './styles/Global.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { useContext } from 'react';
import { GlobalContext } from './context/globalContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    return <div>Loading...</div>;
  }

  const { user } = globalContext;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;