import axiosInterceptorInstance from "../../config/axiosIntercepter";

const fetchValidatedData = (data)=>{
    return axiosInterceptorInstance
      .post("/uploadfile", data)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
         // can be handle with toast message
      });
  };

export default fetchValidatedData;