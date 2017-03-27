/**
 * Created by fuckingnoob on 2017/1/23.
 */
function getContent(event, contentType) {
    var content = document.getElementsByClassName("index-main-tab");
    for (var i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    document.getElementById(contentType).style.display = "block";
}