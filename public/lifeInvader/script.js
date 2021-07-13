$(document).ready(function () {
    // Listen for NUI Events
    window.addEventListener('message', function (event) {
        if (event.data.action == "openLifeInvader") {
            $('#liveInvader').css("display", "block");
            $('#liveInvaderPage').attr("src", "https://lifeinvader.sunfive.fr")
        }
        if (event.data.action == "closeLifeInvader") {
            $('#liveInvader').css("display", "none");
        }
    });

    // On 'Esc' call close method
    document.onkeyup = function (data) {
        if (data.which == 27) {
            CloseLifeInvader()
        }
    };
    // Handle Button Presses
    $("#buttonLifeInvader").click(function () {
        CloseLifeInvader();
    });

    function CloseLifeInvader() {
        $.post('https://'+GetParentResourceName()+'/CLOSELIFEINVADER', JSON.stringify({}));
    };
});
