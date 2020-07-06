import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class Logout extends Component {
    componentWillMount() {
        this.props.logout()
    }
    render() {
        return (
            <Redirect to="/"></Redirect>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: 'LOGOUT' })
    }
}

export default connect(null, mapDispatchToProps)(Logout)