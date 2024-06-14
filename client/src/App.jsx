import { useEffect, useState } from "react";
import "./App.css";
import { toJpeg, toPng } from "html-to-image";
import { Card } from "./components/card/Card";
import axios from "axios";


function App() {
  const [domain, setDomain] = useState("");
  const [name, setName] = useState("");
  const [proffesion, setProffesion] = useState("");
  const [logo, setLogo] = useState("");
  const [cardInfo, setCardInfo] = useState({});

  const getCardInfo = async () => {
    try {
      console.log("calling api...");
      const response = await axios.get(
        `https://dynamic-presentation-card.vercel.app/card?domain=${domain}`
      );
      const data = await response.json();
      console.log("response: ", data.data);
      setCardInfo(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result.toString())
    }

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center  bg-gradient-to-br from-blue-400 via-cyan-900 to-black">
      <h3 className="flex flex-col align-center justify-center mb-10 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center">
          Create your presentation card
          <br />
        </span>{" "}
        with your favorite website styles!.
      </h3>
      {!Object.keys(cardInfo).length ? (
        <div className="flex flex-col justify-center container sm my-0 mx-auto h-[350px] w-96 ">
          <label htmlFor="domain" className="block mb-2 ml-0 text-sm font-medium text-gray-900 dark:text-white">
            Add site url:{" "}
          </label>
          <input
          id="domain"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5 ml-0"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <label htmlFor="proffesion" className="block mb-2 ml-0 text-sm font-medium text-gray-900 dark:text-white">
            Add your proffession (optional):{" "}
          </label>
          <input
          id="proffesion"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5 ml-0"
            type="text"
            value={proffesion}
            onChange={(e) => setProffesion(e.target.value)}
          />
          <label
            htmlFor="fileupload"
            className="block mb-2 ml-0 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add a logo (optional):{" "}
          </label>
          <input
            className="block w-full mb-5 text-sm text-gray-900 p-2.5 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            id="fileupload"
            onChange={convertToBase64}
          />
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={getCardInfo}
          >
            Generate
          </button>
        </div>
      ) : (
        <>
          <Card
            cardInfo={cardInfo}
            setCardInfo={setCardInfo}
            name={name}
            proffesion={proffesion}
            logo={logo}
          />
        </>
      )}
    </div>
  );
}

export default App;
