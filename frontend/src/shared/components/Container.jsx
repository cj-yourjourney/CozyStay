import { Container as BootstrapContainer } from "react-bootstrap";

const Container = ({ children }) => {
  return <BootstrapContainer style={ {
    marginTop: '20px',
    marginBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px' 

  }}>{children}</BootstrapContainer>;
}

export default Container;