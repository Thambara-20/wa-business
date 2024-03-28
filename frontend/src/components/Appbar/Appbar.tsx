import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Role, login, logout } from "../../redux/user/slice";
import PopupNotification from "../../components/Notification/Notification";
import { NotificationTypes } from "../../utilities";
import { Link } from "react-router-dom";
import { Paths } from "../../App";
import UserCard from "../UserCard/UserCard";
import MenuIcon from "@mui/icons-material/Menu";
import { setSocketId } from "../../redux/user/slice";
import { Socket, io } from "socket.io-client";
const url = process.env.REACT_APP_API_URL;


const AppbarWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 99%;
  padding: 10px 0px 10px 0px;
  z-index: 10;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
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
  flex-direction: row;
  align-items: flex-end;
  padding: 5px 0 5px 0;
`;

const AdminButtonWrapper = styled.div`
  padding: 0px 5px 0px 5px;
  display: flex;
  flex-direction: row;
`;

const MenuButton = styled.button<{ showMenuButton: any }>`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  display: ${({ showMenuButton }) => (showMenuButton ? "block" : "none")};
`;
const slideInAnimation = keyframes`
  from {
    transform: translateX(-10%);
  }
  to {
    transform: translateX(0);
  }
`;

const DropdownMenu = styled.div<{ showDropdown: any }>`
  position: absolute;
  top: 60px;
  left: -5px;
  height: 100px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: ${({ showDropdown }) => (showDropdown ? "block" : "none")};
  animation: ${({ showDropdown }) => (showDropdown ? slideInAnimation : "none")}
    0.3s ease-in-out forwards;
`;

const Appbar = () => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const role = useAppSelector((state) => state.user.role);
  const [AddUserClicked, setAddUserClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenuButton(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    
    const socket: any = io(`${url}`);
    
    socket.on("email_sent_successfully", (id: any) => {
      setAddUserClicked(false);
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.SUCCESS_SEND_EMAIL,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    socket.on("email_sent_fail", (id: any) => {
      setAddUserClicked(false);
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.FAIL_SEND_EMAIL,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    socket.on("disconnect", () => {
      socket.emit("userDisconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

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
        <MenuButton
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setShowDropdown(!showDropdown);
          }}
          showMenuButton={showMenuButton}
        >
          <MenuIcon />
        </MenuButton>
        {!showMenuButton && (
          <>
            <Link to={Paths.HOME} style={{ textDecoration: "none" }}>
              <AppbarTitle>WS Business</AppbarTitle>
            </Link>
            <Link to={Paths.TEMPLATE} style={{ textDecoration: "none" }}>
              <AppbarItems>Template</AppbarItems>
            </Link>
            <Link to={Paths.SETTINGS} style={{ textDecoration: "none" }}>
              <AppbarItems>Settings</AppbarItems>
            </Link>
          </>
        )}
        {showMenuButton && (
          <DropdownMenu showDropdown={showDropdown}>
            <Link to={Paths.HOME} style={{ textDecoration: "none" }}>
              <AppbarItems>Home</AppbarItems>
            </Link>
            <Link to={Paths.TEMPLATE} style={{ textDecoration: "none" }}>
              <AppbarItems>Template</AppbarItems>
            </Link>
            <Link to={Paths.SETTINGS} style={{ textDecoration: "none" }}>
              <AppbarItems>Settings</AppbarItems>
            </Link>
          </DropdownMenu>
        )}
      </AppbarLeftContainer>
      <ButtonWrapper>
        {role === Role.ADMIN && (
          <AdminButtonWrapper>
            <Button
              variant="contained"
              style={{ borderRadius: "20px" }}
              onClick={() => setAddUserClicked(true)}
            >
              Add new User
            </Button>
          </AdminButtonWrapper>
        )}
        {isLogged ? (
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{ borderRadius: "20px", marginRight: "10px" }}
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
        <UserCard
          open={AddUserClicked}
          onClose={() => setAddUserClicked(false)}
        />
      </ButtonWrapper>
    </AppbarWrapper>
  );
};

export default Appbar;
