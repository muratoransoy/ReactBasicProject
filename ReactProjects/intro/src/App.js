import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import alertify from 'alertifyjs'
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound'
import CartList from './CartList';
import FomDemo1 from './FormDemo1';
import FomDemo2 from './FormDemo2';

export default class App extends Component {

  state = { currentCategory: "", products: [], cart: [] }

  changeCategory = category => {
    this.setState({ currentCategory: category.categoryName });
    this.getproducts(category.id)
  };

  getproducts = categoryId => {

    let url = "http://localhost:3000/products"
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));;
  }

  componentDidMount() {
    this.getproducts();
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id)
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + "added to cart", 2);
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
    alertify.error(product.productName + " removed to cart", 2);
  }

  render() {
    let productInfo = { title: "Product List" }
    let categoryInfo = { title: "Category List" }
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo} />
            </Col>
            <Col xs="9">
              <Switch>
                <Route exact path="/" render={props => (
                  <ProductList
                    {...props}
                    products={this.state.products}
                    addToCart={this.addToCart}
                    currentCategory={this.state.currentCategory}
                    info={productInfo} />
                )
                } />
                <Route exact path="/cart" render={props => (
                  <CartList
                    {...props}
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart} />
                )
                } />
                <Route path="/form1" component={FomDemo1} />
                <Route path="/form2" component={FomDemo2} />

                <Route component={NotFound} />
              </Switch>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }

};


