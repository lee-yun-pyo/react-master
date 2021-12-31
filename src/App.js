import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  background-color: skyblue;
  border: none;
  border-radius: 15px;
  padding: 10px;
  color: white;
`;

const Input = styled.input.attrs({ required: true, placeholder: "attrs" })`
  background-color: whitesmoke;
`;

function App() {
  return (
    <Father>
      <Btn>Click</Btn>
      <Btn as="a" href="/">
        Click
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
