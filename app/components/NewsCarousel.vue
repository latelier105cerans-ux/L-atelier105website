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
          <h2
            class="text-sm font-semibold text-secondary-earth-500 mb-2"
            data-studio-field="subtitle"
          >
            {{ subtitle }}
          </h2>
          <p
            class="text-2xl desktopview:text-4xl font-bold text-gray-900"
            data-studio-field="title"
          >
            {{ title }}
          </p>
        </div>

        <!-- Carousel Container -->
        <div class="w-full max-w-4xl overflow-hidden">
          <div
            ref="track"
            class="flex"
            :class="{ 'transition-transform duration-500 ease-in-out': animate }"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            @transitionend="onTransitionEnd"
          >
            <!-- The last slide is a copy of the first, so the loop always moves forward -->
            <div
              v-for="(item, index) in slides"
              :key="index"
              class="w-full flex-shrink-0"
              :aria-hidden="index >= visibleItems.length || undefined"
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
              activeIndex === index
                ?'bg-secondary-earth-300'
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

const slides = computed(() =>
  visibleItems.value.length > 1
    ? [...visibleItems.value, visibleItems.value[0]!]
    : visibleItems.value
);

const track = ref<HTMLElement | null>(null);
const currentSlide = ref(0);
const animate = ref(true);
const activeIndex = computed(() => currentSlide.value % visibleItems.value.length);
const autoPlayTimer = ref<ReturnType<typeof setInterval> | null>(null);

// Once on the copy of the first slide, jump back to the real one without animation (invisible)
const snapToStart = async () => {
  if (currentSlide.value < visibleItems.value.length) return;
  animate.value = false;
  currentSlide.value = 0;
  await nextTick();
  void track.value?.offsetWidth; // force the browser to apply the jump before animations come back
  animate.value = true;
};

const onTransitionEnd = (event: TransitionEvent) => {
  if (event.target === event.currentTarget) snapToStart();
};

const goToSlide = async (index: number) => {
  await snapToStart();
  currentSlide.value = index;
  resetAutoPlay();
};

const nextSlide = async () => {
  // transitionend may not fire in a background tab, so snap here too
  await snapToStart();
  currentSlide.value = Math.min(currentSlide.value + 1, slides.value.length - 1);
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
