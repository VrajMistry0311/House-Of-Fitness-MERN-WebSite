import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import Product from "./ProductCard.js"
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert"


const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (<Loader />) : (<Fragment>
        <MetaData title="House Of Fitness" />
        <div className='banner'>
          <p>Welcome to House Of Fitness</p>
          <h1>FIND AMAZING PRODUCTS ABOVE-vr</h1>
          <a href="#container">
            <button>Scroll <CgMouse /></button>
          </a>
        </div>
        <h1 className='homeHeading'>Featured Products</h1>
        <div className='container' id='container'>
          {products && products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </Fragment>)}
    </Fragment>

  )
}

export default Home
