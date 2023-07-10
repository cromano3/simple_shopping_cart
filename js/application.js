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

  var totalElements = $('tbody tr').length;

  $('tbody tr').each(function (i, ele) {
    if (i !== totalElements - 1) {
      calculateAndSetItemTotal($(ele));
    }
  });

}

function updatePrice(){
  var timeout;
  $(document).on('input', 'tr .quantity input', function () {
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
  $(document).on('input', 'tr .quantity input', function () {
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

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    setTotalPrice();
  });


  $('#addButton').on('click', function (event) {
    var name = $('#nameInput input').val();
    var price = $('#priceInput input').val();

    if (name === '' || price === '') {
      alert("Please correctly fill out both fields.");
      return;
    }

    if (isNaN(price)) {
      alert("Price must be a number.");
      return; 
  }

    var newRow ='<tr>' +
    '<td class="name text-center">' + name + '</td>' +
    '<td class="price text-center">' + '$' + parseFloat(price).toFixed(2) + '</td>' +
    '<td class="quantity text-center">QTY <input type="number" value="0"/></td>' +
    '<td class="totalPrice text-center">$0.00</td>' +
    '<td class="text-center"><button class="btn btn-light btn-sm remove">Remove</button></td>' +
    '</tr>';    
    
    $('tbody tr:last').before(newRow);

    $('#nameInput input').val('');
    $('#priceInput input').val('');

  });

  
});