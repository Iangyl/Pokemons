import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import spinner from '../../../assets/spinner.gif';

class PokeItems extends React.Component{   
    state = {
        imgLoad: true,
        tooManyRequest: false,
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
        this.props.onPokeBlockInfDirect({
            pokeImg: this.state.pokemonImg,
            pokeUrl: this.props.url,
            pokeIndex: this.state.pokemonIndex,
            pokeName: this.props.name.split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(),
        });
    }

    render(){
        return(
            <li key={this.props.id} onClick={this.getPokeBlock}>
                <div className='img-box'>
                    {
                        this.state.imgLoad ? (
                            <img src={spinner} style={{width: '72px'}}></img>
                        ) : null
                    }
                    <img
                        src={this.state.pokemonImg} alt='pika4u'
                        onLoad={() => this.setState({imgLoad: false})}
                        onError={() => this.setState({tooManyRequest: true})}
                        style={
                            this.state.tooManyRequest ? {display: 'none'} : 
                            this.state.imgLoad ? null : {display: 'block'}
                        }
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
    null,
    dispatch => ({
        onPokeBlockInfDirect: (data) => {
            dispatch({
                type: 'POKEMON_DEV_INF',
                payload: data,
            });
        },
    })
)(PokeItems);