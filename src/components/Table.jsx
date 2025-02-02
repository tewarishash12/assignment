import React, { useEffect, useState } from "react";

function generateSequence(limit) {
    let sequence = new Set();
    let start = 1;
    let diff = 11;

    while (start < limit) {
        for (let i = 0; i < 9; i++) {
            sequence.add(start);
            start += diff;
        }
        if (diff === 11)
            diff -= 2;
        else
            diff += 2;
    }
    return sequence;
}

function generateRedSequence(start, isFirstRound , limit) {
    let diff= isFirstRound ? 9 : 11;

    let redSequence = new Set();
    while (start < limit) {
        let col = 8
        for (let i = col; i >= 0; i--) {
            start = start + diff;
            redSequence.add(start);
            if((diff===11 && start%10===0) || (diff===9 && start%10===1))
                break;
        }
        if (diff === 9) diff += 2
        else diff -= 2
    }

    return redSequence;
}

function Table() {
    const gridSize = 500;
    const numbers = Array.from({ length: gridSize }, (_, i) => i + 1);
    const sequenceSet = generateSequence(gridSize);
    const [redSequence, setRedSequence] = useState(new Set())
    const [isFirstRound, setIsFirstRound] = useState(true);
    const [start, setStart] = useState(-9);

    useEffect(() => {
        const interval = setInterval(() => {
            setRedSequence(new Set(generateRedSequence(start, isFirstRound , gridSize)));

            
            if (start >= -1 && isFirstRound) {
                setIsFirstRound(false)
                setStart(-1);
            } else if (start <= -10 && !isFirstRound) {
                setIsFirstRound(true);
                setStart(-10)
                // setRedSequence(new Set(generateRedSequence(start, isFirstRound , gridSize)));
            } else {
                setStart((prev) => isFirstRound ? prev + 1 : prev - 1)
            }
        }, 100)

        return () => clearInterval(interval);
    }, [start,isFirstRound])

    // useEffect(() => {
    //     function executeLoop() {
    //         let start = isFirstRound ? -9 : -2;
    //         if (isFirstRound) {
    //             let i = start;

    //             function runFirstLoop() {
    //                 if (i < 0) {
    //                     setRedSequence(generateRedSequence(i, gridSize))
    //                     // console.log("First Loop" + i + " sequence " + [...generateRedSequence(i, 500)]);
    //                     setI((num) => num + 1)
    //                     // i++;
    //                     setTimeout(runFirstLoop, 100);
    //                 } else {
    //                     setIsFirstRound(false)
    //                     executeLoop();
    //                 }
    //             }

    //             runFirstLoop();
    //         } else {
    //             let i = start;
    //             function runSecondLoop() {
    //                 if (i >= -10) {
    //                     setRedSequence(generateRedSequence(i, gridSize));
    //                     // console.log("Second Loop" + i + " sequence " + [...generateRedSequence(i, 250)]);
    //                     setI((num) => num - 1);
    //                     // i--;
    //                     setTimeout(runSecondLoop, 100);
    //                 } else {
    //                     setIsFirstRound(true);
    //                     executeLoop();
    //                 }
    //             }

    //             runSecondLoop();
    //         }
    //     }

    //     executeLoop();
    // }, [isFirstRound])

    return (
        <div className="grid grid-cols-10 gap-2 p-4 w-fit mx-auto">
            {numbers.map((num) => (
                <div
                    key={num}
                    className={`border p-2 text-center w-10 h-10 flex items-center justify-center 
                        ${redSequence.has(num) ? "bg-red-500" : sequenceSet.has(num) ? "bg-blue-500" : "bg-gray-200"}`
                    }
                >
                    {num}
                </div>
            ))}
        </div>
    );
}

export default Table;
