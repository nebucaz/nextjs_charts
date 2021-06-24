import React, { Component } from "react";
//import axios from 'axios';
import './Item.module.css';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'


class Items extends Component {
    constructor(props) {
        super(props)
        this.state= {
            items: []
        }
    }

    componentDidMount() {
/*
        const params = this.props.match.params;
        let query = "";
        if ('category' in params) {
            const cat = params.category;
            query = "?c=" + cat.charAt(0).toUpperCase() + cat.slice(1);;
        }

        axios.get("/api/item" + query).then(res => {
            this.setState({ 
                items: res.data || []
            });
        })
        */
        console.log("mount");
    }

    componentDidUpdate() {
        console.log("update");
    }

    renderItem = (item) => {
        return (
            <ListGroup.Item key={item._id} className="list_item item">
                <Row>
                    <Col>
                        <h3 className="item_name">{item.name} <Badge pill variant="primary">{item.category}</Badge>{' '}</h3>
                        <p className="item_description">{item.description}</p>
                        <div className="rating">{item.rating}</div>
                        </Col>

                    <Col xs={4} className="rightCol">
                        {item.type === 'youtube' && item.embedUri.length > 0 &&
                            <iframe width="280" height="150" src={item.embedUri} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        }
                    </Col>
                </Row>
              
            </ListGroup.Item>
          );
    } 

    render() {
        const items = this.props.items

        return (
            <ListGroup>
                {(items && items.length > 0) ? (
                  items.map(item => this.renderItem(item))
                ) : (
                  <p>No items found</p>
                )}
            </ListGroup>
          );
    }
}

export default Items; 

/*
<Media>
  <img
    width={64}
    height={64}
    className="mr-3"
    src="holder.js/64x64"
    alt="Generic placeholder"
  />
  <Media.Body>
    <h5>Media Heading</h5>
    <p>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
      ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
      tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
      Donec lacinia congue felis in faucibus.
    </p>
  </Media.Body>
</Media>
*/