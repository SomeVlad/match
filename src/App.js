import React, { Component } from 'react'
import { Board } from './components/Board/Board'

class App extends Component {
    size = 4
    maxItemWidth = 200

    render() {
        return (
            <main className='App'>
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
                <Board size={this.size} />
            </main>
        )
    }
}

export default App
