function Item(Iid, Iname, Qty, Price) {
    var __Iid = Iid
    var __Iname = Iname
    var __Qty = Qty
    var __Price = Price


    this.getIid = function () {
        return __Iid;
    }
    this.setIid = function (newIid) {
        __Iid= Iid;
    }
    this.getIname= function () {
        return __Iname;
    }
    this.setIname = function (newIname) {
        __Iname= newIname;
    }
    this.getQty= function () {
        return __Qty;
    }
    this.setQty = function (newQty) {
        __Qty= newQty;
    }
    this.getPrice= function () {
        return __Price;
    }
    this.setPrice= function (newPrice) {
        __Price= newPrice;
    }

}

