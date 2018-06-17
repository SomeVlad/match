import React, { Component } from 'react'
import { Board } from '../Board/Board'
import { Timer } from '../Timer/Timer'
import { Counter } from '../Counter/Counter'
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
        touches: 0,
        startedAt: null,
        stopped: false
    }

    start() {
        if (!this.state.startedAt) {
            this.setState({ startedAt: Date.now() })
        }

    }

    onTouch() {
        this.setState(prevState => ({
            touches: prevState.touches + 1
        }))
    }

    stop() {
        this.setState({ stopped: true })
    }

    render() {
        return (
            <main className='app'>
                <h1>Match! 🙌</h1>
                <Counter touches={this.state.touches} />
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
                `}</style>
                <Board size={this.size}
                       onFirstClick={() => this.start()}
                       onWin={() => this.stop()}
                       onTouch={() => this.onTouch()} />
            </main>
        )
    }
}

export default App
