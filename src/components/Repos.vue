<template>
  <div v-if="error">Unable to fetch repositories!</div>
  <div v-else-if="loading">
    <SpringSpinner
      :animation-duration="1200"
      :circles-num="3"
      :circle-size="15"
      :color="spinnerColor"
    />
  </div>
  <div v-else>
    <div class="flex flex-wrap gap-y-8 gap-x-4 md:gap-x-5">
      <div
        @click="$router.push(`/repos/${item.id}/content`)"
        class="w-full lg:w-[47%] h-[150px] bg-light-1 p-3 text-blue-1 font-normal flex flex-col justify-between rounded-lg border border-[#30363d] cursor-pointer hover:scale-[1.01] transition duration-200 ease-in-out"
        v-for="item in paginatedData"
        :key="item.id"
      >
        <div class="flex items-center gap-2">
          <div class="flex items-start">
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
          <p class="text-lg font-bold text-blue-500">
            {{ item.name }}
          </p>
        </div>
        <p class="text-sm font-light mb-2 mr-auto">{{ item.description }}</p>
        <div v-if="item.language !== null" class="flex gap-2 items-center">
          <div class="h-3 w-3 bg-yellow-500 rounded-full"></div>
          <p class="text-sm font-light mr-auto">{{ item.language }}</p>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-between mt-28 fixed bottom-0 bg-light-1"
    >
      <p class="text-md font-normal font-light text-blue-1">
        Page {{ currentPage }} of {{ pageCount }}
      </p>
      <div class="flex items-center space-x-2 m-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-blue-500 text-light-1 rounded-lg py-1 px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-900 disabled:focus:outline-none hover:bg-blue-2 transition duration-200 ease-in-out"
          >
          Prev
        </button>
        <div class="flex items-center space-x-2">
          <button
            v-for="pageNumber in pageNumbers"
            :key="pageNumber"
            @click="currentPage = pageNumber"
            :class="{
              'bg-blue-500 rounded-lg py-1 px-2 text-light-1':
                currentPage === pageNumber,
              'text-grey-500 hover:text-light-2 hover:bg-blue-2 rounded-lg py-2 px-4':
                currentPage !== pageNumber,
            }"
          >
            {{ pageNumber }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === pageCount"
          class="bg-blue-500 text-light-1 rounded-lg py-1 px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-900 hover:bg-blue-2 transition duration-200 ease-in-out"
        >
          Next
        </button>
      </div>
      <div>
        <label
          for="pageCountSelect"
          class="mr-2 text-md text-blue-1 font-normal"
          >Repo Count:</label
        >
        <select
          id="pageCountSelect"
          v-model="itemsPerPage"
          @change="changePageCount"
          class="border-blue-1 rounded-lg py-1 px-2 text-md font-normal text-blue-1"
        >
          <option
            v-for="option in pageCountOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import useFetch from "../composable/useFetch";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { SpringSpinner } from 'epic-spinners'

export default {
  name: "Repositories",
  data() {
    return {
      spinnerColor: '#3DED97'
    }
  },
  components: {
    PulseLoader,
    SpringSpinner,
  },
  setup() {
    const { data, error, loading, fetchData } = useFetch(
      "https://api.github.com/users/ChukwurahVictor/repos?sort=updated/contents"
    );
    const currentPage = ref(1);
    const itemsPerPage = ref(6);

    const pageCount = computed(() => {
      return Math.ceil(data.value.length / itemsPerPage.value);
    });

    const pageNumbers = computed(() => {
      const numbers = [];
      for (let i = 1; i <= pageCount.value; i++) {
        numbers.push(i);
      }
      return numbers;
    });

    onMounted(async () => {
      await fetchData();
    });

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return data.value.slice(startIndex, endIndex);
    });

    const pageCountOptions = [4, 6, 8, 12];

    function nextPage() {
      if (currentPage.value < pageCount.value) {
        currentPage.value++;
      }
    }

    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    function changePageCount() {
      currentPage.value = 1;
    }

    return {
      data,
      error,
      loading,
      currentPage,
      itemsPerPage,
      paginatedData,
      pageCount,
      pageNumbers,
      pageCountOptions,
      nextPage,
      prevPage,
      changePageCount,
    };
  },
};
</script>