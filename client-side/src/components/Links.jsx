import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authentication'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    MERN Application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/users/list" className="nav-link">
                                List Users
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/users/register" className="nav-link">
                                Create User
                            </Link>
                        </Item>

                        {!isAuthenticated ?
                            <Link to="/users/login" className="nav-link">
                                Login User
                            </Link>
                            : <Link to="/users/login" className="nav-link" onClick={this.onLogout.bind(this)}>
                                Logout User
                            </Link>
                        }
                    </List>
                </Collapse>
            </React.Fragment >
        )
    }
}

Links.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Links));