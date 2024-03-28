import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { authenticate, login, updateUser } from "../../redux/user/slice";
import { Paths } from "../../App";

const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 700px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const StyledWelcomeContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 0.5rem;
    flex: 0.5;
  }
`;

const StyledLoginFormContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 10px 0px #e0e0e0;
  border-radius: 10px;
  height: 95vh;
  background-color: white;
  @media (max-width: 700px) {
    
    height: 10vh;
    justify-content: flex-start;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 700px) {
    min-width: 350px;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px !important;
`;

const StyledErrorMessage = styled(Typography)`
  margin-bottom: 20px !important;
  color: red;
`;

const Login = () => {
  const email = useAppSelector((state) => state.user.email);
  const password = useAppSelector((state) => state.user.password);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const LoginError = useAppSelector((state) => state.user.loginError);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    dispatch(authenticate());
    if (isLogged) {
      navigate(Paths.HOME);
    }
  }, [navigate, isLogged, dispatch]);

  const handleEmailChange = (email: any) => {
    dispatch(updateUser({ email }));
    setEmailError(false);
  };

  const handlePasswordChange = (password: any) => {
    dispatch(updateUser({ password }));
    setPasswordError(false);
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <StyledLoginContainer>
      <StyledWelcomeContainer>
        <Typography variant="h4" gutterBottom maxWidth={400}>
          Welcome to WhatsApp Business Connector
        </Typography>
        <Typography maxWidth={600}>
          The WhatsApp Business Connector is a platform designed to facilitate
          communication between organizations and their customers via WhatsApp
          messaging.
        </Typography>
      </StyledWelcomeContainer>
      <StyledLoginFormContainer>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledErrorMessage>
            {emailError || LoginError ? "Invalid email or password" : ""}
          </StyledErrorMessage>
          <StyledTextField
            fullWidth
            placeholder="Email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={emailError || LoginError}
            label="Email"
            helperText={emailError ? "Email is required" : ""}
          />
          <StyledTextField
            fullWidth
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            error={passwordError || LoginError}
            helperText={passwordError ? "Password is required" : ""}
          />
          <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
            Login
          </StyledButton>
          <Typography>
            Don`&apos;t have an account? <a href={Paths.REGISTER} style={{textDecoration:"none"}}>Register</a>
          </Typography>
        </StyledForm>
      </StyledLoginFormContainer>
    </StyledLoginContainer>
  );
};

export default Login;
