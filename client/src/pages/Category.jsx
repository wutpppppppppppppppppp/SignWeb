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
  { name: "ร่างกาย", image: "https://media.newyorker.com/photos/5b85b208af438f6d7f78a7a0/master/pass/180910_r32746.jpg" },
  { name: "ครอบครัว", image:"https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2022/04/16/0ca4_family-2.jpg" },
  { name: "ลักษณะผู้คน", image: "https://media.newyorker.com/photos/5b85b208af438f6d7f78a7a0/master/pass/180910_r32746.jpg" },
  { name: "เวลา", image: "https://www.ikea.com/th/en/images/products/pluttis-wall-clock-black__1013114_pe829054_s5.jpg?f=s" },
  { name: "ประโยค", image: "https://promova.com/content/common_mistakes_in_english_speaking_61f25b56ca.png" },
  { name: "การทำอาหาร", image: "https://www.health.com/thmb/wfkIOj5dW5H6QLhXqEFHw87ow08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-1477430966-506a007e48744d5488a6ee1c0b729134.jpg" },
  { name: "โรงเรียน", image: "https://i.pinimg.com/736x/f9/e0/6b/f9e06bde97f3bf383b4f78c63153bbf8.jpg" },
  { name: "ที่พักอาศัย", image: "https://png.pngtree.com/element_our/sm/20180705/sm_5b3e6b3c55263.jpg" },
  { name: "การกระทำ", image: "https://img.kapook.com/u/panadda/01aa-600.jpg" },
  { name: "กฎหมาย", image: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5BEdN2JKVPP7SnOdD4lBpUKB87GmmRxmssZW9gTESUgMOFhEUdj.jpg"},
  { name: "วิชาเรียน", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaVhQzXlPKp_DjqU04nTfu4WRu8spq8VSVQQ&s" },
  { name: "อาชีพ", image: "https://media.graphassets.com/resize=fit:crop,width:1280,height:660/FYHlVziQ9a9wkVaw4jgw" },
  { name: "ฤดูกาลและสภาพอากาศ", image: placeHolder },
  { name: "ลำดับตัวเลข", image: placeHolder },
  { name: "ธรรมชาติ", image: placeHolder },
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
