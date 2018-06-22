import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export class Card extends Component {
    static defaultProps = {
        front: ''
    }
    static propTypes = {
        front: PropTypes.string,
        back: PropTypes.string.isRequired
    }

    render() {
        const { flipped, solved, errored, front, back, onClick } = this.props
        const className = `card${flipped ? ' flipped' : ''}${solved ? ' solved' : ''}${errored ? ' errored' : ''}`
        return (
            <div className={className} onClick={onClick}>
                <div className="front">{front}</div>
                <div className="back">
                    <span>{back}</span>
                </div>
            </div>
        )
    }
}
