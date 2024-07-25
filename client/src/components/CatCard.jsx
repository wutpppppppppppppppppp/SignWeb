import React from "react"

const CatCard = ({ image, title }) => {
  return (
    <div className="card bg-lightergray shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-xs">
      <figure className="px-4 pt-4">
        <img src={image} alt={title} className="rounded-xl object-cover w-full aspect-square" />
      </figure>
      <div className="card-body p-4 text-center">
        <h3 className="card-title text-primary-content justify-center text-lg">{title}</h3>
      </div>
    </div>
  );
}
export default CatCard;
