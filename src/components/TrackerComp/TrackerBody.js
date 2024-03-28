import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DisplaySliceActions } from "../../store/DisplaySlice";

const TrackerBody = (props) => {
  const dispatch = useDispatch();
  const displayData = useSelector((state) => state.Display.items);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [editedData, setEditedData] = useState({
    item: "",
    price: "",
    description: "",
  });

  const handleDelete = (itemId) => {
    dispatch(DisplaySliceActions.DeleteItem(itemId));
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditedData({
      item: item.item,
      price: item.price,
      description: item.description,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditedItem(null);
    setShowEditModal(false);
  };

  const handleSaveEdit = () => {
    dispatch(
      DisplaySliceActions.UpdateItem({
        id: editedItem.id,
        updatedItem: { ...editedData },
      })
    );
    handleCloseEditModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
                {displayData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <Button
                          variant="outline-warning"
                          size="sm"
                          style={{ width: "45%" }}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{ width: "50%" }}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="editItem" className="form-label">
                Item
              </label>
              <input
                type="text"
                className="form-control"
                id="editItem"
                name="item"
                value={editedData.item}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editPrice" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="editPrice"
                name="price"
                value={editedData.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="editDescription"
                rows="3"
                name="description"
                value={editedData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrackerBody;
