
//import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/layout'
import { useRouter } from 'next/router'

import AccessDenied from '../../../components/access-denied'

export default function Page() {
    const [session, loading] = useSession()
    //const [content, setContent] = useState()
    const router = useRouter()
    const { id } = router.query

    // If no session exists, display access denied message
    if (!session) { return  <Layout><AccessDenied/></Layout> }

    return (
        <Layout>
            <h1>Edit item {id}</h1>
        </Layout>
    )
}