import { useState } from "react";
import Coin from "/image/coin.svg";
import TermsModal from "../component/FollowModal";
import Footer from "../component/Footer";

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followType, setFollowType] = useState("Twitter");
  const totalScore = localStorage.getItem("total");

  return (
    <div className="w-full h-full flex flex-col py-3 px-3 ">
      <div className="bg-black rounded-full ml-auto text-right flex flex-row gap-3 justify-between px-3 py-1 border-2 border-white items-center">
        <img src={Coin} alt="Coin"></img>
        <div>{totalScore || 0}</div>
      </div>
      <div
        className="font-press-start text-4xl mt-3 text-black font-semibold"
        style={{
          WebkitTextStrokeColor: "white",
          WebkitTextStrokeWidth: 2,
          fontWeight: "bolder",
        }}
      >
        Tasks
      </div>
      <div
        className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
        onClick={() => {
          setIsModalOpen(true), setFollowType("Twitter");
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none">
            <img
              src="/image/Twitter.png"
              className="w-[24px] h-[24px] rounded-md"
            ></img>
          </div>
          <div className="px-2 text-left text-black text-[15px]">
            Follow us on X
          </div>
        </div>

        <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
          <img src={Coin} alt="Coin"></img>
          <div className="text-white pr-3 text-[12px]">+125</div>
        </div>
      </div>
      <div
        className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
        onClick={() => {
          setIsModalOpen(true), setFollowType("Telegram");
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none">
            <img
              src="/image/Telegram.png"
              className="w-[24px] h-[24px] rounded-md"
            ></img>
          </div>
          <div className="px-2 text-left text-black text-[15px]">
            Join our Telegram
          </div>
        </div>

        <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
          <img src={Coin} alt="Coin"></img>
          <div className="text-white pr-3 text-[12px]">+125</div>
        </div>
      </div>
      <div
        className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
        onClick={() => {
          setIsModalOpen(true), setFollowType("ETH");
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none">
            <img
              src="/image/ETH.png"
              className="w-[24px] h-[24px] rounded-md"
            ></img>
          </div>
          <div className="px-2 text-left text-black text-[15px]">
            Share your ETH Wallet
          </div>
        </div>

        <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
          <img src={Coin} alt="Coin"></img>
          <div className="text-white pr-3 text-[12px]">+125</div>
        </div>
      </div>
      <div
        className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
        onClick={() => {
          setIsModalOpen(true), setFollowType("Email");
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none">
            <img
              src="/image/Email.png"
              className="w-[24px] h-[24px] rounded-md"
            ></img>
          </div>
          <div className="px-2 text-left text-black text-[15px]">
            Share your email
          </div>
        </div>

        <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
          <img src={Coin} alt="Coin"></img>
          <div className="text-white pr-3 text-[12px]">+125</div>
        </div>
      </div>
      <div
        className="flex flex-row justify-between gap-2 pl-4 items-center py-2 font-press-start border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] p-2 mt-3"
        onClick={() => {
          setIsModalOpen(true), setFollowType("Website");
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-none">
            <img
              src="/image/website1.png"
              className="w-[24px] h-[24px] rounded-md"
            ></img>
          </div>
          <div className="px-2 text-left text-black text-[15px]">
            Visit our website
          </div>
        </div>

        <div className="bg-black rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
          <img src={Coin} alt="Coin"></img>
          <div className="text-white pr-3 text-[12px]">+125</div>
        </div>
      </div>
      <div className="flex flex-col justify-end h-full">
        <Footer />
      </div>
      {isModalOpen && (
        <TermsModal
          setIsModalOpen={setIsModalOpen}
          followType={followType}
          isModalOpen={isModalOpen}
        ></TermsModal>
      )}
    </div>
  );
};

export default Tasks;
