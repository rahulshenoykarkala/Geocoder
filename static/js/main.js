const upload = (event) => {
    const files = $("#file")[0].files;
    const formData = new FormData();
    formData.append('file', files[0], files[0].name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    xhr.send(formData);
    xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) {
            result = JSON.parse(this.responseText)
            if(result.success){
                $("#result_container").attr("class", "alert alert-success")
                $("#result_container").html(`Geolocation file has been generated successfully. 
                Please click the following button to download the processed file.<br/> 
                <div class="text-center my-4"><a class="btn btn-success" href="${result.download_link}">Download</a></div>`)
            }
            else{
                $("#result_container").attr("class", "alert alert-danger")
                $("#result_container").html(`There has been an error processing your request.`)
            }
        }
    };
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$("#file_input").click(function() {
    $("#file_input").val("")
    $("#upload").addClass("disabled")
    $("input#file").click();
});
$("input#file").on("change", function(){
    $("input#file")[0].files.length && $("#file_input").val($("input#file")[0].files[0].name) && $("#upload").removeClass("disabled")
});
$("button[type='reset']").on("click", function(){
    $("#upload").addClass("disabled")
});
$("#upload").click(function(e){
    e.preventDefault();
    upload();
})