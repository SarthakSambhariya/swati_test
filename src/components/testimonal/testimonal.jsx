import React, { useEffect, useState } from "react";
import constants from "../../services/constants";
import aliciascott from "../designer-profile/aliciascott.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../home/css/testimonl.css";
import testimonialservice from "../../services/testimonialservice";

function Testimonal() {
  const handleDragStart = (e) => e.preventDefault();

  const [testimonials, setTestimonials] = useState([]);

  const getInit = async () => {
    const testimonial = await testimonialservice.getTestimonials();
    setTestimonials(testimonial);
  };

  useEffect(() => {
    getInit();
  }, []);

  return (
    <section className="testimonal testim-cover">
      <div className="container mt-5">
        <h1 className="text-center fw-bolder">Testimonials</h1>

        <section id="testim" className="testim">
          <div className="">
            <div className="wrap">
              <AliceCarousel
                mouseTracking
                disableButtonsControls
                items={testimonials.map((t) => (
                  <div id="testim-content" className="cont" key={t._id}>
                    <div className="active interfont">
                      <p className="text-muted mb-5">{t.message}</p>
                      <h2>
                        <b>{t.name}</b> &nbsp;
                        <span className="ink-content">{t.category}</span>
                      </h2>
                      <div className="img">
                        <img src={constants.apiurl+ t.image} alt="" />
                      </div>
                    </div>

                    {/* <div>
      <p>title</p>
      <h2>
        <b>name</b> category
      </h2>
      <div className="img">
        <img src="" alt="" />
      </div>
    </div> */}
                  </div>
                ))}
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Testimonal;
