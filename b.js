const express=require("express")
const app=express()
app.use(express.json())

const {open}=require('sqlite')
const sqlite3=require('sqlite3')
const path=require('path')
const dbpath=path.join(__dirname,'data.db')

let db 



const initializeDbAndServer=async()=>{
    try{
        db=await open({
            filename:dbpath,
            driver:sqlite3.Database
        })

        app.listen(3000,()=>{
            console.log("server running at http://localhost:3000")
        })
    }
    catch(e){
        console.log(`DB Error: ${e.message}`)
    }
}

initializeDbAndServer()

app.get("/data",async(request,response)=>{
    const getQuery=`
    SELECT * FROM USER;
    `
    const getResponse=await db.all(getQuery)
    response.send(getResponse)
    console.log(getResponse)
})