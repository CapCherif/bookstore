const express = require('express');


const path = require('path')
const app = express();



app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    res.render('index')
})


app.use((req,res)=>{
    res.redirect('/')
  })
  
  
  const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });