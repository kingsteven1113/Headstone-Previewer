import React from 'react';
import { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose }) {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowButtons(false);
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={showButtons ? onClose : null}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {showButtons && (
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        )}
        <h2 className="modal-title">How It Works</h2>
        <div className="modal-body">
          <p>
            Welcome to the Headstone Previewer! This tool allows you to customize and preview headstone designs in real-time.
          </p>
          <h3>Here's how to use it:</h3>
          <ul>
            <li><strong>Select a Stone Type:</strong> Choose from our available granite colors and finishes on the left panel.</li>
            <li><strong>Pick a Color:</strong> Browse through available color options to customize your design.</li>
            <li><strong>Choose a Shape:</strong> Select the headstone shape that matches your preference.</li>
            <li><strong>Preview:</strong> Watch the preview update in real-time as you make changes.</li>
            <li><strong>Reset:</strong> Click the Reset button at any time to start over with default selections.</li>
          </ul>
          <p>
            Once you've completed your design, please fill out and submit the form on the right side of the page. This will allow us to contact you about scheduling an appointment to discuss your perfect headstone design.
          </p>
        </div>
        {showButtons && (
          <button className="modal-got-it-btn" onClick={onClose}>
            Got It
          </button>
        )}
        {!showButtons && (
          <div className="modal-button-placeholder">
            Please read the instructions above...
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
