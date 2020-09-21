import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/authentication'
import styled from 'styled-components'
import classnames from 'classnames'

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

class UsersRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: {}
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

    handleChangeInputPasswordConfirm = async event => {
        const passwordConfirm = event.target.value
        this.setState({ passwordConfirm })
    }

    handleIncludeUser = async () => {
        const { name, email, password, passwordConfirm } = this.state
        const payload = { name, email, password, passwordConfirm }

        // await api.registerUser(payload, this.props.history).then(res => {
        //     window.alert(`User inserted successfully`)
        //     this.setState({
        //         name: '',
        //         email: '',
        //         password: '',
        //         passwordConfirm: ''
        //     })
        // this.props.history.push("/users/list")
        // })

        this.props.registerUser(payload, this.props.history)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/users/list')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/users/list');
        }
    }

    render() {
        const { name, email, password, passwordConfirm, errors } = this.state
        return (
            <Wrapper>
                <Title>Create User</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    onChange={this.handleChangeInputName}
                />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}

                <Label>Email: </Label>
                <InputText
                    type="email"
                    value={email}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    onChange={this.handleChangeInputEmail}
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

                <Label>Password: </Label>
                <InputText
                    type="password"
                    value={password}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    onChange={this.handleChangeInputPassword}
                />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}

                <Label>Password Confirm: </Label>
                <InputText
                    type="password"
                    value={passwordConfirm}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    onChange={this.handleChangeInputPasswordConfirm}
                />
                {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}

                <Button href={'/users/list'} onClick={this.handleIncludeUser}>Add User</Button>
                <CancelButton href={'/users/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

UsersRegister.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(UsersRegister))