import React from 'react';


const SliderBox = ({imageName}) => {
    return ( 
        <div className="rev_slide">
        <div className="">
          <img src={imageName} alt="" />
        </div>
      </div>
     );
}
 
export default SliderBox;