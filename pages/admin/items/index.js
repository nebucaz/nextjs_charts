import useSWR from 'swr'
import {mutate} from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../../../components/layout'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa';

//import ItemsList from '../../../components/Admin/Item/ItemsList'
import ItemService from '../../../utils/ItemService'
import ItemEdit from '../../../components/Admin/Item/ItemEdit'
import AccessDenied from '../../../components/access-denied'


export default function Items() {
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const [session, loading] = useSession()
    const [state, setState] = useState({
        currentIndex: -1,
        currentItem: null,
        editableItem: false

    })

    const { data, error } = useSWR('/api/item', fetcher)
    //var { item, isLoading } = ItemService.useItem("")

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    // If no session exists, display access denied message
    if (!session) { return <Layout><AccessDenied /></Layout> }

    const setActiveItem = (item, index) => {
        if (item != null) {
            for (var i = 0; i < data.length; i += 1) {
                // console.log(items[i]["_id"] + ' ' + item._id);
                if (data[i]["_id"] === item._id) {
                    index = i;
                    data[i] = item
                }
            }
        }

        setState({
            currentIndex: index,
            currentItem: item
        })
    }

    const onFinishEdit = (item) => { 
        //let id = item._id;
        //mutate(`/api/items/${id}`, item, false) // Update the local data without a revalidation
        mutate(`/api/item`)
        setActiveItem(item)
    }

    const toggleEditable = () => {
        setState(prevState => {
            // Object.assign would also work
            return { ...prevState, ...{ editableItem: !prevState.editableItem } };
        });
    }

    const newItem = () => {
        setState({
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

    return (
        <Layout>
            <h1>Items Admin</h1>
            <Container>
                <Row>
                    <Col xs={12} md={7}>
                        <Row>
                            <Col className="my-2"><Button onClick={newItem}><FaPlus /></Button></Col>
                        </Row>
                        <Row>
                            <ul className="list-group">
                                {data && data.map((item, index) => (
                                    <li className={"list-group-item " + (index === state.currentIndex ? "active" : "")}
                                        onClick={() => setActiveItem(item, index)}
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
                        <Col>{state.currentItem &&
                            <ItemEdit
                                item={state.currentItem}
                                edit={state.editableItem}
                                index={state.currentIndex}
                                handleUpdate={onFinishEdit}
                                toggleEditable={toggleEditable}
                            />
                        }</Col>

                    </Col>
                </Row>
            </Container>
        </Layout >
    )


}

/*
import dbConnect from '../../../utils/dbConect'
import Item from '../../../models/Item'

// Retrieves pet(s) data from mongodb database
export async function getServerSideProps() {
    await dbConnect()

    // find all the data in our database
    const result = await Item.find({})
    const items = result.map((doc) => {
      const item = doc.toObject()
      item._id = item._id.toString()
      return item
    })

    return { props: { items: items } }
  }



    const [state, setState] = useState({
        items: [],
        currentItem: null,
        currentIndex: -1,
        searchTitle: "",
        editableItem: true
    });


    //const items = ItemService.getAll()

    //if (error) return <div>failed to load</div>
    //if (!items) return <div>loading...</div>

    const newItem = () => {
        console.log("new item")
        console.log(items)
    }

    const getItems = (item = null) => {

            }

            const setActiveItem = (item, index) => {
                setState({
                    currentItem: item,
                    currentIndex: index,
                    editableItem: false
                });
            }

            const onFinishEdit = (item) => {
                getItems(item);
            }

            const toggleEditable = () => {
                console.log("toggle editable " + state.editableItem)

                setState(prevState => {
                    // Object.assign would also work
                    return { ...prevState, ...{ editableItem: !prevState.editableItem } };
                })


            }

            const setEdit = () => {
                setState(prevState => {
                    // Object.assign would also work
                    return { ...prevState, ...{ editableItem: true } };
                })

            }

  */
