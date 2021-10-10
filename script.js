const transactionOnUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const RemoveTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}
const addTrasaction = ({amount,name,id}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transactions.amount)
    const li = document.createElement('li')
    li.classList.add(CSSClass)
    
    li.innerHTML = `
     ${transactions.name} <span>${operator}R$${amountWithoutOperator}</span>
     <button class="delete-btn" onClick = "RemoveTransaction(${transactions.id})">
     x
     </button>`
    transactionOnUl.append(li)
}
const getExpenses = transactionsAmounts => {
    Math.abs(transactionsAmounts.filter(value => value < 0).reduce((acumulator, value) => acumulator + value, 0)).toFixed(2)
}
const getIncome = transactionsAmounts => {
    transactionsAmounts.filter(value => value > 0).reduce((acumulator, value) => acumulator + value, 0).toFixed(2)
}
const getTotal = transactionsAmounts => {transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2)

}
    
    
const UppdateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({amount})=> amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)
        
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`

}
const init = () => {
    transactionOnUl.innerHTML = ''
    transactions.forEach(addTrasaction)
    UppdateBalanceValues()
}
init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions',JSON.stringify(transactions))
}
const GenerateId = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (TransactionName, transactionsAmount) => {
    transactions.push(TransactionNew)
    const TransactionNew = {
        id: GenerateId(),
        name: TransactionName,
        amount: Number(TransactionAmount)
    }
}

const cleanInputs = () => {
    inputTransactionName = ''
    inputTransactionAmount = ''
}
const handleFormSubmit = event => {
    event.preventDefault()

    const TransactionName =  inputTransactionName.value.trim()
    const TransactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = TransactionName === '' || TransactionAmount === ''
    
    if (isSomeInputEmpty) {
        alert('Por Favor preencha tanto o nome quanto o valor da transação!')
     return
    }
    addToTransactionsArray(TransactionName,TransactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)