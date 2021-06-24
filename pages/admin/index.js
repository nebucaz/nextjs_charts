import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import Link from 'next/link'

import AccessDenied from '../../components/access-denied'

export default function Page() {
    const [session, loading] = useSession()
    const [content, setContent] = useState()

    // If no session exists, display access denied message
    if (!session) { return  <Layout><AccessDenied/></Layout> }

    return (
        <Layout>
            <h1>Admin dashboard</h1>
            <p>Admin entry page.</p>
            <ul>
                <li><Link href="/admin/items"><a>Items</a></Link></li>
            </ul>
        </Layout>
    )
}