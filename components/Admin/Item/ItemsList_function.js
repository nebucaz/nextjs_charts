import React, { Component } from "react";
import useSWR from 'swr'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ItemsList() {
    const { items, error } = useSWR('/api/item', fetcher)

    if (error) return <div>failed to load</div>
    //if (!items) return <div>loading...</div>

    const newItem = () => {}
    // render data

    return (
        <Container>
            <Row>
                <Col xs={12} md={7}>
                    <Row>
                        <Col className="my-2"><Button onClick={newItem}><FaPlus /></Button></Col>
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

                    <Col>{this.state.currentItem &&
                        <p>Bla</p>
                    }</Col>

                </Col>
            </Row>
        </Container>
    )
}