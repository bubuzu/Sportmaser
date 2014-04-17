var DemPhoto = "", MemPhoto = "";
var BackId = 1, BacksCount = 20;
var HeadId = 1, HeadsCount = 14;
var FriendPages = 1, FriendPage = 1, SelectedFriend = 0, SelectedContentId, SelectedContentType = 1;
var SelectedFriendName = "";
var SelectedFriendId = undefined;
var imageid = "";

var AllFriends;
var FilteredFriends;
var ReadyToGo = false;
var ReadySport = false;

function SendToFriend_Click(pictosend) 
{
    imageid = pictosend;
    $("#SendBackgroud").fadeIn("normal");
    $.post("ajax.ashx?m=sendFriend", function (r) {
        $("#SendBackgroud").html(r);
        
        VK.init(4167193);
        VK.api("friends.get", { "fields": "photo_50", "order": "name" }, function (data)
        {
            AllFriends = data.response;
            FilteredFriends = AllFriends;
            FriendPages = Math.ceil(AllFriends.length / 12);
            FillFriends(1);
        });
    });
}


function FilterFriends(filter) {

    if (filter == undefined || filter == "") {
        FilteredFriends = AllFriends;
        FriendPages = Math.ceil(AllFriends.length / 12);
        FillFriends(1);
    } else {
        FilteredFriends = [];
        for (var i = 0; i < AllFriends.length; i++) {
            if ((AllFriends[i].first_name.toLowerCase().indexOf(filter.toLowerCase())>=0)||
            (AllFriends[i].last_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0))
            {
                FilteredFriends.push(AllFriends[i]);
            }
        }
        FriendPages = Math.ceil(FilteredFriends.length / 12);
        FillFriends(1);
    }
}



function SendSelf_Click(pictosend) {
    imageid = pictosend;
    PostContent(imageid);
}

function FriendsClose_Click() {
    $("#FriendsBackgroud").fadeOut("fast");
}

function FillFriends(page)
{
    var j = -1;
    for (var i = 12 * (page - 1) ; i < (12 * page) ; i++)
    {
        var curF = $($("#Friends .friend")[++j]);
        curF.removeClass("selected");
        if (FilteredFriends.length > i) {

            curF.attr("userid", FilteredFriends[i].uid);
            curF.attr("uname", FilteredFriends[i].first_name + ' ' + FilteredFriends[i].last_name);
            
            $($("#Friends .friend .photo")[j]).css("backgroundImage", "url(" + FilteredFriends[i].photo_50 + ")");
            $($("#Friends .friend .name")[j]).html(FilteredFriends[i].first_name + "<br />" + FilteredFriends[i].last_name);
        } else {
            $($("#Friends .friend .photo")[j]).css("backgroundImage", "url()");
            $($("#Friends .friend .name")[j]).html("");
        }
    }

    $("#FriendPageCounter").html(page + "/" + FriendPages);
}

function PostContent(id, fid) {
    if (SelectedFriendId == undefined) {
        VK.api("photos.getWallUploadServer", {}, function (data) {
            $.post("ajax.ashx?m=UploadToVK", { "uploadurl": data.response.upload_url, "imageid": id }, function (r) {
                r = $.parseJSON(r);
                VK.api("photos.saveWallPhoto", { "photo": r.photo, "server": r.server, "hash": r.hash }, function (data) {
                    VK.api("wall.post", { "message": "Узнаешь себя на этой открытке? ) С праздником, Настоящий защитник! Создай свою открытку тут: http://vk.com/app4194594_4274495", "attachments": data.response[0].id }, function (data) {
                        if (data.response != undefined) {
                            var href = "http://vk.com/id" + uid;
                            $("#ReadyText").html("<a href='" + href + "' target='_blank'>Вам</a> точно понравится:)");
                            $("#ReadyDiv").fadeIn();
                            $.post("ajax.ashx?m=Shared", { "uid": uid, "fid": uid, "pic": imageid }, function (data) { });
                        }
                    });
                });
            });
        });
    }
    else {
        VK.api("photos.getWallUploadServer", { "uid": SelectedFriendId }, function (data) {
            $.post("ajax.ashx?m=UploadToVK", { "uploadurl": data.response.upload_url, "imageid": id }, function (r) {
                r = $.parseJSON(r);
                VK.api("photos.saveWallPhoto", { "photo": r.photo, "server": r.server, "hash": r.hash, "uid": SelectedFriendId }, function (data) {
                    VK.api("wall.post", { "owner_id": SelectedFriendId, "message": "Узнаешь себя на этой открытке? ) С праздником, Настоящий защитник! Создай свою открытку тут: http://vk.com/app4194594_4274495", "attachments": data.response[0].id }, function (data) {
                        if (data.response != undefined) {
                            var href = "http://vk.com/id" + SelectedFriendId;
                            $("#ReadyText").html("<a href='" + href + "' target='_blank'>" + SelectedFriendName + "</a> точно обрадуется:)");
                            $("#ReadyDiv").fadeIn();
                            $.post("ajax.ashx?m=Shared", { "uid": uid, "fid": SelectedFriendId, "pic": imageid }, function(data) {
                            });
                        } else {
                            $("#ErrorBg").show();
                            $("#ErrorImg").fadeIn();
                        }
                    });
                });
            });
        });
    }
}


