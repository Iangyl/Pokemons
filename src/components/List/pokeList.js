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
                        (this.props.currentPokemons) ? ( 
                            this.props.currentPokemons.filter(creature => creature.name.includes(this.props.searchStr.toLowerCase()))
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
        currentPokemons: state.pagination.currentPosts,
        searchStr: state.pokemons.searchWord,
    }),
    null,
)(PokeList);