import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Tooltip } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Role,
  login,
  logout,
  mobileError,
  newUserMobileError,
  updateUser,
} from "../../redux/user/slice";
import PopupNotification from "../../components/Notification/Notification";
import { NotificationTypes } from "../../utilities";
import { Link } from "react-router-dom";
import { Paths } from "../../App";
import UserCard from "../UserCard/UserCard";
import MenuIcon from "@mui/icons-material/Menu";
import { setSocketId } from "../../redux/user/slice";
import { io } from "socket.io-client";
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
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 40%,
    rgba(0, 0, 0, 0.9) 100%
  );
  backdrop-filter: blur(15px);
`;

const AppbarLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AppbarTitle = styled.div`
  font-size: 24px;
  font-style: arial;
  padding: 5px 0 5px 15px;
  font-weight: 700;
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
  justify-content: flex-end;
  padding: 5px 0;
  transform: scale(0.9);
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
const CustomButton = styled(Button)<{ active: any }>`
  && {
    border-radius: 20px;
    color: #fff;
    border: 1px solid #000;
    margin-right: 5px;
    padding: 5px 20px;
    margin-left: 5px;
    box-shadow: 1px 0px 5px 0px #000;
    transition: all 0.3s;
    background-color: ${({ active }) =>
      active ? "rgb(0,200,0,0.6)" : "rgb(170,0,0,0.5)"};
    font-size: 0.9rem;
    text-transform: none;

    &:hover {
      background-color: ${({ active }) =>
        active ? "rgb(0,200,0,0.6)" : "rgb(0,0,0,0.5)"};
      box-shadow: ${({ active }) =>
        !active ? "2px 2px 10px 0px #000" : "1px 0px 5px 0px #000"};
    }
  }
`;
const AdminButton = styled(Button)`
  && {
    border-radius: 20px;
    color: #000;
    border: 1px solid #000;
    margin-right: 5px;
    padding: 5px 20px;
    margin-left: 5px;
    box-shadow: 1px 0px 5px 0px #000;
    transition: all 0.3s;
    background-color: rgb(255, 255, 255, 0.5);
    font-size: 0.9rem;
    text-transform: none;

    &:hover {
      background-color: #000;
      color: white;
      box-shadow: 2px 2px 10px 0px #000;
    }
  }
`;

const StyledLogButton = styled(Button)`
  && {
    border-radius: 20px;
    color: #fff;
    border: 1px solid #000;
    margin-right: 5px;
    padding: 5px 20px;
    margin-left: 5px;
    margin-right: 15px;
    box-shadow: 1px 0px 5px 0px #000;
    transition: all 0.3s;
    background: linear-gradient(
      90deg,
      rgba(3, 150, 300, 0.5) 0%,
      rgba(3, 178, 203, 0.5) 100%
    ) !important;
    font-size: 0.9rem;
    text-transform: none;

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(50, 50, 30, 0.5) 0%,
        rgba(0, 0, 0, 0.5) 100%
      ) !important;
      color: white;
      box-shadow: 2px 2px 10px 0px #000;
    }
  }
`;
const Appbar = () => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const role = useAppSelector((state) => state.user.role);
  const email = useAppSelector((state) => state.user.email);
  const active = useAppSelector((state) => state.user.active);
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

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server", socket.id);
      dispatch(setSocketId(socket.id));
      socket.emit("authenticate", socket.id);
    });

    socket.on("disconnect", () => {
      socket.emit("userDisconnected");
    });
    socket.on("email_sent_successfully", (data: any) => {
      setAddUserClicked(false);
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.SUCCESS_SEND_EMAIL,
      });
      console.log("email sent", data);
    });

    socket.on("email_sent_fail", (id: any) => {
      setAddUserClicked(false);
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.FAIL_SEND_EMAIL,
      });
    });

    socket.on("template_updated_failed", (data: any) => {
      console.log("template updated fail", data);
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.FAIL_SAVE_TEMPLATE,
      });
    });
    socket.on("template_updated_successfully", (data: any) => {
      console.log("template updated", data);
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.SUCCESS_SAVE_TEMPLATE,
      });
    });

    socket.on("settings_updated_successfully", (data: any) => {
      console.log("settings updated", data);
      dispatch(updateUser({ active: true }));
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.SUCCESS_SAVE_SETTINGS,
      });
    });

    socket.on("NewUser_Mobile_is_taken", (data: any) => {
      dispatch(newUserMobileError());
      console.log("settings updated fail", data);
    });

    socket.on("Mobile_is_taken", (email: any) => {
      dispatch(mobileError());
    });

    socket.on("disconnect", () => {
      socket.emit("userDisconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
            <Link to={Paths.HOME} style={{ textDecoration: "none" }}>
              <AppbarItems>Home</AppbarItems>
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
            <AdminButton
              variant="outlined"
              onClick={() => setAddUserClicked(true)}
            >
              Add new User
            </AdminButton>
          </AdminButtonWrapper>
        )}
        {
          <CustomButton
            variant={"outlined"}
            active={active}
            onClick={() => {
              if (!active) {
                setNotification({
                  open: true,
                  onConfirm: () => {
                    window.location.href = `#${Paths.SETTINGS}`;
                  },
                  type: NotificationTypes.SETTINGS_UPDATE_WARNING,
                });
              }
            }}
          >
            {!active ? "Innactive" : "Active"}
          </CustomButton>
        }
        {isLogged ? (
          <Box display="flex" margin="0 5px 0 5px">
            <StyledLogButton onClick={handleLogout}>Logout</StyledLogButton>
            <Tooltip title={email} arrow>
              <Avatar
                style={{
                  width: "35px",
                  height: "35px",
                  marginRight: "5px",
                  backgroundColor: "#505050",
                  border: "1px solid #000",
                  boxShadow: "1px 0px 5px 0px #000",
                }}
              >
                <span style={{ fontSize: "20px" }}>
                  {role === Role.ADMIN ? "A" : email?.charAt(0).toUpperCase()}
                </span>
              </Avatar>
            </Tooltip>
          </Box>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={handleLogin}
              style={{ borderRadius: "20px", marginRight: "10px" }}
            >
              Login
            </Button>
          </>
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
