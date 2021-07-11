import React from 'react';
import { useDrag } from "react-dnd";
import { round } from '../utils.js'


function getLogo(code) {
    return "https://github.com/PichotM/RPG-Inventory-UI/blob/master/ui/assets/img/items/default.png?raw=true"
}

function Item(data){
    let invItemData = data.item
    const [{ isDragging }, dragRef] = useDrag({
        type: "invItem",
        item: invItemData,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className="invItem disable-select" ref={dragRef} style={{opacity: isDragging ? 0.4 : 0.8}}>
            <img className="itemImg disable-dnd" src={getLogo(invItemData.data.name)} alt={invItemData.id}/>
            <span className="itemQtty">{invItemData.data.quantity || 1}</span>
            <span className="itemWeight">{round((invItemData.data.metadata.weight || 0)*(invItemData.data.quantity || 1),3)} kg</span>
            <span className="itemName">{invItemData.data.name}</span>
        </div>
    );
}


export class InvItem extends React.Component {
    constructor (itemData) {
        super(itemData);
        this.item = itemData.value;
    }

    render() {
        return (
            <Item item={this.item}/>
        );
    }
}