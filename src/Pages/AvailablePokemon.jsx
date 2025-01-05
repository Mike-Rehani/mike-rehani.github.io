import { useEffect, useState,React } from 'react';
import { Card,Container,Row,Col, Form } from 'react-bootstrap';
import PokemonNav from '../Navigation/PokemonNav';
import loadingGif from '../assets/loading.gif'; // Import the image from the assets folder
import { Link } from 'react-router-dom';
import '../index.css'


export default function AvailablePokemon(props){
    const [availablePokemon,setAvailablePokemon] = useState(null)
    const [filteredPokemon,setFilteredPokemon] = useState(null)
    const [pokemonIndexDict, setPokemonIndexDict] = useState({})
    const NUMBER_OF_POKEMON = 1025



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
        setPokemonDict(data["results"])
        setFilteredPokemon(data["results"])

    }

    const setPokemonDict = (pokemon)=>{
        let tempDict = {}
        for (let i = 0; i < NUMBER_OF_POKEMON; i++){
            tempDict[pokemon[i].name]=i+1
        }
        setPokemonIndexDict(tempDict)
    }

    const getAvailablePokemon = ()=>{

        return (
            <Container fluid style={{ width: '100%', "padding":'50px', "paddingTop":"0px",}}>
                    <Row className="d-flex g-4">
                        {filteredPokemon?.map(pokemon=>{
                            if (pokemonIndexDict[pokemon.name] === undefined) return 
                            return (
                                
                                <Col sm={12} md={6} lg={4} xl={3} key={pokemon.name} >
                                    <Link to={pokemon.name}>
                                        <Card style={{"backgroundColor":"#d3d3d3"}}>
                                            <Card.Body style={{"textAlign":"Center", "fontSize":25}}>{pokemon.name}</Card.Body>
                                            <Card.Img  
                                                style={{"height":"200px","width":"100%","objectFit":"contain"}}
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndexDict[pokemon.name]}.png`}>
                                            </Card.Img>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
        )
    }

    const getPokemonSearchBar = ()=>{
        return (
            <Form style={{ "paddingLeft":"50px","paddingRight":"50px","paddingTop":"25px" }}>
                <Form.Group className="mb-3">
                    <Form.Label style={{"fontSize":"20", "color":"white"}}>Search Pokemon</Form.Label>
                    <Form.Control 
                        id="pokemonSearch"
                        style={{"backgroundColor":"#d3d3d3"}}
                        onChange={(e)=>{
                            filterPokemonCards(e.target.value)

                            }}/>
                </Form.Group>
            </Form>
        )
    }

    const filterPokemonCards = (searchInput)=>{
        setFilteredPokemon(availablePokemon.filter((pokemon)=>{return pokemon.name.includes(searchInput)}))
    }

    return  (
        
        <div>
                <PokemonNav/>
                {filteredPokemon=== null ?
                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>                  
                        <img 
                        src={loadingGif}
                        width='25%' 
                        height='25%' 
                        alt="loading..." 
                        />
                    </Container>
                : 
                <>
                {getPokemonSearchBar()}
                {getAvailablePokemon()}
                </>
                }

            </div>
    )
}