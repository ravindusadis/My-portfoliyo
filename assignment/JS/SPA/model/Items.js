function saveItem(itemCode,itemDescription,itemQty,unitPrice){
    return{
        code:itemCode,
        name:itemDescription,
        qty:itemQty,
        unitPrice:unitPrice
    };
}