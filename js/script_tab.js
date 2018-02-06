
var nav_tab_flag =0;

$(document).ready(function() {


	

   //navigation 
   if(window.innerWidth<=1024) // for tabs
   {
   $("nav").click(function() { // nav open
		if(nav_tab_flag==0)
		{
      $(this).addClass("open");
	  $(".nav_icon").addClass("open");
      nav_open_flag = 1;
      nav_li_delay(1);
      $(".nav_btn").addClass("hide");
      nav_tab_flag=1;
	  close_social();
		}
   });
	
	 $(".nav_icon").click(function() { // nav open
	if(nav_tab_flag==0)
		{
      $("nav").addClass("open");
	  $(".nav_icon").addClass("open");
      nav_open_flag = 1;
      nav_li_delay(1);
      $(".nav_btn").addClass("hide");
		 nav_tab_flag=1;
		 close_social();
		}
   });
   
   
   $(".bengaluru_photo").click(function() {
	
		 nav_close();
		 nav_tab_flag =0;
		 close_social();
		
	});
   
   $(".bengaluru_map_mask").click(function() {
	
		 nav_close();
		 nav_tab_flag =0;
		 close_social();
		
	});
	  $(".bengaluru_map").click(function() {
	
		 nav_close();
		 nav_tab_flag =0;
		 close_social();
		
	});
   
   var share_flag = 0
   
    $(".share_btn").click(function(){
	   if(share_flag == 0)
	   {

	   
	   $(".facebook").addClass("open");
	   $(".twitter").addClass("open");
	   $(this).addClass("open");
		share_flag = 1;
	   }
	   else
	   {
	  
	   close_social();
	   }
	 });
   
	function close_social()
	{
		$(".share_btn").removeClass("open");
	   $(".facebook").removeClass("open");
	   $(".twitter").removeClass("open");
	   share_flag = 0;
	}
  } 
    
});