function PlaceOrderDTO(OrderID,CustomerID,Price,ODate) {
    var __OrderID=OrderID;
    var __CustomerID=CustomerID;
    var __Price=Price;
    var __ODate=ODate;

    this.getPlaceOrderID=function () {
        return __OrderID;
    }
    this.getPlaceCustomerID=function () {
        return __CustomerID;
    }
    this.getPlacePrice=function () {
        return __Price;
    }
    this.getPlaceODate=function () {
        return __ODate;
    }

    this.setPlaceOrderID=function (newOID) {
        __OrderID=newOID;
    }
    this.setPlaceCustomerID=function (newCID) {
        __CustomerID=newCID;
    }
    this.setPlacePrice=function (newPrice) {
        __Price=newPrice;
    }
    this.setPlaceODate=function (newDate) {
        __ODate=newDate;
    }
}