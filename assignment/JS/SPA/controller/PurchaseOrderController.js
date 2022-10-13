function loadAllCustomersForOption() {

}   $("#selectCustomerID").empty();
for (let cus of customers) {
    $("#selectCustomerID").append(`<option>${cus.id}</option>`);
}
$("#selectCustomerID").click(function (){
    let id = $("#selectCustomerID").val();
    let search = searchCustomer(id);
    $("#orderCustomerName").val(search.name);
});