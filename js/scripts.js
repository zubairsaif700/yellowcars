$(document).ready(function() {
	"use strict";

		/* ============  Owl Carousel For clients ============== */

		$("#clients_slider").owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			items: 2,
			loop: true,
			margin: 0,
			nav: true,
			smartSpeed:1000,
			pagination: false,
			dots: true,
			responsiveClass: true,
			responsive: {
				0:{
					items:1,
				},
				992:{
					items:2,
				},
	    }
		});

		/* ============  Owl Carousel For top slider ============== */
		$("#top-slider-screens").owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			smartSpeed:1000,
			pagination: false,
			dots: false,
		});
		/* ============  Owl Carousel For logos ============== */

		$("#logos").owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			items: 7,
			loop: true,
			margin: 20,
			nav: false,
			smartSpeed:1000,
			pagination: false,
			dots: false,
			responsiveClass: true,
			responsive: {
				0:{
					items:3,
				},
				500:{
					items:4,
				},
				767:{
					items:5,
				},
				992:{
					items:7,
				},
	    }
		});
		/* =================  mailChimp  =================  */

		var form = $('#subscribe_form');

    if (form.length) {
      form.ajaxChimp({
        callback: mailchimpCallback,
        // Replace the URL above with your mailchimp URL (put your URL inside '').
        url: 'mail@mail.com'
      });
    }

    // callback function when the form submitted, show the notification box
    function mailchimpCallback(resp) {

      if (resp.result === 'success') {
        $('.subscription_success').html(resp.msg).slideDown().addClass('active-message');
				$('.subscription_error').slideUp().removeClass('active-message');
      } else {
				$('.subscription_error').html(resp.msg).slideDown().addClass('active-message');
				$('.subscription_success').slideUp().removeClass('active-message');
      }
      setTimeout(function () {
        $('.active-message').slideUp('slow', 'swing');
      }, 4000);
    }

});
/* =================  window load =================  */

$(window).on('load',function(){
	/*----- loader ---------*/
	$('.loader').fadeOut();

	/*----- WoW Animations ---------*/
		wow = new WOW();
		wow.init();
});

/* =================  window Scroll =================  */

$(window).on('scroll , load',function(){
	var window_top = $(window).scrollTop();
	/*---------- menu fixed ----------*/

	if(window_top > 20){
		$('.main_header').addClass('light_bg');
		$('.navbar-brand img').css('max-height','28px');
	}
	else {
		$('.main_header').removeClass('light_bg');
		$('.navbar-brand img').css('max-height','35px');
	}

	/*---------- menu active item ----------*/

	$('#home , #home section').each(function () {
		var currLink = $(this);
		var refElement = $(currLink).attr("id");
			if ($(this).position().top -100 <= window_top) {
				if($('.nav-item .nav-link[href*='+refElement+']').length>0){
					$('.nav-item.active').removeClass('active');
					$('.nav-item .nav-link[href*='+refElement+']').parent().addClass('active');
				}
			}
	});

	/*---------- go to top button ---------*/
	if(window_top > 600){
		$('.goto_top').fadeIn();
	}
	else {
		$('.goto_top').fadeOut();
	}
});

/* =================  menu click animate =================  */

$('.nav-item .nav-link').on('click',function(){
	var $target = $(this).attr('href');
	$('body , html').animate({
		scrollTop: $($target).position().top
	},1000);
});

/*------- close menu on click ( small screens ) ------*/

$('.main_header .nav-item').on('click',function(){
	$('.navbar-collapse').removeClass('show');
});

/* =================  play video popup =================  */

$('#video_icon').on('click',function(e){
	e.preventDefault();
	$('.video_popup').css('display','flex');
	$('.iframe_src').fadeIn();
});
$('.video_popup').on('click',function(e){
	var $target = e.target.nodeName;
	var video_src = $(this).find('iframe').attr('src');
	if($target != 'IFRAME'){
		$('.video_popup').fadeOut();
		$('.iframe_src').fadeOut();
		$('.video_popup iframe').attr('src'," ");
		$('.video_popup iframe').attr('src',video_src);
	}
});

/* =================  accordion click  =================  */

	$('.card-header').on('click',function(){
		$('.accordion .card .card-header').removeClass('active');
		$(this).parents('.card').siblings().find('.faq_icon').removeClass('fa-angle-up').addClass('fa-angle-down');
		$(this).addClass('active');
		$(this).find('.faq_icon').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
	});

	/* =================  go to top button =================  */
	  $('.goto_top').on('click',function(e){
	    e.preventDefault();
			$('body , html').animate({
				scrollTop: 0
			},1000);
	  });
	/* =================  contact form  =================  */

$("#contact_form").on('submit',function(t){
	t.preventDefault();
	$('#contact_submit .fa-spin').removeClass('hidden');
	submitForm()
});
  function submitForm(){
    var name=$("#your_name").val(),
        email=$("#email").val(),
        phone=$("#phone").val(),
        message=$("#message").val();
      $.ajax({type:"POST",url:"contact.php",
      data:"&name="+name+"&email="+email+"&phone="+phone+"&message="+message,
      success:function(s){
        "success"==s&&formSuccess()}})}
    function formSuccess(){
			$('#contact_submit .fa-spin').addClass('hidden');
      $("#msgSubmit").removeClass("hidden"),setTimeout(function(){$("#msgSubmit").addClass("hidden");
    },2e3)
	}
