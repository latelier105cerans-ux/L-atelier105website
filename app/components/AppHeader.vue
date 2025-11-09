<template>
  <header class="bg-gray-25 shadow-sm sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/">
          <img
            :src="content.header.logo"
            alt="Atelier 105"
            class="h-11 w-auto"
          />
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="desktopview:hidden text-gray-900 p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop Navigation - Centered links -->
        <div
          class="hidden desktopview:flex items-center flex-1 justify-center gap-8"
        >
          <a
            href="/#lespace"
            class="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {{ content.navigation.l_espace }}
          </a>
          <a
            href="/#lapa"
            class="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {{ content.navigation.apa }}
          </a>
          <a
            href="/#autres-activites"
            class="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {{ content.navigation.autres_activités }}
          </a>
          <NuxtLink
            to="/tarifs"
            class="text-gray-700 hover:text-gray-900 transition-colors"
            active-class="text-gray-900 font-semibold"
          >
            {{ content.navigation.tarifs }}
          </NuxtLink>
          <a
            href="/#moi"
            class="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {{ content.navigation.moi }}
          </a>
        </div>

        <!-- Contact Button - Far right -->
        <div class="hidden desktopview:block">
          <NuxtLink
            to="/contact"
            class="flex justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors"
            active-class="ring-2 ring-primary-green-400 ring-offset-2"
          >
            {{ content.navigation.contact }}
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMenuOpen" class="desktopview:hidden mt-4">
          <div class="flex flex-col gap-4">
            <a
              href="/#lespace"
              @click="closeMenu"
              class="text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              {{ content.navigation.l_espace }}
            </a>
            <a
              href="/#lapa"
              @click="closeMenu"
              class="text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              {{ content.navigation.apa }}
            </a>
            <a
              href="/#autres-activites"
              @click="closeMenu"
              class="text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              {{ content.navigation.autres_activités }}
            </a>
            <NuxtLink
              to="/tarifs"
              @click="closeMenu"
              class="text-gray-700 hover:text-gray-900 transition-colors py-2"
              active-class="text-gray-900 font-semibold"
            >
              {{ content.navigation.tarifs }}
            </NuxtLink>
            <a
              href="/#moi"
              @click="closeMenu"
              class="text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              {{ content.navigation.moi }}
            </a>
            <!-- Separator -->
            <div class="h-px bg-gray-200 -mx-4"></div>
            <NuxtLink
              to="/contact"
              @click="closeMenu"
              class="flex justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors"
              active-class="ring-2 ring-primary-green-400 ring-offset-2"
            >
              {{ content.navigation.contact }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const content = useContent();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
