import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { arraysMatch } from '../utils.js'


import { Items } from './items.js'
import { ButtonsPanel } from './buttonsPanel.js'


function dropItem(item) {
    if (item.parent === "itemsA") {
        delete itemsA[item.code]
    } else if (item.parent === "itemsB") {
        delete itemsB[item.code]
    }
    item.parentState({"itemsA":itemsA, "itemsB":itemsB})
}

let defaultButtons = [
    {
        "defaultQuantity":1,
    },
    {
        "text":"Jeter",
        "callback":dropItem
    },
    {
        "text":"Donner",
        "callback":function () {
            console.log("give")
        }
    },
]

function isItemInInv(item, inv) {
    for (let k in inv) {
        let check = inv[k]
        if (check.name === item.name && arraysMatch(check.metadata,item.metadata)) {
            return [inv[k], k]
        }
    }
}

function removeItem(item, inv, quantity) {
    quantity = quantity || 1

    let [nItem, nKey] = isItemInInv(item, inv)
    if (nItem.quantity>quantity) {
        nItem.quantity -= quantity
    } else {
        delete inv[nKey]
    }
}

function addItem(item, inv, quantity) {
    quantity = quantity || 1

    let nItem = isItemInInv(item, inv)
    if (nItem) {
        nItem[0].quantity += quantity
    } else {
        let copy = {...item}
        copy["quantity"]=quantity
        inv.push(copy)
    } 
}


function dropInItemsZone(item, zone, quantity) {
    if (item.parent !== zone) {
        let itemTable
        let dropTable
        if (item.parent === "itemsA") {
            itemTable = itemsA
            dropTable = itemsB
        } else {
            itemTable = itemsB
            dropTable = itemsA
        }
        let itemCopy = {...itemTable[item.code]};
        removeItem(itemCopy, itemTable, quantity)
        addItem(itemCopy, dropTable, quantity)
        item.parentState({"itemsA":itemsA, "itemsB":itemsB})
    }
} 

let itemsA = [
    {
        "name":"Pistolet 9mm",
        "quantity":1,
        "metadata":{"ammoType":"AMMO_SHOTGUN","weight":0.03,"type":"ammo"}
    },
    {   
        "name":"Carte d'identité aze aze",
        "quantity":1,
        "metadata":{"type":"identity","playerId":144}
    },
    {   
        "name":"Perceuse",
        "quantity":1,
        "metadata":{"weight":0.9}
    },
    {
        "name":"Montre de luxe homme",
        "quantity":1,
        "metadata":{
            "weight":0.15,
            "type":"cloth",
            "useEvent":"vlife:loadClothItem",
            "useEventData":{
                "RightArmAccessoriesColor":0,
                "model":"mp_m_freemode_01",
                "RightArmAccessories":11
            }
        }
    },
    {
        "name":"100g d'or",
        "quantity":1,
        "metadata":{"weight":0.1},
    },
    {
        "name":"Pied de biche",
        "quantity":1,
        "metadata":{
            "serial":"2TYV11",
            "custom":[],
            "weight":2.3,
            "type":"weapon"
        },
    },
    {
        "name":"Hachette",
        "quantity":1,
        "metadata":{
            "serial":"MX90OK",
            "custom":[],
            "weight":1.4,
            "type":"weapon"
        }
    },
    {
        "name":"Munition Fusil à pompe",
        "quantity":3,
        "metadata":{
            "ammoType":"AMMO_SHOTGUN",
            "weight":0.03,
            "type":"ammo"
        }
    }
]

let itemsB = [
    {
        "name":"Club de golf",
        "quantity":1,
        "metadata":{
            "serial":"39ZWBL",
            "custom":[],
            "weight":0.3,
            "type":"weapon"
        }
    },

    {
        "name":"Baskets Prolaps vertes",
        "quantity":1,
        "metadata":{
            "weight":0.2,
            "type":"cloth",
            "useEvent":"vlife:loadClothItem",
            "useEventData":{
                "shoesColor":0,
                "model":"mp_m_freemode_01",
                "shoes":0
            }
        }
    },

    {
        "name":"Munition Fusil à pompe",
        "quantity":40,
        "metadata":{
            "ammoType":"AMMO_SHOTGUN",
            "weight":0.03,
            "type":"ammo"
        }
    }
]

export class Inside extends React.Component {
    state = {"itemsA":itemsA, "itemsB":itemsB, "quantity":1};
    
    constructor() { 
        super()
        this.changeState = this.changeState.bind(this)
        this.getMaxItem = this.getMaxItem.bind(this)
    }

    componentDidMount() {
        this.setState({"itemsA":itemsA, "itemsB":itemsB})
        for (let button in defaultButtons) {
            if (defaultButtons[button].callback) {
                defaultButtons[button].callback.bind(this) 
            }
        }
    }

    changeState (data) {
        this.setState(data)
    }

    getMaxItem () {
        return this.state.quantity
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div id="inside">                
                    <Items dropCallback={dropInItemsZone} items={this.state['itemsA']} name={"Inventaire A"} parent="itemsA" minQuantity={this.getMaxItem} state={this.changeState}/>
                    <ButtonsPanel value={defaultButtons} state={this.changeState} minQuantity={this.getMaxItem}/>
                    <Items dropCallback={dropInItemsZone} items={this.state['itemsB']} name={"Inventaire B"} parent="itemsB" minQuantity={this.getMaxItem} state={this.changeState}/>
                </div>
            </DndProvider>
        )
    }
}