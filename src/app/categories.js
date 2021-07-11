import React from 'react';

let categories = {
    "Autres" : {
        "name":"Autres",
    },
    "Vêtements" : {
        "name":"Vêtements",
        "metadataType":"CLOTH"
    },
    "Clefs" : {
        "name":"Clefs",
        "metadataType":"KEY"
    },
    "Armes" : {
        "name":"Armes",
        "metadataType":"WEAPON"
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
        return (<div id="categories">{list}</div>)
    }
}