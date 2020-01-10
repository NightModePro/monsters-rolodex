

// const boxes = document.querySelectorAll('.box');

// const boxesArr6 = Array.from(boxes)
// boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue')

// for (const cur of boxesArr6) {
//     if (cur.className.includes('blue')) {
//         continue
//     }
//     cur.textContent = 'I changed to something else'
// }

// function SmithPerson(firstName, yOB, lastName, nationality) {

//     lastName === undefined ? lastName = 'Smith' : lastName;
//     nationality === undefined ? lastName = 'American' : nationality;

//     this.firstName = firstName;
//     this.yOB = yOB;
//     this.lastName = lastName;
//     this.nationality = nationality
// }

// var john = new SmithPerson('John', 1990);
// console.log(john)

// function SmithPerson(firstName, yOB, lastName = 'Smith', nationality = 'American') {

//     this.firstName = firstName;
//     this.yOB = yOB;
//     this.lastName = lastName;
//     this.nationality = nationality;
// }

// var john = new SmithPerson('John', 1990);
// console.log(john)

// const question = new Map();
// question.set('question', 'what is the official name of the latest major JS version?')
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'correct asnwer');
// question.set(false, 'wrong');

// console.log(question.get('question'))
// console.log(question.size)


// var Person5 = function (name, yOB, job) {
//     this.name = name;
//     this.yOB = yob;
//     this.job = job;
// }

// Person5.prototype.calculateAge = function () {
//     var age = new Date().getFullYear - this.yOB;
//     console.log(age)
// }

// class Person6 {
//     constructor(name, yOB, job) {
//         this.name = name;
//         this.yOB = yOB;
//         this.job = job;
//     }

//     calculateAge() {
//         var age = new Date().getFullYear() - this.yOB;
//         console.log(age)
//     }

//     static greeting() {
//         console.log('hei there')
//     }
// }

// // const john6 = new Person6('john', 1990, 'teacher')


// class Athlethe6 extends Person6 {
//     constructor(name, yOB, job, olypicGames, medals) {
//         super(name, yOB, job);
//         this.olypicGames = olypicGames;
//         this.medals = medals;
//     }

//     wonMedals() {
//         this.medals++
//         console.log(this.medals)
//     }
// }

// const johnAt = new Athlethe6('john', 1990, 'swimmer', 3, 10)








// 14047
// 32920
// 35804