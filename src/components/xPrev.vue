<template>
  <div ref="prev">{{data}}</div>
</template>

<script>
export default {
  name: 'xPrev',
  props: {
    data: String,
  },
  mounted(){
    let content = this.data.replace(/\r/g, "<br/>");
    console.log(content)
    this.$refs.prev.innerHTML = content
  }
}
</script>
