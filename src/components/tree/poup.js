import React from "react"
import {Icon} from "antd"
import './index.css'

class Popup extends React.Component {
    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.record)
        }
    }

    render() {
        const {visible, x, y} = this.props;
        return  visible &&
            <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
                <li onClick={this.onClick}><Icon type="file"/>View</li>
                <li><Icon type="play-circle"/>Run build</li>
            </ul>

    }
}
export default Popup