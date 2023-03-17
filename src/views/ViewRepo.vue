<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";

const error = ref(null);
const loading = ref(false);
loading.value = true;

const repo = ref({});
const route = useRoute();

const fetchData = async () => {
  try {
    const { repoId } = route.params;
    const res = await fetch(`https://api.github.com/repositories/${repoId}`);
    if (!res.ok) {
      error.value = "could not fetch data";
    }
    repo.value = await res.json();
  } catch (err) {
    error.value = err.message;
  }
  loading.value = false;
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="w-[90%] sm:w-[500px] md:w-[700px] center">
    <div v-if="error">Sorry, cannot fetch this repo at the moment</div>
    <div v-else-if="loading">loading...</div>
    <div v-else>
      <div class="flex items-center justify-center border mr-auto">
        <h2 class="text-3xl mb-3">{{ repo.name }}</h2>
      </div>
      <div class="p-8 text-xl border mx-auto">
        <div v-if="repo.id">
          <p>Description: {{ repo.description }}</p>
          <a v-if="repo.homepage" :href="repo.homepage" target="_blank"
            >Homepage: {{ repo.name }}</a
          >
          <h4>Created: {{ repo.created_at.substring(0, 10) }}</h4>
          <p>Size: {{ repo.size }}KB</p>
          <p>Branch: {{ repo.default_branch }}</p>
          <span class="flex justify-center gap-3 w-full mt-6">
            <a
              v-if="repo.html_url"
              :href="repo.html_url"
              target="_blank"
              class="bg-blue-1 px-3 py-2 text-light-1 rounded-lg inline-block"
              >View Repo</a
            >
            <router-link
              v-if="repo.html_url"
              to="/"
              class="text-blue-1 px-3 py-2 border bg-light-1 rounded-lg inline-block"
              >Back</router-link
            >
          </span>
        </div>
        <div v-else>
          <h2>Repo not found</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
