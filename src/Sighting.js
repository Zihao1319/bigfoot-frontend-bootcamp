import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { BACKEND_URL } from "./constants.js";
import { ListGroup, Form, Button } from "react-bootstrap";

const Sighting = () => {
  const [sightingIndex, setSightingIndex] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    // If there is a sightingIndex, retrieve the sighting data
    if (sightingIndex) {
      axios
        .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
        .then((response) => {
          // console.log(response.data);
          setSighting(response.data);
        });
      axios
        .get(`${BACKEND_URL}/sightings/${sightingIndex}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    }

    // Only run this effect on change to sightingIndex
  }, [sightingIndex]);

  // Update sighting index in state if needed to trigger data retrieval
  const params = useParams();
  if (sightingIndex !== params.sightingIndex) {
    setSightingIndex(params.sightingIndex);
  }

  // Store a new JSX element for each property in sighting details
  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      sightingDetails.push(
        <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
      );
    }
  }

  const CommentForm = () => {
    const handleChange = (e) => {
      setCommentContent(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit button clicked");

      if (commentContent) {
        axios
          .post(`${BACKEND_URL}/sightings/${sightingIndex}/comments`, {
            content: commentContent,
          })
          .then((res) => {
            setCommentContent("");
            // refresh the sightings
            return axios.get(
              `${BACKEND_URL}/sightings/${sightingIndex}/comments`
            );
          })
          .then((res) => {
            setComments(res.data);
            console.log(comments);
          });
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Comments:</Form.Label>
          <Form.Control
            type="text"
            name="comments"
            placeholder="So what do you feel?"
            onChange={handleChange}
            value={commentContent}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  };

  const commentsComponent = () => {
    return (
      <ListGroup.Item>
        {comments.map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))}
      </ListGroup.Item>
    );
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="dark">
        <Card.Body>
          <Card.Title>
            {sighting && `${sighting.id} ${sighting.date} ${sighting.location}`}
          </Card.Title>
          {sightingDetails}
          {CommentForm()}
          <ListGroup>{commentsComponent()}</ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sighting;
