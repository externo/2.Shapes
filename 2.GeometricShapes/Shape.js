Object.prototype.extends = function (parent) {
    if (!Object.create) {
        Object.prototype.create = function (proto) {
            function F() { }            ;
            F.prototype = proto;
            return new F();
        };
    }    ;
    
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
}

var Shape = (function () {
    function validatePosition() {
        if (this._x < 0 || this._x > 1000 || this._y < 0 || this._y > 1000) {
            return false;
        }
        return true;
    }
    
    function validateColor() {
        if (!this._color.match(/#([0-9A-F]{6})/g)) {
            return false;
        }
        return true;
    }

    function Shape(x, y, color) {
        this._x = x;
        this._y = y;
        if (!validatePosition.call(this)) {
            throw new Error('Invalid Rect position. Should be in range [0, 1000].');
        }
        
        this._color = color;
        if (!validateColor.call(this)) {
            throw new Error('Invalid Color format. Should be hexadecimal!');
        }
    }
    
    Shape.prototype = {
        serialize: function () {
            var serializedShape = {
                X: this._x,
                Y: this._y,
                Color: this._color
            };
            return serializedShape;
        },
        draw: function (){
            var result = {
                element: document.getElementById("shapesContainer").getContext("2d")
            };            
            return result;
        }
    };
    Shape.prototype.toString = function () {
        var result = this.serialize();
        return result;
    };
    
    return Shape;
}());

var Rectangle = (function () {    
    function validateSides() {
        if (this._width < 0 || this._height < 0) {
            return false;
        }
        return true;
    }

    function Rectangle(x, y, color, width, height){
        Shape.call(this, x, y, color);
        this._width = width;
        this._height = height;
        if (!validateSides.call(this)) {
            throw new Error('Invalid sides. Must be positive numbers.');
        }
    }
    
    Rectangle.extends(Shape);

    Rectangle.prototype.serialize = function () {
        var serializedRectangle = Shape.prototype.serialize.call(this);
        var result = new Object;
        var name = this.constructor.name.toString();
        result.name = name;
        for (var prop in serializedRectangle) {
            result[prop] = serializedRectangle[prop];
        }
        result.width = this._width;
        result.height = this._height;
        return result;
    };
    Rectangle.prototype.draw = function () {
        var result = {
            element: document.getElementById("shapesContainer").getContext("2d")
        };
        return result;
    };
    Rectangle.prototype.toString = function () {
        return JSON.stringify(this.serialize());
    };

    return Rectangle;
}());

var Shapes = {
    Rectangle: function (x, y, color, width, height){
        return new Rectangle(x, y, color, width, height);
    },
    //Circle: function (x, y, color, radius) {
    //    return new Circle(x, y, color, radius);
    //},
    //Triangle: function (x, y, color, x2, y2, x3, y3) {
    //    return new Triangle(x, y, color, x2, y2, x3, y3);
    //},
    //Segment: function (x, y, color, x2, y2) {
    //    return new Segment(x, y, color, x2, y2);
    //},
    //Point: function (x, y, color) {
    //    return new Point(x, y, color);
    //}
};

var shape = new Shape(200, 300, "#FF3451");
console.log(shape.toString());
var rect = new Rectangle(100, 150, "#ADF456", 125, 222);
console.log(rect.toString());
rect._height = 55;
console.log(rect instanceof Shape);

var rect2 = new Shapes.Rectangle(100, 150, "#ADF456", 125, 222);
console.log(rect2.toString());
console.log(rect2 instanceof Shape);