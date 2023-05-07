import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    comment: "",
    rating: 3,
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("El titulo es obligatorio"),
    comment: Yup.string().required("La reseña es obligatoria"),
    rating: Yup.number().required("El rating es obligatorio"),
  });
}
