import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Popup } from './../Popup/Popup'
import './Leaderboard.css'

export class Leaderboard extends PureComponent {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        leaderBoard: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        userScore: PropTypes.number
    }

    static defaultProps = {
        show: false
    }

    render() {
        const { leaderBoard, show, userScore, reset } = this.props
        return (
            <Popup title={'🎉 You are the bestest! 🎉'} show={show}>
                <p>At something. I guess.</p>
                <div className="list">
                    <ol className="leaderboard">
                        {Object.keys(leaderBoard)
                            .sort()
                            .reverse()
                            .map(score =>
                                leaderBoard[score].map(name => (
                                    <li
                                        key={`${score}${name}`}
                                        className={(show && userScore.toString()) === score ? 'red' : undefined}>
                                        {score} — {name}
                                    </li>
                                ))
                            )}
                    </ol>
                </div>
                <h1 onClick={reset} className="play-again">
                    Play again!
                </h1>
            </Popup>
        )
    }
}
