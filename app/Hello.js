import React from "react";

class Hello extends React.Component {
  render() {
    {
      console.log(this.props);
    }
    return <div>Hello {this.props.name}</div>;
  }
}

export default Hello;
