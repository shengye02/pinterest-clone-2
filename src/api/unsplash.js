import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID Lr5BSZUN13Oq9eojsSE0KL92dWQm0wyl-DJR2QuPdNU",
  },
});
