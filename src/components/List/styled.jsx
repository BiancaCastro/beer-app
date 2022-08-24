import styled from "styled-components";

export const Heading = styled.h1`
  color: "black";
  font-size: 2rem;
`;
export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
export const Card = styled.div`
border:2px solid #636e7452;
margin: 10px auto;
max-width:200px;
 display: block,
 margin:3px;
 display: flex;
 flex-direction: column;
 margin: 0px 30px 10px;
 padding:20px;
 border-radius:3px;
 height: 400px;
 overflow: scroll;
 justify-content: space-between;
}
 &:hover{
  cursor:pointer;
  background:#1a679152;
}
`;
export const Image = styled.img`
  width: 90px;
  display: block;
  width: 70px;
  height: auto;
  margin: 0 auto;
`;

export const Button = styled.button`
  border: 1px solid #181d21;
  margin-bottom: 2px;
  border-radius: 3px;
  padding: 4px;

  &:hover {
    cursor: pointer;
    background: #607d8b;
    color: white;
  }
  &&:disabled {
    background: #ff8e8e;
    color: white;
    &:hover {
      cursor: not-allowed;
    }
  }
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
