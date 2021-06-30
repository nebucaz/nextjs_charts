//import '../Admin.css';
import { mutate } from 'swr'
import React, { Component } from "react";
import { Container, Col, Row, Button } from 'react-bootstrap'

//import withAuth from '../../../Services/withAuth';
import ItemEdit from './ItemEdit';
//import ItemService from '../../../Services/itemService';

import { FaPlus } from 'react-icons/fa';

// https://bezkoder.com/react-crud-web-api/

class ItemsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            currentItem: null,
            currentIndex: -1,
            searchTitle: "",
            editableItem: false
        };

        this.setActiveItem = this.setActiveItem.bind(this);
        this.newItem = this.newItem.bind(this);
        this.toggleEditable = this.toggleEditable.bind(this);
        this.onFinishEdit = this.onFinishEdit.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       
        //console.log("prev " + prevProps.item._id);
        //console.log("curr " + this.props.item._id);
        //console.log("state " + this.state.currentItem._id);
/*
        let listItem = null;
        let index = -1;

        // set correct index in list
        if (this.state.currentIndex >= 0 && this.state.items.length > this.state.currentIndex) {
            listItem = this.state.items[this.state.currentIndex];
        }

            if (listItem == null || this.state.currentItem && this.state.currentItem._id !== listItem._id) {
                for (var i = 0; i < this.state.items.length; i += 1) {
                    console.log(this.state.items[i]["_id"] + ' ' + listItem._id);
    
                    if (this.state.items[i]["_id"] === listItem._id) {
                        index = i;
                    }
                }

                console.log("index " + index);
            }
        }

        if (this.state.currentIndex != index) {
            console.log("did update index "+ index);
            this.setState({
                currentIndex: index
            });
        }
*/
    }

    newItem() {
        this.setState({
            // set default values for category and topic from list in database
            currentItem: {
                name: "",
                description: "",
                topic: "Innovation",
                category: "Video",
                type: "",
                uri: "",
                embed_uri: "",
                author: "",
                rating: 0   
            },
            editableItem: true
        });
    }

    getItems(item = null) {
        /*
        ItemService.getAll()
        .then(response => {
            let index = -1;
            let items = response.data;

            if (item != null) {
                for (var i = 0; i < items.length; i += 1) {
                    // console.log(items[i]["_id"] + ' ' + item._id);
                    if (items[i]["_id"] === item._id) {
                        index = i;
                    }
                }
            }

            this.setState({
                items: items,
                currentItem: item,
                currentIndex: index,
                editableItem: false
            });
        })
        .catch(e => {
            console.log(e);
        });
        */
    }

    setActiveItem(item = null, index = -1) {
        console.log("index " + index);

        if (item != null && index < 0) {
            console.log("# items " + this.props.items.length)
            for (var i = 0; i < this.props.items.length; i += 1) {
                // console.log(items[i]["_id"] + ' ' + item._id);
                if (this.props.items[i]["_id"] === item._id) {
                    index = i;
                    console.log("index of " + item._id)
                }
            }
        }

        // added author property
        if (!item.hasOwnProperty('author')) {
            item.author ="";
        }
        if (!item.hasOwnProperty('rating')) {
            item.rating = 0.0;
        }

        this.setState({
            currentItem: item,
            currentIndex: index,
            editableItem: false
        });
    }

    onFinishEdit(item) {
        // console.log(item) hier wäre es aktualisiert
        let id = item._id;
        mutate(`/api/items/${id}`, item, false) // Update the local data without a revalidation
        this.setActiveItem(item)
    }

    toggleEditable() {
        this.setState(function (prevState) {
            return {
                editableItem: !prevState.editableItem
            };
        });
    }

    render() {
        //const items = this.state.items;
        const items = this.props.items;
        const currentIndex = this.state.currentIndex;

        return (
            <Container>
                <Row>
                    <Col xs={12} md={7}>
                        <Row>
                            <Col className="my-2"><Button onClick={this.newItem}><FaPlus /></Button></Col>
                        </Row>
                        <Row>
                            <ul className="list-group">
                                {items && items.map((item, index) => (
                                    <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                        onClick={() => this.setActiveItem(item, index)}
                                        key={index}
                                    >
                                        <Row>
                                            <Col>{item.name}</Col>
                                            <Col xs={2}>{item.topic}</Col>
                                            <Col xs={2}>{item.category}</Col>
                                        </Row>

                                    </li>
                                ))}
                            </ul>
                        </Row>
                    </Col>
                    <Col xs={12} md={5}>

                        <Col>{ this.state.currentItem && 
                           <ItemEdit 
                           item = {this.state.currentItem} 
                           edit = {this.state.editableItem} 
                           index = {this.state.currentIndex}
                           handleUpdate = {this.onFinishEdit}
                           toggleEditable = {this.toggleEditable}
                       />
                        }</Col>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ItemsList;