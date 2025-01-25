import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../../store/ratingsReviewsSlice.js';

const RatingsReviews = () => {

  const isOpen = useSelector((state) => {
    return state.ratingsReviews.formOpen;
  })

  return (
    <div>
      <h1 className="rrHeader">Ratings & Reviews</h1>
      <div className="ratingsReviews">
        <RatingBreakdown />
        <ReviewList />
        { isOpen ? <NewReviewModal /> : null}
      </div>
    </div>
  )
}

import ReviewList from './reviewList.jsx';
import RatingBreakdown from './ratingBreakdown.jsx';
import NewReviewModal from './newReviewModal.jsx'

export default RatingsReviews;