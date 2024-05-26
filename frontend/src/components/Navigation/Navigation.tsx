import React, { useContext } from 'react';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/icons';
import { menuItems } from '../../utils/menuItems';
import '../../styles/Navigation.scss';
import { INavigationProps } from '../../interfaces/INavigationProps';
import { GlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC<INavigationProps> = ({ active, setActive }) => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  if (!globalContext || !globalContext.user) {
    return <div>Loading...</div>;
  }

  const { logoutUser } = globalContext;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
        <h2>Marharyta</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
         {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.title}</span>
          </li> 
        ))}
      </ul>
      <div className="bottom-nav">
        <li onClick={handleLogout}>
          {signout} Sign Out
        </li>
      </div>
    </nav>
  );
};

export default Navigation;
