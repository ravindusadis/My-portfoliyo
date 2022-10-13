function saveOrder(cusId,cusName,itemCode,itemName,qtyOnHand,unitPrice,qty){
    return{
        id: cusId,
        name: cusName,
        code: itemCode,
        itemName: itemName,
        qtyOnHand: qtyOnHand,
        price:unitPrice,
        qty:qty
    };
}