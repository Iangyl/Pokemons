import React from 'react';
import { SelectMenu, Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import './style.scss';

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: ['grass', 'bug', 'dark', 'dragon', 'electric', 'fairy',
                        'fighting', 'fire', 'flying', 'ghost', 'ground', 'ice',
                            'normal', 'poison', 'physhic', 'rock', 'steel', 'water']
                .map(label => ({ label, value: label })),
            selected: [],
        }
    }
    render(){
        return(
            <SelectMenu
                isMultiSelect
                title="Filter"
                options={this.props.options}
                selected={this.props.selected}
                onSelect={item => {
                    const selected = [...this.props.selected, item.value]
                    const selectedItems = selected
                    const selectedItemsLength = selectedItems.length
                    let selectedNames = ''
                    if (selectedItemsLength === 0) {
                        selectedNames = ''
                    } else if (selectedItemsLength === 1) {
                        selectedNames = selectedItems.toString()
                    } else if (selectedItemsLength > 1) {
                        selectedNames = selectedItemsLength.toString() + ' selected...'
                    }
                    this.props.onSelectedCheck(true);
                    this.props.onSelectedGet(selected);
                    this.setState({
                        selectedNames
                    })
                }}
                onDeselect={item => {
                    const deselectedItemIndex = this.props.selected.indexOf(item.value)
                    const selectedItems = this.props.selected.filter(
                        (_item, i) => i !== deselectedItemIndex
                    )
                    const selectedItemsLength = selectedItems.length
                    let selectedNames = ''
                    if (selectedItemsLength === 0) {
                        selectedNames = ''
                    } else if (selectedItemsLength === 1) {
                        selectedNames = selectedItems.toString()
                    } else if (selectedItemsLength > 1) {
                        selectedNames = selectedItemsLength.toString() + ' selected...'
                    }
                    this.props.onSelectedGet(selectedItems);
                    if (selectedItems.length === 0) this.props.onSelectedCheck(false); 
                    this.setState({ selectedNames })
                }}
            >
                <Button className='filter-btn'>{this.state.selectedNames || 'Filter'}</Button>
            </SelectMenu>
        )
    }
}

export default connect(
    state => ({
        options: state.filter.types,
        selected: state.filter.selected,
        checkFilter: state.filter.filterOn,
    }),
    dispatch => ({
        onSelectedGet: (data) => {
            dispatch({
                type: 'GET_SELECTED_TYPES',
                payload: data,
            })
        },
        onSelectedCheck: (data) => {
            dispatch({
                type: 'FILTER_CONTROL',
                payload: data,
            })
        }
    }),
)(Filter);
