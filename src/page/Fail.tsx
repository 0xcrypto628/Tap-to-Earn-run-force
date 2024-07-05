
import { useEffect, useState } from 'react';
import Coin from '/image/coin.svg';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTonAddress } from "@tonconnect/ui-react";
import { ToastContainer, toast } from "react-toastify";

const Fail = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const address = useTonAddress();
  const [accountInfo, setAccountInfo] = useState({
    coin: 0,
    lastScore: 0,
    currentTrial: 3,
    record: 0
  });

  async function fetchData(walletAddress: string) {
    try {
      axios.post(`${backendUrl}/user/login`, {
        wallet: walletAddress,
      }).then(data => {
        console.log("GetData: ", data.data.data);
        setAccountInfo(data.data.data);
        console.log("accountInfo: ", accountInfo)
      })
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Internal Server Error");
    }
  }

  useEffect(() => {
    if (address) {
      fetchData(address)
    }
  }, [address])
  const navigate = useNavigate();

  const handlePalyAgain = () => {
    navigate('/');
  }
  return (
    <div className="w-full h-full flex flex-col py-3 px-3 ">
      <ToastContainer />
      <div className='bg-black rounded-full ml-auto text-right flex flex-row gap-3 justify-between px-3 py-1 border-2 border-white items-center'>
        <img src={Coin} alt='Coin'></img>
        <div>{accountInfo.coin}</div>
      </div>
      <div className='text-center mt-[12vh] p-3 z-3'>
        <div
          className='font-press-start text-[40px] text-[#FF1D7B] font-extrabold'
          style={{ WebkitTextStrokeColor: 'white', WebkitTextStrokeWidth: 3, fontWeight: 'bolder' }}
        >Crashed!</div>
        <div className='relative flex flex-col justify-center gap-6 p-5 py-10 font-press-start text-black mt-[3vh]  border-4 border-[#43E0F7] rounded-xl bg-[#CBEFF9]'
        style={{zIndex: 3}}
        >
          <div className='flex flex-row justify-center gap-8'>
            <div className='flex flex-col'>
              <div className='text-[15px]'>Score</div>
              <div className='text-[32px]'>{accountInfo.lastScore}</div>
            </div>
            <div className='flex flex-col'>
              <div className='text-[15px'>Record</div>
              <div className='text-[32px]'>{accountInfo.record}</div>
            </div>
          </div>
          <div className='font-press-start text-[#43E0F7] bg-black rounded-full p-3 text-[22px]' onClick={() => handlePalyAgain()}>Play again</div>
        </div>
      </div>
      <img
        src='/image/waterfall2.png'
        alt='space-ship'
        key={1}
        className='h-[400px] w-[70px] z-1'
        style={{ position: 'absolute', left: '40vw', bottom: `-80px`, }}
      ></img>
      <div className='absolute bottom-[-70vh] flex justify-center z-2'>
        <img src={'/image/Earth.png'} alt='earth' className='max-w-[150%] blur-outline-all'
          style={{ width: "600px", height: "600px" }}
        ></img>
      </div>
    </div>
  );
}

export default Fail;
