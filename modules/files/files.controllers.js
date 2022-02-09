function uploadImage(req, res) {
  try {
    const { path: imageUrl } = req.file;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(400).json({ message: error.message }).end();
  }
}

module.exports = { uploadImage };
