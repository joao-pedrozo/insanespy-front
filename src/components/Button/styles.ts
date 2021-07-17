import styled from "styled-components";
import { shade, lighten } from "polished";

interface StyledButtonProps {
  kind: "primary" | "secondary";
}

const colors = {
  primary: {
    backgroundColor: "#ff0099",
    fontColor: "#fff",
    border: "none",
    onHover: {
      background: shade(0.1, "#ff0099"),
    },
    onActive: {
      background: shade(0.2, "#ff0099"),
    },
  },
  cancel: {
    backgroundColor: "transparent",
    fontColor: "#ff0099",
    border: "1px solid #ff0099",
    onHover: {
      background: "#fff",
    },
    onActive: {
      background: "#fcfcfc",
    },
  },
};

export const Button = styled.button<StyledButtonProps>`
  padding: 14px 26px;
  background-color: ${(props) => colors[props.kind].backgroundColor};
  color: ${(props) => colors[props.kind].fontColor};
  border: ${(props) => colors[props.kind].border};
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.4s;
  cursor: pointer;
  font-family: "Rubik", sans-serif;

  &:hover {
    background: ${(props) => colors[props.kind].onHover.background};
  }
  &:active {
    background: ${(props) => colors[props.kind].onActive.background};
  }
`;
