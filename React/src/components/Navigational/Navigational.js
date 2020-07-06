import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../Navigational/Navigational.css'
import Auxilary from '../../HOC/Auxilary/Auxilary'
import { connect } from 'react-redux'

class Navigational extends React.Component {
    state = {
        login_logout: null,
        order: null
    }
    componentDidMount() {
        if (this.props.auth) {
            this.setState({ login_logout: <Link to="/logout" exact >Logout</Link> })
            this.setState({ order: <NavLink to='/order' exact>Orders</NavLink> })
        }
        else {
            this.setState({ login_logout: <NavLink to="/login" exact >Login</NavLink> })
        }
    }
    render() {
        return (
            <Auxilary>
                <div className="navigational">
                    <h1>
                        <NavLink activeStyle={{fontFamily:'Sacramento'}} to="/" exact>goGreen</NavLink>
                      
                        <NavLink to="/cart" exact >Cart</NavLink>
                        {this.state.order}
                        {this.state.login_logout}
                    </h1>
                </div>
            </Auxilary >
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: 'LOGOUT' })
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigational)