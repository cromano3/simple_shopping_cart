$(document).ready(function () {
  
  $('tbody tr').each(function (i, ele) {

    var quantity = parseFloat($(ele).find('.quantity input').val());
    var price = parseFloat($(ele).children('.price').text());

    var totalPrice = quantity * price;
    $(ele).children('.totalPrice').text(totalPrice);

  });

  var timeout;
  $('tr input').on('input', function () {

    var row = $(this).closest('tr');

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      // updatePrice();
      var quantity = parseFloat($(row).find('.quantity input').val());
      var price = parseFloat($(row).children('.price').text());

      if(isNaN(quantity) || isNaN(price)) {
        $(row).children('.totalPrice').text(0); 
      }
      else{
        var totalPrice = quantity * price;
        $(row).children('.totalPrice').text(totalPrice);
      }

    }, 500);

  });

});