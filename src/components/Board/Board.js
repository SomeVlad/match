import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card } from '../Card/Card'
import chroma from 'chroma-js'
import './Board.css'

export class Board extends PureComponent {
    static defaultProps = {
        flippedCards: [],
        solvedCards: [],
        erroredCards: []
    }

    static propTypes = {
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        flippedCards: PropTypes.arrayOf(PropTypes.number),
        solvedCards: PropTypes.arrayOf(PropTypes.number),
        erroredCards: PropTypes.arrayOf(PropTypes.number),
        onClick: PropTypes.func.isRequired
    }

    render() {
        const { erroredCards, flippedCards, solvedCards, onClick, values, cardsScale } = this.props
        return (
            <div className="board">
                {values.map(
                    (value, index) =>
                        value && (
                            <Card
                                key={`${value}-${index}`}
                                index={index}
                                errored={erroredCards.includes(index)}
                                flipped={flippedCards.includes(index)}
                                solved={solvedCards.includes(index)}
                                back={value}
                                onClick={() => onClick(index)}
                                backgroundColorFront={cardsScale[index]}
                                backgroundColorBack={chroma(cardsScale[index])
                                    .brighten(2)
                                    .hex()}
                            />
                        )
                )}
            </div>
        )
    }
}
