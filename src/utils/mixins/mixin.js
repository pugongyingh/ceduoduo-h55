import vue from  'vue'

export default  {
  methods:{
    to(path) {
      this.$router.push(path)
    }
  }
}
