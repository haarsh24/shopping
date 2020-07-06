import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navigational from '../../components/Navigational/Navigational'
import './home.css'
import ProductDisplay from '../../components/UI/Product Display/ProductDisplay';
import axios from '../../axios'
import Auxilary from '../../HOC/Auxilary/Auxilary'
import { connect } from 'react-redux'

class Home extends Component {
    state = {
        products: [],
        error: false,
        login: false
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
                })
                .catch(error => {
                })
        }
        else {
            alert('Login First')
            this.setState({ login: true })
        }
    }
    removeFromCart = (id) => {
        const cart = {
            cart: {
                productId: id
            }
        }
        axios.patch('cart', cart, {
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
            .then(response => {
                console.log(response)
            }).catch(error => {

            })
    }
    componentDidMount() {
        axios.get('/product')
            .then(response => {
                this.setState({
                    products: response.data
                })
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }
    render() {
        let products = null
        let login = null
        if (this.state.error)
            products = <h1>There is some connectivity issue</h1>
        else if (this.state.login) {
            login = <Redirect to='/login'></Redirect>
        }
        else {
            products = this.state.products.map(product => {
                return <ProductDisplay
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    brand={product.brand}
                    addToCart={this.addToCart}
                    removeFromCart={this.removeFromCart}
                    price={product.price}
                />;
            });
        }
        return (
            <Auxilary>
                <div className='body'>
                    <section>
                        {login}
                        <Navigational />
                    </section>
                    <section className="ProductDisplay">
                        {products}
                    </section>
                </div>
            </Auxilary>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authenticated,
        token: state.token
    }
}


export default connect(mapStateToProps)(Home)


