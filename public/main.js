var app = angular.module("app", [ "ngRoute", "ngCookies"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

    $routeProvider     
    .when('/', {
        templateUrl : 'mainPage.html'
        //controller  : 'mapController'
    });
}]);

/*app.directive('actionMenu', function() {
    return {
        restrict: 'E',
        template: '<div class="circle_menu"><i class="fa fa-bars menu_btn"></i></div><div class="menu"><i class="fa {{page.icon}} menu_itm" ng-repeat="page in vm.pages" ng-click="vm.open(page.tpl)"></i></div>',
        link: function(scope, element, attrs){
            element.on('click', toggle);
            function toggle() {
                element.toggleClass('open');
            }
        }
    };
});
app.directive('actionMenus', function() {
    return {
        restrict: 'E',
        template: '<div class="circle_menu"><i class="fa fa-bars menu_btn"></i></div><div class="menu"><i class="fa {{page.icon}} menu_itm" ng-repeat="page in dm.pages" ng-click="dm.open(page.tpl)"></i></div>',
        link: function(scope, element, attrs){
            element.on('click', toggle);
            function toggle() {
                element.toggleClass('open');
            }
        }
    };
});
app.directive('actionMenusd', function() {
    return {
        restrict: 'E',
        template: '<div class="circle_menu"><i class="fa fa-bars menu_btn"></i></div><div class="menu"><i class="fa {{page.icon}} menu_itm" ng-repeat="page in lm.pages" ng-click="lm.open(page.tpl)"></i></div>',
        link: function(scope, element, attrs){
            element.on('click', toggle);
            function toggle() {
                element.toggleClass('open');
            }
        }
    };
});
*/


app.service('Map', function($q, $cookies) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(34.056524, -117.821153),
            zoom: 18
            //disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }

    this.center = function(res) {
        this.map.setCenter(res);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.position,
            animation: google.maps.Animation.DROP, 
            //url : res.url
            icon : res.icon
        });
        /*
        google.maps.event.addListener(this.marker, 'click', function() {
            window.location.href = this.url; });
        google.maps.event.addListener(this.marker, 'click', function() {
            window.location.href = this.url; });
        google.maps.event.addListener(this.marker, 'mouseover', function() {
            res.name.open(this.map, this.marker);
        });
        this.marker.addListener('mouseout', function() {
            res.name.close();
        });*/
        return this.marker;
    }

    this.removeMarker = function(res){
        for(i = 0; i < res.length; i++){
            res[i].setMap(null);
        }
    }
    
});