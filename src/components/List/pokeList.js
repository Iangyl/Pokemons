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
                        (!this.props.currentPokemons || this.props.currentPokemons.length === 0) ? ( 
                            <li key='1'>There are no such pokemons.</li>
                        ) : (
                            
                            this.props.currentPokemons
                            .map(item => {
                                return (
                                    <PokeItems 
                                        key={item.id}
                                        name={item.name}
                                        url={item.url}
                                    />
                                );
                            })
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
    }),
    null,
)(PokeList);