var opened = false;
var selectedSport = 0;
var sports = ["Его любимый вид спорта", "Футбол", "Велосипед", "Хоккей", "Бег", "Лыжи", "Бокс", "Сноуборд", "Тренажеры"];

function ButtonPickerClick() {
    if (!opened) {
        $("#PickerDiv").animate({
            height: "200px"
        }, 500, function () {
            opened = true;
            PickerHover(false);
        });
        
    } else {
        $("#PickerDiv").animate({
            height: "45px"
        }, 500, function () {
            //$("#PickerValues").hide();
            opened = false;
            PickerHover(false);
        });
    }
}

function PickerHover(hover) {
    var btn = "down";
    
    if (opened) {
        btn = "up";
    }
    if (hover) {
        $("#PickerButton").css('background-image', 'url(Images/picker/' + btn + '_hover.png)');
    } else {
        $("#PickerButton").css('background-image', 'url(Images/picker/' + btn + '.png)');
    }
    
}


function PickerItemClick(sportid) {
    selectedSport = sportid;
    var idBut = "#PickerItemButton" + sportid;
    var idText = "#PickerItemText" + sportid;
    
    $(".PickerItemButton").removeClass("selected");
    $(idBut).addClass("selected");
    
    $(".PickerItemText").removeClass("selected");
    $(idText).addClass("selected");

    $("#PickerValue").empty();
    $("#PickerValue").append(sports[selectedSport]);
    $("#PickerValue").css("color", "#2863cd");
    ReadySport = true;

    SetReadyEnabled(false);

    ButtonPickerClick();
}
