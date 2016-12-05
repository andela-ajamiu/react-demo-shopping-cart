var ProductList = React.createClass({
  getInitialState: function() {
    return (
      {total: 0,
       productList: [
         {name: "Infinix", price: 50},
         {name: "Samsung", price: 60},
         {name: "iPhone", price: 75}
       ]
      }
    );  
  },
  
  alertProduct: function(name) {
    alert("You selected " + name);
  },
  
  calculateTotal: function(price) {
    this.setState(
      {total: this.state.total + price}
    );
  },
  
  createProduct: function(product) {
    this.setState(
      {productList: this.state.productList.concat(product)}
    )
  },
  
  render: function() {
    var _this = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product name={product.name} price={product.price}
               handleShow={_this.alertProduct}
               handleTotal={_this.calculateTotal} />
      );
    });
    
    return (
      <div>
        <ProductForm handleCreate={this.createProduct} />
        {products}
        <Total total={this.state.total}  />
      </div>
    );
  }
});


var ProductForm = React.createClass({
  submit: function(e) {
    e.preventDefault();
    
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    }
    
    this.props.handleCreate(product);
    
    this.refs.name.value = "";
    this.refs.price.value = "";
  },
  
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Name" ref="name" />
        <input type="text" placeholder="Price" ref="price" />
        <br/><br/>
        <button onClick={this.submit}>Create Product</button>
        <hr/>
      </form>
    )
  }
});


var Product = React.createClass({
  getInitialState: function() {
    return (
      {qty: 0}
    )
  },
  
  buy: function() {
    this.setState(
      {qty: this.state.qty + 1}
    );
    this.props.handleTotal(this.props.price);
  },
  
  alertProduct: function(name) {
    alert("You selected " + name);
  },
  
  show: function() {
    this.props.handleShow(this.props.name);
  },
  
  render: function() {
    return (
      <div>
        <h2>{this.props.name} - {this.props.price}</h2>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <h3>{this.state.qty} item(s) in cart</h3>
        <hr/>
      </div>
    );
  }
});


var Total = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Total Cash: ${this.props.total}</h2>
      </div>
    );
  }
});

ReactDOM.render(<ProductList/>, document.getElementById('emjay'))