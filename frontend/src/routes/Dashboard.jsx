import Appbar from "../components/Appbar";
import RecipeCard from "../components/RecipeCard";
import main from '../assets/MAINkitchnix.jpg';
import CuisineCard from "../components/CuisineCard";




export default function Dashboard() {
  return (
      <div className="min-h-screen bg-green-500 w-full">
        {/* Navbar */}
     

      <div><Appbar/></div>
  
        {/* Special Offer Section */}
        <div className=" h-screen flex justify-between items-center py-20 bg-green-600 text-white w-full px-8">
        {/* Text for the offer */}
        <div className="text-center flex-1">
          <h2 className="text-3xl font-bold">Special Offer: 20% Off Meal Kits</h2>
          <p>Don’t miss out on this limited-time discount!</p>
          <button className="mt-4 bg-white text-green-600 px-6 py-2 rounded">
            Shop Now
          </button>
        </div>
        {/* Image on the right side */}
        <div className="flex-1">
          <img
            src={main}
            alt="Special Offer"
            className="w-full h-screen rounded-lg shadow-md px-5 py-10"
          />
        </div>
      </div>
  
        {/* Featured Recipes */}
        <div className="py-16 bg-white">
          <h2 className="text-3xl font-bold text-left mb-8 pl-10">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            <RecipeCard title="Teriyaki Chicken" description="Delicious teriyaki-glazed chicken with stir-fried veggies." />
            <RecipeCard title="Beef Stroganoff" description="Tender beef in a creamy mushroom sauce over egg noodles." />
            <RecipeCard title="Vegetable Stir-Fry" description="Colorful mix of fresh veggies in a savory sauce." />
            <RecipeCard title="Salmon with Roasted Veggies" description="Tender salmon fillet with a side of roasted seasonal veggies." />
          </div>
        </div>
  
        {/* Cuisines You Might Want to Try */}
        <div className="py-16 bg-gray-100">
          <h2 className="text-3xl font-bold text-left mb-8 pl-10">Cuisines you might want to try</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            <CuisineCard title="Continental Cuisine" description="Explore our delectable continental meal kits." />
            <CuisineCard title="Indian Cuisine" description="Discover the flavors of India with our meal kits." />
            <CuisineCard title="Italian Cuisine" description="Indulge in the authentic flavors of Italy." />
            <CuisineCard title="Chinese Cuisine" description="Explore the rich culinary traditions of China." />
          </div>
        </div>
  
        {/* Footer */}
        <footer className="py-4 bg-green-600 text-white text-center">
          <p>© 2024 Kitchnix. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="/terms" className="text-white hover:underline">Terms of Service</a>
            <a href="/privacy" className="text-white hover:underline">Privacy Policy</a>
          </div>
        </footer>
      </div>
    );
  }