<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})
const toast = useToast()
const { fetch } = useUserSession()
const { register, authenticate } = useWebAuthn()
const username = ref('')
const name = ref('')
async function signUp() {
  await register({
    userName: username.value,
    displayName: name.value
  })
    .then(fetch)
    .then(async () => await navigateTo('/todos'))
    .catch((error) => {
      toast.add({
        title: error.data?.message || error.message,
        description: error.data?.data?.issues[0]?.message || error.data?.data,
        color: 'red'
      })
    })
}
async function signIn() {
  await authenticate(username.value)
    .then(fetch)
    .then(async () => await navigateTo('/todos'))
    .catch((error) => {
      toast.add({
        title: error.data?.message || error.message,
        description: error.data?.data,
        color: 'red'
      })
    })
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        Todo List
      </h3>
      <UButton
        to="/"
        icon="i-ph-arrow-left"
        label="Back home"
        color="gray"
        variant="ghost"
      />
    </template>
    <div class="flex gap-2 justify-between">
      <form
        class="flex flex-col gap-2"
        @submit.prevent="signUp"
      >
        <UFormGroup
          label="Username"
          required
        >
          <UInput
            v-model="username"
            name="username"
          />
        </UFormGroup>
        <UFormGroup
          label="Full Name"
          required
        >
          <UInput
            v-model="name"
            name="name"
          />
        </UFormGroup>
        <UButton
          type="submit"
          color="black"
          label="Sign up"
          :disabled="!username"
        />
      </form>
      <UDivider
        orientation="vertical"
        label="or"
      />
      <form
        class="flex flex-col gap-2"
        @submit.prevent="signIn"
      >
        <UFormGroup
          label="Username"
        >
          <UInput
            v-model="username"
          />
        </UFormGroup>
        <UButton
          type="submit"
          color="black"
          label="Sign in"
        />
      </form>
    </div>
  </UCard>
</template>
