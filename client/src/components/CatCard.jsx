import React from "react"

const CatCard = ({ image, title }) => {
  // Determine the image URL based on the condition
  const imageUrl =
    image === "vocab_placeholder" || image === "category_placeholder"
      ? `/${image}.jpg`
      : image

  return (
    <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full">
      <figure className="px-4 pt-4">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-xl object-cover w-full h-48"
        />
      </figure>
      <div className="card-body p-4 text-center">
        <h3 className="card-title text-primary-content justify-center text-lg">
          {title}
        </h3>
      </div>
    </div>
  )
}

export default CatCard
