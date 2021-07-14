import React from "react";
import { Toast  } from "react-bootstrap";

export default function ToastMessage({ title, message, close }) {
    return (
        <Toast onClose={() => close()} show>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}