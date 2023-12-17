<script setup lang="ts">
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import CipherCaesars from '@/components/CipherCaesars.vue'
import CipherPlayfair from '@/components/CipherPlayfair.vue'
import { computed, ref } from 'vue'

const valueTabs = ref({ name: 'Шифр Цезаря', code: 1 })
const options = ref([
  { name: 'Шифр Цезаря', code: 1 },
  { name: 'Шифр Playfair', code: 2 }
])

const activeComponent = computed(() => {
  return valueTabs.value.code == 1 ? CipherCaesars : CipherPlayfair
})
</script>

<template>
  <div class="app">
    <div class="tabs">
      <SelectButton
        v-model="valueTabs"
        :options="options"
        option-label="name"
        aria-labelledby="basic"
      />
    </div>
    <Transition
      name="slide-fade"
      mode="out-in"
    >
      <component :is="activeComponent" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  justify-content: center;
  align-items: center;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
