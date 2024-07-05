import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { rankingList } from "../mock";
import Footer from "../component/Footer";

const Rank = () => {
  const { user } = useGlobalContext();

  const [myRank] = useState({
    rank: 2,
    score: 430000,
  });

  const [tab, setTab] = useState("record");

  const [isYou] = useState(false);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  return (
    <div className="w-full h-full flex flex-col py-3 px-3 justify-between">
      <div
        className="font-press-start text-3xl text-black mt-2"
        style={{
          WebkitTextStrokeColor: "white",
          WebkitTextStrokeWidth: 2,
          fontWeight: "bolder",
        }}
      >
        Ranking
      </div>
      <div className="text-center my-[2vh] z-3 overflow-auto border-4 border-[#43E0F7] rounded-xl scrollbar-hidden">
        <div
          className="flex flex-col gap-1 font-press-start p-1 text-black pt-[3vh] bg-[#CBEFF9]"
          style={{ zIndex: 3 }}
        >
          <div className="flex flex-row justify-between gap-8 bg-[#43E0F7] px-2 py-1 rounded-md text-[#10011C] text-[12px] items-center">
            <div
              className={`${
                tab === "record"
                  ? "bg-black p-1 w-full text-[#43E0F7] rounded-md"
                  : ""
              } flex-1`}
              onClick={() => setTab("record")}
            >
              Record
            </div>
            <div
              className={`${
                tab === "total"
                  ? "bg-black p-1 w-full text-[#43E0F7] rounded-md"
                  : ""
              } flex-1`}
              onClick={() => setTab("total")}
            >
              Total
            </div>
          </div>
          <div className="overflow-x-auto px-0 mt-0">
            <table className="text-[10px] w-full text-left">
              <thead className="text-black uppercase">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    #
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Player
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankingList.map((product, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index === rankingList.length - 1 ? "" : "border-b"
                    } text-[10px] ${
                      product.name === user.username &&
                      "border-t-2 border-black"
                    }`}
                  >
                    <td className="px-2 py-2 font-medium whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2">
                      {product.name !== user.username ? product.name : "You"}
                    </td>
                    <td className="px-2 py-2">{formatNumberWithCommas(product.score)}</td>
                  </tr>
                ))}
                {!isYou && (
                  <tr
                    key={100}
                    className={`border-t-2 border-black text-[10px]`}
                  >
                    <td className="px-2 py-2 font-medium whitespace-nowrap">
                      {myRank.rank}
                    </td>
                    <td className="px-2 py-2">You</td>
                    <td className="px-2 py-2">{formatNumberWithCommas(myRank.score)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rank;
