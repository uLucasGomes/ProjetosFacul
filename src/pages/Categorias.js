import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'


import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'
import { BACKEND } from '../constants'

import { MdVideogameAsset, MdFace, MdSave, MdModeEdit, MdDelete, MdCancel } from 'react-icons/md'

const Categorias = () => {
    const valorInicial = { nome: '', nick: '', rank:'', personagem:'', fone:''}

    const [categoria, setCategoria] = useState(valorInicial)
    const [categorias, setCategorias] = useState([])
    const [carregandoCategorias, setCarregandoCategorias] = useState(false)
    const [salvandoCategorias, setSalvandoCategorias] = useState(false)
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    const [aviso, setAviso] = useState('')
    const [erros, setErros] = useState({})

    const { nome, nick, rank, personagem, fone} = categoria

    async function obterCategorias() {
        setCarregandoCategorias(true)
        let url = `${BACKEND}/categorias`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCategorias(data)
                console.log(data)
            })
            .catch(function (error) {
                console.error(`Erro ao obter as categorias: ${error.message}`)
            })
        setCarregandoCategorias(false)

    }

    useEffect(() => {
        document.title = 'Cadastro de Categorias'
        obterCategorias()
    }, [])

    const validaErrosCategoria = () => {
        const novosErros = {}
        
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio'
        else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo'
        else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto'
        return novosErros
    }

    const alteraDadosCategoria = e => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
        setErros({})
    }

    async function salvarCategoria(e) {
        e.preventDefault() 
        const novosErros = validaErrosCategoria()
        
        if (Object.keys(novosErros).length > 0) {
            
            setErros(novosErros)
        } else {
            const metodo = categoria.hasOwnProperty('_id') ? 'PUT' : 'POST'
            categoria.status = (categoria.status === true || categoria.status === 'ativo') ? 'ativo' : 'inativo'
            setSalvandoCategorias(true)
            let url = `${BACKEND}/categorias`
            await fetch(url, {
                method: metodo,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoria)
            }).then(response => response.json())
                .then(data => {
                    (data._id || data.message) ? setAviso('Registro salvo com sucesso') : setAviso('')
                    setCategoria(valorInicial) //limpa a tela
                    obterCategorias()
                }).catch(function (error) {
                    console.error(`Erro ao salvar a categoria: ${error.message}`)
                })
            setSalvandoCategorias(false)
        }
    }

    async function excluirCategoria() {
        let url = `${BACKEND}/categorias/${categoria._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                data.message ? setAviso(data.message) : setAviso('')
                setCategoria(valorInicial)
                obterCategorias()
            })
            .catch(function (error) {
                console.error(`Erro ao excluir a categoria: ${error.message}`)
            })
    }

    return (
        <>
            <Container fluid className="p-0">
                <Cabecalho />
                <Row className="bg text-dark">
                    <Col>
                        <h3><MdVideogameAsset /> Inscrição para o 1° campeonato FATEC ITU de Valorant</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        
                        <h4><MdFace /> Cadastro dos jogadores</h4>
                        <Form method="post">
                            <Form.Group controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    name="nome"
                                    placeholder=""
                                    onChange={alteraDadosCategoria}
                                    value={nome}
                                    isInvalid={!!erros.nome}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {erros.nome}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                           
                            <Form.Label>Nick</Form.Label>
                                <Form.Control
                                    name="nick"
                                    placeholder=""
                                    onChange={alteraDadosCategoria}
                                    value={nick}
                                    isInvalid={false}
                                />
                            <Form.Label>Rank</Form.Label>
                                <Form.Control
                                    name="rank"
                                    placeholder=""
                                    onChange={alteraDadosCategoria}
                                    value={rank}
                                    isInvalid={false}
                                />
                            <Form.Label>Personagem</Form.Label>
                                <Form.Control
                                    name="personagem"
                                    placeholder=""
                                    onChange={alteraDadosCategoria}
                                    value={personagem}
                                    isInvalid={false}
                                />
                            <Form.Label>Fone</Form.Label>
                                <Form.Control
                                    name="fone"
                                    placeholder=""
                                    onChange={alteraDadosCategoria}
                                    value={fone}
                                    isInvalid={false}
                                />
                            <Button variant="primary" type="submit" title="Salvar o registro"
                                onClick={(e) => salvarCategoria(e)}>
                                {salvandoCategorias
                                    ? <Spinner animation="border" size="sm" />
                                    : <MdSave />
                                }
                             Salvar
                            </Button>
                            &nbsp;
                            <Button variant="danger" type="button" title="Cancelar"
                            onClick={()=> setCategoria(valorInicial)}>
                                <MdCancel/> Cancelar
                            </Button>
                        </Form>
                    </Col>

                    <Col xs={12} lg={6}>

                        
                        {carregandoCategorias &&
                            <>
                                <Spinner animation="border" size="sm" />
                                <Spinner animation="grow" variant="info" />
                                <p>Aguarde, enquanto as categorias são carregadas...</p>
                            </>
                        }
                        <Table striped bordered hover>
                            <thead>
                                <tr className="bg-warning text-dark">
                                    <th>Nome</th>
                                    <th>Nick</th>
                                    <th>Rank</th>
                                    <th>Personagem</th>
                                    <th>Fone</th>
                                    <th>Inclusão</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.nome}</td>
                                        <td>{item.nick}</td>
                                        <td>{item.rank}</td>
                                        <td>{item.personagem}</td>
                                        <td>{item.fone}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Button variant="outline-primary" title="Editar o registro"
                                                onClick={() => setCategoria(item)}>
                                                <MdModeEdit />
                                            </Button>
                                            &nbsp;
                                            <Button variant="outline-danger" title="Apagar o registro"
                                                onClick={() => {
                                                    setCategoria(item)
                                                    setConfirmaExclusao(true)
                                                }} >
                                                <MdDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-dark text-light">
                                    <td colspan="6">Total de Registros:</td>
                                    <td>{categorias.length}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                   <Modal animation={false} show={confirmaExclusao} onHide={() => setConfirmaExclusao(false)}>
                    <Modal.Header>
                        <Modal.Title>Confirmação da Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Confirma a exclusão da categoria selecionada?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setConfirmaExclusao(!confirmaExclusao)}>
                            ❌Cancelar
                            </Button>
                        <Button variant="success"
                            onClick={() => {
                                setConfirmaExclusao(!confirmaExclusao)
                                excluirCategoria()
                            }}>
                            ✔️Confirmar
                            </Button>
                    </Modal.Footer>
                </Modal>

                <Toast
                    onClose={() => setAviso('')}
                    show={aviso.length > 0}
                    animation={false}
                    delay={4000}
                    autohide
                    className="bg-success"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10
                    }}>
                    <Toast.Header>Aviso</Toast.Header>
                    <Toast.Body classname="text-light">{aviso}</Toast.Body>
                </Toast>

                <Rodape />
            </Container>
        </>
    )
}

export default Categorias