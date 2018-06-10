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
    /*state = {
        flipped: false
    }*/

    /*flip() {
        const { flipped } = this.props
        this.setState({ flipped: !flipped })
        this.props.onClick()
    }*/

    render() {
        const { flipped, solved, errored } = this.props
        const className = `flipper${flipped ? ' flipped' : ''}${solved ? ' solved' : ''}${errored ? ' errored' : ''}`
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
