import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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


function dropInItemsZone(item, zone) {
    if (item.parent !== zone) {
        let itemTable
        let dropTable
        if (item.parent == "itemsA") {
            itemTable = itemsA
            dropTable = itemsB
        } else {
            itemTable = itemsB
            dropTable = itemsA
        }

        delete itemTable[item.code]
        dropTable[item.code] = item.data

        item.parentState({"itemsA":itemsA, "itemsB":itemsB})
    }
} 

let itemsA = {
    "WEAPON_9MM":{
        "name":"Pistolet 9mm",
        "quantity":1,
        "category":"WEAPON"
    },
    "BREAD":{
        "name":"Pain",
        "quantity":4
    },
    "TOPS_21_3":{
        "name":"Haut n°21 couleur n°3",
        "quantity":1,
        "category":"CLOTH"
    },
}

for (let i = 0; i<100; i++) {
    itemsA[i] = {
        "name":"Nom "+i,
        "quantity":i
    }
}

let itemsB = {
    "BREAD":{
        "name":"Pain",
        "quantity":4
    },
    "KEYS_AZERTY":{
        "name":"Clef de voiture AZERTY",
        "quantity":1,
        "category":"KEY"
    },
    "KEYS_RTYUIO":{
        "name":"Clef de voiture RTYUIO",
        "quantity":1,
        "category":"KEY"
    },
    "WATER":{
        "name":"Bouteille d'eau",
        "quantity":10
    },
}

/*for (let i = 0; i<1000; i++) {
    itemsB[i] = {
        "name":"Nom "+i,
        "quantity":i
    }
}*/


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