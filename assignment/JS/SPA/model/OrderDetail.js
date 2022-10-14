function orderDetail(orderId,date,cusId,itemCode,unitPrice,qty,total){
    return{
        orderId:orderId,
        date:date,
        id: cusId,
        code: itemCode,
        unitPrice: unitPrice,
        qty:qty,
        total:total
    };
}