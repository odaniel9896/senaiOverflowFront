import { Container, IconSearch } from "./styles";
import { useRef } from "react";

function InputSearch({ id, label, value, handler, ...rest }) {

  const inputRef = useRef()
  return (
    <Container>
      <input
        id={id}
        {...rest}
        type="search"
        placeholder="Procurar"
        value={value}
        onChange={handler}
        ref={inputRef}
      />
      <IconSearch onClick={() => inputRef.current.focus()}/>
    </Container>
  );
}

export default InputSearch;
