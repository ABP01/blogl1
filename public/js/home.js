// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";
import { collection } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";



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


// Function to get all blog posts
const getDocs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
};



const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}

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
                    bannerPath = downloadURL; // Update bannerPath here
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

// Call the getDocs function
getDocs();

// Import the necessary Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";



// Call the getDocs function
getDocs();