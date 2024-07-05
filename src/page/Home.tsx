import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { isMobile } from "react-device-detect";
import ProgressBar from "../component/ProgressBar";
import Footer from "../component/Footer";

import Coin from "/image/coin.svg";

const Home = () => {
  const { setUser } = useGlobalContext();
  const address = useTonAddress();
  console.log("address: ", address);
  const [token, setToken] = useState<number>(
    localStorage.getItem("total") ? Number(localStorage.getItem("total")) : 0
  );
  const [remainedEnergy, setRemainedEnergy] = useState(
    localStorage.getItem("remainedEnergy")
      ? Number(localStorage.getItem("remainedEnergy"))
      : 2000
  );

  const [modalVisible, setModalVisible] = useState(false);

  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const closeWalletModal = () => {
    setModalVisible(false);
  };

  const handleTonButtonClick = () => {
    if (buttonWrapperRef.current) {
      const tonConnectButton = (buttonWrapperRef.current as any).querySelector(
        "button"
      ); // Adjust selector if necessary
      if (tonConnectButton) {
        tonConnectButton.click();
      }
    }
  };

  function formatNumberWithCommas(number: number, locale = "en-US") {
    if (number >= 1000000000) {
      number = number / 1000000000;
      return `${new Intl.NumberFormat(locale).format(number)}B`;
    }
    else if (number >= 1000000) {
      number = number / 1000000;
      return `${new Intl.NumberFormat(locale).format(number)}M`;
    }
    else if (number >= 1000) {
      number = number / 1000;
      return `${new Intl.NumberFormat(locale).format(number)}K`;
    }
    else {
      return new Intl.NumberFormat(locale).format(number);
    }
  }

  const bodyRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: any) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the target
    const y = event.clientY - rect.top; // y position within the target

    // Step 1: Create and append a <style> element
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    // Step 2: Define the @keyframes animation
    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes  fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.textContent = "+1";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x}px`;
    newDiv.style.top = `${y - 50}px`;
    newDiv.style.color = "white";
    newDiv.draggable = false;
    newDiv.className =
      "dynamic-div animate-fadeouttopright z-20 transform max-sm:text-3xl text-5xl font-bold transition not-selectable"; // You can add Tailwind classes here if needed

    // Append the new div to the body

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 400);

    return () => clearTimeout(interval);
  };

  const handleTap = (event: any) => {
    if (!address) {
      setModalVisible(true);
      return;
    }
    if (remainedEnergy > 0) {
      setRemainedEnergy(remainedEnergy - 1);
      localStorage.setItem("remainedEnergy", String(remainedEnergy - 1));
      if (token === null) {
        setToken(1);
        localStorage.setItem("total", String(1));
      } else {
        setToken(token + 1);
        localStorage.setItem("total", String(token + 1));
      }
      handleClick(event);
    }
  };

  const handleMultiTouchStart = (event: TouchEvent) => {
    // Iterate over each touch point
    Array.from(event.touches).forEach((touch) => {
      console.log("Touch's current position:", touch);
      // Call handleClick for each touch point
      handleClick({
        ...touch,
        target: event.target,
        preventDefault: () => {}, // Mock preventDefault for non-MouseEvent
        clientX: touch.clientX,
        clientY: touch.clientY,
        touches: [],
        targetTouches: [],
        changedTouches: [],
      });
    });
  };

  const handleTouch = (event: any) => {
    if (!address) {
      setModalVisible(true);
      return;
    }
    const length = event.touches.length;
    console.log(event, length);
    if (remainedEnergy - length >= 0 && length >= 1) {
      setRemainedEnergy(remainedEnergy - length);
      setToken(token + length);
      localStorage.setItem("total", String(token + length));
      handleMultiTouchStart(event);
    }
  };

  useEffect(() => {
    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    console.log("webapp-------- ", webapp);
    if (webapp && webapp["user"]) {
      setUser({
        username: webapp["user"]["username"],
        id: webapp["user"]["id"],
      });
      console.log("=========>webapp", webapp["user"]);
    }
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalVisible &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  return (
    <div className="w-full h-screen flex flex-col p-3">
      <div className="flex flex-col h-full relative items-center justify-between">
        <div
          className="relative justify-center items-center w-full h-[50px] mb-2"
          ref={buttonWrapperRef}
        >
          <TonConnectButton className="absolute right-0" />
        </div>
        <div
          className="text-center mt-[10%] text-black font-press-start not-selectable"
          style={{ WebkitTextStrokeColor: "white" }}
        >
          <div className="text-[32px]" style={{ WebkitTextStrokeWidth: 1 }}>
            Tap & Earn
          </div>
          <div className="bg-black w-[160px] mx-auto rounded-full justify-between flex flex-row gap-1 px-3 py-1 border-2 border-white items-center">
            <img src={Coin} alt="Coin"></img>
            <div className="text-white pr-3 text-[18px]">{formatNumberWithCommas(token)}</div>
          </div>
        </div>

        <div
          className="flex w-full justify-center items-center relative"
          ref={bodyRef}
          onTouchStart={(e) => {
            if (!isMobile) return;
            e.stopPropagation();
            handleTouch(e);
          }}
          onClick={(e) => {
            console.log("clickEvent: ", e);
            e.stopPropagation();
            handleTap(e);
          }}
        >
          <img
            src="/image/ellipse.png"
            alt="coin"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-auto not-selectable"
          ></img>
          <div
            className={`relative my-5 max-sm:my-5 rounded-full bg-cover aspect-square h-[40vh] aspect-square flex-shrink-0 active:scale-95  ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
            style={{ backgroundImage: "url('/image/HealthHero.png')" }}
          ></div>
        </div>
        <div className="w-full" draggable="false">
          <div className="flex flex-col items-center w-full not-selectable">
            <div className="w-full px-10">
              <div className="flex justify-between items-baseline w-full mb-2">
                <span className="font-press-start text-[#9E9E9E] text-[10px] font-bold">
                  Today’s Tap Limit
                </span>
                <h3 className="text-500 text-xl font-bold">{remainedEnergy}</h3>
              </div>
              <ProgressBar value={remainedEnergy * 0.05} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 z-20 transition-all delay-100 duration-300 ease-in-out shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 transform max-h-[80vh] overflow-y-auto ${
          modalVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transformOrigin: "bottom" }} // This ensures the transformation starts from the bottom
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end w-full h-12">
          <button
            className="text-black bg-[#4F7383] p-1 rounded-full"
            onClick={closeWalletModal}
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/image/close_icon.svg" alt="close" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/image/connect_wallet.svg"
            alt="connectButton"
            className="w-20 h-25"
          />
        </div>
        <p className="text-3xl font-bold text-center mb-2">
          Please connect the <br></br>wallet first!
        </p>
        <div
          className="flex text-xl justify-center items-center w-full h-16 px-2 py-1 bg-gradient-to-r from-[#07AEEA] to-[#D3984E] rounded-xl cursor-pointer gap-2"
          onClick={handleTonButtonClick}
        >
          <img src="/image/union.svg" alt="tonbuttonicon" />
          Connnect TON Wallet
        </div>
      </div>
    </div>
  );
};

export default Home;
