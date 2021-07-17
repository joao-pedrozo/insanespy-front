import styled from "styled-components";

export const AddStoreModalWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 60px;
  border-radius: 4px;
  max-width: 600px;
  text-align: center;

  span {
    max-width: 400px;
    line-height: 1.5;
  }

  h1 {
    width: 400px;
    margin-bottom: 20px;

    .highlighted {
      color: #9900ff;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  button:first-child {
    margin-right: 10px;
  }
`;
