const multer = require("multer");

let uploadImage = (carpeta) => {
  const storage = multer.diskStorage({
    // dónde queremos guardar los archivos
    destination: `public/images/${carpeta}`,
    // creamos un nombre único para los archivos cargados
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      // sacamos la extensión del archivo del nombre original
      let prueba1 = file.originalname.split(".");
      let extension = prueba1[prueba1.length - 1];

      // concatenamos todas las partes del nuevo nombre
      cb(null, uniqueSuffix + "." + extension);
    },
  });

  const upload = multer({ storage: storage }).single("user_img");
  return upload;
};
module.exports = uploadImage;
