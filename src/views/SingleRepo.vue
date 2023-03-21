<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const error = ref(null);
const loading = ref(false);
loading.value = true;

const repo = ref({});
const repoName = ref({});
const route = useRoute();

const fetchData = async () => {
  try {
    const { repoId } = route.params;
    const resp = await fetch(`https://api.github.com/repositories/${repoId}`);
    if (resp.ok) {
      repoName.value = await resp.json();
    }

    const res = await fetch(
      `https://api.github.com/repositories/${repoId}/contents`
    );
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
  <div class="center">
    <div v-if="error">Sorry, cannot fetch this repo at the moment</div>
    <div v-else-if="loading"><PulseLoader :loading="loading"></PulseLoader></div>
    <div v-else>
      <div class="flex items-center justify-between m-5">
        <div class="flex gap-2 items-center h-[50px] mb-5">
          <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 fill-white"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
                />
              </svg>
            </div>
          <h2 class="text-lg font-medium text-blue-500">{{ repoName.owner.login }} {{ "/" }} {{ repoName.name }}</h2>
        </div>
        <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <button @click="$router.push(`/`)">
            Go Back
          </button>
        </div>
      </div>
      <div>
        <div v-if="repo">
          <ul id="example-1" class="w-[75%] md:w-[50%] mx-auto mb-5">
            <li
              v-for="item in repo"
              :key="item.name"
              class="p-3 text-xl border border-gray-500 rounded-sm"
            >
              <div class="flex justify-start items-center">
                <div v-if="item.type === 'dir'">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="h-4 w-4 fill-gray-500"
                  >
                    <path
                      d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
                    />
                  </svg>
                </div>
                <div v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    class="h-4 w-4 fill-gray-500"
                  >
                    <path
                      d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"
                    />
                  </svg>
                </div>
                <div class="mx-auto">
                  {{ item.name }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <h2>Repo not found</h2>
        </div>
      </div>
    </div>
  </div>
</template>
