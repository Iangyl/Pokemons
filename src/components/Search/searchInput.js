import React from 'react';
import './style.scss';

class SearchInput extends React.Component{
    render(){
        return(
            <input type='search' placeholder='Search' id='styleSearch' />
        )
    }
}

export default SearchInput;