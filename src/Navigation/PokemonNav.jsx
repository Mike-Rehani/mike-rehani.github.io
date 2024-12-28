import { Nav, Navbar } from "react-bootstrap";

function PokemonNav(){
    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Nav.Item>
                <Nav.Link 
                className="navbar-brand"
                href="/home">Home</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link 
                className="navbar-brand"
                href="/sets">Sets</Nav.Link>
            </Nav.Item>
            
        </Navbar>
    )
}
export default PokemonNav