import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";


const SpinnerDiv = styled.div`
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`;


export default function LoadingIndicator() {
    return <SpinnerDiv>
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </SpinnerDiv>;
}