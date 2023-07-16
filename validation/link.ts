import { object, ref, string } from "yup";

export const linkSchema = object().shape({
   title: string()
      .min(3, "Başlık minimum 3 karakter olmalıdır")
      .max(50, "Başlık maxsimum 50 karakter olmalıdır")
      .required("Başlık zorunlu"),
   url: string()
      .matches(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/, "Geçersiz url")
      .required("Url Zorunlu"),
});

export const urlOnlyLinkSchema = object().shape({
   url: string()
      .matches(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/, "Geçersiz url")
      .required("Url Zorunlu"),
});
