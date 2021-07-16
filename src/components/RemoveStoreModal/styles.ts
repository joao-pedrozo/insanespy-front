import styled from "styled-components";

export const AddStoreModalWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  padding: 60px;
  border-radius: 4px;
  max-width: 600px;

  h1 {
    text-align: center;
    width: 400px;
    margin-bottom: 26px;

    .highlighted {
      color: #9900ff;
    }
  }

  span:first-child {
    color: red;
  }
`;
