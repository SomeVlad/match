import React, { Component } from 'react'
import { Board } from '../Board/Board'
import { Timer } from '../Timer/Timer'
import { Counter } from '../Counter/Counter'
import { Store } from '../ItemsStore/ItemsStore'
import './App.css'

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

const STATES = {
    INITIAL: {
        current: 'INITIAL', // state name
        touches: 0, // touches counter
        timerGoing: false, // is timer going
        disabled: false, // whether touches do not count
        erroredCards: [], // cards that do not match, 2 max
        flippedCards: [], // flipped, but not solved
        solvedCards: [], // cards with found pairs
        values: Store.getArrayOfDoubles(OPTIONS.size ** 2) // array of values for cards
    },
    START_TIMER: {
        timerGoing: true
    },
    FLIP_CARD: ({ prevState, index }) => ({
        current: 'FLIP_CARD',
        touches: !prevState.disabled ? prevState.touches + 1 : prevState.touches,
        disabled: true,
        flippedCards: [...prevState.flippedCards, index]
    }),
    CARD_FLIPPED: {
        disabled: false
    },
    MATCH_FOUND: ({ prevState }) => ({
        current: 'MATCH_FOUND',
        solvedCards: [...prevState.solvedCards, ...prevState.flippedCards],
        flippedCards: []
    }),
    SHOW_MISTAKE: ({ prevState }) => ({
        current: 'SHOW_MISTAKE',
        disabled: true,
        erroredCards: [...prevState.flippedCards]
    }),
    MATCH_NOT_FOUND: {
        current: 'MATCH_NOT_FOUND',
        flippedCards: [],
        erroredCards: [],
        disabled: false
    },
    WIN: {
        current: 'WIN',
        disabled: true,
        timerGoing: false
    }
}

class App extends Component {
    state = STATES.INITIAL

    delay(fn) {
        setTimeout(fn, OPTIONS.delay)
    }

    checkWinCondition() {
        if (this.state.solvedCards.length === this.state.values.length) {
            this.setState(STATES.WIN)
        }
    }

    checkFlippedCard() {
        const { values, flippedCards } = this.state
        if (flippedCards.length !== 2) return
        if (values[flippedCards[0]] === values[flippedCards[1]]) {
            this.setState(prevState => STATES.MATCH_FOUND({ prevState }), () => this.checkWinCondition())
        } else {
            this.setState(prevState => STATES.SHOW_MISTAKE({ prevState }),
                () => this.delay(() => this.setState(STATES.MATCH_NOT_FOUND)))
        }
    }

    startTimer() {
        this.setState(STATES.START_TIMER)
    }

    handleCardClick(index) {
        if (this.state.current === 'INITIAL') {
            this.startTimer()

        }
        if (!this.state.disabled && !this.state.solvedCards.includes(index) && !this.state.flippedCards.includes(index)) {
            this.setState(prevState => STATES.FLIP_CARD({ prevState, index }), () => {
                this.delay(() => this.setState(STATES.CARD_FLIPPED))
                this.checkFlippedCard()
            })
        }

    }

    componentWillMount() {
        this.setState(STATES.INITIAL)
    }

    render() {
        return (
            <main className='app'>
                <h1>Match! 🙌</h1>
                <Counter touches={this.state.touches} />
                <Timer timerGoing={this.state.timerGoing} />
                <style>{`
                    :root {
                        --grid-size: ${OPTIONS.size};
                        --grid-item-width: ${100 / OPTIONS.size}%;
                        --grid-item-max-width: ${OPTIONS.maxItemWidth}px;
                        --grid-max-width: ${OPTIONS.maxItemWidth * OPTIONS.size}px;
                    }

                    @media (min-width: ${OPTIONS.maxItemWidth * OPTIONS.size}px) {
                        .card {
                            font-size: 80px;
                        }
                    }
                `}</style>
                <Board size={OPTIONS.size}
                       values={this.state.values}
                       erroredCards={this.state.erroredCards}
                       flippedCards={this.state.flippedCards}
                       solvedCards={this.state.solvedCards}
                       onClick={index => this.handleCardClick(index)}
                />
            </main>
        )
    }
}

export default App
