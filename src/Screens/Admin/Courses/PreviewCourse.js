import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Image1 from "../../../Images/image1.png";
import Image2 from "../../../Images/image2.png";
import Form from "react-bootstrap/Form";
import "./PreviewCourse.css";
import { CardHeader } from "@material-ui/core";

 const PreviewCourse = () => {
  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 previewCourse">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div>
              <h1 className="d-inline-block mb-3">
                Introduction to the Course
              </h1>
              <span className="backKey mt-2">
                <Link to={"/courses/courseaccordion"}> Back to Edit</Link>
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xl={10} lg={10} md={12} sm={12}>
            <div className="mt-2 previewPara">
              <p>
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and <br /> expound the
                actual teachings of the great explorer of the truth, the
                master-builder of human happiness. No one rejects, dislikes, or
                avoids pleasure itself, because it is
                <br />
                pleasure
              </p>
              <p>
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and <br /> expound the
                actual teachings of the great explorer of the truth, the
                master-builder of human happiness. No one rejects, dislikes, or
                avoids pleasure itself, because it is
                <br />
                pleasure
              </p>
              <p>
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and <br /> expound the
                actual teachings of the great explorer of the truth, the
                master-builder of human happiness. No one rejects, dislikes, or
                avoids pleasure itself, because it is
                <br />
                pleasure
              </p>
              <p>
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and <br /> expound the
                actual teachings of the great explorer of the truth, the
                master-builder of human happiness. No one rejects, dislikes, or
                avoids pleasure itself, because it is
                <br />
                pleasure
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xl={6} lg={6} md={6} sm={12}>
            <div className="previewImage mb-3">
              <img src={Image1} alt="Image" />
            </div>
          </Col>

          <Col xl={6} lg={6} md={6} sm={12}>
            <div className="previewImage mb-3">
              <img src={Image2} alt="Image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xl={11} lg={11} md={12} sm={12}>
            <div className="paraDetail mt-4">
              <h5>Lorem Ipsum</h5>
              <p>
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure
              </p>
              <h5>Lorem Ipsum</h5>
              <p>
                But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure
              </p>
            </div>
          </Col>
        </Row>

        <div className="mt-3">
          <h4>Videos</h4>
        </div>

        <Row>
          <Col xl={4} lg={4} md={6} sm={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="355"
                height="200"
                src="https://www.youtube.com/embed/zpOULjyy-n8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>

          <Col xl={4} lg={4} md={6} sm={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="355"
                height="200"
                src="https://www.youtube.com/embed/zpOULjyy-n8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>

          <Col xl={4} lg={4} md={6} sm={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="355"
                height="200"
                src="https://www.youtube.com/embed/zpOULjyy-n8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>

          <Col xl={4} lg={4} md={6} sm={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="355"
                height="200"
                src="https://www.youtube.com/embed/zpOULjyy-n8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>

          <Col xl={4} lg={4} md={6} sm={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="355"
                height="200"
                src="https://www.youtube.com/embed/zpOULjyy-n8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
          <Col xl={4} lg={4} md={6} sm={12}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="355"
                height="200"
                src="https://www.youtube.com/embed/zpOULjyy-n8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
        </Row>

        <div className="mt-3">
          <h4>Quizzes</h4>
        </div>

        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="quizSections">
              <div className="quizSection1 mt-3 mb-3">
                <Card className="border-none">
                  <Card.Header className="p-0 border-none">
                    <span>Q.1.</span>
                    <h6 className="d-inline-block">
                      {" "}
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis.{" "}
                    </h6>
                  </Card.Header>
                  <Card.Body className="pt-3 pb-3 pl-3">
                    <div className="radiobox">
                      <p>
                        <span>
                          <span className="blackBorder"></span>
                        </span>
                        Option A
                      </p>
                    </div>

                    <div className="radiobox">
                      <p>
                        <span></span>
                        Option A
                      </p>
                    </div>

                    <div className="radiobox">
                      <p>
                        <span></span>
                        Option A
                      </p>
                    </div>

                    <div className="radiobox">
                      <p>
                        <span></span>
                        Option A
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="mt-3 mb-3">
                <Card className="border-none">
                  <Card.Header className="p-0 border-none">
                    <span>Q.2.</span>
                    <h6 className="d-inline-block">
                      {" "}
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis.{" "}
                    </h6>
                  </Card.Header>
                  <Card.Body className="pt-3 pb-3 pl-3"></Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default PreviewCourse;