+function ($) {
    "use strict";

    $.fn.loadPageData = function (options) {
        var self = this;

        var _default = {
            url: '',
            data: {},
            type: 'get',
            list: '>ul',/*表示列表项*/
            pageIndex: 0,/*表示页数,appendPageData,loadNextPage,loadPrevPage,refreshPage中此参数无效*/
            pageIndexName: 'pageIndex',
            loaddingClassName: 'loading',
            emptyClassName: 'empty',
            completeClassName: 'complete',
            emptyloadingClassName: 'loading_empty',
            clearList: true,
            pageIndexFunc: function (currentPageInfo) {//获取当前要获取数据的页数
                return (this.pageIndex == null) ? 0 : this.pageIndex;
            },
            extendRequestData: function (requestData, lastPageInfo, pageIndex) {
                requestData[this.pageIndexName] = pageIndex;
                //这里可以附加一些数据
            },
            listItemBuilder: function (data, textStatus, jxr, pageIndex) {
                if (typeof data == "string") {
                    data = data.trim();
                }
                if (data) {
                    return $(data);
                } else {
                    return $([]);
                }
            },//负责加载数据
            pageinfoBuilder: function (data, textStatus, jxr, pageIndex) {
                //构造的对象至少包含以下属性，也可包含其它属性供别处调用
                //HasNextPage
                //HasPreviousPage
                //PageIndex
                //PageSize
                //TotalCount
                //TotalPages
                var page = jxr.getResponseHeader('PageInfo');
                if (page) {
                    return JSON.parse(unescape(page));
                }
                return null;

            },
            pageHandler: function (pageInfo) {
                //处理页面收到分页数据的处理函数
            }
        };

        _default = $.extend(_default, options);

        var $ul = this.find(_default.list);

        if ($ul.length == 0) return this;

        var pageInfo = $ul.data('pageInfo');

        var loadIndex = _default.pageIndexFunc(pageInfo);

        if (pageInfo != null && loadIndex >= pageInfo.TotalPages) {
            if (this.hasClass(_default.emptyClassName)) {
                return this;
            } else {
                return this.addClass(_default.completeClassName);//记录末尾,页数超过总页数了
            }
        }

        if (!_default.data) _default.data = {};

        _default.extendRequestData(_default.data, pageInfo, loadIndex)

        $.ajax({
            url: _default.url,
            type: _default.type,
            data: _default.data,
            success: function (data, textStatus, jxr) {
                var listitems = _default.listItemBuilder(data, textStatus, jxr, loadIndex);

                if (listitems) $ul.append(listitems);

                var pinfo = _default.pageinfoBuilder(data, textStatus, jxr, loadIndex);

                $ul.data('pageInfo', pinfo);

                if ($ul.children().length == 0) {
                    self.addClass(_default.emptyClassName);
                } else {
                    self.removeClass(_default.emptyClassName);
                }
                if (_default.pageHandler) _default.pageHandler(pinfo);
            },
            beforeSend: function () {
                self.removeClass(_default.completeClassName);//移除完成总页数的样式
                if (self.hasClass(_default.loaddingClassName) || self.hasClass(_default.emptyloadingClassName)) {
                    return false;//已经在加载中
                }
                if (_default.clearList) {
                    $ul.empty();
                }
                if ($ul.children().length > 0) {
                    self.addClass(_default.loaddingClassName);
                } else {
                    self.addClass(_default.emptyloadingClassName);
                }
            },
            complete: function () {
                self.removeClass(_default.loaddingClassName).removeClass(_default.emptyloadingClassName);
            }
        });
        return this;
    };
    $.fn.appendPageData = function (options) {
        var _default = {
            clearList: false,
            pageIndexFunc: function (currentPageInfo) {
                return (currentPageInfo == null) ? 0 : currentPageInfo.PageIndex + 1;
            }
        };
        _default = $.extend(_default, options);
        return this.loadPageData(_default);
    }
    $.fn.loadNextPage = function (options) {
        var _default = {
            clearList: true,
            pageIndexFunc: function (currentPageInfo) {
                if (currentPageInfo == null) return 0;
                return currentPageInfo.HasNextPage ? currentPageInfo.PageIndex + 1 : currentPageInfo.PageIndex;
            }
        };
        _default = $.extend(_default, options);
        return this.loadPageData(_default);
    }
    $.fn.loadPrevPage = function (options) {
        var _default = {
            clearList: true,
            pageIndexFunc: function (currentPageInfo) {
                if (currentPageInfo == null) return 0;
                return currentPageInfo.PageIndex > 0 ? currentPageInfo.PageIndex - 1 : 0;
            }
        };
        _default = $.extend(_default, options);
        return this.loadPageData(_default);
    }
    $.fn.refreshPage = function (options) {
        var _default = {
            clearList: true,
            pageIndexFunc: function (currentPageInfo) {
                return currentPageInfo == null ? 0 : currentPageInfo.PageIndex;
            }
        };
        _default = $.extend(_default, options);
        return this.loadPageData(_default);
    }
    $.fn.resetPage = function (options) {
        var _default = {
            list: '>ul',/*表示列表项*/
            clearList: true,
            loaddingClassName: 'loading',
            emptyClassName: 'empty',
            completeClassName: 'complete',
            emptyloadingClassName: 'loading_empty',
        };
        _default = $.extend(_default, options);
        var $ul = this.find(_default.list);
        if ($ul.length == 0) return;
        if (_default.clearList) {
            $ul.empty();
        }
        $ul.data('pageInfo', null);
        return this.removeClass(_default.loaddingClassName).removeClass(_default.emptyClassName).removeClass(_default.completeClassName).removeClass(_default.emptyloadingClassName);
    }
    $.fn.getPageInfo = function (options) {
        var _default = {
            list: '>ul',/*表示列表项*/
        };
        var $ul = this.find(_default.list);
        if ($ul.length == 0) return null;
        return $ul.data('pageInfo');
    }

}($);
