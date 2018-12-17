export default () => {
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;
    const currentTime = `${today.getHours()}:${today.getMinutes()}`;
    return `${currentDate} ${currentTime}`;
};
