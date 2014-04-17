
var canRight = true;

var values = { "head": 0, "hair": 0, "eye": 0, "brow": 0, "beard": 0, "glass": 0 };
var pics = { "head": "", "hair": "", "eye": "", "brow": "", "beard": "", "glass": "" };
var heads = ["s","n","f"];
var colors = { "hair": "b", "eye": "bl", "brow": "b", "beard": "b" };
var owners = { "head": "#ImageHead", "hair": "#ImgHair", "eye": "#ImgEye", "brow": "#ImgBrow", "beard": "#ImgBeard", "glass": "#ImgGlass" };

var selectedCat = "head";

function moveFW() {
    if (canRight) {
        canRight = false;
        $("#CategorySlider").animate({
            left: "-=180"
        }, 500, function () {
            SetArrowBg($("#CatRightArrow"), "RArrow_disable.png", true);
            SetArrowBg($("#CatLeftArrow"), "LArrow.png", false);
        });
    }
}

function moveBW() {
    if (!canRight) {
        canRight = true;
        $("#CategorySlider").animate({
            left: "+=180"
        }, 500, function () {
            SetArrowBg($("#CatLeftArrow"), "LArrow_disable.png", false);
            SetArrowBg($("#CatRightArrow"), "RArrow.png", true);
        });
    }
}

function SetArrowBg(button, bgImage, fw) {
    if (fw) {
        if (canRight) {
            button.css("background-image", "url(Images/arrows/" + bgImage + ")");
        } else {
            button.css("background-image", "url(Images/arrows/RArrow_disable.png)");
        }
    } else {
        if (!canRight) {
            button.css("background-image", "url(Images/arrows/" + bgImage + ")");
        } else {
            button.css("background-image", "url(Images/arrows/LArrow_disable.png)");
        }
    }
}

function LoadItems(par, tag) {

    selectedCat = par;

    $("#Items").hide();
    $("#Colors").hide();

    $("#Items").empty();
    $("#Colors").empty();

    InitColors(par);

    switch (par) {
        case "head": case "eye": case "brow":
            {
                for (var i = 1; i < 4; i++) {
                    if (par == "head") {
                        $("#ColorLabel").hide();

                        AppendItem(par, i, i == values[par], tag, undefined, false);
                    } else {
                        if (par == "hair" && i == 3)
                        {
                            AppendItem(par, i, i == values[par], tag, colors[par], true);
                        } else
                        {
                            AppendItem(par, i, i == values[par], tag, colors[par], false);
                        }

                        $("#Colors").fadeIn();
                        $("#ColorLabel").fadeIn();
                    }
                    
                }
                break;
            }
        case "beard": 
            {
                $("#Colors").fadeIn();
                $("#ColorLabel").fadeIn();

                for (var i = 1; i < 5; i++) {
                    AppendItem(par, i, i == values[par], tag, colors[par], true);
                }
                break;
            }
        case "glass":
            {
                $("#ColorLabel").hide();

                for (var i = 1; i < 4; i++) {
                    AppendItem(par, i, i == values[par], tag);
                }
                
                break;
            }
            
        case "hair":
            {
                for (var i = 1; i < 5; i++) {
                    if (par == "hair" && i == 3) {
                        AppendItem(par, i, i == values[par], tag, colors[par], true);
                    } else {
                        AppendItem(par, i, i == values[par], tag, colors[par], false);
                    }
                }
                $("#Colors").fadeIn();
                $("#ColorLabel").fadeIn();
                break;
            }
    }

    intiItems(par);
    
    if (values[par] == 0) {
        var fst = $("#Items").children(":first");
        ItemOnClick(fst, par);
    }

    $("#Items").fadeIn();
}

function AppendItem(par, id, selected, tag, col, usehead) {
    
    var picid = GetImageUrl(id, col, usehead);

    var imagurl = "Images/constructor/final/" + par + "/" + picid;

    var text = "<div class='Item' data='" + id + "' tag='" + tag + "' picid='" + picid + "' par='" + par + "' imagurl='" + imagurl + "' style='background-image: url(Images/constructor/menu/" + par + "/" + id + ".png)'></div>";
    if (selected) {
        text = "<div class='Item selected' data='" + id + "' tag='" + tag + "' picid='" + picid + "' par='" + par + "' imagurl='" + imagurl + "' style='background-image: url(Images/constructor/menu/" + par + "/" + id + ".png)'></div>";

        var left = 458 + 90 * (id - 1);
        $("#RemoveDiv").css("left", left + "px");
        $("#RemoveDiv").show();
    }
    $("#Items").append(text);
    
}


function GetImageUrl(id, col, usehead) {
    var picid = id + ".png";

    if (col != undefined) {
        picid = id + col + ".png";
    }

    if (usehead) {
        if (values["head"] > 0) {
            picid = heads[values["head"] - 1] + picid;
        } else {
            picid = "s" + picid;
        }
    }
    return picid;
}

