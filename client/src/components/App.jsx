import React from 'react';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import ProductDetails from './ProductOverview/ProductDetails.jsx';
import QA from './QA/QA.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

var App = (props) => {

  return (
    <div>
      <ProductDetails />
      <ProductOverview />
      <QA />
      <RelatedItems />
      <RatingsReviews />
      <p>hello world</p>
    </div>
  );
}

export default App;