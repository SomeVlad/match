import React, { Component } from 'react'
import { Card } from '../Card/Card'
import './Board.css'

export class Board extends Component {

    handleCardClick(index) {
        this.props.onClick(index)
    }

    render() {
        return (
            <div className='board'>
                {this.props.values.map((value, index) => (
                    value && <Card
                        key={`${value}-${index}`}
                        index={index}
                        errored={this.props.erroredCards.includes(index)}
                        flipped={this.props.flippedCards.includes(index)}
                        solved={this.props.solvedCards.includes(index)}
                        back={value} onClick={() => this.props.onClick(index)} />
                ))}
            </div>
        )
    }

}