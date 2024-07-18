import { useParams, Link } from "react-router-dom"
import Navbar from "../components/navbar"
import SearchBox from "../components/SearchBox"

const Vocab = () => {
  const { categoryName } = useParams()

  // Example vocab items
  const vocabularies = [
    {
      name: "ไข่เจียว",
      image:
        "https://s359.kapook.com/r/600/auto/pagebuilder/201d6cc5-020e-466b-983e-4c7dea7f5dfa.jpg",
    },
    {
      name: "ต้มยำกุ้ง",
      image:
        "https://lh3.googleusercontent.com/proxy/4Fa81R1g1szKWWttMYMmlKUgd8TAEC29j5jtcQ-qbA_Hq-3F72UTynts9BT3Fdq3-HdYL7_HjChORSwo-N8dyvk685D1xS1H1n3fC1TMKTR2CflBY-snUAnKgpPF",
    },
    {
      name: "ข้าวอบมันกุ้ง",
      image: "https://f.ptcdn.info/889/080/000/rwb3o91a2v6Msds1s1rOw-o.jpg",
    },
    {
      name: "เกี๊ยวทอด",
      image:
        "https://s359.kapook.com/pagebuilder/42ce18d3-1c13-4d6f-a03f-9964cf57124c.jpg",
    },
  ]

  return (
    <div className="w-screen h-screen relative">
      <Navbar title={`คำศัพท์ ${categoryName}`} />
      <div className="hero w-screen bg-[url('https://as1.ftcdn.net/v2/jpg/01/92/00/78/1000_F_192007831_OGdxh37OAqmJpoMuWfgbKKYaQgpa9SJN.jpg')]">
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
            <Link key={index} to={`/record/${categoryName}/${vocab.name}`}>
              <div className="border p-4 flex flex-col items-center">
                <b>{vocab.name}</b>
                <img src={vocab.image} alt={vocab.name} className="" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto absolute inset-x-0 bottom-0">
        <div className="px-4 py-2 bg-black text-white text-center">
          เลขที่พอร์ตปัจจุบัน (Port): 14053 เลขที่ไอพีปัจจุบัน (IP Address):
          172.20.10.3
        </div>
      </div>
    </div>
  )
}

export default Vocab
