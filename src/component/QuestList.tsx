import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { mockQuest } from "../mock";
import { useGlobalContext } from '../context/GlobalContext';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function QuestList() {
  const { walletAddress, btcWallet } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btcAddress, setBTCAddress] = useState("");
  const [clicked, setClicked] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    if (clicked == 2) {
      setIsModalOpen(true);
      setClicked(0);
    }
  }, [clicked])
  useEffect(() => {
    document.addEventListener("mousedown", closeModalOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeModalOnOutsideClick);
    }
  }, [])
  
  
  const handleProvideBTC = async () => {
    if (btcAddress === "") {
      toast("Please enter your BTC address!", { type: "error" });
      return;
    }
    if (btcWallet === "" || btcWallet === undefined) {
      try {
        const response = await fetch(`${backendUrl}/task/btcwallet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ btcWallet: btcAddress, wallet: walletAddress  }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        toast("You gained extra token!", { type: "success" });
        console.log(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      toast("Your ETH address is updated!", { type: "info" });
    }
    setIsModalOpen(false);
  };

  const closeModalOnOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  }

  return (
    <div className="h-[75vh] max-sm:h-[70vh] overflow-auto py-auto relative">
      <ToastContainer />
      {mockQuest.map((data, index) => (
        <Link
          key={index}
          to={data.link}
          className={`relative flex items-center h-28 max-sm:h-24 px-5 max-sm:px-3 py-2 my-4 mx-2 max-sm:mx-1 bg-[#6d548a] rounded-lg hover:opacity-80 active:scale-95 text-white transition ease-in-out`}
          onClick = {() => setClicked(index)}
        >
          <img
            src={data.icon}
            alt={"icon-" + index}
            className="w-12 h-12 mr-5"
          />
          <div className="flex items-center justify-start text-lg">
            {data.description}
          </div>
          {index === 2 && btcWallet !== "" && <img src="/image/icon/check.png" alt="check" className="w-8 h-8 absolute right-5" />}
        </Link>
      ))}
      <div
        className={`p-3 rounded-lg bg-slate-400 w-full absolute top-1/2 right-1/2 transform translate-x-1/2 flex flex-col transition-all ease-out duration-300 ${
          isModalOpen
            ? "block translate-y-0"
            : "hidden -translate-y-10"
        } group-hover:block`}
        ref={modalRef}
      >
        <input
          value={btcAddress}
          onChange={(e) => setBTCAddress(e.target.value)}
          className="p-3 rounded-lg mb-3"
        />
        <button
          onClick={() => {
            handleProvideBTC();
          }} // Toggle modal open/close
          className="flex flex-col justify-center items-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
