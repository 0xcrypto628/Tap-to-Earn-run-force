import { useEffect, useState, useRef } from 'react';
import Coin from '/image/coin.svg';
import getCoinSVG from '/image/getCoin.svg';
import rotatedSpaceDown from '/image/rotatedSpaceDown.svg';
import rotatedSpaceUp from '/image/rotatedSpaceUp.svg';
import waterFallSVG from '/image/waterfall.svg';
import EarthImage from '/image/Earth.png';
import { getRandomPositions, getRandomWaterFalls } from '../utils/spaceship';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTonAddress } from "@tonconnect/ui-react";
import { ToastContainer, toast } from "react-toastify";

const Tap = () => {



  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const address = useTonAddress();

  const [positionTop, setPositionTop] = useState(305);
  // const [prevPositionTop, setPrevPositionTop] = useState(305);
  const [isGoing, setIsGoing] = useState(false);
  const [coins, setCoins] = useState([{ x: 850, y: 550, isGet: false }, { x: 100, y: 100, isGet: false }]);
  const [waterFall, setWaterFall] = useState([{ x: -200, y: 0 }, { x: 30, y: -60 }, { x: 250, y: -50 }]);
  const [isStart, setStarted] = useState(false);
  const spaceRef = useRef<HTMLDivElement | null>(null);
  const [achievedCoin, setAchieveCoin] = useState(0);
  const [accountInfo, setAccountInfo] = useState({
    coin: 0,
    lastScore: 0,
    currentTrial: 3
  });
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (spaceRef.current) {
      spaceRef.current.style.top = `${positionTop}px`;
    }
  }, [positionTop, isLoaded]);

  useEffect(() => {
    let cnt = 0;
    if (!isStart) return;

    const intervalId = setInterval(() => {
      cnt++;
      setCoins((prevCoins) => [
        ...prevCoins.slice(0, 1), // Keep the first coin static
        ...prevCoins.slice(1).map((coin) => ({ ...coin, x: coin.x - 5 })),
      ]);
      if (cnt > 10) {
        setCoins((prev) => [
          ...prev,
          getRandomPositions()
        ])

        setWaterFall((prev) => {
          if (prev.length >= 5) return prev; // Prevent adding more if limit is reached
          return [...prev, getRandomWaterFalls()];
        });
        if (waterFall.length > 5) {
          const tmpFall = waterFall.filter((_fall, i) => { return i !== 3 });
          setWaterFall(tmpFall);
        }
        cnt = 0;
      }
      setWaterFall((prev) => {
        const tmp = prev.filter((fall, i) => {
          return fall.x > -70 || i === 0;
        });
        return [
          ...tmp.slice(0, 1),
          ...tmp.slice(1).map(fall => ({ ...fall, x: fall.x - 5 }))
        ]
      }
      )

    }, 100); // Update positions every 100ms
    return () => { clearInterval(intervalId); } // Clean up on unmount
  }, [isStart]);

  const checkCollision = () => {
    if (!spaceRef.current || !coins.length || !waterFall.length) return false;

    const spaceshipRect = spaceRef.current.getBoundingClientRect();
    const spaceshipCenter = {
      x: window.scrollX + spaceshipRect.left + spaceshipRect.width / 2,
      y: window.scrollY + spaceshipRect.top + spaceshipRect.height / 2,
    };

    coins.forEach((coin, index) => {
      const coinDistance = Math.sqrt(
        Math.pow(spaceshipCenter.x - coin.x, 2) +
        Math.pow(spaceshipCenter.y - coin.y, 2)
      );

      if (coinDistance <= (spaceshipRect.width / 2 + 52 / 2) && !coin.isGet) {
        console.log("Got a Coin!");
        setAchieveCoin(achievedCoin + 1);
        setAccountInfo((prev) => ({
          ...prev,
          coin: prev.coin + 1
        }));

        setCoins((prev) => [
          ...prev.slice(0, index),
          { ...coin, isGet: true },
          ...prev.slice(index + 1)
        ]);
      }
    });
  };

  const saveDataToDB = async () => {
    const response = await axios.put(`${backendUrl}/user/end-play/${wallet}`, { coin: accountInfo.coin, score: accountInfo.coin });
    console.log("response: ", response);
  }

  const checkCollisionWithFall = async () => {
    if (!spaceRef.current || !coins.length || !waterFall.length) return false; // Early exit if refs or coins array is empty
    const spaceshipRect = spaceRef.current.getBoundingClientRect();
    const spaceXL = spaceshipRect.left;
    const spaceXR = spaceXL + spaceshipRect.width;
    const spaceYT = window.innerHeight - spaceshipRect.top - spaceshipRect.height;

    waterFall.map(async (fall) => {
      const fallXL = fall.x;
      const fallXR = fall.x + 70;
      const fallY = 400 + fall.y;
      // console.log("+++++++++> ", fallY, spaceYT, window.innerHeight, spaceshipRect.top, spaceshipRect.height);
      if (
        ((fallXL <= spaceXR - 20) && (fallXL >= spaceXL))
        &&
        (fallY - 50 >= spaceYT)
      ) {
        console.log("fallXL => ", fallXL)
        console.log("spaceXR => ", spaceXR)
        console.log("fallXR => ", fallXR)
        console.log("spaceXL => ", spaceXL)
        console.log("fallY => ", fallY);
        console.log("spaceYT => ", spaceYT)
        console.log("-----------here", screen.height)
        await saveDataToDB();
        return navigate('/fail');
        // alert("stop")
      }
    });

    return false; // No crash detected
  };

  const checkCrashWithEarth = () => {
    if (!spaceRef.current) return false; // Ensure the spaceship ref is available
    const spaceshipRect = spaceRef.current.getBoundingClientRect();
    const spaceshipLeft = window.scrollX + spaceshipRect.left;
    const spaceshipTop = window.scrollY + spaceshipRect.top;
    const earthCenterX = window.innerWidth / 2;
    const earthCenterY = window.innerHeight * 0.7 + 300;
    const earthRadius = 300; // Half of the Earth's diameter
  
    const distanceFromCenterX = Math.abs(spaceshipLeft - earthCenterX);
    const distanceFromCenterY = Math.abs(spaceshipTop - earthCenterY);
  
    if (distanceFromCenterX <= earthRadius && distanceFromCenterY <= earthRadius) {
      console.log("Spacecraft crashed into Earth!", earthCenterX, earthCenterY, window.innerHeight);
      saveDataToDB();
      navigate('/fail');
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (isStart) {
      const intervalId = setInterval(() => {
        checkCollision();
        checkCollisionWithFall();
        checkCrashWithEarth();
      }, 100);
      if (positionTop < -70 || window.innerHeight - positionTop - 106 < 0) {
        saveDataToDB();
        navigate('/fail');
        return () => clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
    }
  }, [positionTop]);

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

  const [wallet, setWalletAddress] = useState("");
  useEffect(() => {
    if (address) {
      setWalletAddress(address);
      fetchData(address)
    }
  }, [address])

  const getPositionOfSpaceship = () => {
    if (!spaceRef.current) return; // Check if the ref is attached to an element
    const rect = spaceRef.current.getBoundingClientRect();
    const position = {
      x: window.scrollX + rect.left,
      y: window.scrollY + rect.top,
    };
    return position;
  };

  const handleStart = () => {
    if (isStart) return;
    if (spaceRef.current) {
      const intervalId = setInterval(() => {
        setPositionTop((prevPosition) => prevPosition + 5);
        getPositionOfSpaceship();
      }, 100);
      return () => clearInterval(intervalId);
    }
  };

  const handleJump = () => {
    if (!isStart) return;
    setIsGoing(true);

    const jumpHeight = 60; // Define the total jump height
    const jumpDuration = 500; // Define the duration of the jump in milliseconds
    const jumpInterval = 10; // Define the interval for each increment in milliseconds
    const totalIncrements = jumpDuration / jumpInterval;
    const incrementAmount = jumpHeight / totalIncrements;

    let currentIncrement = 0;

    const jumpIntervalId = setInterval(() => {
      if (currentIncrement >= totalIncrements) {
        clearInterval(jumpIntervalId);
        setIsGoing(false)
      } else {
        setPositionTop((prevPosition) => prevPosition - incrementAmount);
        currentIncrement++;
      }
    }, jumpInterval);
  };


  useEffect(() => {
    const images = [Coin, getCoinSVG, rotatedSpaceDown, rotatedSpaceUp, EarthImage, waterFallSVG];
    const promises = images.map(image => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image;
      img.onload = resolve;
      img.onerror = reject;
    }));

    Promise.all(promises)
      .then(() => setIsLoaded(true))
      .catch(error => console.error("Error loading images: ", error));
  }, []);

  if (!isLoaded) {
    return (<div className='w-full h-full px-2 mt-auto'>Loading...</div>)
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden px-2" onClick={handleJump}>
      <ToastContainer />
      <div className='bg-black my-4 mx-2 rounded-full ml-auto text-right flex flex-row gap-4 justify-between px-3 py-1 border-2 border-white items-center'>
        <img src={Coin} alt='Coin'></img>
        <div>{accountInfo.coin}</div>
      </div>
      <div className='text-center mt-[8%] text-black font-press-start z-10'>
        <div className='text-[84px]' style={{ WebkitTextStrokeColor: 'white', WebkitTextStrokeWidth: 5 }}>{achievedCoin}</div>
      </div>
      <div>
        {coins.map((coin, index) => (
          !coin.isGet ? <img
            key={index}
            // src={coin.isGet ? getCoinSVG : Coin}
            src={Coin}
            alt='Coin'
            className='blur-coin-outline-all'
            style={{
              position: 'absolute',
              left: `${coin.x}px`,
              top: `${coin.y}px`,
              transition: `${coin.isGet ? 'all 0.2s ease' : 'none'}`
            }}
            width={52}
            height={69}
          ></img> :
            <div style={{
              position: 'absolute',
              left: `${coin.x}px`,
              top: `${coin.y}px`
            }}
              className='font-press-start text-[28px] animate-fadeouttopright transform'
              key={index}
              onLoad={() => {
                setTimeout(() => {
                  let tmp = coins.filter((coin) => !coin.isGet);
                  setCoins(tmp);
                }, 1000);
              }}
            >+1</div>
        ))}
      </div>
      <div ref={spaceRef}
        className={`absolute top-[${positionTop}px] right-[50vw] flex justify-center items-center`}
        onClick={() => { handleStart(), setStarted(true) }}
      >
        <img src={isGoing ? rotatedSpaceUp : rotatedSpaceDown} alt='space-ship' width={100} height={61}></img>
      </div>
      <div className='flex'>
        {waterFall.map((fall, index) => (
          <img
            src={waterFallSVG}
            alt='waterfall'
            key={index}
            className='h-[400px] w-[70px]'
            style={{ position: 'absolute', left: `${fall.x}px`, bottom: `${fall.y}px`, }}
          ></img>
        ))}
      </div>
      <div className='absolute bottom-[-400px] flex justify-center'>
        <img src={EarthImage} alt='earth' className='rotate-earth max-w-[150%] blur-outline-all'
          style={{ width: "600px", height: "600px" }}
        ></img>
      </div>
    </div>
  );
}

export default Tap;