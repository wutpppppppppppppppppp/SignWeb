// src/pages/Vocabulary.jsx
import { useParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import SearchBox from "../components/SearchBox"
import { vocabularies } from "../data/vocabdata"
const Vocab = () => {
  const { categoryName } = useParams()

  // Fetch data or use context/state to get vocabularies for the category
  // For simplicity, this example just displays the category name and some dummy vocab items
  // const vocabularies = [
  //   { name: "ไข่เจียว", image:"https://s359.kapook.com/r/600/auto/pagebuilder/201d6cc5-020e-466b-983e-4c7dea7f5dfa.jpg" },
  //   { name: "ต้มยำกุ้ง", image:"https://lh3.googleusercontent.com/proxy/4Fa81R1g1szKWWttMYMmlKUgd8TAEC29j5jtcQ-qbA_Hq-3F72UTynts9BT3Fdq3-HdYL7_HjChORSwo-N8dyvk685D1xS1H1n3fC1TMKTR2CflBY-snUAnKgpPF" },
  //   { name: "ผัดไท", image:"https://img.kapook.com/u/2015/surauch/cook2/PT1.jpg" },
  //   { name: "เกี๊ยวทอด", image:"https://s359.kapook.com/pagebuilder/42ce18d3-1c13-4d6f-a03f-9964cf57124c.jpg" },
   
  // ] // Example vocab items  


  return (
    <div className="w-screen h-screen">
      <Navbar title={`คำศัพท์${categoryName}`} />
      <div
        className="hero w-screen bg-[url('https://as1.ftcdn.net/v2/jpg/01/92/00/78/1000_F_192007831_OGdxh37OAqmJpoMuWfgbKKYaQgpa9SJN.jpg')]"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mx-auto">
            <h1 className="mb-5 text-5xl font-bold">{categoryName}</h1>
            <SearchBox placeholder={"ค้นหาคำศัพท์ ..."} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 justify-center">
          {vocabularies.map((vocab, index) => (
            <Link key={index} to={`/category/${categoryName}/${vocab.name}`}>
              <div className="border p-4 flex flex-col items-center">
                <b>{vocab.name}</b>
                {/* <div className="bg-cover bg-center" style="background-image: url(&)"></div> */}
                <img src={vocab.image} alt={vocab.name} className="max-w max-h"/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocab
