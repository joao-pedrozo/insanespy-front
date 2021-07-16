import styled from "styled-components";

export const StorePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ebeced;
  overflow: inherit;
  padding: 20px 60px;
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
  text-align: center;
`;

export const DeleteStoreLink = styled.a`
  cursor: pointer;
  margin-bottom: 35px;
  color: #e32929;
  font-weight: 600;
`;
