document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-expense');
    const editForm = document.getElementById('edit-expense');
    const filterForm1 = document.getElementById('filter-expenses_1');
    const filterForm2 = document.getElementById('filter-expenses_2');
    const expensesTable = document.getElementById('expensetable').querySelector('tbody');
  
    const fetchExpenses = async (url = '/api/expenses') => {
      const response = await fetch(url);
      const expenses = await response.json();
      expensesTable.innerHTML = '';
      expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${expense.id}</td>
          <td>${expense.name}</td>
          <td>${expense.category}</td>
          <td>${expense.amount}</td>
          <td>${new Date(expense.date).toLocaleDateString()}</td>
          <td>
          <button class="edit-button" data-id="${expense.id}" data-name="${expense.name}" data-category="${expense.category}" data-amount="${expense.amount}" data-date="${expense.date}">Edit</button>
      <button class="delete-button" data-id="${expense.id}">Delete</button>
          </td>
        `;
        expensesTable.appendChild(row);
      });
    };
  
    const startEdit = (id, name, category, amount, date) => {
      document.getElementById('edit-id').value = id;
      document.getElementById('edit-name').value = name;
      document.getElementById('edit-category').value = category;
      document.getElementById('edit-amount').value = amount;
      document.getElementById('edit-date').value = new Date(date).toISOString().split('T')[0];
      document.getElementById('edit').style.display = 'block';
    };
    
    const deleteExpense = async (id) => {
      await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
      });
      fetchExpenses();
    };
  
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const category = document.getElementById('category').value;
      const amount = document.getElementById('amount').value;
      const date = document.getElementById('date').value;
  
      await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, category, amount, date })
      });
  
      addForm.reset();
      fetchExpenses();
    });
  
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-id').value;
      const name = document.getElementById('edit-name').value;
      const category = document.getElementById('edit-category').value;
      const amount = document.getElementById('edit-amount').value;
      const date = document.getElementById('edit-date').value;
  
      await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, category, amount, date })
      });
  
      editForm.reset();
      document.getElementById('edit').style.display = 'none';
      fetchExpenses();
    });
    expensesTable.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-button')) {
          const id = target.getAttribute('data-id');
          const name = target.getAttribute('data-name');
          const category = target.getAttribute('data-category');
          const amount = target.getAttribute('data-amount');
          const date = target.getAttribute('data-date');
          startEdit(id, name, category, amount, date);
        } else if (target.classList.contains('delete-button')) {
          const id = target.getAttribute('data-id');
          deleteExpense(id);
        }
      });
  
    filterForm1.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('filter-category').value;
         url = `/api/expenses/category?category=${category}`;
        fetchExpenses(url);
        filterForm1.reset();
  });
  filterForm2.addEventListener('submit', (e) => {
    e.preventDefault();
    const monthyear = document.getElementById('filter-month-year').value;
    const [year,month]=monthyear.split('-');
    url = `/api/expenses/month-year?month=${month}&year=${year}`;
    fetchExpenses(url);
    filterForm2.reset();
});
fetchExpenses();
})