function SendToFriendPhoto_Click(sender) {
    //$("#Friends .friend .photo").removeClass("selected");
    $("#Friends .friend").removeClass("selected");
    SelectedFriendId = $(sender).attr("userid");
    SelectedFriendName = $(sender).attr("uname");
    $(sender).addClass("selected");
}

//function FriendsSendButton_Click() {
//    VK.api('wall.post', { owner_id: SelectedFriend, message: 'Привет! Я поздравил тебя с Новым годом с помощью приложения «Зимняя сказка Raffaello». Поздравь и ты меня :)  http://vk.com/app3274884' }, function (data) {
//    });
//}

function FriendsClose_Click() {
    $("#SendBackgroud").fadeOut("fast");
}

function FriendsSendButton_Click()
{
    PostContent(imageid, SelectedFriendId);
}

function FriendsLeft() {
    if (FriendPage > 1) {
        FriendPage--;
        FillFriends(FriendPage);
    }
}

function FriendsRight() {
    if (FriendPage < FriendPages - 1) {
        FriendPage++;
        FillFriends(FriendPage);
    }
}

function initSlider(type, obj)
{
    $(".categorydiv").removeClass("catselected");

    if (obj != undefined)
    {
        $(obj).addClass("catselected");
    }

    $.post("ajax.ashx?m=LoadSlider", { "tp": type }, function (r) {
        $("#SliderControlDiv").html(r);
        $('#slider1').lemmonSlider({
            infinite: false
        });
    });
}

function SelectImage(type, id)
{
    switch (type)
    {
        case 'bg':
            {
                bgid = id;
                $("#ImageDiv").css("background-image", "url(Images/bg/" + id + ".jpg)");
                break;
            }
        case 'head':
            {
                headid = id;
                $("#ImgHead").css("background-image", "url(Images/head/" + id + ".png)");
                break;
            }
        case 'eye':
            {
                eyeid = id;
                $("#ImgEye").css("background-image", "url(Images/eye/" + id + ".png)");
                break;
            }
    }

}

function SetReadyEnabled(hover)
{
    if (ReadySport) {
        if ($("#txtFriend").val() != "" && ($("#txtFriend").val() != undefined)) {
            ReadyToGo = true;
            $("#GoFinish").css('cursor', 'pointer');
            if (hover) {
                $("#GoFinish").css('background-image', 'url(Images/ready/ready_hover.png)');
            } else {
                $("#GoFinish").css('background-image', 'url(Images/ready/ready.png)');
            }
        } else {
            ReadyToGo = false;
            $("#GoFinish").css('cursor', 'default');
            $("#GoFinish").css('background-image', 'url(Images/ready/ready_unactive.png)');
        }
    }
}

function LatRus(TxtTrans1, a) {
    TxtTrans1 == 'lat' ? TxtTrans1 = 'rus' : TxtTrans1 = 'lat';
    lat0 = 'qwertyuiopasdfghjkl;\'zxcvbnm\,QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>`~[].'.split('');
    lat = 'qwertyuiopasdfghjkl;\'zxcvbnm\,QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>`~'.split('');
    lat.push('\\['); lat.push('\\]'); lat.push('\\.');
    rus = ('йцукенгшщзфывапролджэячсмитьбЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮёЁхъю').split('');
    function transF(p) { ar1 = lat; ar2 = rus; if (TxtTrans1 == 'lat') { ar2 = lat0; ar1 = rus } for (var i = 0; i < ar1.length; i++) { trans = '/' + ar1[i] + '/gm'; p = p.replace(eval(trans), ar2[i]) } return p; } return transF(a)
}
