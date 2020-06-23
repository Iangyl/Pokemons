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