import useSWR from 'swr'

import Layout from '../components/layout'
import Items from '../components/Item/Item'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Page () {
    const { data, error } = useSWR('/api/item', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    console.log("data")
    console.log(data)

    return (
    <Layout>
      <h1>Books</h1>
      <Items items={data}></Items>
    </Layout>
  )
}
