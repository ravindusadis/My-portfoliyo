$("#txtCustomerID").focus();

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusContactRegEx = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];
customerValidations.push({reg: cusIDRegEx, field: $('#txtCustomerID'),error:'Customer ID Pattern is Wrong : C00-001'});
customerValidations.push({reg: cusNameRegEx, field: $('#txtCustomerName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidations.push({reg: cusAddressRegEx, field: $('#txtCustomerAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidations.push({reg: cusContactRegEx, field: $('#txtCustomerContact'),error:'Customer Contact Pattern is Wrong : 0-9 ,/'});
customerValidations.push({reg: cusSalaryRegEx, field: $('#txtCustomerSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});

