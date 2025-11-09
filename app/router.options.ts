import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If there's a hash (anchor link), scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80, // Offset for sticky header
      };
    }

    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition;
    }

    // Otherwise, scroll to top
    return { top: 0 };
  },
};
