import styled, { keyframes } from "styled-components";

const Father = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Father>
      <Title>React</Title>
    </Father>
  );
}

export default App;
