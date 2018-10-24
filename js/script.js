var photo_slide_out_flag = 0;
var nav_open_flag = 0;
var mouse_posY = 0;
var nav_speed = 0;
var nav_speed_offset = 0.1;
var nav_pos = 0;
var cur_track =1;
var track_old = 1;
var about_flag = 0;
var intro_flag = 0;
var page_load_flag =0;

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

function initializing() {
   if (photo_slide_out_flag == 1) {
      $(".bengaluru_photo").css({
         "margin-top": parseInt(-($(".bengaluru_photo").height() - 120)),
         "left": "60"
      });
   }
   if(window.innerWidth>1024)
   {
   $(".nav_list").css({
      "width": $(window).width() / 2 - 20
   });
   }
   $(".bengaluru_sound_list li").css({
      "height": $(window).height()
   });
   $(".bengaluru_sound_list li .ui360-vis").css({
      "top": $(".bengaluru_photo").height() / 2
   });
   $(".bengaluru_sound_list").css({
      "transform": "translate(0px," + (-(cur_track-1) * $(window).height()) + "px)"
   });
  if( about_flag == 0)
  {
   $(".about_container").css({"height":0});
  }
  else
  {
	  $(".about_container").css({"height":$(window).height()});
  }
  set_prev_next(cur_track);
   
  
	

}

function set_prev_next(number)
{
if(number==1)
{
	$(".prev_button").hide();
}
else
{
	$(".prev_button").show();
}
if(number==30)
{
	$(".next_button").hide();
}
else
{
	$(".next_button").show();
}
var prev_track = number-1;
var next_track = number+1;	
$(".prev_button .toggle_thumnail").css({"background-image":$(".bengaluru_image_list li:nth-child("+prev_track+")").css('background-image')});
$(".next_button .toggle_thumnail").css({"background-image":$(".bengaluru_image_list li:nth-child("+next_track+")").css('background-image')});	
}

function nav_li_delay(x) {
/*
   $(".nav_list li:nth-child(" + x + ")").css({
      "margin-left": 0
   });
   if (x < 13) {
      setTimeout(function() {
         nav_li_delay(x + 1);
      }, 0);
   }*/
}

function nav_li_reset() {
	/*
   $(".nav_list li").each(function(index) {
      if (index <= 4) {
         $(this).css({
            "margin-left": index * 100
         });
      } else {
         $(this).css({
            "margin-left": 4 * 100
         });
      }
   });*/
}


function nav_move_reset() {
   mouse_posY = 0;
   nav_pos = 0;
   $(".nav_list").css({
      "transform": "translate(0px," + nav_pos + "px)"
   });
}

function nav_close() {
	 
   $("nav").removeClass("open");
   $(".nav_icon").removeClass("open");
   nav_open_flag = 0;
   nav_li_reset();
   $(".nav_btn").removeClass("hide");
   setTimeout(function() {
      nav_move_reset();
   }, 1000);

   if (photo_slide_out_flag == 0)
      $(".bengaluru_photo").removeClass("slide");
   else
      $(".bengaluru_map").removeClass("slide");
}

function nav_move() {

   setInterval(function() {
      if (nav_open_flag == 1) {
         if (mouse_posY < 300) {
            nav_speed = (300 - mouse_posY) * nav_speed_offset // slide up
            if (nav_speed > 15) nav_speed = 15 // max nav speed
            if ($(".nav_list").offset().top < 112) {
               nav_pos = nav_pos + nav_speed;
               $(".nav_list").css({
                  "transform": "translate(0px," + nav_pos + "px)"
               });

            }

         } else if (mouse_posY > $(window).height() - 200) // slide down
         {
            nav_speed = (mouse_posY - $(window).height() + 200) * nav_speed_offset
            if ($(".nav_list").offset().top > -(($(".nav_list").height()) - $(window).height() + 40)) {
               nav_pos = nav_pos - nav_speed;
               $(".nav_list").css({
                  "transform": "translate(0px," + nav_pos + "px)"
               });

            }

         } else {
            // do nothing - stable
         }
      }
   }, 12);

}

function photo_slide_back() {
   if (photo_slide_out_flag == 1) {
      $(".bengaluru_map_mask").removeClass("compress");
      photo_slide_out_flag = 0;
      $(".bengaluru_photo").removeClass("slide_out");
      $(".bengaluru_photo").removeAttr("style");
   }
}


