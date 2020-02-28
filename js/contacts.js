window.PhoneBook = {

    API_BASE_URL: "http://localhost:8081/contacts",

    getEntries: function () {
        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            PhoneBook.displayEntries(JSON.parse(response));
        })
    },

    getContactByName: function (first_name) {
        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "GET",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function (response) {
            console.log(response);

            PhoneBook.displayEntries(JSON.parse(response));
        })
    },

    deleteEntry: function (id) {
        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: 'DELETE'
        }).done(function () {
            PhoneBook.getEntries();
        })
    },

    createEntry: function () {
        let first_nameValue = $("#first_name-field").val();
        let last_nameValue = $("#last_name-field").val();
        let phone_numberValue = $("#phone_number-field").val();
        let emailValue = $("#email-field").val();

        let requestBody = {
            first_name: first_nameValue,
            last_name: last_nameValue,
            phone_number: phone_numberValue,
            email: emailValue
        };

        $.ajax({
            url: PhoneBook.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getEntries();
        })
    },

    updateEntry: function (id, first_name, last_name, phone_number, email) {

        let idValue = $(this).data("id");
        let first_nameValue = $("#first_name-update-field").val();
        let last_nameValue = $("#last_name-update-field").val();
        let phone_numberValue = $("#phone_number-update-field").val();
        let emailValue = $("#email-update-field").val();

        let requestBody = {
            id: idValue,
            first_name: first_nameValue,
            last_name: last_nameValue,
            phone_number: phone_numberValue,
            email: emailValue
        };

        $.ajax({
            url: PhoneBook.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getEntries();
        })
    },

    getEntriesRow: function (contact) {

        return `<tr>
            <td>${contact.first_name}</td>
            <td>${contact.last_name}</td>
            <td>${contact.phone_number}</td>
            <td>${contact.email}</td>
            <td><a href="#" data-id=${contact.id} class="update-entry">
            <i class="far fa-edit"></i>
            </a></td>
            <td><a href="#" data-id=${contact.id} class="delete-entry">
            <i class="fas fa-trash-alt"></i>
            </a></td>
    </tr>`;
    },

    displayEntries: function (contacts) {
        let tableBody = '';

        contacts.forEach(contact => tableBody += PhoneBook.getEntriesRow(contact))

        $("#contacts-table tbody").html(tableBody);
    },

    bindEvents: function () {
        //this function connects the functions we created (create/update/etc) to the events (click/submit/etc)
        $("#new-entry-form").submit(function (event) {
            event.preventDefault();

            PhoneBook.createEntry();
        });

        $("#contacts-table")
            .delegate(".update-entry", "click", function (event) {
                event.preventDefault();

                let id = $(this).data("id");
                let first_name = $("#first_name-update-field").val();
                let last_name = $("#last_name-update-field").val();
                let phone_number = $("#phone_number-update-field").val();
                let email = $("#email-field").val();


                PhoneBook.updateEntry(id, first_name, last_name, phone_number, email);
            });

        $("#contacts-table")
            .delegate(".delete-entry", "click", function (event) {
                event.preventDefault();

                let entryId = $(this).data("id");

                PhoneBook.deleteEntry(entryId);
            });

        $("#contacts-table").submit(function (event) {
            event.preventDefault();

            let first_name=$(this).data("first_name");

            PhoneBook.getContactByName(first_name)
        })
    }

};

PhoneBook.getEntries();
PhoneBook.bindEvents();