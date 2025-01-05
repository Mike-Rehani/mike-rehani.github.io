import {Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PokemonPreviewCard(props){
    console.log(props.pokemonCard.set.name)
    return (
        <Col sm={12} md={8} lg={6} xl={4} >
            <Card style={{"backgroundColor":"#d3d3d3"}}>
            <Link to={`/cards/${props.pokemonCard.id}`} params={{"pokemonCard":props.pokemonCard}}>
                
                <Card.Body style={{"textAlign":"Center", "color":"black", "fontSize":25}}>
                    {props.pokemonCard.name}
                    <br></br>
                    <i>{props.pokemonCard.set.name}</i>
                    <br></br>
                    {props.pokemonCard.number}/{props.pokemonCard.set.printedTotal}

                </Card.Body>

                <Card.Img  
                    style={{"height":"350px","width":"100%","objectFit":"contain"}}
                    src={props.pokemonCard.images.large}>
                </Card.Img>
            </Link>

            
            </Card>
    </Col>)
}