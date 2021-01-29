import styled from "styled-components";

export const Container = styled.div `
    width: 100%;
    position: relative;
    margin-top: 15px;
    > input {
        border: 0;
        padding-left: 10px;
        border-radius: 4px;

        font-family: sans-serif;
    }
    > label {
        position: absolute;     
        left: 10px;
        top: 0px;

        transition: 0.2s ease-in-out;

        display: flex;
        align-items: center;
        color: var(--darkGray);
        cursor: text;
        pointer-events: none;
    }
    > input, 
    >label {
        width: 100%;
        height: 30px;
        font-size: 16px;
    }
    >input:not(:placeholder-shown) + label,
    >input:focus + label {
        color: var(--light);
        top: -25px;
        font-size: 14px;
        left: 0;
    }
`