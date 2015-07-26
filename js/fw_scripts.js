preloadImages([
	'images/nav-sub-a.png',
	'images/nav-a.png'
]);

function drop_menu () {
	//DROP menu
	if ($(window).width()<768){
		$(".mainmenu li a").click(function(){
			$(".mainmenu").hide("slow");
		});
	}
}

$(document).ready(function(){		
	/*MainMenu SetUp
	================*/
	$('.mainmenu').find('li:has(ul)').addClass('has-menu');
	$('.menu_indicator').stop().animate({'opacity' : '0'},1);
	$('.sub_menu').animate({'opacity' : '0'},1);
	$('.mobile_menu').html($('.mainmenu').html());

	/*SubMenu Script
	================*/
	$('.mainmenu').find('li.has-menu').hover(function(){
		showed_menu = $(this).children('.sub_menu');
		showed_menu.css('display', 'block');
		showed_menu.stop().animate({'opacity' : '1'}, 300);
	}, function(){
		showed_menu = $(this).children('.sub_menu');
		showed_menu.stop().animate({'opacity' : '0'}, 300, function() {$(this).css('display', 'none');});
	});
	
	/*Ajaxed loading
	================*/
	$(window).bind('hashchange', function() {
		  if(location.hash.indexOf('#')+1){
		   $('.ajaxed_content').animate({ opacity : '0' }, 1000, function(){load_site()});
		   menuNav()
		  }
	});	
	
	//testimonials
	$('#testimonials_carousel, #testimonials_carousel2').carousel({
		pause: 'hover'
	});
	
	//DROP menu
	$(".btn_dropdown").click(function () {
		$(".mainmenu").slideToggle("slow");
	});
	drop_menu();
	
	/*//MENU EFFECT
	$(".menu_block1").click(function () {
		$(".effect").animate({'left':'0px'});
	});
	$(".menu_block2").click(function () {
		$(".effect").animate({'left':'100px'});
	});
	$(".menu_block3").click(function () {
		$(".effect").animate({'left':'200px'});
	});
	*/
	
});
$(window).load(function(){
	//Player
			var myPlaylist = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_1",
			cssSelectorAncestor: "#jp_container_1"
			}, [
				{
					mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
					oga:"audio/ogg/2.oga"
				},
				{
					mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
					oga:"audio/ogg/1.ogg"
				},
				{
					mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
					oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
				},
				{
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
					oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
				},
				{
					mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
					oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
				},
			], {
			playlistOptions: {
			enableRemoveControls: true,
			autoPlay: true
			},
			swfPath: "/js",
			supplied: "ogv, m4v, oga, mp3"
			});
	
	if (location.hash.substr(1)==""){
		window.location.replace(location.hash+'#home');
	} else {
		load_site();
	}
	
	if(location.hash.substr(1)=='gallery1'){
		galleryHover()
	}
	if(location.hash.substr(1)=='gallery2'){
		galleryHover()
	}
	if(location.hash.substr(1)=='gallery3'){
		galleryHover()
	}
	menuNav();
	if (($.browser.msie) && ($.browser.version == '8.0')) {
		$('.wrap').css({'margin-top':'0'});
	}
	$(".img-container").preloader();
})

$(window).resize(function(){
	
	
	drop_menu();
	
});

function load_site() {
		
		$("#content").find('.ajaxed_content').load(location.hash.substr(1)+'.html', function() {
			$(".img-container").preloader();	
			
			$('.ajaxed_content').animate({ opacity: 1 }, 1000, function() {});
			
			if(location.hash.substr(1)=='home'){
				slider();
			}
			if(location.hash.substr(1)=='gallery1' || location.hash.substr(1)=='gallery2' || location.hash.substr(1)=='gallery3' || location.hash.substr(1)=='blog' || location.hash.substr(1)=='media-videos'){
				galleryHover();
			}
			if(location.hash.substr(1)=='contacts'){
				formSubmit();
			}
		});
		
}

function addEvent(element, eventName, callback) {
		if (element.addEventListener) {
			element.addEventListener(eventName, callback, false)
		} else {
			element.attachEvent(eventName, callback, false);
		}
	}
	function ready(player_id) {
		var froogaloop = $f(player_id);
		froogaloop.addEvent('play', function(data) {
			jQuery('.flexslider').flexslider("pause");
		});
		froogaloop.addEvent('pause', function(data) {
			jQuery('.flexslider').flexslider("play");
		});
	}
function slider(){
	
		
	jQuery('.flexslider').flexslider({
		touchSwipe: true,
		controlNav: false,
		slideshow: true,
		slideshowSpeed: 7000,
		animationDuration: 600,
		randomize: false,
		pauseOnAction: true,
		pauseOnHover: false,
		start: function(){
			
		}
	}); 
}

function galleryHover(){
	$('.zoom, .zoom_video, .link, .gallery-hover').css({'opacity':'0'});
	$("a[rel^='prettyPhoto']").prettyPhoto({deeplinking: false});
	$('.gallery-list a').hover(
	function(){
		$(this).find('.zoom, .zoom_video, .link').stop().animate({'opacity' : '1'});
		$(this).find('.gallery-hover').stop().animate({'opacity' : '1'});
	}, function(){
		$(this).find('.zoom, .zoom_video, .link').stop().animate({'opacity' : '0'});
		$(this).find('.gallery-hover').stop().animate({'opacity' : '0'});
	});	
}
function menuNav(){
	$('.mainmenu li').removeClass('act');
	$('.mainmenu li a[href$="'+location.hash.substr(1)+'"]').parent().addClass('act');
	if($('.mainmenu li.act').parent().hasClass('sub_menu')){
		$('.mainmenu li.act').parent().parent().addClass('act')
	}
}
function formSubmit(){
	$('.btn_send').click(function(){
		if($('.req').val()!=""){
		var options = { 
			clearForm:true,
			success:    function() {
				var req =  $('.request');
				req.fadeIn();
				setTimeout(function(){req.fadeOut()}, 7000)
			} 
		}; 
			$('form#contact').ajaxSubmit(options);
		}
		else{
			$('.required').fadeIn();
			setTimeout(function(){$('.required').fadeOut()}, 7000)
		}
	});
	
}