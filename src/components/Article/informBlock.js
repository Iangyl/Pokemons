import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './style.scss';

class InformBlock extends React.Component{
    state = {
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: '',
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
    };

    async componentDidMount(){

        //url`s for pokemons info
        const pokemonUrl = this.props.pokeCreatureUrl;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${this.props.pokeCreatureIndex}/`;

        //get poke info

        const pokemonRes = await axios.get(pokemonUrl);
        console.log(pokemonRes);
        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        })
        
        //converte dm to metres
        const height = parseFloat((pokemonRes.data.height * 0.1).toFixed(2));
        //convert to kg
        const weight = parseFloat((pokemonRes.data.weight * 0.1).toFixed(2));

        const types = pokemonRes.data.types.map(type => type.type.name);

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0) return true;
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}`
        }).join(', ');

        //get pokemon description, catch rate, egg groups, gender ration, hatch steps

        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name.toLowerCase()
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            }).join(", ");

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);
            
            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps,
            });
            this.setState({
                types,
                stats: {
                    hp,
                    attack,
                    defense,
                    speed,
                    specialAttack,
                    specialDefense,
                },
                height,
                weight,
                abilities,
                evs,
            })
        })

        
    }

    render(){
        return(
            <div className='article'>
                <div className='title-blc'>
                    <h1>{ this.props.pokeCreatureName }</h1>
                </div>
                <div className='img-blc'>
                    <img className='img-main' src={ this.props.pokeCreatureImg } alt='pika4u.png' id='foot-logo' />
                </div>
                <div className='block-type'>
                    { this.state.types.map(type => {
                            let color;
                            if (type === 'bug') color = '#3b994e';
                            else if (type === 'grass') color = '#26CC4D';
                            else if (type === 'dark') color = '#5A5979';
                            else if (type === 'dragon') color = '#60CBD7';
                            else if (type === 'electric') color = '#FBFB6F';
                            else if (type === 'fairy') color = '#EA1369';
                            else if (type === 'fighting') color = '#F06138';
                            else if (type === 'fire') color = '#FD4C5A';
                            else if (type === 'flying') color = '#93B2C7';
                            else if (type === 'ghost') color = '#906790';
                            else if (type === 'ground') color = '#6E491F';
                            else if (type === 'ice') color = '#D8F0FA';
                            else if (type === 'normal') color = '#CB97A7';
                            else if (type === 'poison') color = '#9B69D9';
                            else if (type === 'physhic') color = '#F81C91';
                            else if (type === 'rock') color = '#8B3E21';
                            else if (type === 'steel') color = '#42BE92';
                            else if (type === 'water') color = '#86A8FC';
    
                            return <span key={type} className='item-type' style={{backgroundColor: color}}>
                                {type.split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join() }
                            </span> 
                        }
                    ) }
                </div>
                <div className='stats-blc'>
                    {/*HP*/}
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-3 stats-text'>HP</div>
                        <div className='col-12 col-md-7'>
                            <div className='progress'>
                                <div className='progress-bar'
                                    role='progressBar'
                                    style={{ width: `${this.state.stats.hp}%` }}
                                    aria-valuenow='25'
                                    aria-valuemin='0'
                                    aria-valuemax='100'>
                                    <small>{`${this.state.stats.hp}%`}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Attack*/}
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-3 stats-text'>Attack</div>
                        <div className='col-12 col-md-7'>
                            <div className='progress'>
                                <div className='progress-bar'
                                    role='progressBar'
                                    style={{ width: `${this.state.stats.attack}%` }}
                                    aria-valuenow='25'
                                    aria-valuemin='0'
                                    aria-valuemax='100'>
                                    <small>{`${this.state.stats.attack}%`}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Defense*/}
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-3 stats-text'>Defense</div>
                        <div className='col-12 col-md-7'>
                            <div className='progress'>
                                <div className='progress-bar'
                                    role='progressBar'
                                    style={{ width: `${this.state.stats.defense}%` }}
                                    aria-valuenow='25'
                                    aria-valuemin='0'
                                    aria-valuemax='100'>
                                    <small>{`${this.state.stats.defense}%`}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Speed*/}
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-3 stats-text'>Speed</div>
                        <div className='col-12 col-md-7'>
                            <div className='progress'>
                                <div className='progress-bar'
                                    role='progressBar'
                                    style={{ width: `${this.state.stats.speed}%` }}
                                    aria-valuenow='25'
                                    aria-valuemin='0'
                                    aria-valuemax='100'>
                                    <small>{`${this.state.stats.speed}%`}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Special Attack*/}
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-3 stats-text'>Special Attack</div>
                        <div className='col-12 col-md-7'>
                            <div className='progress'>
                                <div className='progress-bar'
                                    role='progressBar'
                                    style={{ width: `${this.state.stats.specialAttack}%` }}
                                    aria-valuenow='25'
                                    aria-valuemin='0'
                                    aria-valuemax='100'>
                                    <small>{`${this.state.stats.specialAttack}%`}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Special Defense*/}
                    <div className='row align-items-center'>
                        <div className='col-12 col-md-3 stats-text'>Special Defense</div>
                        <div className='col-12 col-md-7'>
                            <div className='progress'>
                                <div className='progress-bar'
                                    role='progressBar'
                                    style={{ width: `${this.state.stats.specialDefense}%` }}
                                    aria-valuenow='25'
                                    aria-valuemin='0'
                                    aria-valuemax='100'>
                                    <small>{`${this.state.stats.specialDefense}%`}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col'>
                        <p className='desc-blc'>{this.state.description}</p>
                    </div>
                </div>
                <hr />
                <div className='profile'>
                    <h5 className='profile-title text-center'>Profile</h5>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Height:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.height} m.</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Weight:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.weight} kg.</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Catch Rate:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.catchRate} %</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Gender Ratio:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role='progressBar'
                                            style={{
                                                width: `${this.state.genderRatioFemale}%`,
                                                backgroundColor: 'red'
                                            }}
                                            aria-valuenow='15'
                                            aria-valuemin='0'
                                            aria-valuemax='100'>
                                            <small>{this.state.genderRatioFemale}</small>
                                        </div>
                                        <div className='progress-bar'
                                            role='progressBar'
                                            style={{
                                                width: `${this.state.genderRatioMale}%`,
                                                backgroundColor: 'blue'
                                            }}
                                            aria-valuenow='30'
                                            aria-valuemin='0'
                                            aria-valuemax='100'>
                                            <small>{this.state.genderRatioMale}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Egg Groups:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.eggGroups}</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Hatch Steps:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.hatchSteps}</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>Abilities:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.abilities}</h6>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <h6 className='float-right'>EVs:</h6>
                                </div>
                                <div className='col-md-5'>
                                    <h6 className='float-left'>{this.state.evs}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pokeCreatureName: state.pokemons.pokemonBlock.pokeName,
        pokeCreatureImg: state.pokemons.pokemonBlock.pokeImg,
        pokeCreatureIndex: state.pokemons.pokemonBlock.pokeIndex,
        pokeCreatureUrl: state.pokemons.pokemonBlock.pokeUrl,
    }),
    null,
)(InformBlock);