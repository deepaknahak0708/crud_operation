const User = require('../models/userModel');
const path = require('path');
const fs = require('fs');

exports.getAllUser = async (req, res) => {
    try {
        const getUser = await User.find({verified:true});
        res.status(200).json({
            success: true,
            data: getUser,
            message: 'User get successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Can not  read User Data'
        })
    }
}


exports.getUserById = async (req, res) => {
    try {
        const _id = req.params.id;
        const getUserId = await User.findById(_id);
        res.status(200).json({
            success: true,
            data: getUserId,
            message: 'User get successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Can not  read User Data'
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUserId = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).json({
            success: true,
            data: updateUserId,
            message: 'User updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Enable to  update User Data'
        })
    }
}




exports.deleteUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteUser = await User.findById(_id);
        res.status(200).json({
            success: true,
            data: deleteUser,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: 'Can not  delete User Data'
        })
    }
}




//promise base write file function---------------
const writeFile = (fileName, data) => {
    return new Promise((resolve, rejects) => {
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                rejects(err)
            } else {
                resolve(data)
            }
        })
    })
}



// adding images dynamically----------
exports.uploadUserImg = async (req, res) => {
    // const {email} = req.user;
    const email = req.body.email
    const imagePath = imgPath();
    const baseImg = req.body.images;
    if (!baseImg.startsWith("data:")) {
        return res.status(404).json({
            success: false,
            message: 'Base 64 is not defined'
        });
    }

    //find extension of file
    const ext = baseImg.substring(baseImg.indexOf('/') + 1, baseImg.indexOf(';base64'));
    const fileType = baseImg.substring('data:'.length, baseImg.indexOf('/'));

    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');

    //extract base 64 data----  
    const base64Data = baseImg.replace(regex, '');

    const fileName = `${new Date().valueOf()}.${ext}`;
    const finalFilePath = path.join(imagePath, fileName);

    const response = await writeFile(finalFilePath, base64Data, 'base64')
    // fs.writeFileSync(finalFilePath, base64Data, 'base64');
    const user = await User.findOneAndUpdate({ email }, { image: fileName, create_date: new Date().toLocaleString() })
    if (user) {
        return res.status(200).json({
            success: true,
            message: 'file uploaded successfully !',
            image: `http://localhost:5000/${fileName}`
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'failed to upload file !'
        })
    }

}



// function for img----- --
const imgPath = () => {
    const workingDir = process.cwd();
    const imagePath = path.join(workingDir, 'images');
    return imagePath;
}



//----resume  folder---------
exports.uploadResume = async (req, res) => {
    const email = req.body.email
    const resumesPath = resumePath();
    const baseResume = req.body.resume;
    if (!baseResume.startsWith("data:")) {
        return res.status(404).json({
            success: false,
            message: 'Base 64 is not defined'
        });
    }

    //find extension of file
    const ext = baseResume.substring(baseResume.indexOf('/') + 1, baseResume.indexOf(';base64'));
    const fileType = baseResume.substring('data:'.length, baseResume.indexOf('/'));

    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');

    //extract base 64 data----  
    const base64Data = baseResume.replace(regex, '');

    const fileName = `${new Date().valueOf()}.${ext}`;
    const finalFilePath = path.join(resumesPath, fileName);

    const response = await writeFile(finalFilePath, base64Data, 'base64')
    // fs.writeFileSync(finalFilePath, base64Data, 'base64');
    const user = await User.findOneAndUpdate({ email }, { resume: fileName, create_date: new Date().toLocaleString() })
    if (user) {
        return res.status(200).json({
            success: true,
            message: 'file uploaded successfully !',
            image: `http://localhost:5000/${fileName}`
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'failed to upload file !'
        })
    }

}


//resume function ------
const resumePath = () => {
    const workingDir = process.cwd();
    const resumePath = path.join(workingDir, 'resume');
    return resumePath;
}




// video upload----------------------
exports.uploadeVideo = async (req, res) => {
    const email = req.body.email;
    const vidPath = videoPath();
    const baseVid = req.body.video;
    if (!baseVid.startsWith('data:')) {
        res.status(404).json({
            success: false,
            message: ' Video base64 is not found'
        })
    }

    const ext = baseVid.substring(baseVid.indexOf('/') + 1, baseVid.indexOf(':base64'));
    const fileType = baseVid.substring("data:".length, baseVid.indexOf('/'));

    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    const base64Data = baseVid.replace(regex, '');

    const fileName = `${new Date().valueOf()}. ${ext}`;
    const finalePath = path.join(fileName, vidPath);

    const response = await writeFile(finalePath, base64Data, 'base64');
    const user = await User.findOneAndUpdate({ email }, { video: fileName, create_date: new Date().toLocaleString() })

    if (user) {
        res.status(201).json({
            success: true,
            message: 'Video uploaded Successfully',
            video: `http://localhost:5000/${fileName}`
        })
    } else {
        res.status(404).json({
            success: false,
            message: 'Video is not uploaded'
        })
    }
}


// function for video path-------
const videoPath = () => {
    const workingDir = process.cwd;
    const videoPath = path.join(workingDir, 'videos');
    return videoPath
}



//  multer process-------------------------
exports.multerImg = async (req, res) => {
    const { email } = req.user;
    const { filename } = req.file;

    const updateUser = await User.findOneAndUpdate({ email }, { image: filename }, { new: true });

    if (!updateUser) {
        return res.status(422).json({
            success: false,
            message:'Not updated'
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Updated successfully'
        })
    }
}