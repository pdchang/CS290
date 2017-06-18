/*Philip Chang - CS 290 - Week 4 - automobile.js */

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    /*your code here*/
    //using bubble sort
    var size = array.length - 1; //arrays start at 0;
    for(var i = 0; i < size; i++){
      for (var j = 0; j < size; j++){
        if(comparator(array[j], array[j+1]) == false){
          var temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
        }
      }
    }
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* your code here*/
    if(auto1.year > auto2.year){
      return true;
    }
    else {
      return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/
    temp1 = auto1.make.toLowerCase();
    temp2 = auto2.make.toLowerCase();

    if (temp1 < temp2){ //less than because letters that come earlier are greater
      return true;
    }
    else{
      return false;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    /* your code here*/
    temp1 = auto1.type.toLowerCase();
    temp2 = auto2.type.toLowerCase();

    var dictionary = {
      "roadster": 1,
      "pickup": 2,
      "suv": 3,
      "wagon:": 4
    };
    if(dictionary[temp1] != undefined){
      var temp3 = dictionary[temp1]
    }
    else{
      var temp3 = 5;
    }
    if(dictionary[temp2] != undefined){
      var temp4 = dictionary[temp2];
    }

    if(temp3 < temp4){
      return true;
    }
    else if(temp3 > temp4){
      return false;
    }
    else{
      return yearComparator(auto1, auto2);
    }


}
var aSize = automobiles.length;
console.log("***** \n");
sortArr(yearComparator, automobiles);
console.log("The cars sorted by year are: ")
for (var i = 0; i < aSize; i++){
  console.log( automobiles[i].year + ' ' + automobiles[i].make + ' ' + automobiles[i].model + '\n');
}
sortArr(makeComparator,automobiles);
console.log("\nThe cars sorted by make are: ")
for (var i = 0; i < aSize; i++){
  console.log(automobiles[i].year + ' ' + automobiles[i].make + ' ' + automobiles[i].model+ '\n');
}
sortArr(typeComparator,automobiles);
console.log("\nThe cars sorted by type are: ")
for (var i = 0; i < aSize; i++){
  console.log(automobiles[i].year + ' ' + automobiles[i].make + ' ' + automobiles[i].model + ' '  + automobiles[i].type + '\n');
}
console.log("***** \n")
/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */
