import React from 'react'


const OrderViewer = (props) => {
    let order = []
    for (let i = 0; i < props.order.length; i++) {
        const path = '/' + props.order[i].name + props.order[i].brand + '.jpg'
        order.push(
            <article className="ProductsDispaly">
                <img src={path} alt=''></img>
                <h1> {props.order[i].name} </h1>
                <div className="Info">
                    <div className="Name">{props.order[i].brand}</div>
                    <div className="Name">Quantity : {props.order[i].quantity}</div>
                    <div className="Name">Price : {props.order[i].price * props.order[i].quantity}</div>
                </div>
            </article >
        )
    }
    return (
        order
    )
}

export default OrderViewer 