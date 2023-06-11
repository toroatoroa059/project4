 import { handleSubmit } from "./js/handleSubmit";

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

const form = document.querySelector(".form");
console.log(form);
form.addEventListener('submit', (event) => {
    console.log("=============")
  handleSubmit(event);
})

