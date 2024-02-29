import React, { Fragment, useState, useEffect } from "react";
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
    Label,
    Form
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrashAlt,
    faEye
} from "@fortawesome/free-solid-svg-icons";

const UserData = () => {
    const [res, setRes] = useState([
        {
            "id": "8d3b61c3-74f4-4496-9761-ec43c26d1947",
            "username": "zantasha",
            "email": "zantashaazam@gmail.com",
            "phoneNumber": "+92300-1234567",
            "firstName": "Zantasha",
            "address": "Sialkot, Punjab, Pakistan",
            "is_verified": true,
            "is_admin": true,
        },
        {
            "id": "8d3b61c3-74f4-4496-9761-ec43c26d1987",
            "username": "Taasha",
            "email": "taashakhan@gmail.com",
            "phoneNumber": "+92301-1234567",
            "firstName": "Taasha",
            "address": "Sialkot, Punjab, Pakistan",
            "is_verified": true,
            "is_admin": false,
        }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [user, setUser] = useState(
        {
            id: '8d3b61c3-74f4-4496-9761-ec43c26d1978',
            username: '',
            email: '',
            phoneNumber: '',
            firstName: '',
            address: '',
            is_verified: false,
            is_admin: false,
        }
    );
    const [searchQuery, setSearchQuery] = useState('');


    let addHandleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };

    let editHandleChange = (e) => {
        setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleAction = (type, user) => {
        setActionType(type);
        setSelectedUser(user);
        toggleModal();
    };

    let addUser = () => {
        setRes([...res, user]);
        toggleModal()
        setUser({
            id: '8d3b61c3-74f4-4496-9761-ec43c26d1978',
            username: '',
            email: '',
            phoneNumber: '',
            firstName: '',
            address: '',
            is_verified: false,
            is_admin: false,
        })
    };
    let editUser = () => {
        const updatedData = res.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    email: selectedUser.email,
                    firstName: selectedUser.firstName,
                    address: selectedUser.address,
                    phoneNumber: selectedUser.phoneNumber,
                    is_admin: selectedUser.is_admin,
                    is_verified: selectedUser.is_verified
                };
            }
            return user;
        });

        setRes(updatedData);
        toggleModal()
    };
    let deleteUser = () => {
        const data = res.filter(item => item.id !== selectedUser)
        setRes(data)
        toggleModal()
    }
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRes = res.filter(user =>
        user.id.includes(searchQuery) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const renderBodyContent = () => {
        switch (actionType) {
            case 'add':
                return (
                    <Form>
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
                                    value={user.email}
                                    onChange={addHandleChange}
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
                                    value={user.username}
                                    onChange={addHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
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
                                    value={user.firstName}
                                    onChange={addHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
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
                                    value={user.address}
                                    onChange={addHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
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
                                    value={user.phoneNumber}
                                    onChange={addHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
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
                                    checked={user.is_admin}
                                    onChange={addHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
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
                                    checked={user.is_verified}
                                    onChange={addHandleChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                );
            case 'view':
                return (
                    <Fragment>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p>
                                    <b>Email</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p>{selectedUser.email}</p>
                            </Col>
                        </Row>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p>
                                    <b>Username</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p>{selectedUser.username}</p>
                            </Col>
                        </Row>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p>
                                    <b>First Name</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p>{selectedUser.firstName}</p>
                            </Col>
                        </Row>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p className="mt-2">
                                    <b>Address</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p>{selectedUser.address}</p>
                            </Col>
                        </Row>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p>
                                    <b>Phone</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p >{selectedUser.phoneNumber}</p>
                            </Col>
                        </Row>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p>
                                    <b>Admin</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p>{selectedUser.is_admin ? 'Yes' : 'No'}</p>
                            </Col>
                        </Row>
                        <Row className="mb-1 gx-2">
                            <Col xs="2">
                                <p>
                                    <b>Verified</b>
                                </p>
                            </Col>
                            <Col xs="10">
                                <p>{selectedUser.is_verified ? 'Yes' : 'No'}</p>
                            </Col>
                        </Row>
                    </Fragment>
                );

            case 'edit':
                return (
                    <Form>
                        <Row className="mb-3 gx-2">
                            <Col xs="2">
                                <Label className="mt-2">
                                    <b>ID</b>
                                </Label>
                            </Col>
                            <Col xs="10">
                                <Input
                                    type="text"
                                    className="py-2"
                                    disabled
                                    name='id'
                                    value={selectedUser.id}
                                />
                            </Col>
                        </Row>
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
                                    value={selectedUser.email}
                                    name='email'
                                    onChange={editHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
                            <Col xs="2">
                                <Label className="mt-2">
                                    <b>Full Name</b>
                                </Label>
                            </Col>
                            <Col xs="10">
                                <Input
                                    type="text"
                                    className="py-2"
                                    value={selectedUser.firstName}
                                    name='firstName'
                                    onChange={editHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
                            <Col xs="2">
                                <Label className="mt-2">
                                    <b>Address</b>
                                </Label>
                            </Col>
                            <Col xs="10">
                                <Input
                                    type="text"
                                    className="py-2"
                                    value={selectedUser.address}
                                    name='address'
                                    onChange={editHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
                            <Col xs="2">
                                <Label className="mt-2">
                                    <b>Phone</b>
                                </Label>
                            </Col>
                            <Col xs="10">
                                <Input
                                    type="text"
                                    className="py-2"
                                    value={selectedUser.phoneNumber}
                                    name="phoneNumber"
                                    onChange={editHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
                            <Col xs="2">
                                <Label className="mt-2">
                                    <b>Admin</b>
                                </Label>
                            </Col>
                            <Col xs="10">
                                <Input
                                    type="checkbox"
                                    className="py-2"
                                    checked={selectedUser.is_admin}
                                    name='is_admin'
                                    onChange={editHandleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2 gx-2">
                            <Col xs="2">
                                <Label className="mt-2">
                                    <b>Verified</b>
                                </Label>
                            </Col>
                            <Col xs="10">
                                <Input
                                    type="checkbox"
                                    className="py-2"
                                    checked={selectedUser.is_verified}
                                    name='is_verified'
                                    onChange={editHandleChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                );
            case 'delete':
                return (
                    <Fragment>
                        <Row className="mb-3 gx-2">
                            <Col xs="12">
                                <p className="mt-2">
                                    Are you sure you want to delete this?
                                </p>
                            </Col>
                        </Row>
                    </Fragment>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Row>
                <Col lg="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row className="mb-3">
                                <Col xs="12" md="6">
                                    <Input placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </Col>
                                <Col xs="4" md="6">
                                    <Button color="danger" className="float-end"
                                        onClick={() => handleAction('add', null)}
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
                                    {filteredRes.map((user, index) => (
                                        <Fragment key={index}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {user.id}
                                                </td>
                                                <td>{user.firstName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    {user.phoneNumber}
                                                </td>

                                                <td>
                                                    {user.address}
                                                </td>
                                                <td>
                                                    <Row className="g-1">
                                                        <Col xs="12" md="4">
                                                            <Button
                                                                block
                                                                outline
                                                                color="primary"
                                                                onClick={() => handleAction('view', user)}
                                                            >
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </Button>
                                                        </Col>
                                                        <Col xs="12" md="4">
                                                            <Button
                                                                block
                                                                outline
                                                                color="secondary"
                                                                onClick={() => handleAction('edit', user)}
                                                            >
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </Button>
                                                        </Col>
                                                        <Col xs="12" md="4">
                                                            <Button
                                                                block
                                                                outline
                                                                color="danger"
                                                                onClick={() => handleAction('delete', user.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    {actionType === 'add' && 'Add User'}
                    {actionType === 'view' && 'View User'}
                    {actionType === 'edit' && 'Edit User'}
                    {actionType === 'delete' && 'Delete User'}
                </ModalHeader>
                <ModalBody>
                    {renderBodyContent()}
                </ModalBody>
                <ModalFooter>
                    {actionType === 'add' && (
                        <Button color="primary"
                            onClick={addUser}
                        >
                            Add
                        </Button>
                    )}
                    {actionType === 'edit' && (
                        <Button color="primary"
                            onClick={editUser}
                        >
                            Edit
                        </Button>
                    )}
                    {actionType === 'delete' && (
                        <>
                            <Button color="primary" onClick={deleteUser}>
                                Yes
                            </Button>
                            <Button color="secondary" onClick={toggleModal}>
                                No
                            </Button>
                        </>
                    )}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default UserData
