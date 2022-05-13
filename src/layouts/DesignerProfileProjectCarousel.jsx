import React from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const DesignerProfileProjectCarousel = (props) => {
  const imageArray = [];
  let idx=0;

  if (props.arrayOfImages.length !== 0) {
    let s = props.arrayOfImages[0].data[0].images;
    for (let i of s) {
      imageArray.push(i.original);
    }
    let content = (
      <div>
        {
        imageArray.map((i, idx) => {
          <li key={idx}>
            <img src={i} style={{ width: "100%" }} alt={`${idx++}`}/>;
          </li>;
        })}
      </div>
    );
  }
  console.log(imageArray);

  return (
    <React.Fragment>
      <Carousel responsive={responsive} transitionDuration={false}>
        <img src={imageArray[0]} style={{ width: "100%" }}></img>
        <img src={imageArray[1]} style={{ width: "100%" }}></img>
        <img src={imageArray[2]} style={{ width: "100%" }}></img>
        <img src={imageArray[3]} style={{ width: "100%" }}></img>
      </Carousel>
    </React.Fragment>
  );
};

export default DesignerProfileProjectCarousel;
