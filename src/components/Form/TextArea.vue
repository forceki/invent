<template>
  <div>
    <p class="label-control">
      {{ props.label }} <span class="text-red-400">{{ props.required ? "*" : "" }}</span>
    </p>
    <textarea
      id="a"
      class="input-control p-1"
      :placeholder="props.placeholder"
      :value="props.value"
      :class="props.inputClass + ' ' + (props.error ? 'border-red-400' : '')"
      @change="(e) => props.onChange(e)"
    />
    <p class="text-xs text-red-400">
      {{ props.errorText }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Boolean,
  errorText: String,
  required: Boolean,
  label: String,
  inputClass: String,
  placeholder: String,
  onChange: Function,
  value: String,
  model: String,
});
</script>

<style></style>
