import React  from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


class UpdateBook extends React.Component{
render(){
    return (
    <div>
<Modal show={this.props.showModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={this.props.updateBook}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Name" name="name" />

                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Desciption" name="description" />

                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Status" name="status" />

                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book Image</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Image" name="image" />

                            </Form.Group>

                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                                <Button variant="secondary" onClick={this.props.handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>


                </Modal>


    </div>
)}


}

export default UpdateBook;
