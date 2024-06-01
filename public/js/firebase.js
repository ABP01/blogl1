// import 'firebase/storage';

// Initialisation de Firebase
let firebaseConfig = {
    apiKey: "AIzaSyBF9hR1HnrnH-b9BIBI4r3MlhkcrXV_8hQ",
    authDomain: "iail1-blogging.firebaseapp.com",
    projectId: "iail1-blogging",
    storageBucket: "iail1-blogging.appspot.com",
    messagingSenderId: "21550890090",
    appId: "1:21550890090:web:069ba4b8296a070fc99e13",
    measurementId: "G-SBLL4VN4X3"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storage = firebase.storage();
let storageRef = storage.ref();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fonction pour télécharger l'image
const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        // Envoi de la requête pour télécharger l'image
        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
     .then(data => {
            if (uploadType == "image") {
                addImage(data, file.name);
            } else {
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else {
        alert("upload Image only");
    }
}

// Fonction pour ajouter une image à l'article
const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

// Gestionnaire d'événement pour le bouton de publication
publishBtn.addEventListener('click', () => {
    if (articleFeild.value.length && blogTitleField.value.length) {
        // Génération de l'ID
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // Configuration de docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // pour l'information publiée à

        // Accès à Firestore avec la variable db
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
     .then(() => {
            location.href = `/${docName}`;
        })
     .catch((err) => {
            console.error(err);
        })
    }
});


