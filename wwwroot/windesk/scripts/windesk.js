; layui.define(['jquery', 'layer','alerter'], function (exports) {
    "use strict";
    var $ = layui.$
        , form = layui.form
        , layer = layui.layer
        ,alerter = layui.alerter;

    var WinDesk = function (option) {
        var self = this;
        var options = {
            elem: '.windesk',
            debug: true,
            width: 700,
            height: 500,
            iconalign: 1,//横排还是坚排 0 是横排 1是竖排
            dragicon: true,
            deskicon: [{
                id: 1,
                name: "",
                url: "",
                image: '',
                icon: "",
                class: "",
                style: "",
                type: 0,//0 图标 1分组
                width: 0,//窗口宽
                height: 0,//窗口高
                lock: false,
                children: [
                    {
                        name: "",
                        url: "",
                        icon: "",
                        class: "",
                        style: ""
                    }
                ]
            }],
            startmenu: {
                logo:'',
                sidebar: [],
                submenu: [
                    {
                        name: "",
                        url: "",
                        type: 0,//0 图标 1分组
                        children: [
                            {
                                name: "",
                                url: "",
                                icon: "",
                                class: "",
                                style: "",
                                width: 0,//窗口宽
                                height: 0,//窗口高
                            }
                        ]
                    }
                ]
            },
            contextmenu: [{
                name: '桌面设置',
                icon: 'zw-icon zw-icon-set',
                event: function () {
                    self.Funs.SystemSet();
                }
            },
            {
                name: '',
                icon: '',
                event: null,
                condition: null
            },
            {
                name: '关于我们',
                icon: 'zw-icon zw-icon-about',
                event: function () {
                    self.Funs.AboutUs();
                }
            },
            {
                name: '退出系统',
                icon: 'zw-icon zw-icon-logout1',
                event: function () {
                    self.Funs.Logout();
                }
            }],
            event: {
                desktop: {
                    added: function (o,data,desk) { return 0; },
                    moved: function (li) { },
                    removed: function (id) { }
                }
            }
        };
        options = $.extend({}, options, option);
        this.Options = options;
        this.Grids = [];
        this.GridCount = 200;
        var desktop = [];
        var taskbar = [];
        var taskbarbtns = [];
        var startmenu = [];
        
        this.LoadDesktopIcon = function () {
            desktop = $('<div class="desktop"></div>');
            options.elem.append(desktop);
            this.GetGrid();
            this.SetIcon();
        }
        this.Init = function () {
            if (options.elem == null || options.elem == '') {
                layer.alert("配置出错.", { icon: 1 });
                return;
            }
            if (typeof options.elem == 'string') {
                if (options.elem.indexOf(".") > -1)
                    options.elem = $(options.elem);
                else if (!options.elem.startsWith("#"))
                    options.elem = $("#" + options.elem);
            }
            /*
             * 加载桌面图标
             **/
            this.LoadDesktopIcon();
            if (options.debug) {
                this.ShowGrid();
                this.ShowMoveGrid();
            }
            /**
             * 加载taskbar
             * */
            this.LoadTaskBar();
            /*
             * 加载菜单
             **/
            this.LoadStartMenu();
            /*
             * 加载当前时间
             * */
            this.LoadCurrentTime();
            /*
             * 加载右键菜单
            * */
            this.LoadContextMenu();
            /**
             * 更新图标
             * */
            $(window).resize(function () {
                self.UpdateIcon();
            });
        }
        //加载图标格子
        this.GetGrid = function () {
            var ul = desktop.find("ul");
            if (ul.length == 0) {
                var ul = $("<ul></ul");
                desktop.append(ul);
            }
            var width = ul.width(), height = ul.height();
            var grid = [];
            var top = 0, left = 0;
            this.GridCount = Math.max(this.GridCount, options.deskicon.length + 10);
            for (var i = 0; i < this.GridCount; i++) {
                grid.push({
                    startY: top,
                    endY: top + 100,
                    startX: left,
                    endX: left + 100
                });
                if (options.iconalign == 0) {
                    left += 100;
                    if (left + 100 > width) {
                        top += 100;
                        left = 0;
                    }
                } else {
                    top += 100;
                    if (top + 100 > height) {
                        top = 0;
                        left += 100;
                    }
                }
            }
            this.Grids = grid;
            return grid;
        };
        //设置桌面图标
        this.SetIcon = function () {
            var grids = this.Grids;
            var ul = desktop.find('ul');
            for (var i = 0; i < Math.min(options.deskicon.length,grids.length); i++) {
                var icon = options.deskicon[i];
                var img = '';
                icon.icon = icon.icon || '';
                if (icon.image != '' && icon.image!=null)
                    img = '<img src="' + icon.image + '"/>';
                else {
                    img = '<i class="' + icon.icon + '"></i>';
                    icon.class += ' desktop-icon';
                }
                ul.append('<li style="left:' + grids[i].startX + 'px;top:' + grids[i].startY + 'px;' + (icon.style || '') + '"' + ((icon.class || '') == '' ? '' : (' class="' + icon.class + '"')) + ' data-id="' + icon.id + '" data-oindex="' + i + '" data-url="' + icon.url + '" data-type="' + icon.type + '" data-name="' + icon.name + '" data-width="' + (icon.width || 0) + '" data-height="' + (icon.height || 0) + '" data-icon="' + icon.icon + '" data-image="' + (icon.image||'') + '" data-lock="' + icon.lock + '">' + img + '<br/><span>' + icon.name + '</span></li>');
            }
            var self = this;
            var isMove = false;
            var moveStart = false;
            ul.on("mousedown", "li", function (e) {
                if (e.button == 2) return;
                if (!options.dragicon) return;
                e.preventDefault();
                e.stopPropagation();
                moveStart = true;
                var oldobj = $(this);
                $("#temp").remove();
                var obj = $('<div id="temp" class="icon">' + oldobj.html() + '</div>');
                var dx = e.clientX;
                var dy = e.clientY;
                var cx = e.clientX;
                var cy = e.clientY;
                var x = dx - oldobj.offset().left;
                var y = dy - oldobj.offset().top;
                var ul = $(this).parent();
                //绑定鼠标移动事件
                $(document).
                    on('mousemove', function (e) {
                        if (!moveStart) return;
                        isMove = true;
                        desktop.append(obj);
                        cx = e.clientX <= 0 ? 0 : e.clientX >= $(window).width() ? $(window).width() : e.clientX;
                        cy = e.clientY <= 0 ? 0 : e.clientY >= $(window).height() ? $(window).height() : e.clientY;
                        if (dx != cx || dy != cy) {
                            obj.css({
                                left: cx - x,
                                top: cy - y
                            }).show();
                        }
                        //高亮显示移动区域
                        var grid_index = self.SearchGrid(cx - ul.offset().left, cy - ul.offset().top);
                        ul.find('.grid').css('backgroundColor', '');
                        ul.find('.grid:eq(' + grid_index + ')').css('backgroundColor', '#aaa');
                        var movegrid_index = self.SearchMoveGrid(cx - ul.offset().left, cy - ul.offset().top);
                        ul.find('.movegrid').css('backgroundColor', '');
                        ul.find('.movegrid:eq(' + movegrid_index + ')').css('backgroundColor', '#333');
                    }).
                    on('mouseup', function (e) {
                        moveStart = false; 
                        obj.remove();
                        if (!isMove) return;
                        ul.find('.grid').css('backgroundColor', '');
                        ul.find('.movegrid').css('backgroundColor', '');
                        $(document).off('mousemove').off('mouseup');
                        //判断拖动位置
                        var grid_index = self.SearchGrid(cx - ul.offset().left, cy - ul.offset().top);
                        if (grid_index > ul.find('li').length - 1 && oldobj.index() != ul.find('li').length - 1) {
                            ul.find('li:last').after(oldobj);
                        } else {
                            if (grid_index != null && grid_index != oldobj.index()) {
                                var movegrid_index = self.SearchMoveGrid(cx - ul.offset().left, cy - ul.offset().top);
                                if (options.iconalign == 0) {
                                    if (movegrid_index % 4 == 0 || movegrid_index % 4 == 2) {
                                        ul.find('li:eq(' + grid_index + ')').before(oldobj);
                                    } else {
                                        ul.find('li:eq(' + grid_index + ')').after(oldobj);
                                    }
                                } else {
                                    if (movegrid_index % 4 == 0 || movegrid_index % 4 == 1) {
                                        ul.find('li:eq(' + grid_index + ')').before(oldobj);
                                    } else {
                                        ul.find('li:eq(' + grid_index + ')').after(oldobj);
                                    }
                                }
                            } else return;
                        }
                        self.UpdateIcon();
                        isMove = false;
                        if (typeof options.event.desktop.moved == 'function')
                            options.event.desktop.moved(desktop.find("li"));
                    });
            });
            ul.on("dblclick", "li", function () {
                $("#temp").remove();
                var url = $(this).attr("data-url");
                var name = $(this).attr("data-name");
                var id = $(this).attr("data-id");
                var width = $(this).attr("data-width") || 0;
                var height = $(this).attr("data-height") || 0;
                var image = $(this).attr("data-image") || '';
                var icon = $(this).attr("data-icon") || '';
                self.Open(name, url, width, height, image == '' ? icon : image);
            });
        };
        //获取小格子
        this.GetMoveGrid = function () {
            var grid = this.Grids;
            var movegrid = [];
            for (var i = 0; i < grid.length; i++) {
                var top = grid[i].startY, left = grid[i].startX;
                for (var j = 0; j < 4; j++) {
                    movegrid.push({
                        startY: top,
                        endY: top + 50,
                        startX: left,
                        endX: left + 50
                    });
                    left += 50;
                    if (left + 50 > grid[i].endX) {
                        top += 50;
                        left = grid[i].startX;
                    }
                }
            }
            return movegrid;
        };
        //搜索小格子
        this.SearchMoveGrid = function (x, y) {
            var movegrid = this.GetMoveGrid();
            var flag = null;
            for (var i = 0; i < movegrid.length; i++) {
                if (x >= movegrid[i].startX && x <= movegrid[i].endX && y >= movegrid[i].startY && y <= movegrid[i].endY) {
                    flag = i;
                }
            }
            return flag;
        };
        //搜索大格子
        this.SearchGrid = function (x, y) {
            var grid = this.Grids;
            var flag = null;
            for (var i = 0; i < grid.length; i++) {
                if (x >= grid[i].startX && x <= grid[i].endX && y >= grid[i].startY && y <= grid[i].endY) {
                    flag = i;
                }
            }
            return flag;
        };
        //更新图标
        this.UpdateIcon = function () {
            var grid = this.GetGrid();
            desktop.find('ul>li').each(function (i) {
                $(this).animate({
                    left: grid[i].startX,
                    top: grid[i].startY
                });
            });
        };
        //展示大格
        this.ShowGrid = function () {
            var grid = this.Grids;
            desktop.find(".grid").remove();
            for (var i = 0; i < grid.length; i++) {
                desktop.append('<div class="grid" style="left:' + grid[i].startX + 'px;top:' + grid[i].startY + 'px">' + i + '</div>');
            }
        };
        //展示小格
        this.ShowMoveGrid = function () {
            var grid = this.GetMoveGrid();
            for (var i = 0; i < grid.length; i++) {
                desktop.append('<div class="movegrid" style="left:' + grid[i].startX + 'px;top:' + grid[i].startY + 'px">' + i + '</div>');
            }
        };
        //添加桌面快捷方式
        this.AddDesktopIcon = function (name, url,_image, _icon) {
            var grids = this.Grids;
            var ul = desktop.find('ul');
            var i = ul.find("li").length;
            if (i >= this.GridCount) {
                layer.alert('当前桌面图标已超过最大限制,请刷新后再试.', { icon: 2 }); return;
            }
            var icon = {
                image: _image,
                icon: _icon,
                name: name,
                url: url,
                id: 0,
                type: 1,
                style:''
            };
            var img = '';
            var _class = '';
            icon.image = icon.image || '';
            if (icon.image != '') {
                    img = '<img src="' + icon.image + '"/>';
            } else {
                img = '<i class="' + icon.icon + '"></i>';
                _class = 'desktop-icon';
            }
            var li = $('<li style="left:' + grids[i].startX + 'px;top:' + grids[i].startY + 'px;' + icon.style + '"' + (_class == '' ? '' : (' class="' + _class + '"')) + ' data-id="' + icon.id + '" data-oindex="' + i + '" data-url="' + icon.url + '" data-type="' + icon.type + '" data-name="' + icon.name + '" data-icon="' + icon.image + '">' + img + '<br/><span>' + icon.name + '</span></li>');
            ul.append(li);
            if (typeof options.event.desktop.added == 'function') {
                options.event.desktop.added(li,icon,self);
            }
        }
        //删除桌面快捷方式
        this.RemoveDesktopIcon = function (id) {
            var li = desktop.find("li[data-id='" + id + "']");
            if (li.length == 0) return;
            li.remove();
            self.UpdateIcon();
            if (typeof options.event.desktop.removed == 'function') {
                options.event.desktop.removed(id);
            }
        }
        //设置右键菜单
        this.SetContextMenu = function (elem, data) {
            if (typeof (elem) != 'string') return;
            var self = this;
            $(document).on("contextmenu",elem, function (e) {
                self.RenderContextMenu(e.clientX, e.clientY, data,this);
                if (e.cancelable) {
                    // 判断默认行为是否已经被禁用
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }
                e.stopPropagation();
            });
        }
        //生成右键菜单
        this.RenderContextMenu = function (x, y, data,event) {
            this.RemoveContextMenu();
            var div = $("<div class='context-menu'><ul></ul></div>");
            $(document.body).append(div);
            var ul = div.find("ul");
            var self = this;
            data.forEach(function (e) {
                var show = true;
                if (typeof (e.condition) == 'function')
                    show = e.condition();
                if (!show) return;
                if (e.name == '') {
                    var hr = $("<hr/>");
                    ul.append(hr);
                } else {
                    var li = $("<li data-name='" + e.name + "'><a href='javascript:void(0);'><i class='" + e.icon + "'></i>" + e.name + "</a></li>");
                    li.click(function () {
                        if (typeof e.event == 'function')
                            e.event($(this), event, self);
                        self.RemoveContextMenu();
                    });
                    ul.append(li);
                }
            });
            if (x + 150 > document.body.clientWidth) { x -= 150 }
            if (y + div.height() > document.body.clientHeight) { y -= div.height() }
            div.css({
                top: y,
                left: x,
            });
        }
        //移除右键菜单
        this.RemoveContextMenu = function () {
            $(".context-menu").remove();
        }
        //右键菜单
        this.LoadContextMenu = function () {
            var self = this;
            /**
             * 系统桌面
             * */

            this.SetContextMenu('.desktop', [{
                name: '进入全屏',
                icon: 'zw-icon zw-icon-fullscreen',
                event: this.Funs.EnableFullScreen,
                condition: function () {
                    return !document.fullscreen;
                }
            },
            {
                name: '退出全屏',
                icon: 'zw-icon zw-icon-exitfullscreen',
                event: this.Funs.DisableFullScreen,
                condition: function () {
                    return document.fullscreen;
                }
            }, {
                name: '',
                icon: '',
                event: null,
                condition: null
            },
            {
                name: '刷新',
                icon: 'zw-icon zw-icon-refresh',
                event: this.Funs.Refresh
                }
            ].concat(options.contextmenu));
            
            /**
             * 桌面图标右键
             * */
            this.SetContextMenu('.desktop li', [{
                name: '打开',
                icon: 'zw-icon zw-icon-open',
                event: function (e,event) {
                    var url = $(event).attr("data-url");
                    var name = $(event).attr("data-name");
                    var id = $(event).attr("data-id");
                    var width = $(event).attr("data-width") || 0;
                    var height = $(event).attr("data-height") || 0;
                    var icon = $(event).attr("data-icon") || '';
                    var image = $(event).attr("data-image") || '';
                    self.Open(name, url, width, height, image == '' ? icon : image);
                }
            }, {
                name: '删除快捷方式',
                icon: 'zw-icon zw-icon-delete',
                event: function (e, event) {
                    var id = $(event).attr("data-id");
                    var lock = $(event).attr("data-lock");
                    if (lock == 1) {
                        layer.alert("系统锁定快捷方式不能执行删除操作.", {icon:2});
                        return;
                    }
                    self.RemoveDesktopIcon(id);
                }
            }]);
            /**
             * 开始菜单右键
             * */
            this.SetContextMenu('.startmenu .submenu a', [{
                name: '打开',
                icon: 'zw-icon zw-icon-open',
                event: function (e, event) {
                    var url = $(event).attr("data-url");
                    var name = $(event).attr("data-name");
                    var id = $(event).attr("data-id");
                    var width = $(event).attr("data-width") || 0;
                    var height = $(event).attr("data-height") || 0;
                    var icon = $(event).attr("data-icon") || '';
                    self.Open(name, url, width, height, icon);
                }
            }, {
                name: '添加快捷方式',
                icon: 'zw-icon zw-icon-delete',
                event: function (e, event) {
                    var url = $(event).attr("data-url");
                    var name = $(event).attr("data-name");
                    var id = $(event).attr("data-id");
                    var icon = $(event).attr("data-icon") || '';
                    self.AddDesktopIcon(name, url, '', icon);
                }
            }]);
            $(document).click(function (event) {
                if (!event.button) {
                    self.RemoveContextMenu(); 
                }
                if ($(event.target).parents(".main-menu").length == 0 &&  $(event.target).parents(".startmenu").length == 0)
                    self.HideStartMenu();
            });
            $(document).on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }
        //开始菜单
        this.LoadStartMenu = function () {
            startmenu = $('<div class="startmenu"></div>');
            options.elem.append(startmenu);
            this.LoadSideBar();
            this.LoadSubMenu();
        }
        //展示开始菜单
        this.ShowStartMenu = function () {
            taskbar.find(".main-menu").addClass("active");
            startmenu.animate({ width: 400, height: 500 }, 50);
        }
        //隐藏开始菜单
        this.HideStartMenu = function () {
            taskbar.find(".main-menu").removeClass("active");
            startmenu.animate({ width: 0, height: 0 }, 50);
        }
        //展开开始菜单
        //加载开始菜单 侧边栏
        this.LoadSideBar = function () {
            var sidebar = $('<div class="sidebar"></div>');
            startmenu.append(sidebar);
            options.startmenu.sidebar.forEach(function (s) {
                if (s.name == 'empty')
                    sidebar.append('<div class="emptybutton"></div>');
                else {
                    var btn = $('<button class="' + s.icon + '" title="' + s.name + '" data-url="' + s.url + '" data-name="' + s.name + '" data-width="' + (s.width || '') + '" data-height="' + (s.height || '') +'"></button>');
                    if (typeof s.event == 'function')
                        btn.on("click", s.event);
                    sidebar.append(btn);
                }
            });
            $(document).on("click", ".sidebar button", function () {
                var url = $(this).attr("data-url") || '';
                var name = $(this).attr('data-name');
                var width = $(this).attr("data-width") || '';
                var height = $(this).attr("data-height") || '';
                if (url == '') return;
                self.Open(name, url, width == '' ? 800 : width, height == '' ? 700 : height, $(this).attr('class'));
                self.HideStartMenu();
            });
        }
        //加载开始菜单 菜单
        this.LoadSubMenu = function () {
            var submenu = $('<div class="submenu"></div>');
            var dl = $("<dl></dl>");
            submenu.append(dl);
            startmenu.append(submenu);
            options.startmenu.submenu.forEach(function (m,i) {
                var dt = $('<dt class="' + m.icon + '" data-index="' + i + '" data-url="' + m.url + '">' + m.name + '</dt>');
                var dd = $('<dd data-index="' + i + '"></dd>');
                dl.append(dt);
                dl.append(dd);
                if (m.hasOwnProperty("children") && m.children.length > 0) {
                    m.children.forEach(function (ms) {
                        dd.append($('<a href="javascript:void(0);" data-url="' + ms.url + '" data-name="' + ms.name + '" data-icon="' + ms.icon + '" data-width="' + (ms.width || '') + '" data-height="' + (ms.height || '') +'" data-target="'+(ms.target||'_self')+'"><i class="' + ms.icon + '"></i>' + ms.name + '</a>'));
                    });
                }
            });
            var self = this;
            dl.on("click", "dt", function () {
                var index = $(this).attr("data-index");
                var dd = $(this).parent().find("dd[data-index='" + index + "']");
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    dd.animate({ "height": "0", "padding-top": "0", "padding-bottom": "0" }, 100, function () {
                         //dd.css({ "padding-top": "0", "padding-bottom": "0" });
                    });
                    return;
                }
                self.CloseSubMenu();
                //dd.css("padding", "5px");
                dd.animate({ "height": "100%", "padding-top": "5px", "padding-bottom": "5px" }, 100, function () {
                    //dd.css({ "padding-top": "5px", "padding-bottom": "5px" });
                });
                $(this).addClass("open");
            });
            $(document).on("click", ".submenu a", function () {
                var url = $(this).attr("data-url") || '';
                var name = $(this).attr('data-name');
                var width = $(this).attr("data-width") || '';
                var height = $(this).attr("data-height") || '';
                var target = $(this).attr("data-target");
                if (url == '') return;
                if (target == '_self')
                    self.Open(name, url, width == '' ? 1200 : width, height == '' ? 700 : height, $(this).find("i").attr('class'));
                else
                    window.open(url, target);
                self.HideStartMenu();
            });
        }
        //关闭开始菜单
        this.CloseSubMenu = function () {
            var dd = startmenu.find(".submenu dl dd");
            dd.animate({ "height": "0", "padding-top": "0", "padding-bottom": "0" }, 100, function () {
                //dd.css({ "padding-top": "0", "padding-bottom": "0" });
            });
            startmenu.find(".submenu dl dt").removeClass("open");
        }
        //展开开始菜单
        this.OpenSubMenu = function () {
            var dd = startmenu.find(".submenu dl dd");
            //dd.css({ "padding-top": "5px", "padding-bottom": "5px" });
            startmenu.animate({ "height": "100%", "padding-top": "5px", "padding-bottom": "5px" }, 100);
            startmenu.find(".submenu dl dt").addClass("open");
        }
        //加载任务栏
        var logo = '';
        if ((options.startmenu.logo || '') == '')
            logo = '<div class="zw-icon zw-icon-logo zw-logo-icon"></div>\
            <div class="zw-logo-bg"></div>';
        else
            logo = '<img src="' + options.startmenu.logo + '"/>';
        this.LoadTaskBar = function () {
            taskbar = $('<div class="taskbar">\
        <button class="main-menu">\
            '+ logo + '\
        </button>\
        <button class="search">\
        <span class="zw-icon zw-icon-search"></span>\
        搜索\
        </button>\
        <div class="taskbar-btns">\
            <ul>\
            </ul>\
        </div>\
        <button class="time">00:00:00<br/>1985-10-06</button>\
        <button class="msg zw-icon zw-icon-sms"></button>\
        <button class="showdesk"></button>\
    </div>');
            options.elem.append(taskbar);
            var self = this;
            taskbar.on("click", ".main-menu", function () {
                if ($(this).hasClass("active")) {
                    self.HideStartMenu();
                    $(this).removeClass("active");
                } else {
                    self.ShowStartMenu();
                    $(this).addClass("active");
                }
            }).on("click", ".showdesk", function () {
                var f = $(this).attr("data-min") || '';
                if (f == '') {
                    var _ = [];
                    $("dl.alerter:visible").each(function () {
                        var index = $(this).attr("data-index");
                        _.push(index);
                        alerter.min(index);
                    });
                    $(this).attr("data-min", _.join(','));
                    var a = $(this).parent().find(".taskbar-btns>ul>li.active");
                    if (a.length > 0) $(this).attr("data-active", a.attr('data-index'));
                } else {
                    f.split(',').forEach(function (o) {
                        alerter.show(o);
                    });
                    var active = $(this).attr("data-active") || 0;
                    if (active > 0) $(this).parent().find(".taskbar-btns>ul>li[data-index=" + active + "]").addClass("active");
                    $(this).removeAttr("data-min").removeAttr("data-active");
                }
            });
            taskbarbtns = taskbar.find(".taskbar-btns>ul");
            taskbar.on("click", ".taskbar-btns>ul>li", function (e) {
                if (e.target.nodeName == 'U') {
                    var index = $(this).attr("data-index");
                    self.RemoveTaskBar(index);
                    alerter.close(index);
                    return;
                }
                var index = $(this).attr('data-index');
                var task = taskbarbtns.find("li[data-index='" + index + "']");
                if (task.hasClass("active")) {
                    task.removeClass("active");
                    alerter.hide(index);
                } else {
                    self.CancelActiveAllTaskBar();
                    task.addClass("active");
                    alerter.topWindows(index);
                    alerter.show(index);
                }
                taskbar.find(".showdesk").removeAttr("data-min").removeAttr("data-active");
            });
        }
        //添加到任务栏
        this.AddTaskBar = function (title, index, icon) {
            if (taskbarbtns.find("li[data-index='"+index+"']").length > 0) {
                this.ActiveTaskBar(index);
                return;
            }
            var _img = '';
            icon = icon || '';
            if (icon.indexOf(".") > -1 || icon.indexOf("/") > -1)
                _img = '<img src="'+icon+'"/>';
            else
                _img = '<i class="' + icon +'"></i>';
            taskbar.find("ul").append('<li data-index="'+index+'">\
                    '+ _img +'\
                    <span>'+title+'</span>\
                <u class="zw-icon zw-icon-delete2"></u>\
                <div class="line"></div>\
            </li>');
            //this.ActiveTaskBar(taskbarbtns.length - 1);
            var li = taskbarbtns.find("li");
            li.removeClass("active");
            li.last().addClass("active");
        }
        //移除任务栏
        this.RemoveTaskBar = function (index) {
            taskbarbtns.find("li[data-index='"+index+"']").remove();
        }
        //激活任务栏
        this.ActiveTaskBar = function (index, nindex) {
            taskbarbtns.find("li").removeClass("active");
            
            var task = taskbarbtns.find("li[data-index='" + index + "']");
            task.addClass("active");
            
            alerter.show(index);
            //task.attr("data-nindex", nindex);
            //$('#layui-layer' + index + ' .layui-layer-max').trigger('click');
        }
        //取消所有激活任务
        this.CancelActiveAllTaskBar = function () {
            taskbarbtns.find("li").removeClass("active");
        }
        //取消激活任务
        this.CancelActiveTaskBar = function (index) {
            taskbarbtns.find("li[data-index='" + index + "']").removeClass("active");
            var dom = alerter.getTopWindow(true);
            if (dom != null) {
                var index = dom.attr('data-index');
                taskbarbtns.find("li[data-index='" + index + "']").addClass("active");
            }
        }
        //加载时间
        this.LoadCurrentTime = function () {
            window.setInterval(function () {
                var time = taskbar.find("button.time").last();
                var now = new Date();
                var format = function (a) { return (a < 10 ? '0' : '') + a; }
                var _ = [format(now.getHours()), ':', format(now.getMinutes()), ':', format(now.getSeconds()), '<br/>', now.getFullYear(), '-', format(now.getMonth() + 1), '-', format(now.getDate())];

                time.html(_.join(''));
            }, 1000);
        }
        //打开窗体
        this.Open = function (title, url, width, height,icon,type) {
            if (url == '') return;
            alerter.open({
                type: type || 0,
                skin: "windows",
                icon:icon,
                title: title,
                fixed: true,
                maxmin: true,
                //area:[width||options.width +'px',height||options.height+'px'],
                area: [width,height],
                scrollbar: true,
                minStack :true,
                shade: 0,
                content: url,
                min: function (o,index) {
                    window.setTimeout(function () {
                        self.CancelActiveTaskBar(o.attr("data-index"));
                    }, 100);
                },
                restore: function (o,index) {
                    self.ActiveTaskBar(o.attr("data-index"));
                },
                max: function (o,index) {
                    $("#alerter" + index).css("height", ($(window).height() - 51) + "px");
                    self.ActiveTaskBar(o.attr("data-index"));
                },
                success: function (o,index) {
                    self.AddTaskBar(title, o.attr("data-index"), icon);
                },
                cancel: function (o,index) {
                    self.RemoveTaskBar(o.attr("data-index"));
                },
                close: function (o,index) {
                    self.RemoveTaskBar(o.attr("data-index"));
                },
                active: function (o, index) {
                    self.ActiveTaskBar(o.attr("data-index"));
                }
            });
        }
        //函数
        this.Funs = {
            AboutUs: function () {
                layer.open({
                    type: 1,
                    closeBtn:1,
                    title: "关于我们",
                    content: '<div class="about">\
                        <ul>\
                            <li>当前版本: DeskTop v1.0</li>\
                            <li>作者: Jacky</li>\
                            <li>Email: Jacky@fayelf.com</li>\
                            <li>QQ: 7092734</li>\
                            <li>网址: http://www.fayelf.com</li>\
                            <li>Copyright © (2018 - 2024) FAYELF All Rights Reserved.</li>\
                        </ul></div>'
                });
            },
            EnableFullScreen: function () {
                var doc = document.documentElement;
                //W3C
                if (doc.requestFullscreen) {
                    doc.requestFullscreen();
                }
                //FireFox
                else if (doc.mozRequestFullScreen) {
                    doc.mozRequestFullScreen();
                }
                //Chrome等
                else if (doc.webkitRequestFullScreen) {
                    doc.webkitRequestFullScreen();
                }
                //IE11
                else if (doc.msRequestFullscreen) {
                    document.body.msRequestFullscreen();
                }
            },
            DisableFullScreen: function () {
                var doc = document;
                if (!doc.fullscreen) return;
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                }
                else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                }
                else if (doc.webkitCancelFullScreen) {
                    doc.webkitCancelFullScreen();
                }
                else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                }
            },
            Logout: function () {

            },
            SystemSet: function () {

            },
            Refresh: function () {
                window.location.reload();
            }
        };

        //初始化
        this.Init(options);
    };
    exports("windesk", {
        render: function (options) {
            return new WinDesk(options);
        }
    });
});