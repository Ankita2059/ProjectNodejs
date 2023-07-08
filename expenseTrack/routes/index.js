var express = require('express');
var router = express.Router();


var expenses=require('../database/expenses')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(expenses)
  res.render('index', {  title:"WLiT", expenselist:expenses});
});

router.get('/add', function(req,res,next){
  res.render('addexpense');
});

// post method
router.post('/saveexpense',function(req,res,next){
  // console.log(req.body.title)
  let formData ={
    "title": req.body.title,
    "paidBy":req.body.paidBy,
    "description":req.body.description,
    "amount":req.body.amount
  }

  expenses.push({...formData, _id:expenses.length+1})
  res.redirect('/')
})


router.get('/delete/:index',function(req,res,next){
  // console.log (req.params.index,req.params.ankita)
  expenses.splice(req.params.index,1);
  res.redirect('/')
  // expenses.splice()
})

router.get('/edit/:id',function(req,res){
  const expense = expenses.find (expense => expense._id == req.params.id)
  res.render('editExpense',{expense:expense})

})


router.post('/saveEdited/:id', function(req,res){
  let formData ={
    "title": req.body.title,
    "paidBy":req.body.paidBy,
    "description":req.body.description,
    "amount":req.body.amount
  }
  const index = expenses.findIndex(expense => { return expense._id == req.params.id});
  expenses.splice(index,1,{_id:req.params.id, ...formData})
  res.redirect('/')
})

module.exports = router;
