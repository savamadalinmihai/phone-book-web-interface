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
            url: PhoneBook.API_BASE_URL,
            method: 'DELETE'
        }).done(function () {
            PhoneBook.getEntries();
        })
    },

    createEntry: function () {
        let first_nameValue = $("#first_name-field").val();
        let last_nameValue = $("#last_name-field").val();
        let phone_numberValue = $("#phone_number-field").val()

        let requestBody = {
            first_name: first_nameValue,
            last_name: last_nameValue,
            phone_number: phone_numberValue
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

    updateEntry: function (id, first_name, last_name, phone_number) {
        let requestBody = {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number
        };

        $.ajax({
            url: PhoneBook.API_BASE_URL,
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
    <td><a href="#" data-id=${contact.id} class="update-entry">
    <i class="far fa-edit"></i>
    </a></td>
    <td><a href="#" data-id=${contact.id} class="delete-entry">
    <i class="fas fa-trash-alt"></i>
    </a></td>
    <tr>`;
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

                //with .data we read values of attributes prefixed with "data-"
                let entryId = $(this).data("id");
                let first_name = $(this).is("first_name");
                let last_name = $(this).is("last_name");
                let phone_number = $(this).is("phone_number")


                PhoneBook.updateEntry(entryId, first_name, last_name, phone_number);
            });

        $("#contacts-table")
            .delegate(".delete-entry", "click", function (event) {
                event.preventDefault();

                let entryId = $(this).data("id");

                PhoneBook.deleteEntry(entryId);
            })
    }

}

PhoneBook.getEntries();
PhoneBook.bindEvents();