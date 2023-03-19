import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Row, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, CardSubtitle,
    FormText,
} from 'reactstrap';
import { connect } from "react-redux";
import { addStockAction } from "../../../actions/stocks";
import { getMedicinesAction } from "../../../actions/medicines";
import Swal from "sweetalert2";
const defaultFormData = {
    unit: 32,
    price: 32,

}
const AddStocks = ({ user, getMedicinesAction, history, medicines, addStockAction }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getMedicines();
    }, [])
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

    const getMedicines = () => {
        getMedicinesAction(user._id);
    };
    const addStock = () => {
        console.log("adding stocks");
        var data = { ...formData };
        data.production = user._id;
        console.log(data, 'data');
        addStockAction(data, (res) => {
            console.log(res, 'res');
            Swal.fire({
                title: res.error ? 'Error' : 'Success',
                text: res.message,
                icon: res.error ? 'error' : 'success',
                confirmButtonText: 'Ok',
            }).then(() => {
                history.push("/stocks")
            })
        })

    }

    const {
        units,
        medicine,
        price,
        manDate,
        expiryDate

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
                        <CardTitle>Add Stocks</CardTitle>
                        <CardSubtitle>
                            Produced some new stocks?
                            Add it into Medichain.
                        </CardSubtitle>
                        <Form onSubmit={submitForm}>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Select Medicine</Label>
                                        <Input value={medicine} onChange={(e) => onInput(e, "medicine")} type="select" name="select" id="exampleSelect">
                                            {
                                                medicines.map((e) => {
                                                    return <option value={e._id}>{e.name}</option>
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Units</Label>
                                        <Input value={units} onChange={(e) => onInput(e, "units")} type="number" name="units" id="units"
                                            placeholder="Enter No. of Units" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Price per Unit ($)</Label>
                                        <Input value={price} onChange={(e) => onInput(e, "price")} type="number" name="email" id="email"
                                            placeholder="Enter Price" />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Manufacturing Date</Label>
                                        <Input value={manDate} onChange={(e) => onInput(e, "manDate")} type="date" name="units" id="units"
                                            placeholder="Enter Manufacturing Date" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail11">Expiry Date</Label>
                                        <Input value={expiryDate} onChange={(e) => onInput(e, "expiryDate")} type="date" name="email" id="email"
                                            placeholder="Enter Expiry Date" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end align-items-center">
                                <Button onClick={addStock} color="primary" className="mt-2">Add Stocks</Button>
                            </div>
                        </Form>

                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    )
};


const mapStateToProps = ({ Register, Login, Medicine }) => ({
    isLoading: Register.isLoading,
    error: Register.error,
    user: Login.user,
    medicines: Medicine.medicines
});

const mapDispatchToProps = {
    getMedicinesAction: getMedicinesAction,
    addStockAction, addStockAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddStocks);