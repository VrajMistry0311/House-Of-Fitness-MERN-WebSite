import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import WebFont from "webfontloader"
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home'
import Loader from './component/layout/Loader/Loader';
import ProductDetails from "./component/product/ProductDetails"
import Products from "./component/product/Products"
import Search from "./component/product/Search"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/Header/UserOptions"
import Profile from "./component/User/Profile"
import Protected from './component/Route/Protected'
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import Payment from "./component/Cart/Payment"
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList"
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from "./component/Admin/OrderList"
import ProcessOrder from "./component/Admin/ProcessOrder"
import UserList from './component/Admin/UserList'
import UpdateUser from './component/Admin/UpdateUser'
import ProductReviews from './component/Admin/ProductReviews';
import About from './component/layout/About/About';
import Contact from './component/layout/Contact/Contact';
import NotFound from './component/layout/Not Found/NotFound';

function App() {

  const { user, isAuthenticated, loading } = useSelector(state => state.user);


  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header />
          {isAuthenticated && <UserOptions user={user} />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path='/login' element={<LoginSignUp />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contact />} />

            <Route
              exact
              path='/account'
              element={isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/me/update'
              element={isAuthenticated ? (
                <UpdateProfile />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/password/update'
              element={isAuthenticated ? (
                <UpdatePassword />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route exact path='/password/forgot' element={<ForgotPassword />} />
            <Route exact path='/password/reset/:token' element={<ResetPassword />} />

            <Route exact path='/cart' element={<Cart />} />

            <Route
              exact
              path='/shipping'
              element={isAuthenticated ? (
                <Shipping />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/order/confirm'
              element={isAuthenticated ? (
                <ConfirmOrder />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/payment/process'
              element={stripeApiKey &&
                <Elements stripe={loadStripe(stripeApiKey)} >
                  <Protected isAuthenticated={isAuthenticated}>
                    <Payment />
                  </Protected>
                </Elements>
              }
            />

            <Route
              exact
              path='/success'
              element={isAuthenticated ? (
                <OrderSuccess />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/orders'
              element={isAuthenticated === false ? (
                <Navigate to='/login' replace />
              ) : (
                <MyOrders />
              )
              }
            />

            <Route
              exact
              path='/order/:id'
              element={isAuthenticated ? (
                <OrderDetails />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/dashboard'
              element={(isAuthenticated && user.role === 'admin') ? (
                <Dashboard />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/products'
              element={(isAuthenticated && user.role === 'admin') ? (
                <ProductList />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/product'
              element={(isAuthenticated && user.role === 'admin') ? (
                <NewProduct />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/product/:id'
              element={(isAuthenticated && user.role === 'admin') ? (
                <UpdateProduct />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/orders'
              element={(isAuthenticated && user.role === 'admin') ? (
                <OrderList />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/order/:id'
              element={(isAuthenticated && user.role === 'admin') ? (
                <ProcessOrder />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/users'
              element={(isAuthenticated && user.role === 'admin') ? (
                <UserList />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/user/:id'
              element={(isAuthenticated && user.role === 'admin') ? (
                <UpdateUser />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route
              exact
              path='/admin/reviews'
              element={(isAuthenticated && user.role === 'admin') ? (
                <ProductReviews />
              ) : (
                <Navigate to='/login' replace />
              )
              }
            />

            <Route exact path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </Fragment>
  );
}

export default App;


