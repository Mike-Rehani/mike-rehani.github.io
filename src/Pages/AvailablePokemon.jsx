import { useEffect, useState,React } from 'react';
import { Card,Container,Row,Col } from 'react-bootstrap';
import PokemonNav from '../Navigation/PokemonNav';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder
import { Link } from 'react-router-dom';



export default function AvailablePokemon(props){
    const [availablePokemon,setAvailablePokemon] = useState(null)
    const NUMBER_OF_POKEMON = 1025
    let index=0



    useEffect(() => {
        getListOfPokemon()
    },[])

    const getListOfPokemon = async ()=>{
        let data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000',{
            "Headers":{
                "Content-Type":"application/json"
            }
            
        })
        data = await data.json()
        
        setAvailablePokemon(data["results"])

    }
    
    return  <div>
                <PokemonNav/>
                {availablePokemon=== null ?
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
                        {availablePokemon?.map(pokemon=>{
                            index +=1 
                            if (index > NUMBER_OF_POKEMON) return
                            return (
                                
                                <Col sm={12} md={6} lg={4} xl={3} key={pokemon.name} >
                                    <Link to={pokemon.name}>
                                        <Card>
                                            <Card.Body style={{"textAlign":"Center", "fontSize":25}}>{pokemon.name}</Card.Body>
                                            <Card.Img  
                                                style={{"height":"200px","width":"100%","objectFit":"contain"}}
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}>
                                            </Card.Img>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>}
            </div>
}