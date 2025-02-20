// const moment = require("moment");

// console.log(moment().format('dddd'))

arr = [2,6,"raju", "neel", 5,9,34,23,7]

// loop the array element 


// Even Number 
// Even Number
// Not a number 
// Not a Number
// Odd Number 

// for of 

// forEach

arr.forEach(element => {

    if(typeof element === "number"){


        if(element%2 == 0){

           console.log("Even Number ") 
        }
        else{

            console.log("Odd Number ") 
        }
    }
    else{

        console.log("Not a Number ") 
    }
    
});