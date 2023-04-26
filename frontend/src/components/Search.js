import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Seach = () => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form>
            <Row>
              <Col xs={9}>
                <Form.Control placeholder="Search for new image..." />
              </Col>
              <Col>
              <Button variant="primary" type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Seach;
