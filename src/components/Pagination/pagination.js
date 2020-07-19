import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

class Pagination extends React.Component{
    nextPage = () => {
        const currPage = this.props.currentPage;
        const nextPage = currPage + 1;
        this.props.onChangePage(nextPage);
        this.props.onFirstCheckPage(false);
        if ((nextPage + 1) === 109) this.props.onLastCheckPage(true);
    }
    prevPage = () => {
        const prevPage = this.props.currentPage - 1;
        this.props.onChangePage(prevPage);
        if((prevPage - 1) === 0) this.props.onFirstCheckPage(true);
        if((prevPage + 1) === 108) this.props.onLastCheckPage(false);
    }
    startPage = () => {
        this.props.onChangePage(1);
        this.props.onFirstCheckPage(true);
        this.props.onLastCheckPage(false);
    }
    lastPage = () => {
        if (this.props.filterControl){
            if (this.props.searchControl) this.props.onChangePage(Math.ceil(this.props.searchedArray.length / this.props.postsPerPage))
            else this.props.onChangePage(Math.ceil(this.props.filteredArr.length / this.props.postsPerPage));
        }
        else{
            if (this.props.searchControl) this.props.onChangePage(Math.ceil(this.props.searchedArray.length / this.props.postsPerPage))
            else this.props.onChangePage(Math.ceil(this.props.pokemons.length / this.props.postsPerPage));
        }
        this.props.onLastCheckPage(true);
        this.props.onFirstCheckPage(false);
    }
    render(){
        return(
            <div className='pagination-container'>
                <button className='pagination-btn' onClick={this.startPage}>Start</button>
                <button className='pagination-btn' 
                    disabled={this.props.checkOnFirstPage}
                    onClick={this.prevPage}
                > { '<' }  
                </button>
                <button className='pagination-btn'
                    disabled={this.props.checkOnLastPage}
                    onClick={this.nextPage}
                > { '>' }
                </button>
                <button className='pagination-btn' onClick={this.lastPage}>End</button>
            </div>
        )
    }
}
export default connect(
    state => ({
        currentPage: state.pagination.currentPage,
        postsPerPage: state.pagination.pokemonsPerPage,
        pokemons: state.pokemons.pokemon,
        checkOnFirstPage: state.pagination.firstPage,
        checkOnLastPage: state.pagination.lastPage,
        searchControl: state.search.searchOn,
        searchedArray: state.search.searchedArr,
        filteredArr: state.filter.filteredPokeArr,
        filterControl: state.filter.filterOn,
    }),
    dispatch => ({
        onChangePage: (data) => {
            dispatch({
                type: 'CHANGE_PAGE',
                payload: data,
            })
        },
        onFirstCheckPage: (data) => {
            dispatch({
                type: 'CHECK_FIRST_PAGE',
                payload: data,
            })
        },
        onLastCheckPage: (data) => {
            dispatch({
                type: 'CHECK_LAST_PAGE',
                payload: data,
            })
        },
        onCurrentPosts: (data) => {
            dispatch({
                type: 'GET_CURRENT_POKEMONS',
                payload: data,
            })
        }
    })
)(Pagination);