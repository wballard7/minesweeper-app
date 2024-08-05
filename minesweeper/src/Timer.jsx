import React, { useState, useEffect } from 'react';

const Timer = ({ isActive, resetTimer }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (resetTimer) {
            setSeconds(0);
        }
    }, [resetTimer]);

    const formatTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            <strong>Time Elapsed: </strong>{formatTime(seconds)}
        </div>
    );
};

export default Timer;