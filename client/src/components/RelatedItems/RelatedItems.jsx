import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails } from '../../store/relatedItemsSlice.js';
import { getProducts, getProductDetails, getProductStyles } from '../../store/productsSlice.js';
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const dispatch = useDispatch();

  const currentProduct = useSelector((state) => {
    return state.products.currentProduct
  })

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentCardIndex
  })

  const status = useSelector((state) => {
    return state.relatedItems.status
  })

  const error = useSelector((state) => {
    return state.relatedItems.error
  })

  const relatedItems = useSelector((state) => {
    return state.relatedItems.relatedItems
  })

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 60}%)`
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getRelatedItems(currentProduct))
        .then((results) => {
          results.payload.forEach((productId) => {
            dispatch(getRelatedItemDetails(productId))
          })
        })
      dispatch(getProductStyles())
      .then((results) => console.log(results))
    }
  }, [])

  return (
    <div className="relatedItems">
      <h2>Related Items</h2>
      <div className = "relatedItemsWrapper" >
        {relatedItems.map((item, index) => <RelatedItemCard item = {item} key = {index} style = {carouselStyle}/>)}
        {currentIndex === 0 ? null : <button className = "leftButton button" onClick = {() => dispatch(showPreviousCard())}>ᐸ</button>}
        {currentIndex === relatedItems.length - 1 ? null : <button className = "rightButton button" onClick = {() => dispatch(showNextCard())}>ᐳ</button>}
      </div>
      <h2>Your Outfit</h2>
      <Outfit />
    </div>
  )
}

export default RelatedItems;


// style = {{left: position.x; top: position.y}}