let currentFuelType = "diesel"

window.addEventListener('message', function(event) {
    let action = event.data.action
    if (action == "showSpeedo") {
        $('#speedo').css("display", "block");
    } else if (action == "hideSpeedo") {
        $('#speedo').css("display", "none");
    } else {
        if (event.data.speed && event.data.speedRatio) {
            $('#SpeedText').text(Math.round(event.data.speed));
            $('#speedBar').css('width', 0.3*(event.data.speedRatio*100)+'%');
            let barSize = 100*(1/event.data.speedRatio+0.0001)+5 
            $('#speedBar').css( "background-size", barSize+'%');
        }
        if (event.data.gear) {
            $('#gear').text(event.data.gear);
        }
        if (event.data.fuelRatio) {
            $('#fuelBar').css( "width", event.data.fuelRatio*2+'vh');
        } 
        if (event.data.fuelType) {
            if (event.data.fuelType != currentFuelType) {
                $('#fuelTypeImg').attr('src', 'speedometer/fuelLogo/'+event.data.fuelType+'.png');
                currentFuelType = event.data.fuelType
            }
        }

        if (event.data.engineHealth) {
            if (event.data.engineHealth == "blank") {
                $('#engine').removeClass()
                $('#engine').addClass('blankFill');
            } else if (event.data.engineHealth == "orange") {
                $('#engine').removeClass()
                $('#engine').addClass('orangeFill');
            } else if (event.data.engineHealth == "red") {
                $('#engine').removeClass()
                $('#engine').addClass('redFill');
            }
        }

        if (event.data.regeneration) {
            if (event.data.regeneration == "disabled") {
                $('#recycling').removeClass()
                $('#recycling').addClass('disabledFill');
            } else if (event.data.regeneration == "blank") {
                $('#recycling').removeClass()
                $('#recycling').addClass('blankFill');
            } else if (event.data.regeneration == "green") {
                $('#recycling').removeClass()
                $('#recycling').addClass('greenFill');
            } else if (event.data.regeneration == "blue") {
                $('#recycling').removeClass()
                $('#recycling').addClass('blueFill');
            }
        }

        if (event.data.route) {
            $('#feu-route').removeClass()
            $('#feu-route').addClass('blueFill');
        } else {
            $('#feu-route').removeClass()
            $('#feu-route').addClass('blankFill');
        }

        if (event.data.position) {
            $('#feu-position').removeClass()
            $('#feu-position').addClass('greenFill');
        } else {
            $('#feu-position').removeClass()
            $('#feu-position').addClass('blankFill');
        }

    }
})