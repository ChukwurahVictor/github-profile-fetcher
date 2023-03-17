<template>
  <div>
    <div class="bg-[#161b22]">
      <nav
        class="container static px-6 py-5 mx-auto md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="text-xl font-bold text-white md:text-2xl hover:text-gray-200"
          >
            <div class="flex gap-1">
              <img
                src="../assets/github-logo.jpg"
                alt="github_icon"
                class="w-6 h-6"
              />
              <p class="italic font-serif font-medium">profiler</p>
            </div>
          </router-link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="text-white hover:text-gray-300 focus:outline-none focus:text-white"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <router-link
            to="/"
            class="text-md font-bold text-white hover:text-gray-300"
          >
            Home
          </router-link>
          <router-link
            to="/error"
            class="text-md font-bold text-white hover:text-gray-300"
          >
            Error Page
          </router-link>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>
