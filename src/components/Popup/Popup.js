import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Popup.css'

export class Popup extends PureComponent {
    static defaultProps = {
        title: 'Popup title',
        show: false
    }
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired
    }
    render() {
        const { children, title, show } = this.props
        return show ? (
            <div className="popup-outer">
                <div className="popup-inner">
                    <h2>{title}</h2>
                    {children}
                </div>
            </div>
        ) : null
    }
}
