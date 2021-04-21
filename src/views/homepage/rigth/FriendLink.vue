<template>
  <div>
    <a-card title="友情链接" :head-style="headStyle">
      <a href="">
        百度
      </a>
      <a href="">
        百度
      </a>
      <a href="">
        百度
      </a>
      <a href="">
        百度
      </a>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        borderLeft: '5px solid #409eff',
        paddingLeft: '20px',
        lineHeight: '15px'
      }
    }
  }
}
</script>
<style scoped>
.ant-card-bordered {
  border: none;
}
.ant-card-head-title {
  font-size: 18px;
  font-weight: bold;
  border-left: 5px solid #409eff;
  padding-left: 20px;
  line-height: 15px;
}
.ant-card-head {
  padding: 0;
}
.ant-card-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

a {
  margin-right: 20px;
  font-size: 22px;
}
</style>
