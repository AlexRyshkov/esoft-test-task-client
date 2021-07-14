import React from "react";
import { Modal } from "react-bootstrap";

export default function CenteredModal({ component: Component, title = "", ...props }) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Component />
            </Modal.Body>
        </Modal>
    );
}