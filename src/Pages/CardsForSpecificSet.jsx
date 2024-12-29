import { useEffect, useState,React } from 'react';
import { useParams } from 'react-router-dom';
import PokemonNav from '../Navigation/PokemonNav';
import {Container, Row } from 'react-bootstrap';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder
import PokemonPreviewCard from '../Components/PokemonPreviewCard';

export default function CardsForSpecificSet(){``
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
    }


    
    return (
        <div>
            <PokemonNav></PokemonNav>
            {
            pokemonCards === null ? 
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>                  
                    <img 
                    src={loadingGif}
                    width='25%' 
                    height='25%' 
                    alt="loading..." 
                    />
                </Container>
            : 
            <Container fluid style={{ width: '100%' }}>
                <Row className="d-flex g-4">
                {pokemonCards?.map((pokemonCard) => {
                     return <PokemonPreviewCard pokemonCard={pokemonCard} key={pokemonCard.id} />;
                 })}
                </Row>
            </Container>
            }
        </div>
        
    )
}