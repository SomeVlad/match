import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export class Card extends PureComponent {
    static defaultProps = {
        front: '',
        backgroundColorBack: '',
        backgroundColorFront: ''
    }
    static propTypes = {
        front: PropTypes.string,
        back: PropTypes.string.isRequired,
        backgroundColorBack: PropTypes.string.isRequired,
        backgroundColorFront: PropTypes.string.isRequired
    }

    render() {
        const { flipped, solved, errored, front, back, onClick, backgroundColorBack, backgroundColorFront } = this.props
        const className = `card${flipped ? ' flipped' : ''}${solved ? ' solved' : ''}${errored ? ' errored' : ''}`
        return (
            <div className={className} onClick={onClick}>
                <div className="front" style={{ backgroundColor: backgroundColorFront }}>
                    {front}
                </div>
                <div className="back" style={{ backgroundColor: backgroundColorBack }}>
                    <span>{back}</span>
                </div>
            </div>
        )
    }
}
