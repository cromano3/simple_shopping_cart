function calculateAndSetItemTotal(row){
  var quantity = parseFloat($(row).find('.quantity input').val());
  var price = parseFloat($(row).children('.price').text().replace('$', ''));

  if(isNaN(quantity) || isNaN(price)) {
    $(row).children('.totalPrice').text('$0.00'); 
  } else {
    var totalPrice = quantity * price;
    $(row).children('.totalPrice').text('$' + totalPrice.toFixed(2));
  }
}

function setPrice(){
  $('tbody tr').each(function (i, ele) {
    calculateAndSetItemTotal($(ele));
  });
}

function updatePrice(){
  var timeout;
  $('tr input').on('input', function () {
    var row = $(this).closest('tr');
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      calculateAndSetItemTotal(row);
    }, 500);
  });
}

function setTotalPrice(){
  var total = 0;
  $('tbody tr:has(.totalPrice)').each(function (i, ele) {
    total += parseFloat($(ele).children('.totalPrice').text().replace('$', ''));
  });

  $('body').find('.grandTotal').text('$' + total.toFixed(2));
}

function updateTotalPrice(){
  var timeout;
  $('tr input').on('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
       setTotalPrice()
    }, 500);
  });
}

function setAndUpdatePrice (){
  setPrice();
  setTotalPrice();
  updatePrice();
  updateTotalPrice();
}

$(document).ready(function () {
  
  
  setAndUpdatePrice ()
  

});