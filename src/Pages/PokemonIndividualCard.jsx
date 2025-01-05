import { useParams } from 'react-router-dom';
import { useEffect, useState,React } from 'react';
import { Card,ButtonGroup,Button,Container,Row,Col } from 'react-bootstrap';
import PokemonNav from '../Navigation/PokemonNav';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder



export default function PokemonIndividualCard(props){
    const params = useParams();  // If you're using dynamic route parameters
    const pokemonCardID = params["*"]
    const [pokemonCard,setPokemonCard] = useState(null)
    const [quantities,setQuantities] = useState(0)
    const [prices,setPrices] = useState(null)
    const pokemonCardTypes = ["Regular", "Reverse Holofoil","First Edition", "Shadowless"]



    useEffect(() => {
        getPokemonCardInfo()
        let initialQuantities = {}
        for (const pokemonCardType of pokemonCardTypes){
            initialQuantities[pokemonCardType]=0
        }
        setQuantities(initialQuantities)
    },[])

    const getPokemonCardInfo = async ()=>{
        let cardInfo = await fetch(`https://api.pokemontcg.io/v2/cards/${pokemonCardID}`,{
            "Headers":{
                "Content-Type":"application/json"
            }
        })
        cardInfo = await cardInfo.json()
        setPokemonCard(cardInfo["data"])
        setPrices(cardInfo["data"].tcgplayer.prices)
        console.log(cardInfo["data"])
    }

    const getPokemonCardImage = (pokemonCard)=>{
        return (
        <Col className="d-flex justify-content-center align-items-center">
            <img
                src={pokemonCard.images.large}
                alt="example"
                style={{ width: '300px', height: 'auto', objectFit: 'cover'}}
            />
        </Col>)
    }

    const getPokemonCardBaseInfo = (pokemon)=>{
        return (
            <div>
                <Card.Title style={{"fontSize":50}}>{pokemonCard.name}</Card.Title>
                    <Card.Text style={{"fontSize":20}}>
                        {(pokemonCard.evolvesFrom !== undefined || (pokemonCard.evolvesTo && pokemonCard.evolvesTo.length > 0)) ? "Evolves " : ""} {pokemonCard.evolvesFrom !== undefined ? `from ${pokemonCard.evolvesFrom}` : ""} {pokemonCard.evolvesTo && pokemonCard.evolvesTo.length > 0 ? `to ${pokemonCard.evolvesTo[0]}` : ''} 
                </Card.Text>
            </div>
        )
    }

    const getPokemonCardMetaData = (pokemonCard)=>{
        return (
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
                    return <li key={cardType}>{cardType}: ${prices[cardType]["mid"]}</li>
                })}
            </ul>
            </Col>
        </Row>)
    }

    const getQuantityButtons = (pokemonCardType)=>{
        return (
            <Col sm={12} md={8} lg={6} xl={6} key={pokemonCardType}>
                <Card.Text style={{"fontSize":20}}>{pokemonCardType}</Card.Text>
                <ButtonGroup style={{width:"100%"}}>

                    <Button style ={{"fontSize":30}} onClick={()=>{
                        setQuantities((prevQuantities) => ({
                        ...prevQuantities, 
                        [pokemonCardType]: prevQuantities[pokemonCardType]===0 ? prevQuantities[pokemonCardType] : prevQuantities[pokemonCardType] - 1,
                        }));
                    }}>
                        -
                    </Button>
                    
                    <Card.Text style={{width:"25%",fontSize:25,textAlign:"Center",alignItems:"center"}}>{quantities[pokemonCardType]}</Card.Text>
                    <Button style ={{"fontSize":30}} onClick={()=>{
                        setQuantities((prevQuantities) => ({
                            ...prevQuantities, 
                            [pokemonCardType]: prevQuantities[pokemonCardType] + 1,
                        }));
                    }}>         
                        +
                    </Button>
                </ButtonGroup>
            </Col>
        )
    }

    const getPokemonCardQuantities = () => {
        return (
            <Row>
                <Card.Text style={{ fontSize: 25, fontStyle: 'italic' }}>Quantities</Card.Text>
                    {pokemonCardTypes.map((pokemonCardType) => {
                        return getQuantityButtons(pokemonCardType);
                    })}
            </Row>
        );
    };
    
    const getPokemonCardElement = ()=>{
        return (
            <Card style={{width: '100%', flexDirection: 'row',"backgroundColor":"#d3d3d3" }}>
                <Row className="g-0">
                    {getPokemonCardImage(pokemonCard)}
                    <Col>
                    <Card.Body>
                        {getPokemonCardBaseInfo(pokemonCard)}
                        {getPokemonCardMetaData(pokemonCard)}
                        {getPokemonCardQuantities(pokemonCard)}
                        
                    </Card.Body>
                    </Col>
                </Row>
                </Card>
        )

    }

    

    return  <div>
                <PokemonNav></PokemonNav>
                {pokemonCard=== null ?
                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>                  
                    <img 
                    src={loadingGif}
                    width='25%' 
                    height='25%' 
                    alt="loading..." 
                    />
                    </Container>
                :
                <Container fluid style={{ width: '75%' }}>
                    <Row className="d-flex g-4">
                        {
                            pokemonCard === null ? 
                            <img src={loadingGif} width='250' height='2000' alt="loading..." />  
                            : getPokemonCardElement()
                        }
                                    
                    </Row>
                </Container>
    }
    
</div>
}