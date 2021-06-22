import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

import Image from 'next/image'
import { Navbar, Nav, NavDropdown, NavItem, Button, Dropdown, NavLink } from 'react-bootstrap'

// https://react-icons.github.io/react-icons/icons?name=fa
import { FaUserCircle } from 'react-icons/fa';

import styles from './header.module.css'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const [session, loading] = useSession()

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <Image
                        alt=""
                        src="/assets/Rocket.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    InnoCharts
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Kategorie" id="nav-dropdown">
                            <NavDropdown.Item eventKey="3.1" href="/Video">Video</NavDropdown.Item>
                            <NavDropdown.Item eventKey="3.2" href="/Book">Bücher</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#deets">Experten</Nav.Link>
                        <Nav.Link href="#deets">Neuheiten</Nav.Link>
                        <NavDropdown title="Über" id="nav-dropdown">
                            <NavDropdown.Item eventKey="4.1" href="/about">Über</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2">Kontakt</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2">Zur Bewertung vorschlagen</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Examples" id="nav-dropdown">
                            <NavDropdown.Item eventKey="5.1" href="/client">Client</NavDropdown.Item>
                            <NavDropdown.Item eventKey="5.2" href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item eventKey="5.3" href="/server">Server</NavDropdown.Item>
                            <NavDropdown.Item eventKey="5.3" href="/protected">Protected</NavDropdown.Item>
                            <NavDropdown.Item eventKey="5.3" href="/api-example">api</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav variant="pills">
                        {session && <>
                            <Dropdown as={NavItem}>
                                <Dropdown.Toggle as={NavLink} >
                                    {session.user.image && <span style={{ backgroundImage: `url(${session.user.image})` }} className={styles.avatar} />}
                                    {!session.user.image && <FaUserCircle />}

                                </Dropdown.Toggle>
                                <Dropdown.Menu align="right">
                                    {session.user && <>
                                        <Dropdown.Item disabled>{session.user.email || session.user.name}</Dropdown.Item>
                                        <Dropdown.Divider />
                                    </>}
                                    <Dropdown.Item href={`/profile`}>Profil</Dropdown.Item>
                                    <Dropdown.Item href={`/api/auth/signout`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            signOut()
                                        }}
                                    >Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>}
                        {!session && <>
                            <div>
                                <Button variant="outline-primary" size="sm"
                                    href={`/api/auth/signin`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signIn()
                                    }}>Sign In</Button>{' '}
                            </div>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </header>
    )
}

/*

 <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
        </p>
      </div>

    */