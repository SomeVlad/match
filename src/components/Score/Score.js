import React, { PureComponent } from 'react'
import './Score.css'

export class Score extends PureComponent {
    state = { score: 0 }

    componentWillUpdate(prevProps) {
        if (prevProps.touches !== this.props.touches || prevProps.startedAt !== this.props.startedAt) {
            this.setState({ score: this.countScores() })
        }
    }

    countScores() {
        return Math.floor(((1 / this.props.touches) * 5 + 2000 / (Date.now() - this.props.startedAt)) * 10000)
    }

    render() {
        return <h3 className="score">{this.state.score}</h3>
    }
}
