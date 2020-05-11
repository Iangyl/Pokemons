import React from 'react';
import './style.scss';

class PokeItems extends React.Component{
    render(){
        return(
            <li>
                <div className='img-box'><img src={require('../../../assets/pictures/pokeball.png')} alt='pika4u.png' id='foot-logo' /></div>
                <div className='name-box'>Name</div>
            </li>
        )
    }
}

export default PokeItems;