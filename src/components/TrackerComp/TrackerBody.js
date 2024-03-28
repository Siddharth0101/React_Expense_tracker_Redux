import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
const TrackerBody = (props) => {
  const displayItems = useSelector((state) => state.LogInStore.items);
  console.log(displayItems);
  const handleDelete = () => {};
  const handleEdit = () => {};
  return (
    <div style={{ backgroundColor: "black", height: "41.5vh", width: "100vw" }}>
      <Card
        style={{
          width: "102rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "gray",
          marginLeft: "40px",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            List Of Expenses
          </Card.Title>
          <Card.Text>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <ButtonGroup style={{ width: "100%" }}>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            style={{ width: "50%" }}
                            onClick={() => handleEdit()}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            style={{ width: "50%" }}
                            onClick={() => handleDelete()}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default TrackerBody;
