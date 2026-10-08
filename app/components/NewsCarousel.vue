<template>
  <section
    v-if="visibleItems.length"
    data-studio="news"
    data-studio-list="items"
    class="bg-gray-25 py-12 desktopview:py-16"
  >
    <div class="container mx-auto px-4">
      <div
        class="bg-secondary-earth-50 rounded-3xl p-8 desktopview:p-12 flex flex-col gap-8 items-center"
      >
        <!-- Title -->
        <div class="text-center">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2">
            {{ subtitle }}
          </h2>
          <p class="text-2xl desktopview:text-4xl font-bold text-gray-900">
            {{ title }}
          </p>
        </div>

        <!-- Carousel Container -->
        <div class="w-full max-w-4xl overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(item, index) in visibleItems"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="px-4 text-center">
                <p class="text-lg desktopview:text-xl text-gray-900 whitespace-pre-line">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicators -->
        <div class="flex gap-2">
          <button
            v-for="(_, index) in visibleItems"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-colors"
            :class="
              currentSlide === index
                ? 'bg-secondary-earth-300'
                : 'bg-secondary-earth-100 hover:bg-secondary-earth-200'
            "
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface NewsItem {
  readonly description: string;
  readonly until?: string; // YYYY-MM-DD, last day the item is shown
  readonly hidden?: boolean;
}

interface Props {
  title: string;
  subtitle: string;
  items: readonly NewsItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  autoPlayInterval: 5000,
});

// Hide news turned off in Studio or whose "until" date is past (compared in French time, YYYY-MM-DD strings)
const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
const visibleItems = computed(() =>
  props.items.filter(
    (item) => !item.hidden && (!item.until || item.until >= today)
  )
);

const currentSlide = ref(0);
const autoPlayTimer = ref<ReturnType<typeof setInterval> | null>(null);

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetAutoPlay();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % visibleItems.value.length;
};

const startAutoPlay = () => {
  if (props.autoPlay && visibleItems.value.length > 1) {
    autoPlayTimer.value = setInterval(() => {
      nextSlide();
    }, props.autoPlayInterval);
  }
};

const stopAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
    autoPlayTimer.value = null;
  }
};

const resetAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>
