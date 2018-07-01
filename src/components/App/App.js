import React, { Component } from 'react'
import { Board } from '../Board/Board'
import { Timer } from '../Timer/Timer'
import { Counter } from '../Counter/Counter'
import { Store } from '../ItemsStore/ItemsStore'
import { Score } from '../Score/Score'
import './App.css'
import chroma from 'chroma-js'

const OPTIONS = {
    levelOptions: {
        0: { size: 2 },
        1: { size: 4 }
    },
    level: 1,
    maxItemWidth: 200,
    delay: 300
}
OPTIONS.size = OPTIONS.levelOptions[OPTIONS.level].size

const getItems = () => Store.getArrayOfDoubles(OPTIONS.size ** 2)

const STATES = {
    INITIAL: {
        name: 'INITIAL', // state name
        touches: 0, // touches counter
        timerGoing: false, // is timer going
        disabled: false, // whether touches do not count
        erroredCards: [], // cards that do not match, 2 max
        flippedCards: [], // flipped, but not solved
        solvedCards: [], // cards with found pairs
        startedAt: null, // when this round has started
        values: getItems() // array of values for cards
    },
    START_TIMER: {
        timerGoing: true
    },
    FLIP_CARD: ({ prevState, index }) => ({
        name: 'FLIP_CARD',
        touches: !prevState.disabled ? prevState.touches + 1 : prevState.touches,
        disabled: prevState.flippedCards.length === 1,
        flippedCards: [...prevState.flippedCards, index],
        startedAt: !prevState.startedAt ? Date.now() : prevState.startedAt
    }),
    CARD_FLIPPED: {
        disabled: false
    },
    MATCH_FOUND: ({ prevState }) => ({
        name: 'MATCH_FOUND',
        solvedCards: [...prevState.solvedCards, ...prevState.flippedCards],
        flippedCards: []
    }),
    SHOW_MISTAKE: ({ prevState }) => ({
        name: 'SHOW_MISTAKE',
        disabled: true,
        erroredCards: [...prevState.flippedCards]
    }),
    MATCH_NOT_FOUND: {
        name: 'MATCH_NOT_FOUND',
        flippedCards: [],
        erroredCards: [],
        disabled: false
    },
    WIN: {
        name: 'WIN',
        disabled: true,
        timerGoing: false
    }
}

const delay = fn => setTimeout(fn, OPTIONS.delay)

const backgroundScale = chroma.scale(['#92f8e1', '#7fcdbb', '#0054b8']).mode('hsl')
const cardsScale = chroma
    .scale(['#ffe901', '#fabd00'])
    .mode('hsl')
    .colors(16)

class App extends Component {
    state = STATES.INITIAL

    checkFlippedCard() {
        const { values, flippedCards } = this.state
        if (flippedCards.length !== 2) return
        if (values[flippedCards[0]] === values[flippedCards[1]]) {
            this.setState(prevState => STATES.MATCH_FOUND({ prevState }), () => this.checkWinCondition())
        } else {
            this.setState(
                prevState => STATES.SHOW_MISTAKE({ prevState }),
                () => delay(() => this.setState(STATES.MATCH_NOT_FOUND))
            )
        }
    }

    checkWinCondition() {
        if (this.state.solvedCards.length === this.state.values.length) {
            this.setState(STATES.WIN, () => alert(this.countScores()))
        }
    }

    countScores() {
        return Math.floor(((1 / this.state.touches) * 5 + 2000 / (Date.now() - this.state.startedAt)) * 10000)
    }

    handleCardClick(index) {
        if (this.state.name === STATES.INITIAL.name) {
            this.startTimer()
        }
        if (
            !this.state.disabled &&
            !this.state.solvedCards.includes(index) &&
            !this.state.flippedCards.includes(index)
        ) {
            this.setState(
                prevState => STATES.FLIP_CARD({ prevState, index }),
                () => {
                    delay(() => this.setState(STATES.CARD_FLIPPED))
                    this.checkFlippedCard()
                }
            )
        }
    }

    reset() {
        this.setState({ ...STATES.INITIAL, values: getItems() })
    }

    startTimer() {
        this.setState(STATES.START_TIMER)
    }

    render() {
        return (
            <main className="app">
                {this.state.name !== STATES.WIN.name ? (
                    <h1>Match! 🙌</h1>
                ) : (
                    <h1 onClick={() => this.reset()} className="play-again">
                        Play again!
                    </h1>
                )}

                <Counter touches={this.state.touches} />
                <Timer timerGoing={this.state.timerGoing} isReset={this.state.name === 'INITIAL'} />
                {/*<Score touches={this.state.touches} startedAt={this.state.startedAt} />*/}
                <style>{`
                    :root {
                        --grid-size: ${OPTIONS.size};
                        --grid-item-width: ${100 / OPTIONS.size}%;
                        --grid-item-max-width: ${OPTIONS.maxItemWidth}px;
                        --grid-max-width: ${OPTIONS.maxItemWidth * OPTIONS.size}px;
                        --background-gradient: linear-gradient(${backgroundScale(0)}, ${backgroundScale(1)});
                    }

                    @media (min-width: ${OPTIONS.maxItemWidth * OPTIONS.size}px) {
                        .card {
                            font-size: 80px;
                        }
                    }
                `}</style>
                <Board
                    size={OPTIONS.size}
                    values={this.state.values}
                    erroredCards={this.state.erroredCards}
                    flippedCards={this.state.flippedCards}
                    solvedCards={this.state.solvedCards}
                    cardsScale={cardsScale}
                    onClick={index => this.handleCardClick(index)}
                />
            </main>
        )
    }
}

export default App
