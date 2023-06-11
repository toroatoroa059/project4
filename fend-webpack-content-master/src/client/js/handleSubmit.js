import { nameChecker } from "./nameChecker";

const handleSubmit = (event) => {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  console.log(formText);
  nameChecker(formText);
  // POST request
  const postData = async (url = "", dataReq = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      // Body data type must match "Content-Type" header
      body: JSON.stringify(dataReq),
    });

    try {
      const dataRes = await response.json();
      console.log(dataRes);
      console.log(dataRes.status.code);
      if(dataRes.status.code == 0){
      return dataRes;
    } else {
      console.log(dataRes.status.msg)
    } 
    } catch (error) {
      console.log("error", error);
    }
  };

  postData("/add", { formText }).then((data) => {
    console.log(data);
    document.querySelector('.agreementResult').innerHTML = data.agreement;
    if(data.sentimented_entity_list == null){
      document.querySelector('.typeResult').innerHTML="";
    } else {
      document.querySelector('.typeResult').innerHTML = data.sentimented_entity_list[0].type;
    }
    if(data.sentimented_entity_list == null){
      document.querySelector('.scoreResult').innerHTML="";
    } else {
      document.querySelector('.scoreResult').innerHTML = data.sentimented_entity_list[0].score_tag;
    }
  });

};

export { handleSubmit };
