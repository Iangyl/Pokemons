import React from 'react';
import './style.scss';

class InformBlock extends React.Component{
    render(){
        return(
            <div className='article'>
                <div className='title-blc'>
                    <h1>Title</h1>
                </div>
                <div className='img-blc'>
                    <img src={require('../../assets/pictures/pokeball.png')} alt='pika4u.png' id='foot-logo' />
                </div>
                <div className='stats-blc'>
                
                </div>
            </div>
        )
    }
}

export default InformBlock;