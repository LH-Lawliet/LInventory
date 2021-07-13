import React from 'react';
import { useDrop } from "react-dnd";

function DropButton({ buttonData }) {
    const [{ isOver }, dropRef] = useDrop({
      accept: "invItem",
      drop: (item, monitor) => buttonData.callback(monitor.getItem()),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    return (
        <button ref={dropRef} className="button enable-select" style={{ backgroundColor: isOver ? "rgba(50,50,50,0.7)" : "rgba(50,50,50,0.4)" }}>
            {buttonData.text}
        </button>
    );
}


export class Button extends React.Component {
    constructor (buttonData) {
        super(buttonData);
        this.data = buttonData.value;
    }

    render() {
        return (<DropButton buttonData={this.data}></DropButton>);
    }
}