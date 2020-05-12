import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import api from './utils/api';

import SearchInput from './components/Search/searchInput';
import PokeList from './components/List/pokeList';
import InformBlock from './components/Article/informBlock';

class App extends React.Component {

  componentDidMount() {
    //api('pokemon').then((res) => console.log(res.data));
    api('pokemon').then((res) => this.props.onGetData(res.data));
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
                <SearchInput />,
              </div>
              <PokeList />,
            </div>
            <InformBlock />,
          </div>
          <footer className='footer'>
            <div className='foot-1'>
              <span><img src={require('./assets/pictures/inst.png')} alt='instagram.png' className='soc-logo' /></span>
              <span><img src={require('./assets/pictures/facebook.png')} alt='facebook.png' className='soc-logo' /></span>
              <span><img src={require('./assets/pictures/twitter.png')} alt='twitter.png' className='soc-logo' /></span>
            </div>
            <div className='foot-2'>
              <div><img src={require('./assets/pictures/pika-avatar.png')} alt='pika4u.png' id='foot-logo' /></div>
              <div><p>POKEMON.GO</p></div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    onGetData: (data) => {
      dispatch({
        type: 'GET_DATA',
        payload: data,
      });
    },
  }),
)(App);
