export default function page() {
   return (
      <div className="text-white flex flex-col justify-start py-20 gap-20 items-center h-full">
         <h1 className="text-4xl text-green-500">{`Neden Linkim'ı kullanmalısınız?`}</h1>
         <div className="max-w-4xl w-full flex flex-col gap-10">
            <div>
               <h2 className="text-3xl text-green-500">Kısaltılmış linklerinizi paylaşırken profesyonel görünün</h2>
               <p className="text-lg">
                  {`Uzun URL'ler sosyal medya, e-posta veya mesajlar aracılığıyla paylaşılırken görsel olarak hoş bir etki
               bırakmaz. `}{" "}
                  <span className="text-green-500">Linkim</span>
                  {`, linklerinizi daha estetik ve profesyonel hale getirerek markanızı veya kişisel
               projelerinizi daha iyi temsil etmenizi sağlar.`}
               </p>
            </div>
            <div>
               <h2 className="text-3xl text-green-500">Özelleştirilebilir ve hatırlanması kolay kısaltmalar</h2>
               <p className="text-lg">
                  <span className="text-green-500">Linkim</span>
                  {`, linklerinizi özelleştirebilmenizi sağlar. Kısalttığınız linklerin sonunda kendi tercihlerinize göre kişiselleştirilmiş kısaltmalar kullanabilirsiniz. Böylece linklerinizi hatırlanması daha kolay, markanızla ilişkilendirilebilir ve kişisel olarak tanımlayabilirsiniz.`}
               </p>
            </div>
            <p className="text-lg">
               <span className="text-green-500">Linkim</span>
               {` ile linklerinizi kısaltmak, paylaşmak ve takip etmek artık çok daha kolay. Hızlı, güvenilir ve
            kullanıcı dostu özellikleri sayesinde dijital dünyadaki varlığınızı güçlendirebilirsiniz. Üstelik, `}{" "}
               <span className="text-green-500">Linkim</span>
               {`'ın
            kullanımı tamamen ücretsizdir!`}
            </p>
            <p className="text-lg">
               <span>Hemen</span> <span className="text-green-500">Linkim</span>
               {`'ı ziyaret edin, linklerinizi kısaltmaya başlayın ve İnternet deneyiminizi daha etkili hale getirin.`}
            </p>
         </div>
      </div>
   );
}
