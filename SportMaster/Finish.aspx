<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Finish.aspx.cs" Inherits="SportMaster.Finish" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Site.css" rel="stylesheet" />
    <script src="Scripts/main.js"></script>
    <script src="Scripts/jquery-1.8.2.min.js"></script>
    <script src="https://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
    <title></title>
</head>
<body>
    <script type="text/javascript">
        var pictosend = "<%=geteratedImage %>";
        var uid = <%=uid%>;

        $("#ReadyDiv").hide();

        //VK.init(4167193);

        //VK.api("friends.get", (1 == 1) ? { "fields": "photo_medium" } : { "offset": 0 * 12, "fields": "photo_medium", "count": 12 }, function(data) {
        //    for (var i = 0; i < 12; i++) {
        //        $($("#Friends .friend .photo")[i]).removeClass("selected");
        //        $($("#Friends .friend .photo")[i]).css("backgroundImage", "url(" + data.response[i].photo_medium + ")").attr("data", data.response[i].uid);
        //        $($("#Friends .friend .name")[i]).html(data.response[i].first_name + "<br />" + data.response[i].last_name);
        //    }
        //});
    </script>

    <form id="form1" runat="server">
    
    <div id="FinishDiv">
        <a href="http://vk.com/sportmaster" target="_parent" id="BackToGroup"></a>
        <div id="FinalImage">
            <img src="Genegated/<%=geteratedImage %>" />
        </div>
        <div id="ShareButton" onclick="SendToFriend_Click(pictosend);"
            onmousedown="$(this).css('background-image', 'url(Images/sendfriend/sf_click.png)');"
            onmouseover="$(this).css('background-image', 'url(Images/sendfriend/sf_hover.png)')"
            onmouseout="$(this).css('background-image', '')"></div>

        <div id="ShareSelfButton" onclick="SendSelf_Click(pictosend);"
            onmousedown="$(this).css('background-image', 'url(Images/self/self_click.png)');"
            onmouseover="$(this).css('background-image', 'url(Images/self/self_hover.png)')"
            onmouseout="$(this).css('background-image', '')"></div>
            
        <div id="GoStartButton" onclick="window.location = 'Constructor.aspx?uid=<%=uid %>'"
             onmousedown="$(this).css('background-image', 'url(Images/onemore/onemore_click.png)');"
             onmouseover="$(this).toggleClass('GoStartButtonOver')"
             onmouseout="$(this).toggleClass('GoStartButtonOver')"></div>

        <div id="SendBackgroud" style="display: none;"/>
    </div>

    <div id="ReadyDiv">
             <div id="ReadyOneMore" onclick="window.location = 'Constructor.aspx?uid=<%=uid %>'"
             onmousedown="$(this).css('background-image', 'url(Images/onemore/onemore_click.png)');"
             onmouseover="$(this).css('background-image', 'url(Images/onemore/onemore_hover.png)');"
             onmouseout="$(this).css('background-image', 'url(Images/onemore/onemore.png)');"></div>
        
            <div id="ReadyBack" onclick="SelectedFriendId = undefined; $('#ReadyDiv').fadeOut();"
             onmousedown="$(this).css('background-image', 'url(Images/back/back_click.png)');"
             onmouseover="$(this).css('background-image', 'url(Images/back/back_hover.png)');"
             onmouseout="$(this).css('background-image', 'url(Images/back/back.png)');"></div>
        
            <div id="ReadyHeader">ОТКРЫТКА ОТПРАВЛЕНА!</div>
            <div id="ReadyText"></div>
    </div>
    
    <div id="ErrorBg" style="display: none;"></div>
    <div id="ErrorImg">
        <div id="ErrorOk" onclick="$('#ErrorBg').hide(); $('#ErrorImg').hide();"
             onmouseover="$(this).toggleClass('ErrorOkHover')"
             onmouseout="$(this).toggleClass('ErrorOkHover')"></div>
    </div>
    
    </form>
</body>
</html>
