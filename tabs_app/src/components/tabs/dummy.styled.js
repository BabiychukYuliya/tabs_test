import styled from "styled-components";

export const Chart = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: blue;
`;

export const Table = styled.table`
  border-collapse: collapse;
`;

export const Cell = styled.td`
  border: 1px solid black;
`;

export const Header = styled.div`
  font-size: 40px;
`;

export const Name = styled.p`
  font-size: 40px;
  text-align: center;
  font-weight: 700;
  color: #000000;
`;
