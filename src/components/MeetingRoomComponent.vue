<template>
  <div class="">
    <GetInfoSection></GetInfoSection>
    <div class="table">
      <div
        v-for="item in 13"
        :key="item"
        :class="`chair-${item} chair-container`"
      >
        <ChairComponent :onclick="Hi"></ChairComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChairComponent from "./ChairComponent.vue";
import GetInfoSection from "./GetInfoSection.vue";
import { TitleActionEnum } from "./Type";

export default {
  setup() {
    const Hi = () => {
      alert("Hi");
    };
    return { Hi, TitleActionEnum };
  },
  components: { ChairComponent, GetInfoSection },
};
</script>

<style scoped>
.table {
  position: relative;
  background: #bbbbbb;
  margin: 150px auto 40px auto;
  height: 553px;
  width: 145px;
  border-radius: 40px;
}

.chair-container {
  cursor: pointer;
  position: absolute;
}

.chair-1 {
  right: 160px;
}
.chair-2 {
  right: 160px;
  top: 95px;
}
.chair-3 {
  right: 160px;
  top: 190px;
}
.chair-4 {
  right: 160px;
  top: 285px;
}
.chair-5 {
  right: 160px;
  top: 380px;
}
.chair-6 {
  right: 160px;
  top: 475px;
}
.chair-7 {
  right: -68px;
}
.chair-8 {
  right: -68px;
  top: 95px;
}
.chair-9 {
  right: -68px;
  top: 190px;
}
.chair-10 {
  right: -68px;
  top: 285px;
}
.chair-11 {
  right: -68px;
  top: 380px;
}
.chair-12 {
  right: -68px;
  top: 475px;
}
.chair-13 {
  left: 47px;
  top: -79px;
}
</style>
