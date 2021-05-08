<template>
    
</template>

<script>
export default{
    created() {
        const resp = this.$store.dispatch('destroyToken')
        // console.log(resp)
        this.$router.push('/pages/login')
    }
}
</script>