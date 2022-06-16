// capturo el formulario para procesar el evento submit
const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", async (e) => {
  const producto = {};
  const formData = new FormData(formulario);
  e.preventDefault();
  // armo el objeto a enviar
  producto.title = formData.get("title");
  producto.price = formData.get("price");
  producto.thumbnail = formData.get("thumbnail");
  // uso fetch para enviar el dato al servidor api
  const response = await fetch("/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(producto),
  });
  const result = await response.json();
  Swal.fire("¡Agregado!", `Producto con id ${result.id}`, "success");
  formulario.reset();
});
