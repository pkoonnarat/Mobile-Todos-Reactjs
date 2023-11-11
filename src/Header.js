import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (<h1>{this.props.text}</h1>);
    }
}
 
export default Header;