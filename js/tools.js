var myApp = myApp || {};

/*** TOOLS ***/

myApp.tools = {
    
    makeAjaxRequest: function (httpMethod, url, callback, proporties) {
        var request = new XMLHttpRequest();
        request.open(httpMethod,url, true);
        
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200 && request.responseText ) {
                var json = JSON.parse(request.responseText);
                callback(json, proporties);
                return true;
            }else{
                return false;
            }
        };
        request.send(null);
    },
    
    purifyObject: function (obj) {
        obj = JSON.stringify(obj);
        return JSON.parse(obj);
    },
    
    createUrl: function (queryParams) {
        var url = 'https://api.edamam.com/search?';
        
        for (var key in queryParams) {
            if(queryParams[key]){
                url += key + '=' + queryParams[key] + '&';
            }
        }
        return url.slice(0,url.length-1)
    },
    
    getRightUriAndId: function (uri) {
        if(uri.indexOf('#') !== -1){
            var object = {
                id: uri.match(/#([^#]*.)/)[1],
                uri: uri.replace('#', '%23')
            } 
        }
        return object;
    },
    
    cleanQueryParams: function (){
        for (var prop in myApp.queryParams) {
            if (prop !== 'app_id' && prop !== 'app_key') {
                myApp.queryParams[prop] = null;
            }
        }
    },
    
    isFavorite: function(favoriteRecipes, recipeId ) {
        if(favoriteRecipes.length !== 0 && favoriteRecipes.indexOf(recipeId) !== -1) {
            return "class='js-favorite'";
        }
    }
}