function PCGAMEITPAE2CSV(){
    $(".titleframe").hide();
    $(".darkframe").hide();
    $(".admin_nav").hide();

    $( ".admin_content" ).append( "<div class=\"titleframe PCGameitDates\"></div><br>" );
    $('.titleframe.PCGameitDates').html("ACCEPTED UPDATED ON => "+localStorage.getItem("PCGameitADate") + ' ' + '<button class="btn_green_white_innerfade btn_border_2px btn_medium" onclick="download("AcceptedCuratorCopies.csv",localStorage.getItem("PCGameitDLA2CSV"))">Download</button>'+"<br>" +
	"PENDING UPDATED ON &nbsp;&nbsp;=> "+localStorage.getItem("PCGameitPDate") + ' ' + '<button class="btn_green_white_innerfade btn_border_2px btn_medium" onclick="download(\"AcceptedCuratorCopies.csv\",localStorage.getItem("PCGameitDLA2CSV"))">Download</button>'+"<br>" +
	"EXCLUDED UPDATED ON => "+localStorage.getItem("PCGameitEDate")+"<br>" );

    $( ".admin_content" ).append( "<div class=\"titleframe PCGameitPCSV\"></div><br>" );
    $('.titleframe.PCGameitPCSV').html(localStorage.getItem("PCGameitPCSV"));
    $( ".admin_content" ).append( "<div class=\"titleframe PCGameitECSV\"></div><br>" );
    $('.titleframe.PCGameitECSV').html(localStorage.getItem("PCGameitECSV"));
    $( ".admin_content" ).append( "<div class=\"titleframe PCGameitACSV\"></div><br>" );
    $('.titleframe.PCGameitACSV').html(localStorage.getItem("PCGameitACSV"));
}


