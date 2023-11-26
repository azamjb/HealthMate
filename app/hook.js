const convertSecondsToTime = (seconds) => {
    // Convert seconds into HH:MM:SS format
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  exports.useTimer = (hrs, minutes) => {
    const [seconds, setSeconds] = useState(hrs * 3600 + minutes * 60);
    const [time, setTime] = useState(convertSecondsToTime(seconds));
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          setTime(convertSecondsToTime(newSeconds));
          return newSeconds;
        });
      }, 1000);
  
      // Clear interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    return time;
  };
  
  