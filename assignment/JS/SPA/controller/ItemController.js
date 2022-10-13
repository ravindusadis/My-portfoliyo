$("#saveItem").click(function (){

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let qty = $("#txtItemQty").val();
    let unitPrice = $("#txtItemUnitPrice").val();


    var itemObject = {
        code: itemCode,
        itemName: itemName,
        qty: qty,
        unitPrice: unitPrice,

    }

    items.push(itemObject);

    loadAllItems();
    bindRowClickEventTable();
});

function loadAllItems() {
    $("#tblItem").empty();

    for (var item of items){
        var all = `<tr><td>${item.code}</td><td>${item.itemName}</td><td>${item.qty}</td><td>${item.unitPrice}</td>
                        <td><button class="btn btn-warning btn-mini" data-bs-target="#editItems"
                       data-bs-toggle="modal" id="btn-editItem"><i class="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-mini delete"><i class="fa-solid fa-trash"></i> Delete</button>
                        </td>
                    </tr>`;
        $("#tblItem").append(all);
    }
}

function searchItem(code) {
    for (var item of items) {
        if (item.code == code) {
            return item;
        }
    }
}
$(document).on("click", "#btn-editItem", function (){
    bindRowClickEventTable()
});
function bindRowClickEventTable() {
    $("#tblItem>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();

        $("#txtItemCodeEdit").val(code);
        $("#txtItemNameEdit").val(itemName);
        $("#txtItemQtyEdit").val(qty);
        $("#txtItemUnitPriceEdit").val(unitPrice);

    });
}

$("#updateItem").click(function (){
    let itemCode =  $("#txtItemCodeEdit").val(code);
    let message = updateItem(itemCode);
    if (message){
        alert("Item Update Successfully");
    }else {
        alert("Update Failed..!");
    }
});