<template>
  <div>
    <div>
      {{ $attrs.nameGromad.data['Територіальна громада'] }} {{ $attrs.nameGromad.type['Тип громади'] }} територіальна громада
    </div>
  </div>
</template>

<script>
export default {
  name: "nameGromad"
}
</script>

<style scoped>
div{
  margin-left:3vw;
  color:#333333;
  font-size:24px;
  font-weight:500;
}
</style>
