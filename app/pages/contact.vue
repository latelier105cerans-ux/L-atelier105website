<template>
  <div>
    <!-- Combined Hero + Form Section -->
    <section
      class="bg-gradient-to-b from-gray-50 to-white py-12 desktopview:py-20"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Desktop: Two column layout with image spanning full height -->
          <div class="grid grid-cols-1 desktopview:grid-cols-2 gap-12">
            <!-- Left Column: Title, Subtitle, and Form -->
            <div class="flex flex-col gap-8">
              <!-- Title -->
              <div>
                <h1
                  class="text-4xl desktopview:text-5xl font-bold text-gray-900 mb-4"
                >
                  {{ content.pages.contact.title }}
                </h1>
                <p
                  class="text-gray-600 font-normal text-lg desktopview:text-xl"
                >
                  {{ content.pages.contact.subtitle }}
                </p>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Success/Error Messages -->
                <div
                  v-if="submitStatus === 'success'"
                  class="p-4 bg-primary-green-100 text-primary-green-900 rounded-lg"
                >
                  Message envoyé avec succès ! Nous vous répondrons bientôt.
                </div>
                <div
                  v-if="submitStatus === 'error'"
                  class="p-4 bg-red-100 text-red-900 rounded-lg"
                >
                  Une erreur s'est produite. Veuillez réessayer.
                </div>

                <!-- Name -->
                <div>
                  <label
                    for="name"
                    class="block text-lg font-semibold text-gray-800 mb-2"
                  >
                    {{ content.pages.contact.form.firstname }}
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    name="firstname"
                    type="text"
                    required
                    :placeholder="
                      content.pages.contact.form.firstnamePlaceholder
                    "
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-400 focus:border-transparent"
                  />
                </div>
                <!-- Lastname -->
                <div>
                  <label
                    for="lastname"
                    class="block text-lg font-semibold text-gray-800 mb-2"
                  >
                    {{ content.pages.contact.form.lastname }}
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="lastname"
                    v-model="form.lastname"
                    name="lastname"
                    type="text"
                    required
                    :placeholder="
                      content.pages.contact.form.lastnamePlaceholder
                    "
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-400 focus:border-transparent"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="email"
                    class="block text-lg font-semibold text-gray-800 mb-2"
                  >
                    {{ content.pages.contact.form.email }}
                    <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    type="email"
                    required
                    :placeholder="content.pages.contact.form.emailPlaceholder"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-400 focus:border-transparent"
                  />
                </div>
                <!-- Phone -->

                <div>
                  <label
                    for="phone"
                    class="block text-lg font-semibold text-gray-800 mb-2"
                  >
                    {{ content.pages.contact.form.phone }}
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    name="phone"
                    type="tel"
                    :placeholder="content.pages.contact.form.phonePlaceholder"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-400 focus:border-transparent"
                  />
                </div>

                <!-- Message -->
                <div>
                  <label
                    for="message"
                    class="block text-lg font-semibold text-gray-800 mb-2"
                  >
                    {{ content.pages.contact.form.message }}
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    name="message"
                    required
                    rows="6"
                    :placeholder="content.pages.contact.form.messagePlaceholder"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-400 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex w-full justify-center items-center bg-primary-green-400 h-11 px-6 rounded-full text-gray-25 hover:bg-primary-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting">{{
                    content.pages.contact.form.submit
                  }}</span>
                  <span v-else>Envoi en cours...</span>
                </button>
              </form>
            </div>

            <!-- Right Column: Image - Hidden on mobile -->
            <div class="hidden desktopview:block">
              <img
                :src="content.pages.contact.img"
                alt="Contact"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <!-- News Section -->
          </div>
        </div>
      </div>
    </section>
    <NewsCarousel
      :title="content.pages.accueil.news.title"
      :subtitle="content.pages.accueil.news.subtitle"
      :items="content.pages.accueil.news.items"
    />
  </div>
</template>

<script setup lang="ts">
const content = useContent();
const config = useRuntimeConfig();

const form = ref({
  name: "",
  email: "",
  message: "",
  lastname: "",
  phone: "",
});

const isSubmitting = ref(false);
const submitStatus = ref<"idle" | "success" | "error">("idle");

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = "idle";

  try {
    const formData = new FormData();
    formData.append("access_key", config.public.web3formsAccessKey);
    formData.append("firstname", form.value.name);
    formData.append("lastname", form.value.lastname);
    formData.append("email", form.value.email);
    formData.append("phone", form.value.phone);
    formData.append("message", form.value.message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      submitStatus.value = "success";
      // Reset form
      form.value = {
        name: "",
        email: "",
        message: "",
        lastname: "",
        phone: "",
      };
      // Clear success message after 5 seconds
      setTimeout(() => {
        submitStatus.value = "idle";
      }, 5000);
    } else {
      submitStatus.value = "error";
    }
  } catch (error) {
    console.error("Form submission error:", error);
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};

// SEO
useSeoMeta({
  title: content.pages.contact.metaTitle,
  description: content.pages.contact.metaDescription,
  ogTitle: content.pages.contact.metaTitle,
  ogDescription: content.pages.contact.metaDescription,
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>
