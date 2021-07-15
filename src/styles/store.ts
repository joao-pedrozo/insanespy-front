import styled from "styled-components";

export const StorePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background: #ebeced;
`;

export const GetBackToHome = styled.a`
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 25px;
`;

export const StoreTitle = styled.h1`
  font-size: 49px;
  background-color: #f3ec78;
  background-image: linear-gradient(90deg, #ff0099, #9900ff);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  margin-bottom: 35px;
`;
