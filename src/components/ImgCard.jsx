import React from "react";

const ImgCard = ({ image, title, isPlaceholder }) => {
  return (
    <div
      className={`card card-compact bg-primary text-primary-content w-48 transform hover:scale-95`}
    >
      <figure>
        <img src={image} alt={title} className="p-6 w-8/12" />
      </figure>
      <div className="card-body p-0">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
};

export default ImgCard;
