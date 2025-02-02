function generateRedSequence(start , limit) {
    let diff= isFirstRound ? 9 : 11;

    let redSequence = new Set();
    while (start < limit) {
        let col = 8
        for (let i = col; i >= 0; i--) {
            start = start + diff;
            if(start<=0 || start>limit)
                continue;
            redSequence.add(start);
            if((diff===11 && start%10===0) || (diff===9 && start%10===1))
                break;
        }
        if (diff === 9) diff += 2
        else diff -= 2
    }

    return redSequence;
}

let isFirstRound = true; 


function executeLoop() {
    let start = isFirstRound ? -8 : -1;
    if (isFirstRound) {
        let i = start;

        function runFirstLoop() {
            if (i < 0) {
                console.log("First Loop" + i+ " sequence " + [...generateRedSequence(i,250)]);
                i++;
                setTimeout(runFirstLoop, 1000);
            } else {
                isFirstRound = false;
                executeLoop();
            }
        }

        runFirstLoop(); 
    } else {
        let i = start;

        function runSecondLoop() {
            if (i >= -10) {
                console.log("Second Loop" + i+ " sequence " + [...generateRedSequence(i,250)]);
                i--;
                setTimeout(runSecondLoop, 1000);
            } else {
                isFirstRound = true; 
                executeLoop();
            }
        }

        runSecondLoop(); 
    }
}

executeLoop();


// start: -1 diff-1: 11 diff-2: 9 col-8
// start: -2 diff-1: 11 diff-2: 9 col-8
// start: -3 diff-1: 11 diff-2: 9 col-8
// start: -4 diff-1: 11 diff-2: 9 col-8
// start: -5 diff-1: 11 diff-2: 9 col-8
// start: -6 diff-1: 11 diff-2: 9 col-8
// start: -7 diff-1: 11 diff-2: 9 col-8
// start: -8 diff-1: 11 diff-2: 9 col-8
// start: -9 diff-1: 11 diff-2: 9 col-8
// start: -10 diff-1: 11 diff-2: 9 col-8

// start: -9 diff-1: 11 diff-2: 9 col-8
// start: -8 diff-1: 11 diff-2: 9 col-8
// start: -7 diff-1: 11 diff-2: 9 col-8
// start: -6 diff-1: 11 diff-2: 9 col-8
// start: -5 diff-1: 11 diff-2: 9 col-8
// start: -4 diff-1: 11 diff-2: 9 col-8
// start: -3 diff-1: 11 diff-2: 9 col-8
// start: -2 diff-1: 11 diff-2: 9 col-8
// start: -1 diff-1: 11 diff-2: 9 col-8