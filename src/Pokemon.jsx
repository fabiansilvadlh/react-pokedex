import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, capitalize, CircularProgress, Button, Card, CardMedia, Grid } from '@material-ui/core'
import axios from 'axios';
import { makeStyles, alpha } from '@material-ui/core/styles';
import TypesImg from './typeimg.json';

const useStyles = makeStyles(theme => ({

  pokemonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '100px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '100%',
    height: 'auto'

  },
  pokemonDescription: {
    margin: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardMedia: {
    margin: 'auto',
    display: 'block',
  },
  cardxd: {
    backgroundColor: alpha(theme.palette.common.white, 0.6),
    padding: '15px',
    fontWeight: 'bold',
  },
  typeImg: {
    margin: '10px',
    width: '110px',
    height: '40px',
    display: 'center',
  },


}));



const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const navigate = useNavigate();
  const [desc, setDesc] = useState();
  const [evolution, setEvolution] = useState();
  const classes = useStyles();

  //getting data from Api
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);

      })
      .catch(function (error) {
        setPokemon(false);
      });



  }, [pokemonId]);

  //getting pokemon description from other part of the API
  const getPokemonDescription = () => {
    if (!pokemon) {
      return;
    }
    const { species } = pokemon;
    axios.get(species.url)
      .then(function (response) {
        const { data } = response;
        const { flavor_text_entries } = data;
        const description = flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
        setDesc(description);
      })
  }

  //getting evolution chain from other sector of the API
  const getPokemonEvolution = () => {
    if (!pokemon) {
      return;
    }
    const { species } = pokemon;
    axios.get(species.url)
      .then(function (response) {
        const { data } = response;
        const { evolution_chain } = data;
        axios.get(evolution_chain.url)
          .then(function (response) {
            const { data } = response;
            const { chain } = data;

            const evolution = [];
            evolution.push(chain.species.name);
            chain.evolves_to.forEach(evolutionStage => {
              evolution.push(evolutionStage.species.name);
              evolutionStage.evolves_to.forEach(evolutionStage => {
                evolution.push(evolutionStage.species.name);
              })
            })
            setEvolution(evolution);
          })
      })
  }

  //Making the pokemon page with the data received from the API
  const generatePokemonJSX = () => {
    getPokemonDescription();
    getPokemonEvolution();
    const { id, name, height, weight, types, sprites } = pokemon;
    const formattedId = `00${id}`.slice(-3) || `0${id}`.slice(-2) || id;

    const fullImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

    const { front_default } = sprites;
    return (

      <>
        <Grid className={classes.pokemonContainer}
        >
          <Card className={classes.cardxd}>
            <Typography variant="h1">
              {`#${id} ${capitalize(name)}`}
              <img src={front_default} />
            </Typography>

            <CardMedia
              className={classes.cardMedia}
              style={{ width: '300px', height: '300px' }} image={fullImageUrl} />
            <Typography>Height: {height} ft</Typography>
            <Typography>Weight: {weight} lbs</Typography>
            <Typography variant="h6">Types:</Typography>
            {types.map((typeInfo) => {
              const { type } = typeInfo;
              const { name } = type;
              const typeImg = TypesImg.find(type => type.name === name).img;
              return (
                <img className={classes.typeImg} src={typeImg} alt={name} />
              )
            })}
            <Typography variant="h4">Description: </Typography>
            <Typography
              className={classes.pokemonDescription}
            >{desc}</Typography>
            <Typography variant="h4">Evolution chain: </Typography>
            {evolution && evolution.map((evolutionStage) => {
              return <Typography key={evolutionStage}>{capitalize(`${evolutionStage}`)}</Typography>
            })}
          </Card>
        </Grid>

      </>

    );

  };

  //Making error msg in case of wrong Pokemon ID + loading animation
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button className={classes.button} variant="contained" onClick={() => navigate('/')}>
          Back to Pokedex
        </Button>
      )}

    </>);
};


export default Pokemon;


// if (name === 'normal') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/c/c6/NormalIC_PE.png" alt="Normal" />
// }else if (name === 'fire') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/e/ea/FireIC_PE.png" alt="Fire" />
// }else if (name === 'water') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/e/e1/WaterIC_PE.png" alt="Water" />
// }else if (name === 'electric') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/e/ee/ElectricIC_PE.png" alt="Electric" />
// }else if (name === 'grass') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/3/3f/GrassIC_PE.png" alt="Grass" />
// }else if (name === 'flying') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/7/76/FlyingIC_PE.png" alt="Flying" />
// }else if (name === 'poison') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/e/e1/PoisonIC_PE.png" alt="Poison" />
// }else if (name === 'bug') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/0/06/BugIC_PE.png" alt="Bug" />
// }else if (name === 'ground') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/b/be/GroundIC_PE.png" alt="Ground" />
// }else if (name === 'rock') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/e/ed/RockIC_PE.png" alt="Rock" />
// }else if (name === 'fighting') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/6/64/FightingIC_PE.png" alt="Fighting" />
// }else if (name === 'psychic') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/3/37/PsychicIC_PE.png" alt="Psychic" />
// }else if (name === 'ghost') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/7/77/GhostIC_PE.png" alt="Ghost" />
// }else if (name === 'ice') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/9/94/IceIC_PE.png" alt="Ice" />
// }else if (name === 'dragon') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/1/1b/DragonIC_PE.png" alt="Dragon" />
// }else if (name === 'dark') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/a/a2/DarkIC_PE.png" alt="Dark" />
// }else if (name === 'steel') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/8/81/SteelIC_PE.png" alt="Steel" />
// }else if (name === 'fairy') {
//   return <img className={classes.typeImg} src="https://archives.bulbagarden.net/media/upload/a/a4/FairyIC_PE.png" alt="Fairy" />
// }