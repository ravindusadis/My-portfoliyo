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
});

function loadAllItems() {
    $("#tblItem").empty();

    for (var item of items){
        var all = `<tr><td>${item.code}</td><td>${item.itemName}</td><td>${item.qty}</td><td>${item.unitPrice}</td>
                        <td><button class="btn btn-warning btn-mini" data-bs-target="#editItems"
                        data-bs-toggle="modal" id="btn-edit"><i class="fa-solid fa-pen-to-square"></i> Edit
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