/* Google Maps */
var BENGALURU_MAPTYPE_ID = 'bengaluru_style';
var bengalurumap,overlay,map_pixel_cordinates,map_pixel_cordinates_init ;
var bengaluruLocaties = [
	['Namaste Bengaluru', 12.9796309, 77.5906865, 10, '#location_1', 'icon_1'],
	['Vidhana Soudha', 12.9796309, 77.5906865, 20, '#location_2', 'icon_1'],
	['High Court', 12.9778739, 77.592635, 30, '#location_3', 'icon_1'],
	['Bengaluru Magestic', 12.9766637, 77.5712556, 40, '#location_4', 'icon_1'],
	['Banner Ghata National Park', 12.77012, 77.56777, 50, '#location_5', 'icon_1'],
	['Lal Bagh', 12.9615604, 77.5888194, 60, '#location_6', 'icon_1'],
	['Cubbon Park', 12.9755362, 77.5909996, 70, '#location_7', 'icon_1'],
	['Iskcon Temple', 13.0118137, 77.551429, 80, '#location_8', 'icon_1'],
	['Nandi Hills', 13.370154, 77.683455, 90, '#location_9', 'icon_1'],
	['Bengaluru palace', 12.9986205, 77.5922327, 100, '#location_10', 'icon_1'],
	['Wonderla Amusement Park', 12.8342718, 77.4010444, 110, '#location_11', 'icon_1'],
	['M.Chinnaswamy Stadium', 12.9788752, 77.5995852, 120, '#location_12', 'icon_1'],
	['Kanteerava Indoor Stadium', 12.9695931, 77.5931039, 130, '#location_13', 'icon_1'],
	['Freedom park', 12.9774699, 77.5816279, 140, '#location_14', 'icon_1'],
	['Jawaharlal Nehru Planetarium', 12.9847481, 77.5894428, 150, '#location_15', 'icon_1'],
	['Visvesvaraya Museum', 12.9752264, 77.5963449, 160, '#location_16', 'icon_1'],
	['Brigade/MG Road', 12.9707341, 77.6068176, 170, '#location_17', 'icon_1'],
	['Jayanagara', 12.9259401, 77.5830419, 180, '#location_18', 'icon_1'],
	['Lumbini Garden', 13.0437317, 77.6083479, 190, '#location_19', 'icon_1'],
	['Krishna Raja Market', 12.968183, 77.578717, 200, '#location_20', 'icon_1'],
	['Shiva Mandir Temple', 13.0311387, 77.5910537, 210, '#location_21', 'icon_1'],
	['Ragigudda Temple', 12.9143432, 77.593283, 220, '#location_22', 'icon_1'],
	['Race Course', 12.983946, 77.5797802, 230, '#location_23', 'icon_1'],
	['Gandhi Nagar / Sandalwood', 12.9791734, 77.5770467, 240, '#location_24', 'icon_1'],
	['Pyramid Valley', 12.686124, 77.526122, 250, '#location_25', 'icon_1'],
	['Tipu Sultan Palace', 12.960520, 77.571262, 260, '#location_26', 'icon_1'],
	['Nandi(Bull) Temple', 12.943031, 77.567883, 270, '#location_27', 'icon_1'],
	['St. Marys Basilica', 12.985650, 77.605693, 280, '#location_28', 'icon_1'],
	['Bangalore Fort', 12.962947, 77.576091, 290, '#location_29', 'icon_1'],
	['Devanahalli Fort', 13.248961, 77.709795, 300, '#location_30', 'icon_1'],
	
];

marker_array=[];

