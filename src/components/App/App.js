import React, { Component } from 'react'
import { Board } from '../Board/Board'
import './App.css'

class App extends Component {
    size = 4
    maxItemWidth = 200
    state = {
        startedAt: null,
        secondsPassed: 0
    }
    tick = () => {
        this.setState(prevState => ({
            secondsPassed: parseInt((new Date() - prevState.startedAt) / 1000)
        }))
    }

    start() {
        if (!this.state.startedAt) {
            this.setState({ startedAt: Date.now() })
            this.timer = setInterval(this.tick, 1000)
        }
    }

    stop() {
        clearInterval(this.timer)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <main className='app'>
                <h1>Match! 🔥</h1>
                <h2>⏰ <span>{('0' + parseInt(this.state.secondsPassed / 60)).slice(-2)}:{('0' + this.state.secondsPassed % 60).toString().slice(-2)}</span>
                </h2>
                <style>{`
                    :root {
                        --grid-size: ${this.size};
                        --grid-item-width: ${100 / this.size}%;
                        --grid-item-max-width: ${this.maxItemWidth}px;
                        --grid-max-width: ${this.maxItemWidth * this.size}px;
                    }

                    @media (min-width: ${this.maxItemWidth * this.size}px) {
                        .flipper {
                            font-size: 80px;
                        }
                    }

                    body {
                        font-family: "Jua", sans-serif;
                    }
                `}</style>
                <Board size={this.size} onClick={() => this.start()} onWin={() => {this.stop()}} />
            </main>
        )
    }
}

export default App
