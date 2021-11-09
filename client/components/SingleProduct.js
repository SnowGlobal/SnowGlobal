import React from 'react'

const hardCodeData = {
  "productId": "73-0144764",
  "name": "Oriental short-clawed otter Snowglobe",
  "price": 12,
  "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  "imageUrl": "http://dummyimage.com/x.png/5fa2dd/ffffff",
  "inventory": 51,
  "category": "small",
  "rating": 0
}

const singleProduct = (props) => {

  return (
    <div className="single-product">
      <div className="single-product__image">
        <img src={hardCodeData.imageUrl} alt=""/>
      </div>
      <div className="single-product__info">
        <h2>{hardCodeData.name}</h2>
        <p>{hardCodeData.description}</p>
        <p>{hardCodeData.price}</p>
        <p>{hardCodeData.inventory}</p>
        <p>{hardCodeData.category}</p>
        <p>{hardCodeData.rating}</p>
      </div>
    </div>
  )
}

export default singleProduct;
