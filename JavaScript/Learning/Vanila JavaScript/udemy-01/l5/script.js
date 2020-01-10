/*
var personProto = {
    calculateAge: function () {
        console.log(2016 - this.yearOfBird);
    }
}

var john = Object.create(personProto);
john.name = 'john';
john.yearOfBird = 1990;
john.job = 'it';

var jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBird: { value: 1969 },
    job: { value: 'designer' }
})
*/
/*
var a = 23;
var b = a;
a = 46;
console.log(a)
console.log(b)


var obj1 = {
    name: 'john',
    age: 23
}
var obj2 = obj1;
obj1.age = 46;

console.log(obj1.age)
console.log(obj2.age)
*/
/*
var years = [1995, 1548, 1458, 1458, 1547];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}


function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el) {
    return el >= 18;
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(years, isFullAge);
console.log(ages)
console.log(fullAges)
*/


var mike = {
    name: "mike",
    age: 26,
    job: 'reacher',
    presentation: function (style, timeOdDay) {
        if (style == 'formal') {
            console.log('good ' + timeOdDay + ' bal bla bla')
        } else if (style == 'friendly') {
            console.log('hey! what\'s app')
        }
    }
}

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
}


mike.presentation('formal', 'morning')
mike.presentation.call(emily, 'friendly', 'afternoon')
// mike.presentation.apply(emily, ['friendly', 'afternoon'])

var johnFriendly = mike.presentation.bind(mike, 'friendly');

johnFriendly('morning')

exercise: ~11700 part 3