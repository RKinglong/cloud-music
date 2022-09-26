<template>
  <div class="user">
    <transition>
      <div>
        <UserHeader @switchNum="getSwitchNum"></UserHeader>
        <UserBottom :switchNum="switchNum"></UserBottom>
      </div>
    </transition>
  </div>
</template>

<script>
import UserHeader from "@/components/user/UserHeader.vue";
import UserBottom from "@/components/user/UserBottom.vue";
export default {
  name: "User",
  components: {
    UserHeader,
    UserBottom,
  },
  data() {
    return {
      switchNum: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    getSwitchNum(num) {
      this.switchNum = num;
    },
  },
};
</script>

<style scoped lang="scss">
.user {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
}
.v-enter {
  transform: translate(100%);
}
.v-enter-to {
  transform: translate(0);
}
.v-enter-active {
  transition: transform 0.2s;
}
.v-leave {
  transform: translate(0);
}
.v-leave-to {
  transform: translate(100%);
}
.v-leave-active {
  transition: transform 0.2s;
}
</style>