function open_photo(x) {
	
	for(var i=0;i<13;i++)
	{
		marker_array[i].setIcon(new google.maps.MarkerImage("images/icons/icon_1_large_def.png", null, null, null, new google.maps.Size(35,35)));
	}
	
   $(".bengaluru_sound_list").css({
      "transform": "translate(0px," + (-x * $(window).height()) + "px)"
   });
   if( x!=  track_old-1)
   {
   $(".bengaluru_image_list li").fadeOut(500);
   $(".bengaluru_image_list li:nth-child("+(x+1)+")").fadeIn(500);
   marker_array[x].setIcon(new google.maps.MarkerImage("images/icons/icon_1_large.png", null, null, null, new google.maps.Size(50,50)));
   set_prev_next(cur_track);
   track_old = cur_track;
   }
}

function panning_map(index)
{
	
	if(photo_slide_out_flag==0)
	{
		
	var lat_dist = $(".bengaluru_photo").height()/2;
	map_pixel_cordinates_init = overlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point($(window).width()/2,0));
	map_pixel_cordinates = overlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point($(window).width()/2, lat_dist));
//console.log(map_pixel_cordinates);
	var r = new google.maps.LatLng(bengaluruLocaties[index][1]+map_pixel_cordinates_init.lat() - map_pixel_cordinates.lat(), bengaluruLocaties[index][2]); // .G might change
	bengalurumap.panTo(r);
	}
	else
	{
	var r = new google.maps.LatLng(bengaluruLocaties[index][1], bengaluruLocaties[index][2]);
	bengalurumap.panTo(r);
	
	}	
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


