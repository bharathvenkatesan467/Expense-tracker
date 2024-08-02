document.getElementById('addExpense').addEventListener('click', addExpense);
        document.getElementById('filter').addEventListener('change', filterExpenses);

        let expenses = [];
        let editId = null;

        function addExpense() {
            const expenseName = document.getElementById('expenseName').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;
            const date = document.getElementById('date').value;

            if (!expenseName || isNaN(amount) || !category || !date) {
                alert('Please fill out all fields correctly.');
                return;
            }

            if (editId !== null) {
                const expense = expenses.find(exp => exp.id === editId);
                expense.name = expenseName;
                expense.amount = amount;
                expense.category = category;
                expense.date = date;
                editId = null;
            } else {
                const expense = {
                    name: expenseName,
                    amount: amount,
                    category: category,
                    date: date,
                    id: Date.now()
                };
                expenses.push(expense);
            }

            renderExpenses();
            calculateTotal();
            clearInputs();
        }

        function renderExpenses(filteredExpenses = expenses) {
            const tbody = document.getElementById('expense-table-body');
            tbody.innerHTML = '';

            filteredExpenses.forEach(expense => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${expense.name}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td>${expense.category}</td>
                    <td>${expense.date}</td>
                    <td>
                        <button class="btn" onclick="editExpense(${expense.id})">Edit</button>
                        <button class="btn" onclick="deleteExpense(${expense.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function calculateTotal() {
            const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
        }

        function deleteExpense(id) {
            expenses = expenses.filter(expense => expense.id !== id);
            renderExpenses();
            calculateTotal();
        }

        function editExpense(id) {
            const expense = expenses.find(exp => exp.id === id);
            document.getElementById('expenseName').value = expense.name;
            document.getElementById('amount').value = expense.amount;
            document.getElementById('category').value = expense.category;
            document.getElementById('date').value = expense.date;
            editId = id;
        }

        function clearInputs() {
            document.getElementById('expenseName').value = '';
            document.getElementById('amount').value = '';
            document.getElementById('category').value = '';
            document.getElementById('date').value = '';
        }

        function filterExpenses() {
            const filter = document.getElementById('filter').value;
            const filteredExpenses = filter === 'All' ? expenses : expenses.filter(expense => expense.category === filter);
            renderExpenses(filteredExpenses);
        }
