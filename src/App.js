import styled, { keyframes } from "styled-components";

const Father = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  } 
  50% {
    transform: rotate(360deg);
    border-radius: 50%;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Emoji = styled.span`
  font-size: 30px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  width: 100px;
  height: 100px;
  animation: ${rotationAnimation} 3s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 70px;
    }
  }
`;

function App() {
  return (
    <Father>
      <Box>
        <Emoji>💯</Emoji>
      </Box>
      <Emoji>♻</Emoji>
    </Father>
  );
}

export default App;
