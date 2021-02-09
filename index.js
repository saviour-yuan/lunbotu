window.onload = function () {

    //获取元素
    // 头部导航栏元素
    var header = document.getElementById('header')
    var liNodes = document.querySelectorAll('#header .headerMain .nav ul li')
    var upNodes = document.querySelectorAll('#header .headerMain .nav ul li .up')
    var arrow = document.querySelector('#header .headerMain .arrow')

    // 内容区元素
    var content = document.getElementById('content');
    var contentLi = document.querySelectorAll('#content .list>li');//此处千万别写成为 .list li,本人找了很久才找出这个bug
    var contentList = document.querySelector('#content .list');
    // li索引下标
    var now = 0;
    // 获取炸裂元素
    var aboutUl = document.querySelectorAll('#content .list .about .about3>.item>ul');
    var homeLi1 = document.querySelectorAll('#content .list .home .homeList>li')
    // 获取第一屏元素
    var homeLi2 = document.querySelectorAll('#content .list .home .homeIcon>li')
    // 获取侧边栏元素
    var menuBarli = document.querySelectorAll('#content .menuBar>li');
    // 第一屏轮播效果函数
// 全局变量定义一个preIndex记录前一个now值，添加给入场动画，在每一次调用或者更新now值的时候在之前就将now值赋值给preIndex
    var preIndex = 0;


    var mask = document.getElementById('mask')
    var maskLine = document.querySelector('#mask>.maskLine');
    var maskTop = document.querySelector('#mask>.maskTop');
    var maskBottom = document.querySelector('#mask>.maskBottom');


    //mp3 音频部分
    var music = document.querySelector('#header .headerMain .music');
    var myAudio = document.querySelector('#header .headerMain .music>audio');


    //音频
    music.onclick = function () {
        // paused 用来判断当前音频是否是暂停，返回值为布尔值类型 如果为true说明当前音频是暂停的
        if(myAudio.paused){
            myAudio.play();
            music.style.backgroundImage = 'url("img/musicon.gif")'
        }else {
            myAudio.pause();
            music.style.backgroundImage = 'url("img/musicoff.gif")'
        }

    }
// 开机动画
    function loading() {
        // 图片张数表示变量，用于记录当前加载完成的图片数量
        var imgFlag = 0;
        // 图片路径数组
        var arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bks.png', 'gu.png', 'logo.png', 'team.png', 'team1.png', 'tata.png', 'robot.png', 'plane1.png', 'plane2.png', 'plane3.png']
        for (var i = 0; i < arr.length; i++) {
            // 创建图片对象
            var imgNode = new Image();
            imgNode.src = './img/' + arr[i];
            imgNode.onload = function () {
                imgFlag++;
                maskLine.style.width = imgFlag / arr.length * 100 + '%';
            }
        }
        maskLine.addEventListener('transitionend', function () {
            maskTop.style.height = '0';
            maskBottom.style.height = '0';
            maskLine.style.display = 'none';
        })
        maskTop.addEventListener('transitionend', function () {
// 第一屏入场动画在开机动画之后开始
            animationArr[0]['inAin']();
            // 第一屏的3d动画轮播
            home3D();
            mask.remove();
        })
    }

    loading();
    // 定义出入场动画
//定义一个屏一个对象
    var animationArr = [

        {
            inAin: function () {
                var homeList = document.querySelector('#content .list .home .homeList')
                var homeIcon = document.querySelector('#content .list .home .homeIcon')
                homeList.style.transform = 'translate(0px,0px)';
                homeList.style.opacity = '1';
                homeIcon.style.transform = 'translate(0px,0px)';
                homeIcon.style.opacity = '1';
            },
            outAin: function () {
                var homeList = document.querySelector('#content .list .home .homeList')
                var homeIcon = document.querySelector('#content .list .home .homeIcon')
                homeList.style.transform = 'translateY(-200px)';
                homeList.style.opacity = '0';
                homeIcon.style.transform = 'translateY(200px)';
                homeIcon.style.opacity = '0';

            }
        }, {
            inAin: function () {
                var plane1 = document.querySelector('#content .list .course .plane1')
                var plane2 = document.querySelector('#content .list .course .plane2')
                var plane3 = document.querySelector('#content .list .course .plane3')
                plane1.style.transform = 'translate(0)'
                plane2.style.transform = 'translate(0)'
                plane3.style.transform = 'translate(0)'
            },
            outAin: function () {
                var plane1 = document.querySelector('#content .list .course .plane1')
                var plane2 = document.querySelector('#content .list .course .plane2')
                var plane3 = document.querySelector('#content .list .course .plane3')
                plane1.style.transform = 'translate(-200px,-200px)'
                plane2.style.transform = 'translate(-200px,200px)'
                plane3.style.transform = 'translate(200px,-200px)'

            }
        }, {
            //第三屏
            inAin: function () {
                var pencel1 = document.querySelector('#content .works .pencel1')
                var pencel2 = document.querySelector('#content .works .pencel2')
                var pencel3 = document.querySelector('#content .works .pencel3')

                pencel1.style.transform = 'translateY(0px)';
                pencel2.style.transform = 'translateY(0px)';
                pencel3.style.transform = 'translateY(0px)';
            },
            outAin: function () {
                var pencel1 = document.querySelector('#content .works .pencel1')
                var pencel2 = document.querySelector('#content .works .pencel2')
                var pencel3 = document.querySelector('#content .works .pencel3')

                pencel1.style.transform = 'translateY(-200px)';
                pencel2.style.transform = 'translateY(200px)';
                pencel3.style.transform = 'translateY(200px)';
            }
        },
        {
            //第四屏
            inAin: function () {
                var item1 = document.querySelectorAll('#content .list .about .about3>.item')[0];
                var item2 = document.querySelectorAll('#content .list .about .about3>.item')[1];

                item1.style.transform = 'rotate(0deg)';
                item2.style.transform = 'rotate(0deg)';
            },
            outAin: function () {
                var item1 = document.querySelectorAll('#content .list .about .about3>.item')[0];
                var item2 = document.querySelectorAll('#content .list .about .about3>.item')[1];

                item1.style.transform = 'rotate(45deg)';
                item2.style.transform = 'rotate(-45deg)';
            }
        },
        {
            //第五屏
            inAin: function () {
                var team1 = document.querySelector('#content .list .team .team1')
                var team2 = document.querySelector('#content .list .team .team2')
                team1.style.transform = 'translateX(0px)';
                team2.style.transform = 'translateX(0px)';
            },
            outAin: function () {
                var team1 = document.querySelector('#content .list .team .team1')
                var team2 = document.querySelector('#content .list .team .team2')
                team1.style.transform = 'translateX(-200px)';
                team2.style.transform = 'translateX(200px)';
            }
        }


    ]
// 出入场动画初始化（测试）
    for (var i = 0; i < 5; i++) {
        animationArr[i]['outAin']();
    }
    /*setTimeout(function () {
        animationArr[0]['inAin']();
    }, 2000);*/
    /* animationArr[3]['outAin']();
     setTimeout(function () {
         animationArr[3]['inAin']();

     }, 2000)*/


    window.onresize = function () {
// 重新计算内容区域高度
        contenBind();
        // 重新计算小三角位置
        arrow.style.left = liNodes[now].getBoundingClientRect().left + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';

        // 重新计算滚动距离,此处不需要操作
    }

// 第一屏动画函数

    function home3D() {
        // 用于存储上一次的索引
        var oldIndex = 0;
        var autoIndex = 0;
        var hometimer = null;
        for (var i = 0; i < homeLi2.length; i++) {
            homeLi2[i].index = i;
            homeLi2[i].onclick = function () {
                clearInterval(hometimer);
                // 排他事件，清除所有小圆球的active，给当前点击的小圆球绑定active
                for (var j = 0; j < homeLi2.length; j++) {
                    homeLi2[j].className = '';
                }
                homeLi2[this.index].className = 'active';
                // 根据点击索引   与 旧索引值判断 点击小圆球的方向，添加对应的动画
                // 点击右侧：左边的隐藏leftHide 右边的显示rightShow
                if (oldIndex < this.index) {
                    homeLi1[this.index].className = 'rightShow';
                    homeLi1[oldIndex].className = 'leftHide';
                }
                // 点击左侧：左边的显示leftShow 右边的显示rightHide
                else if (oldIndex > this.index) {
                    homeLi1[this.index].className = 'leftShow';
                    homeLi1[oldIndex].className = 'rightHide';
                }
//更新index
                oldIndex = this.index;
                autoIndex = this.index;
                auto();
            }
        }
        //自动轮播
        auto();

        function auto() {

            hometimer = setInterval(function () {
                autoIndex++;
                // 超出后轮播循环
                if (autoIndex == homeLi2.length) {
                    autoIndex = 0;
                }
                //左边隐藏leftHide，右边显示rightShow
                homeLi1[oldIndex].className = 'leftHide';
                homeLi1[autoIndex].className = 'rightShow';

                //更新小圆球
                for (var j = 0; j < homeLi2.length; j++) {
                    homeLi2[j].className = '';
                }
                homeLi2[autoIndex].className = 'active';

                //更新index
                oldIndex = autoIndex;
            }, 3000);
        }
    }

// 第四屏图片炸裂函数
    picBoom();

    function picBoom() {
        for (var i = 0; i < aboutUl.length; i++) {
            changeImg(aboutUl[i]);
        }

        function changeImg(ul) {
            var w = ul.offsetWidth / 2;
            var h = ul.offsetHeight / 2;
            var imgSrc = ul.dataset.src;//img/about3.jpg


            for (var i = 0; i < 4; i++) {
                //创建li
                var linode = document.createElement('li');
                //创建img
                var imgNode = new Image();

                linode.style.width = w + 'px';
                linode.style.height = h + 'px';

                imgNode.src = imgSrc;

                //图片位置
                // i=0  l :0   -(0*w)          t:0
                // i=1  l :-w  -(1*w)          t:0
                // i=2  l :0   -(0*w)          t:-h
                // i=3  l :-w  -(1*w)          t:-h

                imgNode.style.top = -Math.floor(i / 2) * h + 'px';
                imgNode.style.left = -(i % 2) * w + 'px';
                // 一定要先绑定元素位置之后在操作元素
                ul.appendChild(linode);
                linode.appendChild(imgNode);
            }
//                var imgNodes = document.querySelectorAll('#content .list .about .about3>.item>ul>li>img')
            var imgNodes = ul.querySelectorAll('img')
            // 鼠标移入移出时间绑定
            ul.onmouseenter = function () {
                imgNodes[0].style.top = h + 'px';
                imgNodes[1].style.left = -2 * w + 'px';
                imgNodes[2].style.left = w + 'px';
                imgNodes[3].style.top = -2 * h + 'px';
            };
            ul.onmouseleave = function () {
                imgNodes[0].style.top = 0 + 'px';
                imgNodes[1].style.left = -w + 'px';
                imgNodes[2].style.left = 0 + 'px';
                imgNodes[3].style.top = -h + 'px';
            }

        }


    }


// 滚轮降频定时器
    var timer = null;


// 主要部分函数体
    contenBind();

    function contenBind() {
        //设置内容区高
        content.style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        for (var i = 0; i < contentLi.length; i++) {
            contentLi[i].style.height = document.documentElement.clientHeight - header.offsetHeight + 'px';
        }

    }

// 头部导航栏部分函数
    headerBind();

    function headerBind() {
        //第一个up宽度
        upNodes[0].style.width = '100%';

        //小尖尖位置
        arrow.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';

        //
        for (var i = 0; i < liNodes.length; i++) {
            liNodes[i].index = i;

            liNodes[i].onclick = function () {

                //1.up宽度 == 0
                for (var j = 0; j < upNodes.length; j++) {
//                    upNodes[j].style.width = '0';
                    upNodes[j].style.width = '';
                }
                preIndex = now;
                now = this.index;
                if (preIndex == now) {
                    return;
                }
                Move(now);
            }
        }

        // 侧边导航
        for (var i = 0; i < menuBarli.length; i++) {
            menuBarli[i].index = i;
            menuBarli[i].onclick = function () {

                preIndex = now;

                now = this.index;
                if (preIndex == now) {
                    return;
                }
                Move(now);
            }
        }

    }

// 滚轮布局

// ie/chrome浏览器执行此方法 有document.oumousewheel属性

    document.onmousewheel = function (event) {

        clearTimeout(timer)
        timer = setTimeout(function () {

            Scroll(event);

        }, 100);


    }
//firefox，火狐浏览器尽管有DOMMouseScroll，但是无法调用，因此需要用以下方法
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', function (event) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                Scroll(event);
            }, 100);
        });
    }

    function Scroll(event) {
// 鼠标事件兼容性不能少
        event = event || window.event;
        var flag = '';
        if (event.wheelDelta) {
            if (event.wheelDelta > 0) {
                flag = 'up';
            } else if (event.wheelDelta < 0) {
                flag = 'down';
            }
        } else if (event.detail) {
            if (event.detail < 0) {
                flag = 'up';
            } else if (event.detail > 0) {
                flag = 'down';

            }
        }

        preIndex = now;
        if ((preIndex == 0 && flag == 'up') || (preIndex == liNodes.length - 1 && flag == 'down')) {
            return;
        }
        switch (flag) {
            case 'up':
                if (now > 0) {
                    now--;
                }
                console.log('滚轮上滑');
                Move(now);
                break;
            case 'down':
                if (now < liNodes.length - 1) {
                    now++;
                }
                console.log('滚轮下滑');
                Move(now);
                break;
        }

        // 取消默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }


// 屏幕滑动函数
    function Move(now) {
        // 导航部分   高亮部分  小三角
        // 1.up宽度
        for (var i = 0; i < upNodes.length; i++) {
            upNodes[i].style.width = '';
        }
        upNodes[now].style.width = '100%';

        // 小三角位置
        arrow.style.left = liNodes[now].getBoundingClientRect().left + liNodes[now].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
        // 页面滚动通过list的top 值，也需要修改

        //屏幕切换
        contentList.style.top = -now * (document.documentElement.clientHeight - header.offsetHeight) + 'px';

        // 侧边导航小圆点
        for (var i = 0; i < menuBarli.length; i++) {
            menuBarli[i].className = '';
        }
        menuBarli[now].className = 'active';
        // 入场动画
        animationArr[now]['inAin']();
        // 再给其他屏添加出场动画（给上一次的页面添加出场动画）
        animationArr[preIndex]['outAin']();

    }

}