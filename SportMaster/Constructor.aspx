<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Constructor.aspx.cs" Inherits="SportMaster.Constructor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="Site.css" rel="stylesheet" />
    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="Scripts/main.js"></script>
    <script src="Scripts/slider.js"></script>
    <script src="Scripts/picker.js"></script>
    <script>
        var uid = <%=uid%>;
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="MainDiv">
        <a href="http://vk.com/sportmaster" target="_parent" id="BackToGroup"></a>

        <div id="ImageHead">
            <div id="ImgBeard"></div>
            <div id="ImgBrow"></div>
            <div id="ImgEye"></div>
            <div id="ImgHair"></div>
            <div id="ImgGlass"></div>
        </div>

        <div id="FriendNameValue" >
            <input id="txtFriend" placeholder="Как зовут друга для поздравления" type="text"  onkeyup="SetReadyEnabled();"/>
        </div>
        <div id="PickerDiv">
            <div id="PickerButton" onclick="ButtonPickerClick();"
                onmouseover="PickerHover(true)"
                onmouseout="PickerHover(false)"></div>
            <div id="PickerValue">Его любимый вид спорта</div>
            <div id="PickerValues">
                <div class="PickerItem" onclick="PickerItemClick(1);">
                    <div id="PickerItemButton1" class="PickerItemButton"></div>
                    <div id="PickerItemText1" class="PickerItemText">Футбол</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(2);">
                    <div id="PickerItemButton2" class="PickerItemButton"></div>
                    <div id="PickerItemText2" class="PickerItemText">Велосипед</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(3);">
                    <div id="PickerItemButton3" class="PickerItemButton"></div>
                    <div id="PickerItemText3" class="PickerItemText">Хоккей</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(4);">
                    <div id="PickerItemButton4" class="PickerItemButton"></div>
                    <div id="PickerItemText4" class="PickerItemText">Бег</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(5);">
                    <div id="PickerItemButton5" class="PickerItemButton"></div>
                    <div id="PickerItemText5" class="PickerItemText">Лыжи</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(6);">
                    <div id="PickerItemButton6" class="PickerItemButton"></div>
                    <div id="PickerItemText6" class="PickerItemText">Бокс</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(7);">
                    <div id="PickerItemButton7" class="PickerItemButton"></div>
                    <div id="PickerItemText7" class="PickerItemText">Сноуборд</div>
                </div>
                <div class="PickerItem"  onclick="PickerItemClick(8);">
                    <div id="PickerItemButton8" class="PickerItemButton"></div>
                    <div id="PickerItemText8" class="PickerItemText">Тренажеры</div>
                </div>
            </div>
        </div>

        <div id="GoFinish" onclick="GoFinish();" 
            onmouseover="SetReadyEnabled(true);" 
            onmouseout="SetReadyEnabled(false);">
        </div>

        <div id="CategoryMain">
            <div id="CategorySlider">
                <div class="CategoryItem">
                    <div class="CategoryItemText">Лицо</div>
                    <div class="CategoryItemPhoto" style="background-image: url(Images/constructor/menu/head/1.png)"></div>
                    <div class="CategoryItemFrame selected" data="head" tag ="#ImageHead"></div>
                </div>
                <div class="CategoryItem">
                    <div class="CategoryItemText">Волосы</div>
                    <div class="CategoryItemPhoto" style="background-image: url(Images/constructor/menu/hair/1.png)"></div>
                    <div class="CategoryItemFrame" data="hair" tag ="#ImgHair"></div>
                </div>
                <div class="CategoryItem">
                    <div class="CategoryItemText">Глаза</div>
                    <div class="CategoryItemPhoto" style="background-image: url(Images/constructor/menu/eye/1.png)"></div>
                    <div class="CategoryItemFrame" data="eye" tag ="#ImgEye"></div>
                </div>
                <div class="CategoryItem">
                    <div class="CategoryItemText">Брови</div>
                    <div class="CategoryItemPhoto" style="background-image: url(Images/constructor/menu/brow/1.png)"></div>
                    <div class="CategoryItemFrame" data="brow" tag ="#ImgBrow"></div>
                </div>
                <div class="CategoryItem">
                    <div class="CategoryItemText">Борода</div>
                    <div class="CategoryItemPhoto" style="background-image: url(Images/constructor/menu/beard/2.png)"></div>
                    <div class="CategoryItemFrame" data="beard" tag ="#ImgBeard"></div>
                </div>
                 <div class="CategoryItem">
                    <div class="CategoryItemText">Очки</div>
                    <div class="CategoryItemPhoto" style="background-image: url(Images/constructor/menu/glass/1.png)"></div>
                    <div class="CategoryItemFrame" data="glass" tag ="#ImgGlass"></div>
                </div>
            </div>
        </div>
        <div id="CatLeftArrow" onclick="moveBW();" 
            onmousedown="SetArrowBg($(this), 'LArrow_c.png', false);"
            onmouseover="SetArrowBg($(this), 'LArrow_h.png', false);"
            onmouseout="SetArrowBg($(this), 'LArrow.png', false);"></div>
        <div id="CatRightArrow" onclick="moveFW();" 
            onmousedown="SetArrowBg($(this), 'RArrow_c.png', true);"
            onmouseover="SetArrowBg($(this), 'RArrow_h.png', true);"
            onmouseout="SetArrowBg($(this), 'RArrow.png', true);"></div>
        
        <div id="Items">
            
        </div>
        
        <div id="ColorLabel">Цвет:</div>

        <div id="Colors">
            <div class="ColorItem"></div>
        </div>
        
        <div id="RemoveDiv" onclick="RemoveSelected();"></div>

    </div>
    </form>
    <div style="visibility: hidden">
        <img src="Images/ready/ready_hover.png"/>
    </div>
</body>
</html>
