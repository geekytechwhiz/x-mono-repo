import React from "react";

type ReactProps = {
  navigate?: any;
  component?: string;
};

type ReactState = {
  counter: any;
};

class BuggyCounter extends React.Component<ReactProps, ReactState> {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("page will crash")) {
        throw new Error("I crashed!");
      }
      // Simulate a JS error
    }
    return (
      <>
        <button
          type='button'
          data-testid='error-check-component-div-id'
          name='Click me'
          onClick={this.handleClick}>
          error check
        </button>
        {this.state.counter}
      </>
    );
  }
}

export default BuggyCounter;
