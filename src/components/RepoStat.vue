<script setup>
import { onMounted } from "vue";
import useFetch from "../composable/useFetch";

const { data, fetchData } = useFetch(
  "https://api.github.com/users/ChukwurahVictor"
);

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <li class="stat-container flex mb-4">
    <span class="fa-icon">
      <font-awesome-icon
        icon="fa-solid fa-folder-blank"
        class="text-white-1 text-md z-[5]"
      />
    </span>
    <div class="flex gap-1 bottom-red-400">
      <p class="text-light-4 text-md">Repositories</p>
      <p
        class="border rounded-full px-2 text-xs align-center bg-gray-600 bg-opacity-100 text-[c9d1d9]"
      >
        {{ data.public_repos }}
      </p>
    </div>
  </li>
</template>

<style></style>
