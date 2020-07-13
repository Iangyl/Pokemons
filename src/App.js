import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchInput from './components/Search/searchInput';
import PokeList from './components/List/pokeList';
import InformBlock from './components/Article/informBlock';

class App extends React.Component {

  async getData(){
    const res = await axios.get(this.props.url);
    this.props.onGetData(res.data['results']);
    const indexOfLastPost = this.props.currentPage * this.props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.props.postsPerPage;
    const currentPosts = this.props.pokemons ? this.props.pokemons.slice(indexOfFirstPost, indexOfLastPost) : this.props.pokemons;
    this.props.onGetCurrentPokemons(currentPosts);
  }

  componentDidMount() {
    this.getData();
  }

  render(){
    return(
      <div className='wrapper'>
        <div className='content'>
          <div className='header'>
            <div>POKEMON.GO</div>
          </div>
          <div className='section'>
            <div className='nav'>
              <div className='searchContainer'>
                <SearchInput />
              </div>
              <PokeList />
            </div>
            <InformBlock />
          </div>
          <footer className='footer'>
            <div className='foot-1'>
              <span><img src={require('./assets/pictures/inst.png')} alt='instagram.png' className='soc-logo' /></span>
              <span><img src={require('./assets/pictures/facebook.png')} alt='facebook.png' className='soc-logo' /></span>
              <span><img src={require('./assets/pictures/twitter.png')} alt='twitter.png' className='soc-logo' /></span>
            </div>
            <div className='foot-2'>
              <div><img src={require('./assets/pictures/pika-avatar.png')} alt='pika4u.png' id='foot-logo' /></div>
              <div id='footer-text'><p>POKEMON.GO</p></div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    url: state.pokemons.url,
    general: state.pokemons,
    currentPage: state.pagination.currentPage,
    postsPerPage: state.pagination.pokemonsPerPage,
    pokemons: state.pokemons.pokemon,
  }),
  dispatch => ({
    onGetData: (data) => {
      dispatch({
        type: 'GET_DATA',
        payload: data,
      });
    },
    onGetCurrentPokemons: (data) => {
      dispatch({
        type: 'GET_CURRENT_POKEMONS',
        payload: data,
      })
    }
  }),
)(App);
