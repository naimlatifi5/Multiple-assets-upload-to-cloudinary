const config = require('./config').cloudinary;
const cloudinary = require('cloudinary').v2
const fs = require('fs');
const directory = "bundles";
/*configure our cloudinary*/
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});

function uploadToCloudinary(dir) {
    fs.readdirSync(dir).forEach(file => {
        console.log(file);
        cloudinary.uploader.upload(
            dir + '/' + file, {
                public_id: `assets/bundle/${file}`, // we orginize media assets here in folder assets and with tag asset
                tags: `asset`,
                resource_type: "raw" // uploads raw files such as js, css etc..
            },
            function (err, res) {
                console.log(err || res)
            }
        )
    })
}

uploadToCloudinary(directory);

// reading all raw data
cloudinary.api.resources({
        resource_type: 'raw'
    },
    function (error, result) {
        console.log(error || result);
    });