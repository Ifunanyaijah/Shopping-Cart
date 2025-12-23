import React from 'react'

const ShowCoursecomponent = ({courses, filterCourseFunction, addCourseToCartFunction }) => {
  return (
    <div className='product-list'>
      {filterCourseFunction.length === 0 ? (
        <p className='no-results'>Sorry, no Products found.</p>
//if nothing found in search, if it returns 0//
      ): (
        filterCourseFunction.map((product) => (
          <div className='product' key={product.id}> 
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>Price:${product.price}</p>
          
          <button className='add-to-cart-button' onClick={() => addCourseToCartFunction(product)}>
            Add to cart
          </button>
          </div>
        ))
      )}
      
    </div>
  );
  //else block, here the map takes properties of the referenced product like id and price, 
  // then the button has an onclick function that takes product as an argument//
}

export default ShowCoursecomponent
