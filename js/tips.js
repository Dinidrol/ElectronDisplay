function downloads_tips() {
    $.getJSON("http://localhost:63342/public/tips1.json", function (data){
        if(data.success){
            console.log("OK");
        }else{
            console.log("ERROR");
        }
    });
}