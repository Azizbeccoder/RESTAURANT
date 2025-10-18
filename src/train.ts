// function findMaxIndex(values: number[]): number {
//     if (values.length === 0) throw new Error("Array is empty");

//     let maxValue = values[0];
//     let maxIndex = 0;

//     for (let i = 1; i < values.length; i++) {
//         if (values[i] > maxValue) {
//             maxValue = values[i];
//             maxIndex = i;
//         }
//     }

//     return maxIndex;
// }

// // Example
// // console.log(findMaxIndex([3, 14, 7, 10])); 
// function extractPositiveNumbers(arr: number[]): string {
//   return arr.filter(num => num > 0).join('');
// }

// console.log(extractPositiveNumbers([7, -3, 0, 4])); 
// console.log(extractPositiveNumbers([-5, -2, -9]));   
// console.log(extractPositiveNumbers([10, 0, 5, -1])); 
// console.log(extractPositiveNumbers([1, 2, 3]));     

// function extractNumbers(input: string): string {
//   return input.replace(/\D/g, '');
// }

// console.log(extractNumbers("a1b2c3"));    // "123"
// console.log(extractNumbers("hello"));     // ""
// console.log(extractNumbers("room2025"));  // "2025"


/* Project Standards
- Logging standards
- Naming standards
  function, method, variable => CAMEL   goHome
  class => PASCAL   MemberService 
  folder => KEBAB
  CSS => Snake       button_style 
  -Error handling 

*/ 


function majorityElement(element: number[]): Number {
    let new_elemnt = element.sort();
    console.log(new_elemnt);
    let maxCount = 0;
    let currentCount = 1;
    let majority = new_elemnt[0];

    for(let i = 1; i < new_elemnt.length; i++){
        if(new_elemnt[i] === new_elemnt[i - 1]){
            currentCount ++;
        } else {
            currentCount = 1;
        }
        if( currentCount > maxCount) {
        maxCount = currentCount;
        majority = new_elemnt[i];
        }
    };
    return majority;
}


console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4]));