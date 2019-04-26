import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popup } from './../Popup/Popup'
import './Leaderboard.css'

export class Leaderboard extends Component {
    static defaultProps = {
        show: false
    }

    static propTypes = {
        show: PropTypes.bool.isRequired,
        leaderBoard: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.number]))
            .isRequired,
        userScore: PropTypes.string.isRequired
    }

    shouldComponentUpdate(prevProps) {
        return this.props.userScore !== prevProps.userScore
    }

    render() {
        const { leaderBoard, show, userScore, reset } = this.props
        return Object.keys(leaderBoard).includes(userScore) ? (
            <Popup title={'🎉 You are the bestest! 🎉'} show={show}>
                <p>At something. I guess.</p>
                <ol className="leaderboard">
                    {Object.keys(leaderBoard)
                        .sort()
                        .reverse()
                        .map(score =>
                            leaderBoard[score].map(name => (
                                <li
                                    key={`${score}${name}`}
                                    className={(show && userScore) === score ? 'red' : undefined}>
                                    {score} — {name}
                                </li>
                            ))
                        )}
                </ol>
                <h1 onClick={reset} className="play-again">
                    Play again!
                </h1>
            </Popup>
        ) : (
            <Popup title={'You can do better!'} show={show}>
                <p>Go and try again.</p>
                <h1 onClick={reset} className="play-again">
                    Redeem myself!
                </h1>
            </Popup>
        )
    }
}
