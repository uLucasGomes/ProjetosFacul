import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

import { MdVideogameAsset } from 'react-icons/md'

const Rodape = () => {
    return (
<Navbar bg="dark" fixed="bottom">
    <Navbar.Brand href="#inicio" className="text-light">
        <MdVideogameAsset/> E-Games &copy; 
    </Navbar.Brand>
</Navbar>
    )
}

export default Rodape