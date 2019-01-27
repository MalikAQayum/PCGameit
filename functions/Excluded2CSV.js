function Excluded2CSV(){
    localStorage.removeItem("PCGameitDLPECSV");
    var ExcludedAppidArr=[];
    var ExcludedHTML = document.documentElement.innerHTML;
    var appidRegex= /app-ctn-[0-9]+/g;
    $.each(ExcludedHTML.match(appidRegex), function(index, value) {
        ExcludedAppidArr.push(value.replace("app-ctn-",""));
    });
    var E2CSV = "Appid,Title,Copies,Expire date<br>";
    var PE2CSV = localStorage.getItem("PCGameitDLP2CSV");
    for (let i = 0; i < ExcludedAppidArr.length; i++) {
        var excludedString = $( "#app-ctn-"+ExcludedAppidArr[i] + "> div.offer_ctn > div.app_ctn.app_header > div > div.app_name_ctn").html();
        excludedString = excludedString.replace(/\s\s+/g, ' ');
        excludedString += "\"";
        excludedString = excludedString
            .replace(/<span class="app_name">/g, '"')
            .replace(/<\/span> <br>You have been offered /g, '",')
            .replace(/ copy. <br>This offer will expire on /g, ',"')
            .replace(/ copies. <br>This offer will expire on /g, ',"')
            .replace(/",one,"/g, '",1,"')
            .replace(/. "/g, '"');
        E2CSV += ExcludedAppidArr[i]+","+excludedString + "<br>";
        PE2CSV += ExcludedAppidArr[i]+","+excludedString + "<br>";
        localStorage.setItem("PCGameitECSV", E2CSV);

        localStorage.setItem("PCGameitDLPECSV", PE2CSV.replace(/<br>/g, "\r\n"));

        localStorage.setItem("PCGameitEDate", new Date());
        //PCGameitECSV += ExcludedAppidArr[i]+","+excludedString + "<br>");;
    }
    if ($(".admin_content")[0]){
        //download("hello.csv",E2CSV.replace(/<br>/g, "\r\n"));
        //$( ".admin_content" ).append( "<div class=\"titleframe E2CSV\"></div><br>" );
        //$('.titleframe.E2CSV').html(E2CSV);
    } else {
        $( ".darkframe" ).prepend( "<div class=\"titleframe E2CSV\"></div><br>" );
        $('.titleframe.E2CSV').html(E2CSV);
    }
}