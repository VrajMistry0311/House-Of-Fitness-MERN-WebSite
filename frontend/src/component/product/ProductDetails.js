import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDetais.css"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import { Rating } from '@mui/material'
import ReviewCard from './ReviewCard.js'
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"
import MetaData from '../layout/MetaData'
import { addToCartItems } from '../../actions/cartAction'
import { Dialog, DialogActions, DialogTitle, Button, DialogContent } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    const { loading, product, error } = useSelector(state => state.productDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview);

    const options = {
        size: "large",
        value: Number(product.ratings),
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (quantity >= product.stock) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addToCartItems(id, quantity));
        alert.success("Item Added to Cart Successfully");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);
    return (
        <Fragment >
            {loading ? (<Loader />) : (
                <Fragment >
                    <MetaData title={`${product.name} - House Of Fitness`} />
                    <div className='productDetails' >
                        <div>
                            <Carousel className='carousel'>
                                {product.images && product.images.map((item, i) => (
                                    <img className="carouselImage" key={i} src={item.url} alt={`${i} slide`} />
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className='detailsBlock-2-span' >
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1> {`₹${product.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1' >
                                        <button onClick={decreaseQuantity}> - </button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}> + </button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}> Add to Cart</button>
                                </div>
                                <p> status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"} >
                                        {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className='submitDialogTextArea'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews && product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (<p className="noReviews">No Reviews yet</p>)}
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails;