import React from "react";
import Card from "react-bootstrap/Card";

const SightingPreview = (props) => {
  console.log(props);
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {`${props.data.id} ${props.data.date} ${props.data.location}`}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
