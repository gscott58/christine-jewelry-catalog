"use strict";

let JScatalogItems = [];
let JSONcatalogItems = [];
let JSONcatalogItemsRpt = [];

const buildCatalogReport = async () => {
    /*-----------------------*/
    /*- Fetch/Catalog/Items -*/
    /*-----------------------*/
    let response  = await fetchCatalogData();
    let fetchData = response;

    if (fetchData) {
        JSONcatalogItems = fetchData;
        JScatalogItems = JSON.parse(fetchData);
        JScatalogItems.sort((a, b) => a.catalog_pk.localeCompare(b.catalog_pk));
    } else {
        JScatalogItems = JSON.parse(localStorage.getItem("JSON_catalogItem_LS"));
    }
    
    $("#c0100").append("<p class='month-name'><span class='month-name-color'>Family Tree Price List</span></p>");
    $("#c0100").append("<table id='c0100-days'></table>");

    $("#c0400").append("<p id='c0400' class='month-name'><span class='month-name-color'>Christine Jewelry Creations</span><br><i>Handcrafted, One of a Kind Earrings<br>(<small>Buy 2 Pair, Get 3rd Pair Free!)<br>(All Sales Final!)</small></i></p>");
    $("#c0400").append("<div id='c0400-days'></div>");

    let catalogItemClass = [];
    let splitCatalogItemRpt = [];
    let i = 0;          

/*   
    $("#c0400-days").append (
        "<tr>" + 
            "<th>" + "<span class='gen-01-color'>Handcrafted Earrings</span>" + "</th>" +
            "<th>" + "<span class='gen-01-color'>Description</span>" + "</th>" +
            "<th>" + "<span class='gen-01-color'>Price</span>" + "</th>" +
            "<th>" + "<span class='gen-01-color'>Details</span>" + "</th>" +
        "</tr>" 
    );
*/

/*-------------------------*/
/*- Process Jewelry Items -*/
/*-------------------------*/
for (i=0; i < JScatalogItems.length; i++) {

    switch ( JScatalogItems[i].catalog_class ) {

                case "0400":

                    if (JScatalogItems[i].catalog_item_available == "n") {
                        JScatalogItems[i].catalog_partno = "sold-white";
                    }

                    $("#c0400-days").css("display","block");
                    $("#c0400-days").append
                        (
                        "<div class='col-3 jewelry-item '>" +
                            "<p>" +
                            JScatalogItems[i].catalog_description +
                            "</p>" +

                            "<figure>" +
                                "<img class='catalog-photo'  src='images/jewelry-" +
                                JScatalogItems[i].catalog_class +
                                "-" +
                                JScatalogItems[i].catalog_partno +
                                ".jpg" +                  
                                "'>"   +
                            "</figure>" +

                            "<p>"  +
                            "<span class='item-sheet'>" +
                            JScatalogItems[i].catalog_bin + 
                            ": (" +
                            JScatalogItems[i].catalog_bin_loc + 
                            ")" +
                            "</span>" +
                            "<span class=' money-color item-price'>" +
                            JScatalogItems[i].catalog_price +
                            "</span>" +
                            "</p>" +
                            
                        "</div>"
                        );
                        break;
        default:
//                    alert ("*** Invalid Catalog Item Code *** :" +
//                    catalogItemClass[0] );
//                    break;
    }  // end switch statement . . .

} // end for loop . . .

    $("#browser-back-btn").val("Go Back");
    $("#jewelry-item-report").show(2000);
    $("#copyright-1").show(2500);
    $("#copyright-2").show(3000);
    $("#email-contact-us").show(3500);
    $("#company-name").show(4000);

    //console.log("-----------------------------");
    //console.log("- " + JSONcatalogItemsRpt.length + " :Total Catalog Items . . . -");
    //console.log("-----------------------------");
}//end buildCatalogReport ()=> function. . .


async function fetchCatalogData () {  
    let fetch_url = "";
    let href         = " https://gscott58.github.io/apidataserver";
    let dataDir      = "/json";
    let familyDir    = "/jewelry";
    let fileName     = "/jewelry-catalog";

    let urlParms = new URLSearchParams(window.location.search);

    if (urlParms.has("f")) {
        if (urlParms.get('f') == 1) {familyDir= "/scott/";}
        if (urlParms.get('f') == 2) {familyDir= "/watkins/";}
        if (urlParms.get('f') == 3) {familyDir= "/christine/";}
        fetch_url = href + dataDir + familyDir + fileName + ".json";
    } else {
        fetch_url = href + dataDir + familyDir + fileName + ".json";
    }

    try {
        const response = await fetch (fetch_url, {cache: "no-store"});
        const textData = await response.text();
        //console.log("*******************************");
        //console.log("***  Connected to Internet  ***" );
        //console.log("*******************************");
        return textData;
    } catch {
        //console.log("***");
        //console.log("No Internet Connection . . .");
        //console.log("*******************************");
        //console.log("Working From localStorage . . .");
        //console.log("*******************************");
        if (!localStorage.getItem("JSON_catalogItem_LS")) {
            //console.log("But . . .");
            //console.log("***************************");
            //console.log("localStorage Cleared. . .  ");
            //console.log("****************************");
            //console.log("***");
        }
        return false;
    }
} //end fetchCatalogData . .

$(document).ready( async () => {
//------------------//
//- Document Ready -//
//------------------//
   //alert ("Window Inner Width: " + window.innerWidth);

    buildCatalogReport();

    $("#logo-image").attr("src","icon/favicon-red.png");
    $("#logo-tagline").text("Christine Jewelry Creations . . .");
    $("title").html("GCS - Christine Jewelry Price List");

    $("#tabs-5").click (()=> {
        $("#tab-css").attr("href", "css/catalog_pricelist.css");
    });

//  $("#tab-5-css").attr("href","css/catalog_pricelist.css");

    let colorSchemes = [
        "css/colorscheme/grey-on-pink.css",
        "css/colorscheme/grey-on-red.css",
        "css/colorscheme/black-on-red.css"
    ];

    $("#color-switcher").attr("href", colorSchemes[1]);

    var today = new Date();
    $("#copyright-1").html("&copy; Copyright " + today.getFullYear());

    $("footer").hover(function() {
        $("#copyright-1").effect("shake");
        }, function() {
        $("#email-contact-us").effect("shake");
    });
  
//--------------------//
//- Set Browser Keys -//
//--------------------//
    $(document).on("contextmenu", ()=> {return false;});

    document.body.addEventListener('keydown', event => {
        if (event.ctrlKey && 'cfnjvxspwuatyz'.indexOf(event.key) !== -1) {
          event.preventDefault()
        }

        if (event.ctrlKey && event.shiftKey && 'CIJKPNV'.indexOf(event.key) !== -1) {
            event.preventDefault()
        }

        if (event.altlKey && 'EF'.indexOf(event.key) !== -1) {
            event.preventDefault()
        }

        if (event.shiftKey && event.code == "F10") {
            event.preventDefault()
        }

        if (event.code == "F12") {
            event.preventDefault()
        }
    })

    }); //end document ready . . .    