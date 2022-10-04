import React from "react";
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log("call constructor");
        this.inputRef = React.createRef();
    }

    render() {
        return <input type="text" ref={this.inputRef} />;
    }

    componentDidMount() {
        console.log("call componentDidMount");
        this.inputRef.current.focus();
    }
}

export default MyComponent;