import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: '1',
            startPage: '1',
            endPage: '',
            allPages: '',
        }
    }
    nextPage(){
        let currentPage = this.state.currentPage;
        const nextPage = '' + ++currentPage;
    }
    render(){
        return(
            <div className='pagination-container'>
                <button className='pagination-btn'>Start</button>
                <button className='pagination-btn'>{'<'}</button>
                <button className='pagination-btn' onClick={this.nextPage}>{'>'}</button>
                <button className='pagination-btn'>End</button>
            </div>
        )
    }
}
export default connect(

)(Pagination);