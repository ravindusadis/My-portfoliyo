$("#txtItemCode").focus();

const itemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemQtyRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemUnitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


    let itemValidations = [];
    itemValidations.push({reg: itemCodeRegEx, field: $('#txtItemCode'),error:'Item Code Pattern is Wrong : I00-001'});
    itemValidations.push({reg: itemNameRegEx, field: $('#txtItemName'),error:'Item Name Pattern is Wrong : A-z 5-20'});
    itemValidations.push({reg: itemQtyRegEx, field: $('#txtItemQty'),error:'Ite Qty Pattern is Wrong : 0-9 ,/'});
    itemValidations.push({reg: itemUnitPriceRegEx, field: $('#txtItemUnitPrice'),error:'Item Unit Pattern is Wrong : 0-9 ,/'});

    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemUnitPrice").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemUnitPrice").on('keyup', function (event) {
    checkValidityItem();
});

    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemUnitPrice").on('blur', function (event) {
    checkValidityItem();


});
    function checkValidityItem() {
    let errorCount=0;
    for (let validation of itemValidations) {
        if (check(validation.reg,validation.field)) {
            textSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setTextError(validation.field,validation.error);
        }
    }
        setItemButtonState(errorCount);
}

    $("#txtItemCode").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemCodeRegEx, $("#txtItemCode"))) {
        $("#txtItemName").focus();
    } else {
        focusText($("#txtItemCode"));
    }
    });

    $("#txtItemName").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemNameRegEx, $("#txtItemName"))) {
        focusText($("#txtItemQty"));
    }
    });

    $("#txtItemQty").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemQtyRegEx, $("#txtItemQty"))) {
        focusText($("#txtItemUnitPrice"));
    }
    });

$("#txtItemUnitPrice").on('keydown', function (event) {
    if (event.key == "Enter" && check(itemUnitPriceRegEx, $("#txtItemUnitPrice"))) {
        let res = confirm("Do you want to add this item.?");
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
            defaultText(txtField, "");
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

function setItemButtonState(value){
    if (value>0){
        $("#saveItem").attr('disabled',true);
    }else{
        $("#saveItem").attr('disabled',false);
    }
}

    function clearAllTexts() {
    $("#txtItemCode").focus();
    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemUnitPrice").val("");
    checkValidity();
    }