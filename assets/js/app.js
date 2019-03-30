class Data {
    constructor(name, tel, email, message) {
        this.name = name;
        this.tel = tel;
        this.email = email;
        this.message = message;
    }
}

class UI {
    static displayData1() {
        const data1 = Store.getData1();

        data1.forEach((data) => UI.addDataToList(data));
    }

    static addDataToList(data) {
        const list = document.querySelector('#contact-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${data.name}</td>
          <td>${data.tel}</td>
          <td>${data.email}</td>
          <td>${data.message}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
        `;

        list.appendChild(row);
    }

    static deleteData(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const con = document.querySelector('.con');
        const form = document.querySelector('#my-form');
        con.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3500);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#tel').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#message').value = '';
    }
}

class Store {
    static getData1() {
        let data1;
        if (localStorage.getItem('data1') === null) {
            data1 = [];
        } else {
            data1 = JSON.parse(localStorage.getItem('data1'));
        }

        return data1;
    }

    static addData(data) {
        const data2 = Store.getData1();
        data2.push(data);
        localStorage.setItem('data2', JSON.stringify(data2));
    }

    static removeData(isbn) {
        const data2 = Store.getData1();

        data2.forEach((data, index) => {
            if (data.isbn === isbn) {
                data2.splice(index, 1);
            }
        });

        localStorage.setItem('data2', JSON.stringify(data2));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayData1);
  
  document.querySelector('#my-form').addEventListener('submit', (e) => {
   e.preventDefault();
  
    const name = document.querySelector('#name').value;
    const tel = document.querySelector('#tel').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
  
    // 12. Validate
    if(name === '' || tel === '' || email === '' || message === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      const data = new Data(name, tel, email,message);
     
      UI.addDataToList(data);
  
      Store.addData(data);
  
      UI.showAlert('Contact Added', 'success');
  
      UI.clearFields();
    }
  });
  
  document.querySelector('#contact-list').addEventListener('click', (e) => {
    
    UI.deleteData(e.target);
    Store.removeData(e.target.parentElement.previousElementSibling.textContent);
  
    UI.showAlert('Contact Removed', 'success');
  });