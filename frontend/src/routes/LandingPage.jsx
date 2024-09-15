import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import myImage from '../assets/ac9323b3-8e09-4d30-8f71-2af454cc644c.png';
import myImage2 from '../assets/kithnix_logo.jpg'
import { ChefHat, Leaf, Clock, ShoppingCart, Utensils, Truck } from 'lucide-react'

const FeatureCard = ({ Icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="w-12 h-12 text-green-600 mx-auto mb-4">
        <Icon size={48} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )

  const StepCard = ({ Icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Icon size={32} className="text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )

function LandingPage() {
  const navigate = useNavigate();

  return (<div>
    <div className=" min-h-screen bg-white-600 bg-white flex flex-col items-center ">
      {/* Navigation Bar */}
      <div className=" w-full bg-white shadow-lg py-2">
        <div className="container mx-auto flex justify-between items-center px-3 md:px-1">
          <div className="text-2xl font-bold">
         
            <img src={myImage2} alt="Logo" className="h-16" />
          </div>
          <nav className="space-x-3 text-sm text-green-600 ">
            <a href="#about" className="hover:underline">About Us</a>
            <a href="#sourcing" className="hover:underline">Sourcing</a>
            <a href="#help" className="hover:underline">Help</a>
          </nav>
          {/* Buttons */}
          <div className="space-x-4">
            <button className="text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
              onClick={() => navigate('/Login')}>
              Log in
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate('/signup')}>
              Register
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate('/adminlogin')}>
              AdminLogin
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row items-center mt-20 h-full">
        {/* Text Content */}
        <div className="w-full md:w-2/5  text-center md:text-left">
          <h1 className="pl-45 text-5xl font-bold leading-tight mb-6">
            Delicious Menus and Freshly Sourced Ingredients for Easy Home Cooking
          </h1>
          <p className="text-3xl text-gray-600  mb-6">
            Get perfectly proportioned meal ingredient boxes delivered to your door, making home-cooked meals easy, convenient, and delicious.
          </p>
          <div className='item-left'>
          <button className=" bg-white-600 text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-white-600"
              onClick={() => navigate('/Login')}>
              Explore
            </button>
            </div>
          </div>
              {/* Image Placeholder */}
           <div className="w-full md:w-2/5 flex justify-center mt-8 md:mt-0 ml-auto">
              {/* Insert Image here */}
             <div className="bg-white w-96 h-96 md:w-128 md:h-128">
              <img src={myImage} alt="Delicious Food" className="w-full h-full object-cover rounded-full" />
             </div>
           </div>

      </div>
     
    </div>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    {/* Hero Section */}
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="mb-6 text-5xl font-bold text-green-800">Delicious Meals, Delivered to You</h1>
      <p className="mb-8 text-xl text-gray-600">Enjoy chef-crafted meals with fresh ingredients, right at your doorstep.</p>
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg">
        Get Started
      </button>
    </section>

    {/* Features Section */}
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-semibold text-gray-800">Why Choose Our Meal Boxes?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            Icon={ChefHat}
            title="Chef-Crafted Recipes"
            description="Enjoy restaurant-quality meals designed by professional chefs."
          />
          <FeatureCard
            Icon={Leaf}
            title="Fresh Ingredients"
            description="We source the freshest, seasonal ingredients for every meal."
          />
          <FeatureCard
            Icon={Clock}
            title="Quick & Easy"
            description="Prepare delicious meals in 30 minutes or less with our easy-to-follow recipes."
          />
        </div>
      </div>
    </section>
    </div>
    <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-semibold text-gray-800">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              Icon={ShoppingCart}
              title="Choose & Customize Your Meals"
              description="Select from our weekly menu of delicious, chef-crafted recipes."
            />
            <StepCard
              Icon={Truck}
              title="We Deliver"
              description="Receive your ingredients in an insulated box, right at your doorstep."
            />
            <StepCard
              Icon={Utensils}
              title="Cook and Enjoy"
              description="Follow our easy recipes to cook and enjoy restaurant-quality meals at home."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;