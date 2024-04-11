import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import styled from "styled-components";
import Aos from "aos";
import axios from "axios";
import { mapDataToMessages } from "../../../utilities";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 20px 0;
  min-height: 100vh;

  @media (max-width: 700px) {
    justify-content: flex-start;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  min-height: 65vh;
  position: relative;
  border-radius: 20px;
  border: 1px solid #000;
  margin: 10px 20px 0px 20px;
  min-width: 300px;
  background-color: #ddd;
  max-width: 300px;
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

  @media (max-width: 700px) {
    margin: 0;
    min-width: 340px;
    max-width: 340px;
    max-height: 60vh;
  }

  @media (min-height: 900px) {
    max-height: 60vh;
    min-width: 340px;
    max-width: 340px;
  }

  @media (min-height: 600px) and (max-width: 500px) {
    min-height: 75vh;
    min-width: 340px;
    max-width: 340px;
  }
`;

const StyledContainer = styled(Container)`
  height: calc(100% - 40px);
  width: 100%;
  padding: 10px 10px 0 10px !important;
  border: none;
  position: relative;
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

const StyledReplyButton = styled.div`
  border-radius: 0 20px 20px 20px;
  padding: 10px 15px;
  max-width: 80%;
  overflow: auto;
  font-size: 16px;
  text-transform: none;
  margin: 10px;
  background-color: #3f51b5;
  color: #fff;
  overflow-wrap: break-word;
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
  const buttons = useAppSelector((state) => state.template.buttons);
  const [replyMessage, setReplyMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickButton = async (
    mapping: any,
    link?: any,
    body?: string,
    method?: string,
    headers?: any
  ) => {
    let data;
    const headersList: any = {};
    headers?.map((header: any) => {
      headersList[header.key] = header.value;
    });
    console.log("Headers List:", headersList);
    if (
      method === "GET" ||
      method === null ||
      method === undefined ||
      method === ""
    ) {
      try {
        const response = await axios.get(link, {
          headers: {
            ...headersList,
            "Content-Type": "application/json",
          },
        });
        data = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (method === "POST") {
      try {
        console.log(body, headersList);
        const response = await axios.post(link, body, {
          headers: {
            ...headersList,
            "Content-Type": "application/json",
          },
        });
        data = response.data;
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }

    setLoading(true);
    console.log("Link:", link, "Mapping:", mapping);
    const mappedMessages: any = mapDataToMessages(data, mapping);
    setReplyMessage(mappedMessages);
    console.log("Reply Messages:", mappedMessages);
    setLoading(false);
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <Wrapper data-aos="fade-left">
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
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleClickButton(
                      button.mapping,
                      button.link,
                      button.body,
                      button.method,
                      button.headers as any
                    )
                  }
                >
                  {button.name}
                </StyledButton>
              </MessageContainer>
            ))}
            <ReplyContainer>
              <StyledReplyButton color="primary">
                {loading ? "Loading..." : replyMessage}
              </StyledReplyButton>
            </ReplyContainer>
          </ButtonContainer>
        </StyledContainer>
        <StyledFooter>
          <FooterElement />
        </StyledFooter>
      </StyledBox>
    </Wrapper>
  );
}

export default MobileScreenWithButton;
