import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 auto;
  border-collapse: collapse;
  background: #fff;
`;

export const ThHeader = styled.th`
  color: black;
  font-weight: bold;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
  border-right: 1px solid #ccc;
`;

export const Tr = styled.tr`
  cursor: pointer;

  transition: all 0.35s ease;

  &:hover {
    background: #f2f2f2;
  }
`;

export const TdContent = styled.td`
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  text-align: center;
`;

export const Pagination = styled.div`
  margin-top: 15px;

  button {
    padding: 10px;
    font-family: "Rubik";
    font-weight: 600;
    font-size: 12px;
  }
`;
