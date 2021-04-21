<template>
  <!-- 图片+头像 -->
  <div class="head-portrait">
    <!-- <div class="back-image">
      <img src="@/assets/my-back.jpg" alt="">
    </div> -->
    <div class="portrait">
      <div v-if="!user.header">
        <img src="@/assets/niuqi.jpg" alt="">
      </div>
      <div v-else>
        <img :src="user.header" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  }
}
</script>
<style>
.head-portrait{
  display: flex;
  flex-direction: row;/*这里可以不写，flex布局默认方向横向即row*/
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background: url("../../../assets/my-back.jpg");
  background-size:100% 100%;
  /* background-repeat:no-repeat ; */
  /* background-attachment: fixed; */
  /* background-size: contain; */
}
.head-portrait .portrait{
    width: 100px;
    height: 100px;
    border:5px solid #F2CC8C;
    border-radius:50%;
}
.head-portrait .portrait img{
  height: 100%;
  width: 100%;
  border-radius:50%;
}
</style>
