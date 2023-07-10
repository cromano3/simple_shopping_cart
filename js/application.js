function setPrice(){
  $('tbody tr').each(function (i, ele) {

    var quantity = parseFloat($(ele).find('.quantity input').val());
    var price = parseFloat($(ele).children('.price').text().replace('$', ''));

    if(isNaN(quantity) || isNaN(price)) {
      $(ele).children('.totalPrice').text('$0.00'); 
    }
    else{
      var totalPrice = quantity * price;
      $(ele).children('.totalPrice').text('$' + totalPrice.toFixed(2));
    }

  });
}
function updatePrice(){
  var timeout;
  $('tr input').on('input', function () {

    var row = $(this).closest('tr');

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      var quantity = parseFloat($(row).find('.quantity input').val());
      var price = parseFloat($(row).children('.price').text().replace('$', ''));

      if(isNaN(quantity) || isNaN(price)) {
        $(row).children('.totalPrice').text('$0.00'); 
      }
      else{
        var totalPrice = quantity * price;
        $(row).children('.totalPrice').text('$' + totalPrice.toFixed(2));
      }

    }, 500);

  });

}
function setAndUpdatePrice (){
  setPrice();
  updatePrice();
}

$(document).ready(function () {
  
  
  setAndUpdatePrice ()
  

});