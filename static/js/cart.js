function change_cart(obj) {
    //   console.log($(obj).val());
    //   console.log($(obj).data('item_in_cart_id'));
    jQuery('#cart_content').showLoading();
    //  jQuery('#cart_sidebar').showLoading();
    console.log('change cart');
    var item_id = $(obj).data('item_in_cart_id');
    var item_number = $(obj).val();
    if (parseInt(item_number) > 0){
        var url = '/cart/update_cart/';
        var csrf_token = $('#dummy_form [name="csrfmiddlewaretoken"]').val();
        //   console.log(csrf_token);
        var data = {};
        data.item_id = item_id;
        data.item_number = item_number;
        data['csrfmiddlewaretoken'] = csrf_token;
        console.log(data);
        $.ajax({
            url:url,
            type:'POST',
            data: data,
            cache:true,
            success: function (data) {
                //    console.log('OK');
                // console.log(data.all_items);
                $('.cart_table_lg').empty();
                $.each(data.all_items,function (k,v) {
                    //корзина в меню
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
                $('.cart_table_lg').append(`<tr>
                                                    <td class="actions" colspan="3">
                                                        <div class="actions-continue">
                                                            <a style="color: #FFFFFF !important;" class="btn btn-default" href="/cart/"> <i class="fa fa-shopping-cart"> </i> ПРОСМОТР КОРЗИНЫ</a>
                                                            <a  style="color: #FFFFFF !important;" class="btn pull-right btn-primary" href="/checkout/"> ОПЛАТА</a>

                                                        </div>
                                                    </td>
                                                </tr>`);
                //корзина в меню



                $('#cart_content').empty();


                $.each(data.all_items,function (k,v) {


                    $('#cart_content').append(`<tr>
									<td class="cart_delete text-center">
										<a title="Удалить из корзины" class="remove" href="javascript:void(0)" onclick="delete_from_main_cart(${ v.id });return false;">
											<i class="fa fa-times"></i>
										</a>
									</td>
									<td class="cart_product">
                                        <a href="{% url 'product' cart_item.item.name_slug %}">
                                            <img src="${ v.image}" alt="${ v.name}" width="80" height="107" class="img-responsive">
                                        </a>

									</td>
									<td class="cart_description">
										<a href="#">${ v.name}</a>
                                        
                                        <p id='item_text'>${v.item_text}</p>                                         
                                     </td>
                                    <td class="cart_unit text-right">
										<span class="amount">${v.discount} %</span>
									</td>
									<td class="cart_unit text-right">
										<span class="amount">${v.total_price} &#8381;</span>
									</td>
									<td class="cart_quantity text-center">
										<div class="quantity">
											<button class="btn quantity-left-minus minus"  onclick="downClick(this)" data-item_id="${ v.id}" data-field=""><i class="fa fa-angle-left"></i></button>
                                        <input id="${ v.id}_items_number" type="text" name="quantity" readonly="" class="form-control input-number qty" data-item_in_cart_id="${ v.id}" onchange="change_cart(this);return false;" value="${ v.number}">
                                        <button class="btn quantity-right-plus plus" onclick="upClick(this)" data-item_id="${ v.id}"><i class="fa fa-angle-right"></i></button>
										</div>
									</td>
									<td class="cart_total text-right">
										<span class="amount">${v.total_price} &#8381;</span>
									</td>
								</tr>`);
                });

                $('#total_price').html(data.total_cart_price_with_discount + ' &#8381;');


                jQuery('#cart_content').hideLoading();

            },
            error: function () {
                console.log('ERROR')
            }
        });
    }
    else{
        // console.log('lower or zero');
        $(obj).val('1');
        jQuery('#cart_content').hideLoading();
        jQuery('#cart_sidebar').hideLoading();
    }




}