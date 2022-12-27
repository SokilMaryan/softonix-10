<template>
  <img
    v-if="isloadImage"
    :src="contact.image || skeletonEl"
    :alt="contact.name || contact.description"
    class="skeleton-loader"
    @error="$emit('error')"
    @load="$emit('load')"
  >
  <div v-else ref="skeletonEl" class="skeleton-loader" />

  <!-- <el-skeleton v-else ref="skeletonEl" style="--el-skeleton-circle-size: 100px" animated>
    <template #template>
      <el-skeleton-item variant="circle" />
    </template>
  </el-skeleton> -->
</template>

<script setup lang="ts">

const props = defineProps<{
  contact: IContact
}>()
defineEmits(['error', 'load'])

const isloadImage = ref(false)
const skeletonEl = ref()

const observer = new IntersectionObserver(loadImg)

function loadImg (entries: any, observer: any) {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      entry.target.contact = entry.target.props
      console.log(entry.target)
      observer.unobserve(entry.target)
      isloadImage.value = true
    }
  }, {
    rootMargin: '300px'
  })
}

watch(() => skeletonEl.value, newValue => {
  if (!newValue) return
  observer.observe(newValue)
})
</script>
<style>
.skeleton-loader {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}
@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>
