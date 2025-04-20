import React from "react";
import "./OptionCard.scss";
import ArrowRight from "../../assets/arrow-right.svg";

interface OptionCardProps {
  icon: string;
  text: string;
  onClick: () => void;
  alt?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ icon, text, onClick, alt = "Ícone" }) => {
  return (
    <div className="default-border option-card" onClick={onClick}>
      <section>
        <img src={icon} alt={alt} width="32px" />
        <p>{text}</p>
      </section>
      <img src={ArrowRight} alt="Seta para direita" width="17px" />
    </div>
  );
};

export default OptionCard;