window.onload = function () {
    $(".CategoryItemFrame").click(function () {
        $(".CategoryItemFrame").removeClass("selected");
        $(this).addClass("selected");
        LoadItems($(this).attr("data"), $(this).attr("tag"));
    });
    LoadItems("head", "#ImageHead");

    var catid = "eye";
    values[catid] = 1;
    pics[catid] = "1bl.png";
    ChangeBack("Images/constructor/final/" + catid + "/1bl.png", owners[catid], catid);
    
    catid = "brow";
    values[catid] = 1;
    pics[catid] = "1b.png";
    ChangeBack("Images/constructor/final/" + catid + "/1b.png", owners[catid], catid);
    
    catid = "hair";
    values[catid] = 1;
    pics[catid] = "1b.png";
    ChangeBack("Images/constructor/final/" + catid + "/1b.png", owners[catid], catid);
};

function RemoveSelected() {
    $(".Item").removeClass("selected");
    values[selectedCat] = 0;
    pics[selectedCat] = "";
    
    ChangeBack("", owners[selectedCat], selectedCat);
    $("#RemoveDiv").hide();
}

function intiItems(par)
{
    $(".Item").click(function () {
        ItemOnClick(this, par);
    });
}

function ItemOnClick(owner, par) {
    $(".Item").removeClass("selected");
    $(owner).addClass("selected");

    values[par] = $(owner).attr("data");
    pics[par] = $(owner).attr("picid");
    
    var left = 458 + 90 * (values[par] - 1);
    $("#RemoveDiv").css("left", left + "px");
    $("#RemoveDiv").show();

    ChangeBack($(owner).attr("imagurl"), $(owner).attr("tag"), $(owner).attr("par"));
}

function InitColors(par) {
    switch (par) {
        case "hair": case "brow": case "beard":
            {
                AppendColor("b", par);
                AppendColor("g", par);
                AppendColor("w", par);
                break;
            }
        case "eye":
            {
                AppendColor("bl", par);
                AppendColor("gr", par);
                AppendColor("gra", par);
                AppendColor("br", par);
                break;
            }
    }

    $(".ColorItem").click(function() {
        $(".ColorItem").removeClass("selected");
        $(this).addClass("selected");
        colors[par] = $(this).attr("data");
        
        LoadItems(par, owners[par]);

        $(".Item.selected").click();
    });
}
//Зеленые #2d6c05
//Карие #4d2100
//Голубые #0088c2
//Серые #616161
//Черный - #000000
//Блондинистый - #fff9c5
//Русый - #705d50

function AppendColor(col, par) {

    var bgcolor = "white";
    var selected = false;
    if (col == colors[par]) {
        selected = true;
    }

    switch (col) {
    case "w":
        {
            bgcolor = "#fff9c5";
            break;
        }
    case "b":
        {
            bgcolor = "#000000";
            break;
        }
    case "g":
        {
            bgcolor = "#705d50";
            break;
        }
    case "gr":
        {
            bgcolor = "#2d6c05";
            break;
        }
    case "gra":
        {
            bgcolor = "#616161";
            break;
        }
    case "bl":
        {
            bgcolor = "#0088c2";
            break;
        }
    case "br":
        {
            bgcolor = "#4d2100";
            break;
        }
    }

    var text = "<div class='ColorItem' data='" + col + "' style='background-color: " + bgcolor + "'></div>";

    if (selected) {
        text = "<div class='ColorItem selected' data='" + col + "' style='background-color: " + bgcolor + "'></div>";
    }
    
    $("#Colors").append(text);
}

function ChangeBack(imagurl, tag, par) {
    $(tag).css("background-image", "url(" + imagurl + ")");
    if (par == "head") {
        if (values["hair"] == 3)
        {
            $("#ImgHair").css("background-image", "url(Images/constructor/final/hair/" + heads[values["head"] - 1] + values["hair"] + colors["hair"] + ".png)");
        }
        
        if (values["beard"] != 0) {
            $("#ImgBeard").css("background-image", "url(Images/constructor/final/beard/" + heads[values["head"] - 1] + values["beard"] + colors["beard"] + ".png)");
        }
    }
    
}


function GoFinish() {
    if (ReadyToGo) {
        window.location = "Finish.aspx?bgid=" + $("#cbxBg").val() + "&head=" + pics["head"] +
           "&hair=" + pics["hair"] + "&eye=" + pics["eye"] + "&brow=" + pics["brow"] +
           "&beard=" + pics["beard"] + "&glass=" + pics["glass"] + "&name=" + $("#txtFriend").val() + "&uid=" + uid + "&sport=" + selectedSport;
    }
}