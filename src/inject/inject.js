chrome.extension.sendMessage({}, function (response) {
    if ((window.location.pathname.split('/')[2] !== "cache" && window.location.pathname.split('/')[3] !== "view") || !document.getElementById("addressList")) {
        return false;
    }
    var addresses = [];

    //getting script tag from page which makes addresses array
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].innerHTML.indexOf("var street, city, country, state, lat, lon") >= 0) {
            // When scriptag is found, remove showAddresses function from it and run rest of script to populate
            // addresses array
            eval(scripts[i].innerHTML.replace("showAddresses();", ""))
        }
    }

    // create map link base
    var googlemapsAB = "https://www.google.com/maps/dir/My+Location";
    var googlemapsBA = "https://www.google.com/maps/dir/My+Location";

    // create from A->B link url
    addresses.forEach(function (address) {
        googlemapsAB += "/" + address.lat + "," + address.lon;
    });

    // create from B->A link url
    addresses.reverse().forEach(function (address) {
        googlemapsBA += "/" + address.lat + "," + address.lon;
    });
    // create links
    var ABlink = '<a href="' + googlemapsAB + '" class="btn btn-xs btn-default" target="_blank"><span class="glyphicon glyphicon-globe"></span> A->B</a>';
    var BAlink = '<a href="' + googlemapsBA + '" class="btn btn-xs btn-default" target="_blank">B->A <span class="glyphicon glyphicon-globe"></span></a>';
    // add links to webpage
    document.getElementById("addressList").innerHTML = "Google maps " + (window.location.pathname.split('/')[1] === "fi" ? "reittilinkit" : "route links") + " : " + ABlink + " " + BAlink + "<br />" + document.getElementById("addressList").innerHTML;
});
