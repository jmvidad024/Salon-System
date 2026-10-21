const path = require('path')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const app = express()
const PORT = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../../public');

app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }

    if (path.extname(req.path)) {
        return next();
    }

    const filePath = path.join(publicDir, `${req.path}.html`);
    if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }

    next();
});

app.use(express.static(publicDir));

app.use(express.json())

const authRoutes = require('./routes/authRoute')
app.use('/api/auth', authRoutes)

const startServer = async () => {
    try {
        // 1. Create and start the in-memory MongoDB server
        const mongoServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri()

        // 2. Connect Mongoose to the temporary in-memory URI
        await mongoose.connect(uri)
        console.log("Connected to In-Memory MongoDB successfully!")

        // 3. Start your Express server
        app.listen(PORT, () => {
            console.log(`Server is running at PORT: ${PORT}`)
        })
    } catch (err) {
        console.error('Database connection failed: ', err.message)
    }
}

startServer()