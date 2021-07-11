import React from 'react';

export class TextInputButton extends React.Component {
    constructor (buttonData) {
        super(buttonData);
        this.data = buttonData.value.data;
        this.parentState = buttonData.parentState
    }

    render() {
        return (<input type="text" className="inputAsButton" placeholder={this.data.defaultQuantity} onChange={(e) => {this.parentState({"quantity":parseInt(e.target.value)||1})}}/>);
    }
}