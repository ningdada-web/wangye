<template>
  <div class="tags">
    <el-tag
    size='small'
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closeable="tag.name !== 'home'"
    :effect="$route.name===tag.name ? 'dark' : 'plain'"
    closable
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    >
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name: "common-tag",
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close:'closeTag'
    }),
    changeMenu(item){
        this.$router.push({
            name:item.name
        })
    },
    //获取目标和索引，定义目标数量，数量-1为当前路由的索引
    handleClose(tag,index){
      
      const length = this.tags.length -1
      this.close(tag)
      if(tag.name !== this.$route.name){
        return;
      }
      if(index === length){
        this.$router.push({
          name: this.tags[index - 1].name
        })
      }else{
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  },
  computed:{
    ...mapState({
        tags: state => state.tab.tabList
    })
  }
};
</script>

<style scoped lang="less">
.tags{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor:pointer
    }
}

</style>
