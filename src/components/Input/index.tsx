import { InputHTMLAttributes } from "react";
import * as S from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

const Input = ({ label, id, onChange, value, placeholder }: Props) => {
  return (
    <>
      <S.LabelWrapper>
        <label htmlFor={id}>{label}</label>
      </S.LabelWrapper>
      <S.InputWrapper>
        <S.Input
          id={id}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </S.InputWrapper>
    </>
  );
};

export default Input;
