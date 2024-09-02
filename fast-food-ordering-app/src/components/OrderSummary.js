import React from 'react';

const OrderSummary = ({ order, updateQuantity, totalPrice }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Order Summary</h5>
        {order.length === 0 ? (
          <p>Your order is empty.</p>
        ) : (
          <ul className="list-group">
            {order.map((item) => (
              <li className="d-flex justify-content-between align-items-center" key={item.id}>
                <div className='itemsize'>{item.name}</div>
                <div className="mx-2">x{item.quantity}</div>
                <div>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 0}
                    style={{
                        backgroundColor: 'red',
                      }}
                  >
                    -
                  </button>
                  <span></span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                        backgroundColor: 'green',
                      }}
                  >
                    +
                  </button>
                </div>
                <div className='itemsize'>SEK {(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
        <hr />
       <h5>Total: SEK {totalPrice.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default OrderSummary;
