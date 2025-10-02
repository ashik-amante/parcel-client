import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bn1 from '../../../assets/banner/banner1.png'
import bn2 from '../../../assets/banner/banner2.png'
import bn3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <div>
             <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={bn1} />
                   
                </div>
                <div>
                    <img src={bn2}/>
                    
                </div>
                <div>
                    <img src={bn3} />
                    
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;