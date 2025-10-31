import { useState } from 'react';

const useSuccessModal = () => {

    const [seconds, setSeconds] = useState(2);
    const [intervalId, setIntervalId] = useState(null);

    const startTimer = () => {

        const interval = setInterval(() => {
            setIntervalId(interval);
            setSeconds((prev) => prev -= 1)
        }, 1000)
    }

    const endTimer = () => {
        setSeconds(null);
        clearInterval(intervalId);
    }

    return {
        startTimer,
        endTimer,
        seconds,
        delayMs: seconds * 1000
    }
}

export default useSuccessModal;