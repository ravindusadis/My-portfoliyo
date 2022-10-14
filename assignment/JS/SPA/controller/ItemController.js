$("#saveItem").click(function (){

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let qty = $("#txtItemQty").val();
    let unitPrice = $("#txtItemUnitPrice").val();


    var item = saveItem(itemCode,itemName,qty,unitPrice);
    items.push(item);

    clearItemData();
    loadAllItems();
    bindRowClickEventTable();
    loadAllItemForOption();
});

function loadAllItems() {
    $("#tblItem").empty();

    for (var item of items){
        var all = `<tr><td>${item.code}</td><td>${item.itemName}</td><td>${item.qty}</td><td>${item.unitPrice}</td>
                        <td><button class="btn btn-warning btn-mini" data-bs-target="#editItems"
                       data-bs-toggle="modal" id="btn-editItem"><i class="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        
                        </td>
                    </tr>`;
        $("#tblItem").append(all);
    }
}

function searchItem(code) {
    for (let item of items){
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

        $("#txtItemCode").val(code);

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


function updateItem(itemCode) {
    let item = searchItem(itemCode);

    if (item != null){
        item.code= $("#txtItemCodeEdit").val();
        item.itemName = $("#txtItemNameEdit").val();
        item.qty = $("#txtItemQtyEdit").val();
        item.unitPrice = $("#txtItemUnitPriceEdit").val();
        loadAllItems();
        return true;
    }else {
        return false;
    }
}



$("#delete-item").click(function () {
    let deleteCode = $("#txtItemCode").val();

    let option = confirm("Do you really want to delete " + deleteCode);

    if (option) {
        if (deleteItem(deleteCode)) {
            alert("Item Successfully Deleted..");
            clearData();
        } else {
            alert("No such Item to delete. please check the id");
        }
    }
});

function deleteItem(code) {
    let item = searchItem(code);

    if (item != null) {
        let IndexNumber = items.indexOf(item);
        items.splice(IndexNumber, 1);
        loadAllItems();
        bindRowClickEventTable();
        return true;

    } else {
        return false;
    }
}


function clearItemData() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemQty").val("");
    $("#txtItemUnitPrice").val("");
}