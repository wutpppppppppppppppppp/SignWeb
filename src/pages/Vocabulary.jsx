// src/pages/Vocabulary.jsx
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Vocab = () => {
  const { categoryName } = useParams();

  // Fetch data or use context/state to get vocabularies for the category
  // For simplicity, this example just displays the category name and some dummy vocab items
  const vocabularies = ["soup", "apple", "banana"]; // Example vocab items

  return (
    <div className="w-screen">
      <Navbar title={`Vocab: ${categoryName}`} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Vocabulary Bank for {categoryName}</h1>
        <div className="grid grid-cols-3 gap-4">
          {vocabularies.map((vocab, index) => (
            <Link key={index} to={`/category/${categoryName}/${vocab}`}>
              <div className="border p-4">{vocab}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vocab;
