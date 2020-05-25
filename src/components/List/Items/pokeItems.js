import React from 'react';
import './style.scss';

class PokeItems extends React.Component{   
    state = {
        imgLoad: true,
        requestErr: false,
        pokemonImg: '',
        pokemonIndex: '',
    }
    
    componentDidMount(){
        const {id, name, url} = this.props;
        const pokemonIndex = (url) ? url.split('/')[url.split('/').length - 2] : '1';
        const pokemonImg = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
        this.setState({ pokemonImg, pokemonIndex });
    }

    render(){
        
        return(
            <li key={this.props.id}>
                <div className='img-box'>
                    <img
                        src={this.state.pokemonImg} alt='pika4u'
                        onLoad={() => this.setState({imgLoad: false})}
                        onError={() => this.setState({requestErr: true})}
                    />
                </div>
                <div className='name-box'>
                    {this.props.name.split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join()}
                </div>
            </li>
        )
    }
}

export default PokeItems;