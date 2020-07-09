import React from 'react';
import './style.scss';

import PokeItems from './Items/pokeItems';
import Pagination from './../Pagination/pagination';
import { connect } from 'react-redux';

class PokeList extends React.Component{
    render(){
        return(
            <div className='listBox'>
                <ul id='list'>
                    {
                        console.log('Array ',this.props.pokemonName),
                        console.log('Word ',this.props.searchStr),
                        (this.props.pokemonName) ? ( 
                            this.props.pokemonName.filter(creature => creature.name.includes(this.props.searchStr.toLowerCase()))
                            .map(item => {
                                return (
                                    <PokeItems 
                                        key={item.id}
                                        name={item.name}
                                        url={item.url}
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
                <Pagination />
            </div>
        )
    }
}

export default connect(
    state => ({
        pokemonName: state.pokemons.pokemon,
        searchStr: state.pokemons.searchWord,
    }),
    null,
)(PokeList);