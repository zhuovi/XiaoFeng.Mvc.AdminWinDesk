; layui.define(['jquery'], function (exports) {
    "use strict";
    var $ = layui.$;
    var alerter = {
        zIndex: 100,
        anims : ['alerter-anim-00', 'alerter-anim-01', 'alerter-anim-02', 'alerter-anim-03', 'alerter-anim-04', 'alerter-anim-05', 'alerter-anim-06'],
        //提示层
        tips: function () {

        },
        //消息框
        msg: function () {

        },
        //弹出框
        alert: function () {

        },
        //输入框
        prompt: function () {

        },
        //确认框
        confirm: function () {

        },
        //弹出框url
        open: function (options) {
            return new Alerter(options);
        },
        //关闭
        close: function (index, callback) {
            if (!index) return;
            var dom = $('dl.alerter[data-index=' + index+']');
            if (dom.length == 0) return;
            dom.removeClass(alerter.anims[0]).addClass("alerter-anim-close");
            window.setTimeout(function () {
                dom.remove();
            }, 1000);
            if (typeof callback == 'function') callback();
        },
        //关闭所有
        closeAll: function (type, callback) {
            if (typeof type == 'function') {
                callback = type;
                type = null;
            }
            var t = type == null ? '' : ('=' + type);
            $("dl.alerter[data-type" + t + "]").each(function () {
                alerter.close($(this).css("z-index"), null);
            });
            if (typeof callback == 'function') callback();
        },
        //显示
        show: function (index, callback) {
            if (!index) return;
            var dom = $("dl.alerter[data-index=" + index+"]");
            var anim = dom.attr("data-anim");
            dom.removeClass("alerter-anim-close").addClass(alerter.anims[anim]);
            dom.show();
            if (typeof callback == 'function') callback();
        },
        //隐藏
        hide: function (index, callback) {
            alerter.min(index, callback);
        },
        //还原
        restore: function (index, callback) {
            if (typeof (index) == 'function') {
                callback = index;
                index = 0;
            }
            var _ = 'dl.alerter';
            if (index > 0) {
                _ += '[data-index=' + index + ']';
            }
            $(_).each(function () {
                
            });
            
            if (typeof callback == 'function') callback();
        },
        //最小化
        min: function (index, callback) {
            if (typeof (index) == 'function') {
                callback = index;
                index = 0;
            }
            var _ = 'dl.alerter';
            if (index > 0) {
                _ += '[data-index=' + index + ']';
            }
            $(_).each(function () {
                $(this).find("dt>a.min").trigger('click');
            });
            if (typeof callback == 'function') callback(index);
        },
        //置顶
        topWindows : function (index,callback) {
            if (index == alerter.zIndex) return;
            var dom = $("dl.alerter[data-index=" + index+"]");
            if (dom.length == 0) return;
            dom.css("z-index", ++alerter.zIndex);
            dom.attr("id", "alerter" + alerter.zIndex);
            $("dl.alerter").each(function () {
                var cover = $(this).find(".alerter-cover");
                if (cover.length == 0) {
                    $(this).append("<div class='alerter-cover'></div>");
                }
            });
            dom.find(".alerter-cover").remove();
            if (typeof callback == 'function') callback();
        },
        //查找zindex最大的窗口
        getTopWindow : function (o) {
            var _ = [];
            o = o || false;
            var f = o ? ":visible" : "";
            $("dl.alerter" + f).each(function () {
                _.push({ zIndex: $(this).css("z-index"), dom: $(this) });
            });
            if (_.length == 0) return null;
            if (_.length > 1) {
                _.sort(function (a, b) {
                    return b.zIndex - a.zIndex;
                });
            }
            console.log(_);
            return _[0].dom;
        }
    };
    var Alerter = function (option) {
        var options = {
            //窗口大小
            area: ['500px', '500px'],
            //窗口类型 0 iframe窗口 1 alert 2 msg 3 tips 4 prompt 5 load
            type: 0,
            //布局
            fixed: true,
            //提示框位置  top,left,right,bottom,topleft,topright,bottomleft,bottomright
            offset: 'auto',
            //动画
            anim: 0,
            //是否可改变大小
            resize: true,
            //延迟关闭时间
            time: 0,
            //滚动条
            scrollbar: true,
            //是否有关闭按扭
            closeBtn: true,
            //是否有最小化按扭
            minBtn: true,
            //是否有最大化按扭
            maxBtn: true,
            //皮肤
            skin: '',
            //图标
            icon: '',
            //标题
            title: '',
            //内容或网址
            content: '',
            //遮罩层 0 没有 0.6代表遮罩层透明度为0.6
            shade: 0,
            //是否有移动框
            shadow: true,
            //移动后
            moveup: function (o) { },
            //最小化事件
            min: function (o,index) { },
            //最大化事件
            max: function (o,index) { },
            //还原事件
            restore: function (o,index) { },
            //关闭事件
            close: function (o) { },
            //窗口拉伸事件
            resizing: function (o) { },
            //完成事件
            success: function (o, index) { },
            //激活事件
            active: function (o, index,oindex) { }
        };
        options = $.extend({}, options, option);
        var anims = alerter.anims;
        //创建窗口
        this.CreateVessel = function () {
            var szindex = ++alerter.zIndex;
            var zindex = ++alerter.zIndex;
            console.log(options.area);
            var left = ($(window).width() - parseFloat(options.area[0])) / 2;
            var top = ($(window).height() - parseFloat(options.area[1])) / 2;

            var width = options.area[0] == 0 ? 'auto' : (options.area[0] + 'px');
            var height = options.area[1] == 0 ? 'auto' : (options.area[1] + 'px');

            var dl = $('<dl id="alerter' + zindex + '" class="alerter' + (options.skin == '' ? '' : (' ' + options.skin)) + (options.anim >= 0 && options.anim <= 6 ? (' alerter-anim ' + anims[options.anim]) : '') + '" style="z-index:' + zindex + ';left:' + left + 'px;top:' + top + 'px;width:' + width + ';height:' + height + ';' + (options.fixed ? 'position:fixed; ' : '') + '" data-time="' + options.time + '" data-type="' + options.type + '" data-anim="' + options.anim + '" data-index="' + zindex + '"></dl>');
            $(document.body).append(dl);
            
            if (options.title != '' && !(typeof (options.title) == 'boolean' && options.title == false)) {
                var dt = $("<dt>");
                dl.append(dt);
                if (options.icon.startsWith('<img')) {
                    dt.append($(options.icon));
                } else if (options.icon.indexOf('/') > -1)
                    dt.append($("<img src='" + options.icon + "'/>"));
                else
                    dt.append($('<i class="' + options.icon + '"></i>'));
                dt.append($("<div class='alerter-title'>" + options.title + "</div>"));
                if (options.minBtn) dt.append($('<a href="javascript:void(0);" class="zw-icon min"></a>'));
                if (options.maxBtn) dt.append($('<a href="javascript:void(0);" class="zw-icon max"></a>'));
                if (options.closeBtn) dt.append($('<a href="javascript:void(0);" class="zw-icon close"></a>'));
            }
            var dd = $("<dd></dd>");
            dl.append(dd);
            if (options.resize) {
                dd.append('<div class="resize-bottom"></div>\
            <div class="resize-right"></div>\
            <div class="resize"></div>');
            }
            if (options.type == 0)//弹窗
                dd.append($('<iframe allowtransparency="true" src="' + options.content + '" width="100%" height="100%" frameborder="0"></iframe>'));
            else if (options.type == 1) {//alert
                var info = options.content;
                dd.append("<div class='alerter-content'>" + info + "</div>");
            }
            if (options.shade > 0) {
                var shade = $("#alerter-shade" + zindex);
                if (shade.length == 0) {
                    shade = $('<div class="alerter-shade" id="alerter-shade' + zindex +'"></div>');
                    $(document.body).append(shade);
                }
                shade.css({ "background-color": "rgba(0,0,0," + options.shade + ")", "z-index": szindex });
            }
            $("dl.alerter").each(function () {
                if ($(this).css("z-index") == zindex) return;
                var cover = $(this).find(".alerter-cover");
                if (cover.length == 0) {
                    $(this).append("<div class='alerter-cover'></div>");
                }
            });
            if (typeof options.success == 'function') options.success(dl, zindex);
            /**
             * 修改位置
             * */
            if (width == 'auto') {
                var _width = dl.width();
                console.log(_width);
                left = ($(window).width() - parseFloat(_width)) / 2;
                dl.css("left", left);
            }
            if (height == 'auto') {
                var _height = dl.height();
                top = ($(window).height() - parseFloat(_height)) / 2;
                dl.css("top", top);
            }
            return dl;
        }
        var self = this;
        //初始化
        this.init = function (option) {
            var dl = this.CreateVessel();
            this.BindEvent(dl);
        }
        //绑定事件
        this.BindEvent = function (dl) {
            var config = {
                moveStart: false,
                moveResize: false,
                dom: [],
                left: 0,
                top: 0,
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            dl.on("mousedown", function () {
                var zindex = $(this).attr("data-index");
                alerter.topWindows(zindex);
                if (typeof options.active == 'function') options.active($(this), zindex);
            });
            //移动
            dl.find(".alerter-title").on("mousedown", function (e) {
                e.preventDefault();
                e.stopPropagation();

                if ($(this).parent().find("a.restore").length > 0) return;

                config.moveStart = true;
                config.left = parseFloat(dl.css("left"));
                config.top = parseFloat(dl.css('top'));
                config.moveStart = true;
                config.x = e.clientX;
                config.y = e.clientY;
                config.width = dl.outerWidth();
                config.height = dl.outerHeight();
                var shadow = null;
                if (options.shadow) {
                    shadow = $(".alerter-temp");
                    if (shadow.length == 0) {
                        shadow = $("<div class='alerter-temp'></div>");
                        $(document.body).append(shadow);
                    }
                    shadow.css({
                        left: config.left,
                        top: config.top,
                        width: config.width,
                        height: config.height
                    });
                }
                $(document).on("mousemove", function (e) {
                    if (!config.moveStart) return;
                    var top = e.clientY - config.y + config.top;
                    if (top <= 0) return;
                    var left = e.clientX - config.x + config.left;
                    if (options.shadow) {
                        shadow.css({ left: left, top: top });
                    } else {
                        dl.css({ left: left, top: top });
                    }
                }).on("mouseup", function (e) {
                    $(document).off('mousemove').off("mouseup");
                    if (options.shadow) {
                        dl.animate({ left: parseFloat(shadow.css("left")), top: parseFloat(shadow.css("top")) }, 200);
                        shadow.remove();
                    }
                    config.moveStart = false;
                    if (typeof options.moveup == 'function') options.moveup(dl);
                });
            });
            //拉宽
            dl.find(".resize-right").on("mousedown", function (e) {
                e.preventDefault();
                e.stopPropagation();
                config.moveResize = true;
                config.x = e.clientX;
                config.width = dl.outerWidth();
                var moveDiv = $(".alerter-move");
                if (moveDiv.length == 0) {
                    moveDiv = $("<div class='alerter-move'></div>");
                    $(document.body).append(moveDiv);
                } else
                    moveDiv.show();
                $(document).bind("mousemove", function (e) {
                    if (!config.moveResize) return;
                    var width = e.clientX - config.x + config.width;
                    if (width <= 120) return;
                    dl.css({ width: width });
                }).bind("mouseup", function (e) {
                    $(document).off('mousemove').off("mouseup");
                    config.moveResize = false;
                    moveDiv.remove();
                    if (typeof options.resizing == 'function') options.resizing(dl);
                });
            });
            //拉高
            dl.find(".resize-bottom").on("mousedown", function (e) {
                e.preventDefault();
                e.stopPropagation();
                config.moveResize = true;
                config.y = e.clientY;
                config.height = dl.outerHeight();
                var moveDiv = $(".alerter-move");
                if (moveDiv.length == 0) {
                    moveDiv = $("<div class='alerter-move'></div>");
                    $(document.body).append(moveDiv);
                } else
                    moveDiv.show();
                $(document).on("mousemove", function (e) {
                    if (!config.moveResize) return;
                    var height = e.clientY - config.y + config.height;
                    if (height <= 50) return;
                    dl.css({ height: height });
                }).on("mouseup", function (e) {
                    $(document).off('mousemove').off("mouseup");
                    config.moveResize = false;
                    moveDiv.remove();
                    if (typeof options.resizing == 'function') options.resizing(dl);
                });
            });
            //拉宽高
            dl.find(".resize").on("mousedown.alerter", function (e) {
                e.preventDefault();
                e.stopPropagation();
                config.moveResize = true;
                config.x = e.clientX;
                config.y = e.clientY;
                config.width = dl.outerWidth();
                config.height = dl.outerHeight();
                var moveDiv = $(".alerter-move");
                if (moveDiv.length == 0) {
                    moveDiv = $("<div class='alerter-move'></div>");
                    $(document.body).append(moveDiv);
                } else
                    moveDiv.show();
                $(document).on("mousemove.alerter", function (e) {
                    if (!config.moveResize) return;
                    var width = e.clientX - config.x + config.width;
                    var height = e.clientY - config.y + config.height;
                    if (width <= 120 || height <= 50) return;
                    dl.css({ width: width, height: height });
                }).on("mouseup.alerter", function (e) {
                    $(document).off('mousemove').off("mouseup");
                    moveDiv.remove();
                    config.moveResize = false;
                    if (typeof options.resizing == 'function') options.resizing(dl);
                });
            });
            //最小化
            dl.on("click", ".min", function () {
                var alert = $(this).parents(".alerter");
                alert.removeClass(anims[options.anim]).addClass("alerter-anim-close");
                window.setTimeout(function () {
                    alert.hide();
                    if (typeof options.min == 'function') options.min(alert, alert.css("z-index"));
                }, 100);
            }).on("click", ".restore", function () {
                $(this).removeClass("restore");
                $(this).addClass("max");
                var alert = $(this).parents(".alerter");
                var area = alert.attr("data-area") ||'';
                if (area == '')
                    area = '100,100,500,500';
                var areas = area.split(',');
                alert.css({
                    left: areas[0] + "px",
                    top: areas[1] + "px",
                    width: areas[2] + "px",
                    height: areas[3] + "px"
                });
                alert.removeClass("alerter-anim-close").addClass(anims[options.anim]);
                if (typeof options.restore == 'function') options.restore(alert,alert.css("z-index"));
            }).on("click", ".max", function () {
                $(this).removeClass("max");
                $(this).addClass("restore");
                var alert = $(this).parents(".alerter");
                alert.attr("data-area", parseFloat(alert.css("left")) + "," + parseFloat(alert.css("top")) + "," + parseFloat(alert.css("width")) + "," + parseFloat(alert.css('height')));
                alert.css({
                    left: 0, top: 0, width: '100%',height:'100%'
                });
                alert.removeClass("alerter-anim-close").addClass(anims[options.anim]);
                if (typeof options.max == 'function') options.max(alert,alert.css("z-index"));
            }).on("click", ".close", function () {
                var alert = $(this).parents(".alerter");
                $("#alerter-shade" + alert.css("z-index")).remove();
                var dom = self.GetTopWindow();
                if (dom != null) {
                    dom.find(".alerter-cover").remove();
                }
                if (typeof options.close == 'function') options.close(alert,alert.css("z-index"));
                alert.removeClass(anims[options.anim]).addClass("alerter-anim-close");
                window.setTimeout(function () {
                    alert.remove();
                }, 1000);
            });
        }
        //获取子iframe的DOM
        this.GetChildFrame = function (selector, index) {
            return $('dl.alerter[data-index=' + index+']').find('iframe').contents().find(selector);
        };
        this.IframeAuto = function (index) {
            if (!index) return;
            var child = this.GetChildFrame('html', index)
            var height = child.outerHeight();
            var width = child.outerWidth();
            var dom = $('dl.alerter[data-index=' + index+']');
            var titleheight = dom.find(".title").outerHeight();
            dom.css({ width: width, height: height + titleheight });
        };
        //查找zindex最大的窗口
        this.GetTopWindow = function () {
            var _ = [];
            $("dl.alerter").each(function () {
                _.push({ zIndex: $(this).css("z-index"), dom: $(this) });
            });
            if (_.length == 0) return null;
            if (_.length > 1) {
                _.sort(function (a, b) {
                    return b.zIndex - a.zIndex;
                });
            }
            return _[0].dom;
        }
        this.init();
    }
    
    exports("alerter", alerter);
});