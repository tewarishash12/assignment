import React, { useState, useEffect } from "react";

function Table() {
    const gridSize = 500; 
    const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);
    const columns = 10;
    const lastColumnIndex = columns - 1;

    const [direction, setDirection] = useState(1);
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPosition((prev) => {
                const nextPosition = prev + direction;

                if (nextPosition % columns === lastColumnIndex) {
                    setDirection(-direction);
                }

                return nextPosition;
            });
        }, 1000); 

    }, [direction]);

    return (
        <div className="grid grid-cols-10 gap-2 p-4 w-fit mx-auto">
            {numbers.map((num) => {
                let isBlue = false;
                let isRed = false; // For tracking the red square

                const cycle = Math.floor((num - 1) / 180); 
                const cycleStart = cycle * 180 + 1;
                const localNum = num - cycleStart + 1;

                if (localNum <= 100) {
                    isBlue = (localNum - 1) % 11 === 0;
                } 
                else if (localNum > 100 && localNum < 181) {
                    isBlue = (localNum - 100) % 9 === 0;
                }

                // Check if this number should be red (based on currentPosition)
                if (num === currentPosition + 1) {
                    isRed = true;
                }

                return (
                    <div
                        key={num}
                        className={`border p-2 text-center w-10 h-10 flex items-center justify-center 
                            ${isBlue ? "bg-blue-500 text-white" : "bg-gray-200"} 
                            ${isRed ? "bg-red-500 text-white" : ""}`}
                    >
                        {num}
                    </div>
                );
            })}
        </div>
    );
}

export default Table;
