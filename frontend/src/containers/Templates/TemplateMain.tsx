import styled from "styled-components";
import Appbar from "../../components/Appbar/Appbar";
import TemplatesPage from "./Templates";
import Footer from "../Footer/Footer";

export const HomeWarpper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  background-color: #e0e0e0;
  border-radius: 20px 20px 0px 0px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-top: 15px;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    min-height: 190vh;
  }
`;

export default function Templates() {
  return (
    <HomeWarpper>
      <Appbar />
      <ContainerWrapper>
        <TemplatesPage />
      </ContainerWrapper>
      <Footer />
    </HomeWarpper>
  );
}
