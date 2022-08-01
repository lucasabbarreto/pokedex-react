import { useEffect, useState, useCallback } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getPokemonData, getPokemonAbility } from './services/api';

import './App.css'

function App() {

  const [getPokemon, setGetPokemon] = useState({ pokemon: "1" })
  const [InputData, setInputData] = useState("1");
  const [pokemonData, setPokemonData] = useState("");
  const [pokemonImage, setImage] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [StyleStatBar, setStyleStatBar] = useState([]);
  const [StyleFrameGradient, SetStyleFrameGradient] = useState([]);
  const [pokemon, setPokemon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = pokemon;
    setInputData(data);
    setPokemon("");
  }

  const handleLeftButton = () => {
    let previousPokemon = Number(InputData) - 1;
    if (previousPokemon === 0) {
      previousPokemon = 898;
    }
    setInputData(JSON.stringify(previousPokemon));
    setPokemon("");
  }

  const handleRightButton = () => {
    let nextPokemon = Number(InputData) + 1;
    if (nextPokemon === 899) {
      nextPokemon = 1
    }
    setInputData(JSON.stringify(nextPokemon));
    setPokemon("");
  }

  useEffect(() => {
    async function searchPokemon() {
      const pokemon = await getPokemonData.get(InputData);
      setPokemonData(pokemon.data);
    }
    searchPokemon();
  }, [InputData]);

  useEffect(() => {
    if (pokemonData) {
      function serializedData() {
        setImage(pokemonData.sprites.other['official-artwork']['front_default']);
        setPokemonTypes(pokemonData.types);
      }
      serializedData();
    }
  }, [pokemonData]);

  useEffect(() => {
    if (pokemonData) {
      const baseStats = [];
      pokemonData.stats.map(stat => {
        return baseStats.push([`${stat['base_stat']}%`, stat.stat.name])
      })
      const dynamicStatsBar = [];
      baseStats.forEach(stat => {
        const barStyle = {
          width: stat[0],
        }
        dynamicStatsBar.push([barStyle, stat[1]])
      });
      const gradientColors = []

      pokemonTypes.forEach(type => {
        if (type.type.name === 'grass') {
          gradientColors.push('#9BCC50')
        } else if (type.type.name === 'poison') {
          gradientColors.push('#B97FC9')
        } else if (type.type.name === 'fire') {
          gradientColors.push('#FD7D24')
        } else if (type.type.name === 'normal') {
          gradientColors.push('#A8A878')
        } else if (type.type.name === 'water') {
          gradientColors.push('#6890F0')
        } else if (type.type.name === 'electric') {
          gradientColors.push('#F8D030')
        } else if (type.type.name === 'ice') {
          gradientColors.push('98D8D8')
        } else if (type.type.name === 'fighting') {
          gradientColors.push('#C03028')
        } else if (type.type.name === 'ground') {
          gradientColors.push('#E0C068')
        } else if (type.type.name === 'psychic') {
          gradientColors.push('#F85888')
        } else if (type.type.name === 'bug') {
          gradientColors.push('#A8B820')
        } else if (type.type.name === 'rock') {
          gradientColors.push('#B8A038')
        } else if (type.type.name === 'ghost') {
          gradientColors.push('#705898')
        } else if (type.type.name === 'dark') {
          gradientColors.push('#705848')
        } else if (type.type.name === 'flying') {
          gradientColors.push('#A890F0')
        } else if (type.type.name === 'dragon') {
          gradientColors.push('#7038F8')
        } else if (type.type.name === 'steel') {
          gradientColors.push('#B8B8D0')
        } else if (type.type.name === 'fairy') {
          gradientColors.push('#F0B6BC')
        }

      })
      if (gradientColors.length < 2) {
        gradientColors.push('#FFF')
      }

      if (gradientColors.length === 2) {
        const gradient = { backgroundImage: `linear-gradient(to bottom right, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[0]}, ${gradientColors[1]})` }
        SetStyleFrameGradient(gradient);
      }

      setStyleStatBar(dynamicStatsBar);

    }
  }, [pokemonTypes])

  return (
    <main>
      <img className="background-image"></img>
      <button className='btn-left' onClick={handleLeftButton}><FiChevronLeft className='arrow-left' /></button>
      <div className='pokemon-info-wrapper'>
        <form className="search-pokemon" onSubmit={handleSubmit}>
          <label className="search-pokemon-label" htmlFor="pokemon">Search a Pokémon:</label>
          <input onChange={event => setPokemon(event.target.value)} className='search-pokemon-input' id="pokemon" name='pokemon' placeholder='name or number' value={pokemon}></input>
          <button onSubmit={handleSubmit} className="search-pokemon-button" type='submit'>
            <FiSearch />
          </button>
        </form>
        <div className='pokemon-data'>
          <small className='number-name-container'>
            nº <span className='pokemon-number'>{pokemonData.id}</span> - <span className='pokemon-name'>{pokemonData.name}</span>
          </small>
          <div className='frame-stats-container'>
            <div className='pokemon-frame-stats-container'>
              <div className='pokemon-frame'>
                <div className="frame-background" style={StyleFrameGradient}></div>
                <img src={pokemonImage} className='pokemon-image' alt="pokemon"></img>
              </div>
              <div className='pokemon-stats'>
                <span>Stats:</span>
                {StyleStatBar.map(style => (
                  <div key={StyleStatBar.indexOf(style)} className='stat-bar'>
                    <div className='stat-bar-value' style={style[0]}></div>
                    <span>{style[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <small className='pokemon-type'> Type(s):
            {pokemonTypes.map(type => (
              <span key={pokemonTypes.indexOf(type)} className='pokemon-type-name'>{type.type.name}</span>
            ))}
          </small>
        </div>
      </div>
      <button className='btn-right' onClick={handleRightButton}>
        <FiChevronRight className='arrow-right' />
      </button>
    </main>
  );
}

export default App;
