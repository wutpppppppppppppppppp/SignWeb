import React, { useState } from "react";
import { Link } from "react-router-dom";
import CatCard from "../components/CatCard";
import Pagination from "../components/Pagination";
import Navbar from "../components/navbar";
import placeHolder from "../assets/placeholder.png";

const allCategories = [
  { name: "อาหาร", image: placeHolder },
  { name: "สัตว์", image: placeHolder },
  { name: "สี", image: placeHolder },
  { name: "ประเภทที่4", image: placeHolder },
  { name: "ประเภทที่5", image: placeHolder },
  { name: "ประเภทที่6", image: placeHolder },
  { name: "ประเภทที่7", image: placeHolder },
  { name: "ประเภทที่8", image: placeHolder },
  { name: "ประเภทที่9", image: placeHolder },
  { name: "ประเภทที่10", image: placeHolder },
  { name: "ประเภทที่11", image: placeHolder },
  { name: "ประเภทที่12", image: placeHolder },
  { name: "ประเภทที่13", image: placeHolder },
  { name: "ประเภทที่14", image: placeHolder },
  { name: "ประเภทที่15", image: placeHolder },
  { name: "ประเภทที่16", image: placeHolder },
  { name: "ประเภทที่17", image: placeHolder },
  { name: "ประเภทที่18", image: placeHolder },
];

const itemsPerPage = 15; 
const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = allCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar title="ประเภท" />
      <div className="flex-grow grid grid-cols-5 gap-4 py-4">
        {currentCategories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={`/category/${category.name}`}>
              <CatCard image={category.image} title={category.name} />
            </Link>
          </div>
        ))}
      </div>
      <div className="pb-4 self-center">
        <Pagination
          totalItems={allCategories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Category;
