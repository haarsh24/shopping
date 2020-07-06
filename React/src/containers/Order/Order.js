import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from '../../axios'
import Auxilary from '../../HOC/Auxilary/Auxilary'
import OrderViewer from '../../components/UI/OrderViewer/OrderViewer'
import Navigational from '../../components/Navigational/Navigational'

class Order extends React.Component {
    state = {
        orders: []
    }
    componentWillMount() {
        axios.get('order', {
            headers: {
                authorization: 'Bearer ' + this.props.token
            }
        }).then(response => {
            this.setState({ orders: response.data })
        })
    }
    render() {
        let login = null
        let orders = this.state.orders.map(order => {
            return (
                <div>
                    <h1>Order</h1>
                    <OrderViewer order={order} key={Math.random()}></OrderViewer>
                </div>
            )
        })
        if (!this.props.auth)
            login = <Redirect to='/login'></Redirect>
        return (
            <Auxilary>
                {login}
                <Navigational />
                {orders}
            </Auxilary>
        )
    }
}

const mapStateToPros = state => {
    return {
        token: state.token,
        auth: state.authenticated
    }
}


export default connect(mapStateToPros)(Order)