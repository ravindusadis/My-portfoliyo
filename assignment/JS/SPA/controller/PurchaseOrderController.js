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
$("#addItem").click(function (message){
    let cusId = $("#selectCustomerID").val();
    let cusName = $("#orderCustomerName").val();
    let itemCode = $("#selectItemCode").val();
    let itemName = $("#itemDescription").val();
    let qtyOnHand = $("#qtyOnHand").val();
    let unitPrice = $("#unitPrice").val();
    let qty = $("#qty").val();

    var orderObject = {
        id: cusId,
        name: cusName,
        code: itemCode,
        itemName: itemName,
        qtyOnHand: qtyOnHand,
        price:unitPrice,
        qty:qty
    }
    orders.push(orderObject);
    clearOrderData();
    loadAllOrder();
    itemQtyLoad(itemCode, qty);

});

function loadAllOrder() {
    $("#tblOrder").empty();

    for (var order of orders){
        let total = order.qty * order.price;
        var all = `<tr><td>${order.code}</td><td>${order.itemName}</td><td>${order.price}</td><td>${order.qty}</td><td>${total}</td>
                        <td>
                        <button class="btn btn-danger btn-mini delete"><i class="fa-solid fa-trash"></i> Delete</button>
                        </td>
                    </tr>`;
        $("#tblOrder").append(all);
    }
}

function itemQtyLoad(ItemCode, Qty) {
    for (var item of items){
        if (item.code == ItemCode){
            item.qty = item.qty-Qty;
            return true;
        }else {
            return  false;
        }
    }

}

function clearOrderData() {
    $("#selectCustomerID").val("");
    $("#orderCustomerName").val("");
    $("#selectItemCode").val("");
    $("#itemDescription").val("");
    $("#qtyOnHand").val("");
    $("#unitPrice").val("");
    $("#qty").val("")
}
