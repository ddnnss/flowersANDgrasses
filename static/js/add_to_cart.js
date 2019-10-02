function add_to_cart(form,i_id) {
    if (i_id){
       // console.log(form.elements[i_id+"_items_number"].value);
    var btn = "#"+i_id+"_submit"
      var item_text = $('#item_text').val()
     console.log(item_text);


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
        var item_text = ''
    }


    var csrf_token = form.elements["csrfmiddlewaretoken"].value
    // console.log($(form).attr('action'));
    //  console.log(csrf_token);
        var data = {};
        data.item_id = item_id;
        data.item_text = item_text;
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

                 $('.cart_table_lg').append(` <tr>
                                                        <td class="product-thumbnail">
                                                            <a href="#">
                                                                <img width="80" height="107" alt="" class="img-responsive" src="${v.image}">
                                                            </a>

                                                        </td>
                                                        <td class="product-name">
                                                            <a href="{% url 'product' item.item.name_slug %}">${ v.name }</a>
                                                            <p id="header_cart_item_text">${ v.item_text }</p>
                                                            <span class="amount"><strong>${ v.number } X ${ v.price } &#8381; = ${ v.total_price } &#8381;</strong></span>
                                                        </td>
                                                        <td class="product-actions">
                                                            <a data-item_id="${v.id}" class="remove" onclick="delete_from_cart(this);return false;">
                                                                <i class="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                    </tr>`);
                });
                $('.ajax_cart_quantity').html(data.total_items_in_cart);
                console.log(data.total_items_in_cart)
                $('.cart_table_lg').append(`<tr>
                                                    <td class="actions" colspan="3">
                                                        <div class="actions-continue">
                                                            <a style="color: #FFFFFF !important;" class="btn btn-default" href="/cart/"> <i class="fa fa-shopping-cart"> </i> ПРОСМОТР КОРЗИНЫ</a>
                                                            <a  style="color: #FFFFFF !important;" class="btn pull-right btn-primary" href="/checkout/"> ОПЛАТА</a>

                                                        </div>
                                                    </td>
                                                </tr>`);



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
        data.item_text = '';
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

                $('.cart_table_lg').append(` <tr>
                                                        <td class="product-thumbnail">
                                                            <a href="#">
                                                                <img width="80" height="107" alt="" class="img-responsive" src="${v.image}">
                                                            </a>

                                                        </td>
                                                        <td class="product-name">
                                                            <a href="{% url 'product' item.item.name_slug %}">${ v.name }</a>
                                                            <p id="header_cart_item_text">${ v.item_text }</p>
                                                            <span class="amount"><strong>${ v.number } X ${ v.price } &#8381; = ${ v.total_price } &#8381;</strong></span>
                                                        </td>
                                                        <td class="product-actions">
                                                            <a data-item_id="${v.id}" class="remove" onclick="delete_from_cart(this);return false;">
                                                                <i class="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                    </tr>`);


                });
                $('.ajax_cart_quantity').html(data.total_items_in_cart);
                console.log(data.total_items_in_cart)
                // $('.cart_footer_lg').html('');
               $('.cart_table_lg').append(`<tr>
                                                    <td class="actions" colspan="3">
                                                        <div class="actions-continue">
                                                            <a style="color: #FFFFFF !important;" class="btn btn-default" href="/cart/"> <i class="fa fa-shopping-cart"> </i> ПРОСМОТР КОРЗИНЫ</a>
                                                            <a  style="color: #FFFFFF !important;" class="btn pull-right btn-primary" href="/checkout/"> ОПЛАТА</a>

                                                        </div>
                                                    </td>
                                                </tr>`);

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