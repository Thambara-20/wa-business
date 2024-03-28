import React from "react";
import { Button, Container } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  position: relative;
  border-radius: 20px;
  border: 1px solid #000;
  margin: 20px 20px 0px 20px;
  min-width: 280px;
  max-width: 300px;
  margin-right: 20px;
  box-shadow:
    9px 0px 5px -5px rgba(0, 0, 0, 0.4),
    -9px 0px 5px -5px rgba(0, 0, 0, 0.4),
    0px 15px 15px rgba(0, 0, 0, 0.4);

  & > div:first-child {
    width: 50px;
    height: 20px;
    border-bottom: 1px solid #000;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  & > div:nth-child(2) {
    width: 100%;
    height: 2px;
    border-bottom: 1px solid #000;
    position: absolute;
    top: 30px;
    left: 0;
    background-color: #fff;
  }
`;

const StyledContainer = styled(Container)`
  height: calc(100% - 40px);
  width: 100%;
  padding: 20px 10px 0 10px !important;
  border: none;
  position: relative;
  overflowy: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentHeader = styled.h3`
  text-align: center;
`;

const ContentParagraph = styled.p`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 75%;
  overflow-y: auto;
  border-radius: 5px;
  background-color: #000;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const StyledButton = styled(Button)`
  border-radius: 20px 0 20px 20px !important;
  padding: 5px 10px 5px 10px !important;
  font-size: 14px !important;
  text-transform: none !important;
  margin: 10px 10px 0 10px !important;
  background-color: #388e3c !important;
  color: #fff;
`;

const StyledReplyButton = styled(Button)`
  border-radius: 0 20px 20px 20px !important;
  padding: 5px 10px 5px 10px !important;
  font-size: 14px !important;
  text-transform: none !important;
  margin: 10px 10px 0 10px !important;
  background-color: #3f51b5 !important;
  color: #fff;
`;

const StyledFooter = styled.div`
  width: 92.5%;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.2);
`;

const FooterElement = styled.div`
  width: 60px;
  height: 15px;
  background-color: grey;
  border: 1px solid #fff;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
`;

function MobileScreenWithButton() {
  const handleClickWhatsAppButton = () => {
    console.log("WhatsApp Button Clicked!");
  };

  const buttons = useAppSelector((state) => state.template.buttons);
  const reply = [
    "You can reply to this message",
    "you have the option to reply to this message",
  ];

  return (
    <div
      style={{
        padding: "0px 40px 20px 40px",
        borderRadius: "20px",
        margin: "25px 5px 10px 5px",
      }}
    >
      <StyledBox>
        <div />
        <div />
        <StyledContainer>
          <ContentHeader>Your Template</ContentHeader>
          <ContentParagraph>Your content goes here, test now</ContentParagraph>
          <ButtonContainer>
            {buttons.map((button, index) => (
              <MessageContainer key={index}>
                <StyledButton
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={handleClickWhatsAppButton}
                >
                  {button.name}
                </StyledButton>
              </MessageContainer>
            ))}
            {reply.map((message, index) => (
              <ReplyContainer key={index}>
                <StyledReplyButton
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={handleClickWhatsAppButton}
                >
                  {message}
                </StyledReplyButton>
              </ReplyContainer>
            ))}
          </ButtonContainer>
        </StyledContainer>
        <StyledFooter>
          <FooterElement />
        </StyledFooter>
      </StyledBox>
    </div>
  );
}

export default MobileScreenWithButton;
