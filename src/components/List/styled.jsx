import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
export const LinkText = styled.div`
  border: 2px solid #636e7452;
  margin: 10px;
  padding: 10px;
  &:hover {
    background: #636e7452;
    color: white;
  }
`;
