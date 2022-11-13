$(document).ready(function (){
    generateOrderID();
});

function loadAllCustomersForOption() {
    $("#selectCustomerID").empty();
    for (let cus of customers) {
        $("#selectCustomerID").append(`<option>${cus.id}</option>`);
    }

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

    var order = saveOrder(cusId,cusName,itemCode,itemName,qtyOnHand,unitPrice,qty);

    orders.push(order);


    loadAllOrder();
    clearOrderData();
    itemQtyLoad(itemCode, qty);

});

function loadAllOrder() {
    $("#tblOrder").empty();

    for (var order of orders){
        let total = order.qty * order.price;
        $("#total").text(total);
        $("#subtotal").text(total);
        var all = `<tr><td>${order.id}</td><td>${order.code}</td><td>${order.itemName}</td><td>${order.price}</td><td>${order.qty}</td><td>${total}</td>
                       
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
// $("#tblOrder").on("click", ".delete-order", function (){
//     if (confirm("Are you sure want to delete this record!")) {
//         $(this).closest('tr').remove();
//         loadAllOrder();
//     } else {
//         alert("No such item to delete.");
//     }
// });


function clearOrderData() {
    $("#selectCustomerID").val("");
    $("#orderCustomerName").val("");
    $("#selectItemCode").val("");
    $("#itemDescription").val("");
    $("#qtyOnHand").val("");
    $("#unitPrice").val("");
    $("#qty").val("")

}

$("#btnSubmitOrder").click(function (){
    let oId = $("#orderID").val();
    let date = $("#txtOrderDate").val();
    let id = $("#tblOrder>tr").children(":eq(0)").text();
    let code = $("#tblOrder>tr").children(":eq(1)").text();
    let unitPrice = $("#tblOrder>tr").children(":eq(3)").text();
    let qty = $("#tblOrder>tr").children(":eq(4)").text();
    let total = $("#tblOrder>tr").children(":eq(5)").text();

    let orderDetailAll = orderDetail(oId,date,id,code,unitPrice,qty,total);
    orderDetails.push(orderDetailAll);

    clearOrder();

});

function generateOrderID() {
    $("#orderID").val("OID-001");

}

function date(){
    let date = new Date();
    let value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    $("#txtDate").text(value);

}

function clearOrder(){
    orders.splice(0, orders.length);
    $("#tblOrder").empty();

}
$("#update").click(function (){
    let orderId = $("#orderID").val();
    let message = updateOrder(orderId);
    if (message) {
        alert("Order Updated Successfully");
    } else {
        alert("Update Failed..!");

    }
});
function updateOrder(orderId) {
    let orderD = searchOrder(orderId);

    if (orderD!= null) {
        orderD.id = $("#selectCustomerID").val();
        orderD.name = $("#orderCustomerName").val();
        orderD.code = $("#selectItemCode").val();
        orderD.itemName = $("#itemDescription").val();
        orderD.qtyOnHand = $("#qtyOnHand").val();
        orderD.price = $("#unitPrice").val();
        orderD.qty = $("#qty").val();

        loadAllOrder();
        return true;
    } else {
        return false;
    }
}

function searchOrder(orderId){
    for (let o of orders){
        if (o.orderId == orderId){
            return o;
        }
    }
    return null;
}
