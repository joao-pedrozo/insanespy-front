import styled from "styled-components";
import { shade } from "polished";

interface StyledButtonProps {
  kind: "primary" | "secondary";
}

const colors = {
  primary: {
    backgroundColor: "#ff0099",
    fontColor: "#fff",
  },
};

export const Button = styled.button<StyledButtonProps>`
  padding: 14px 26px;
  background-color: ${(props) => colors[props.kind].backgroundColor};
  color: ${(props) => colors[props.kind].fontColor};
  border: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.4s;
  cursor: pointer;
  font-family: "Rubik", sans-serif;

  &:hover {
    background: ${(props) => shade(0.2, colors[props.kind].backgroundColor)};
  }
  &:active {
    background: ${(props) => shade(0.4, colors[props.kind].backgroundColor)};
  }
`;
