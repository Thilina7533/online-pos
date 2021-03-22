$(function () {
    loadAllCustomerToTheTable() ;
    $("#CustomerID").val(generateNewId());

    $("#dataTable3").on('click','tbody tr td i',(function () {
        //$(this).parents("tr").remove();
        $(this).parent().parent().remove();
    }));
});
generateCustomerId()


// item event
$('#btnAddCustomer').click(function () {
    $('#dataTable3>tr').off('click');

    let custID = $("#CustomerID").val();
    let custNameF = $("#First").val();
    let custNameL = $("#last").val();
    let address = $("#Address").val();
    let phone = $("#phone").val();

    let res = saveCustomer(custID, custNameF, custNameL, address, phone);
    if (res) clearAllCustomerText();
    generateCustomerId();

    // var customer = new Customer(custID, custNameF, custNameL, address, phone);
    // customerDB.push(customer);

    // tableadd

    //
    // let row = " <tr><td>" + custID + "</td> <td>" + custNameF + "</td><td>" + custNameL + "</td><td>" + address + "</td><td>" + phone + "</td> <TD>\n" +
    //     "          <INPUT type=\"button\" name=\"button\" value=delete id=delete onclick=\"deleteRow('dataTable')\">\n" +
    //     "        </TD></tr>";
    // $('#dataTable3').append(row);

    $('#dataTable3>tr').click(function () {
        let id = $(this).children('td:eq(0)').text();
        let fname = $(this).children('td:eq(1)').text();
        let lname = $(this).children('td:eq(2)').text();
        let address = $(this).children('td:eq(3)').text();
        let phoneno = $(this).children('td:eq(4)').text();

        $("#CustomerID").val(id);
        $("#First").val(fname);
        $("#last").val(lname);
        $("#Address").val(address);
        $("#phone").val(phoneno)
    });

});
// delete
    // ------------------------------------------------------------
    $("#btndeletecustomer").click(function () {
        let custID = $("#CustomerID").val();
        let option=confirm(`Do you want to delete ID:${custID}`);
        if (option){
            let res=deleteCustomer(custID);
            if (res){
                alert("Customer Deleted");
            } else{
                alert("Delete Failed")
            }

        }
        loadAllCustomerToTheTable();
        clearAllCustomerText();

        $('#dataTable3>tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let fname = $(this).children('td:eq(1)').text();
            let lname = $(this).children('td:eq(2)').text();
            let address = $(this).children('td:eq(3)').text();
            let phoneno = $(this).children('td:eq(4)').text();

            $("#CustomerID").val(id);
            $("#First").val(fname);
            $("#last").val(lname);
            $("#Address").val(address);
            $("#phone").val(phoneno)
        });

    });


    // update

    $("#btnupdatecustomer").click(function () {
        let custID = $("#CustomerID").val();
        let custNameF = $("#First").val();
        let custNameL = $("#last").val();
        let address = $("#Address").val();
        let phone = $("#phone").val();

        let option=confirm(`Do you want to Update Customer ID:${custID}`);
        if (option){
            let res= updateCustomer(custID, custNameF, custNameL, address,phone);
            if (res){
                alert("Customer Updated");
            }else{
                alert("Update Faild");
            }
        }
        generateCustomerId();
        loadAllCustomerToTheTable();
        clearAllCustomerText();

        $('#dataTable3>tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let fname = $(this).children('td:eq(1)').text();
            let lname = $(this).children('td:eq(2)').text();
            let address = $(this).children('td:eq(3)').text();
            let phoneno = $(this).children('td:eq(4)').text();

            $("#CustomerID").val(id);
            $("#First").val(fname);
            $("#last").val(lname);
            $("#Address").val(address);
            $("#phone").val(phoneno)
        });

    });

        // search
$("#CustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#CustomerID").val(customer.getCustomerID());
            $("#First").val(customer.getFname());
            $("#last").val(customer.getLname());
            $("#Address").val(customer.getaddress());
            $("#phone").val(customer.getphone());
        } else {
            clearAllCustomerText();
        }
    }
});

    function saveCustomer(custID, custNameF, custNameL, address, phone) {
        let customer = new Customer(custID, custNameF, custNameL, address, phone);
        customerDB.push(customer);// customer aded

        // load the table
        loadAllCustomerToTheTable();
        return true;
    }


    function getAllCustomers() {
        return customerDB;
    }

function deleteCustomer(custID) {
    let customer = searchCustomer(custID);
    if (customer != null) {
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchCustomer(cusID) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerID() == cusID) return customerDB[i];
    }
    return null;
}


function updateCustomer(custID, custNameF, custNameL, address, phone) {
    let customer = searchCustomer(custID);
    if (customer != null) {
        customer.setFname(custNameF)
        customer.setLname(custNameL)
        customer.setaddress(address);
        customer.setphone(phone)


        return true;
    } else {
        return false;
    }
}


    function loadAllCustomerToTheTable() {
        let allCustomers = getAllCustomers();
        $('#dataTable3').empty(); // clear all the table before adding for avoid duplicate
        for (var i in allCustomers) {
            let id = allCustomers[i].getCustomerID();
            let fname = allCustomers[i].getFname();
            let lname = allCustomers[i].getLname();
            let address = allCustomers[i].getaddress();
            let phoneno = allCustomers[i].getphone();
            var row = `<tr><td>${id}</td><td>${fname}</td><td>${lname}</td><td>${address}</td><td>${phoneno}</td></tr>`;
            $('#dataTable3').append(row);
        }
    }

    function clearAllCustomerText() {
        $("#CustomerID").val("");
        $("#First").val("");
        $("#last").val("");
        $("#Address").val("");
        $("#phone").val("");
    }

    // genarate
function generateCustomerId() {
    try {
        let lastCustomerId = customerDB[customerDB.length-1].getCustomerID();
        let newID = parseInt(lastCustomerId.substring(5, 7)) + 1;
        if (newID < 10) {
            $("#CustomerID").val('C00-00'+newID);
        }else if (newID < 100) {
            $("#CustomerID").val('C00-0'+newID);
        } else {
            $("#CustomerID").val('C00-'+newID);
        }
    } catch (e) {
        $("#CustomerID").val('C00-001');
    }

}
function CCC() {
    var input=customerDB.length;
    var text=document.getElementById('custCount');
    text.innerText=input;
}