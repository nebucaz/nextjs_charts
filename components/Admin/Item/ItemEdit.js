import React, { Component } from 'react';

//import Button from 'react-bootstrap/Button';
//import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';

//import ItemService from '../../../Services/itemService';

class ItemEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentItem: props.item,
            currentIndex: props.index,
            isEditable: props.edit ? props.edit : false,
            isDirty: false
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.itemOnChange = this.itemOnChange.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("did update");
        //console.log("prev " + prevProps.item._id);
        //console.log("curr " + this.props.item._id);
        //console.log("state " + this.state.currentItem._id);

        if (this.state.currentItem._id !== this.props.item._id) {
            this.setState({
                currentItem: this.props.item,
                currentIndex: this.props.index
            });
        }
    }

    toggleEdit() {
        if (this.props.edit) {
            console.log("saving");
           
            const item = this.state.currentItem;
            var data = {
                name: item.name,
                description: item.description,
                topic: item.topic,
                category: item.category,
                type: item.type,
                uri: item.uri,
                embed_uri: item.embed_uri,
                author: item.author,
                rating: item.rating
            };

/*
                // nein: const data = { ...this.state.currentItem};

            const data = this.state.currentItem.map((value, index) => {
                console.log(index + ' ' + value);
            });
                        console.log(data);
            let key;
            for (key in this.state.currentItem) {
                if (key === '_id') {
                    data['id'] = this.state.currentItem[key];
                }
                else {
                    data[key] = this.state.currentItem[key]; // copies each property to the objectCopy object
                }
            }
*/

            if (this.state.currentItem.hasOwnProperty("_id")) {
                ItemService.update(this.state.currentItem._id, data).then(response => {
                    console.log("saved successfully");
                    this.props.handleUpdate(response.data.item);
                }).catch(error => {
                    console.log(error);
                });
            }
            else {
                ItemService.create(data).then(response => {
                    console.log("created successfully");
                    this.props.handleUpdate(response.data.item);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
        this.props.toggleEditable();
    }

    cancelEdit() {
        this.props.toggleEditable();
    }

    deleteItem() {
        ItemService.delete(this.props.item._id).then(response => {
            console.log("deleted successfully");
            console.log(response);
            this.props.handleUpdate(null);
        }).catch(error => {
            console.log(error);
        });
    }

    itemOnChange(e) {
        const property = e.target.id;
        const value = e.target.value;

        this.setState(function (prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    [property]: value
                }
            };
        });
    }

    render() {
        const displayItem = this.props.item;
        const currentItem = this.state.currentItem;
        const isEditable = this.props.edit;

        return (
            <div>
                {currentItem ? (<form>
                    <Card style={{ width: '100%' }} className="itemCard">
                        <Card.Body>
                            {isEditable ?
                                <div className="form-group">
                                    <label htmlFor="name">Title</label>
                                    <Form.Control type="text"
                                        value={currentItem.name}
                                        id="name"
                                        onChange={this.itemOnChange}
                                    /> </div>
                                :
                                <Card.Title>{displayItem.name}</Card.Title>
                            }

                            {isEditable ? <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="form-control"
                                    value={currentItem.description}
                                    onChange={this.itemOnChange}
                                    id="description"
                                ></Form.Control> </div> :
                                <Card.Text>
                                    {displayItem.description}</Card.Text>
                            }
                            {isEditable ? <div className="form-group">
                                <label htmlFor="topic">Topic</label>
                                <Form.Control as="select" 
                                    id="topic" 
                                    value={currentItem.topic}
                                    onChange={this.itemOnChange}>
                                    <option value="Innovation">Innovation</option>
                                    <option value="IT-Architecture">IT Architektur</option>
                                </Form.Control>
                            </div> :
                                <p>Topic: <strong>{displayItem.topic}</strong></p>
                            }
                            {isEditable ? <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <Form.Control 
                                as="select" 
                                id="category" 
                                value={currentItem.category}
                                onChange={this.itemOnChange}>
                                    <option value="Video">Video</option>
                                    <option value="Book">Book</option>
                                </Form.Control>
                            </div> :
                                <p>Category: <strong>{displayItem.category}</strong></p>
                            }
                            {isEditable ? <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <Form.Control 
                                id="author" 
                                type="text"
                                value={currentItem.author}
                                onChange={this.itemOnChange}></Form.Control>
                            </div> :
                                <p>Author: <strong>{displayItem.author}</strong></p>
                            }
                            
                            {isEditable ? <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <Form.Control 
                                id="rating" 
                                type="text"
                                value={currentItem.rating}
                                onChange={this.itemOnChange}></Form.Control>
                            </div> :
                                <p>Rating: <strong>{displayItem.rating}</strong></p>
                            }
                            {currentItem.category === 'video' && <div>
                               { isEditable ? <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <Form.Control as="select" 
                                    id="type"
                                    value={currentItem.type}
                                    onChange={this.itemOnChange}>
                                    <option value="youtube">youtube</option>
                                </Form.Control>
                            </div> :
                                <p>Type: <strong>{displayItem.type}</strong></p>
                            }
                            </div>
                            }
                            { isEditable ? <div className="form-group">
                                <label htmlFor="uri">URL</label>
                                <Form.Control type="text"
                                    value={currentItem.uri}
                                    id="uri"
                                    onChange={this.itemOnChange}
                                />
                            </div> :
                                <p><a href={displayItem.uri}>URL</a></p>
                            }

                            {currentItem.category === 'video' && <div>
                                { isEditable ? <div className="form-group">
                                <label htmlFor="embed_uri">Embed</label>
                                <Form.Control as="textarea"
                                    value={currentItem.embed_uri}
                                    id="embed_uri"
                                    onChange={this.itemOnChange}
                                />
                                </div> :
                                    <p><Link to={displayItem.embed_uri}>Embed</Link></p>
                                }
                                </div> 
                            }
                            <Card.Text></Card.Text>

                            {isEditable ? 
                                <div>
                                    <Button className="mr-2" size="sm" onClick={this.cancelEdit} variant="secondary"><FaTimes /> Cancel</Button>
                                    <Button className="mr-2" size="sm" onClick={this.toggleEdit} variant="success"><FaCheck /> Save</Button>
                                    {this.state.currentItem.hasOwnProperty('_id') &&
                                        <Button size="sm" onClick={this.deleteItem} variant="danger">Delete</Button>
                                    }
                                </div>
                                :
                                <div>
                                    <Button className="mr-2" size="sm" onClick={this.toggleEdit} variant="primary"><FaEdit /> Edit</Button>
                                </div>
                            }
                        </Card.Body>

                    </Card>
                </form>
                ) : (<span>No item</span>)}
            </div>
        )
    }
}

export default ItemEdit;

/*
<Form.Text id="passwordHelpBlock" muted>
    Your password must be 8-20 characters long, contain letters and numbers, and
    must not contain spaces, special characters, or emoji.
  </Form.Text>

  {isEditable && 
                                <Card.Link onClick={this.cancelEdit}><FaTimes /></Card.Link>
                            }
                            <Card.Link onClick={this.toggleEdit}>{isEditable ? <FaCheck /> : <FaEdit />} </Card.Link>
                   
  */