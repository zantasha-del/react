import React, { useState } from "react";
import {
    Table,
    Button,
    Row,
    Col,
    Input,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrashAlt,
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import {initialData} from "./data"

const UserData = () => {
    const [users, setUsers] = useState(initialData);
    const [modalOpen, setModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [user, setUser] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [modalHeader, setModalHeader] = useState('');
    const [modalButtonText, setModalButtonText] = useState('');

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };
    const handleAction = (type, user, headerText, buttonText) => {
        setActionType(type);
        setModalHeader(headerText);
        setModalButtonText(buttonText)
        setUser(user);
        toggleModal();
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleUserAction = () => {
        if (actionType === 'delete') {
            const filteredUsers = users.filter(u => u.id !== user.id);
            setUsers(filteredUsers);
        } else if (actionType === 'add') {
            const newUser = {
                id: uuidv4(),
                ...user
            };
            setUsers([...users, newUser]);
        } else if (actionType === 'edit') {
            const updatedUsers = users.map(u => u.id === user.id ? user : u);
            setUsers(updatedUsers);
        }
        toggleModal();
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredUsers = users.filter(user =>
        user.id.includes(searchQuery) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <Row>
                <Col lg="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row className="mb-3">
                                <Col xs="12" md="6">
                                    <Input
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </Col>
                                <Col xs="4" md="6">
                                    <Button color="danger" className="float-end"
                                        onClick={() => handleAction('add', null, "Add User", "Add User")}
                                    >Add</Button>
                                </Col>
                            </Row>
                            <Table className="mb-0" bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>
                                                <Row className="g-1">
                                                    <Col xs="12" md="4">
                                                        <Button
                                                            block
                                                            outline
                                                            color="primary"
                                                            onClick={() => handleAction('view', user, "View User", "Close")}
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Button>
                                                    </Col>
                                                    <Col xs="12" md="4">
                                                        <Button
                                                            block
                                                            outline
                                                            color="secondary"
                                                            onClick={() => handleAction('edit', user, "Edit User", "Update")}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </Button>
                                                    </Col>
                                                    <Col xs="12" md="4">
                                                        <Button
                                                            block
                                                            outline
                                                            color="danger"
                                                            onClick={() => handleAction('delete', user, "Delete User", "Yes")}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    {modalHeader}
                </ModalHeader>
                <ModalBody>
                    {actionType !== 'delete' ? (
                        <>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>Email</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="text"
                                        className="py-2"
                                        name='email'
                                        value={user?.email}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>Username</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="text"
                                        className="py-2"
                                        name='username'
                                        value={user?.username}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>First Name</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="text"
                                        className="py-2"
                                        name='firstName'
                                        value={user?.firstName}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>Address</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="text"
                                        className="py-2"
                                        name='address'
                                        value={user?.address}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>Phone</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="text"
                                        className="py-2"
                                        name='phoneNumber'
                                        value={user?.phoneNumber}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>Admin</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="checkbox"
                                        className="py-2"
                                        name='is_admin'
                                        checked={user?.is_admin}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 gx-2">
                                <Col xs="2">
                                    <Label className="mt-2">
                                        <b>Verified</b>
                                    </Label>
                                </Col>
                                <Col xs="10">
                                    <Input
                                        type="checkbox"
                                        className="py-2"
                                        name='is_verified'
                                        checked={user?.is_verified}
                                        onChange={handleChange}
                                        disabled={actionType === 'view'}
                                    />
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Row className="mb-3 gx-2">
                            <Col xs="12">
                                <p className="mt-2">
                                    Are you sure you want to delete this?
                                </p>
                            </Col>
                        </Row>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUserAction}>
                        {modalButtonText}
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        {actionType === 'delete' ? 'No' : 'Cancel'}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UserData;
