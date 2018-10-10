import React, { Fragment } from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: this.props.minutes,
      seconds: this.props.seconds,
      isStarted: true
    };
  }

  tick = () => {
    let newMinutes = this.state.minutes,
      newSeconds = this.state.seconds - 1;

    if (newSeconds < 0) {
      newMinutes--;
      if (newMinutes < 0) {
        this.reset();
        return;
      }
      newSeconds = 59;
    }

    if (newSeconds < 10) {
      this.setState({ minutes: newMinutes, seconds: "0" + newSeconds });
    } else {
      this.setState({
        minutes: newMinutes,
        seconds: newSeconds
      });
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
    this.setState({ isStarted: true });
  }

  render() {
    return (
      <Fragment>
        <h3 className={this.props.className}>
          {this.state.minutes} : {this.state.seconds}
        </h3>
      </Fragment>
    );
  }
}

Timer.defaultProps = {
  minutes: 60,
  seconds: "00"
};

export default Timer;
