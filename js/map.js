function loadMap() {
    var locationsArray = [];
    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'js/locations.json', false); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == 200) {
            locationsArray = JSON.parse(xobj.responseText);
            console.log("success");
          }
          else {
              console.log("error");
          }
    };
    xobj.send();  
    
    var mapOptions = {
        center: new google.maps.LatLng(50.4200776,30.396708),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker;
    locationsArray.forEach(function(location, i, locationsArray) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationsArray[i].coordinates[1], locationsArray[i].coordinates[0]),
            map: map,
            title: locationsArray[i].name
        }); 
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locationsArray[i].address);
              infowindow.open(map, marker);
            }
          })(marker, i));
          
    });
}


