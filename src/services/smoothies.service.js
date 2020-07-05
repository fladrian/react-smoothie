import http from "axios";
const apiUrl = "https://smoothies-api.herokuapp.com";

export default new (class {
  //Smoothies
  GetAllSmoothies() {
    return http.get(`${apiUrl}/smoothies`);
  }

  AddSmoothie(values) {
    const newSmoothie = { ...values };
    console.info("Valores: ", newSmoothie);
    return http.post(`${apiUrl}/smoothies`, newSmoothie);
  }

  //Liquids
  GetAllLiquids() {
    return http.get(`${apiUrl}/liquids`);
  }
  //Proteins
  GetAllProteins() {
    return http.get(`${apiUrl}/proteins`);
  }
  //Fruits
  GetAllFruits() {
    return http.get(`${apiUrl}/fruits`);
  }
})();
