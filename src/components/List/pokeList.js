import React from 'react';
import './style.scss';

import PokeItems from './Items/pokeItems';
import { connect } from 'react-redux';

class PokeList extends React.Component{
    render(){
        //console.log(this.props.pokemon);
        return(
            <div className='listBox'>
                <ul id='list'>
                   {

                   }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({
        pokemon: state.pokemons.items
    }),
    null,
)(PokeList);