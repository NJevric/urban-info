window.onload=function(){
    console.log("cao");
let prom="Donji Milanovac"
    $.ajax({
        url: `https://api.teleport.org/api/`,
        method: "get",
        dataType: "json",
        success: function (data) {
            console.log(data._links);
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
    $.ajax({
        url: `https://api.teleport.org/api/cities/?search=${prom}`,
        method: "get",
        dataType: "json",
        success: function (data) {
            
            console.log(data);
            console.log(data._embedded["city:search-results"][0].matching_full_name);
        },
        error:function(xhr){
            console.log(xhr);
        } 
    });
}