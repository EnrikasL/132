let click_sound = new Audio('sounds/click.mp3');
click_sound.volume = 0.1;
let selectedWindow = 'none';
let weapon_selected = [];
let weapon_price = 0;
let weapon_text = '';
let weapons_prices = '';
let is_basket_empty = 'true';
let weapon_counts = 0;

let input_count = 0;
let math_price = 0;

let html = [];

window.addEventListener('message', function(event) {
	switch (event.data.action) {
		case 'openWeaponShop':
			if (selectedWindow == "none") {
                $('body').show();
			}
		break
	}
});

$(document).ready(function() {
    $('.weapon-shop-title').html("Ginklų <span style='color:#ffc806;'>Parduotuvė</span>");
    $('.weapon-basket-total_sum').html('0' + '€')
    $('.weapon-basket-count').html(weapon_counts + ' Daiktai')
    $('.tablinks').click(function() {
        $(".tablinks").removeClass("active");
        $(this).addClass("active");
        weapon_selected = this
        click_sound.play()
    });
});

$('.weapon-basket').click(function() {
    $('.weapon-basket-toggled').fadeIn(500);
    if ($('.weapon-basket-list').is(':empty')) {
        is_basket_empty = 'true'
        $('.weapon-basket-total_sum').html('0' + '€')
        $('.weapon-basket-empty').show();
        $('.weapon-basket-empty2').show();
        $('.basket-tabs').hide();
        $('.weapon-buy').hide();
        $('.basket-title').hide();
        $('.weapon-basket-list').hide();
    } else {
        is_basket_empty = 'false'
        $('.basket-tabs').show();
        $('.weapon-basket-list').show();
        $('.basket-title').show();
        $('.weapon-buy').show();
        $('.weapon-basket-empty2').hide();
        $('.weapon-basket-empty').hide();
        $('.weapon-total-sum').html('Išviso: ' + math_price + '€')
    }
});

$('.weapon-basket-exit').click(function() {
    $('.weapon-basket-toggled').fadeOut(500);
});

$('.weapon-buy').click(function() {
    $('.weapon-basket-toggled').hide();
    $('.weapon-buying').fadeIn(500);
});

$('.weapon-buy-cancel').click(function() {
    $('.weapon-buying').hide();
});

$('.weapon-add-basket').click(function() {
    $(weapon_selected).find('.li-price').each(function() {
        var sd = $(this).text();
        var num = sd.match(/[\d\.]+/g);
        weapon_price = num
        weapons_prices = num.toString();
    });

    $(weapon_selected).find('.li-title').each(function() {
        weapon_text = $(this).text()
    })

    input_count = $('.weapon-count').val();

    if(weapons_prices === 0) {
    } else {
        math_price = parseInt(weapon_price) * parseInt(input_count)
        var wpn = $('.weapon-basket-list').length.toString();
        weapon_counts = parseInt(wpn) + parseInt(weapon_counts);
        $('.weapon-basket-count').html(weapon_counts + ' Daiktai')
        $('.weapon-basket-total_sum').html(math_price + '€')
        $('.weapon-total-sum').html('Išviso: ' + math_price + '€')
    }

    html = (`                   
    <div class="weapon_list">
        <div class="circle"></div>
        <h1 class="weapon-title">`+ weapon_text +`</h1>
        <h3 class="weapon-price">€`+ weapon_price +`</h3>
        <input type='number' class="weapon-count2" name='quantity' value='`+ input_count +`' readonly/>
        <button class="weapon-remove"><i class="fas fa-times"></i></button> 
    </div>
    `) 

    $('.weapon-basket-list').append(html)

    $('.weapon-basket-toggled').on('click', '.weapon-remove', function() {
        let button = $(this)
        let item = button.parent().get(0);
        let price = button.parent().find('.weapon-price').text()
        console.log(item)
        console.log('Price for item:' + price)
    })

    $('.weapon-count').val('1')
});

$('.weapon-count-add').click(function() {
	if ($(this).prev().val()) {
    	$(this).prev().val(+$(this).prev().val() + 1);
	}
});

$('.weapon-count-minus').click(function() {
    input_val = $(this).val();
    if ($(this).next().val() > 1) {
        if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    }
});

$('.weapon-exit').click(function() {
    $('body').hide();
    $.post('http://KaubojuRP_WeaponShop/close', JSON.stringify({}));
    return
}); 