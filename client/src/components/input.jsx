import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div>
            <input id="location" onKeyUp={this.props.handleEnter} placeholder="Enter Location" />
        </div>
        )
    }
}

export default Input