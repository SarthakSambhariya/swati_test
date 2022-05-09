import React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

function Schedule(props) {
  return (
    <>
    <Header />
      <section className="meeting">
        <div className="container">
          <div className="row p-5">
            <h4 className="p-4 text-center">Schedule</h4>
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
                  <div className="row gy-5">
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                    <div className="col-4">
                      <div className="p-3 border bg-light w-50">12:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    <Footer />
    </>
  );
}

export default Schedule;
