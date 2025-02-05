import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToOutfit, showNextOutfitCard, showPreviousOutfitCard } from '../../store/relatedItemsSlice.js';
import OutfitItemCard from './OutfitItemCard.jsx'

const Outfit = ({ currentProductDetails }) => {

  const dispatch = useDispatch();

  //states
  const outfit = useSelector((state) => {
    return state.relatedItems.outfit;
  })

  const currentOutfitIndex = useSelector((state) => {
    return state.relatedItems.currentOutfitCardIndex;
  })

  const currentProduct = useSelector((state) => {
    return state.products.currentProduct
  })

  //carousel styling
  const carouselStyle = {
    transform: `translateX(-${currentOutfitIndex * 100}%)`
  }

  const leftButtonShow = (outfit.length > 1) && (currentOutfitIndex > 0)

  const rightButtonShow = (outfit.length > 2) && (currentOutfitIndex < outfit.length - 1)


  //event handlers
  const handleAddOutfit = (event) => {
    var currentProduct = currentProductDetails;
    if (!outfit.includes(currentProduct)) {
      dispatch(addToOutfit(currentProduct))
    }

  }

  return (
    <div>
      <div className = "outfitWrapper">
        <span className = "addToOutfitCard" style = {carouselStyle} onClick = {handleAddOutfit}>
          <button>
            <i class="fa-solid fa-plus"></i>
            &nbsp;Add Current Item to Outfit
          </button>
        </span>
        {outfit.map((item, index) => <OutfitItemCard item = {item} style = {carouselStyle} key = {index}/>)}
          {leftButtonShow ? <button className = "leftButton button" onClick = {() => dispatch(showPreviousOutfitCard())}>ᐸ</button> : null}
          {rightButtonShow ? <button className = "rightButton button" onClick = {() => dispatch(showNextOutfitCard())}>ᐳ</button> : null}
      </div>
    </div>
  )
}

export default Outfit;