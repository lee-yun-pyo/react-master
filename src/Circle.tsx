import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
    bgColor: string,
    borderColor: string,
}

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${props=> props.bgColor};
    border-radius: 50px;
    border: 3px solid ${props=>props.borderColor};
`;

interface CircleProps {
    bgColor: string, // required
    borderColor?: string, // optional
    text?: string,
}

function Circle({bgColor, borderColor, text="default text"}:CircleProps) {
    const [value, setValue ] = useState<number|string>(1);
    setValue(0)
    setValue("text")
    // setValue(false) 에러발생
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}> 
    {text}
    </Container>
    // Container도 bgColor가 뭔지 모름 . 그래서 interface ContainerProps를 만듦
    // borderColor가 optional이기 때문에 borderColor가 undefined이면 default로 bgColor 부여
}

export default Circle;