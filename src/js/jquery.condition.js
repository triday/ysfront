; (function () {
    /*搜索条件的Demo*/
    /* <div data-op="and">
              <div>
                  <div data-op="or">
                      <div>
                          <input type="text" name="Tel" value="124" data-type="endwith" />
                          <input type="text" name="Tel2" value="456" />
                      </div>
                  </div>
              </div>
      </div> */

    /*排序条件的Demo*/
    /*
    <input type="text" name="Tel" value="1" data-order="true" />
    <input type="text" name="Tel2" value="0" data-order="true" />
    */
    function createChildrenConditons($current) {
        var res = [];
        $current.children().each(function (index, element) {
            var r = createCondition(element);
            if (r) {
                if (r instanceof Array) {
                    res = res.concat(r);
                } else {
                    res.push(r);
                }
            }
        });
        return res;
    }

    function createCondition(dom) {
        var $current = $(dom);
        var op = $current.data('op') || '';
        if (op.toLowerCase() === 'or') {
            var res = createChildrenConditons($current);
            if (res.length > 1) {
                return { OpType: 'OrItems', Items: res };
            } else if (res.length == 1) {
                return res[0];
            } else {
                return null;
            }
        } else if (op.toLowerCase() === 'and') {
            var res = createChildrenConditons($current);
            if (res.length > 1) {
                return { OpType: 'AndItems', Items: res };
            } else if (res.length == 1) {
                return res[0];
            } else {
                return null;
            }
        } else {
            if ($current.attr('name') && $current.val() && (!$current.attr('data-order'))) {//是表单元素,忽略排序字段
               var names = $current.attr('name').split(',');//将name可以认为是多个字段连接使用，可以实现多字段的模糊搜索
                var res = [];
                for (var i = 0; i < names.length; i++) {
                    if (names[i].trim()) {
                        res.push({ FieldName: names[i].trim(), Value: $current.val(), SearchType: $current.data('type') || 'Equals', OpType: 'SingleItem' });
                    }
                }
                if (res.length > 1) {
					 return { OpType: 'OrItems', Items: res }; //多条件使用一个值搜索，即模糊搜索用Or
                } else if (res.length == 1) {
                    return res[0];
                } else {
                    return null;
                }
            } else {
                var res = createChildrenConditons($current);
                if (res.length > 1) {
                    return res;
                }
                else if (res.length == 1) {
                    return res[0];
                } else {
                    return null;//没有搜索结果
                }
            }
        }

    }

    function createConditionInternal($doms) {
        var res = [];
        $doms.each(function (index, element) {
            var res1 = createCondition(element);
            if (res1) {
                if (res1 instanceof Array) {
                    res = res.concat(res1);
                } else {
                    res.push(res1);
                }
            }
        });

        if (res.length > 1) {
            return { OpType: 'AndItems', Items: res }
        } else if (res.length == 1) {
            return res[0];
        } else {
            return null;
        }
    }

    function careateOrderInternal($doms) {
        var res = []
        $doms.each(function (index, element) {
            var $element = $(element);
            if ($element.data('order') && $element.attr('name')) {
                var ordertype = $element.val();
                if ($element.val()) {
                    res.push({ FieldName: $element.attr('name'), OrderType: $element.val() });
                }
            } else {
                $element.children().each(function (index1, element1) {
                    var res1 = careateOrderInternal($(element1));
                    if (res1) {
                        if (res1 instanceof Array) {
                            res = res.concat(res1)
                        } else {
                            res.push(res1);
                        }
                    }
                });
            }
        });
        return res.length > 0 ? res : null;
    }


    $.fn.extend({
        createSearch: function () {
            return createConditionInternal(this);
        },
        carateOrder: function () {
            return careateOrderInternal(this);
        }
    });
})(jQuery);