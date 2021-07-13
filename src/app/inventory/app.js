import React from 'react';
import { Title } from './title.js'
import { Inside } from './inside.js'
import { drag } from "../../dnd.js";

export class Inventory extends React.Component {
    state = {
        "show":false
    }
    constructor (inventoryData) {
        super(inventoryData);
        this.state = {
            "inventoryData":inventoryData
        };
        this.isComponentVisible = this.isComponentVisible.bind(this)
        this.setComponentVisible = this.setComponentVisible.bind(this)
    }

    isComponentVisible() {
        return this.state['show']
    }

    setComponentVisible(visible) {
        this.setState({"show":visible});
    }

    componentDidMount() {
        console.log("component mount")
        let setComponentVisible = this.setComponentVisible
        window.addEventListener('message', function (event) {
            console.log("RECEIVING EVENT")
            if (event && event.data) {
                if (event.data.action === "openInventory") {
                    setComponentVisible(true)
                    console.log("openInventory")
                }
                if (event.data.action === "closeInventory") {
                    setComponentVisible(false)
                    console.log("closeInventory")
                }
            }
        });

        document.addEventListener('mouseup', e => {
            if (this.isComponentVisible()) {
                console.log("MouseUp")
                drag.stopDrag(e, this)
            }
        })

        document.addEventListener('mousemove', e => {
            if (this.isComponentVisible()) {
                drag.setMouseCoords(e.screenX,e.screenY)
            }
        })

        setComponentVisible(true)
    }

    render() {
        if (this.isComponentVisible()) {
            return (
                <div id="inventory">
                    <Title />
                    <Inside />
                </div>
            )
        }
        return (<div></div>)
    }
}