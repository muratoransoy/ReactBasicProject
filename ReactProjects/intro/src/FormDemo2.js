import React, { Component } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import  alertify  from 'alertifyjs'

export default class FomDemo2 extends Component {

    state = { email: "", password: "", city: "", description: "" }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({ [name]: value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alertify.success(this.state.email + " added to db!", 2);
        alertify.success(this.state.password + " added to db!", 2);
        alertify.success(this.state.city + " added to db!", 2);
        alertify.success(this.state.description + " added to db!", 2);

    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="with a placeholder"
                                    type="email"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="password">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="password placeholder"
                                    type="password"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description">
                            Description
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            placeholder="1234 Main St"
                            type="textarea"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">
                            Address 2
                        </Label>

                        <Input
                            id="city"
                            name="city"
                            placeholder="Apartment, studio, or floor"
                            type="select"
                            onChange={this.handleChange}>
                            <option>Edirne</option>
                            <option>Çanakkale</option>
                            <option>İstanbul</option>
                            <option>İzmir</option>
                            <option>Ankara</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        )
    }
}