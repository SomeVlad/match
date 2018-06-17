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
        const { flipped, solved, errored } = this.props
        const className = `card${flipped ? ' flipped' : ''}${solved ? ' solved' : ''}${errored ? ' errored' : ''}`
        return (
            <div
                className={className}
                onClick={() => this.props.onClick()}>
                <div className='front'>{this.props.front}</div>
                <div className='back'><span>{this.props.back}</span></div>
            </div>
        )
    }
}
