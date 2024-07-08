// src/pages/Vocabulary.jsx
import { useParams, Link } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
import SearchBox from "../components/SearchBox"
const Vocab = () => {
  const { categoryName } = useParams()

  // Fetch data or use context/state to get vocabularies for the category
  // For simplicity, this example just displays the category name and some dummy vocab items
  const vocabularies = ["soup", "apple", "banana","burger"] // Example vocab items

  return (
    <div className="w-screen">
      <Navbar3 title={`คำศัพท์${categoryName}`} />
      <div
        className="hero w-screen bg-[url('https://as1.ftcdn.net/v2/jpg/01/92/00/78/1000_F_192007831_OGdxh37OAqmJpoMuWfgbKKYaQgpa9SJN.jpg')]"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{categoryName}</h1>
            <SearchBox placeholder={"ค้นหาคำศัพท์ ..."}/>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {vocabularies.map((vocab, index) => (
            <Link key={index} to={`/category/${categoryName}/${vocab}`}>
              <div className="border p-4">{vocab}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocab
