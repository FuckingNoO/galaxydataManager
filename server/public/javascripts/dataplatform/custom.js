/**
 * @param event
 * @param contentType
 */
function getContent(event, contentType) {
    var content = document.getElementsByClassName("content");
    for (var i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    document.getElementById(contentType).style.display = "block";
    document.getElementById('subdir-name').innerHTML = event.target.innerHTML;
}
/**
 * jquery code
 */
$(function () {
    $('input[name=dtcb]').change(function(){
        if (this.checked) {
            $('[data-type='+ $(this).val() + ']').show();
        }else{
            $('[data-type='+ $(this).val() + ']').hide();
        }
    });
})