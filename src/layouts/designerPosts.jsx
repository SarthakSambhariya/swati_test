import React from "react";
import kebabButton from "../components/findprofessional/images/kebabButton.svg";
import defaultProfilePic from "../components/findprofessional/images/defaultPostProfilePic.svg";
import defaultPostImage from "../components/findprofessional/images/defaultPostImage.svg";
import totalLikesOnPostThumbsUp from "../components/findprofessional/images/totalLikesOnPostThumbsUp.svg";
import likePostThumbsUp from "../components/findprofessional/images/likePostThumbsUp.svg";
import commentOnPost from "../components/findprofessional/images/commentOnPost.svg";
import sharePost from "../components/findprofessional/images/sharePost.svg";

const DesignerPosts = () => {
  return (
    <React.Fragment>
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between">
            <img src={defaultProfilePic} alt="" />
            <div className="ms-3" style={{width:"100%"}}>
              <div
                style={{
                  fontFamily: "Public Sans",
                  fontSize: "1rem",
                  fontWeight: "500",
                  lineHeight: "1.1875rem",
                }}
              >
                Ashu Kumar
              </div>
              <div>12h ago</div>
            </div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <img src={kebabButton} alt="" />
          </div>
        </div>
        <div className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod. ... See More
        </div>
        {/**    THE IMAGE ON POST CAN BE OPTIONAL DEPENDING ON THE PROPS RECEIVED */}
        {
          <div className="mt-3">
            <img src={defaultPostImage} alt="" style={{ width: "100%" }} />
          </div>
        }
        <div
          className="mt-3 d-flex justify-content-between align-items-center"
          style={{
            fontFamily: "Public Sans",
            fontSize: "0.75rem",
            fontWeight: "300",
            lineHeight: "0.875rem",
            color: "#888888",
          }}
        >
          <div className="d-flex align-items-center">
            <img src={totalLikesOnPostThumbsUp} />
            <div className="ms-2">100</div>
          </div>
          <div className="d-flex align-items-center">
            <div className="">48 Comments</div>
            <div className="ms-2">13 Shares</div>
          </div>
        </div>
        <div
          className="mt-3"
          style={{
            borderBottom: "2px solid rgba(223, 223, 223, 0.8)",
            width: "100%",
          }}
        />
        <div className="d-flex justify-content-between mt-2">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              background: "#F6F6F6",
              borderRadius: "1.25rem",
              width: "5.75rem",
              height: "2rem",
              fontSize: "0.875rem",
              fontWeight: "300",
              fontFamily: "Public Sans",
              lineHeight: "1.02875",
            }}
          >
            <img src={likePostThumbsUp} alt="" />
            <div className="ms-2">Like</div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              background: "#F6F6F6",
              borderRadius: "1.25rem",
              width: "7.9375rem",
              height: "2rem",
              fontSize: "0.875rem",
              fontWeight: "300",
              fontFamily: "Public Sans",
              lineHeight: "1.02875",
            }}
          >
            <img src={commentOnPost} alt="" />
            <div className="ms-2">Comment</div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              background: "#F6F6F6",
              borderRadius: "1.25rem",
              width: "5.75rem",
              height: "2rem",
              fontSize: "0.875rem",
              fontWeight: "300",
              fontFamily: "Public Sans",
              lineHeight: "1.02875",
            }}
          >
            <img src={sharePost} alt="" />
            <div className="ms-2">Share</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DesignerPosts;
