// src/pages/Category.jsx
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImgCard from "../components/ImgCard";
import placeHolder from "../assets/placeholder.png";

const categories = [
  { name: "food", image: placeHolder },
  { name: "animals", image: placeHolder },
  { name: "colors", image: placeHolder },
  // Add more categories as needed
];

const totalCards = 15;
const filledCategories = categories.slice(0, totalCards);

const Category = () => {
  return (
    <div className="flex flex-col w-screen gap-y-2.5">
      <Navbar title="ประเภท" />
      <div className="grid grid-cols-5 gap-4">
        {filledCategories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={`/category/${category.name}`}>
              <ImgCard image={category.image} title={category.name} isPlaceholder={false} />
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Category;
