import React from 'react';

export class Categories extends React.Component {
    constructor (data) {
        super();

        this.changeAbove = data.changeItemsFilter
        this.categories = data.availableCategories
        if (!this.selected) {
            this.selected = "Autres";
            if (this.changeAbove) {
                this.changeAbove(this.categories[this.selected])
            }
        }       
        
    }
    render() {
        let list = []
        let i=1
        for (let categorie in this.categories) {
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
                            this.changeAbove(this.categories[categorie])
                        }
                    }
                }>
                    {categorie}
                </button>
            )
            if (i!== Object.keys(this.categories).length) {
                list.push(
                    <span key={categorie+" span"}>|</span>
                )
            }
            i++
        }
        return (<div id="categories" className="disable-select">{list}</div>)
    }
}