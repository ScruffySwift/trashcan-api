angular.module("app").controller('mapController', ['$rootScope', '$document', 'Map', '$scope', '$location', '$cookies', '$http', '$window', '$interval', function($rootScope, $document, Map, $scope, $location, $cookies, $http, $window, $interval) {
$scope.place = {};
var resl;
var marks = [];
if($rootScope.reload == true){
    $window.location.reload(true);
}
var message = [];
message.push({lat: 34.056678,lon: -117.821287, name: "trash0", status : "empty"});
message.push({lat: 34.057504,lon: -117.821595, name: "trash1", status : "empty"});
message.push({lat: 34.056098,lon: -117.820624, name: "trash2", status : "empty"});
message.push({lat: 34.056918,lon: -117.820758, name: "trash3", status : "empty"});
message.push({lat: 34.057538,lon: -117.823186, name: "trash4", status : "empty"});
message.push({lat: 34.056387,lon: -117.820058, name: "trash5", status : "empty"});
message.push({lat: 34.056138,lon: -117.821472, name: "trash6", status : "empty"});
message.push({lat: 34.057875,lon: -117.820737, name: "trash7", status : "empty"});
message.push({lat: 34.057062,lon: -117.821807, name: "trash8", status : "empty"});
message.push({lat: 34.055336,lon: -117.820925, name: "trash9", status : "empty"});
//var message2 = $cookies.getObject('locationChoice');
//var message3 = $cookies.getObject('locationChoice2');
//if(message3 != undefined){var message = message2.concat(message3);}
//else{var message = message2;}
//console.log(message);
Map.init()
drop();
var pins = [];
var empty = [];
var full = [];
count = 0;
$interval(function(){
    $http.get('/api')
        .then(function(res){
        //if(count == 1){
          empty = [];
          full = [];
          pins = res.data;
          //pins= [{name: "trash0", status : "full"}];
          for(i = 0; i < pins.length; i++){
            if(pins[i].status != message[i].status)
            {
                if(pins[i].status == "empty")
                {
                    message[i].status = "empty";
                    empty.push(message[i]);
                }
                else{
                    message[i].status = "full";
                    full.push(message[i]);
                }

            }
          }
          changeToFull(full);
          changeToEmpty(empty);
          //} 
          count++;     
        });
},10000);
/*$scope.search = function() {
    console.log('swag'); //swaggy
    $scope.apiError = false;
    Map.search($scope.searchPlace)
    .then(
        function(res) { // success
            $scope.place.name = res.name;
            $scope.place.lat = res.geometry.location.lat();
            $scope.place.lng = res.geometry.location.lng();
            resl = new google.maps.LatLng(34.058, -117.818);
            message = {};
            Map.removeMarker(marks);
            Map.center(resl);
            $cookies.putObject('geoPlace', resl);
            marks = [];
            message = [];
            var swaggy = '/map?location=' + $scope.place.lat + "_" + $scope.place.lng;
            console.log(swaggy);
            $http.get(swaggy)
                .then(function(res){
                    var yolo = [];
                    if(Papa.parse(res.data).data.length > 10){
                      for(i = 0; i <10; i++){
                        yolo.push(Papa.parse(res.data).data[i]);
                        message.push(Papa.parse(res.data).data[i]);
                      }
                      var rekt = [];
                      for(i = 10; i < (Papa.parse(res.data).data.length -1); i++){
                        rekt.push(Papa.parse(res.data).data[i]);
                        message.push(Papa.parse(res.data).data[i]);
                      }
                      $cookies.putObject('locationChoice', yolo);
                      $cookies.putObject('locationChoice2', rekt);
                    }
                    else{
                      for(i = 0; i < (Papa.parse(res.data).data.length-1); i++){
                        yolo.push(Papa.parse(res.data).data[i]);
                        message.push(Papa.parse(res.data).data[i]);
                      }
                      $cookies.putObject('locationChoice', yolo);
                      $cookies.putObject('locationChoice2', []);
                    }
                    drop();
            });

        },
        function(status) { // error
            $scope.apiError = true;
            $scope.apiStatus = status;
        }
    );
}*/


    
$scope.send = function() {
    alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
}
    
function drop() {
    var icon = 'images/Lini.png';
    for(i = 0; i < message.length; i++){
        //console.log("YASSSS");
        var pos = new google.maps.LatLng(message[i].lat, message[i].lon);
        res = {position : pos,
                icon : icon};
                //url : message[i][6],
                //name: new google.maps.InfoWindow({ content: '<div id="content" style="color:black">' + message[i][0] + '<div> <div id="content" style="color:black">' + message[i][3] + '<div>', position : pos})};
        marks.push(Map.addMarker(res));
    }
}

function changeToFull(pins){
    var icon2 = 'images/alsothisimagetooplease.gif';
    //Map.removeMarker(pins);
    for(i = 0; i < pins.length; i++){
        var pos = new google.maps.LatLng(pins[i].lat, pins[i].lon);
        res = {position : pos,
            icon : icon2};
        marks.push(Map.addMarker(res));
    }
}

function changeToEmpty(pins){
    var icon3 = 'images/Lini.png';
    //Map.removeMarker(pins);
    for(i = 0; i < pins.length; i++){
        var pos = new google.maps.LatLng(pins[i].lat, pins[i].lon);
        res = {position : pos,
            icon : icon3};
        marks.push(Map.addMarker(res));
    }
}

//var dm = this;

//activate();

/*function activate() {
    dm.open = open;
    dm.pages = [{
    'tpl': '/map',
    'icon': 'fa-map'
    }, {
    'tpl': '/table',
    'icon': 'fa-table'
    }, {
    'tpl': '/dataentry',
    'icon': 'fa-pencil'
    }];
    dm.active = dm.pages[0].tpl;
}*/

function open(page) {
    $location.path(page);
}


}]);