<template>
  <div>
    <!-- APA -->
    <section
      v-if="!content.pages.tarifs.apa.hidden"
      data-studio="apa"
      class="bg-gray-25 py-12 desktopview:py-20"
    >
      <div class="container mx-auto px-4">
        <!-- Title -->
        <div class="text-center mb-12 desktopview:mb-16">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2" data-studio-field="subtitle">
            {{ content.pages.tarifs.apa.subtitle }}
          </h2>
          <p class="text-4xl desktopview:text-5xl font-bold text-gray-900" data-studio-field="title">
            {{ content.pages.tarifs.apa.title }}
          </p>
          <p
            class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl whitespace-pre-line"
            data-studio-field="description"
          >{{ content.pages.tarifs.apa.description }}</p>
        </div>
        <!-- priceCard -->
        <div
          class="flex flex-col gap-6 mb-12 desktopview:mb-16 desktopview:flex-row desktopview:gap-8"
        >
          <div
            v-for="(plan, index) in visiblePricing"
            :key="index"
            data-studio-item="pricing"
            :data-studio-index="content.pages.tarifs.apa.pricing.indexOf(plan)"
            class="bg-secondary-earth-50 rounded-2xl p-8 flex flex-col"
          >
            <h3
              class="text-4xl text-center font-semibold text-secondary-earth-900 mb-6"
              data-studio-field="title"
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
                  <span class="text-lg font-normal text-secondary-earth-600" data-studio-field="amount">{{
                    price.amount
                  }}</span>
                  <span
                    v-if="price.label"
                    class="text-sm font-normal text-secondary-earth-600"
                      data-studio-field="label"
                    >{{ price.label }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- disclaimer -->
        <p class="text-lg font-normal text-gray-800 whitespace-pre-line" data-studio-field="disclaimer">{{ content.pages.tarifs.apa.disclaimer }}</p>
      </div>
    </section>

    <!-- Autre Activites -->
    <section
      v-if="!content.pages.tarifs.autres_activites.hidden"
      data-studio="autres_activites"
      id="autres-activites"
      class="bg-primary-green-50 py-12 desktopview:py-20 scroll-mt-20"
    >
      <div class="container mx-auto px-4">
        <!-- Title -->
        <div class="text-center mb-12 desktopview:mb-16">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2" data-studio-field="subtitle">
            {{ content.pages.tarifs.autres_activites.subtitle }}
          </h2>
          <p class="text-4xl desktopview:text-5xl font-bold text-gray-900" data-studio-field="title">
            {{ content.pages.tarifs.autres_activites.title }}
          </p>
          <p
            class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl whitespace-pre-line"
            data-studio-field="description"
          >{{ content.pages.tarifs.autres_activites.description }}</p>
        </div>
        <!-- priceCard -->
        <div
          class="flex flex-col gap-6 mb-12 desktopview:mb-16 desktopview:flex-row desktopview:gap-8"
        >
          <div
            v-for="(activity, index) in visibleActivities"
            :key="index"
            data-studio-item="activities"
            :data-studio-index="content.pages.tarifs.autres_activites.activities.indexOf(activity)"
            class="bg-primary-green-100 rounded-2xl p-8 flex flex-col flex-1"
          >
            <h3
              class="text-4xl text-center font-semibold text-primary-green-900 mb-2"
              data-studio-field="title"
            >
              {{ activity.title }}
            </h3>
            <p
              class="text-xl text-center font-semibold text-primary-green-600 mb-4"
              data-studio-field="price"
            >
              {{ activity.price }}
            </p>
            <p class="text-base text-center text-primary-green-600 mb-4 whitespace-pre-line" data-studio-field="description">{{ activity.description }}</p>
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
        <p class="text-lg font-normal text-gray-800 whitespace-pre-line" data-studio-field="disclaimer_1">{{ content.pages.tarifs.autres_activites.disclaimer_1 }}</p>
        <p class="text-lg font-normal text-gray-800 mt-10 whitespace-pre-line" data-studio-field="disclaimer_2">{{ content.pages.tarifs.autres_activites.disclaimer_2 }}</p>
      </div>
    </section>
    <!-- Planning -->
    <section
      v-if="!content.pages.tarifs.planning.hidden"
      data-studio="planning"
      class="bg-gray-25 py-12 desktopview:py-20"
    >
      <div class="container mx-auto px-4">
        <!-- Title -->
        <div class="text-left mb-12 desktopview:mb-16">
          <h2 class="text-sm font-semibold text-secondary-earth-500 mb-2" data-studio-field="subtitle">
            {{ content.pages.tarifs.planning.subtitle }}
          </h2>
          <p class="text-4xl desktopview:text-5xl font-bold text-gray-900" data-studio-field="title">
            {{ content.pages.tarifs.planning.title }}
          </p>
          <p
            class="text-gray-600 mt-4 desktopview:mt-5 font-normal text-lg desktopview:text-xl whitespace-pre-line"
            data-studio-field="description"
          >{{ content.pages.tarifs.planning.description }}</p>

          <a
            :href="content.pages.tarifs.planning.download_link.href"
            download
            data-studio-field="download_link"
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
        <img :src="content.pages.tarifs.planning.img" alt="Planning" data-studio-field="img"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Check, ArrowDownCircle } from "lucide-vue-next";

const content = await useContent();
const visiblePricing = computed(() =>
  content.value.pages.tarifs.apa.pricing.filter((plan) => !plan.hidden)
);
const visibleActivities = computed(() =>
  content.value.pages.tarifs.autres_activites.activities.filter((a) => !a.hidden)
);

// Icon mapping
const iconMap: Record<string, any> = {
  ArrowDownCircle,
};

// SEO
useSeoMeta({
  title: () => content.value.pages.tarifs.metaTitle,
  description: () => content.value.pages.tarifs.metaDescription,
  ogTitle: () => content.value.pages.tarifs.metaTitle,
  ogDescription: () => content.value.pages.tarifs.metaDescription,
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>
