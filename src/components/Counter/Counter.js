import React, { Component } from "react"
import PropTypes from "prop-types"
import "./Counter.css"

export class Counter extends Component {
  static defaultProps = { touches: 0 }
  static propTypes = {}

  render() {
    return <h3 className="counter">👇 {this.props.touches}</h3>
  }
}
