import React from 'react';
import './style.scss';

import PokeItems from './Items/pokeItems';
import { connect } from 'react-redux';

class PokeList extends React.Component{
    render(){
        console.log(this.props.pokemonName);
        return(
            <div className='listBox'>
                <ul id='list'>
                   {
                        (typeof this.props.pokemonName == undefined) ? ( 
                            this.props.pokemonName.map(item => {
                                return (
                                    <PokeItems 
                                        key={item.name}
                                        name={item.name}
                                    />
                                );
                            })
                        ) : (
                            <PokeItems 
                                key={'1'}
                                name={'Loading...'}
                            />
                        )
                   }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({
        pokemonName: state.pokemons.pokemon,
    }),
    null,
)(PokeList);