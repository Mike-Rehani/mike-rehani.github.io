import { useParams } from 'react-router-dom';
import { useEffect, useState,React } from 'react';
import { Card,ButtonGroup,Button,Container,Row,Col } from 'react-bootstrap';
import PokemonNav from '../Navigation/PokemonNav';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder



export default function PokemonIndividualCard(props){
    const params = useParams();  // If you're using dynamic route parameters
    const pokemonCardID = params["*"]
    const [pokemonCard,setPokemonCard] = useState(null)
    const [regularQuantity,setRegularQuantity] = useState(0)
    const [reverseQuantity,setReverseQuantity] = useState(0)
    const [prices,setPrices] = useState(null)



    useEffect(() => {
        getCardInfo()
    },[])

    const getCardInfo = async ()=>{
        let cardInfo = await fetch(`https://api.pokemontcg.io/v2/cards/${pokemonCardID}`,{
            "Headers":{
                "Content-Type":"application/json"
            }
        })
        cardInfo = await cardInfo.json()
        setPokemonCard(cardInfo["data"])
        setPrices(cardInfo["data"].tcgplayer.prices)
        console.log(cardInfo["data"].tcgplayer.prices)
      
    }


    const getPokemonCardElement = ()=>{
        return (
            <Card style={{width: '100%', flexDirection: 'row' }}>
                <Row className="g-0">
                    <Col>
                    <img
                        src={pokemonCard.images.large}
                        alt="example"
                        style={{ width: '500px', height: 'auto', objectFit: 'cover' }}
                    />
                    </Col>
                    <Col>
                    <Card.Body>
                        <Card.Title style={{"fontSize":50}}>{pokemonCard.name}</Card.Title>
                        <Card.Text style={{"fontSize":20}}>
                        {(pokemonCard.evolvesFrom !== undefined || (pokemonCard.evolvesTo && pokemonCard.evolvesTo.length > 0)) ? "Evolves " : ""} {pokemonCard.evolvesFrom !== undefined ? `from ${pokemonCard.evolvesFrom}` : ""} {pokemonCard.evolvesTo && pokemonCard.evolvesTo.length > 0 ? `to ${pokemonCard.evolvesTo[0]}` : ''} 
                        </Card.Text>
                        <Row>
                            <Col md={6}>
                            <Card.Text style={{ "fontSize":25, fontStyle: 'italic' }}>
                                Metadata
                            </Card.Text>
                            <ul style={{"fontSize":20}}>
                                <li>Set: {pokemonCard.set.name}</li>
                                <li>Number: {pokemonCard.number} / {pokemonCard.set.printedTotal}</li>
                                <li>Rarity: {pokemonCard.rarity}</li>
                                <li>Artist: {pokemonCard.artist}</li>

                            </ul>
                            </Col>
                            <Col md={6}>
                            <Card.Text style={{ "fontSize":25, fontStyle: 'italic' }}>
                                Market Prices
                            </Card.Text>
                            <ul style={{"fontSize":20}}>
                                {Object.keys(prices).map(cardType=>{
                                    return <li key={cardType}>{cardType}: ${prices[cardType]["market"]}</li>
                                })}
                            </ul>
                            </Col>
                        </Row>

                        <Card.Text style={{ "fontSize":25, fontStyle: 'italic' }}>
                            Quantities
                        </Card.Text>
                        <Card.Text style={{"fontSize":20}}>Regular</Card.Text>
                        <ButtonGroup style={{width:"100%"}}>
                            <Button style ={{"fontSize":30}} onClick={()=>setRegularQuantity(regularQuantity===0 ? regularQuantity : regularQuantity-1)}>-</Button>
                            <Card.Text style={{width:"25%",fontSize:25,textAlign:"Center",alignItems:"center"}}>{regularQuantity}</Card.Text>
                            <Button style ={{"fontSize":30}} onClick={()=>setRegularQuantity(regularQuantity+1)}>+</Button>
                        </ButtonGroup>

                        <br/><br/>
                        <Card.Text style={{"fontSize":20}}>Reverse Holo</Card.Text>
                        <ButtonGroup style={{width:"100%"}}>
                            <Button style ={{"fontSize":30}} onClick={()=>setReverseQuantity(reverseQuantity===0 ? 0 : reverseQuantity-1)}>-</Button>
                            <Card.Text style={{width:"25%",fontSize:25,textAlign:"Center",alignItems:"center"}}>{reverseQuantity}</Card.Text>
                            <Button style ={{"fontSize":30}} onClick={()=>setReverseQuantity(reverseQuantity+1)}>+</Button>
                        </ButtonGroup>
                        <br/><br/>
                        <Button style={{width:"100%"}} className="btn btn-success">
                            <Card.Text style={{"fontSize":30}}>Save</Card.Text>
                        </Button>
                    </Card.Body>
                    </Col>
                </Row>
                </Card>
        )

    }

    

    return  <div>
    <PokemonNav></PokemonNav>
    <Container fluid style={{ width: '75%' }}>
        <Row className="d-flex g-4">
            {
                pokemonCard === null ? 
                <img src={loadingGif} width='250' height='2000' alt="loading..." />  
                : getPokemonCardElement()
            }
                          
        </Row>
    </Container>
</div>
}