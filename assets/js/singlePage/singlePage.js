hideAll();
$("#Page1").css('display', 'block');
$("#nav").text("Dashboard");

$("#btnDashboard").click(function () {
    hideAll();
    $("#Page1").css('display', 'block');
    $("#nav").text("Dashboard");
    text = $('#nav').text();

});

$("#btncust").click(function () {
    hideAll();
    $("#Page2").css('display', 'block');
    $("#nav").text("Customer");
    text = $('#nav').text();

});

$("#btnitem").click(function () {
    hideAll();
    $("#Page3").css('display', 'block');
    $("#nav").text("Item");
    text = $('#nav').text();

});

$("#btnorders").click(function () {
    hideAll();
    $("#Page4").css('display', 'block');
    $("#nav").text("Orders");
    text = $('#nav').text();

});

function hideAll() {
    $("#Page1,#Page2,#Page3,#Page4").css('display', 'none')
}
