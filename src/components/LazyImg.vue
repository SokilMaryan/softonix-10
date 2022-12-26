<template #default>
  <img
    v-if="isloadImage"
    :src="contact.image"
    :alt="contact.name || contact.description"
    @error="$emit('error')"
    @load="$emit('load')"
  >
  <el-skeleton
    v-else
    ref="skeletonEl"
    style="--el-skeleton-circle-size: 100px"
    variant="circle"
    animated
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  contact: IContact
}>()
defineEmits(['error', 'load'])

const isloadImage = ref(false)
const skeletonEl = ref<HTMLDivElement>()

const observer = new IntersectionObserver(loadImg)

function loadImg (entries: any, observer: any) {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      isloadImage.value = true
      console.log(props.contact.image, 'test')
      observer.unobserve(entry.target)
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
