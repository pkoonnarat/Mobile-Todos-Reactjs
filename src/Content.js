import React, { Component } from 'react';

class Contents extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (    <>
            {this.props.item.map((it) => <h2>{it}</h2>)}
            </>);
    }
}
 
export default Contents;