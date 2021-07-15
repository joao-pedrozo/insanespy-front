import styled from "styled-components";

export const LabelWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    margin-right: 9px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  border: 1px solid #ebeaed;
  background-color: #f5f4f6;
  border-radius: 4px;
  padding: 10px 13px;
  width: 100%;
  margin-bottom: 10px;

  &:focus-within {
    border-color: 1px solid #dedce1;
    background-color: #ebeaed;
  }
`;

export const Input = styled.input`
  border: none;
  background: none;
  color: #170c3a;
  width: 100%;
  outline: none;
`;
