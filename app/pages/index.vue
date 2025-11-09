<template>
  <div>
    <!-- Section 1: L'Espace -->
    <section
      id="lespace"
      class="py-12 desktopview:py-16 scroll-mt-20 bg-secondary-earth-50"
    >
      <div class="container mx-auto px-4">
        <!-- Mobile Layout -->
        <div class="desktopview:hidden flex flex-col gap-10">
          <!-- Background with text -->
          <div class="bg-gray-25 rounded-3xl p-6">
            <div class="flex flex-col gap-6">
              <h1 class="font-semibold text-4xl">
                Bienvenue à<br />L'atelier 105 !
              </h1>
              <p class="text-base">
                {{ content.pages.accueil.hero.subtitle }}
              </p>
              <p class="text-base">
                {{ content.pages.accueil.hero.subtitle_2 }}
              </p>
              <div class="flex justify-center">
                <a
                  href="/#lapa"
                  class="flex justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors"
                >
                  {{ content.pages.accueil.hero.cta }}
                </a>
              </div>
            </div>
          </div>
          <!-- Image outside background - landscape orientation -->
          <div class="w-full">
            <img
              :src="content.pages.accueil.hero.img"
              alt="L'Espace"
              class="w-full h-auto aspect-video object-cover rounded-2xl"
            />
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden desktopview:block">
          <div class="bg-gray-25 rounded-3xl p-12">
            <div class="flex items-center gap-10">
              <!-- Text on the left -->
              <div class="flex-1 flex flex-col gap-8">
                <h1 class="font-semibold text-6xl">
                  Bienvenue à<br />L'atelier 105 !
                </h1>
                <p class="text-lg">
                  {{ content.pages.accueil.hero.subtitle }}
                </p>
                <p class="text-lg">
                  {{ content.pages.accueil.hero.subtitle_2 }}
                </p>
                <NuxtLink
                  to="/contact"
                  class="flex justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors w-fit"
                >
                  {{ content.pages.accueil.hero.cta }}
                </NuxtLink>
              </div>
              <!-- Image on the right -->
              <div class="flex-1 flex justify-end">
                <img
                  :src="content.pages.accueil.hero.img"
                  alt="L'Espace"
                  class="w-full max-w-[560px] h-auto max-h-[640px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- News Section -->
    <NewsCarousel
      :title="content.pages.accueil.news.title"
      :subtitle="content.pages.accueil.news.subtitle"
      :items="content.pages.accueil.news.items"
    />

    <!-- Section 2: L'APA -->
    <section
      id="lapa"
      class="py-12 desktopview:py-20 bg-secondary-earth-50 scroll-mt-20"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Title -->
          <div class="text-center mb-12 desktopview:mb-16">
            <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2">
              {{ content.pages.accueil.apa.subtitle }}
            </h2>
            <p class="text-4xl desktopview:text-5xl font-bold text-gray-900">
              {{ content.pages.accueil.apa.title }}
            </p>
            <p
              class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl"
            >
              {{ content.pages.accueil.apa.description }}
            </p>
          </div>

          <!-- Mobile Layout -->
          <div class="desktopview:hidden flex flex-col gap-10">
            <!-- All features stacked -->
            <div
              v-for="(feature, index) in content.pages.accueil.apa.features"
              :key="index"
              class="flex flex-col gap-4"
            >
              <div
                class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center"
              >
                <component
                  :is="iconMap[feature.icon]"
                  class="w-6 h-6 text-primary-green-400"
                />
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-xl text-gray-900">
                  {{ feature.title }}
                </h3>
                <p class="text-base font-normal text-gray-800">
                  {{ feature.description }}
                </p>
              </div>
            </div>

            <!-- Image -->
            <div class="w-full">
              <img
                :src="content.pages.accueil.apa.img"
                alt="APA"
                class="w-full h-auto rounded-2xl aspect-video object-cover"
              />
            </div>

            <!-- Button -->
            <div class="flex justify-center">
              <NuxtLink
                to="/tarifs"
                class="flex justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors"
              >
                {{ content.pages.accueil.apa.cta }}
              </NuxtLink>
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="hidden desktopview:flex flex-col gap-12">
            <!-- Three column layout -->
            <div class="grid grid-cols-3 gap-16 items-start">
              <!-- Left Column: First 2 features -->
              <div class="flex flex-col gap-12">
                <div
                  v-for="(
                    feature, index
                  ) in content.pages.accueil.apa.features.slice(0, 2)"
                  :key="index"
                  class="flex flex-col gap-4"
                >
                  <div
                    class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center"
                  >
                    <component
                      :is="iconMap[feature.icon]"
                      class="w-6 h-6 text-primary-green-400"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <h3 class="font-semibold text-xl text-gray-900">
                      {{ feature.title }}
                    </h3>
                    <p class="text-base font-normal text-gray-800">
                      {{ feature.description }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Center: Image -->
              <div class="flex justify-center h-full">
                <img
                  :src="content.pages.accueil.apa.img"
                  alt="APA"
                  class="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <!-- Right Column: Last 2 features -->
              <div class="flex flex-col gap-12">
                <div
                  v-for="(
                    feature, index
                  ) in content.pages.accueil.apa.features.slice(2, 4)"
                  :key="index"
                  class="flex flex-col gap-4"
                >
                  <div
                    class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center"
                  >
                    <component
                      :is="iconMap[feature.icon]"
                      class="w-6 h-6 text-primary-green-400"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <h3 class="font-semibold text-xl text-gray-900">
                      {{ feature.title }}
                    </h3>
                    <p class="text-base font-normal text-gray-800">
                      {{ feature.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Button centered below -->
            <div class="flex justify-center">
              <NuxtLink
                to="/tarifs"
                class="flex justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors"
              >
                {{ content.pages.accueil.apa.cta }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Autres Activités -->
    <section
      id="autres-activites"
      class="py-12 desktopview:py-20 scroll-mt-20 bg-gray-25"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Title -->
          <div class="text-center mb-12 desktopview:mb-16">
            <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2">
              {{ content.pages.accueil.autres_activites.subtitle }}
            </h2>
            <p class="text-4xl desktopview:text-5xl font-bold text-gray-900">
              {{ content.pages.accueil.autres_activites.title }}
            </p>
            <p
              class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl"
            >
              {{ content.pages.accueil.autres_activites.description }}
            </p>
          </div>

          <!-- Mobile Layout -->
          <div class="desktopview:hidden flex flex-col gap-12">
            <div
              v-for="activities in content.pages.accueil.autres_activites
                .activities"
              :key="activities.title"
              class="flex flex-col gap-6"
            >
              <div
                class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center"
              >
                <component
                  :is="iconMap[activities.icon]"
                  class="w-6 h-6 text-primary-green-400"
                />
              </div>
              <h2 class="text-2xl font-semibold text-gray-900">
                {{ activities.title }}
              </h2>
              <p class="text-base font-normal text-gray-800">
                {{ activities.description }}
              </p>
              <p class="text-base font-normal text-gray-800">
                {{ activities.description_2 }}
              </p>
              <div>
                <NuxtLink
                  v-if="activities.link"
                  :to="activities.link.href"
                  class="inline-flex items-center text-primary-green-400 text-base font-semibold hover:underline"
                >
                  {{ activities.link.label }}
                  <component
                    v-if="activities.link.icon"
                    :is="iconMap[activities.link.icon]"
                    class="w-4 h-4 ml-2"
                  />
                </NuxtLink>
              </div>
              <img
                class="rounded-2xl aspect-video object-cover w-full"
                :src="activities.img"
                :alt="activities.title"
              />
            </div>
          </div>

          <!-- Desktop Layout -->
          <div class="hidden desktopview:flex flex-col gap-20">
            <div
              v-for="(activities, index) in content.pages.accueil
                .autres_activites.activities"
              :key="activities.title"
              class="grid grid-cols-2 gap-12 items-center"
              :class="index % 2 === 0 ? '' : 'direction-rtl'"
            >
              <!-- Content -->
              <div class="flex flex-col gap-6">
                <div
                  class="rounded-full h-12 w-12 bg-primary-green-100 flex items-center justify-center"
                >
                  <component
                    :is="iconMap[activities.icon]"
                    class="w-6 h-6 text-primary-green-400"
                  />
                </div>
                <h2 class="text-3xl font-semibold text-gray-900">
                  {{ activities.title }}
                </h2>
                <p class="text-lg font-normal text-gray-800">
                  {{ activities.description }}
                </p>
                <p class="text-lg font-normal text-gray-800">
                  {{ activities.description_2 }}
                </p>
                <div>
                  <NuxtLink
                    v-if="activities.link"
                    :to="activities.link.href"
                    class="inline-flex items-center text-primary-green-400 text-lg font-semibold hover:underline"
                  >
                    {{ activities.link.label }}
                    <component
                      v-if="activities.link.icon"
                      :is="iconMap[activities.link.icon]"
                      class="w-5 h-5 ml-2"
                    />
                  </NuxtLink>
                </div>
              </div>

              <!-- Image -->
              <div>
                <img
                  :class="[
                    'w-full h-[560px] object-cover',
                    index % 2 === 0 ? 'rounded-l-2xl' : 'rounded-r-2xl',
                  ]"
                  :src="activities.img"
                  :alt="activities.title"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: À propos de moi -->
    <section
      id="moi"
      class="py-12 desktopview:py-20 bg-secondary-earth-50 scroll-mt-20"
    >
      <div class="container mx-auto px-4">
        <div
          class="bg-gray-25 px-6 py-10 desktopview:px-12 desktopview:py-16 rounded-2xl"
        >
          <!-- Mobile Layout -->
          <div class="flex flex-col gap-8 desktopview:hidden">
            <!-- Title & Content -->
            <div class="flex flex-col gap-6">
              <h2
                class="text-sm font-semibold text-secondary-earth-500 text-center"
              >
                {{ content.pages.accueil.moi.subtitle }}
              </h2>
              <div class="text-center">
                <p class="text-3xl font-bold text-gray-900">
                  {{ content.pages.accueil.moi.title }}
                </p>
                <p class="text-3xl text-gray-900 font-roustel mt-2">
                  {{ content.pages.accueil.moi.name }}
                </p>
              </div>
              <div class="flex flex-col gap-4">
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description }}
                </p>
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description_2 }}
                </p>
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description_3 }}
                </p>
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description_4 }}
                </p>
              </div>
            </div>
            <!-- Image -->
            <img
              class="rounded-2xl w-full aspect-video object-cover"
              :src="content.pages.accueil.moi.img"
              :alt="content.pages.accueil.moi.subtitle"
            />
          </div>

          <!-- Desktop Layout -->
          <div class="hidden desktopview:grid grid-cols-2 gap-12 items-center">
            <!-- Image -->
            <div>
              <img
                class="rounded-2xl w-full h-[800px] object-cover"
                :src="content.pages.accueil.moi.img"
                :alt="content.pages.accueil.moi.subtitle"
              />
            </div>

            <!-- Content -->
            <div class="flex flex-col gap-6">
              <h2 class="text-base font-semibold text-secondary-earth-500">
                {{ content.pages.accueil.moi.subtitle }}
              </h2>
              <div>
                <p class="text-4xl font-bold text-gray-900">
                  {{ content.pages.accueil.moi.title }}
                </p>
                <p class="text-4xl text-gray-900 font-roustel mt-2">
                  {{ content.pages.accueil.moi.name }}
                </p>
              </div>
              <div class="flex flex-col gap-4">
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description }}
                </p>
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description_2 }}
                </p>
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description_3 }}
                </p>
                <p class="text-base font-normal text-gray-800">
                  {{ content.pages.accueil.moi.description_4 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  HeartHandshake,
  UserRound,
  HandHeart,
  Ticket,
  Dumbbell,
  RotateCw,
  Baby,
  Salad,
  ArrowRight,
} from "lucide-vue-next";
const content = useContent();

// Icon mapping for features
const iconMap: Record<string, any> = {
  HeartHandshake,
  UserRound,
  HandHeart,
  Ticket,
  Dumbbell,
  RotateCw,
  Baby,
  Salad,
  ArrowRight,
};

// SEO
useSeoMeta({
  title: content.pages.accueil.metaTitle,
  description: content.pages.accueil.metaDescription,
  ogTitle: content.pages.accueil.metaTitle,
  ogDescription: content.pages.accueil.metaDescription,
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.direction-rtl {
  direction: rtl;
}
.direction-rtl > * {
  direction: ltr;
}
</style>
