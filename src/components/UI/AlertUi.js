import Alert from "react-bootstrap/Alert";
const AlertUi = (props) => {
  return (
    <div>
      <Alert variant={props.variant} dismissible>
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p>{props.body}</p>
      </Alert>
    </div>
  );
};
export default AlertUi;
