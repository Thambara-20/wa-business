import React, { useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login, logout } from "../../redux/user/slice";
import PopupNotification from "../../components/Notification/Notification";
import { NotificationTypes } from "../../utilities";
import { Link } from "react-router-dom";
import { Paths } from "../../App";

const AppbarWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
`;

const AppbarLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AppbarTitle = styled.div`
  font-size: 24px;
  padding: 5px 0 5px 15px;
  font-weight: 500;
  cursor: pointer;
  color: rgba(30, 136, 229, 1);
`;

const AppbarItems = styled.div`
  font-size: 16px;
  padding: 5px 0 5px 15px;
  font-weight: 400;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.87);
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 17px;
  padding: 5px 0 5px 0;
`;

const Appbar = () => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleLogin = () => {
    dispatch(login({ user: "test" }));
  };
  const handleLogout = () => {
    setNotification({
      open: true,
      onConfirm: () => {
        dispatch(logout());
      },
      type: NotificationTypes.LOGOUT_USER,
    });
  };

  return (
    <AppbarWrapper>
      <AppbarLeftContainer>
        <Link to={Paths.HOME} style={{ textDecoration: "none" }}>
          <AppbarTitle>WS Business</AppbarTitle>
        </Link>
        <Link to={Paths.TEMPLATES} style={{ textDecoration: "none" }}>
          <AppbarItems>Templates</AppbarItems>
        </Link>
        <Link to={Paths.SETTINGS} style={{ textDecoration: "none" }}>
          <AppbarItems>Settings</AppbarItems>
        </Link>
      </AppbarLeftContainer>
      <ButtonWrapper>
        {isLogged ? (
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{ borderRadius: "20px" }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleLogin}
            style={{ borderRadius: "20px" }}
          >
            Login
          </Button>
        )}
        <PopupNotification
          open={notification.open}
          onClose={handleCloseNotification}
          type={notification.type}
          onSubmit={notification.onConfirm}
        />
      </ButtonWrapper>
    </AppbarWrapper>
  );
};

export default Appbar;
