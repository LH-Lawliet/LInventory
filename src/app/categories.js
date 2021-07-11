import React from 'react';

let categories = {
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

export class Categories extends React.Component {
    constructor (data) {
        super();

        this.changeAbove = data.changeItemsFilter
        if (!this.selected) {
            this.selected = "Autres";
            if (this.changeAbove) {
                this.changeAbove(categories[this.selected])
            }
        }       
        
    }
    render() {
        let list = []
        let i=1
        for (let categorie in categories) {
            let className = "buttonAsText"
            if (categorie === this.selected) {
                className = className+" selected"
            }
            list.push(
                <button key={categorie} className={className} onClick={() => 
                    {
                        this.selected = categorie
                        this.setState({});

                        if (this.changeAbove) {
                            this.changeAbove(categories[categorie])
                        }
                    }
                }>
                    {categorie}
                </button>
            )
            if (i!== Object.keys(categories).length) {
                list.push(
                    <span key={categorie+" span"}>|</span>
                )
            }
            i++
        }
        return (<div id="categories" className="disable-select">{list}</div>)
    }
}