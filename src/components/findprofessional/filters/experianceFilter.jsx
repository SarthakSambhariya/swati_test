import React, {useEffect, useState} from "react";
import { Popover, Overlay, ListGroup } from "react-bootstrap";

function ExperianceFilter({ expshow, exptarget, handleExpFilter }) {
  const [show1, setShow] = useState(false);

  useEffect(() => {
    setShow(expshow);
  }, [expshow]);

  return (
    <Overlay
      show={show1}
      target={exptarget}
      placement="bottom"
      containerPadding={0}
      rootClose={true}
      onHide={() => setShow(false) }
    >
      <Popover id="popover-contained">
        <Popover.Body>
          <ListGroup variant="flush">
            <ListGroup.Item onClick={() => handleExpFilter("0-1")} action>
              0-1 Years
            </ListGroup.Item>
            <ListGroup.Item onClick={() => handleExpFilter("1-2")} action>
              1-2 Years
            </ListGroup.Item>
            <ListGroup.Item onClick={() => handleExpFilter("2-3")} action>
              2-3 Years
            </ListGroup.Item>
            <ListGroup.Item onClick={() => handleExpFilter("3-4")} action>
              3-4 Years
            </ListGroup.Item>
            <ListGroup.Item onClick={() => handleExpFilter("5+")} action>
              5+ Years
            </ListGroup.Item>
          </ListGroup>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
}

export default ExperianceFilter;
