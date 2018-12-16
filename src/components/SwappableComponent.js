import React, { Component } from 'react'

class Swappable extends Component {
    constructor() {
        super()

        this.state = {
            customFunc: null
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
    }
    
    drag(ev, customFunc = null) {
        ev.dataTransfer.setData("src", ev.target.id);
        console.log(ev.target.parentNode, 'TARGET DRAGSTART')
        
        this.setState({
            initialParentNode: ev.target.parentNode
        })
    }

    dragEnd(ev, customFunc = null) {

        console.log(ev.target.parentNode, 'TARGET DRAGEND')
        if (customFunc && (ev.target.parentNode != this.state.initialParentNode)) {
            console.log('custom func')
            this.props.customFunc()
        }
    }
    
    drop(ev, dragableId, dropzoneId, customFunc = null, swappable = true) {
        ev.preventDefault();
        let src = document.getElementById(ev.dataTransfer.getData("src"));
        let srcParent = src.parentNode;
        let target = document.getElementById(dragableId);

        console.log(src, 'dragged element');
        console.log(srcParent, 'parent of dragged');
        console.log(target, 'element to be swapped')

        swappable ? this.swapElements(src, target, srcParent) : this.transferElement(src, dropzoneId)

    }

    swapElements(src, target, srcParent) {
        target.replaceWith(src);
        srcParent.appendChild(target);
    }

    transferElement(src, dropzoneId) {
        let dropzone = document.getElementById(dropzoneId)
        dropzone.appendChild(src);
    }

    render() {
        const dropZoneStyle = {
            width: '350px',
            minHeight: '100px',
            padding: '10px',
            border: '1px solid #aaaaaa'
        };

        const draggableStyle = {
            width: '50px',
            height: '50px',
            padding: '10px',
            border: '1px solid red'
        };

        const { id, content, swappable, customFunc } = this.props
        const dropzoneId = 'drop' + id
        const dragableId = 'drag' + id

        console.log(customFunc, 'customFunc')
        return (
            <div
                id = {dropzoneId}
                onDrop={(event) => this.drop(event, dragableId, dropzoneId, customFunc, swappable)} 
                onDragOver={(event) => this.allowDrop(event)} 
                style={dropZoneStyle}>
                <div id={ dragableId }
                    draggable="true"
                    onDragStart={(event) => this.drag(event)}
                    onDragEnd = {(event) => this.dragEnd(event, customFunc)}
                    style={draggableStyle}>
                    { content }
                </div>
            </div>
        )
    }
}

export default Swappable;