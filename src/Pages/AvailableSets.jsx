import { useEffect, useState,React } from "react";
import PokemonNav from "../Navigation/PokemonNav.jsx";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AvailableSets(){
    let [pokemonCardSets, setPokemonCardSets] = useState() 
    useEffect(() => {
        getSets()
    },[])

    const getSets = async ()=>{
        let sets = await fetch("https://api.pokemontcg.io/v2/sets")
        sets = await sets.json()
        sets["data"].sort((a,b)=>new Date(a.releaseDate) - new Date(b.releaseDate))
        setPokemonCardSets(sets["data"])  
    }

    const getSetElements = ()=>{
        
        return (
            pokemonCardSets?.map(cardSet=>{
                return( 
                    <Col sm={12} md={6} lg={4} xl={3} key={cardSet.id} style={{"padding-top":"15px"}}>
                        <Link to={`${cardSet.id}`}>
                            <Card style={{"backgroundColor":"#d3d3d3"}}>
                                <Card.Body style={{"textAlign":"Center", "fontSize":25}}>{cardSet.name}</Card.Body>
                                <Card.Body style={{"textAlign":"Center", "fontSize":20}}>{cardSet.series} series<br/>{cardSet.total} cards total</Card.Body>

                                <Card.Img  
                                    style={{"height":"200px","width":"100%","objectFit":"contain"}}
                                    src={cardSet.images.logo}></Card.Img>
                            </Card>
                        </Link>
                    </Col>
                )
            
            }) 
        ) 
    }

    
    return (
        <div>
            <PokemonNav></PokemonNav>
            <Container fluid style={{ width: '75%' }}>
                <Row className="d-flex g-4">
                    {getSetElements()}              
                </Row>
            </Container>
        </div>
        
    )
}