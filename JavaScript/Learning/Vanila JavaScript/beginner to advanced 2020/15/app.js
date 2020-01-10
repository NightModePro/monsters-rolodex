function add(num1, num2) {
    return num1 + num2
}

function createTaxCalculaor(tax) {
    function calculateTax(amount) {
        return amount * tax;
    }

    return calculateTax;
}

const calculateVATAmount = createTaxCalculaor(0.19);

let user = 'max'

function greetUser() {
    let name = 'anna'
    console.log('hi ' + name);
}

user = 'manuel'

greetUser();

// function powerOf(x, n) {
//     let result = 1;

//     for (let i = 0; i < n; i++) {
//         result *= x
//     }

//     return result;
// }

function powerOf(x, n) {
    // if (n === 1) {
    //     return x;
    // }
    // return x * powerOf(x, n - 1)

    return n === 1 ? x : powerOf(x, n - 1)
}
console.log(powerOf(2, 3))


const myself = {
    name: 'max',
    friends: [{
        name: 'michael',
        friends: [
            {
                name: 'criss',
            }
        ]
    },
    {
        name: 'julia'
    }
    ]
}

function getFriendName(person) {
    const collectedNames = [];

    if (!person.friend) {
        return [];
    }

    for (const friend of person.friends) {
        collectedNames.push(friend.name)
        collectedNames.push(...getFriendName(friend));
    }

    return collectedNames;
}

console.log(getFriendName(myself))