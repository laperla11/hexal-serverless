import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from 'axios';
const config = require('../config.json');

export default class Products extends Component {
  state = {
    newproduct: null,
    products: [],
  };

  fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      this.setState({ products: res.data.body });
    } catch (err) {
      console.log(`An error has occured : ${err} `);
    }
  };

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <Fragment>
        <section className='section'>
          <div className='container'>
            <h1>Energy Products</h1>
            <p className='subtitle is-5'>
              Invest in a clean future with our efficient and cost-effective
              green energy products:
            </p>
            <br />
            <div className='columns'>
              <div className='column'>
                <div className='tile is-ancestor'>
                  <div className='tile is-4 is-parent  is-vertical'>
                    {this.state.products && this.state.products.length > 0 ? (
                      this.state.products.map((product) => (
                        <Product
                          name={product.productName}
                          id={product.id}
                          key={product.id}
                        />
                      ))
                    ) : (
                      <div className='tile notification is-warning'>
                        No products available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
