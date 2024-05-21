import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import prev from '../../assets/icons/prev.svg';
import next from '../../assets/icons/next.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, nextSlide, prevSlide, resetAnimation } from '../../redux/slices/sliderSlice';
import { RootState } from '../../redux/store';
import './Slider.scss';

const Slider = () => {
    const { currentId, images, isAnimating } = useSelector((state: RootState) => state.slider);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchImages() as any);

        const interval = setInterval(() => {
            dispatch(nextSlide())
        }, 8000);

        return () => {
            clearInterval(interval);
        };

    }, [dispatch]);

    const handlePrevSlide = () => {
        if (!isAnimating) {
            dispatch(prevSlide())
        }
    }

    const handleNextSlide = () => {
        if (!isAnimating) {
            dispatch(nextSlide())
        }
    }


    const handleAnimationEnd = () => {
        dispatch(resetAnimation())
    }

    return (
        <div className="info">
            <div className="arrows">
                <button onClick={handlePrevSlide}>
                    <img src={prev} className='prev' alt="prev" />
                </button>
                <button onClick={handleNextSlide}>
                    <img src={next} className='next' alt="next" />
                </button>
            </div>
            <div className="container">
                <div className='slider'>
                    <div className={`slider__slides ${isAnimating ? "animate__animated animate__fadeIn" : ""}`} onAnimationEnd={handleAnimationEnd}>
                        <Link to={`/card/${currentId}`} className='slider__image'>
                            {images.length > 0 && (
                                <div className="slider__slide"> <img src={images.find(image => image.id === currentId)?.image} alt={`Slide ${currentId}`} /></div>
                            )}
                        </Link>
                    </div>
                    <div className=' slider__wrapper'>
                        <h2 className='slider__title'>Get ready for Our
                            <br /> stylist things</h2>
                        <Link to={`/card/${currentId}`}>
                            <button className='slider__btn btn'>SHOP NOW</button>

                        </Link>
                    </div>
                </div>
            </div>
            <div className="grey"></div>
        </div>
    );
}

export default Slider;
