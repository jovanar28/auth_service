const express= require('express');
const {sequelize, User} = require("./models");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const cors= require('cors');
require('dotenv').config();

const app = express();

var corsOptions={
    origin: '*',
    optionSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req,res)=>{
    const obj= {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        credit_card_num: req.body.credit_card_num,
        role_id:req.body.role_id
    };

    /*
        User.create(obj).then(rows) -> rezultat funkcije se smesta u promenljivu/objekat
        rows. Rows nam zapravo omogucava da pristupimo atributima keiranog korisnika.
        Mi cemo iskoristiti samo userId i username da bismo kreirali korisnicki token.

        jwt.sign je funkcija koja ce da generise token koji mi treba da pripisemo nekom
        korisniku, tacnije korisniku kojeg smo kreirali.

        Posto je ovo poseban servis, ovaj servis ce kao odgovor da vrati
        generisan token. Na klijentskoj strani (strani koja je pozvala ovaj servis)
        ce se ugraditi token u document.cookie.
    **/

    User.create(obj).then(rows =>{
        const user={
            userId: rows.id,
            user: rows.username
        };

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        //ovaj token koristimo u svakoj ruti za autor korisnika

        res.json({token:token});
    }).catch(err=>res.status(500).json(err));
});

app.post('/login',(req,res)=>{
    
    User.findOne({where: {username: req.body.username}})
        .then(user=>{
            if(bcrypt.compareSync(req.body.password, user.password)){
                const obj={
                    userId: user.id,
                    user: user.username
                };

                const token= jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({token:token});
            }else{
                res.status(400).json({msg: "Invalid credentials"});
            }
        }).catch(err=> res.status(500).json(err));
} );

app.listen({port:9000}, async()=>{
    await sequelize.authenticate();
});