import React from 'react';
import { drag } from "../../dnd.js";
import { round } from '../../utils.js'

export class InvItem extends React.Component {
    constructor (itemData) {
        super(itemData);
        this.item = itemData.value;

        this.state = {
            dragging: false,
            dragOver: false,
            transformX:0,
            transformY:0
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    getLogo(code) {
        return "https://github.com/PichotM/RPG-Inventory-UI/blob/master/ui/assets/img/items/default.png?raw=true"
    }

    onMouseDown(e) {
        console.log(e.button)
        if (e.button === 0)
        {
            //console.log("MouseDown")
            drag.startDrag(e, this)
        }
    }

    onMouseEnter(e) {
        if (!this.state.dragOver) {
            this.setState({ dragOver: true })
            //console.log("onMouseEnter")
        }
    }

    onMouseLeave(e) {
        if (!this.state.dragging) {
            this.setState({ dragOver: false })
            //console.log("onMouseLeave")
        }
    }

    render() {
        return (
            <div className="invItem disable-select" style={{position: this.state.dragging ? "absolute" : "", left: `${this.state.transformX}px`, top:`${this.state.transformY}px`, opacity: this.state.dragging ? 0.4 : 0.8, backgroundColor: this.state.dragOver ? "rgba(255,0,0,1)" : "rgba(0,255,0,1)" }} onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
                <img className="itemImg disable-dnd" src={this.getLogo(this.item.data.name)} alt={this.item.id}/>
                <span className="itemQtty">{this.item.data.quantity || 1}</span>
                <span className="itemWeight">{round((this.item.data.metadata.weight || 0)*(this.item.data.quantity || 1),3)} kg</span>
                <span className="itemName">{this.item.data.name}</span>
            </div>
        );
    }
}