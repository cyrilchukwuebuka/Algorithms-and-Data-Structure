let input = [4, 5, 6];
// [2, 0, 2]

function carFleet(input) {
    // let countArr = [];
    for (let i = 0; i < input.length; i++) {
        // countArr[i] = solve(input[i]);
        input[i] = input[i] % 2 !== 0 ? 0 : Math.floor(input[i] / 4 + 1);
    }

    return input;
}

console.log(carFleet(input))



// function solve(data, count = 0) {
//     if (data === 1 || data < 0) return 0;
//     if (data === 0) return 1;

//     // 16 4444 1 2 -> 8 1
//     let totalCount = 0;
//     let currentValue = 0; // 6
//     if (data - 4 > -1) {
//         currentValue = data - 4;
//         totalCount += solve(currentValue);
//     }
    
//     if (data - 2 > -1) {
//         currentValue = data - 2;
//         totalCount += solve(currentValue);
//     }

//     return totalCount
// };

// console.log(solve(6))