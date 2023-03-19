import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Row, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, CardSubtitle,
    FormText,
} from 'reactstrap';
import { connect } from "react-redux";
import { createMedicineAction } from "../../../actions/medicines";
import Swal from "sweetalert2";
const defaultFormData = {
    name: "name",
    description: "description",
    category: "cat",
    formula: "formula",
    antibiotic: true,
    chemicals: "a, b, c"
}
const AddMedicine = ({ user, createMedicineAction, history }) => {
    const [formData, setFormData] = useState(defaultFormData);

    const submitForm = (e) => {
        e.preventDefault();
    }
    const onInput = (e, key) => {
        console.log(e.target.value, key);
        var value = e.target.value;
        var data = { ...formData };
        data[key] = value;
        setFormData(data);
    };
    const antibioticToggle = (e, value) => {
        console.log(e.target.value, value);
        var data = { ...formData };
        data["antibiotic"] = value;
        setFormData(data);
    };
    const createMedicine = () => {
        var data = { ...formData };
        var chemicals = data.chemicals ? data.chemicals.split(",").map(e => e.trim()) : [];
        data.chemicals = chemicals;
        console.log(user, "user")
        data.production = user._id;
        console.log(data, "data");
        createMedicineAction(data, (res) => {
            Swal.fire({
                title: res.error ? 'Error' : 'Success',
                text: res.message,
                icon: res.error ? 'error' : 'success',
                confirmButtonText: 'Ok',
            }).then(() => {
                history.push("/medicine")
            })
        });
    }
    const {
        name,
        description,
        category,
        formula,
        antibiotic,
        chemicals,
    } = formData;
    return (
        <Fragment>
            <ReactCSSTransitionGroup
                className="login-page"
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Card className="login-card mb-3 pt-2 pb-2">
                    <CardBody>
                        <CardTitle>Create Medicine</CardTitle>
                        <CardSubtitle>
                            Wooho! New Medicine for your Inventory? Add it right away.
                        </CardSubtitle>
                        <Form onSubmit={submitForm}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Name</Label>
                                        <Input value={name} onChange={(e) => onInput(e, "name")} type="email" name="name" id="name"
                                            placeholder="Enter Medicine Name" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleText">Description</Label>
                                        <Input value={description} onChange={(e) => onInput(e, "description")} type="textarea" name="text" id="exampleText" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Category</Label>
                                        <Input value={category} onChange={(e) => onInput(e, "category")} type="email" name="email" id="email"
                                            placeholder="Enter Category" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Formula</Label>
                                        <Input value={formula} onChange={(e) => onInput(e, "formula")} type="email" name="email" id="email"
                                            placeholder="Enter Formula" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup tag="fieldset" row>
                                <legend className="col-form-label col-sm-2">Medicine Type</legend>
                                <Col md={6}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input value={antibiotic} onChange={(e) => antibioticToggle(e, true)} type="radio" name="radio1" />{' '}
                                            Antibiotic
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input value={!antibiotic} onChange={(e) => antibioticToggle(e, false)} type="radio" name="radio1" />{' '}
                                            Non-Antibiotic
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleText">Enter Chemicals</Label>
                                        <Input value={chemicals} onChange={(e) => onInput(e, "chemicals")} placeholder="Enter all chemicals used in production of this medicine" type="textarea" name="text" id="exampleText" />
                                        <FormText color="muted">
                                            Enter all chemicals name seperated by comma (,)
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end align-items-center">
                                <Button onClick={createMedicine} color="primary" className="mt-2">Create Medicine</Button>
                            </div>
                        </Form>

                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    )
};


const mapStateToProps = ({ Register, Login }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
    user: Login.user,
});

const mapDispatchToProps = {
    createMedicineAction: createMedicineAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddMedicine);