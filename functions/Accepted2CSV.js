var pcgameitcsv ="Appid,Claimer,Date,Claimer,Date,Claimer,Date,Claimer,Date,Claimer,Date \n";
function Accepted2CSV(){
    localStorage.removeItem("PCGameitDLA2CSV");
    var AcceptedAppidArr=[];
    var AcceptedHTML = document.documentElement.innerHTML;
    var appidRegex= /app-ctn-[0-9]+/g;
    $.each(AcceptedHTML.match(appidRegex), function(index, value) {
        AcceptedAppidArr.push(value.replace("app-ctn-",""));
    });
    var A2CSV = "Appid,Title,Review Status,Claimer,Date,Claimer,Date,Claimer,Date,Claimer,Date,Claimer,Date<br>";
    for (let i = 0; i < AcceptedAppidArr.length; i++) {
        var acceptedString = $( "#app-ctn-"+AcceptedAppidArr[i] + "> div.app_accepted > div > div").html();
        var reviewStatus = $( "#app-ctn-"+AcceptedAppidArr[i] + "> div.app_accepted").html();
        reviewStatus = reviewStatus.includes("Reviewed on");
        acceptedString = acceptedString
            .replace("<div class=\"action_head\">","") //0
            .replace("<div class=\"action_date\">","").replace(",","")
            .replace("<div class=\"action_head\">","") //1
            .replace("<div class=\"action_date\">","").replace(",","")
            .replace("<div class=\"action_head\">","") //2
            .replace("<div class=\"action_date\">","").replace(",","")
            .replace("<div class=\"action_head\">","") //3
            .replace("<div class=\"action_date\">","").replace(",","")
            .replace("<div class=\"action_head\">","") //4
            .replace("<div class=\"action_date\">","").replace(",","");
        acceptedString = acceptedString.replace(/\s/g, "");
        acceptedString = acceptedString
            .replace("<div>","")//0
            .replace("<div>","")//1
            .replace("<div>","")//2
            .replace("<div>","")//3
            .replace("<div>","");//4
        acceptedString = acceptedString.replace(/<\/div><\/div>/igm, ",");
        acceptedString = acceptedString.replace(/<\/div>/igm, ",");
        acceptedString = acceptedString.slice(0, -1);

        //pcgameitcsv += AcceptedAppidArr[i] + "," + $( "#app-ctn-"+AcceptedAppidArr[i] + "> div.app_accepted > div > span").html() + ","+ acceptedString + '\n';//full csv
        pcgameitcsv += AcceptedAppidArr[i] + ","+ acceptedString + '\n';//full title cutted
        A2CSV +=  AcceptedAppidArr[i] + ",\"" + $( "#app-ctn-"+AcceptedAppidArr[i] + "> div.app_accepted > div > span").html() + "\"," + reviewStatus + ","+ acceptedString + "<br>";
        localStorage.setItem("PCGameitACSV", A2CSV);
        localStorage.setItem("PCGameitDLA2CSV", A2CSV.replace(/<br>/g, "\r\n"));
        localStorage.setItem("PCGameitADate", new Date());
        //PCGameitACSV +=  AcceptedAppidArr[i] + ",\"" + $( "#app-ctn-"+AcceptedAppidArr[i] + "> div.app_accepted > div > span").html() + "\"," + reviewStatus + ","+ acceptedString + "<br>";
    }
    setTimeout(function(){
        if ($(".admin_content")[0]){
            //$( ".admin_content" ).append( "<div class=\"titleframe A2CSV\"></div><br>" );
            //$('.titleframe.A2CSV').html(A2CSV);
        } else {
            $( ".darkframe" ).prepend( "<div class=\"titleframe A2CSV\"></div><br>" );
            $('.titleframe.A2CSV').html(A2CSV);
        }
    }, 5000);
    setTimeout(function(){AcceptedTable(pcgameitcsv);}, 5000);
}