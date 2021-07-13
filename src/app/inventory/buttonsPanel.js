import React from 'react';
import { Button } from './button.js'
import { TextInputButton } from './textInputButton.js'

export class ButtonsPanel extends React.Component {
    constructor (buttons) {
        super(buttons);
        this.buttons = buttons.value;
        this.parentState = buttons.state
        this.minQuantity = buttons.minQuantity
    }

    renderTextInput(data, parentState, minQuantity) {
        return <TextInputButton key={data.key} parentState={parentState} value={data} minQuantity={minQuantity}></TextInputButton>
    }

    renderButton(button) {
        return <Button key={button.key} value={button.data}/>;
    }

    renderButtons(buttons, parentState, minQuantity) {
        let final = []
        for (let k = 0; k < buttons.length; k++) {
            let button={"key":k,"data":buttons[k]}
            if (button.data.defaultQuantity) {
                final.push(this.renderTextInput(button, parentState, minQuantity))
            } else {
                final.push(this.renderButton(button))
            }
        }
        return final
    }

    render() {
        return (
            <div className="buttonsPanel disable-select">
                {this.renderButtons(this.buttons, this.parentState, this.minQuantity)}
            </div>
        )
    }
}