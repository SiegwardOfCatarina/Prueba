const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { getPositionOfLineAndCharacter } = require("typescript");
const app = express();
app.set("json spaces", 2)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.options('*', (req, res) => {
    res.json({
        status: 'OK'
    });
});
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = app.listen(process.env.PORT || 8000, () =>{
    const port = server.address().port;
    console.log("App is running on port", port);
});

app.get("/api/all", (req, res) =>{
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response)=>{
        res.json(response.data)
    }).catch((error) =>{
        res.json("Error ocured")
    })
});

app.post("/api/create", (req, res)=>{
    axios.post("https://jsonplaceholder.typicode.com/posts",req.body)
    .then((response)=> {
        res.json(response.data)
    }).catch((error)=> {
        res.json("Error ocured" + error)
    })
});

app.put("/api/edit/:id", (req, res)=>{
    axios.put("https://jsonplaceholder.typicode.com/posts/"+req.params.id, req.body)
    .then((response)=>{
        res.json(response.data)
    }).catch((error) => {
        res.json("Error ocured" + error)
    })
});

app.post("/api/details",async (req, res)=>{
   // const postData = await getPost(req.body.id);
    const userData = await getUserInfo(req.body.userId);
    const comments = await getComments(req.body.id);
    const data = {
      //  post: postData,
        user: userData,
        comments: comments
    }
    res.send(data);
});
function getPost(paramsId){
    return new Promise(async (resolve, reject) =>{
        try{
            const url = "https://jsonplaceholder.typicode.com/posts/"+paramsId;
            let result = [];
            await axios.get(url)
            .then(response =>{
               result = res.json(response.data);
            }).catch((err)=>{
                console.log(err);
            });
        resolve(result);
        }catch(error){
            console.log(error);
        } finally {}
    }).catch((err)=>{
        console.log(err);
    });
}

function getUserInfo(userId){
    return new Promise(async (resolve, reject)=>{
        try{
            const url = "https://jsonplaceholder.typicode.com/users/"+userId;
            let result = [];
            await axios.get(url)
            .then(response => {
                result = response.data;
            }).catch((er) => {
                console.log(er);
            });
        resolve(result);
        }catch(error){
            console.log(error);
        }finally {}
    }).catch((err)=> {
        console.log(err);
    });
}

function getComments(postId){
    return new Promise(async(resolve, reject)=>{
        try{
            const url ="https://jsonplaceholder.typicode.com/posts/"+postId+"/comments";
            let result = [];
            await axios.get(url)
            .then(response => {
                result = response.data;
            }).catch((er)=>{
                console.log(er);
            });
        resolve(result);
        }catch(error){
            console.log(error);
        }finally {}
    }).catch((err) =>{
        console.log(err);
    });
}