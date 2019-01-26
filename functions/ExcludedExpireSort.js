function ExcludedExpireSort(){
    var elems = jQuery("[id*='app-ctn-']").get().sort((a, b) => {
        var curyear = (new Date()).getFullYear();
        var ad = new Date(jQuery(a).find(".app_name_ctn").html().split("<br>").pop() + ", " + curyear);
        var bd = new Date(jQuery(b).find(".app_name_ctn").html().split("<br>").pop() + ", " + curyear);
        return ad.valueOf() - bd.valueOf();
    });

    jQuery("[id*='app-ctn-']").remove();
    jQuery(".pending_games").append(elems);
}