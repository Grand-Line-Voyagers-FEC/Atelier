import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import brokenImage from '../../images/placeholder.jpeg';

const ImageGallery = ({ selectedStyle, setSelectedStyle, selectedImageIndex, setSelectedImageIndex }) => {

  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const id = useSelector(state => state.products.currentProduct) || 40347;
  const details = useSelector(state => state.products.productDetails?.[id]);
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];
  const status = useSelector(state => state.products?.status);
  const error = useSelector(state => state.products?.error);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const handleImageClick = () => {
    if (!expanded) {
      setExpanded(true);
      setZoomed(false);
      setZoomScale(1);
    } else if (expanded && !zoomed) {
      setZoomed(true);
      setZoomScale(2.5);
    } else if (expanded && zoomed) {
      setZoomed(false);
      setZoomScale(1);
    }
  };

  const handleClickAway = () => {
    setExpanded(false);
    setZoomed(false);
    setZoomScale(1);
  };


  const handlePrevious = (selectedImageIndex) => {
    if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
  };

  const handleNext = (selectedImageIndex) => {
    if (selectedImageIndex < selectedStyle?.photos?.length - 1) setSelectedImageIndex(selectedImageIndex + 1);
  };


  return (
    <div className={`image-gallery ${expanded ? 'expanded' : ''} `}>
      <div className='thumbnail-images'>
        {selectedStyle?.photos?.length && selectedStyle?.photos.map((photo, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImageIndex === index ? 'selected' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={photo?.thumbnail_url || brokenImage}
              alt='style-photo'
            />
          </div>
        ))}
      </div>
      <div className={`main-image ${expanded ? "expanded" : ''} ${zoomed ? 'zoomed' : ''}`}>
        {expanded &&
          <button className='click-away-button' onClick={handleClickAway}><i className="fa-solid fa-x"></i></button>
        }
        <img
          src={selectedStyle?.photos?.[selectedImageIndex]?.url || brokenImage}
          alt='style-photo-main'
          onClick={handleImageClick}
          className='main-image-photo'
          style={{
            cursor: expanded && zoomed ? 'zoom-out' : 'zoom-in',
            transform: zoomed ? 'scale(2.5)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
        {selectedImageIndex > 0 && (
          <button
            className='previous-button'
            onClick={() => handlePrevious(selectedImageIndex)}>
            <span><i className="fa-solid fa-arrow-left"></i></span></button>
        )}
        {selectedImageIndex < selectedStyle?.photos?.length - 1 && (
          <button
            className='next-button'
            onClick={() => handleNext(selectedImageIndex)}>
            <span><i className="fa-solid fa-arrow-right"></i></span></button>
        )}
        {expanded && !zoomed && (
          <div className="image-indicator-div">
            {selectedStyle?.photos.map((element, index) => (
              <div
                key={index}
                className={`image-indicator ${selectedImageIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      <div className='product-slogan-details'>
        <strong>
          <p>
            {details?.slogan}
          </p>
        </strong>
        <p>
          {details?.description}
        </p>
      </div>
    </div >
  )
};

export default ImageGallery;