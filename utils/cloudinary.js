const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'emprendeduros',
  api_key: '863283843251343',
  api_secret: 'cdPcNcgEcOTmbCcwEHbcGs34LiU'
})

const cloudinaryUploadImg = async fileToUploads => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(fileToUploads, result => {
      resolve(
        {
          url: result.secure_url
        },
        {
          resource_type: 'auto'
        }
      )
    })
  })
}

module.exports = cloudinaryUploadImg
