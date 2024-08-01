
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseDateInput = document.getElementById('expense-date');
const addExpenseButton = document.getElementById('add-expense-button');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountElement = document.getElementById('total-amount');
const categoryFilterSelect = document.getElementById('category-filter');

let expenses = [];

function addExpense() {
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseCategory = expenseCategorySelect.value;
  const expenseDate = expenseDateInput.value;

  if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please fill in all fields correctly.');
    return;
  }

  const newExpense = {
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
    date: expenseDate
  };

  expenses.push(newExpense);

  renderExpenses();

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseCategorySelect.value = 'Food';
  expenseDateInput.value = '';

  updateTotalAmount();
}

function renderExpenses() {
  expenseTableBody.innerHTML = '';

  const filteredExpenses = categoryFilterSelect.value === 'all' ? expenses : expenses.filter(expense => expense.category === categoryFilterSelect.value);

  filteredExpenses.forEach(expense => {
    const row = expenseTableBody.insertRow();
    const nameCell = row.insertCell();
    const amountCell = row.insertCell();
    const categoryCell = row.insertCell();
    const dateCell = row.insertCell();
    const actionCell = row.insertCell();

    nameCell.textContent = expense.name;
    amountCell.textContent = '$' + expense.amount.toFixed(2);
    categoryCell.textContent = expense.category;
    dateCell.textContent = expense.date;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

function updateTotalAmount() {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmountElement.textContent = '$' + totalAmount.toFixed(2);
}

addExpenseButton.addEventListener('click', addExpense);

categoryFilterSelect.addEventListener('change', renderExpenses);

renderExpenses();
updateTotalAmount();