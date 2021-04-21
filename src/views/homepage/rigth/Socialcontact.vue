<template>
  <!-- 联系方式 -->
  <div class="social-contact">
    <!-- 社交 -->
    <div class="social">
      <div class="left">社交:</div>
      <div class="rigth">
        <a href="http://wpa.qq.com/msgrd?v=3&uin=953811508&site=qq&menu=yes">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-QQ1" />
          </svg>
        </a>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin" />
        </svg>
        <a href="https://github.com/tianqikai">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github1" />
          </svg>
        </a>
        <a href="https://gitee.com/tian_qikai">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gitee-fill-round" />
          </svg>
        </a>
        <a href="https://blog.csdn.net/xiaolenglala?spm=1001.2101.3001.5343">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-csdn2" />
          </svg>
        </a>
      </div>
    </div>
    <!-- 加入我们 -->
    <div class="joinus">
      <div class="left">加入我们：</div>
      <div class="rigth">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qqqun1" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixinqun3" />
        </svg>
      </div>
    </div>
  </div>
</template>
<style>
.social {
  display: flex;
  justify-content: space-between;
  margin: 15px 20px 0 20px ;
  border-top:1px solid #E8E8E8 ;
}
.social .left {
  width: 30%;
  height: 42px;
  line-height:42px ;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}
.social .rigth {
  display: flex;
  flex-direction: row;/*这里可以不写，flex布局默认方向横向即row*/
  justify-content: space-around;
  align-items: center;
  width: 70%;
  margin-left: 20px;
  height: 42px;
  line-height:42px ;
  font-size: 25px;
  text-align: center;
}
.joinus {
  display: flex;
  justify-content: space-between;
  margin: 15px 20px 20px 20px ;
  border-top:1px solid #E8E8E8 ;
}
.joinus .left {
  width: 40%;
  height: 42px;
  line-height:42px ;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}
.joinus .rigth {
  display: flex;
  flex-direction: row;/*这里可以不写，flex布局默认方向横向即row*/
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin-left: 10px;
  height: 42px;
  line-height:42px ;
  font-size: 25px;
  text-align: center;
}
</style>
