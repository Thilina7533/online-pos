var OrderId = /^(M00-)[0-9]{1,3}$/;

$('#txtOrderID').on('keydown', function (event) {
    var input = (event.key);
    let inputID = $('#txtOrderID').val();
    if (OrderId.test(inputID)) {
        $('#orderId-invalid-error').text('');
        $('#txtOrderID').css('border', '2px solid lime');
        if (input == "Enter") {
            $('#txtDate').focus();
        }
    } else {
        $('#txtOrderID').css('border', '2px solid red');
        $('#orderId-invalid-error').text('Your Input Data format Is Wrong(M00-001)');
        $('#txtOrderID').focus();
    }
});


function loadCustomer() {
    let allCustomers = getAllCustomers();
    $('#selectCusID').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getFname();

        var option = `<option>${id}</option>`;
        $('#selectCusID').append(option);
    }
}



$('#selectCusID').on('click',function () {
    let name=$('#selectCusID').val();
    let customer = searchCustomerByName(name);
    if (customer != null) {
        $("#orderCustomerID").val(customer.getCustomerID());
        $("#orderCustomerName").val(customer.getFname());
        $("#orderCustomerNumber").val(customer.getphone());
        $("#orderCustomerAddress").val(customer.getaddress());
    } else {

    }
});


function searchCustomerByName(name) {
    for (var i in customerDB) {
        if (customerDB[i].getFname() == name) return customerDB[i];
    }
    return null;
}


function loadItem() {
    let allItems = getAllItem();
    $('#selectItemCode').empty();
    for (var i in allItems) {
        let code = allItems[i].getIname();

        var option = `<option>${code}</option>`;
        $('#selectItemCode').append(option);
    }
}


$('#selectItemCode').on('click', function () {
    let code = $('#selectItemCode').val();
    let Item = searchItemByName(code);
    if (Item != null) {
        $("#txtItemCode").val(Item.getIid());
        $("#txtItemDescription").val(Item.getIname());
        $("#txtItemPrice").val(Item.getPrice());
        $("#txtQTYOnHand").val(Item.getQty());
        $("#txtQty").val("1");
    } else {

    }
});

function searchItemByName(code) {
    for (var i in itemDB) {
        if (itemDB[i].getIname() == code) return itemDB[i];
    }
    return null;
}

