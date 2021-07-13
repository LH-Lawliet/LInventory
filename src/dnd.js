
class dragSystem {
    draggedComponent = null;

    mouseCoords = [0,0]
    initialDragPos = [0,0]

    startDrag = function (e, component) {
        component.setState({ dragging: true })
        this.draggedComponent = component
        this.initialDragPos = [e.screenX/2, e.screenY/2]
    };
    
    stopDrag = function (e) {
        if (this.draggedComponent) {
            this.draggedComponent.setState({ dragging: false })
            this.draggedComponent = null
        }
    };

    setMouseCoords = function (x, y) {
        this.mouseCoords = [x,y]
    };

    loop = setInterval(function () {
        if (drag.draggedComponent) {
            if ((drag.draggedComponent.state.transformX && drag.draggedComponent.state.transformY)!==false) {
                drag.draggedComponent.setState({ transformX: drag.mouseCoords[0]-drag.initialDragPos[0],transformY: drag.mouseCoords[1]-drag.initialDragPos[1] })
            }
        }
    }, 33.3);
}

export const drag = new dragSystem()
drag.stopDrag = drag.stopDrag.bind(drag)