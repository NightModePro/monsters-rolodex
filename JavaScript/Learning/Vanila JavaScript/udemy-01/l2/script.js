var mike = {
    name: 'mike',
    age: 12,
    power: function () {
        return 'my power';
    }
}

console.log(mike)

var john = {
    name: 'john',
    age: 13,
}

john.power = mike.power;
console.log(john)