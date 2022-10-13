$("#txtItemCode").focus();

const itemRegEx = /^(C00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemQtyRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemUnitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


let itemValidations = [];
itemValidations.push({reg: itemRegEx, field: $('#txtItemCode'),error:'Item Code Pattern is Wrong : I00-001'});
itemValidations.push({reg: itemNameRegEx, field: $('#txtItemName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
itemValidations.push({reg: itemQtyRegEx, field: $('#txtItemQty'),error:'Ite Qty Pattern is Wrong : 0-9 ,/'});
itemValidations.push({reg: itemUnitPriceRegEx, field: $('#txtItemUnitPrice'),error:'Item Unit Pattern is Wrong : 0-9 ,/'});