// ==UserScript==
// @name         PCGameit Curator Checker
// @namespace    https://github.com/MalikAQayum/PCGameit
// @version      2.3
// @description  Does things on the Curator admin page (Pending/Accepted/Excluded)
// @author       MalikQayum
// @connect      dl.dropboxusercontent.com
// @connect      dropbox.com
// @include      /^https?://store\.steampowered\.com/curator/33779114-pcgameit/admin/
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/Linkfix.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/accepted.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/pending.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/ajaxrequests.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/barter.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/barter_v2.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/verPCGamit.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/autoExtendOffers.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/ExcludedExpireSort.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/CountAccepted.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/PCGAMEITPAE2CSV.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/Accepted2CSV.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/AcceptedTable.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/Pending2CSV.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/Excluded2CSV.js
// @require     https://github.com/MalikAQayum/PCGameit/raw/master/functions/download.js
// @downloadURL https://github.com/MalikAQayum/PCGameit/raw/master/PCGameit.user.js
// @updateURL   https://github.com/MalikAQayum/PCGameit/raw/master/PCGameit.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at      document-idle
// ==/UserScript==

var re_admin = new RegExp(/admin/);
if(document.URL.match(re_admin))
{
    Linkfix();
    verPCGamit();
    ajaxrequests();
}

var re_overview = new RegExp(/overview\/pcgameit/);
if(document.URL.match(re_overview))
{
    PCGAMEITPAE2CSV();
    var checkDate = new Date();
    checkDate.setHours(checkDate.getHours() - 6);

    if(checkDate < new Date(localStorage.getItem("PCGameitADate"))){
        download("AcceptedCuratorCopies.csv",localStorage.getItem("PCGameitDLA2CSV"))
    }else{
        $('.titleframe.PCGameitDates').append('<br><h4>Accepted needs to be Updated!</h4>');
    }

    if(checkDate < new Date(localStorage.getItem("PCGameitPDate")) && checkDate < new Date(localStorage.getItem("PCGameitEDate"))){
        if(new Date(localStorage.getItem("PCGameitPDate")) < new Date(localStorage.getItem("PCGameitEDate"))){
            $('.titleframe.PCGameitDates').append('<br><h4>Pending page needs to be pressed before Excluded page! try again!</h4>');           
        }else{
            download("PendingCuratorCopies.csv",localStorage.getItem("PCGameitDLPECSV"))
        }

    }else{
        $('.titleframe.PCGameitDates').append('<br><h4>Pending/Excluded needs to be Updated!</h4>');
    }
}


var re_PAE = new RegExp(/admin\/(accepted*|pending*|excluded*)/);
if(document.URL.match(re_PAE))
{
    GM_addStyle(`
	table { border-collapse: collapse; width: 100%; }
	th, td { text-align: left; padding: 8px; }
	.expires_soon { color: #ff6666; font-size: 16px; font-weight: bolder;}
`);

    var baseURL = "https://www.dropbox.com/s/o592uy2nceq9nh9/db.json?raw=1";
    (function (dbURL) {
        GM_xmlhttpRequest ( {
            synchronous:    true,
            method:         "HEAD",
            url:            dbURL,
            onload:         function (response) {
                var re_accepted = new RegExp(/accepted/);
                if(document.URL.match(re_accepted))
                {
                    autoExtendOffers();
                    Accepted2CSV();
                    CountAccepted();
                    // When the regular Accepted page exceeds 1900 packages accepted move to this: https://store.steampowered.com/curator/33779114-pcgameit/admin/accepted?ajax=1
                    accepted(response.finalUrl);
                }

                var re_pending = new RegExp(/pending/);
                if(document.URL.match(re_pending))
                {
                    autoExtendOffers();
                    Pending2CSV();
                    //barter();
                    //barter_v2();
                    pending(response.finalUrl);
                }

                var re_excluded = new RegExp(/excluded/);
                if(document.URL.match(re_excluded))
                {
                    autoExtendOffers();
                    ExcludedExpireSort();
                    Excluded2CSV();
                }
            }
        } );
    } ) (baseURL);
}