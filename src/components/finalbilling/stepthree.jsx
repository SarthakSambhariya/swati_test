import React from "react";

function stepthree(props) {
  return (
    <>
      <section className="meeting">
        <div className="container">
          <div className="row">
            <h3 className="p-5 text-center">Schedule a Meeting</h3>
            <div className="col-lg-6 col-xs-12">
              <div className="wrapper border-end">
                <div id="calendari"></div>
              </div>
            </div>
            <div className="col-lg-6 col-xs-12">
              <h5>
                <b>What Time Works Best?</b>
              </h5>
              <p>UTC +05:30 New Delhi, Mumbai, Calcutta</p>
              <div className="mt-5">
                <div className="overflow-hidden">
                  <div className="row gy-3 gx-5 justify-content-center ">
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                  </div>
                  <div className="row gy-3 gx-5 justify-content-center mt-3">
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                  </div>
                  <div className="row gy-3 gx-5 justify-content-center mt-3">
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                    <div className="col-3">
                      <div className="p-4 border bg-light text-center rounded">12:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center p-5">
            <button className="btn blue text-light w-25" type="button">Submit</button>
          </div>

        </div>
      </section>
    </>
  );
}

export default stepthree;
