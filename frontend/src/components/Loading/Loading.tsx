import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "styled-components";

const StyledCircularProgress = styled.div<{ height: string }>`
  display: flex;
  height: ${(props) => props.height};
  justify-content: center;
  align-items: center;
`;
interface Props {
  height: string;
}
const LoadingComponent: React.FC<Props> = ({ height }) => {
  return (
    <StyledCircularProgress height={height}>
      <CircularProgress />
    </StyledCircularProgress>
  );
};

export default LoadingComponent;
