function Customer(id, Fname, Lname, address, phone) {
    var __id = id
    var __Fname = Fname
    var __Lname = Lname
    var __address = address
    var __phone = phone


    this.getCustomerID = function () {
        return __id;
    }
    this.setCustomerID = function (newID) {
        __id = newID;
    }
    this.getFname = function () {
        return __Fname;
    }
    this.setFname = function (newFname) {
        __Fname= newFname;
    }
    this.getLname= function () {
        return __Lname;
    }
    this.setLname = function (newLname) {
        __Lname= newLname;
    }
    this.getaddress= function () {
        return __address;
    }
    this.setaddress= function (newaddress) {
        __address= newaddress;
    }
    this.getphone= function () {
        return __phone;
    }
    this.setphone = function (newphone) {
        __phone = newphone;
    }
}