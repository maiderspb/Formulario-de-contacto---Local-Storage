document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const imageURL = document.getElementById("imageURL").value;

    const contact = { name, email, message, imageURL };
    localStorage.setItem("lastContact", JSON.stringify(contact));

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayLastContact();
    displayAllContacts();
  });

function displayLastContact() {
  const contact = JSON.parse(localStorage.getItem("lastContact"));
  const container = document.getElementById("lastContact");
  if (contact) {
    container.innerHTML = `
            <div class='contact-card'>
                <strong>${contact.name}</strong><br>
                ${contact.email}<br>
                ${contact.message}<br>
                ${
                  contact.imageUrl
                    ? `<img src='${contact.imageUrl}' width='100'>`
                    : ""
                }
            </div>`;
  } else {
    container.innerHTML = "No hay contacto guardado.";
  }
}

function displayAllContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const container = document.getElementById("allContacts");

  if (contacts.length > 0) {
    container.innerHTML = contacts
      .map(
        (contact) => `
            <div class='contact-card'>
                <strong>${contact.name}</strong><br>
                ${contact.email}<br>
                ${contact.message}<br>
                ${
                  contact.imageURL
                    ? `<img src='${contact.imageURL}' width='100'>`
                    : ""
                }
            </div>
        `
      )
      .join("");
  } else {
    container.innerHTML = "No hay contactos guardados.";
  }
}

document.getElementById("clearContacts").addEventListener("click", function () {
  localStorage.removeItem("contacts");
  localStorage.removeItem("lastContact");
  displayLastContact();
  displayAllContacts();
});

displayLastContact();
displayAllContacts();
