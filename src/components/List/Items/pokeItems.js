import React from 'react';
import './style.scss';

class PokeItems extends React.Component{
    render(){
        const {key, name} = this.props;
        return(
            <li key={key}>
                <div className='img-box'><img src={require('../../../assets/pictures/pokeball.png')} alt='pika4u.png' id='foot-logo' /></div>
                <div className='name-box'>{name}</div>
            </li>
        )
    }
}

export default PokeItems;