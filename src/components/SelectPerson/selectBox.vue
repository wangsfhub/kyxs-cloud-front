<template>
  <ul class="select-box">
    <template v-for="elem in list">
      <template v-if="elem.type === 'role'">
        <li v-for="item in elem.data" :key="item.id"
          class="check_box"
          :class="{active: elem.isActive && elem.isActive(item), not: elem.not}"
          @click="elem.change(item)">
          <a :title="item.description" :class="{active: elem.isActiveItem && elem.isActiveItem(item)}">
            <img src="@/assets/images/icon_role.png">{{item.roleName}}
          </a>
        </li>
      </template>
      <template v-if="elem.type === 'department'">
        <li v-for="item in elem.data" :key="item.id" class="check_box" :class="{not: !elem.isDepartment}">
          <a v-if="elem.isDepartment"
            :class="elem.isActive(item) && 'active'"
            @click="elem.change(item)">
            <img src="@/assets/images/icon_file.png">{{item.departmentName}}
          </a>
          <a v-else><img src="@/assets/images/icon_file.png">{{item.departmentName}}</a>
          <el-icon><i-ep-plus @click="elem.next(item)"></i-ep-plus></el-icon>
        </li>
      </template>
      <template v-if="elem.type === 'employee'">
        <li v-for="item in elem.data" :key="item.id" class="check_box">
            <a :class="elem.isActive(item) && 'active'"
              @click="elem.change(item)"
              :title="item.departmentNames">
              <img src="@/assets/images/icon_people.png">{{item.employeeName}}
            </a>
        </li>
      </template>
    </template>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less">
.select-box {
  height: 320px;
  overflow-y: auto;
  li {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
      display: flex;
      align-items: center;
    }
    i {
      font-size: 12px;
      cursor: pointer;
    }
    i:hover {
      font-size: 12px;
      cursor: pointer;
      color: var(--theme-color);
    }
    img {
      width: 14px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
