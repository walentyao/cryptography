<script setup lang="ts">
import InputText from 'primevue/inputtext'
</script>

<template>
  <div class="caesars">
    <div class="caesars-input">
      <div class="caesars-input__item">
        <label for="shift">Введите сдвиг</label>
        <InputText
          id="shift"
          placeholder="Сдвиг"
        />
      </div>
      <div class="caesars-input__item">
        <label for="cipher-word">Введите шифруемое слово</label>
        <InputText
          id="cipher-word"
          placeholder="Шифруемое слово"
        />
      </div>
    </div>

    <div class="caesars-output"></div>
  </div>
</template>

<style scoped lang="scss">
.caesars {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.caesars-input {
  padding: 10px;
  border-radius: 6px;
  background: rgba(218, 218, 218, 0.2);

  display: flex;
  flex-direction: row;
  column-gap: 10px;

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
}
</style>
