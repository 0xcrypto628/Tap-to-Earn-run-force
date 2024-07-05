export default function CountDate({
  date,
}: {
  date: number
}) {
  return (
    <div className="CountDate flex justify-center gap-8 max-sm:gap-6 items-center w-full">
      <div className={`flex flex-col item-center justify-center ${date > 0 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/electric-guitar.png" alt="fire" className={`w-10 h-10 max-sm:w-7 max-sm:h-7 ${date > 0 && "motion-safe:animate-bounce"}`} />
        <p className="text-md mt-1">1</p>   
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 1 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/electric-guitar.png" alt="fire" className={`w-10 h-10 max-sm:w-7 max-sm:h-7 ${date > 1 && "motion-safe:animate-bounce"}`} />
        <p className="text-md mt-1">2</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 2 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/electric-guitar.png" alt="fire" className={`w-10 h-10 max-sm:w-7 max-sm:h-7 ${date > 2 && "motion-safe:animate-bounce"}`} />
        <p className="text-md mt-1">3</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 3 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/electric-guitar.png" alt="fire" className={`w-10 h-10 max-sm:w-7 max-sm:h-7 ${date > 3 && "motion-safe:animate-bounce"}`} />
        <p className="text-md mt-1">4</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 4 ? "opacity-100" : "opacity-50"}`}>
        <img src="/image/icon/electric-guitar.png" alt="fire" className={`w-10 h-10 max-sm:w-7 max-sm:h-7 ${date > 4 && "motion-safe:animate-bounce"}`} />
        <p className="text-md mt-1">5</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${date > 4 ? "opacity-100" : "opacity-50"}`}>
        {date <= 4 ? (
          <img src="/image/icon/lock.svg" alt="lock" className="w-7 h-7 max-sm:w-5 max-sm:h-5 mt-1" />
        ) : (
          <img
            src="/image/icon/unlock.svg"
            alt="unlock"
            className="w-7 h-7 mt-1 motion-safe:animate-pulse"
          />
        )}

        <p className="text-md mt-1">2X</p>
      </div>
    </div>
  );
}
