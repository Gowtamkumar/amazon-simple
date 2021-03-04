import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Header/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* should have main page */}
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>

      </Router>


    </div>
  );
}

export default App;
