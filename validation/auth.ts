import { object, ref, string } from "yup";

export const registerSchema = object().shape({
   username: string()
      .matches(/^[a-zA-Z][a-zA-Z0-9_-]{0,}$/, "Geçersiz kullanıcı adı")
      .min(3, "Kullanıcı adı minimum 3 karakter olmalıdır")
      .max(30, "Kullanıcı adı maxsimum 30 karakter olmalıdır")
      .required("Kullanıcı Adı zorunlu"),
   email: string().email("Geçersiz email").required("Email Zorunlu"),
   password: string()
      .required("Şifre zorunlu")
      .min(6, "Şifre minimum 6 karakter olmalıdır")
      .max(60, "Şifre maxsimum 60 karakter olmalıdır"),
   passwordTwo: string()
      .required("Şifre zorunlu")
      .min(6, "Şifre minimum 6 karakter olmalıdır")
      .max(60, "Şifre maxsimum 60 karakter olmalıdır")
      .oneOf([ref("password")], "Şifreler eşleşmiyor"),
});

export const editProfileSchema = object().shape({
   name: string()
      .matches(
         /^([A-Za-zğüşıöçĞÜŞİÖÇ]{2,})(\s[A-Za-zğüşıöçĞÜŞİÖÇ]{2,}){0,1}(\s[A-Za-zğüşıöçĞÜŞİÖÇ]{2,}(-[A-Za-zğüşıöçĞÜŞİÖÇ]{2,})?)?$/,
         "Geçersiz isim"
      )
      .min(3, "İsim minimum 3 karakter olmalıdır")
      .max(30, "İsim maxsimum 30 karakter olmalıdır")
      .required("İsim zorunlu"),
   desc: string().max(140, "Açıklama maxsimum 140 karakter olmalıdır"),
});
