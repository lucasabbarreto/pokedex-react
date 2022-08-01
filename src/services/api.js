import axios from 'axios';

export const getPokemonData = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/"
});

export const getPokemonAbility = axios.create({
    baseURL: ""
  });