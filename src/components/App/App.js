import React, { Component } from 'react'
import { Board } from '../Board/Board'
import { Timer } from '../Timer/Timer'
import './App.css'

class App extends Component {
    levelOptions = {
        0: { size: 2 },
        1: { size: 4 }
    }
    level = 1
    size = this.levelOptions[this.level].size
    maxItemWidth = 200
    state = {
        startedAt: null,
        stopped: false
    }

    start() {
        if (!this.state.startedAt) {
            this.setState({ startedAt: Date.now() })
        }
    }

    stop() {
        this.setState({ stopped: true })
    }

    render() {
        return (
            <main className='app'>
                <h1>Match! 🙌</h1>
                <Timer stopped={this.state.stopped} startedAt={this.state.startedAt} />
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
                <Board size={this.size} onFirstClick={() => this.start()} onWin={() => this.stop()} />
            </main>
        )
    }
}

export default App
