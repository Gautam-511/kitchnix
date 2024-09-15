import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Search, Menu, X, Clock, IndianRupee, Globe } from 'lucide-react'
import axios from 'axios';

const RecipeCard = ({ recipe, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
    <img src={recipe.recipe_imgurl} alt={recipe.recipe_name} className="w-full h-48 object-cover rounded-md mb-4" />
    <h3 className="font-semibold text-lg text-gray-800 mb-2">{recipe.recipe_name}</h3>
    <p className="text-sm text-gray-600 mb-2">{recipe.recipe_description}</p>
    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
      <span className="flex items-center"><Globe size={16} className="mr-1" /> {recipe.recipe_cuisine}</span>
      <span className="flex items-center"><Clock size={16} className="mr-1" /> {recipe.recipe_cooktime} mins</span>
      <span className="flex items-center"><IndianRupee size={16} className="mr-1" /> {recipe.recipe_cost}</span>
    </div>
    <div className="flex justify-end space-x-2 mt-auto">
      <button
        onClick={() => onEdit(recipe)}
        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
      >
        <Edit size={20} />
      </button>
      <button
        onClick={() => onDelete(recipe.recipe_id)}
        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
)

const RecipeForm = ({ recipe, onSave, onCancel }) => {
  const [name, setName] = useState(recipe?.recipe_name || '')
  const [description, setDescription] = useState(recipe?.recipe_description || '')
  const [cuisine, setCuisine] = useState(recipe?.recipe_cuisine || '')
  const [cookTime, setCookTime] = useState(recipe?.recipe_cooktime || '')
  const [cost, setCost] = useState(recipe?.recipe_cost || '')
  const [imageUrl, setImageUrl] = useState(recipe?.recipe_imgurl || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      recipe_id: recipe?.recipe_id,
      recipe_name: name,
      recipe_description: description,
      recipe_cuisine: cuisine,
      recipe_cooktime: cookTime,
      recipe_cost: cost,
      recipe_imgurl: imageUrl,
    });
    
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{recipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <input
            type="text"
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
            Cook Time (minutes)
          </label>
          <input
            type="number"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
            Cost
          </label>
          <input
            type="text"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
            required
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save Recipe
        </button>
      </div>
    </form>
  )
}

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([
  // {
  //   recipe_id: 110,
  //   recipe_name: "Paneer Tikka",
  //   recipe_description: "Marinated cubes of paneer (Indian cottage cheese) grilled to perfection.",
  //   recipe_cuisine: "Indian",
  //   recipe_cooktime: 30,
  //   recipe_cost: "150",
  //   recipe_imgurl: "/placeholder.svg?height=192&width=384",
  //   recipe_isveg: true,
  //   recipe_level: ""
  // },
  // {
  //   recipe_id: 120,
  //   recipe_name: "Chole Bhature",
  //   recipe_description: "Spicy chickpea curry served with deep-fried bread called bhature.",
  //   recipe_cuisine: "Indian",
  //   recipe_cooktime: 50,
  //   recipe_cost: "220",
  //   recipe_imgurl: "/placeholder.svg?height=192&width=384",
  //   recipe_isveg: true,
  //   recipe_level: ""
  // },
  // {
  //   recipe_id: 130,
  //   recipe_name: "Palak Paneer",
  //   recipe_description: "Spinach and paneer cooked together in a flavorful gravy.",
  //   recipe_cuisine: "Indian",
  //   recipe_cooktime: 30,
  //   recipe_cost: "180",
  //   recipe_imgurl: "/placeholder.svg?height=192&width=384",
  //   recipe_isveg: true,
  //   recipe_level: ""
  // },
  // {
  //   recipe_id: 140,
  //   recipe_name: "Aloo Gobi",
  //   recipe_description: "A dry curry made with potatoes and cauliflower, seasoned with Indian spices.",
  //   recipe_cuisine: "Indian",
  //   recipe_cooktime: 35,
  //   recipe_cost: "150",
  //   recipe_imgurl: "/placeholder.svg?height=192&width=384",
  //   recipe_isveg: true,
  //   recipe_level: ""
  // },
  // {
  //   recipe_id: 150,
  //   recipe_name: "Dal Tadka",
  //   recipe_description: "Spiced lentils cooked with onions, tomatoes, and a tempering of cumin and garlic.",
  //   recipe_cuisine: "Indian",
  //   recipe_cooktime: 40,
  //   recipe_cost: "200",
  //   recipe_imgurl: "/placeholder.svg?height=192&width=384",
  //   recipe_isveg: true,
  //   recipe_level: ""
  // }
]
)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [isAddingRecipe, setIsAddingRecipe] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getrecipe = async () => {
    setIsLoading(true);
    try {
      const response  = await axios.get('http://localhost:3000/admin',{
        headers:{
          'Authorization' : localStorage.getItem('token')
        }
      });
      setRecipes([...response.data])
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    
  }
  // getrecipe();

  useEffect(() => {
    getrecipe();
  },[])

  const filteredRecipes = recipes.filter(recipe =>
    recipe.recipe_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddRecipe = () => {
    setIsAddingRecipe(true)
    setEditingRecipe(null)
  }

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe)
    setIsAddingRecipe(false)
  }

  const handleDeleteRecipe = async (recipe_id) => {
    console.log(recipe_id);
    try {
      await axios.delete(`http://localhost:3000/admin/deleterecipe/${recipe_id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      // Remove the deleted recipe from the state
      setRecipes(recipes.filter(recipe => recipe.recipe_id !== recipe_id));
      console.log(`Recipe with ID ${recipe_id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  }

  const handleSaveRecipe = async (recipe) => {
    if (recipe.recipe_id) {
      console.log(recipe.recipe_id);
      await axios.put(`http://localhost:3000/admin/updaterecipe/${recipe.recipe_id}`, {
        recipe_name: recipe.recipe_name,
        recipe_description: recipe.recipe_description,
        recipe_cuisine: recipe.recipe_cuisine,
        recipe_cooktime: recipe.recipe_cooktime,
        recipe_cost: recipe.recipe_cost,
        recipe_imgurl: recipe.recipe_imgurl,
      }, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      });
      setRecipes(recipes.map(r => r.recipe_id === recipe.recipe_id ? recipe : r))
    } else {
         // If the recipe doesn't have an ID, it's a new recipe
         const response = await axios.post('http://localhost:3000/admin/addrecipe', {
          recipe_name: recipe.recipe_name,
          recipe_description: recipe.recipe_description,
          recipe_cuisine: recipe.recipe_cuisine,
          recipe_cooktime: recipe.recipe_cooktime,
          recipe_cost: recipe.recipe_cost,
          recipe_imgurl: recipe.recipe_imgurl,
        }, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          }
        });
        
        // Add the newly created recipe to the state
        setRecipes([...recipes, { ...response.data }]);
        console.log(response);

    }
    setEditingRecipe(null)
    setIsAddingRecipe(false)
  }
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-green-600 text-white w-64 min-h-screen p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mx-6">Kitchnix Admin</h1>
          <X className="w-6 h-6 cursor-pointer md:hidden" onClick={() => setSidebarOpen(false)} />
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="bg-green-700 rounded-lg">
              <a href="#" className="block py-2 px-4 text-white">Recipes</a>
            </li>
            {/* Add more menu items here */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 cursor-pointer md:hidden mr-4" onClick={() => setSidebarOpen(true)} />
              <h2 className="text-2xl font-semibold text-gray-800">Recipe Management</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={handleAddRecipe}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Recipe
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {(editingRecipe || isAddingRecipe) ? (
            <RecipeForm
              recipe={editingRecipe}
              onSave={handleSaveRecipe}
              onCancel={() => {
                setEditingRecipe(null)
                setIsAddingRecipe(false)
              }}
            />
          ) : (
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.recipe_id}
                  recipe={recipe}
                  onEdit={handleEditRecipe}
                  onDelete={handleDeleteRecipe}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}