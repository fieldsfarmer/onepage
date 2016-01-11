$(document).ready(function(){

    var $nav = $('#nav');
    var $navItems = $('#nav .item');
    var $navImg = $('#nav img');
    var $navName = $('#nav #name');
    //resize nav bar
    $(document).scroll(function(){
        var smallSize = 50;
        var bigSize = 70;
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 0) {
            if ($nav.attr('class').indexOf('small') == -1) {
                $nav.removeClass('big');
                $nav.addClass('small');
                $nav.animate({height: smallSize + 'px'},100);
                $navItems.animate({'line-height': smallSize + 'px', 'font-size':'1.4em', 'height':smallSize - 4 + 'px'},100);
                $navImg.animate({height: smallSize - 10 + 'px'},100);
                $navName.animate({'line-height': smallSize + 'px', 'font-size':'2.8em', 'height':smallSize + 'px'}, 100);
            }
        } else {
            if ($nav.attr('class').indexOf('big') == -1) {
                $nav.addClass('big');
                $nav.removeClass('small');
                $nav.animate({height: bigSize + 'px'},100);
                $navItems.animate({'line-height': bigSize + 'px', 'font-size':'1.6em', 'height':bigSize - 4 + 'px'},100);
                $navImg.animate({height: bigSize - 10 + 'px'},100);
                $navName.animate({'line-height': bigSize + 'px', 'font-size':'3.2em', 'height':bigSize + 'px'}, 100);
            }
        }
    });

    var $leftArrow = $('.arrow#left');
    var $rightArrow = $('.arrow#right');
    var $slides = $('.slide');
    var steps = 1024;
    var duration = 500;
    var clickLock = false;
    function move2slides($ele, direction, steps, total, duration) {
        var curLeft = $($ele).position().left;
        // if(curLeft<0 && direction<0){
        // 	$($ele).css('left',steps);
        // }
        // if(curLeft>0 && direction>0){
        // 	$($ele).css('left',-steps);
        // }
        $($ele).animate({'left': curLeft + direction * steps}, duration, function(){
            // if ($($ele).position().left < -steps) {
            //     $($ele).css('left',0);
            // }
            if ($($ele).position().left < 0) {
                $($ele).css('left',steps);
            }
            if ($($ele).position().left > 0) {
                $($ele).css('left',-steps);
            }
            clickLock = false;
        });

    }

    function move($ele, direction, steps, total, duration) {
        var curLeft = $($ele).position().left;
        $($ele).animate({'left': curLeft + direction * steps}, duration, function(){
            if ($($ele).position().left < -steps) {
                $($ele).css('left',steps);
            }
            if ($($ele).position().left > steps) {
                $($ele).css('left',-steps);
            }
            clickLock = false;
        });

    }
    $leftArrow.click(function(){
        if (clickLock) {
            return;
        }
        clickLock = true;
        for (var i = 0; i < $slides.length; i++) {
            // move($slides[i], -1, steps, $slides.length, duration);
            if($($slides[i]).position().left < 0){
            	$($slides[i]).css({'left':steps});
            }
            move2slides($slides[i], -1, steps, $slides.length, duration);
            
            // if ($($slides[i]).position().left < -1200) {
            //     $($slides[i]).css({'left':1200});
            // }
        }
    });
    $rightArrow.click(function(){
        if (clickLock) {
            return;
        }
        clickLock = true;
        for (var i = 0; i < $slides.length; i++) {
            // move($slides[i], 1, steps, $slides.length, duration);
            move2slides($slides[i], 1, steps, $slides.length, duration);
            // if ($($slides[i]).position().left > 1200) {
            //     $($slides[i]).css({'left':-1200});
            // }
        }
    });

    //click nav item
    var $itemAbout = $('#item_about');
    var $itemWork = $('#item_work');
    var $itemContact = $('#item_contact');
    // var $itemMessage = $('#item_message');
    var $stripeAbout = $('.stripe#aboutMe');
    var $stripeWork = $('.stripe#works');
    var $stripeContact = $('.stripe#contactMe');
    // var $stripeMessage = $('.stripe#message');
    var $body = $('html, body');

    function scrollTo($dest,duration) {
        $body.animate({
            scrollTop: $dest.offset().top - 50
        }, duration);
    }

    $itemAbout.click(function(){
        scrollTo($stripeAbout,1000);
    });
    $itemWork.click(function(){
        scrollTo($stripeWork,1000);
    });
    $itemContact.click(function(){
        scrollTo($stripeContact,1000);
    });
    // $itemMessage.click(function(){
    //     scrollTo($stripeMessage,1000);
    // });

    //highlight nav item when scroll
    $(document).scroll(function(){
        var top = $(window).scrollTop();
        if (belongs(top, $stripeAbout)) {
            setHighlight($itemAbout);
        }
        if (belongs(top, $stripeWork)) {
            setHighlight($itemWork);
        }
        if (belongs(top, $stripeContact)) {
            setHighlight($itemContact);
        }
        // if (belongs(top, $stripeMessage)) {
        //     setHighlight($itemMessage);
        // }
    });
    function setHighlight($ele){
        $('#nav .item').removeClass('selected');
        $ele.addClass('selected');
    }
    function belongs(top, $ele) {
        var windowHeight = $(window).height();
        return (top + 50)+ windowHeight / 3 >= $ele.offset().top;
    }

    //render projects
    var data = {};
    var $title = $('.popup .banner .title');
    var $lists = $('.popup .popContent #list');
    var $details = $('.popup .popContent #details');
    var $popup = $('.popup');
    var $close = $popup.find('.close');
    //load data from mock JSON file
    $.ajax("resources/data.json").done(function(_data){
        data = _data;
        var cur = data[0];
        renderTitle(cur);
        renderLists(cur);
        renderDetails(cur.lists[0]);
    });

    $('.workCategory#work .detailsBtn').click(function(){
        render(data[0]);
    });
    $('.workCategory#independent .detailsBtn').click(function(){
        render(data[1]);
    });
    $('.workCategory#course .detailsBtn').click(function(){
        render(data[2]);
    });
    $('.workCategory#skills .detailsBtn').click(function(){
        render(data[3]);
    });

    $close.click(function(){
        $popup.hide();
    });

    function popupPosition(){
        var maskWidth = $(window).width();
        var dialogLeft = (maskWidth / 2) - ($popup.width() / 2);
        var maskHeight = $(window).height();
        var dialogTop = (maskHeight / 2) - ($popup.height() / 2);
        $popup.css({top:dialogTop, left:dialogLeft});
    }

    function render(cur){
        renderTitle(cur);
        renderLists(cur);
        renderDetails(cur.lists[0]);
        popupPosition();
        $popup.show();
    }

    function renderTitle(cur){
        $title.html(cur.category);
    }

    function renderLists(cur) {
        var lists = cur.lists;
        $lists.html("");
        for (var i = 0; i < lists.length; i++) {
            var $newNode = listItemTemp(lists[i].subtitle, i);
            $lists.append($newNode);
        }

        $('.listItem').click(function(){
            $('.listItem').removeClass('selected');
            renderDetails(cur.lists[$(this).attr('id')]);
            $(this).addClass('selected');
        });

        $('.listItem').first().addClass('selected');
    }

    function renderDetails(curPiece) {
        $details.find('.subtitle').html(curPiece.fullName);
        var $content = $details.find('.details ul');
        $content.html("");
        for (var i = 0; i < curPiece.details.length; i++) {
            var html = [];
            html.push('<li>');
            if (curPiece.details[i] instanceof Object) {
                html.push(curPiece.details[i].subtitle);
                html.push("<ul>");
                for (var j = 0; j < curPiece.details[i].details.length; j++) {
                    html.push("<li>");
                    html.push(curPiece.details[i].details[j]);
                    html.push("</li>");
                }
                html.push("</ul></li>");
            } else {
                html.push(curPiece.details[i]);
            }
            html.push('</li>');
            $content.append(html.join(""));
        }
        popupPosition();
    }

    function listItemTemp(name, id) {
        var html = [];
        html.push('<div class="listItem" id="');
        html.push(id);
        html.push('">');
        html.push(name);
        html.push("</div>");
        return $(html.join(""));
    }
});