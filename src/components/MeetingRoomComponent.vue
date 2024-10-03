<template>
  <div class="">
    <button @click="openModal">Open Modal</button>
    <ModalComponent :isOpen="isModalOpen" @close="closeModal">
      <p>Modal Content Goes Here</p>
    </ModalComponent>
    <GetInfoSection></GetInfoSection>
    <div class="room">
      <div class="table">
        <div
          v-for="item in 13"
          :key="item"
          :class="`chair-${item} chair-container`"
        >
          <animate-scroll :animationType="'fade'">
            <ChairComponent
              :number="item"
              :onclick="
                () => {
                  openModal(item);
                }
              "
            ></ChairComponent>
          </animate-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import ChairComponent from "./ChairComponent.vue";
import GetInfoSection from "./GetInfoSection.vue";
import { TitleActionEnum } from "./Type";
import ModalComponent from "./ModalComponent.vue";
import AnimateScroll from "@/components/AnimateScroll.vue";

export default {
  name: "MeetingRoomComponent",
  setup() {
    const Hi = () => {
      alert("Hi");
    };
    const isModalOpen = ref(false);

    const openModal = (value: any) => {
      console.log(value);
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
    return { Hi, TitleActionEnum, openModal, closeModal, isModalOpen };
  },
  components: { ChairComponent, GetInfoSection, ModalComponent, AnimateScroll },
};
</script>

<style scoped>
.room {
  background-color: #fff6ee;
  padding: 1px;
  margin: auto;
  max-width: 450px;
}

.table {
  position: relative;
  background: #913f00;
  margin: 150px auto 40px auto;
  height: 553px;
  width: 145px;
  border-radius: 15px;
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
