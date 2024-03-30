import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const Profile = () => {
  const nameRef = useRef();
  const imageRef = useRef();
  const [updateName, setUpdateName] = useState();
  const [updateImage, setUpdateImage] = useState();
  const getToken = useSelector((state) => state.LogInStore.token);
  const submitHandler = async (event) => {
    event.preventDefault();
    const nameInput = nameRef.current.value;
    const imageInput = imageRef.current.value;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB4HniVVMIPPpNCfzZQTxDnuxWvwij4e2Y",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: getToken,
          displayName: nameInput,
          photoUrl: imageInput,
          returnSecureToken: true,
        }),
      }
    );
    if (response.ok) {
      console.log("success");
    }
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("error");
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB4HniVVMIPPpNCfzZQTxDnuxWvwij4e2Y",
        {
          method: "POst",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: getToken,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUpdateName(data.users[0].displayName);
        setUpdateImage(data.users[0].photoUrl);
        console.log(data.users[0].displayName);
        console.log("success");
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("error");
      }
    };
    fetchUserData();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "91.5vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "75rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Profile</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Enter Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      style={{ width: "100%" }}
                      ref={nameRef}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <Container>
                    <Row>
                      <Col xs={6} md={4}>
                        <Image
                          src={updateImage}
                          alt="Profile Image"
                          style={{ width: "100px", height: "100px" }}
                          roundedCircle
                        />
                        <div></div>
                      </Col>
                    </Row>
                  </Container>
                  <h5>{updateName}</h5>
                </Col>
              </Row>
            </Container>

            <FloatingLabel controlId="floatingInput" label="Paste Image Url">
              <Form.Control
                type="text"
                style={{ width: "49%" }}
                ref={imageRef}
              />
            </FloatingLabel>
          </Card.Text>
          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Profile;
