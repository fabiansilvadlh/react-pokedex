import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {Typography, capitalize, CircularProgress, Button} from '@material-ui/core'
import axios from 'axios';

const Pokemon = () => {
  const {pokemonId} = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(function (response) {
      const {data} = response;
      setPokemon(data);
    })
    .catch(function (error) {
      setPokemon(false);
    });

  }, [pokemonId]);



  const generatePokemonJSX = () => {
    const {id, name, height, weight, types, sprites} = pokemon;
    const formattedId = `00${id}`.slice(-3) || `0${id}`.slice(-2) || id;

    const fullImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;
    
    const {front_default} = sprites;
    return (
      <>
      <Typography variant="h1">
        {`${id}. ${capitalize(name)}`}
        <img src={front_default} />
      </Typography>
      <img style={{width: '300px', height: '300px'}} src={fullImageUrl} />
      <Typography variant="h3">Pokemon Info</Typography>
      <Typography>Height: {height}</Typography>
      <Typography>Weight: {weight}</Typography>
      <Typography variant="h6">Types:</Typography>
      {types.map((typeInfo) => {
        const {type} = typeInfo;
        const {name} = type;
        return <Typography key={name}>{`${name}`}</Typography>
      })}
      </>
    );

  };

  return (
  <>
    {pokemon === undefined && <CircularProgress/>}
    {pokemon !== undefined && pokemon && generatePokemonJSX()}
    {pokemon === false && <Typography>Pokemon not found</Typography>}
    {pokemon !== undefined && (
      <Button variant="contained" onClick={() => navigate('/')}>
        Back to Pokedex
      </Button>
  )}

  </>);
};


export default Pokemon;

