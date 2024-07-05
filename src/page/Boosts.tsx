import { useState } from "react";
import Coin from "/image/coin.svg";
import BoostModal from "../component/BoostModal";
import Footer from "../component/Footer";

const Boosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followType, setFollowType] = useState("energyLimit");
  const totalScore = localStorage.getItem("total");

  const [energyLimit, setEnergyLimit] = useState(1);
  const [rechargingSpeed, setRechargingSpeed] = useState(1);
  const [multiCoins, setMultiCoins] = useState(1);

  const handleClick = (type: string) => {
    if (type === "energyLimit") {
      setFollowType("energyLimit");
      setEnergyLimit(energyLimit + 1);
      setIsModalOpen(true);
    } else if (type === "rechargingSpeed") {
      setFollowType("rechargingSpeed");
      setRechargingSpeed(rechargingSpeed + 1);
      setIsModalOpen(true);
    } else if (type === "multiCoins") {
      setFollowType("multiCoins");
      setMultiCoins(multiCoins + 1);
      setIsModalOpen(true);
    }
  };

  const getFollowText = (followType: string) => {
    if (followType === "energyLimit") {
      return "Energy Limit";
    } else if (followType === "rechargingSpeed") {
      return "Recharging Speed";
    } else if (followType === "multiCoins") {
      return "Multi Coins";
    }
  };

  const getFollowLevel = (followType: string) => {
    if (followType === "energyLimit") {
      return energyLimit + 1;
    } else if (followType === "rechargingSpeed") {
      return rechargingSpeed + 1;
    } else if (followType === "multiCoins") {
      return multiCoins + 1;
    }
  };

  const getFollowSrc = (followType: string) => {
    if (followType === "energyLimit") {
      return "/image/energy-limit.png";
    } else if (followType === "rechargingSpeed") {
      return "/image/recharging-speed.png";
    } else if (followType === "multiCoins") {
      return "/image/multi-coin.png";
    }
  };

  return (
    <div className="w-full h-full flex flex-col py-3 px-3 justify-between">
      <div className="bg-black rounded-full ml-auto text-right flex flex-row gap-3 justify-between px-3 py-1 border-2 border-white items-center">
        <img src={Coin} alt="Coin"></img>
        <div>{totalScore || 0}</div>
      </div>
      <div>
        <div
          className="font-press-start text-4xl text-black font-semibold"
          style={{
            WebkitTextStrokeColor: "white",
            WebkitTextStrokeWidth: 2,
            fontWeight: "bolder",
          }}
        >
          Boosts
        </div>
        <div
          className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
          onClick={() => handleClick("energyLimit")}
        >
          <div className="flex items-center gap-3">
            <div className="flex-none">
              <img
                src="/image/energy-limit.png"
                className="w-[24px] h-[24px] rounded-md"
              ></img>
            </div>
            <div className="px-2 text-left ">
              <p className="text-black text-[15px]">
                Energy <br /> limit
              </p>
              <p className="text-[#9E9E9E] text-[9px]">Level {energyLimit}</p>
            </div>
          </div>

          <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
            <img src={Coin} alt="Coin"></img>
            <div className="text-white pr-3 text-[12px]">-50</div>
          </div>
        </div>
        <div
          className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
          onClick={() => handleClick("rechargingSpeed")}
        >
          <div className="flex items-center gap-3">
            <div className="flex-none">
              <img
                src="/image/recharging-speed.png"
                className="w-[24px] h-[24px] rounded-md"
              ></img>
            </div>
            <div className="px-2 text-left ">
              <p className="text-black text-[15px]">
                Recharging <br /> speed
              </p>
              <p className="text-[#9E9E9E] text-[9px]">
                Level {rechargingSpeed}
              </p>
            </div>
          </div>

          <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
            <img src={Coin} alt="Coin"></img>
            <div className="text-white pr-3 text-[12px]">-75</div>
          </div>
        </div>
        <div
          className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
          onClick={() => handleClick("multiCoins")}
        >
          <div className="flex items-center gap-3">
            <div className="flex-none">
              <img
                src="/image/multi-coin.png"
                className="w-[24px] h-[24px] rounded-md"
              ></img>
            </div>
            <div className="px-2 text-left ">
              <p className="text-black text-[15px]">
                Multi <br /> coins
              </p>
              <p className="text-[#9E9E9E] text-[9px]">Level {multiCoins}</p>
            </div>
          </div>

          <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
            <img src={Coin} alt="Coin"></img>
            <div className="text-white pr-3 text-[12px]">-100</div>
          </div>
        </div>
      </div>

      <Footer />

      {isModalOpen && (
        <BoostModal
          setIsModalOpen={setIsModalOpen}
          followType={followType}
          text={getFollowText(followType)}
          level={getFollowLevel(followType)}
          src={getFollowSrc(followType)}
          isModalOpen={isModalOpen}
        ></BoostModal>
      )}
    </div>
  );
};

export default Boosts;
