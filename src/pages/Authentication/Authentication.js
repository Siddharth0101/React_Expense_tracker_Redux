import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import AlertUi from "../../components/UI/AlertUi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TokenSlice, { TokenSliceActions } from "../../store/TokenSlice";

const Authentication = () => {
  const dispatch = useDispatch();
  const tokenCheck = useSelector((state) => state.LogInStore.token);
  const loginCheck = useSelector((state) => state.LogInStore.isLogged);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [passError, setPassError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [somethingWrong, setSomethingWrong] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
    setPassError(false);
    setRegisterSuccess(false);
    setSomethingWrong(false);
    setEmailExist(false);
    setWrongPass(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      const emailInput = emailRef.current.value;
      const passInput = passRef.current.value;
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4HniVVMIPPpNCfzZQTxDnuxWvwij4e2Y",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailInput,
              password: passInput,
              returnSecureToken: true,
            }),
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          navigate("/tracker");
          dispatch(TokenSliceActions.LogIn(responseData.idToken));
        }
        if (!response.ok) {
          if (response.status === 400) {
            setWrongPass(true);
          } else {
            setSomethingWrong(true);
          }
          return;
        }
      } catch (error) {
        setSomethingWrong(true);
      }
    } else {
      const emailInput = emailRef.current.value;
      const passInput = passRef.current.value;
      const confirmPassInput = confirmPassRef.current.value;
      if (passInput !== confirmPassInput) {
        setPassError(true);
        return;
      }
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4HniVVMIPPpNCfzZQTxDnuxWvwij4e2Y",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailInput,
              password: passInput,
              returnSecureToken: true,
            }),
          }
        );
        if (!response.ok) {
          if (response.status === 400) {
            setEmailExist(true);
          } else {
            setSomethingWrong(true);
          }
          return;
        }
        if (response.ok) {
          setRegisterSuccess(true);
          return;
        }
      } catch (error) {
        setSomethingWrong(true);
      }
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
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    ref={emailRef}
                  />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passRef}
                  />
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
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={confirmPassRef}
                    />
                  </FloatingLabel>
                </Form.Group>
              )}
              {passError && (
                <AlertUi
                  variant={"danger"}
                  heading={"Password Mismatch"}
                  body={"The passwords you've entered do not match."}
                />
              )}
              {registerSuccess && (
                <AlertUi
                  variant={"success"}
                  heading={"Registration Successful"}
                  body={
                    "Welcome aboard! Your account has been successfully created."
                  }
                />
              )}

              {somethingWrong && (
                <AlertUi
                  variant={"danger"}
                  heading={"Registration Failed"}
                  body={
                    "Oops! Something went wrong during registration. Please try again later."
                  }
                />
              )}
              {emailExist && (
                <AlertUi
                  variant={"danger"}
                  heading={"Account Already Exists"}
                  body={
                    "Sorry, it seems like you've already registered. Please try again later or log in."
                  }
                />
              )}
              {wrongPass && (
                <AlertUi
                  variant={"danger"}
                  heading={"Incorrect Password"}
                  body={
                    "Seems like you've entered the wrong password. Did you forget your password? You can reset it by clicking on 'Forgot Password'."
                  }
                />
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
                  variant={isLogin ? "outline-secondary" : "outline-primary"}
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
