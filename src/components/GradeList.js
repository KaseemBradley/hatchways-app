import React, { useState } from "react";

function GradeList({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="button-container">
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "-" : "+"}
        </button>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

export default GradeList;
