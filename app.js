class UI {
    
    constructor() {
        this.budgetFeedback = document.querySelector('.budget-feedback')
        this.expenseFeedback = document.querySelector('.expense-feedback')
        this.budgetForm = document.querySelector('#budget-form')
        this.budgetInput = document.querySelector('#budget-input')
        this.budgetAmount = document.querySelector('#budget-amount')
        this.expenseAmount = document.querySelector('#expense-amount')
        this.budgetSection = document.querySelector('#budget')
        this.expenseSection = document.querySelector('#expense')
        this.balanceSection = document.querySelector('#balance')
        this.balanceAmount = document.querySelector('#balance-amount')
        this.expensForm = document.querySelector('#expense-form')
        this.expenseNameInput = document.querySelector('#expense-input')
        this.expenseAmountInput = document.querySelector('#amount-input')
        this.expenseList = document.querySelector('#expense-list')
        this.itemList = []
        this.itemId = 0
    }

    // Submit Budget
    submitBudget() {
        const value = Number(this.budgetInput.value)

        if (isNaN(value) || value <= 0 || value === '') {

            this.budgetFeedback.classList.add('showItem')
            this.budgetFeedback.innerHTML = `<p>Input field can not be Empty or Zero.</p>`
            const self = this;

            setTimeout(() => {
                this.budgetFeedback.classList.remove('showItem')
            }, 3000);

        } else {

            // Show Budget Amount
            this.budgetAmount.textContent = value.toFixed(2)

            this.budgetInput.value = '';

            // Show Balence
            this.showBalence();
        }
    }

    // Submit Expense
    expenseSubmit() {
        const expenseName = this.expenseNameInput.value
        const expenseAmount = Number(this.expenseAmountInput.value)
        const budgetAmount = Number(this.budgetAmount.textContent)

        if (budgetAmount <= 0) {

            this.expenseFeedback.classList.add('showItem')
            this.expenseFeedback.innerHTML = `<p>Budget amount can not be Zero(0).</p>`
            this.budgetSection.classList.add('showError')

            const self = this;
            setTimeout(() => {
                this.budgetSection.classList.remove('showError')
                self.expenseFeedback.classList.remove('showItem')
            }, 3000);
        } else {

            if (expenseName === '' || expenseAmount === '' || expenseAmount <= 0) {

                this.expenseFeedback.classList.add('showItem')
                this.expenseFeedback.innerHTML = `<p>Input field can not be empty and expense amount can not 0 or less then zero.</p>`

                const self = this;

                setTimeout(() => {
                    self.expenseFeedback.classList.remove('showItem')
                }, 5000);
            } else {

                const item = {
                    id: this.itemId,
                    title: expenseName,
                    value: expenseAmount
                }


                // Push item
                this.itemList.push(item);

                this.expenseNameInput.value = ''
                this.expenseAmountInput.value = ''

                this.addItem(item);

                // Increment item id 
                this.itemId++;





            }
        }

    }

    // Show Balence
    showBalence() {
        const value = Number(this.budgetAmount.textContent) - this.totalExpense()
        
        // Show Banlence
        this.balanceAmount.textContent = value.toFixed(2)

        // Show Expense
        this.expenseAmount.textContent = this.totalExpense().toFixed(2)


        if (value <= 0) {
            this.balanceSection.classList.add('showError')

        } else {
            this.balanceSection.classList.remove('showError')
        }
    }

    // Total Expense
    totalExpense() {
        let total = 0;

        if(this.itemList.length > 0){
            this.itemList.forEach((item)=>{
                total += item.value
            })
            return total
        }

        return total
    }

    // Add Item
    addItem(item) {
        const div = document.createElement('div')

        div.innerHTML =
        `<div class="expense-item d-flex justify-content-between   align-items-baseline">
            <h6 class="expense-title mb-0 text-uppercase list-item">- ${item.title}</h6>
            <h5 class="expense-amount mb-0 list-item">$${item.value}</h5>
            <div class="expense-icons list-item">
                <a href="#expense-edit" class="edit-icon mx-2" data-id="${item.id}">
                    <i class="bi bi-pencil-square"></i> 
                </a>
                <a href="#expense-edit" class="delete-icon" data-id="${item.id}">
                    <i class="bi bi-trash3"></i>
                </a>
            </div>
        </div>`

        this.expenseList.appendChild(div)
        this.showBalence()
    }

    // Edit Item
    eidtItem(element){
        const id = element.dataset.id

        const parentElement = element.parentElement.parentElement.parentElement
        parentElement.remove()


        const item = this.itemList.filter(item=>{
            return item.id == id
        })


        // Fill expense input
        this.expenseNameInput.value = item[0].title
        this.expenseAmountInput.value = item[0].value

        // Make temp list
        const tempList = this.itemList.filter(item=>{
            return item.id != id
        })

        // Assign final value
        this.itemList = tempList

        // Fix balence
        this.showBalence()

        


    }

    // Trash Item
    trashItem(element){
        const id = element.dataset.id

        const parentElement = element.parentElement.parentElement.parentElement
        parentElement.remove()

         // Make temp list
         const tempList = this.itemList.filter(item=>{
            return item.id != id
        })

        // Assign final value
        this.itemList = tempList
        
        // Fix balence
        this.showBalence()

        
    }
}


function eventListener() {

    // New Instance of UI
    const ui = new UI()

    // Budget Submit 
    ui.budgetForm.addEventListener('submit', function (event) {
        event.preventDefault();

        ui.submitBudget();
    })

    // Expense Submit
    ui.expensForm.addEventListener('submit', function (event) {
        event.preventDefault();

        ui.expenseSubmit()
    })

    // Expenselist
    ui.expenseList.addEventListener('click', function(event){
        
        if(event.target.classList.contains('bi-pencil-square')){
            
            ui.eidtItem(event.target.parentElement)

        }else if(event.target.classList.contains('bi-trash3')){

            ui.trashItem(event.target.parentElement)

        }
    })


}


document.addEventListener('DOMContentLoaded', function () {
    eventListener()
})