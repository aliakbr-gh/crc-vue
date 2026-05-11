import { onBeforeMount, watch } from "vue";

export function useTitle(title) {
  const setTitle = () => {
    document.title = title;
  };

  onBeforeMount(setTitle);

  watch(() => title, setTitle);
}
