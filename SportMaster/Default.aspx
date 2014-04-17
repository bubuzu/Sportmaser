<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SportMaster.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.8.2.min.js"></script>
</head>
<body style="margin: auto">
    <form id="form1" runat="server">
    <div style="width: 800px; height: 700px; background-image: url(Images/Start.jpg);" >
        <a href="Constructor.aspx?uid=<% =uid %>" style="width: 259px; height: 90px; position: absolute; top: 537px; left: 271px; background-image: url(Images/start_hover.png)"
            onmouseover="$(this).css('background-image', 'url(Images/start_hover.png)')"
            onmouseout="$(this).css('background-image', '')"
            onclick="$(this).css('background-image', 'url(Images/start_down.png)')"/>
    </div>
    </form>
</body>
</html>
