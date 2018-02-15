$(document).ready(function () {

    var orderItemsContainer = $('.order-items-container');

    $('.menu-item').on('dragstart', function(e) {
        var source = e.target;
        var targetName = $(source).find('.menu-item__name').html();
        var targetPrice = $(source).find('.menu-item__price').html();
        var targetHTML = '<div class="order-item"><p class="order-item__name">' + targetName + '</p><p class="order-item__price">' + targetPrice + '</p>';
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('text', targetHTML);
        e.originalEvent.dataTransfer.setData('price', targetPrice.split('.')[0]);
        $('.order-items-container').addClass('over');
    });

    $(orderItemsContainer).on('dragover', function(e) {
        return false;
    });

    $(orderItemsContainer).on('dragenter', function(e) {
        e.preventDefault();
    });

    $(orderItemsContainer).on('drop', function(e) {
        var newOrderItem = e.originalEvent.dataTransfer.getData('text');
        $(this).append(newOrderItem);
        var newItemPrice = e.originalEvent.dataTransfer.getData('price');
        var orderTotalPrice = $('.order-total__price');
        var currentTotalPrice = parseInt($(orderTotalPrice).html().split('.')[0]);
        currentTotalPrice += parseInt(newItemPrice);
        $(orderTotalPrice).html(currentTotalPrice + '.-');
        $(this).removeClass('over');
        e.stopPropagation();
        return false;
    });

});
