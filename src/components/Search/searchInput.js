import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './style.scss';

class SearchInput extends React.Component{
    state = {
        search: '',
    }
    handleSearch() {
        this.props.onGetSearchString(this.state.search);
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
    null,
    dispatch => ({
        onGetSearchString: (data) => {
            dispatch({
                type: 'GET_SEARCH_STRING',
                payload: data,
            })
        }
    })
)(SearchInput);