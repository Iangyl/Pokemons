import React from 'react';
import './style.scss';

//const { key, name } = this.props;

class PokeItems extends React.Component{
    render(){
        return(
            <li key={this.props.key}>
                <div className='img-box'><img src={require('../../../assets/pictures/pokeball.png')} alt='pika4u.png' id='foot-logo' /></div>
                <div className='name-box'>{this.props.name}</div>
            </li>
        )
    }
}

export default PokeItems;