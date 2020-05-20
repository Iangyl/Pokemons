import React from 'react';
import './style.scss';

class PokeItems extends React.Component{
    componentDidMount(){
        const {id, name, url} = this.props;
        const pokemonIndex = (url) ? url.split('/')[url.split('/').length - 2] : '1';
        const pokemonImg = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    }

    render(){
        
        return(
            <li key={this.props.id}>
                <div className='img-box'><img src={this.props.pokemonImg} alt='pika4u.png' id='foot-logo' /></div>
                <div className='name-box'>{this.props.name}</div>
            </li>
        )
    }
}

export default PokeItems;