import React, { useState } from 'react';
import "../../styles/ScheduleVisitDialog.css" // Importing the CSS file for styling

function ScheduleVisitDialog({ isOpen, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(name, mobile);
        onClose();
    };

    return (
        <div className="whatsapp-dialog-overlay">
            <div className="whatsapp-dialog">
                <header className="whatsapp-header">
                    <div className="whatsapp-avatar"></div>
                    <div className="whatsapp-title">Schedule a Visit</div>
                    <button onClick={onClose} className="whatsapp-close">X</button>
                </header>
                <div className="whatsapp-body">
                    <div className="whatsapp-message">
                        <p>Enter your details below to schedule a visit:</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="whatsapp-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        className="whatsapp-input"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <footer className="whatsapp-footer">
                    <button onClick={handleSubmit} className="whatsapp-send-btn">Send Message</button>
                </footer>
            </div>
        </div>
    );
}

export default ScheduleVisitDialog;
