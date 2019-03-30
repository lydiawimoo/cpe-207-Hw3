class Data {
    constructor(name, tel, email, message) {
        this.name = name;
        this.tel = tel;
        this.email = email;
        this.message = message;
    }
}

class UI {
    static displayContact() {
        const data1 = Store.getData1()
        data1.forEach((data) => UI.addContactToList(data));
    }

    static addContactToList(data) {
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
        const container = document.querySelector('.container');
        const form = document.querySelector('#contact-list');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
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
        const data1 = Store.getData1();
        data1.push(data);
        localStorage.setItem('data1', JSON.stringify(data1));
    }

    static removeData(message) {
        const data1 = Store.getData1();

        data1.forEach((data, index) => {
            if (data.message === message) {
                data1.splice(index, 1);
            }
        });

        localStorage.setItem('data1', JSON.stringify(data1));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayContact);

document.querySelector('#contact-list').addEventListener('submit', (e) => {
   
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const tel = document.querySelector('#tel').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    
    if (name === '' || tel === '' || email === '' || message === '') {
        UI.showAlert('Please fill in all fields', 'danger');
        // console.log("1");
    } else {
        
        const data = new Data(name,tel,email,message);
        //  console.log(data);

        UI.addContactToList(data);

        Store.addData(data);

        UI.showAlert('Contact data Added', 'success');

        UI.clearFields();
    }
});

document.querySelector('#contact-list').addEventListener('click', (e) => {
    //  console.log(e.target);

    UI.deleteData(e.target);

    Store.removeData(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Contact data Removed', 'success');
});