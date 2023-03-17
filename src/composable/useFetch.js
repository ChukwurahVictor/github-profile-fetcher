import { ref } from "vue";

export default function useFetch(url) {
  const data = ref([]);
  const error = ref("");
  const loading = ref(false);
  loading.value = true;

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        error.value = "could not fetch data";
      }
      data.value = await res.json();
    } catch (err) {
      error.value = err.message;
    }

    loading.value = false;
  };
  return { data, error, loading, fetchData };
}
