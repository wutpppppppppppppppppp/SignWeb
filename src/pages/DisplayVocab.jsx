// src/pages/DisplayVocab.jsx
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const DisplayVocab = () => {
  const { categoryName, vocabName } = useParams();

  // Fetch data or use context/state to get details for the vocabulary
  // For simplicity, this example just displays the category and vocab names
  return (
    <div className="w-screen">
      <Navbar title={`Vocab: ${vocabName}`} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Details for {vocabName} in {categoryName}</h1>
        {/* Add detailed display logic here */}
      </div>
    </div>
  );
};

export default DisplayVocab;
