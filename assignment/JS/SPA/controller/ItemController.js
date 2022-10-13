$("#saveItem").click(function (){

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let qty = $("#txtItemQty").val();
    let unitPrice = $("#txtItemUnitPrice").val();
    let total = $("#txtItemTotal").val();


    var itemObject = {
        code: itemCode,
        itemName: itemName,
        qty: qty,
        unitPrice: unitPrice,
        total: total
    }

});