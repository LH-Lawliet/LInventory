import React from 'react';
import { round } from '../../utils.js'
import { useDrop } from "react-dnd";

import { InvItem } from './item.js'
import { Categories } from './categories.js'

function ItemsList(data) {
    const [{ isOver }, dropRef] = useDrop({
      accept: "invItem",
      drop: (item, monitor) => data.dropCallback(monitor.getItem(), data.parent, data.minQuantity()),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    return (
        <div className="items" ref={dropRef} style={{ backgroundColor: isOver ? "rgba(50,50,50,0.3)" : "transparent"}}>
            {data.renderItems(data.state.items, data.state.filter, data.parent, data.parentState, data.renderItem, data.minQuantity, data.isFilterAvailable)}
        </div>
    );
}


let availableCategories = {
    "Autres" : {
        "name":"Autres",
    },
    "Vêtements" : {
        "name":"Vêtements",
        "metadataType":["cloth"]
    },
    "Clefs" : {
        "name":"Clefs",
        "metadataType":["key"]
    },
    "Armes" : {
        "name":"Armes",
        "metadataType":["weapon","ammo"]
    },
}



export class Items extends React.Component {
    state = {};
    componentDidMount() {
        this.setState({"items":this.state.items, "filter":{}, "minQuantity":this.state.minQuantity});
    }
    
    constructor (data) {
        super(data);
        this.name = data.name
        this.parentState = data.state
        this.parent = data.parent
        this.dropCallback = data.dropCallback
        this.allowedWeight = 30.0
        this.minQuantity = data.minQuantity
        this.state = {
            "items":data.items, 
            "filter":null,
        };
    }

    isFilterAvailable(expected) {
        console.log(availableCategories)
        for (let k in availableCategories) {
            let filter = availableCategories[k]
            if (filter.metadataType && filter.metadataType.includes(expected)) {
                return true
            }
        }
        return false
    }

    renderItem(item) {
        return <InvItem key={item.code} value={item}/>;
    }

    renderItems(items, filter, parent, parentState, renderItem, minQuantity, isFilterAvailable) {
        let final = []
        if (filter) {
            for (const codeName in items) {
                let item={"code":codeName,"data":items[codeName]}
                if (minQuantity()<=(item.data.quantity || 1)) {
                    if ((filter && !filter.metadataType && (item.data.metadata && !isFilterAvailable(item.data.metadata.type))) || (filter && filter.metadataType && item.data.metadata.type && filter.metadataType.includes(item.data.metadata.type))) {
                        item.parentState = parentState
                        item.parent = parent
                        final.push(renderItem(item))
                    }
                }
            }
        }
        return final
    }
    

    changeItemsFilter(filter) {
        this.setState({"items":this.state.items, "filter":filter});
    }

    calculateTotalWeight(items) {
        let weight = 0
        for (let k in items) {
            let item = items[k]
            if (item.metadata && item.metadata.weight) {
                weight += item.metadata.weight*(item.quantity || 1)
            }
        }
        return weight
    }

    render() {
        return (
            <div className="inventorySide">
                <h3 className="inventoryName disable-select">{this.name} | {round(this.calculateTotalWeight(this.state.items),2)}/{this.allowedWeight} kg</h3>
                <Categories availableCategories={availableCategories} className="disable-select" changeItemsFilter={(filter) => this.changeItemsFilter(filter) }/>
                <ItemsList isFilterAvailable={this.isFilterAvailable} dropCallback={this.dropCallback} renderItems={this.renderItems} renderItem={this.renderItem} state={this.state} parent={this.parent} parentState={this.parentState} minQuantity={this.minQuantity}/>
                <h1>{this.state.minQuantity}</h1>
            </div>
        )
    }
}