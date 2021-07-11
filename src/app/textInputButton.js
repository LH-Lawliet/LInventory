import React from 'react';
import { useDrop } from "react-dnd";


function DropInputText({ data,parentState, minQuantity }) {
    function changeValue(value){
        parentState({"quantity":value||1})
    }

    const [{ isOver }, dropRef] = useDrop({
      accept: "invItem",
      drop: (item, monitor) => changeValue(monitor.getItem().data.quantity),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
        <input 
            ref={dropRef} 
            type="text" 
            className="inputAsButton enable-select" 
            placeholder={data.defaultQuantity} 
            onChange={(e) => {changeValue(parseInt(e.target.value))}}
            onClick={(e) => {e.target.select()}}
            style={{ backgroundColor: isOver ? "rgba(50,50,50,0.8)" : ""}}
            value={minQuantity()}
        />
    );

}


export class TextInputButton extends React.Component {
    constructor (buttonData) {
        super(buttonData);
        this.data = buttonData.value.data;
        this.parentState = buttonData.parentState
        this.minQuantity = buttonData.minQuantity
        console.log(this.minQuantity)
    }

    render() {
        return (<DropInputText data={this.data} parentState={this.parentState} minQuantity={this.minQuantity}/>)
    }
}