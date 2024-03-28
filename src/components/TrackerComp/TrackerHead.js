import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DisplaySliceActions } from "../../store/DisplaySlice";

const TrackerHead = (props) => {
  const itemRef = useRef();
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const itemInput = itemRef.current.value;
    const moneyInput = moneyRef.current.value;
    const descriptionInput = descriptionRef.current.value;

    const newExpense = {
      id: Math.random(),
      item: itemInput,
      price: moneyInput,
      description: descriptionInput,
    };
    dispatch(DisplaySliceActions.DisplayItems(newExpense));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "black",
        height: "50vh",
        width: "100vw",
      }}
    >
      <Card
        style={{
          width: "80rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "50px",
          backgroundColor: "gray",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            Add Your Daily Expense
          </Card.Title>
          <Card.Text>
            <Form>
              <Container>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Select ref={itemRef}>
                        <option>Food</option>
                        <option>Petrol</option>
                        <option>Bill</option>
                        <option>Items</option>
                        <option>Medicine</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3"></Form.Group>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                      <Form.Control
                        ref={moneyRef}
                        placeholder="Enter Amount"
                        aria-label="Enter Amount"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  ref={descriptionRef}
                  as="textarea"
                  className="mb-3"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Button variant="primary" onClick={submitHandler}>
                Add Expense
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TrackerHead;
