import React, { useState } from "react";
import { Link } from "react-router-dom";
import CatCard from "../components/CatCard";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import placeHolder from "../assets/placeholder.png";

const allCategories = [
  { name: "อาหาร", image:"https://as1.ftcdn.net/v2/jpg/01/92/00/78/1000_F_192007831_OGdxh37OAqmJpoMuWfgbKKYaQgpa9SJN.jpg" },
  { name: "สัตว์", image: "https://www.timeforkids.com/wp-content/uploads/2023/11/G3G5_231117_bear_steps.jpg?w=1024" },
  { name: "สี", image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1270527025-6515e6930b257.jpg?crop=1xw:0.84375xh;center,top" },
  { name: "ร่างกาย", image: placeHolder },
  { name: "ครอบครัว", image:"https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2022/04/16/0ca4_family-2.jpg" },
  { name: "ลักษณะผู้คน", image: placeHolder },
  { name: "เวลา", image: "https://www.ikea.com/th/en/images/products/pluttis-wall-clock-black__1013114_pe829054_s5.jpg?f=s" },
  { name: "ประโยค", image: "https://promova.com/content/common_mistakes_in_english_speaking_61f25b56ca.png" },
  { name: "การทำอาหาร", image: "https://www.health.com/thmb/wfkIOj5dW5H6QLhXqEFHw87ow08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-1477430966-506a007e48744d5488a6ee1c0b729134.jpg" },
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
              <CatCard image={category.image} title={category.name} className="w-32 h-32 object-cover"/>
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
