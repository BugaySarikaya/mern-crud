import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authentication'
import classnames from 'classnames'

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

class UsersLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleIncludeUser = async () => {
        const { email, password } = this.state
        const payload = { email, password }

        // await api.loginUser(payload).then(res => {
        //     window.alert(`User login successfully`)
        //     this.setState({
        //         email: '',
        //         password: '',
        //     })
        // })
        this.props.loginUser(payload, this.props.history)
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/users/list');
        }
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

    render() {
        const { email, password, errors } = this.state
        return (
            <Wrapper>
                <Title>Login</Title>

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

                <Button onClick={this.handleIncludeUser}>Login</Button>
                <CancelButton href={'/users/register'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

UsersLogin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(UsersLogin)