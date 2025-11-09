<template>
  <div>
    <!-- APA -->
    <section class="bg-gray-25 py-12 desktopview:py-20">
      <div class="container mx-auto px-4">
        <!-- Title -->
        <div class="text-center mb-12 desktopview:mb-16">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2">
            {{ content.pages.tarifs.apa.subtitle }}
          </h2>
          <p class="text-4xl desktopview:text-5xl font-bold text-gray-900">
            {{ content.pages.tarifs.apa.title }}
          </p>
          <p
            class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl"
          >
            {{ content.pages.tarifs.apa.description }}
          </p>
        </div>
        <!-- priceCard -->
        <div
          class="flex flex-col gap-6 mb-12 desktopview:mb-16 desktopview:flex-row desktopview:gap-8"
        >
          <div
            v-for="(plan, index) in content.pages.tarifs.apa.pricing"
            :key="index"
            class="bg-secondary-earth-50 rounded-2xl p-8 flex flex-col"
          >
            <h3
              class="text-4xl text-center font-semibold text-secondary-earth-900 mb-6"
            >
              {{ plan.title }}
            </h3>
            <div class="flex flex-col gap-3">
              <div
                v-for="(price, priceIndex) in plan.prices"
                :key="priceIndex"
                class="flex items-start gap-3"
              >
                <div
                  class="h-6 w-6 rounded-full bg-secondary-earth-600 flex justify-center items-center flex-shrink-0"
                >
                  <Check
                    :strokeWidth="2"
                    class="w-4 h-4 text-gray-25 flex-shrink-0"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-lg font-normal text-secondary-earth-600">{{
                    price.amount
                  }}</span>
                  <span
                    v-if="price.label"
                    class="text-sm font-normal text-secondary-earth-600"
                    >{{ price.label }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- disclaimer -->
        <p class="text-lg font-normal text-gray-800">
          {{ content.pages.tarifs.apa.disclaimer }}
        </p>
      </div>
    </section>

    <!-- Autre Activites -->
    <section
      id="autres-activites"
      class="bg-primary-green-50 py-12 desktopview:py-20 scroll-mt-20"
    >
      <div class="container mx-auto px-4">
        <!-- Title -->
        <div class="text-center mb-12 desktopview:mb-16">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2">
            {{ content.pages.tarifs.autres_activites.subtitle }}
          </h2>
          <p class="text-4xl desktopview:text-5xl font-bold text-gray-900">
            {{ content.pages.tarifs.autres_activites.title }}
          </p>
          <p
            class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl"
          >
            {{ content.pages.tarifs.autres_activites.description }}
          </p>
        </div>
        <!-- priceCard -->
        <div
          class="flex flex-col gap-6 mb-12 desktopview:mb-16 desktopview:flex-row desktopview:gap-8"
        >
          <div
            v-for="(activity, index) in content.pages.tarifs.autres_activites
              .activities"
            :key="index"
            class="bg-primary-green-100 rounded-2xl p-8 flex flex-col flex-1"
          >
            <h3
              class="text-4xl text-center font-semibold text-primary-green-900 mb-2"
            >
              {{ activity.title }}
            </h3>
            <p
              class="text-xl text-center font-semibold text-primary-green-600 mb-4"
            >
              {{ activity.price }}
            </p>
            <p class="text-base text-center text-primary-green-600 mb-4">
              {{ activity.description }}
            </p>
            <div class="flex flex-col gap-2">
              <div
                v-for="(slot, slotIndex) in activity.schedule"
                :key="slotIndex"
                class="flex items-center gap-3"
              >
                <div
                  class="h-6 w-6 rounded-full bg-primary-green-900 flex justify-center items-center flex-shrink-0"
                >
                  <Check
                    :strokeWidth="2"
                    class="w-4 h-4 text-primary-green-50 flex-shrink-0"
                  />
                </div>
                <span class="text-base text-gray-900">{{ slot }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- disclaimer -->
        <p class="text-lg font-normal text-gray-800">
          {{ content.pages.tarifs.autres_activites.disclaimer_1 }}
        </p>
        <p class="text-lg font-normal text-gray-800 mt-10">
          {{ content.pages.tarifs.autres_activites.disclaimer_2 }}
        </p>
      </div>
    </section>
    <!-- Planning -->
    <section class="bg-gray-25 py-12 desktopview:py-20">
      <div class="container mx-auto px-4">
        <!-- Title -->
        <div class="text-left mb-12 desktopview:mb-16">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2">
            {{ content.pages.tarifs.planning.subtitle }}
          </h2>
          <p class="text-4xl desktopview:text-5xl font-bold text-gray-900">
            {{ content.pages.tarifs.planning.title }}
          </p>
          <p
            class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl"
          >
            {{ content.pages.tarifs.planning.description }}
          </p>

          <a
            :href="content.pages.tarifs.planning.download_link.href"
            download
            class="text-primary-green-400 mt-4 desktopview:mt-5 font-semibold text-base cursor-pointer hover:underline inline-flex items-center gap-2"
          >
            <component
              v-if="content.pages.tarifs.planning.download_link.icon"
              :is="iconMap[content.pages.tarifs.planning.download_link.icon]"
              class="w-5 h-5"
            />
            {{ content.pages.tarifs.planning.download_link.label }}
          </a>
        </div>
        <img :src="content.pages.tarifs.planning.img" alt="Planning" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Check, ArrowDownCircle } from "lucide-vue-next";

const content = useContent();

// Icon mapping
const iconMap: Record<string, any> = {
  ArrowDownCircle,
};

// SEO
useSeoMeta({
  title: content.pages.tarifs.metaTitle,
  description: content.pages.tarifs.metaDescription,
  ogTitle: content.pages.tarifs.metaTitle,
  ogDescription: content.pages.tarifs.metaDescription,
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>
