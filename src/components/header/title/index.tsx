import React from "react";
import "./style.css";

// Define props interface
interface FaqFormHeaderProps {
  header: string; // Title text for the header (e.g., "Edit FAQs")
  context: string; // Additional context or description (e.g., "Manage and update FAQ entries")
  icon: React.ReactNode; // Accept any React component (icon)
}

// Functional component to display a header with an icon
const Title: React.FC<FaqFormHeaderProps> = ({
  header,
  context,
  icon,
}) => {
  return (
    <div className="edit-faqs-container">
      <div className="edit-faq-header-container">
        {/* Render the icon prop */}
        {icon && <span className="faq-icon">{icon}</span>}

        {/* Main header text */}
        <h1 className="edit-faqs-header">{header}</h1>
      </div>

      {/* Contextual description */}
      <span className="edit-faqs-context">{context}</span>
    </div>
  );
};

export default Title;
