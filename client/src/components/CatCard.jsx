import React from "react"

const CatCard = ({ image, title }) => {
  // Determine if the image is a placeholder
  const isPlaceholder =
    image === "vocab_placeholder" || image === "category_placeholder"

  // Determine the image URL based on the condition
  const imageUrl = isPlaceholder ? `/${image}.jpg` : image

  return (
    <div
      className={`card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full ${
        isPlaceholder ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-disabled={isPlaceholder}
    >
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
