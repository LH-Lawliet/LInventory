import React from 'react';
import { Title } from './title.js'
import { Inside } from './inside.js'

export class App extends React.Component {
    render() {
        return (
            <div id="inventory">
                <Title />
                <Inside />
            </div>
        )
    }
}