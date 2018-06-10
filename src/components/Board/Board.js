import React, { Component } from 'react'
import { Card } from '../Card/Card'
// import search from '@jukben/emoji-search'
import { food } from '../Emoji/Emoji'
import './Board.css'

const Store = {
    emojis: food,
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
        values: [],
        disabled: false,
        flippedCards: [],
        erroredCards: [],
        solvedCards: []
    }

    constructor(props) {
        super(props)
        this.state.values = Store.getArrayOfDoubles(this.props.size ** 2)
    }

    checkFlipped() {
        const { values, flippedCards } = this.state
        if (flippedCards.length !== 2) return
        if (values[flippedCards[0]] === values[flippedCards[1]]) {
            this.setState(prevState => ({
                solvedCards: [...prevState.solvedCards, ...prevState.flippedCards],
                flippedCards: []
            }))
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
        if (!this.state.solvedCards.includes(index) && !this.state.flippedCards.includes(index)) {
            this.flipCard(index)
        }
    }

    render() {
        return (
            <div className='board'>
                {this.state.values.map((value, index) => (
                    <Card
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