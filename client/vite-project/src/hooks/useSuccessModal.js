import { useState } from 'react';

const useSuccessModal = () => {

    const [seconds, setSeconds] = useState(2);
    const [intervalId, setIntervalId] = useState(null);

    // get body element to make sure when success modal opens page is not scrollable
    const bodyElement = document.querySelector('body');

    const startTimer = () => {
        // disable page scroll when modal shows
        bodyElement.style.overflowY = 'hidden';

        const interval = setInterval(() => {
            setIntervalId(interval);
            setSeconds((prev) => prev -= 1)
        }, 1000)
    }

    const endTimer = () => {
        // enable page scroll again as modal disappears
        bodyElement.style.overflowY = 'scroll';
        setSeconds(null);
        clearInterval(intervalId);
    }

    return {
        startTimer,
        endTimer,
        seconds,
        delayMs: seconds * 1000,
        intervalId
    }
}

export default useSuccessModal;