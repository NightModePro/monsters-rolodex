/*
add event handler
get input values
add the new item to our data structure
add new item to the UI
calculate budget
update the UI
*/

/*
UI MODULE
get input values
add the new item to the UI
update the UI

DATA MODULE
add the enw item to our data structure
calculate bodget

CONTROLLER MODULE
add event handler
*/



// BUDGET CONTROLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        total: {
            exp: 0,
            inc: 0,
        }
    };

    var ID = {
        'exp': -1,
        'inc': -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem;
            // create new id, 
            // if (data.allItems[type].length > 0) {
            //     ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            // } else {
            //     ID = 0;
            // }

            ID[type] = ID[type] + 1;

            // create new item based on 'inc' and 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID[type], des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID[type], des, val);
            }

            // push it into our data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    }

})();


// UI Controler
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        addListItem: function (obj, type) {

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };
}());


// GLOBAL APP CONTROLLER
var controler = (function (budgerCtrl, UICtrl) {

    var setupEventListener = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. get the filed input data
        input = UICtrl.getInput();

        // 2. add the item to the budget controler
        newItem = budgerCtrl.addItem(input.type, input.description, input.value);

        // 3. add the item to UI

        // 4. calculate the budet

        // 5. dispay the budget on the UI
    };

    return {
        init: function () {
            setupEventListener();
        }
    }

})(budgetController, UIController);

controler.init();




// 33103