import React from "react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MobileSlider({ projects }) {

  const [images, setImages] = useState(projects["data"])

  

  const settings = {
    customPaging: function (i) {
      return (
        <>
          <a>
            <img src={ images.length > 0 && images[0]["images"].length > 0 && images[0]["images"][0]["original"]} />
          </a>
        </>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <br />
      <Slider {...settings}>
        <div className="card">
          <div className="card-body">
          <img src={images.length > 0 && images[0]["images"].length > 0 && images[0]["images"][0]["original"]} style={{width:"100%"}} />

          </div>
        </div>
        <div className="card">
          <div className="card-body">
          <img src={images.length > 0 && images[0]["images"].length > 0 && images[0]["images"][0]["original"]} style={{width:"100%"}} />

          </div>
        </div>
        
        {/* {projects[0]["data"][0]["images"].map(m =>{

      })} */}
      </Slider>
    </div>
  );
}

export default MobileSlider;
