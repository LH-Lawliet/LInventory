$.fn.resizeText = function (options) {

    var settings = $.extend({ maxfont: 40, minfont: 4 }, options);

    var style = $('<style>').html('.nodelays ' +
    '{ ' +
        '-moz-transition: none !important; ' +
        '-webkit-transition: none !important;' +
        '-o-transition: none !important; ' +
        'transition: none !important;' +
    '}');

    function shrink(el, fontsize, minfontsize)
    {
        if (fontsize < minfontsize) return;

        el.style.fontSize = fontsize + 'px';

        if (el.scrollHeight > el.offsetHeight) shrink(el, fontsize - 1, minfontsize);
    }

    $('head').append(style);

    $(this).each(function(index, el)
    {
        var element = $(el);

        element.addClass('nodelays');

        shrink(el, settings.maxfont, settings.minfont);

        element.removeClass('nodelays');
    });

    style.remove();
}


let currentTimer = {
    "stopAt":0,
    "startedAt":0,
    "baseText":"",
    "callback":null,
}

window.addEventListener('message', function(event) {
    loadingEvent(event)
})

function loadingEvent(event) {
    let action = event.data.action
    if (action == "createTimer") {
        let time = event.data.time || 1.0

        $('#loadingBar').css("display", "block");
        currentTimer["startedAt"] = Date.now();
        currentTimer["stopAt"] = currentTimer["startedAt"]+time*1000;
        currentTimer["baseText"] = event.data.text || '[#%#]'
        currentTimer["callback"] = event.data.callbackName
        if (event.data.backgroundIMG) {
            $('#insideLoadingBar').css("background-image", event.data.backgroundIMG);
        } else {
            $('#insideLoadingBar').css("background-image", "linear-gradient(0.25turn, rgba(200, 200, 200, 0.8), rgba(200, 200, 200, 0.8))");
        }

        let interval = setInterval(() => {
            let now = Date.now()
            const timeElapsed = now - currentTimer["startedAt"];
            let pourcent = (timeElapsed/(currentTimer["stopAt"]-currentTimer["startedAt"]))*100
            if (pourcent > 100.0){
                pourcent = 100.0
            }
            
            $('#insideLoadingBar').css('width', pourcent+'%');
            let barSize = 100*(1/(pourcent/100)+0.0001) 
            $('#insideLoadingBar').css("background-size", barSize+"%");
            
            let text = currentTimer["baseText"].replace('[#%#]', Math.round(pourcent)+" %")

            text = text.replaceAll('[#timeLeft#]', timeDifferenceText(currentTimer["stopAt"]-currentTimer["startedAt"]-timeElapsed))

            text = text.replaceAll('[#timeLeftSmall#]', timeDifferenceText(currentTimer["stopAt"]-currentTimer["startedAt"]-timeElapsed, "", "d", "h", "min", "sec"))

            text = text.replaceAll('[#timeLeftMini#]', timeDifferenceText(currentTimer["stopAt"]-currentTimer["startedAt"]-timeElapsed, "", "d", "h", "m", "s"))

            $('#loadingBarText').text(text);
            $('#loadingBarText').resizeText();

            if (pourcent >= 100) {
                clearInterval(interval)
                $('#loadingBar').css("display", "none");
                $('#insideLoadingBar').css('width', '0%');

                if (currentTimer["callback"]) {
                    /*$.post('https://vlife/LOADINGBARCALLBACK', event.data.callbackName);*/
                    fetch(`https://${GetParentResourceName()}/LOADINGBARCALLBACK`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body:JSON.stringify({
                            event: currentTimer["callback"]
                        })
                    }).then(resp => resp.json()).then(resp => console.log(resp));
                }
                resetTimer()
            }
        }, 100);
    } else if (action == "quitTimer") {
        $('#loadingBar').css("display", "none");
        $('#insideLoadingBar').css('width', '0%');
        resetTimer()
    } 
}

function resetTimer() {
    currentTimer = {
        "stopAt":0,
        "startedAt":0,
        "baseText":"",
        "callback":null,
    }
}


function timeDifferenceText(total=0, s = "s", dayText=" jour", hourText=" heure", minText=" minute", secText=" seconde"){
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
    text = ""

    if (days) {
        text+=days+dayText
        if (days>1) {text+=s}
        text+=" "
    }
    if (hours) {
        text+=hours+hourText
        if (hours>1) {text+=s}
        text+=" "
    }
    if (minutes) {
        text+=minutes+minText
        if (minutes>1) {text+=s}
        text+=" "
    }
    if (seconds) {
        text+=seconds+secText
        if (seconds>1) {text+=s}
        text+=" "
    }  
    return text
}

//loadingEvent({"data":{"action":"createTimer", "time":75.0, "text":'Tu perce le mur [#%#] | [#timeLeft#] | [#timeLeftSmall#] | [#timeLeftMini#]', "backgroundColor":"rgba(255, 0, 170, 0.8)"}});