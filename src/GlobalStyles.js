import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle `
    :root {
        --dark: #282a36;
        --darkGray: #444758;
        --light: #EDF2f4;
        --primary: #EF233C;
        --secondary: #d90429;
    }
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing:border-box;
    }
    ::-webkit-scrollbar-track {
        background-color: var(--darkGray);
    }
    ::-webkit-scrollbar {
        width: 8px;
        border-radius: 4px;
        background-color: var(--darkGray);
        
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--light)
    }
    body {
        font-family: sans-serif;
        color: var(--light);
    }
    button {
        padding: 10px;
        font-weight: bold;
        color: var(--light);
        background-color: var(--darkGray);
        border: 1px solid var(--light);
        border-radius:4px;

        cursor: pointer;

        transition: .2s ease-in-out;
        :hover {
            background-color: var(--primary)
        }
        :active {
            transform: scale(0.95);
        }
        :disabled {
            background-color: transparent;
            border: 1px solid var(--darkGray);
            color: var(--darkgray)
        }
    } 
    a {
        color: var(--light);
        transition: .2s;
        :hover {
            color: var(--primary)
        }
        :active {
            transform: scale(0.95)
        }
    }
    textarea {
        font-size: 16px;
        padding: 5px;
        font-weight: bold;
        resize: none;
    }
`