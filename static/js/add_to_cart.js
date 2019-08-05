function add_to_cart(form,i_id) {
    if (i_id){
       // console.log(form.elements[i_id+"_items_number"].value);
    var btn = "#"+i_id+"_submit"
    // console.log($(btn).data('item_name'));


    //     console.log(form.elements["items_number"].value);
    //     console.log(form.elements["item_id"].value);
    //     console.log(form.elements["item_name"].value);
    //     console.log(form.elements["item_price"].value);
    //     console.log(form.elements["item_image"].value);
        var item_number = form.elements[i_id+"_items_number"].value
        var item_id = $(btn).data('item_id')
        var item_name = $(btn).data('item_name')
        var item_price = $(btn).data('item_price')
        var item_image = $(btn).data('item_image')


    }
    else {
        var item_number = form.elements["items_number"].value
        var item_id = form.elements["item_id"].value
        var item_name = form.elements["item_name"].value
        var item_price = form.elements["item_price"].value
        var item_image = form.elements["item_image"].value
    }


    var csrf_token = form.elements["csrfmiddlewaretoken"].value
    // console.log($(form).attr('action'));
    //  console.log(csrf_token);
        var data = {};
        data.item_id = item_id;
        data.item_number = item_number;
        data['csrfmiddlewaretoken'] = csrf_token;
        var url = $(form).attr('action');
        console.log(data);
        $.ajax({
            url:url,
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
                console.log('OK');
                // console.log(data.total_items_in_cart);
                // console.log(data.all_items);

                $('.cart_table_lg').empty();

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
                $('.cart_table_lg').append('<tr>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class="actions" colspan="3">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="actions-continue">\n' +
                    '                                                                          <a style="color: #FFFFFF !important;" class="btn btn-default" href="/cart/"> <i class="fa fa-shopping-cart"> </i> ПРОСМОТР КОРЗИНЫ</a>\n' +
                    '                                                                          <a style="color: #FFFFFF !important;" class="btn pull-right btn-primary" href="/checkout/"> ОПЛАТА</a>\n' +
                    '\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>')


                $.amaran({
                        'theme'     :'user blue',
                        'content'   :{
                            img: item_image,
                            user:'Добавлено в корзину:',
                            message: item_number + ' шт. - ' + item_name
                        },
                        'position'  :'bottom right',
                        'outEffect' :'slideBottom'
                    });
            },
            error: function () {
                console.log('ERROR')
            }
        })
    }

     function quick_add_to_cart(el) {
        let csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
        let item_number = 1
        let item_id = el.dataset.item_id
        let item_name = el.dataset.item_name
        let item_price = el.dataset.item_price
        let item_image = el.dataset.item_image


        let data = {};
        data.item_id = item_id;
        data.item_number = item_number;
        data['csrfmiddlewaretoken'] = csrf_token;

        console.log(data);
        $.ajax({
            url:'/cart/add_to_cart/',
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
                console.log('OK');
                // console.log(data.total_items_in_cart);
                // console.log(data.all_items);

                $('.cart_table_lg').empty();

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

                $.amaran({
                        'theme'     :'user blue',
                        'content'   :{
                            img: item_image,
                            user:'Добавлено в корзину:',
                            message: item_number + ' шт. - ' + item_name
                        },
                        'position'  :'bottom right',
                        'outEffect' :'slideBottom'
                    });
            },
            error: function () {
                console.log('ERROR')
            }
        })
    }