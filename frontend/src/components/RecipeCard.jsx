function RecipeCard({ title, description, imageUrl }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-full text-center hover:bg-green-700">View Recipe</button>
        </div>
      </div>
    );
  }
  
  export default RecipeCard;