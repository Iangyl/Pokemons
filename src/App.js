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
      filterState: false,
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
    console.log('filter control', pokemons);
    const indexOfLastPost = this.props.currentPage * this.props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.props.postsPerPage;
    const currentPosts = pokemons ? pokemons.slice(indexOfFirstPost, indexOfLastPost) : pokemons;
    console.log('currPosts ', currentPosts);

    this.props.onGetCurrentPokemons(currentPosts);
  }

  filtering(data){
    console.log('filtering');
    if (this.state.filterState === false){
      const newFilteredArr = (data) ? (
        data.filter(creature => {
          const selectedArr = this.props.selectedTypes;
          for (let i = 0; i < creature.types.length; i++) {
            for (let j = 0; j < selectedArr.length; j++) {
              if (creature.types[i] === selectedArr[j]) {
                return creature;
              }
            }
          }
        })
      ) : data;
      this.props.onNewFilteredArr(newFilteredArr);
      this.setState({filterState: true});
    }
  }

  checkingOnFilterOrSearch(){
    if (this.props.searchControl) {
      if (this.state.searchState === false) this.setState({ searchState: true });

      if (this.props.filterControl) {
        if (this.state.filterState === true) this.setState({ filterState: false });
        console.log(this.props.searchedArray);
        this.filtering(this.props.searchedArray);//filtering doesn`t work because filterState = true, if would be false - infinity loop
        this.reCount(this.props.filteredArr);
      }
      else {
        this.reCount(this.props.searchedArray);
      }

    }
    else{
      this.filtering(this.props.pokemons);
      this.reCount(this.props.filteredArr);
    }
  }

  componentDidUpdate(){
    if (this.props.filterControl || this.props.searchControl){
      this.checkingOnFilterOrSearch();
      /* const newFilteredArr = this.props.pokemons.filter(creature => {
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
      this.reCount(newFilteredArr); */
    }
    else{
      if (this.state.searchState === true) {
        this.props.onReturnCurrentPage(1);
        this.props.onReturnDefaultPaginationSettings();

        this.setState({ searchState: false });
      }
      if (this.state.filterState === true) this.setState({ filterState: false });
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
    filteredArr: state.filter.filteredPokeArr,
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
