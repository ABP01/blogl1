// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

// Your Firebase configuration object
let firebaseConfig = {
    apiKey: "AIzaSyBF9hR1HnrnH-b9BIBI4r3MlhkcrXV_8hQ",
    authDomain: "iail1-blogging.firebaseapp.com",
    projectId: "iail1-blogging",
    storageBucket: "iail1-blogging.appspot.com",
    messagingSenderId: "21550890090",
    appId: "1:21550890090:web:069ba4b8296a070fc99e13",
    measurementId: "G-SBLL4VN4X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Function to upload an image
const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const fileRef = ref(storageRef, `images/${file.name}`);

        // Upload the file
        uploadBytes(fileRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                if (uploadType === "image") {
                    addImage(downloadURL, file.name);
                } else {
                    bannerPath = downloadURL;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            });
        }).catch((error) => {
            console.error("Error uploading image:", error);
        });
    } else {
        alert("Upload image only");
    }
};

// Function to add an image to the article
const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
};

// Event listener for the publish button
const publishBtn = document.getElementById('publish-btn');
const articleFeild = document.getElementById('article-field'); // declare articleFeild
const blogTitleField = document.getElementById('blog-title-field'); // declare blogTitle
publishBtn.addEventListener('click', () => {
    if (articleFeild && articleFeild.value.length && blogTitleField && blogTitleField.value.length) {
        // Generate ID
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // Document name
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // For published at information

        // Access Firestore with the db variable
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }).then(() => {
            location.href = `/${docName}`;
        }).catch((err) => {
            console.error(err);
        });
    }
});
