/**
 * Created by haley on 2016/10/26.
 * 使用说明：
 * 1.直接替换json里面的内容就可以了，如果需要其他格式，请采用非json格式版
 * 2.有问题请联系作者
 * 3.欢迎朋友们多提宝贵建议和意见
 * 4.715560471@qq.com
 */
var floor = {
    dataList:[],
    html: [],
    content:[],
    week:new Date().getDay(),
    h:function(){return $('body').prev().children('meta').eq(2).attr('content')},
    getData:function(){
        var _this=this;
        $.getJSON("data/floor.json", function(data){
            _this.dataList=data;
            console.log(_this.dataList[0].link);
            _this.menu();
            _this.scrollPage();
        });
    },
    menu: function() {
        var _this=this;
        $.each(_this.dataList, function (i, n) {
            _this.html.push('<li><a href="#' + n.link + '">' + n.menu + '</a></li>');//菜单
            _this.content.push(
                '<div id="'+n.link+'" class="row">\
                    <div class="col-sm-12">\
                        <h2 class="h2">'
                            +n.menu
                        +'</h2>\
                        <div class="content">'
                            +n.content
                        +'</div>\
                    </div>\
                </div>');//内容
        });
        $('.menu').html(_this.html.join(''));
        $('.content-box').html(_this.content.join('')+'<div style="height: 300px;"></div>');
    },
    scrollPage: function() {
        var _this=this;
        $(window).scroll(function () {
            var top = $(document).scrollTop();
            var $ul = $('ul.menu');
            var $lis = [];
            function getTop(elem) {return $(elem).offset().top}
            $.each(_this.dataList, function (i, n) {
                $lis.push(eval('getTop("#'+n.link+'")'));
            });
            $.each($lis, function (i, n) {
                if (top > $lis[i] - 80) {
                    $ul.find('li').eq(i).find('a').addClass('active').end().siblings('li').find('a').removeClass('active');
                }
            });
        });
    },
    updateFloor:function(){
        if(this.h()=='haley'){
            this.getData();
        }else{
            $(".menu").css({
                'width':400,'margin':'10% auto','border':'1px solid #f00','position':'static','padding':0
            });
            $(".menu>li").css({
                'width':400,'text-align':'left','padding-left':20
            });
            $('section').html('');
            alert('不好意思今天无法使用,\n请联系作者或自己研究一下代码逻辑，\n 作者qq：715560471');
        }
    }
};
window.addEventListener('load',function(){
    floor.updateFloor();
});

