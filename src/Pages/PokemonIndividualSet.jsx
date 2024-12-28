import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PokemonNav from '../Navigation/PokemonNav';
import {Card, Col, Container, Row } from 'react-bootstrap';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder

export default function PokemonIndividualSet(){``
    const params = useParams();  // If you're using dynamic route parameters
    const cardSetID = params["*"]
    const [pokemonCards,setPokemonCards] = useState(null)
    let cardSet


    useEffect(() => {
        getSets()
    },[])

    const getSets = async ()=>{
        cardSet = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${cardSetID}`,{
            "Headers":{
                "Content-Type":"application/json"
            }
        })
        cardSet = await cardSet.json()
        cardSet["data"].sort((a,b)=>a.number-b.number)
        setPokemonCards(cardSet["data"])
        console.log(cardSet["data"])
    }

    const getCardElements = ()=>{
        return (
            pokemonCards?.map(pokemonCard=>{
                return( 
                    <Col sm={12} md={8} lg={6} xl={4} key={pokemonCard.id} >
                            <Card>
                            <Link to={`/Cards/${pokemonCard.id}`} params={{"pokemonCard":pokemonCard}}>
                                
                                <Card.Body style={{"textAlign":"Center", "color":"black", "fontSize":25}}>
                                    {pokemonCard.name}
                                    <br></br>
                                    {pokemonCard.number}/{pokemonCard.set.printedTotal}

                                </Card.Body>

                                <Card.Img  
                                    style={{"height":"350px","width":"100%","objectFit":"contain"}}
                                    src={pokemonCard.images.large}>
                                </Card.Img>
                            </Link>

                         
                            </Card>
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
                    {
                        pokemonCards === null ? 
                        <img src={loadingGif} width='250' height='2000' alt="loading..." />  // Use the imported image here    
                        : getCardElements()
                    }
                                  
                </Row>
            </Container>
        </div>
        
    )
}