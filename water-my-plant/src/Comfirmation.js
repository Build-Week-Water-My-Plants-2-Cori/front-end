import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
const InforStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.8rem;
  font-family: "Roboto Condensed", sans-serif;
  width: 70%;
  margin: 4% auto;
  border: 2px solid black;
  border-radius: 10px;
`;

export default function Confirmation(props) {
    const {info} = props
    console.log(info.email, 'this is what i want')

return (
    <InforStyle>
      <h3>This is my get data string</h3>
      <p>{info.email}</p>
    </InforStyle>
  );
}
