// axios
import axios from 'axios'
import Vue from 'vue'
 

axios.defaults.headers.common['x-access-token'] = localStorage.getItem('access-token')

// const baseURL = ''

// export default axios.create({
//   baseURL,
//   // You can add your headers here
//   headers: {
//     'Content-Type': 'application/json',
//     'x-access-token': localStorage.getItem('token')
//   }
// })