function initialize() {
	

	var bengaluruMapOptions = [
	
		{
		elementType: 'labels.text.fill',
			stylers: [{ 
				color: '#000000' 
			}] 
		},
		{
		featureType: 'water', 
			stylers: [{ 
				color: '#d0ecf5' 
			}] 
		},
		{
		featureType: 'road',
		elementType: 'labels.text.fill',
			stylers: [{ 
				color: '#000000' 
			}]
		},
		{
		featureType: 'road',
		elementType: 'labels.text.stroke',
			stylers: [{ 
				visibility:	'on' 
			}]
		},
		{
		featureType: 'road',
		elementType: 'geometry.stroke',
			stylers: [{ 
				color: '#d7d7d7' 
			}]
		},
		{
		featureType: 'road',
		elementType: 'geometry.fill',
			stylers: [{ 
				color: '#ffffff' 
			}]
		},
		{
		featureType: 'transit',
		elementType: 'labels.text.fill',
			stylers: [{ 
				color: '#000000' 
			}]
		},
		{
		featureType: 'transit',
		elementType: 'labels.text.stroke',
			stylers: [{ 
				visibility:	'off' 
			}]
		},
		{
		featureType: 'transit',
		elementType: 'geometry.stroke',
			stylers: [{ 
				color: '#000000' 
			}]
		},
		{
		featureType: 'transit',
		elementType: 'geometry.fill',
			stylers: [{ 
				color: '#d7d7d7' 
			}]
		},
		{
			featureType: 'landscape',	
			stylers: [{ 
				color: '#f7f7f7' 
			}] 
		},
		/*
		{
		featureType: 'poi', 
			stylers: [{ 
				color: '#f7f7f7' 
			}] 
		},*/
	];
	
	var mapOptions = {
		scrollwheel: true,
		navigationControl: false,
    	mapTypeControl: false,
    	scaleControl: false,
    	draggable: true,
		zoom: 14,
		center: new google.maps.LatLng(12.9796309,77.5906865),
		disableDefaultUI: true,
		mapTypeControlOptions: {
		mapTypeIds: [google.maps.MapTypeId.ROADMAP, BENGALURU_MAPTYPE_ID]
		},
		mapTypeId: BENGALURU_MAPTYPE_ID
	};
	
	bengalurumap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	overlay = new google.maps.OverlayView();
	overlay.draw = function() {};
	overlay.setMap(bengalurumap);
	google.maps.event.addListenerOnce(bengalurumap, 'idle', function() { // to adjust map so that the location shows in the bottom
	
	 panning_map(0);
	
	})



	var styledMapOptions = {name: 'Piano Style'};
	var bengalurumapType = new google.maps.StyledMapType(bengaluruMapOptions, styledMapOptions);	
	bengalurumap.mapTypes.set(BENGALURU_MAPTYPE_ID, bengalurumapType);
	
	setMarkers(bengalurumap);
}

function setMarkers(bengalurumap){
	/*
	var myIcon = new google.maps.MarkerImage("images/marker-icon.png", null, null, null, new google.maps.Size(21,30));

var marker = new google.maps.Marker({
	position: myLatLng,
	map: myMap,
	flat: true,
	title: 'My location',
	icon: myIcon
});*/
	
	var url_icon = new google.maps.MarkerImage("images/icons/icon_1_large_def.png", null, null, null, new google.maps.Size(35,35));
	//Loop locations
	for (var i = 0; i < bengaluruLocaties.length; i++) {
    	var marker = new google.maps.Marker({
    		flat: true,
    		icon:url_icon,
        	map: bengalurumap,
        	title: bengaluruLocaties[i][0],
        	position: new google.maps.LatLng(bengaluruLocaties[i][1], bengaluruLocaties[i][2]),  
     	});
		marker_array.push(marker);			
    	addClickEvent(marker,i, bengaluruLocaties[i][4]);
  	}
	 marker_array[0].setIcon(new google.maps.MarkerImage("images/icons/icon_1_large.png", null, null, null, new google.maps.Size(50,50)));
}

function addClickEvent(marker,index, anchor) {
	
  	google.maps.event.addListener(marker, 'click', function() {
		if (cur_track!=index+1)
		{
		 pl.handleClick({'target':pl.links[index]}); 
		}
		 cur_track = index+1
      open_photo(index)
	
      nav_close();
      nav_li_reset();
      photo_slide_back();
	  bengalurumap.setZoom(14);
	   panning_map(index);
		
  	});
}

google.maps.event.addDomListener(window, 'load', initialize);

