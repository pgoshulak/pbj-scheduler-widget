import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';


class Checkboxes extends React.Component {
  state = {
    checkedA: false,
    checkedB: false
  };

  handleChange = (event) => {
    this.setState({[event.target.value]:true})
    if (event.target.value === "checkedA"){
      this.setState({checkedB: false})
    } else {
      this.setState({checkedA: false} )
    }
  }

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          onChange={this.handleChange}
          value="checkedA"
        />
        <span> Pay at store </span>
        <Checkbox
          checked={this.state.checkedB}
          onChange={this.handleChange}
          value="checkedB"
        />
        <span>
          Pay with card
        </span>
      </div>
    )
  }
}

export default Checkboxes;
