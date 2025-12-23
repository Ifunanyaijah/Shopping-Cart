//components/UserCartComponent.js

import React from 'react';

function UserCartComponent({
  cartCourses,
  deleteCourseFromCartFunction,
  totalAmountCalculationFunction,
  setCartCourses,
}) {
  
  // Handle quantity increment
  const handleIncrement = (productId) => {
    setCartCourses((prevCartCourses) =>
      prevCartCourses.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Handle quantity decrement
  const handleDecrement = (productId) => {
    setCartCourses((prevCartCourses) =>
      prevCartCourses.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(item.quantity - 1, 0);
          if (newQuantity === 0) {
            // Option 1: Remove item when quantity reaches 0
            // This would need to be handled by parent component or
            // call deleteCourseFromCartFunction here
            return item; // Keep for now, but quantity will be 0
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Filter out items with quantity 0 (cleanup)
  React.useEffect(() => {
    const hasZeroQuantity = cartCourses.some(item => item.quantity === 0);
    if (hasZeroQuantity) {
      setCartCourses(prev => prev.filter(item => item.quantity > 0));
    }
  }, [cartCourses, setCartCourses]);

  return (
    <div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
      <h2>My Cart</h2>
      {cartCourses.length === 0 ? (
        <p className="empty-cart">Geek, your cart is empty.</p>
      ) : ( //checks if anything is in cart with length=0, 
      // if cart has items then active for css stylong for empty or full cart
        <div className="cart-content">
          <ul className="cart-items-list">
            {cartCourses.map((item) => {
              // Ensure quantity is at least 1
              const quantity = Math.max(item.quantity, 1);
              //else block if cart is occupied then displays items the qunty checks for qty always at least 1
              return (
                <li key={item.product.id} className="cart-item">
                  <div className="cart-item-content">
                    <div className="item-info">
                      <div className="item-image">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80';
                            e.target.alt = 'Image not available';
                          }}//if there is an error what displays instead
                        />
                      </div>
                      <div className="item-details">
                        <h3>{item.product.name}</h3>
                        <p className="item-price">Price: ${item.product.price}</p>
                        <p className="item-subtotal">
                          Subtotal: ${item.product.price * quantity}
                        </p>
                      </div>
                    </div> 
                    <div className="item-controls">
                      <div className="item-actions">
                        <button
                          className="remove-button"
                          onClick={() => deleteCourseFromCartFunction(item.product)}
                        >
                          Remove Product
                        </button>
                        <div className="quantity-control">
                          <button 
                            className="quantity-btn minus-btn"
                            onClick={() => handleDecrement(item.product.id)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="quantity-display">{quantity}</span>
                          <button 
                            className="quantity-btn plus-btn"
                            onClick={() => handleIncrement(item.product.id)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );//button controls with respective onclick functions and their arg
            })}
          </ul>
          <div className="checkout-section">
            <div className="checkout-total">
              <p className="total">
                Total Amount: ${totalAmountCalculationFunction()}
              </p>
            </div>
            <button
              className="checkout-button"
              disabled={cartCourses.length === 0 || totalAmountCalculationFunction() === 0}
              onClick={() => {
                if (cartCourses.length > 0 && totalAmountCalculationFunction() > 0) {
                  // Handle checkout logic here
                  console.log('Proceeding to payment:', cartCourses); //if it is not=0, then print out the total
                  //then it 0, the button for total is displayed
                }
              }}
            >
              Proceed to Payment
            </button>
          </div> 
        </div>
      )}
    </div>
  );
}

export default UserCartComponent;
