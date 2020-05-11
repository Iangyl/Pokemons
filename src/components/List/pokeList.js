import React from 'react';
import './style.scss';

import PokeItems from './Items/pokeItems';

class PokeList extends React.Component{
    render(){
        return(
            <div className='listBox'>
                <ul id='list'>
                    <PokeItems />
                </ul>
            </div>
        )
    }
}

export default PokeList;