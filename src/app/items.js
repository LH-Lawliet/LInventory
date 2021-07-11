import React from 'react';
import { useDrop } from "react-dnd";

import { InvItem } from './item.js'
import { Categories } from './categories.js'

function ItemsList(data) {
    const [{ isOver }, dropRef] = useDrop({
      accept: "invItem",
      drop: (item, monitor) => data.dropCallback(monitor.getItem(), data.parent),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    return (
        <div className="items" ref={dropRef} style={{ backgroundColor: isOver ? "rgba(50,50,50,0.3)" : "transparent"}}>
            {data.renderItems(data.state.items, data.state.filter, data.parent, data.parentState, data.renderItem)}
        </div>
    );
}



export class Items extends React.Component {
    state = {};
    componentDidMount() {
        this.setState({"items":this.state.items, "filter":{}});
    }
    
    constructor (data) {
        super();
        this.name = data.name
        this.parentState = data.state
        this.parent = data.parent
        this.dropCallback = data.dropCallback
        this.state = {
            "items":data.items, 
            "filter":null
        };
    }

    renderItem(item) {
        return <InvItem key={item.code} value={item}/>;
    }

    renderItems(items, filter, parent, parentState, renderItem) {
        let final = []
        if (filter) {
            for (const codeName in items) {
                let item={"code":codeName,"data":items[codeName]}
                if ((filter && !filter.metadataType && !(item.data.metadata && item.data.metadata.type)) || (filter && filter.metadataType && filter.metadataType.includes(item.data.metadata.type))) {
                    item.parentState = parentState
                    item.parent = parent
                    final.push(renderItem(item))
                }
            }
        }
        return final
    }
    

    changeItemsFilter(filter) {
        this.setState({"items":this.state.items, "filter":filter});
    }

    render() {
        this.renderItems.bind();
        return (
            <div className="inventorySide">
                <h3 className="disable-select">{this.name}</h3>
                <Categories className="disable-select" changeItemsFilter={(filter) => this.changeItemsFilter(filter) }/>
                <ItemsList dropCallback={this.dropCallback} renderItems={this.renderItems} renderItem={this.renderItem} state={this.state} parent={this.parent} parentState={this.parentState}/>
            </div>
        )
    }
}