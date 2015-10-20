var superagent = require('superagent')
var expect = require('expect.js')
var parallel=require('mocha.parallel');

parallel('express rest api server', function(){
  var id

  it('posts an object',function(done){
	  
  setTimeout(function(){
    superagent.post('http://localhost:3000/collections/employees')
      .send({ code : '5555',
	  name: 'Bama'
        , city: 'pune'
      })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.eql(1)
        expect(res.body[0]._id.length).to.eql(24)
        id = res.body[0]._id
		console.log("POST ID"+id)
		console.log(res.body)
        done()
	 },100);
      })
	   
  })

  it('retrieves an object', function(done){
	  setTimeout(function(){
    superagent.get('http://localhost:3000/collections/employees/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.name).to.eql('Bama')
		//console.log("ID"+id)
		//console.log(res.body)
        done();
      
	  })
	  },200);
	  
  })

  it('retrieves a collection', function(done){
	  setTimeout(function(){
    superagent.get('http://localhost:3000/collections/employees')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)
        done();
      })
	   },300);
  })

  it('updates an object', function(done){
	  setTimeout(function(){
    superagent.put('http://localhost:3000/collections/employees/'+id)
      .send({ code :'8888',
		  name: 'NewBama'
        , city: 'mumbai'})
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
        done();
      })
	  },400);
  })

  it('checks an updated object', function(done){
	   setTimeout(function(){
    superagent.get('http://localhost:3000/collections/employees/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.code).to.eql('8888')
		expect(res.body.name).to.eql('NewBama')
		expect(res.body.city).to.eql('mumbai')
        done();
      })
	  },500);
  })
  it('removes an object', function(done){
	   setTimeout(function(){
    superagent.del('http://localhost:3000/collections/employees/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
        done();
      })
	  },600);
  })
  
})
