import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { MdVideogameAsset, MdHome,
MdMailOutline, MdGames, } from 'react-icons/md'

const Cabecalho = () => {

    return (
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#inicio"><MdGames/> E-Games </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#inicio"><MdHome/> Início</Nav.Link>
      <Nav.Link href="#contato"><MdMailOutline/> Contato</Nav.Link>
      <DropdownButton 
        as={ButtonGroup}
        menuAlign={{ lg: 'right'}}
        title="Cadastro"
        id="cadastros">
            <Dropdown.Item eventKey="1" href="#/categorias"><MdVideogameAsset/> Categorias</Dropdown.Item>
           
        </DropdownButton>
    </Nav>
  </Navbar>
    )
}

export default Cabecalho