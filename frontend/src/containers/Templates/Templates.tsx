import styled from "styled-components";
import TemplateCreationPage from "./Template/Template";
import MobileScreenWithButton from "./Mobile/Mobile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTemplateByUserId } from "../../redux/template/slice";
import { useEffect } from "react";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 250px;
  }
`;

const TemplatesPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getTemplateByUserId(user.email));
  }, []);

  
  return (
    <ContainerWrapper>
      <TemplateCreationPage />
      <MobileScreenWithButton />
    </ContainerWrapper>
  );
};

export default TemplatesPage;
