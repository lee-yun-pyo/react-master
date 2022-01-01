import styled from "styled-components";

interface ContainerProps {
    bgColor: string,
}

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${props=> props.bgColor};
    border-radius: 50px;
`;

interface CircleProps {
    bgColor: string,
}

function Circle({bgColor}:CircleProps) {
    return <Container bgColor={bgColor}/>
}

export default Circle;