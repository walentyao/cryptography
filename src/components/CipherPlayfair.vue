<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import {ref} from "vue";
import {playfairDecrypt, playfairEncrypt} from "@/algoritms/cipher-playfair";

const inputData = ref<{
  cipherKey: string,
  str: string
}>({
  cipherKey: '',
  str: ''
})

const cipherText = ref<string>('')
const deCipherText = ref<string>('')
const isOpenResult = ref<boolean>(false)
const isOpenResultDeCipher = ref<boolean>(false)
const errorMessage = ref<string>('')

const handlerClickCipherText = () => {

  errorMessage.value = ''

  if (!inputData.value.str || !inputData.value.cipherKey)
    errorMessage.value = 'Введите корректные данные!'

  if (!errorMessage.value){
    cipherText.value = playfairEncrypt(inputData.value.str, inputData.value.cipherKey)
    isOpenResult.value = true
    isOpenResultDeCipher.value = false
  }
}

const handlerClickDeCipherText = () => {
  deCipherText.value = playfairDecrypt(cipherText.value, inputData.value.cipherKey)
  if (deCipherText.value) isOpenResultDeCipher.value = true
}
</script>

<template>
  <div class="caesars">
    <div class="caesars-input">
      <div class="caesars-input__form">
        <div class="caesars-input__item">
          <label for="shift">Введите ключ</label>
          <InputText
              id="shift"
              placeholder="Ключ"
              v-model="inputData.cipherKey"
          />
        </div>
        <div class="caesars-input__item">
          <label for="cipher-word">Введите шифруемый текст</label>
          <InputText
              id="cipher-word"
              placeholder="Шифруемый текст"
              v-model="inputData.str"
          />
        </div>
      </div>
      <div class="caesars-input__error" v-if="errorMessage">
        <span class="p-error">{{errorMessage}}</span>
      </div>
      <div class="caesars-input__button">
        <Button label="Зашифровать текст" @click="handlerClickCipherText"/>
      </div>
    </div>

    <Transition name="slide-fade" mode="out-in">
      <div class="caesars-output" v-if="isOpenResult">
        <div class="caesars-output__item">
          <div class="caesars-output__text">
            <span>Шифртекст: </span>
            <span>{{ cipherText }}</span>
          </div>
          <Button label="Расшифровать текст" size="small" @click="handlerClickDeCipherText"/>
        </div>
        <Transition name="slide-fade" mode="out-in">
          <div v-if="isOpenResultDeCipher" class="caesars-output__item">
            <div class="caesars-output__text">
              <span>Расшифрованный текст: </span>
              <span>{{ deCipherText }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
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
  flex-direction: column;
  row-gap: 10px;
  align-items: flex-end;

  &__form {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
}

.caesars-output {
  border-radius: 6px;
  padding: 10px;
  background: rgba(218, 218, 218, 0.2);

  display: flex;
  flex-direction: column;
  row-gap: 10px;

  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
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
