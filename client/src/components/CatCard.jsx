import React from "react"

const CatCard = ({ image, title }) => {
  return (
    <div
      className={`card card-compact bg-primary text-primary-content w-36 transform hover:scale-95 hover:shadow-lg`}
    >
      <figure>
        <img src={image} alt={title} className="bg-cover" />
      </figure>
      <p className="card-title self-center">{title}</p>
    </div>
  )
}

export default CatCard
