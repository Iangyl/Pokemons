import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './style.scss';

class InformBlock extends React.Component{
    state = {
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: '',
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
    };

    async componentDidMount(){

        //url`s for pokemons info

        const pokemonUrl = this.props.pokeCreatureUrl;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${this.props.pokeCreatureIndex}/`;

        //get poke info

        const pokemonRes = await axios.get(pokemonUrl);
        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        })
        
        //converte dm to feet... The + 0.0001 * 100) / 100 is for rounding to 2 decimal places
        const height = Math.round((pokemonRes.data.height * 0.328084 + 0.0001 * 100) / 100);

        //convert to ibs
        const weight = Math.round((pokemonRes.data.weight * 0.220462 + 0.0001 * 100) / 100);

        const types = pokemonRes.data.types.map(type => type.type.name);

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0) return true;
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }).join(', ');

        //get pokemon desicision

        
    }

    render(){
        return(
            <div className='article'>
                <div className='title-blc'>
                    <h1>{ this.props.pokeCreatureName }</h1>
                </div>
                <div className='img-blc'>
                    <img className='img-main' src={ this.props.pokeCreatureImg } alt='pika4u.png' id='foot-logo' />
                </div>
                <div className='stats-blc'>
                
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pokeCreatureName: state.pokemons.pokemonBlock.pokeName,
        pokeCreatureImg: state.pokemons.pokemonBlock.pokeImg,
        pokeCreatureIndex: state.pokemons.pokemonBlock.pokeIndex,
        pokeCreatureUrl: state.pokemons.pokemonBlock.pokeUrl,
    }),
    null,
)(InformBlock);