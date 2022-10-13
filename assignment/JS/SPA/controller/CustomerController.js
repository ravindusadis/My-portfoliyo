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


    loadAllCustomers()




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
