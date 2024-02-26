<template>
  <input
    @keypress.enter="addTodo"
    type="text"
    v-model="newTodo.text"
    placeholder="Add a new todo.."
  />
  <button @click="addTodo">ADD</button>
  <transition name="switch" mode="out-in" appear>
    <div v-if="todos.length">
      <transition-group tag="ul" name="list" appear>
        <li
          v-for="item in todos"
          @click="removeTodo(item.id)"
          class="order"
          :key="item.id"
        >
          {{ item.text }}
        </li>
      </transition-group>
    </div>
    <div v-else>Nothing left todo!!!</div>
  </transition>
</template>

<script lang="ts">
import { ref } from "vue";

interface User {
  text: string;
  id: number;
}
export default {
  setup() {
    const isShow = ref<boolean>(false);

    const newTodo = ref({ text: "", id: 0 });
    const todos = ref<User[]>([]);

    const addTodo = () => {
      newTodo.value.id = Math.random() * 10;
      todos.value = [{ ...newTodo.value }, ...todos.value];
      newTodo.value = { text: "", id: 0 };
    };
    const removeTodo = (id: number) => {
      todos.value = todos.value.filter((item) => item.id !== id);
    };

    return { removeTodo, addTodo, isShow, todos, newTodo };
  },
};
</script>

<style scoped>
.order {
  width: 400px;
  text-align: center;
  border-radius: 12px;
  border: 1px solid grey;
  background: grey;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
.list-move {
  transition: all 0.3s ease;
}
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.switch-enter-active,
.switch-leave-active {
  transition: all 0.4s ease;
}
</style>
