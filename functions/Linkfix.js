function Linkfix(){
    $("[data-navid=pending]").attr("href","#").attr("onclick","window.open('https://store.steampowered.com/curator/33779114-pcgameit/admin/pending', '_self');");
    $("[data-navid=accepted]").attr("href","#").attr("onclick","window.open('https://store.steampowered.com/curator/33779114-pcgameit/admin/accepted', '_self');");
    $("[data-navid=excluded]").attr("href","#").attr("onclick","window.open('https://store.steampowered.com/curator/33779114-pcgameit/admin/excluded', '_self');");
    $( "<a data-navid=\"excluded\" class=\"icon_item icon_pending\" href=\"#\" onclick=\"window.open('https://store.steampowered.com/curator/33779114-pcgameit/admin/excluded', '_self');\">Excluded games</a>" ).insertAfter("[data-navid=accepted]");
    $( "<a href=\"#\" onclick=\"window.open('https://store.steampowered.com/curator/33779114-pcgameit/admin/overview/pcgameit', '_self');\">PCGameit</a>" ).insertBefore(".nav_right_side");
}