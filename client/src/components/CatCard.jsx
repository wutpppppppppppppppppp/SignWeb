import React from "react"

const CatCard = ({ image, title }) => {
  return (
    <div className="card card-compact bg-primary text-primary-content w-36 transform hover:scale-95 hover:shadow-lg">
      <figure className="flex justify-center items-center overflow-hidden">
        <img src={image} alt={title} className="w-32 h-32 object-cover" />
      </figure>
      <p className="card-title self-center mt-2">{title}</p>
    </div>
  );
}

export default CatCard;
