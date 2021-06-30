import useSWR from 'swr'
//import {mutate} from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../../../components/layout'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa';

//import ItemsList from '../../../components/Admin/Item/ItemsList'
import ItemService from '../../../utils/ItemService'
import ItemEdit from '../../../components/Admin/Item/ItemEdit'
import AccessDenied from '../../../components/access-denied'


export default function Users() {
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const [session, loading] = useSession()
    const [state, setState] = useState({
        currentIndex: -1,
        currentItem: null,
        editableItem: false

    })

    const { data, error } = useSWR('/api/user', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const setActiveUser = (user, index) => {

    }
    return (
        <Layout>
            <h1>Items Admin</h1>
            <Container>
                <Row>
                    <Col xs={12} md={7}>
                        <Row>
                            <ul className="list-group">
                                {data && data.map((user, index) => (
                                    <li className={"list-group-item " + (index === state.currentIndex ? "active" : "")}
                                        onClick={() => setActiveUser(user, index)}
                                        key={index}
                                    >
                                        <Row>
                                            <Col>{user.enmail}</Col>
                                        </Row>

                                    </li>
                                ))}
                            </ul>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}