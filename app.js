const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")

//Faz o express ler os dados enviados via post em um tipo compreensível por ele
app.use(express.urlencoded({extended: true}))

app.get("/v1/hi",(req,res)=> {
    const out = {
        msg: "Hello World"
    }
    res.status(200).sendFile(path.join(__dirname, "indexv1.html"))
})

app.get("/v2/hi",(req,res)=> {
    const out = {
        msg: "Hello World"
    }
    res.status(200).sendFile(path.join(__dirname, "indexv2.html"))
})


app.get("/v1/hi/user/:name",(req,res)=> {
    const out = {
        msg: "Hello, " + req.params.name
    }
    res.status(200).json(out)
})
app.get("/v2/hi/pt-br/user/:name",(req,res)=> {
    const out = {
        msg: "Olá, " + req.params.name
    }
    res.status(200).json(out)
})

app.get("/v2/hi/en/user/:name",(req,res)=> {
    const out = {
        msg: "Hello, " + req.params.name
    }
    res.status(200).json(out)
})
app.get("/v2/hi/es/user/:name",(req,res)=> {
    const out = {
        msg: "Hola, " + req.params.name
    }
    res.status(200).json(out)
})

app.post("/v1/hi",(req,res)=> {
    const {name} = req.body

    if(!name) {
        return res.status(400).json({error: "Name is required"})
    }

    const out = {
        msg: `Hello, ${name.toUpperCase()} from POST`
    }
    res.status(200).json(out)
})

app.post("/v2/hi",(req,res)=> {
    const {name,idioma} = req.body
    let out = {}
    if (!name || !idioma) {
        return res.status(400).json({error: ""})
    }

    if (idioma.toLowerCase() == "pt-br") {
         out = {
            msg: `Olá, ${name}!`
        }
    }
    else if (idioma.toLowerCase() == "en") {
         out = {
            msg: `Hello, ${name}`
        }
    }
    else if (idioma.toLowerCase() == "es") {
         out = {
            msg: `Hola, ${name}`
        }
    }

    res.status(200).json(out)
})

app.get("/*splat",(req,res)=> {
    const err = {
        error: "Invalid endpoint"
    }
    res.status(404).json(err)
})


app.listen(PORT,()=> {
    console.log(`Hello API on port ${PORT}`)
})