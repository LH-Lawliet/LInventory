import React from 'react';
import { Button } from './button.js'

export class ButtonsPanel extends React.Component {
    constructor (buttons) {
        super(buttons);
        this.buttons = buttons.value;
    }

    renderButton(button) {
        return <Button key={button.key} value={button.data}/>;
    }

    renderButtons(buttons) {
        let final = []
        for (let k = 0; k < buttons.length; k++) {
            let button={"key":k,"data":buttons[k]}
            final.push(this.renderButton(button))
        }
        return final
    }

    render() {
        return (
            <div className="buttonsPanel disable-select">
                {this.renderButtons(this.buttons)}
            </div>
        )
    }
}