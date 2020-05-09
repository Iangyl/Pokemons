import React from 'react';
import './style.scss';

class PokeList extends React.Component{
    render(){
        return(
            <div className='listBox'>
                <ul id='list'></ul>
            </div>
        )
    }
}

export default PokeList;