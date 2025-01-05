import { useEffect, useState,React } from 'react';
import { useParams } from 'react-router-dom';
import PokemonNav from '../Navigation/PokemonNav';
import {Container, Row } from 'react-bootstrap';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder
import PokemonPreviewCard from '../Components/PokemonPreviewCard';

export default function CardForSpecificPokemon(){``
    const params = useParams();  // If you're using dynamic route parameters
    const pokemonName = params["*"]
    const [pokemonCards,setPokemonCards] = useState(null)


    useEffect(() => {
        getSets()
    },[])

    const getSets = async ()=>{
        let resp = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`,{
            "Headers":{
                "Content-Type":"application/json"
            }
        })
        resp = await resp.json()
        let data = resp["data"]
        data = data.sort((a,b)=>{
            const dateA = new Date(a.set.releaseDate)
            const dateB = new Date(b.set.releaseDate)
            return dateA-dateB
        })
        setPokemonCards(data)
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
            <Container fluid style={{ width: '100%',"padding":"50px" }}>
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