import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'

import Layout from '../../../components/layout'
import ItemsList from '../../../components/Admin/Item/ItemsList'
//import ItemEdit from '../../../components/Admin/Item/ItemEdit'
//import ItemService from '../../../utils/ItemService'

import AccessDenied from '../../../components/access-denied'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Items() {

    const [session, loading] = useSession()
    //const [content, setContent] = useState()
    const { data, error } = useSWR('/api/item', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    // If no session exists, display access denied message
    if (!session) { return <Layout><AccessDenied /></Layout> }

    return (
        <Layout>
            <h1>Items Admin</h1>
            <ItemsList items={data}></ItemsList>
        </Layout>
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
