import React, { Component } from 'react'
import './Timer.css'

export class Timer extends Component {
    state = {
        secondsPassed: 0.0
    }

    formatTime = (time = 0) => `0${parseInt(time, 10)}`.slice(-2)
    formatMilliseconds = (time = 0) => `${time}0`.slice(0, 2)

    tick = () => {
        this.setState(({
            secondsPassed: (new Date() - this.props.startedAt) / 1000
        }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.startedAt && !prevProps.startedAt) {
            this.start()
        }

        if (this.props.stopped && !prevProps.stopped) {
            this.stop()
        }
    }

    componentWillUnmount() {
        this.stop()
    }

    start() {
        this.timer = setInterval(this.tick, 50)
    }

    stop() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <h3 className='timer'>⏰{' '}
                <span>{this.formatTime(this.state.secondsPassed / 60)}</span>
                :
                <span>{this.formatTime(this.state.secondsPassed % 60)}</span>
                :
                <span>{this.formatMilliseconds(this.state.secondsPassed.toString().split('.')[1])}</span>
            </h3>
        )
    }
}
