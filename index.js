import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    renderText,
    adjustForMissingHash, loadTemplateFromDom, renderTemplate, loadTemplate,
} from "./utils.js"
import {loadJoke} from "./pages/joke/joke";

window.addEventListener("load", async () => {

  const homeTemplate = loadTemplateFromDom("template-home")
    const templateAbout = loadTemplateFromDom("template-about")
    const productsTemplate = loadTemplateFromDom("template-products")
    const jokeTemplate = await loadTemplate("./pages/joke/joke.html")
  const router = new Navigo("/", { hash: true });
  adjustForMissingHash()
  router
    .on({
      "/": () => renderTemplate(homeTemplate, "content"),
      "/about": () => renderTemplate(templateAbout, "content"),
      "/products": (match) => {
        renderTemplate(productsTemplate, "content")
          if (match.params){
              document.getElementById("selected-product-id").innerText = match.params.id
          }
      },
      "/joke": () => {
          renderTemplate(jokeTemplate,"content")
          loadJoke()
      },
      "/product/:id": (match) => {
        renderText(`Product ID: ${match.data.id}`, "content")
      },
      "/showMatch": (match) => renderText(`<pre>${JSON.stringify(match, null, 2)}</pre>`, "content")
    })
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
});


window.onerror = (e) => alert(e)