var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + MM + '-' + dd;

$('#txtDate').val(today);

generatePlaceOrderID();

/////////////////////////////////////////////////////////////////
function generatePlaceOrderID() {
    try {
        let lastOrderId = PlaceOrder[PlaceOrder.length - 1].getPlaceOrderID();
        let newID = parseInt(lastOrderId.substring(5, 7)) + 1;
        if (newID < 10) {
            $('#txtOrderID').val('M00-00' + newID);
        } else if (newID < 100) {
            $('#txtOrderID').val('M00-0' + newID);
        } else {
            $('#txtOrderID').val('M00-' + newID);
        }
    } catch (e) {
        $('#txtOrderID').val('M00-001');
    }

}

/////////////////////////////////////////////////////////////////

$("#btnAddToTable").click(function () {

    let code = $('#txtItemCode').val();
    let check = isExist(code);
    if (!check) {
        let oId = $('#txtOrderID').val();
        let code = $('#txtItemCode').val();
        let name = $('#txtItemDescription').val();
        let qty = $('#txtQty').val();
        let price = $('#txtItemPrice').val();

        let tot = parseFloat(qty) * parseFloat(price);

        var row = `<tr><td class="code">${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${tot}</td>
        <td>
        <button type='button' onclick='productDelete(this);' class='btn btn-default'>
        <img src="D:\\HTML\\Ijse-Pos\\Thila-pos\\assets\\image\\multiply_26px.png">
        </button>
        </td>
        </tr>`;
        $('#orderTable').append(row);

        let tot1 = 0;
        let table = document.getElementById('tblOrders');
        let count = table.rows.length;
        for (let i = 1; i < count; i++) {
            tot1 += parseFloat(table.rows[i].cells[4].innerText);
        }
        var text = document.getElementById('total');
        text.innerText = tot1;

        var subtext = document.getElementById('subtotal');
        let discount = $('#txtDiscount');
        if (tot1 > 2000 && tot1 < 5000) {
            discount.val('10%');
            let disvalue = (tot1 - (tot1 / 100) * 10);
            subtext.innerText = disvalue;
        } else if (tot1 > 5000) {
            discount.val('20%');
            let disvalue = (tot1 - (tot1 / 100) * 20);
            subtext.innerText = disvalue;
        } else {
            discount.val('NO Discount');
            let disvalue = (tot1);
            subtext.innerText = disvalue;
        }


    } else {
        alert("Item is already in Order!");
    }

});

$('#total').on('click', function (event) {

});

const isExist = function (code) {

    let table = document.getElementById('tblOrders');
    let count = table.rows.length;
    for (let i = 0; i < count; i++) {
        if (table.rows[i].cells[0].innerText === code) {
            return true;
        }
    }
    return false;
}

function productDelete(ctl) {
    $(ctl).parents("tr").remove();
    Orders.pop();
}

function saveOrders(oId, code, name, price, qty, tot) {
    let order = new OrderDTO(oId, code, name, price, qty, tot);
    Orders.push(order);

    return true;
}

$('#txtQty').on('keydown', function (event) {
    cheakQty();
});

function cheakQty() {
    let qty = $('#txtQty').val();
    let count = $('#txtQTYOnHand').val();
    let name = $('#txtItemDescription').val();
    if (count < qty) {
        $('#txtQty').val('0');
        $('#order-qty-empty-error').text('You can only get maximum of ' + count + ' ' + name);
        $('#txtQty').css('border', '2px solid red');
    } else {
        $('#order-qty-empty-error').text('');
        $('#txtQty').css('border', '2px solid lime');

    }
}

$('#txtCash').on('keydown', function (event) {
    var input = (event.key);
    let tot = document.getElementById('subtotal').innerText;
    let cash = $('#txtCash').val();
    let ftot = parseFloat(tot);
    let fcash = parseFloat(cash);
    if (input == "Enter") {
        if (ftot > fcash) {
            alert("Please Enter Correct Amount")
        } else {
            let result = parseFloat(cash) - parseFloat(tot);
            $('#txtBalance').val(result);
        }
    }
});

$('#btnSubmitOrder').on('click', function () {
    var a = $("#orderCustomerID").val();
    var b = $('#txtBalance').val();
    let oId = $('#txtOrderID').val();
    a.length;
    b.length;
    if (a.length > 0) {
        if (b.length > 0) {
            let table = document.getElementById('tblOrders');
            let count = table.rows.length;
            for (let i = 1; i < count; i++) {
                var code = table.rows[i].cells[0].innerText;
                var name = table.rows[i].cells[1].innerText;
                var price = table.rows[i].cells[2].innerText;
                var qty = table.rows[i].cells[3].innerText;

                let total = parseFloat(qty) * parseFloat(price);


                console.log(code + name + price + qty);


                let item = searchItem(code);
                if (item != null) {
                    var oldQTY = item.getItemQty();
                    let tot = parseInt(oldQTY) - parseInt(qty);
                    console.log(tot);

                    updateItem(code, name, tot, qty);
                    saveOrders(oId, code, name, price, qty, total);
                } else {

                }
            }
            let orderID = $('#txtOrderID').val();
            let custID = $('#orderCustomerID').val();
            var subtext = document.getElementById('subtotal').innerText;
            let date = $('#txtDate').val();
            PlaceOrdersData(orderID, custID, subtext, date);
            alert('Order Place Successful');
            generatePlaceOrderID();
            POclearFroam();
            $('#orderTable').empty();
            AAA();
        } else {
            alert('Can,t Add empty Fields');
        }
    } else {
        alert('Can,t Add empty Customer Fields');
    }

});

function PlaceOrdersData(orderID, custID, subtext, date) {
    let placeOrder = new PlaceOrderDTO(orderID, custID, subtext, date);
    PlaceOrder.push(placeOrder);

    return true;
}

function POclearFroam() {
    $("#orderCustomerID").val("");
    $("#orderCustomerName").val("");
    $("#orderCustomerNumber").val("");
    $("#orderCustomerAddress").val("");

    $("#txtItemCode").val("");
    $("#txtItemDescription").val("");
    $("#txtItemPrice").val("");
    $("#txtQTYOnHand").val("");
    $("#txtQty").val("");

    let tot = '00.0';
    var text = document.getElementById('total');
    text.innerText = tot;
    var text = document.getElementById('subtotal');
    text.innerText = tot;

    $('#txtCash').val("");
    $('#txtDiscount').val("");
    $('#txtBalance').val("");

}

function AAA() {
    var input = PlaceOrder.length;
    var text = document.getElementById('orderCount');
    text.innerText = input;
}


