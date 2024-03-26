import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log("Logging in...");
    } else {
      console.log("Registering...");
    }
  };

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
          width: "25rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {isLogin ? "Login" : "Register"}
          </Card.Title>
          <Card.Text>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  Never share your password with anyone
                </Form.Text>
              </Form.Group>

              {!isLogin && (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Confirm Password"
                  >
                    <Form.Control type="password" placeholder="Password" />
                  </FloatingLabel>
                </Form.Group>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Button
                  type="submit"
                  style={{
                    width: "calc(50% - 5px)",
                    borderRadius: "8px",
                  }}
                >
                  {isLogin ? "Login" : "Register"}
                </Button>
                <Button
                  onClick={switchHandler}
                  variant={!isLogin ? "outline-secondary" : "outline-secondary"}
                  style={{
                    width: "calc(50% - 5px)",
                    borderRadius: "8px",
                  }}
                >
                  {isLogin ? "Register" : "Login"}
                </Button>
              </div>
            </Form>
          </Card.Text>
        </Card.Body>
        {isLogin && (
          <Button
            variant="outline-dark"
            style={{
              width: "100%",
              bottom: "0",
              borderRadius: "0 0 10px 10px",
            }}
          >
            Forgot Password?
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Authentication;
