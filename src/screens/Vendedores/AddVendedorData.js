import * as Yup from "yup";

// Function para inicializar los valores del formulario de vendedores
export function initialValues() {
  return {
    product: "",
    price: 0.0,
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}

//la validacion de los campos del formulario de vendedores
export function validationSchema() {
  return Yup.object({
    product: Yup.string().required("El producto es obligatorio"),
    price: Yup.number().required("El precio por kg es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es obligatorio"),
    description: Yup.string().required(
      "Descripcion del producto es obligatorio"
    ),
    location: Yup.object().required("La localización es obligatoria"),
    images: Yup.array()
      .min(1, "La imagen es obligatoria")
      .required("La imagen es obligatoria"),
  });
}
