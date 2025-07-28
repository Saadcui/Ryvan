import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './page/Home';
import Collection from './page/Collection';
import About from './page/About';
import Cart from './page/Cart';
import Product from './page/Product';
import Orders from './page/Orders';
import PlaceOrder from './page/PlaceOrder';
import Contact from './page/Contact';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Navbar from './component/Navbar';
import { AuthProvider } from './context/AuthContext';
            
const App = () => {
  return (
    <div>
    <AuthProvider>
    <Navbar/>

    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/product/:id' element={<Product/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/placeorder' element={<PlaceOrder/>}  />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </AuthProvider>
    </div>
  )
}
export default App;