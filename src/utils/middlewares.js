const jwt = require("jsonwebtoken");
const Busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Your session expired");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Your session expired");
    }

    const { userId } = jwt.verify(token, process.env.SECRET);

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.formData = (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });

  req.body = {};

  let uploadingFile = false;
  let uploadingCount = 0;

  function done() {
    if (uploadingFile) return;
    if (uploadingCount > 0) return;
    next();
  }

  busboy.on("field", (key, value) => {
    req.body[key] = value;
  });

  busboy.on("file", (key, file) => {
    uploadingFile = true;
    uploadingCount++;

    const stream = cloudinary.uploader.upload_stream(
      {
        upload_preset: "reuseme",
      },
      (err, res) => {
        if (err) {
          throw new Error("Invalid image");
        }

        req.body[key] = res.secure_url;
        uploadingFile = false;
        uploadingCount--;
        done();
      }
    );

    file.on("data", (buffer) => {
      stream.write(buffer);
    });

    file.on("end", () => {
      stream.end();
    });
  });

  busboy.on("finish", () => {
    done();
  });

  req.pipe(busboy);
};

exports.userFilter = (req, res, next) => {
  if (req.body.name === "") {
    delete req.body.name;
  }
  if (req.body.lastname === "") {
    delete req.body.lastname;
  }
  if (req.body.phone === "") {
    delete req.body.phone;
  }
  next();
};

exports.itemFilter = (req, res, next) => {
  if (req.body.title === "") {
    delete req.body.title;
  }
  if (req.body.category === "") {
    delete req.body.category;
  }
  if (req.body.price === "") {
    delete req.body.price;
  }
  if (req.body.description === "") {
    delete req.body.description;
  }
  next();
};

exports.messageFilter = (req, res, next) => {
  if (req.body.content === "") {
    delete req.body.content;
  }
  next();
};
