import React from 'react';

const Menu = ({ menuItems, addToOrder }) => {
    return (
      <div className="row">
        {menuItems.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{ width: '150px', height: '150px', objectFit: 'cover', margin: 'auto' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">SEK: {item.price.toFixed(2)}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToOrder(item)}
                  style={{ backgroundColor: 'black' }}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default Menu;