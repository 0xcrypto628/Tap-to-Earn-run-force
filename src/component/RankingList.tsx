import { useEffect, useState } from "react";

interface UserItem {
  ranking: number;
  username: string;
  score: number;
}

export default function RankingList() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userList, setUserList] = useState<UserItem[]>([]);
  const [telUser, setTelUser] = useState<{ username: string; id: string }>();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const foundUser = userList.find(
      (user) => user.username === telUser?.username
    );
    foundUser && setUser(foundUser);
  }, [userList]);

  useEffect(() => {
    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    if (webapp && webapp["user"]) {
      setTelUser({
        username: webapp["user"]["username"],
        id: webapp["user"]["id"],
      });
      console.log("=========>webapp", webapp["user"]);
    }
  }, []);

  async function fetchUserData() {
    try {
      const response = await fetch(`${backendUrl}/rank/ranking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const res = await response.json();
      console.log("Ranking Response: ", res);
      if (!res.userRanking) {
        throw new Error("Empty response");
      }
      const newUserList: UserItem[] = [];
      res.userRanking.map((item: any, index: number) => {
        // Add types to map parameters
        newUserList.push({
          ranking: index + 1,
          username: item.username,
          score: item.tokenBalance,
        });
      });
      setUserList(newUserList);

      console.log("Ranking Response: ", res);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const [user, setUser] = useState<UserItem>();

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(Number(number.toFixed(0)));
  }
  return (
    <div className="md:w-[500px] mx-auto ">
      <div className="max-h-[65vh] max-sm:max-h-[55vh] overflow-auto">
        <div className="flex px-3 py-1 text-[#939393] text-lg font-bold">
          <div className="text-start w-[20%]">Rank</div>
          <div className="text-start w-[55%]">User</div>
          <div className="text-start w-[20%]">XATOM</div>
        </div>
        {userList.map((data, index) => (
          <div
            key={index}
            className={`flex ${
              index > 0 && "my-3"
            } px-3 py-2 items-center bg-[#6d548a] rounded-lg`}
          >
            <div className="text-xl max-sm:text-lg text-start pl-2 w-[20%]">
              {index + 1}
            </div>
            <div className="relative h-10 overflow-hidden w-[60%] flex items-center">
              <img
                src="/image/icon/user.png"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-xl max-sm:text-lg text-start pl-2">
                {data.username}
              </p>
            </div>

            <p className="text-xl max-sm:text-lg text-start pl-2 w-[30%]">
              {formatNumberWithCommas(data.score)}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-3 border-[#363636] border-2" />
      {user && (
        <div
          className={`flex my-3 px-3 py-2 items-center bg-[#9c7e59] rounded-lg`}
        >
          <div className="text-xl max-sm:text-lg text-start pl-2 w-[20%]">
            {user.ranking}
          </div>
          <div className="relative h-12 overflow-hidden w-[60%] flex items-center">
            <img
              src="/image/icon/user.png"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-xl max-sm:text-lg text-start pl-2">
              {user.username}
            </p>
          </div>

          <p className="text-xl max-sm:text-lg text-start pl-2 w-[30%]">
            {formatNumberWithCommas(user.score)}
          </p>
        </div>
      )}
    </div>
  );
}
