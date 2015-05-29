// Pomazan Stanislav

var schoolAge = 7;

duckType = function(essence){
    console.log(essence);
    if (essence.__proto__.hasOwnProperty('study'))
        return "Student";
    else if (essence.__proto__.hasOwnProperty('live'))
        return "Man";
    else
        return "Not found type";
} // function duckType return type of object (Man or Student)

var duckTypeThis = function(){
    if (this.__proto__.hasOwnProperty('study'))
        return "Student";
    else if (this.__proto__.hasOwnProperty('live'))
        return "Man";
    else
        return "Not found type";
} // modified function duckType, which operates @this@

/////////////////////////// first variant ///////////////////////////////////////////////

var Man = function (name, age) {
    this.name = name;
    this.age = age;

}; // create function-constructor Man

Man.prototype.live = function(){
    return this.name + " lives on the Earth " + this.age + " years";
}; // adding prototype function @live@

Man.prototype._duckTypeThis = function(){
    return duckTypeThis.apply(this);
}; // adding function

var Student = function (name, age){
    Man.apply(this,arguments); // apply constructor
}; // create function-constructor Student

Student.prototype = new Man(); // inherit

Student.prototype.study = function(){
    return this.name + " studies " + (this.age-schoolAge) + " years";
} // adding prototype function @study@

var someMan  = new Man("Josh", 45);
alert(someMan.live());  // @Josh lives on the Earth 45 years@

var someStudent = new Student("Stephan", 22);
alert(someStudent.live()); // @Stephan lives on the Earth 22 years@
alert(someStudent.study()); // @Stephan studies 15 years@

alert(duckType(someMan)); // @Man@
alert(duckType(someStudent)); // @Student@
alert(someMan._duckTypeThis()); // @Man@
alert(someStudent._duckTypeThis()); // @Student@

/////////////////////////// first variant ///////////////////////////////////////////////

/////////////////////////// second variant //////////////////////////////////////////////

var Man = {
    constructor: function (name, age) {
        this.name = name;
        this.age = age;
        return this;
    },
    live: function(){
        return this.name + " lives on the Earth " + this.age + " years";
    },
    _duckTypeThis: function(){
        return duckTypeThis.apply(this);
    }
}; // create essence Man

var Student = Object.create(Man);
Student.constructor = function(name,age){
    Man.constructor.apply(this,arguments);
    return this;
} // create essence Student

Student.study = function(){
   return this.name + " studies " + (this.age-schoolAge) + " years";
} // create function @study@

var man1 = Object.create(Man).constructor("Jack",33);
alert(man1.live()); // @Jack lives on the Earth 33 years@

var student1 = Object.create(Student).constructor("Bob", 19);
alert(student1.live()); // @Bob lives on the Earth 23 years@
alert(student1.study()); // @Bob studies 16 years@

alert(duckType(man1)); // @Man@
alert(duckType(student1)); // @Student@
alert(man1._duckTypeThis()); // @Man@
alert(student1._duckTypeThis()); // @Student@

/////////////////////////// second variant //////////////////////////////////////////////