import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

class InformBlock extends React.Component{
    render(){
        console.log(this.props.pokeCreatureName);
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
    }),
    null,
)(InformBlock);