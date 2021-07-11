import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Items } from './items.js'
import { ButtonsPanel } from './buttonsPanel.js'


let arraysMatch = function (arr1, arr2) {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;
	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	// Otherwise, return true
	return true;
};


function dropItem(item) {
    if (item.parent === "itemsA") {
        delete itemsA[item.code]
    } else if (item.parent === "itemsB") {
        delete itemsB[item.code]
    }
    item.parentState({"itemsA":itemsA, "itemsB":itemsB})
}

function useItem(item) {
    let table = null
    if (item.parent === "itemsA") {
        table = itemsA
    } else if (item.parent === "itemsB") {
        table = itemsB
    }
    if (table) {
        if (table[item.code].quantity>1) {
            table[item.code].quantity -= 1
        } else {
            delete table[item.code]
        }
        item.parentState({"itemsA":itemsA, "itemsB":itemsB})
    }
}

let defaultButtons = [
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
    {
        "text":"Utiliser",
        "callback":useItem
    },
]

function isItemInInv(item, inv) {
    for (let k in inv) {
        let check = inv[k]
        console.log(k, check.name, item.name, check.metadata, item.metadata)
        if (check.name === item.name && arraysMatch(check.metadata,item.metadata)) {
            return inv[k]
        }
    }
}


function dropInItemsZone(item, zone) {
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

        delete itemTable[item.code]

        let targetItem = isItemInInv(item.data, dropTable)
        if (targetItem) {
            targetItem.quantity += item.data.quantity
        } else {
            dropTable[item.code] = item.data
        }     
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
        "quantity":20,
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
    state = {"itemsA":itemsA, "itemsB":itemsB};
    
    componentDidMount() {
        this.setState({"itemsA":itemsA, "itemsB":itemsB})
        for (let button in defaultButtons) {
            defaultButtons[button].callback.bind(this)  
        }
    }

    changeState = (data) => {
        this.setState(data)
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div id="inside">                
                    <Items dropCallback={dropInItemsZone} items={this.state['itemsA']} name={"Inventaire A"} parent="itemsA" state={this.changeState}/>
                    <ButtonsPanel value={defaultButtons}/>
                    <Items dropCallback={dropInItemsZone} items={this.state['itemsB']} name={"Inventaire B"} parent="itemsB" state={this.changeState}/>
                </div>
            </DndProvider>
        )
    }
}