import Layout from '../components/layout'
import { useSession, getSession } from 'next-auth/client'

export default function Profile() {
    const [ session, loading ] = useSession()

    return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
  </>
};

  /*
  export async function getServerSideProps({ req, res }) {
    // Get the user's session based on the request
    const session = await getSession({ req })

    if (!session) {
      // If no user, redirect to login
      return {
        props: {},
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }
  
    // If there is a user, return the current session
    return { props: { session } };
  }
  
*/