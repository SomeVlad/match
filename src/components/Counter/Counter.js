import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

export class Counter extends PureComponent {
    static defaultProps = { touches: 0 }
    static propTypes = { touches: PropTypes.number.isRequired }

    render() {
        return <h3 className="counter">👇 {this.props.touches}</h3>
    }
}
