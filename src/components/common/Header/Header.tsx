import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './HeaderStyles';
import search from '@Assets/Icons/Home/Search.svg';
import Notification from '@Assets/Icons/Home/Notification.svg';
import { useUser } from '@hooks/useUser';

const Header = () => {
  const navigate = useNavigate();
  const { data } = useUser();
  const user = data?.data;

  return (
    <Container>
      <div className="header">
        <div className="item" onClick={() => navigate('/')}>
          {user ? (
            <div className="location">
              {user.address.hdongName || user.address.eupMyeon}
            </div>
          ) : (
            <div className="location non-user">내 위치</div>
          )}
        </div>
        <img
          className="item"
          src={search}
          onClick={() => navigate('/search')}
        />
        <img
          className="item"
          src={Notification}
          onClick={() => navigate('/notifications?type=keyword')}
        />
      </div>
    </Container>
  );
};

export default Header;
