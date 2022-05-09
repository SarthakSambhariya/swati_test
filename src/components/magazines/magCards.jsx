import React from "react";
import { Card, Button } from "react-bootstrap";
import Share from "../common/buttons/share";
import share from "../findprofessional/images/share.png"

const MagCards = ({id, title, image, description, category}) => {
  return (
    <>
      <div className="col-md-4" key={id}>
      <Card  >
        <Card.Img variant="top" src={image} style={{  cursor: "pointer" }} className="p-0"  onClick={() => (window.location.href = `magazine/${category}/${title.replaceAll(" ","-")}`)}/>
        
        <Card.Body>
          <Card.Text>
            {title}
            <span className="float-end">
            <Share />

            </span>
            
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </>
  );
};

export default MagCards;
