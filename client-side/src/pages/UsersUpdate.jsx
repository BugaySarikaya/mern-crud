import React, { Component } from 'react'
import apis from '../actions/authentication'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class UsersUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            email: '',
            password: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleUpdateUser = async () => {
        const { id, name, email, password } = this.state
        const payload = { name, email, password }

        await apis.updateUserById(id, payload).then(res => {
            window.alert(`User updated successfully`)
            this.setState({
                name: '',
                email: '',
                password: '',
            })
            this.props.history.push('/users/list')
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const user = await apis.getUserById(id)

        this.setState({
            name: user.data.data.name,
            email: user.data.data.email,
            password: user.data.data.password,
        })
    }

    render() {
        const { name, email } = this.state
        return (
            <Wrapper>
                <Title>Create User</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Email: </Label>
                <InputText
                    type="email"
                    value={email}
                    onChange={this.handleChangeInputEmail}
                />

                <Button onClick={this.handleUpdateUser}>Update User</Button>
                <CancelButton href={'/users/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UsersUpdate