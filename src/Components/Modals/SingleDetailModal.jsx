import React from 'react';

function Modal({ content, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full mx-4">
        <button onClick={onClose} className="float-right font-bold">X</button>
        <div>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Modal;
