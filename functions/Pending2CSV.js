function Pending2CSV(){
    localStorage.removeItem("PCGameitDLP2CSV");
    var PendingAppidArr=[];
    var PendingHTML = document.documentElement.innerHTML;
    var appidRegex= /app-ctn-[0-9]+/g;
    $.each(PendingHTML.match(appidRegex), function(index, value) {
        PendingAppidArr.push(value.replace("app-ctn-",""));
    });
    var P2CSV = "Appid,Title,Copies,Expire date<br>";
    for (let i = 0; i < PendingAppidArr.length; i++) {
        var pendingString = $( "#app-ctn-"+PendingAppidArr[i] + "> div.offer_ctn > div.app_ctn.app_header > div > div.app_name_ctn").html();
        pendingString = pendingString.replace(/\s\s+/g, ' ');
        pendingString = pendingString
            .replace(/<span class="app_name">/g, '"')
            .replace(/<\/span> <br>You have been offered /g, '",')
            .replace(/ copy. <br> <span class="">This offer will expire on /g, ',"')
            .replace(/ copy. <br> <span class="expires_soon">This offer will expire on /gm, ',"')
            .replace(/ copies. <br> <span class="">This offer will expire on /g, ',"')
            .replace(/ copies. <br> <span class="expires_soon">This offer will expire on /gm, ',"')
            .replace(/",one,"/g, '",1,"')
            .replace(/<\/span>/g, '"')
            .slice(0, -3);

        P2CSV += PendingAppidArr[i]+","+pendingString + "\"<br>";
        localStorage.setItem("PCGameitPCSV", P2CSV);
        localStorage.setItem("PCGameitDLP2CSV", P2CSV.replace(/<br>/g, "\r\n"));
        localStorage.setItem("PCGameitPDate", new Date());
        //PCGameitPCSV += PendingAppidArr[i]+","+pendingString + "<br>";
    }
    if ($(".admin_content")[0]){
        //$( ".admin_content" ).append( "<div class=\"titleframe P2CSV\"></div><br>" );
        //$('.titleframe.P2CSV').html(P2CSV);
    } else {
        $( ".darkframe" ).prepend( "<div class=\"titleframe P2CSV\"></div><br>" );
        $('.titleframe.P2CSV').html(P2CSV);
    }
}