function delete_from_main_cart(i_id) {
    console.log(i_id);
      jQuery('#cart_content').showLoading();
     //jQuery('#cart_sidebar').showLoading();

    var item_id = i_id;

    var url = '/cart/delete_from_main_cart/';
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
                // console.log(data.all_items);
                 $('.cart_table_lg').empty();

                $.each(data.all_items,function (k,v) {   //корзина в меню
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
                $('.cart_table_lg').append('<tr>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="actions" colspan="3">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="actions-continue">\n' +
                    '                                                                          <a style="color: #FFFFFF !important;" class="btn btn-default" href="/cart/"> <i class="fa fa-shopping-cart"> </i> ПРОСМОТР КОРЗИНЫ</a>\n' +
                    '                                                                          <a style="color: #FFFFFF !important;" class="btn pull-right btn-primary" href="/checkout/"> ОПЛАТА</a>\n' +
                    '\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>')
                //корзина в меню



                 $('#cart_content').empty();


                     $.each(data.all_items,function (k,v) {


                    $('#cart_content').append('<tr>\n' +
                        '\t\t\t\t\t\t\t\t\t<td class="cart_delete text-center">\n' +
                        '\t\t\t\t\t\t\t\t\t\t<a title="Удалить из корзины" class="remove" href="javascript:void(0)" onclick="delete_from_main_cart('+ v.id +');return false;">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-times"></i>\n' +
                        '\t\t\t\t\t\t\t\t\t\t</a>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t<td class="cart_product">\n' +
                        '                                        <a href="#">\n' +
                        '                                            <img src="'+ v.image +'" alt="Товар в корзине" width="80" height="107" class="img-responsive">\n' +
                        '                                        </a>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t<td class="cart_description">\n' +
                        '\t\t\t\t\t\t\t\t\t\t<a href="#">'+ v.name +'</a>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '                                    <td class="cart_unit text-right">\n' +
                        '\t\t\t\t\t\t\t\t\t\t<span class="amount">'+ v.discount +' %</span>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t<td class="cart_unit text-right">\n' +
                        '\t\t\t\t\t\t\t\t\t\t<span class="amount">'+ v.total_price +' &#8381;</span>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t<td class="cart_quantity text-center">\n' +
                        '\t\t\t\t\t\t\t\t\t\t<div class="quantity">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t<button class="btn quantity-left-minus minus"  onclick="downClick(this)" data-item_id="'+ v.id +'" data-field=""><i class="fa fa-angle-left"></i></button>\n' +
                        '                                        <input id="'+ v.id +'_items_number" type="text" name="quantity" readonly="" class="form-control input-number qty" data-item_in_cart_id="'+ v.id +'" onchange="change_cart(this);return false;" value="'+ v.number +'">\n' +
                        '                                        <button class="btn quantity-right-plus plus" onclick="upClick(this)" data-item_id="'+ v.id +'"><i class="fa fa-angle-right"></i></button>\n' +
                        '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t\t<td class="cart_total text-right">\n' +
                        '\t\t\t\t\t\t\t\t\t\t<span class="amount">'+ v.total_price +' &#8381;</span>\n' +
                        '\t\t\t\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t\t\t</tr>');
                        });


            //    $('.cart_total_lg').html(data.total_cart_price);
             //   $('#cart_subtotal_price_side').html(data.total_cart_price + ' &#8381;');
                $('#total_price').html(data.total_cart_price_with_discount + ' &#8381;');
             //   $('#promo_value').html(data.promo_discount_value + ' %');

                jQuery('#cart_content').hideLoading();
               // jQuery('#cart_sidebar').hideLoading();
            },
            error: function () {
                console.log('ERROR')
            }
        });

}