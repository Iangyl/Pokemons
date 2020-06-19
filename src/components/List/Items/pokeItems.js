import React from 'react';
import './style.scss';
import { connect } from 'react-redux';

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

    getPokeBlock = () => {
        const pokeImg = (typeof this.state.pokemonImg == undefined) ? '1' : this.state.pokemonImg;
        const pokeUrl = this.props.url;
        const pokeIndex = this.state.pokemonIndex;
        const pokeName = this.props.name.split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join();
        this.props.onPokeBlockInfDirect({
            pokeImg: pokeImg,
            pokeUrl: pokeUrl,
            pokeIndex: pokeIndex,
            pokeName: pokeName,
        });
    }

    render(){
        return(
            <li key={this.props.id} onClick={this.getPokeBlock}>
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

export default connect(
    state => ({
        
    }),
    dispatch => ({
        onPokeBlockInfDirect: (data) => {
            dispatch({
                type: 'POKEMON_DEV_INF',
                payload: data,
            });
        },
    })
)(PokeItems);