$(document).ready(function() {

	// preload images 
	
	preload([
    './soundmanager/images/360-button-pause-light.png',
    './soundmanager/images/360-button-vis-pause-light.png',
    './soundmanager/images/360-button-vis-play-light.png',
	'./soundmanager/images/360-button-vis-play.png'
	,'./soundmanager/images/360-button-vis-pause.png'
	
	]);
	// preload intro
	
	$(".intro_autor").removeClass("init");
	$(".intro_title").removeClass("init");
	
	setTimeout(function(){
		$(".intro_autor").addClass("exit");
	$(".intro_title").addClass("exit");
	
	setTimeout(function(){
		$(".preload_msg_container").removeClass("init");
	 intro_flag =1;
	}, 100);
	
	setTimeout(function(){
		
		$(".preloader_container .footer_right").show();
	
	},1300);
	
	}, 6000); // diff between entry and exit*/

   //navigation 
   if(window.innerWidth>1024) // for desktops
   {
   $("nav").mouseenter(function() { // nav open

      $(this).addClass("open");
	  $(".nav_icon").addClass("open");
      nav_open_flag = 1;
      nav_li_delay(1);
      $(".nav_btn").addClass("hide");
      if (photo_slide_out_flag == 0)
         $(".bengaluru_photo").addClass("slide");
      else
         $(".bengaluru_map").addClass("slide");
   });
	
	 $(".nav_icon").mouseenter(function() { // nav open

      $("nav").addClass("open");
	  $(".nav_icon").addClass("open");
      nav_open_flag = 1;
      nav_li_delay(1);
      $(".nav_btn").addClass("hide");
      if (photo_slide_out_flag == 0)
         $(".bengaluru_photo").addClass("slide");
      else
         $(".bengaluru_map").addClass("slide");
   });
	
   $("nav").mouseleave(function() { // nav close

      nav_close();
   });

   $(".bengaluru_photo", ".bengaluru_map", "footer").mouseover(function() { // nav close
      nav_li_reset();
   });


   $(document).mousemove(function(e) { // nav move on mouse move
      mouse_posY = e.pageY
   });
   
      $(".share_btn").mouseenter(function(){
	   
	   
	   $(".facebook").addClass("open");
	   $(".twitter").addClass("open");
	   $(this).addClass("open");
	 });

	$(".share_btn").mouseleave(function(){
	   
	  
	   $(this).removeClass("open");
	   $(".facebook").removeClass("open");
	   $(".twitter").removeClass("open");
	 });
   
   nav_move();
   }
   
  
   
   $(".nav_list li").click(function() {
	   
	   if(window.innerWidth<=1024)
	   {
		 
		   setTimeout(function(){ nav_tab_flag =0;}, 1000); // changed settimeout from 1000 to 0
		   $('.nav_list').animate({ scrollTop: 0 }, "fast");
	   }
	   if (cur_track!=$(this).index()+1)
		{
		 pl.handleClick({'target':pl.links[$(this).index()]}); 
		}
	  cur_track = $(this).index()+1
      open_photo($(this).index())
	
      nav_close();
	  if(window.innerWidth>1024)
	  {
      nav_li_reset();
	 
	  }
	   photo_slide_back();
	  bengalurumap.setZoom(14);
	  panning_map($(this).index());
	  
   });
   
   $(".prev_button").click(function(){
	  
	   cur_track = cur_track - 1;
	    open_photo(cur_track-1);
		 panning_map(cur_track-1);
		 pl.handleClick({'target':pl.links[cur_track-1]}); 

	   });
	
	$(".next_button").click(function(){
	   
	   cur_track = cur_track + 1;
	   open_photo(cur_track-1);
		panning_map(cur_track-1);
	    pl.handleClick({'target':pl.links[cur_track-1]}); 
		
	   });
	
	
	$(document).keydown(function(e) {
		if(page_load_flag==1)
		{
    switch(e.which) {
        case 37:
		if(cur_track>1 &&  about_flag == 0)
		{
		cur_track = cur_track - 1;
	    open_photo(cur_track-1);
		 panning_map(cur_track-1);
		 pl.handleClick({'target':pl.links[cur_track-1]}); 
		
		}
		else if(about_flag ==1)
		{
			 $(".about_container").css({"height":0});
			about_flag = 0;
		}
	
		
		break;

        case 39: 
		if(cur_track<13 && about_flag == 0)
		{
		cur_track = cur_track + 1;
	   open_photo(cur_track-1);
		panning_map(cur_track-1);
	    pl.handleClick({'target':pl.links[cur_track-1]}); 
		}
		else
		{
			$(".about_container").css({"height":$(window).height()});
			about_flag = 1;
			
		}
		break;

        default: return; // exit this handler for other keys
		
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
		}});   
	   

   //$(".nav_list li").addClass("trans");
   $(".nav_list_img").addClass("trans");
   nav_li_reset();
   initializing();
   
   
   


   // end navigation

   // map mask
   $(".bengaluru_map_mask").mouseover(function() {
      $(".bengaluru_photo").addClass("slide_up");
   });

   $(".bengaluru_map_mask").mouseout(function() {
      $(".bengaluru_photo").removeClass("slide_up");
   });


   $(".bengaluru_map_mask").click(function() {
      $(this).addClass("compress");
      $(".bengaluru_photo").addClass("slide_out");
      photo_slide_out_flag = 1;
      $(".bengaluru_photo").css({
         "margin-top": parseInt(-($(".bengaluru_photo").height() - 120)),
         "left": "60"
      });
	  bengalurumap.setZoom(15);
	 panning_map(15);
   });

   $(".bengaluru_photo").click(function() {
      photo_slide_back();
	  bengalurumap.setZoom(14);
	  panning_map(cur_track-1);
   });

   // end map mask	
	
	
	
	
	// map initialization
	
	
   // when going out of the body
   
   //share

	 
	 // mute function
	 var sound_flag = 0;
	 $(".volume_icon").click(function(){
		if(sound_flag==0)
		{
		 soundManager.mute();
		 sound_flag = 1;
		 $(".volume_icon").addClass("mute");
		}
		else
		{
		sound_flag = 0;	
		soundManager.unmute();
		 $(".volume_icon").removeClass("mute");
		}
		});
	
	// full screen
	
	
	 $(".fullscreen_icon").click(function(){
		
    toggleFullScreen() ;
		 
		});
		
		//about page 
		
		
		$(".footer_nav li").click(function(){
			if(about_flag ==0)
			{
			$(".about_container").css({"height":$(window).height()});
			about_flag = 1;
			}
			else
			{
			$(".about_container").css({"height":0});
			about_flag = 0;
			}
		});
		
		$(".author_container .close_btn").click(function(){
			
			$(".about_container").css({"height":0});
			about_flag = 0;
			});


});

$(window).on('beforeunload', function() {
   $(window).scrollTop(0);
});

$(window).resize(function() {
	// full screen icon
	
	if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {$(".fullscreen_icon").removeClass("full");
    } else if (document.documentElement.msRequestFullscreen) {$(".fullscreen_icon").removeClass("full");
    } else if (document.documentElement.mozRequestFullScreen) {$(".fullscreen_icon").removeClass("full");
    } else if (document.documentElement.webkitRequestFullscreen) {$(".fullscreen_icon").removeClass("full");
    }
  } else {
    if (document.exitFullscreen) {$(".fullscreen_icon").addClass("full")
    } else if (document.msExitFullscreen) {$(".fullscreen_icon").addClass("full")
    } else if (document.mozCancelFullScreen) {$(".fullscreen_icon").addClass("full")
    } else if (document.webkitExitFullscreen) {$(".fullscreen_icon").addClass("full")
    }
  }
  
  
   initializing();
   if(photo_slide_out_flag == 0)
   {
    panning_map(cur_track-1);
   }
   else
   {
	   panning_map(12);
	   bengalurumap.setZoom(12);
   }
});
