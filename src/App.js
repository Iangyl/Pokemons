import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import axios from 'axios';

import SearchInput from './components/Search/searchInput';
import PokeList from './components/List/pokeList';
import InformBlock from './components/Article/informBlock';
import Filter from './components/Filter/filter';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      searchState: false,
    }
  }
  async getData(){
    const res = await axios.get(this.props.url);
    this.props.onGetData(res.data['results']);

    const newPokeArr = await Promise.all(
      this.props.pokemons.map(async (creature) => {
        const resource = await axios.get(creature.url);
        const types = resource.data.types.map((type) => type.type.name);
        return {
          ...creature,
          types,
        };
      })
    );
    this.props.onGetData(newPokeArr); 

    const indexOfLastPost = this.props.currentPage * this.props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.props.postsPerPage;
    const currentPosts = this.props.pokemons ? this.props.pokemons.slice(indexOfFirstPost, indexOfLastPost) : this.props.pokemons;
    
    this.props.onGetCurrentPokemons(currentPosts);
  }

  reCount(pokemons){
    if (this.props.searchControl) {
      //якщо в інпут шось написали запускаємо перерахування(щоб вивести з пагінацією потрібні результати)

      if (this.state.searchState === false) this.setState({ searchState: true });

      const indexOfLastPost = this.props.currentPage * this.props.postsPerPage;
      const indexOfFirstPost = indexOfLastPost - this.props.postsPerPage;
      const currentPosts = this.props.searchedArray ? this.props.searchedArray.slice(indexOfFirstPost, indexOfLastPost) : this.props.searchedArray;

      this.props.onGetCurrentPokemons(currentPosts);
    }
    else {
      //якщо нічого не записали або пуста стрічка - вертаємо все назад

      if (this.state.searchState === true) {
        this.props.onReturnCurrentPage(1);
        this.props.onReturnDefaultPaginationSettings();

        this.setState({ searchState: false });
      }
      const indexOfLastPost = this.props.currentPage * this.props.postsPerPage;
      const indexOfFirstPost = indexOfLastPost - this.props.postsPerPage;
      const currentPosts = pokemons ? pokemons.slice(indexOfFirstPost, indexOfLastPost) : pokemons;

      this.props.onGetCurrentPokemons(currentPosts);
    }
  }

  componentDidUpdate(){
    if (this.props.filterControl){
      const newFilteredArr = this.props.pokemons.filter(creature => {
        const selectedArr = this.props.selectedTypes;
        for (let i = 0; i < creature.types.length; i++){
          for (let j = 0; j < selectedArr.length; j++){
            if (creature.types[i] === selectedArr[j]) {
              return creature;
            }
          }
        }
      });
      this.props.onNewFilteredArr(newFilteredArr);
      this.reCount(newFilteredArr);
    }
    else{
      this.reCount(this.props.pokemons);
    }
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
                <Filter />
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
    searchControl: state.search.searchOn,
    searchedArray: state.search.searchedArr,
    filterControl: state.filter.filterOn,
    selectedTypes: state.filter.selected,
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
    },
    onReturnCurrentPage: (data) => {
      dispatch({
        type: 'RETURN_CURR_PAGE',
        payload: data,
      })
    },
    onReturnDefaultPaginationSettings: () => {
      dispatch({
        type: 'RETURN_DEFAULT_SETTINGS',
      })
    },
    onNewFilteredArr: (data) => {
      dispatch({
        type: 'GET_FILTERED_ARRAY',
        payload: data,
      })
    }
  }),
)(App);
