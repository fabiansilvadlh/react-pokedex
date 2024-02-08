import React, {useEffect, useState} from 'react'
import {AppBar, Toolbar, Grid, Card, CardContent, CircularProgress, CardMedia, Typography, capitalize, TextField} from '@material-ui/core'
import {makeStyles, alpha} from '@material-ui/core/styles'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const useStyles = makeStyles(theme => ({


  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
    overflowX: 'hidden',
    width: '100%',
  },
  card : {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.8),
    }
  },
  cardMedia: {
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '5px',
    marginBottom: '5px',
    
    
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
    color: 'white'
  },
  searchInput: {
    width: '200px',
    margin: '5px'
  }
}));


const Pokedex= () => {

  //declarating states needed
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };


  //getting data from API to show in the pokemon list
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
    .then(function (response) {
      const {data} = response;
      const {results} = data;
      const newPokemonData = {};
      
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          
        }
      })
      setPokemonData(newPokemonData);
    })
  }, [])





  //Making cards of each pokemon using CSS Grid Cards
  const getPokemonCard = (pokemonId) => {

    const {name, sprite} = pokemonData[pokemonId];
    return (
    <Grid item xs={6} md={3} sm={3} key={pokemonId}>
      <Card
      className={classes.card}
      onClick={() => navigate(`/${pokemonId}`)} >
        <CardMedia
          className={classes.cardMedia}
          style={{width: '130px', height: '130px'}}
          image={sprite}
          />
        <CardContent className={classes.cardContent}> 
          <Typography >{`#${pokemonId}  ${(capitalize(name))}`}</Typography>
        </CardContent>
        
      </Card>
    </Grid>
    );
  };

  //making page header with search bar
  return (
    <>
    <div
    className={classes.pokedex}>
      <AppBar position="sticky">
        <Toolbar >
          <div className={classes.searchContainer}>
            <CatchingPokemonIcon className={classes.searchIcon}/>
            <TextField
            onChange={handleSearchChange} 
            className={classes.searchInput}
            label="Search Pokemon..."
            variant="standard"
            />
          </div>
        </Toolbar >
      </AppBar>
      {pokemonData ? (
      <Grid container spacing={2} className={classes.pokedexContainer} >
        {
          Object.keys(pokemonData).map(pokemonId =>
            pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard([pokemonId])
        )}
      </Grid>  

      ) : (
        <CircularProgress />
      )}
      </div>
    </>

  );
  
};





export default Pokedex;
