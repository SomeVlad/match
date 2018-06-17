import React, { Component } from 'react'
import { Card } from '../Card/Card'
import { food } from '../Emoji/Emoji'
import './Board.css'

const Store = {
    emojis: food.filter(Boolean),
    getRandomIndex: maxValue => Math.floor(Math.random() * maxValue),
    shuffle: array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    },
    getArrayOfDoubles(length) {
        const result = []
        for (let i = 0; i < length; i += 2) {
            const pickedValue = this.emojis.splice(this.getRandomIndex(this.emojis.length), 1)[0]
            result.push(pickedValue, pickedValue)
        }
        return this.shuffle(result)
    }
}

export class Board extends Component {
    state = {
        paused: true,
        values: Store.getArrayOfDoubles(this.props.size ** 2),
        disabled: false,
        flippedCards: [],
        erroredCards: [],
        solvedCards: []
    }

    checkWinCondition() {
        if (this.state.solvedCards.length === this.state.values.length) {
            this.props.onWin()
        }
    }

    checkFlipped() {
        const { values, flippedCards } = this.state
        if (flippedCards.length !== 2) return
        if (values[flippedCards[0]] === values[flippedCards[1]]) {
            this.setState(prevState => ({
                solvedCards: [...prevState.solvedCards, ...prevState.flippedCards],
                flippedCards: []
            }), () => this.checkWinCondition())
        } else {
            this.setState({ disabled: true, erroredCards: [...flippedCards] }, () => {
                setTimeout(() => this.setState({ flippedCards: [], erroredCards: [], disabled: false }), 300)
            })
        }
    }

    flipCard(index) {
        if (!this.state.disabled) {
            this.setState(prevState => ({
                flippedCards: [...prevState.flippedCards, index]
            }), () => {
                this.checkFlipped()
            })
        }
    }

    handleCardClick(index) {
        if (this.state.paused) {
            this.setState({ paused: false })
            this.props.onFirstClick()
        }
        if (!this.state.solvedCards.includes(index) && !this.state.flippedCards.includes(index)) {
            this.flipCard(index)
        }
        if (!this.state.disabled && !this.state.disabled && !this.state.solvedCards.includes(index) && !this.state.flippedCards.includes(index)) {
            this.props.onTouch()
        }
    }

    render() {
        return (
            <div className='board'>
                {this.state.values.map((value, index) => (
                    value && <Card
                        key={`${value}-${index}`}
                        index={index}
                        errored={this.state.erroredCards.includes(index)}
                        flipped={this.state.flippedCards.includes(index)}
                        solved={this.state.solvedCards.includes(index)}
                        back={value} onClick={() => this.handleCardClick(index)} />
                ))}
            </div>
        )
    }

}