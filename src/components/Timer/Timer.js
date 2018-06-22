import React, { Component } from "react"
import "./Timer.css"

export class Timer extends Component {
  static defaultProps = {
    timerGoing: false,
    isReset: true
  }
  state = {
    startedAt: null,
    secondsPassed: 0.0
  }

  componentDidUpdate(prevProps) {
    if (this.props.timerGoing && !prevProps.timerGoing) {
      this.start()
    }
    if (!this.props.timerGoing && prevProps.timerGoing) {
      this.stop()
    }
    if (this.props.isReset && !prevProps.isReset) {
      this.stop()
      this.setState({ secondsPassed: 0.0 })
    }
  }

  formatMilliseconds = (time = 0) => `${time}0`.slice(0, 2)

  formatTime = (time = 0) => `0${parseInt(time, 10)}`.slice(-2)

  start() {
    this.setState({ startedAt: Date.now() })
    this.timer = setInterval(this.tick, 50)
  }

  stop() {
    clearInterval(this.timer)
  }

  tick = () => {
    this.setState({
      secondsPassed: new Date() - this.state.startedAt
    })
  }

  render() {
    return (
      <h3 className="timer">
        ⏰ <span>{this.formatTime(this.state.secondsPassed / 1000 / 60)}</span>
        :
        <span>{this.formatTime((this.state.secondsPassed / 1000) % 60)}</span>
        :
        <span>{this.formatMilliseconds(this.state.secondsPassed % 1000)}</span>
      </h3>
    )
  }
}
