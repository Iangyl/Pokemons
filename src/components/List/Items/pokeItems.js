import React from 'react';
import './style.scss';

class PokeItems extends React.Component{
    componentDidMount(){
        const {key, name, url} = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        //const pokemonImg = `https://github.com/PokeAPI/sprits/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    }

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