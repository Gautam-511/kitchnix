function CuisineCard  ({ imageSrc, title, description }) {
    return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 text-center">
          View Recipes
        </button>
      </div>
    </div>
  )}

  export default CuisineCard;