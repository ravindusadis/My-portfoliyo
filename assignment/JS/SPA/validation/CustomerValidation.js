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

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact,#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});



$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact,#txtCustomerSalary").on('keyup', function (event) {
    checkValidity();
});

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact,#txtCustomerSalary").on('blur', function (event) {
    checkValidity();
});

function checkValidity() {
    let errorCount=0;
    for (let validation of customerValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

$("#txtCustomerID").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusIDRegEx, $("#txtCustomerID"))) {
        $("#txtCustomerName").focus();
    } else {
        focusText($("#txtCustomerID"));
    }
});


$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusNameRegEx, $("#txtCustomerName"))) {
        focusText($("#txtCustomerAddress"));
    }
});


$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txtCustomerAddress"))) {
        focusText($("#txtCustomerContact"));
    }
});

$("#txtCustomerContact").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusAddressRegEx, $("#txtCustomerContact"))) {
        focusText($("#txtCustomerSalary"));
    }
});

$("#txtCustomerSalary").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusSalaryRegEx, $("#txtCustomerSalary"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            clearAllTexts();
        }
    }
});


function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#saveCustomer").attr('disabled',true);
    }else{
        $("#saveCustomer").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#txtCustomerID").focus();
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact,#txtCustomerSalary").val("");
    checkValidity();
}