function delete_from_cart(del){

    var item_id = $(del).data('item_id');
    var url = '/cart/delete_from_cart/';
    var csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
    console.log(csrf_token);
      var data = {};
        data.item_id = item_id;
        data['csrfmiddlewaretoken'] = csrf_token;
        console.log(data);
        $.ajax({
            url:url,
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
                console.log('OK');
                console.log(data.all_items);
                $('.cart_table_lg').empty();
                if (data.all_items.length > 0) {
                     $.each(data.all_items,function (k,v) {
                    $('.cart_table_lg').append('     \t<tr>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="product-thumbnail">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="page-detail.html">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img width="80" height="107" alt="" class="img-responsive" src="'+ v.image +'">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="product-name">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="page-detail.html">'+ v.name +'</a>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<br><span class="amount"><strong>'+ v.number+' X '+ v.price +' &#8381; = '+ v.total_price +' &#8381;</strong></span>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="product-actions">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a data-item_id="'+ v.id +'" class="remove" onclick="delete_from_cart(this);return false;"> <i class="fa fa-times"></i> </a></td>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-times"></i>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>');


                });
                $('.ajax_cart_quantity').html(data.total_items_in_cart);
                console.log(data.total_items_in_cart)
                // $('.cart_footer_lg').html('');
                $('.cart_table_lg').append('<tr>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="actions" colspan="3">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="actions-continue">\n' +
                    '                                                                          <a style="color: #FFFFFF !important;" class="btn btn-default" href="/cart/"> <i class="fa fa-shopping-cart"> </i> ПРОСМОТР КОРЗИНЫ</a>\n' +
                    '                                                                          <a style="color: #FFFFFF !important;" class="btn pull-right btn-primary" href="/checkout/"> ОПЛАТА</a>\n' +
                    '\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>')
                }
                else
                {
                    $('.cart_table_lg').append(' <tr>\n' +
                        '                                                               <td>\n' +
                        '                                                                   Корзина пуста\n' +
                        '                                                               </td>\n' +
                        '                                                               </tr>');
                     $('.ajax_cart_quantity').html('0');
                }
            },
            error: function () {
                console.log('ERROR')
            }
        });
console.log($(del).data('item_id'));
 // $(del).closest('li').remove();
}
