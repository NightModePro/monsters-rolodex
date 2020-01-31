/*
    1. event handler
    2. get input values
    3. add the new item to our data structure
    4. add the new item to the UI
    5. calculaate budget
    6. update the UI
*/

/*
    UI Module
        * get input values
        * add the new item to the UI
        * update the UI


    DATA Module
        * add the new item to our data structure
        * calculaate budget
    
    
    CONTROLER module
        * add event handler
*/


// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1
    };

    // keep track of IDs
    var ID = {
        exp: 0,
        inc: 0
    }

    return {
        addItem: function (type, des, val) {
            var newItem;

            if (type === 'exp') {
                newItem = new Expense(ID[type], des, val);
                ID[type]++;
            } else if (type === 'inc') {
                newItem = new Income(ID[type], des, val);
                ID[type]++;
            }

            data.allItems[type].push(newItem);

            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index


            ids = data.allItems[type].map(function (current) {
                return current.id;
            })

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget() {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp

            // calculate the % of income the we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc)
            });

        },

        getPercentage: function () {
            var allPercentages = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            })

            return allPercentages;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        testing: function () {
            console.log(data);
        }
    }

})();


// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expansesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLable: '.budget__income--value',
        expesesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    }

    var formatNumber = function (num, type) {
        var numSplit, int, dec, type;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }

        dec = numSplit[1];

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
    }

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;

            // create html string with placehodler text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expansesContainer
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value));

            // insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorId) {
            var element = document.getElementById(selectorId);
            document.getElementById(selectorId).parentNode.removeChild(element);
        },

        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = '';
            });

            fieldsArr[0].focus();

        },

        displayBudget: function (obj) {
            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp'

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLable).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expesesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage >= 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            })
        },

        displayMonth: function () {
            var now, year, month, months;

            var now = new Date();

            months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function () {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red')
        },


        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();


// GLOBAL APP CONTROLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {

                ctrlAddItem()

            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeteleItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType)
    };

    var updateBudget = function () {

        // 1. calculate the budget
        budgetCtrl.calculateBudget();

        // 2. return the budget
        var budget = budgetCtrl.getBudget();

        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);

    };

    var updatePercentages = function () {

        // 1. calculate procentages
        budgetCtrl.calculatePercentages();

        // 2. read percentages from budget controller
        var percentages = budgetCtrl.getPercentage();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function () {

        var input, newItem;

        // 1. get the field input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. clear the fields
            UICtrl.clearFields();

            // 5. calculate and update the budget
            updateBudget();

            // 6. calculate and update percentages
            updatePercentages();
        }

    }

    var ctrlDeteleItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. delete item from UI
            UICtrl.deleteListItem(itemID);

            // 3. update and show budget
            updateBudget();

            // 4. calculate and update percentages
            updatePercentages();
        }

    };

    return {
        init: function () {
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();

// 13700 project mapped