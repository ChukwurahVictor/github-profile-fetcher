<script setup>
import { onMounted } from "vue";
import useFetch from "../composable/useFetch";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const { data, error, loading, fetchData } = useFetch(
  "https://api.github.com/users/ChukwurahVictor"
);

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div
    class="min-w-[322px] bg-[#161b22] text-white w-[322px] bg-light-1 rounded-lg relative mr-5"
  >
    <div v-if="error">
      Unable to fetch Victor's profile. Please, try again later.
    </div>
    <div v-else-if="loading">
      <PulseLoader :loading="loading"></PulseLoader>
    </div>
    <div v-else class="flex flex-col">
      <div class="relative">
        <img
          class="w-38 h-38 rounded-full mb-5"
          :src="data.avatar_url"
          alt="profile picture"
        />
        <div class="flex flex-col items-start gap-4 mx-5 mt-4">
          <div>
            <h3 class="my-[5px] font-bold text-2xl">{{ data.name }}</h3>
            <p class="text-[#8b949e]">{{ data.login }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <span class="flex gap-x-2">
              <p class="font-light">{{ data.bio }}</p>
            </span>
            <div class="flex gap-1 mb-4">
              <span class="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  class="h-6 w-5 fill-white"
                >
                  <path
                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
                  />
                </svg>
                {{ data.followers }}
                <p>followers .</p>
              </span>
              <span class="flex gap-0.5">
                {{ data.following }}
                <p>following</p>
              </span>
            </div>
            <span class="flex gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="h-6 w-5 fill-white"
              >
                <path
                  d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                />
              </svg>
              <a
                class="text-blue-1 font-light"
                href="mailto:chukwurahvictor7@gmail.com"
                target="_blank"
                >chukwurahvictor7@gmail.com</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
