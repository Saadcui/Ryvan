import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './page/home';
import Collection from './page/collection';
import About from './page/about';
import Cart from './page/cart';
import Product from './page/product';
import Orders from './page/orders';
import PlaceOrder from './page/placeOrder';
import Login from './page/login';
import Contact from './page/contact';
import Navbar from './component/Navbar';

const App = () => {
  return (
    <div>
    
    <Navbar/>

    <Routes>
      <Route path='/'element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/product/:id' element={<Product/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/placeorder' element={<PlaceOrder/>}  />
      <Route path='login' element={<Login/>} />
    </Routes>
    </div>
  )
}
export default App;