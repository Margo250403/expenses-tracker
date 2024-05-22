import React from 'react';
// import {avatar} from '../../img/avatar.png';
// import avatar from '../../img/avatar.png';
import { signout } from '../../utils/icons';
import { menuItems } from '../../utils/menuItems';
import '../../styles/Navigation.scss';
import { INavigationProps } from '../../interfaces/INavigationProps';

const Navigation: React.FC<INavigationProps> = ({ active, setActive }) => {
  return (
    <nav className="nav">
      <div className="user-con">
        <img src='../../img/avatar.png' alt="User Avatar" />
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
        <li>
          {signout} Sign Out
        </li>
      </div>
    </nav>
  );
};

export default Navigation;
