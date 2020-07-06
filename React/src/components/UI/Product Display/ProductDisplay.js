import React from 'react'
import './ProductDisplay.css'
const ProductDisplay = props => {
    const path = '/' + props.name + props.brand + '.jpg'
    return (
        <article className="ProductsDispaly">
            <img src={path} alt=''></img>
            <h1> {props.name} </h1>
            <div className="Info">
                <div className="Name">{props.brand}</div>
                <div className="Name">Price : {props.price}</div>
            </div>
            <button className='remove' onClick={() => props.removeFromCart(props.id)}>Remove</button>
            <button className='add' onClick={() => props.addToCart(props.id)}>Add</button>
        </article >
    )
}

export default ProductDisplay