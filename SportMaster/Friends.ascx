<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Friends.ascx.cs" Inherits="SportMaster.Friends" %>
<link href="Site.css" rel="stylesheet" type="text/css" />
<script>
    $("#txtFilter").keyup(function () {
        
        FilterFriends($("#txtFilter").val());
    });
</script>
<div id="FriendsBlock">
<div id="Friends">
    <div class="friend" uname="" userid="0" onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
    <div class="friend" uname="" userid="0"  onclick="SendToFriendPhoto_Click(this)"><div class="photo"></div><div class="name"></div></div>
</div>
<div id="FriendsLeftArrow" onclick="FriendsLeft()" 
            onmousedown="$(this).css('background-image', 'url(Images/arrows/LArrow_c.png)');"
            onmouseover="$(this).css('background-image', 'url(Images/arrows/LArrow_h.png)')"
            onmouseout="$(this).css('background-image', 'url(Images/arrows/LArrow.png)')"></div>
<div id="FriendsRightArrow" onclick="FriendsRight()" 
            onmousedown="$(this).css('background-image', 'url(Images/arrows/RArrow_c.png)');"
            onmouseover="$(this).css('background-image', 'url(Images/arrows/RArrow_h.png)')"
            onmouseout="$(this).css('background-image', 'url(Images/arrows/RArrow.png)')"></div>
<div id="FriendsCancelButton" onclick="FriendsClose_Click();"            
            onmousedown="$(this).css('background-image', 'url(Images/back/back_click.png)');"
            onmouseover="$(this).css('background-image', 'url(Images/back/back_hover.png)')"
            onmouseout="$(this).css('background-image', 'url(Images/back/back.png)')"></div>
<div id="FriendsSendButton" onclick="FriendsSendButton_Click();"
            onmousedown="$(this).css('background-image', 'url(Images/send/send_click.png)');"
            onmouseover="$(this).css('background-image', 'url(Images/send/send_hover.png)')"
            onmouseout="$(this).css('background-image', 'url(Images/send/send.png)')"></div>
<div id="FriendFilter">
    <input id="txtFilter" type="text" onkeydown="" style="border-style: none; border-color: inherit; border-width: medium; width: 131px; font-family: 'CoTextCorpRegular'" />
</div>
    
<div id="FriendPageCounter"></div>
</div>
