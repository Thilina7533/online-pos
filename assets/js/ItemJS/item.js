
// item event


generateNewIds();
$('#btnAddItem').click(function () {
    $('#dataTable2>tr').off('click');

    let Iid = $("#ItemID").val();
    let Iname = $("#ItemName").val();
    let Qty = $("#Qty").val();
    let Price = $("#Price").val();

    let res = saveItem(Iid, Iname, Qty, Price);
    if (res) clearAllItemText();
    generateNewIds();



    $('#dataTable2>tr').click(function () {
        let Iid = $(this).children('td:eq(0)').text();
        let Iname = $(this).children('td:eq(1)').text();
        let Qty = $(this).children('td:eq(2)').text();
        let Price = $(this).children('td:eq(3)').text();


        $("#ItemID").val(Iid);
        $("#ItemName").val(Iname);
        $("#Qty").val(Qty);
        $("#Price").val(Price);

    });


});
// delete
// ------------------------------------------------------------
$("#btnDeleteItem").click(function () {
    let Iid = $("#ItemID").val();
    let option = confirm(`Do you want to delete ID:${Iid}`);
    if (option) {
        let res = deleteItem(Iid);
        if (res) {
            alert("Item Deleted");
        } else {
            alert("Delete Failed")
        }

    }
    loadAllItemToTheTable();
    clearAllItemText();

    $('#dataTable2>tr').click(function () {
        let Iid = $(this).children('td:eq(0)').text();
        let Iname = $(this).children('td:eq(1)').text();
        let Qty = $(this).children('td:eq(2)').text();
        let Price = $(this).children('td:eq(3)').text();


        $("#ItemID").val(Iid);
        $("#ItemName").val(Iname);
        $("#Qty").val(Qty);
        $("#Price").val(Price);

    });


});


// update

$("#btnUpdateItem").click(function () {
    let Iid = $("#ItemID").val();
    let Iname = $("#ItemName").val();
    let Qty = $("#Qty").val();
    let Price = $("#Price").val();

    let option = confirm(`Do you want to Update item ID:${Iid}`);
    if (option) {
        let res = updateItem(Iid, Iname, Qty, Price);
        if (res) {
            alert("Item Updated");
        } else {
            alert("Update Faild");
        }
    }
    loadAllItemToTheTable();
    clearAllItemText();

    $('#dataTable2>tr').click(function () {
        let Iid = $(this).children('td:eq(0)').text();
        let Iname = $(this).children('td:eq(1)').text();
        let Qty = $(this).children('td:eq(2)').text();
        let Price = $(this).children('td:eq(3)').text();


        $("#ItemID").val(Iid);
        $("#ItemName").val(Iname);
        $("#Qty").val(Qty);
        $("#Price").val(Price);

    });

});

// search
$("#ItemID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#ItemID").val(item.getIid());
            $("#ItemName").val(item.getIname());
            $("#Qty").val(item.getQty());
            $("#Price").val(item.getPrice());

        } else {
            clearAllItemText();
        }
    }
});

function saveItem(Iid, Iname, Qty, Price) {
    let item = new Item(Iid, Iname, Qty, Price);
    itemDB.push(item);// iyem aded

    // load the table
    loadAllItemToTheTable();
    return true;
}


function getAllItem() {
    return itemDB;
}

function deleteItem(Iid) {
    let item = searchItem(Iid);
    if (item != null) {
        let indexNumber = itemDB.indexOf(item);
        itemDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// search item
function searchItem(Iid) {
    for (var i in itemDB) {
        if (itemDB[i].getIid() == Iid) return itemDB[i];
    }
    return null;
}


function updateItem(Iid, Iname, Qty, Price) {
    let item = searchItem(Iid);
    if (item != null) {
        item.setIname(Iname)
        item.setQty(Qty)
        item.setPrice(Price);



        return true;
    } else {
        return false;
    }
}


function loadAllItemToTheTable() {
    let allItem = getAllItem();
    $('#dataTable2').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItem) {
        let Iid = allItem[i].getIid();
        let Iname = allItem[i].getIname();
        let Qty = allItem[i].getQty();
        let Price = allItem[i].getPrice();

        var row = `<tr><td>${Iid}</td><td>${Iname}</td><td>${Qty}</td><td>${Price}</td></tr>`;
        $('#dataTable2').append(row);
        generateNewIds()
    }
}

function clearAllItemText() {
    $("#ItemID").val("");
    $("#ItemName").val("");
    $("#Qty").val("");
    $("#Price").val("");

}

// genarate


    function generateNewIds() {
        try {
            let lastOrderId = itemDB[itemDB.length-1].getIid();
            let newID = parseInt(lastOrderId.substring(5, 7)) + 1;
            if (newID < 10) {
                $("#ItemID").val('I00-00'+newID);
            }else if (newID < 100) {
                $("#ItemID").val('I00-0'+newID);
            } else {
                $("#ItemID").val('I00-'+newID);
            }
        } catch (e) {
            $("#ItemID").val('I00-001');
        }

    }

function III() {
    var input=itemDB.length;
    var text=document.getElementById('itemCount');
    text.innerText=input;
}