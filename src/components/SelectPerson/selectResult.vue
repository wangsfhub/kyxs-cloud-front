<template>
  <div class="select-result l">
    <p class="clear">已选（{{total}}）
        <a @click="del">清空</a>
    </p>
    <ul>
        <template v-for="({type, data, cancel}) in list">
          <template v-if="type === 'role'">
            <li v-for="item in data" :key="item.id">
                <img src="@/assets/images/icon_role.png">
                <span>{{item.roleName}}</span>
                <icon-close-one class="close" @click="cancel(item)"/>
            </li>
          </template>
          <template v-if="type === 'department'">
            <li v-for="item in data" :key="item.id">
                <img src="@/assets/images/icon_file.png">
                <span>{{item.departmentName}}</span>
                <icon-close-one class="close" @click="cancel(item)"/>
            </li>
          </template>
          <template v-if="type === 'employee'">
            <li v-for="item in data" :key="item.id">
                <img src="@/assets/images/icon_people.png">
                <span>{{item.employeeName}}</span>
                <icon-close-one class="close" @click="cancel(item)"/>
            </li>
          </template>
        </template>
    </ul>
  </div>
</template>
<script>
import {toRefs,reactive} from 'vue'
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => [{ type: 'role', data: [], cancel: function () { } }]
    }
  },
  setup(props, {emit}) {
    const data = reactive({
      list: props.list,
      total: props.total
    })
    const del= ()=>{
      emit('del',)
    }
    return {
      ...toRefs(data),
      del
    };
  }
}
</script>

<style lang="less">
.select-result {
  width: 256px;
  height: 100%;
  font-size: 12px;
  float: left;
  ul {
    height: 360px;
    overflow-y: auto;
    li {
      margin: 11px 26px 13px 19px;
      line-height: 17px;

      span {
        vertical-align: middle;
      }

      img {
        &:first-of-type {
          width: 14px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
     .close {
        float: right;
        margin-top: 2px;
        font-size: 14px;
        color: #ff6700;
      }
    }
  }

  p {
    padding-left: 19px;
    padding-right: 20px;
    line-height: 37px;
    border-bottom: 1px solid #f2f2f2;

    a {
      float: right;
    }
  }
}
</style>
