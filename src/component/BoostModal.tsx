import { useRef, useEffect } from "react";
const BoostModal = (props: any) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleMouseClickOutside = (e: any) => {
    if (modalRef && modalRef.current && !modalRef.current.contains(e.target)) {
      props.setIsModalOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleMouseClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMouseClickOutside);
    };
  }, [props.isModalOpen]);
  console.log("---------- ", props);

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9] w-[95vw] font-press-start"
      ref={modalRef}
    >
      <div className="relative rounded-lg">
        <img src={props.src} alt="Coin" className="mx-auto" />
        <div className="p-4 md:p-5 font-press-start text-black">
          {props.text}
        </div>
        <div className="mt-6 text-black text-[12px]">
          Upgrade to Level {props.level} and get more energy.
        </div>
        <div
          className="flex mt-4 mx-auto px-5 w-[80vw] justify-between rounded-full text-[#43E0F7] text-[16px] py-1 bg-black"
          onClick={() => props.setIsModalOpen(false)}
        >
          <div>Get boost</div>
          <div className="flex gap-1">
            <img src="/image/coin.svg" alt="Coin" className="ml-2" />
            {props.followType === "multiCoins" ? -50 : -10}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostModal;
