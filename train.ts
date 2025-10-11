function findMaxIndex(values: number[]): number {
    if (values.length === 0) throw new Error("Array is empty");

    let maxValue = values[0];
    let maxIndex = 0;

    for (let i = 1; i < values.length; i++) {
        if (values[i] > maxValue) {
            maxValue = values[i];
            maxIndex = i;
        }
    }

    return maxIndex;
}

// Example
console.log(findMaxIndex([3, 14, 7, 10])); 
