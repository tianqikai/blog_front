<template>
  <div>
    <!-- 图片+头像 -->
    <div>
      <portrait />
    </div>
    <!-- 联系方式 -->
    <div>
      <Socialcontact />
    </div>
    <div class="recommend-read">
      <Recommend />
    </div>
    <div class="music"><Music /></div>
    <div class="links"><friend-link /></div>
  </div>
</template>
<script >
import Portrait from '@/views/homepage/rigth/Portrait'
import Socialcontact from '@/views/homepage/rigth/Socialcontact'
import Music from '@/views/homepage/rigth/Music'
import FriendLink from '@/views/homepage/rigth/FriendLink'
import Recommend from '@/views/homepage/rigth/Recommend'
export default {
  components: {
    Portrait,
    Socialcontact,
    Music,
    FriendLink,
    Recommend
  }
}
</script>
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
