import React, {Component} from 'react';
import {Tree} from 'antd';

const {TreeNode} = Tree;
const DirectoryTree = Tree.DirectoryTree;
import Popup from './poup';

class TreeNodes extends React.Component {
    state = {
        popup: {
            visible: false,
            x: 0, y: 0
        }
    }

    getTreeObject() {
        let tree = [];

        this.props.data.forEach(item => {
            item.split('/').forEach((text, i, arr) => {
                if (arr[i - 1]) {

                    const pushParent = (text, parentName, arr) => {
                        arr.forEach(item => {
                            if (item.name === parentName) {

                                if (!item.children.find(child => child.name === text)) {
                                    item.children.push({
                                        name: text,
                                        children: []
                                    })
                                }

                            } else {
                                pushParent(text, parentName, item.children);
                            }
                        })
                    }
                    pushParent(text, arr[i - 1], tree);

                } else {
                    if (!tree.find(item => item.name === text)) {
                        tree.push({
                            name: text,
                            children: []
                        })
                    }
                }
            })
        });

        return tree;
    }

    onRow = ({event, node}) => {
        event.preventDefault()
        const that = this

        if (!this.state.visible) {
            document.addEventListener(`click`, function onClickOutside() {
                that.setState({popup: {visible: false}})
                document.removeEventListener(`click`, onClickOutside)
            })
        }

        if (!node.props.isLeaf) {
            that.setState({popup: {visible: false}})
            return;
        }

        const record = {
            pathFile: node.props.eventKey
        }
        
        this.setState({
            popup: {
                record,
                visible: true,
                x: event.clientX,
                y: event.clientY
            }
        })
    }

    getTreeItems() {
        let uniqKey = 0;
        let leafKey = 0;
        const getChildrens = node => {
            ++uniqKey;

            const {children} = node;
            const isLeaf = children.length === 0;

            let key = null;

            if (isLeaf && this.props.data[leafKey]) {
                key = this.props.data[leafKey];
                leafKey += 1;
            } else {
                key = uniqKey;
            }

            return (
                <TreeNode title={node.name}
                          key={key}
                          isLeaf={isLeaf}
                >
                    {!isLeaf ? children.map(child => getChildrens(child)) : null}
                </TreeNode>
            )
        }

        return this.getTreeObject().map(root => getChildrens(root));
    }

    render() {

        return (
            <div>
                <DirectoryTree defaultExpandAll
                               onRightClick={this.onRow}
                >
                    {this.getTreeItems()}
                </DirectoryTree>
                <Popup menu={this.props.contextMenu}
                       {...this.state.popup}/>
            </div>
        )
    }
}

export default TreeNodes;
