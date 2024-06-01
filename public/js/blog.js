// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const storageRef = ref(storage);

let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})


// Declare firebaseConfig as an object with the necessary properties
let firebaseConfig = {
    apiKey: "AIzaSyBF9hR1HnrnH-b9BIBI4r3MlhkcrXV_8hQ",
    authDomain: "iail1-blogging.firebaseapp.com",
    projectId: "iail1-blogging",
    storageBucket: "iail1-blogging.appspot.com",
    messagingSenderId: "21550890090",
    appId: "1:21550890090:web:069ba4b8296a070fc99e13",
    measurementId: "G-SBLL4VN4X3"
};


const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}

// Function to get all blog posts
const getDocs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
};

// Call the getDocs function
getDocs();