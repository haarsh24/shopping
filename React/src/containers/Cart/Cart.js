import React from 'react'
import { Redirect } from 'react-router-dom'
import Navigational from '../../components/Navigational/Navigational'
import Auxilary from '../../HOC/Auxilary/Auxilary'
import { connect } from 'react-redux'
import axios from '../../axios'
import CartDisplay from '../../components/UI/CartViewer/CartViewer'
import './Cart.css'

class Cart extends React.Component {
    state = {
        cart: [],
        products: [],
        loading: false
    }
    addToCart = (id) => {
      
        const cart = {
            cart: {
                quantity: 1,
                productId: id
            }
        }
        if (this.props.auth) {
            axios.post('/cart', cart, {
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(response => {
                    axios.get('/cart', {
                        headers: {
                            Authorization: 'Bearer ' + this.props.token //the token is a variable which holds the token
                        }
                    })
                        .then(response => {
                            this.setState({
                                cart: response.data
                            })
                        })
                        .catch(error => {
                            this.setState({ error: true })
                        });
                })
                .catch(error => {
                })
        }
    }
    removeFromCart = (id) => {
        
        const cart = {
            cart: {
                productId: id
            }
        }
        // console.log(this.state.loading)
        axios.patch('cart', cart, {
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
            .then(response => {
                axios.get('/cart', {
                    headers: {
                        Authorization: 'Bearer ' + this.props.token //the token is a variable which holds the token
                    }
                })
                    .then(response => {
                        this.setState({
                            cart: response.data
                        })
                    })
                    .catch(error => {
                        this.setState({ error: true })
                    });
            }).catch(error => {

            })
    }
    placeOrder = () => {
        const token = this.props.token
        const cart = {
            cart: this.state.cart
        }
        axios.post('order', cart, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                this.setState({ cart: [] })
            })
            .catch(error => {

            })
    }
    componentDidMount() {
        const token = this.props.token
        if (this.props.auth) {
            axios.get('/cart', {
                headers: {
                    Authorization: 'Bearer ' + token 
                }
            })
                .then(response => {
                    this.setState({
                        cart: response.data
                    })
                })
                .catch(error => {
                    this.setState({ error: true })
                });
        }
       
    }
    render() {
        let login = null
        let product = null
        let orderButton = null
        if (!this.props.auth)
            login = <Redirect to='/login'></Redirect>
        product = this.state.cart.map(product => {
            return (
                < CartDisplay key={product.brand}
                    name={product.name}
                    brand={product.brand}
                    quantity={product.quantity}
                    price={product.price}
                    addToCart={this.addToCart}
                    removeFromCart={this.removeFromCart}
                    id={product.id}></ CartDisplay >
            )
        })
        if (this.state.cart.length !== 0)
            orderButton = <button className='PlaceOrder' onClick={this.placeOrder.bind(this)}>Place Order</button>
        else {
            orderButton = <h1>Cart is Empty</h1>
        }
        return (
            <Auxilary >
                {login}
                < Navigational />
                <div className='Div'>
                    {product}
                </div>
                {this.props.auth}
                {orderButton}
            </Auxilary >
        )
    }
}

const mapStatetoProps = state => {
    return {
        auth: state.authenticated,
        token: state.token
    }
}

export default connect(mapStatetoProps)(Cart)