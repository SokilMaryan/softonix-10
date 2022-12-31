<template>
  <img
    v-if="isloadImage"
    :src="props.src"
    :alt="props.alt"
    class="skeleton-loader"
    @error="$emit('error')"
    @load="$emit('load')"
  >
  <div v-else ref="skeletonEl" class="skeleton-loader" />

 <!-- <div v-else ref="skeletonEl">
  <el-skeleton  style="--el-skeleton-circle-size: 100px" animated>
    <template #template>
      <el-skeleton-item variant="circle" />
    </template>
  </el-skeleton>
 </div> -->
 
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
}>()

defineEmits(['error', 'load'])

const isloadImage = ref(false)
const skeletonEl = ref()

const options = {
  rootMargin: "300px",
};

const observer = new IntersectionObserver(loadImg, options )

function loadImg (entries: any, observer: any) {
 
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      const src = entry.target.image;
      entry.target.src = src;
      console.log(props.src, 'In the viewport now')

      observer.unobserve(entry.target)
      isloadImage.value = true
    }
  }, options)
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
  background-size: 100px;
  background-position: 0 0;
  animation: shine 1s infinite;
}
@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>

