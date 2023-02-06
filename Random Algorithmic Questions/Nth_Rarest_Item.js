const list = [5, 4, 5, 4, 5, 4, 4, 5, 3, 3, 3, 2, 2, 1, 5];
const n = 2;

function nth_most_rate_signature(list, n) {
    let numMapping = {};
    for (let num of list) {
        if (!(num in numMapping)) numMapping[num] = 0;
        numMapping[num]++;
    }

    for (let num in numMapping) {
        if (numMapping[num] === n) console.log(num)
    }
}

nth_most_rate_signature(list, n)