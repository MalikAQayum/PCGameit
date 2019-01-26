function barter(){
    console.log("\nList generated for Barter.vg\n");
    console.log( $(".app_name").get().map(e => e.innerText).sort().join("\n"));
    console.log("\n\n");
}