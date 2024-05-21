<template>
  <transition name="modal">
    <div class="modal-mask" v-if="isOpen" @click="closeModalOutside">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="closeModal">Close</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
  },
  setup(props: any, { emit }: any) {
    const closeModal = () => {
      emit("close");
    };
    const closeModalOutside = (event: any) => {
      if (event.target.classList.contains("modal-mask")) {
        closeModal();
      }
    };

    return { closeModal, closeModalOutside };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-header h3 {
  margin: 0;
}

.modal-header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.modal-body {
  padding: 10px 0;
}

/* Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
