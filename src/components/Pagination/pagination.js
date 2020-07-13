import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

class Pagination extends React.Component{
    reCount(){
        console.log(this.props.currentPage);
        const indexOfLastPost = this.props.currentPage * this.props.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.props.postsPerPage;
        const currentPosts = this.props.pokemons ? this.props.pokemons.slice(indexOfFirstPost, indexOfLastPost) : this.props.pokemons;
        console.log(currentPosts);
        this.props.onCurrentPosts(currentPosts);
    }
    nextPage = () => {
        const currPage = this.props.currentPage;
        const nextPage = currPage + 1;
        this.props.onChangePage(nextPage);
        this.props.onFirstCheckPage(false);
        this.reCount();
    }
    prevPage = () => {
        const prevPage = this.props.currentPage - 1;
        this.props.onChangePage(prevPage);
        if((prevPage - 1) === 0) this.props.onFirstCheckPage(true);
        if((prevPage + 1) === 108) this.props.onLastCheckPage(true);
        this.reCount();
    }
    startPage = () => {
        this.props.onChangePage(1);
        this.props.onFirstCheckPage(true);
        this.props.onLastCheckPage(false);
        this.reCount();
    }
    lastPage = () => {
        this.props.onChangePage(108);
        this.props.onLastCheckPage(true);
        this.props.onFirstCheckPage(false);
        this.reCount();
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