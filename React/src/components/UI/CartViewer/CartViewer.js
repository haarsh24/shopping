import React from 'react'
import './CartViewer.css'

const CartViewer = (props) => {

    const path = '/' + props.name + props.brand + '.jpg'
    console.log(props.id)
    return (
        <article className="ProductsDispaly">
            <img src={path} alt=''></img>
            <h1> {props.name} </h1>
            <div className="name">{props.brand}</div>
            <div className="Name">Quantity : {props.quantity}</div>
            <div className="Name">Price : {props.price}</div>
            <button className='remove' onClick={() => props.removeFromCart(props.id)}>Remove</button>
            <button className='add' onClick={() => props.addToCart(props.id)}>Add</button>
        </article >
    )
}


export default CartViewer

