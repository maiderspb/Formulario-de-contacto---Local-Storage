document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const imageUrl = document.getElementById('imageUrl').value;
    
    const contact = { name, email, message, imageUrl };
    
    localStorage.setItem('lastContact', JSON.stringify(contact));
    
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    displayLastContact();
    displayAllContacts();
});

function displayLastContact() {
    const contact = JSON.parse(localStorage.getItem('lastContact'));
    const container = document.getElementById('lastContact');
    container.innerHTML = contact ? `<div class='contact-card'><strong>${contact.name}</strong><br>${contact.email}<br>${contact.message}<br><img src='${contact.imageUrl}' width='100'></div>` : "No hay contacto guardado.";
}

function displayAllContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const container = document.getElementById('allContacts');
    container.innerHTML = contacts.map(contact => `<div class='contact-card'><strong>${contact.name}</strong><br>${contact.email}<br>${contact.message}<br><img src='${contact.imageUrl}' width='100'></div>`).join('');
}

document.getElementById('clearContacts').addEventListener('click', function() {
    localStorage.removeItem('contacts');
    localStorage.removeItem('lastContact');
    displayLastContact();
    displayAllContacts();
});

displayLastContact();
displayAllContacts();