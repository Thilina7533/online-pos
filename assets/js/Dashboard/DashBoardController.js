var sec1=document.getElementById('sec1');
// sec1.style.display='none';

var sec2=document.getElementById('sec2');
sec2.style.display='none';

var sec3=document.getElementById('sec3');
sec3.style.display='none';

var sec4=document.getElementById('sec4');
sec4.style.display='none';

// sec1.style.display='block';

var text1=document.getElementById('text1');
text1.style.cursor='pointer';
var text2=document.getElementById('text2');
text2.style.cursor='pointer';
var text3=document.getElementById('text3');
text3.style.cursor='pointer';
var text4=document.getElementById('text4');
text4.style.cursor='pointer';

text1.addEventListener("click", function () {

    sec1.style.display='block';
    sec2.style.display='none';
    sec3.style.display='none';
    sec4.style.display='none';
    AAA();
    III();
    CCC();
});

text2.addEventListener("click", function () {
    sec1.style.display='none';
    sec2.style.display='block';
    sec3.style.display='none';
    sec4.style.display='none';
    $('#CustomerID').focus();

});

text3.addEventListener("click", function () {
    sec1.style.display='none';
    sec2.style.display='none';
    sec3.style.display='block';
    sec4.style.display='none';
    loadAllItemToTheTable();
});

text4.addEventListener("click", function () {
    loadCustomer();
    loadItem();
    sec1.style.display='none';
    sec2.style.display='none';
    sec3.style.display='none';
    sec4.style.display='block';

});



