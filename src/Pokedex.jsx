import React, {useEffect, useState} from 'react'
import {AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography, capitalize} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import mockData from './mockData';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  cardMedia: {
    margin: 'auto',
    textTransform: 'capitalize'
  },
  cardContent: {
    textAlign: 'center'
  }

})




const Pokedex= () => {

  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=25`)
    .then(function (response) {
      const {data} = response;
      const {results} = data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }
      })
      setPokemonData(newPokemonData);
    })
  }, [])



  const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[`${pokemonId}`]);
    const {id, name, sprite } = pokemonData[pokemonId];


    
    return (
    <Grid item xs={4} key={pokemonId}>
      <Card onClick={() => navigate(`/${pokemonId}`)} >
        <CardMedia
          className={classes.cardMedia}
          style={{width: '130px', height: '130px'}}
          image={sprite}
          />
        <CardContent className={classes.cardContent}> 
          <Typography >{`${pokemonId}. ${(capitalize(name))}`}</Typography>
        </CardContent>
        
      </Card>
    </Grid>
    );
    
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      {pokemonData ? (
      <Grid container spacing={2} className={classes.pokedexContainer} >
        {
          Object.keys(pokemonData).map(pokemonId =>
            getPokemonCard([pokemonId])
        )}
      </Grid>  

      ) : (
        <CircularProgress />
      )}

    </>

  );
  
};





export default Pokedex;