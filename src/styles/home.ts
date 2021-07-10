import styled from "styled-components";

export const HomePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background: #ebeced;
`;

export const StoresTitlte = styled.h1`
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

export const Credits = styled.b`
  position: absolute;
  bottom: 20px;
`;
