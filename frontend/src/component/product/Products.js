import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProducts } from '../../actions/productAction'
import ProductCard from '../Home/ProductCard'
import Loader from '../layout/Loader/Loader'
import "./Products.css"
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material'
import { useAlert } from "react-alert"
import MetaData from '../layout/MetaData'

const categories = [
    "Weight Gainer",
    "Mass Gainer",
    "Weight Loss",
    "Height Gainer",
    "Women Special"
]

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newRange) => {
        setPrice(newRange);
    }

    const params = useParams();
    const keyword = params.keyword;
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);
    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment >
                    <MetaData title={"Products - House Of Fitness"} />
                    <h1 className='productsHeading'>Products</h1>
                    <div className='products'>
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox" >
                            {categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                valueLabelDisplay="auto"
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                            />

                        </fieldset>
                    </div>

                    {resultPerPage < filteredProductsCount && (
                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="next"
                                prevPageText="prev"
                                firstPageText="1st"
                                lastPageText="last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default Products