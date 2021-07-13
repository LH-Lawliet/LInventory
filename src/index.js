import * as React from 'react'
import { render } from 'react-dom'
import { Inventory } from './app/inventory/app.js'

render(
    <Inventory/>, 
    document.querySelector('#inventoryApp')
)