import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OutfitItemCard = ({item}) => {

  return (
    <div className = "outfitItemCard">
      <span className = "actionButtonOutfit">&times;</span>
      <div>{item.category}</div>
      <div>{item.name}</div>
      <div>{item.price}</div>
    </div>
  )
}

export default OutfitItemCard;