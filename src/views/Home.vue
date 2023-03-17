<script>
import Profile from "../components/Profile.vue";
import Repos from "../components/Repos.vue";
import RepoStat from "@/components/RepoStat.vue";

export default {
  components: { Profile, Repos, RepoStat },
};
</script>
<template>
  <main
    class="max-w-[1200px] mx-auto gap-10 mt-1 mx-8 flex justify-between flex-col sm:flex-row mb-16 h-[90%] overflow-auto"
  >
    <Profile />
    <div class="m-4 gap-8">
      <RepoStat />
      <Repos />
    </div>
  </main>
</template>
