import { Container } from "./styles";

function SearchBar({ id, label, value, handler, onClick, ...rest }) {
  return (
    <Container>
      <input id={id} {...rest} placeholder=" " value={value} onChange={handler}></input>

      <label htmlFor={id}> {label} </label>
      <button onClick={onClick}>pesquise!</button>
    </Container>
  );
}

export default SearchBar;