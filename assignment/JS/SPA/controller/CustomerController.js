// button events
$("#saveCustomer").click(function (){
    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerContact = $("#txtCustomerContact").val();
    let customerSalary = $("#txtCustomerSalary").val();

    var customer = saveCustomer(customerID,customerName,customerAddress,customerContact,customerSalary);

    // push data
    customers.push(customer);

    clearData()
    loadAllCustomers()
    searchCustomer(cusID)





});
// / customer object
var customerObject = {
    id : customerID,
    name : customerName,
    address : customerAddress,
    contact : customerContact,
    salary : customerSalary
}
function loadAllCustomers() {
    $("#tblCustomer").empty();
    for (var customer of customers) {

        var all = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td><td>${customer.salary}</td><td class="odd" style="width: 190px">
                            <button class="btn btn-warning btn-mini" data-bs-target="#editCustomers"
                                    data-bs-toggle="modal"><i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button class="btn btn-danger btn-mini"><i class="fa-solid fa-trash"></i> Delete</button>
                        </td></tr>`;

        $("#tblCustomer").append(all);

    }
}
function clearData() {

    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerContact").val("");
    $("#txtCustomerSalary").val("");
}
function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
}

$(document).on("click", "#btn-edit", function () {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();
        let salary = $(this).children(":eq(4)").text();

    $("#txtCustomerIDEdit").val(id);
    $("#txtCustomerNameEdit").val(name);
    $("#txtCustomerAddressEdit").val(address);
    $("#txtCustomerContactEdit").val(contact);
    $("#txtCustomerSalaryEdit").val(salary);

});
});

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerID").val();
        customer.name = $("#txtCustomerName").val();
        customer.address = $("#txtCustomerAddress").val();
        customer.salary = $("#txtCustomerSalary").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }


}
