import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './style.scss';

class SearchInput extends React.Component{
    state = {
        search: '',
    }
    handleSearch() {
        //фільтрувати значення буду тут, а відфільтровані значення передам в store
        //контролювати пошук буду шляхом булівського значення, яке також буде знаходитись в store
        if (this.state.search !== '' && this.state.search) this.props.onSearchControl(true);
        else this.props.onSearchControl(false);

        if (this.props.filterControl) {
            const searchArr = this.props.filteredArr.filter(creature => creature.name.includes(this.state.search.toLowerCase()));
            this.props.onGetSearchArray(searchArr);
        }
        else {
            const searchArr = this.props.pokemons.filter(creature => creature.name.includes(this.state.search.toLowerCase()));
            this.props.onGetSearchArray(searchArr);
        }
    }

    onDebounceSearch = _.debounce(this.handleSearch, 1000)
    getSearchString = e => {
        this.onDebounceSearch();
        this.setState({ search: e.target.value });
    }

    render(){
        return(
            <input type='search' placeholder='Search' id='styleSearch' onChange={this.getSearchString} />
        )
    }
}

export default connect(
    state => ({
        pokemons: state.pokemons.pokemon,
        filterControl: state.filter.filterOn,
        filteredArr: state.filter.filteredPokeArr,
    }),
    dispatch => ({
        onGetSearchArray: (data) => {
            dispatch({
                type: 'GET_SEARCH_ARRAY',
                payload: data,
            })
        },
        onSearchControl: (data) => {
            dispatch({
                type: 'SEARCH_CONTROL',
                payload: data,
            })
        }
    })
)(SearchInput);