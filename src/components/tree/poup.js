import React from "react"
import {Icon} from "antd"
import './index.css'

class Popup extends React.Component {
    onClick = (key) => {
        const menuItem = this.props.menu.find(item => item.key === key);
        menuItem.onClick(this.props.record);
    }

    getMenuItems() {
        if (!this.props.menu) {
            console.warn('Not set menu');
        }

        return this.props.menu.map(item =>
            <li key={item.key}
                onClick={() => this.onClick(item.key)}>
                <Icon type={item.icon}/>{item.name}
            </li>)
    }

    render() {
        const {visible, x, y} = this.props;
        return visible &&
            <ul className="popup" style={{left: `${x}px`, top: `${y}px`}}>
                {this.getMenuItems()}
            </ul>

    }
}

export default Popup