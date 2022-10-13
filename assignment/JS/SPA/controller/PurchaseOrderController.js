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
function loadAllItemForOption() {
    $("#selectItemCode").empty();
    for (let item of items) {
        $("#selectItemCode").append(`<option>${item.code}</option>`);
    }

}

$("#selectItemCode").click(function (){
    let code = $("#selectItemCode").val();
    let search = searchItem(code);
    $("#itemDescription").val(search.itemName);
    $("#qtyOnHand").val(search.qty);
    $("#unitPrice").val(search.unitPrice);
});
$("#addItem").click(function (){
    let cusId = $("#selectCustomerID").val();
    let cusName = $("#orderCustomerName").val();
    let itemCode = $("#selectItemCode").val();
    let itemName = $("#itemDescription").val();
    let qtyOnHand = $("#qtyOnHand").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#qty").val();


});

