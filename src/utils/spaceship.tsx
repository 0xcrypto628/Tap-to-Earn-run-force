const getRandomPositions = () => {
    const positions = { x: Math.random() * (window.innerWidth + 200), y: Math.random() * (window.innerHeight + 50), isGet: false }
    return positions;
};

const getRandomWaterFalls = () => {
    const positions = { x: Math.floor(Math.random() * (3 * screen.width - screen.width)) + screen.width, y: Math.random() * 50 - 50 }

    return positions;
}

const calculateRemainingTime = (date: string) => {
    const currentDate = Date.parse(new Date().toUTCString());
    const remainingMilliseconds = Date.parse(date) - currentDate;

    let seconds = Math.floor((remainingMilliseconds / 1000) % 60);
    let minutes = Math.floor((remainingMilliseconds / (1000 * 60)) % 60);

    let resMins = (minutes < 10) ? "0" + minutes : String(minutes);
    let resSeconds = (seconds < 10) ? "0" + seconds : String(seconds);

    return { resMins, resSeconds };
}

export { getRandomPositions, getRandomWaterFalls, calculateRemainingTime };