var Shape = (function () {
    function Shape(x, y, color) {
        this._x = x;
        this._y = y;
        this._color = color;
    }
        
    Shape.prototype = {
        serialize: function () {
            var serializedShape = {
                x: this._x,
                y: this._y,
                color: this._color
            };
                
            return serializedShape;
        },
        canvas: function () {
            var canvas = {
                element: document.getElementById("shapesContainer").getContext("2d")
            };
                
            return canvas;
        }
    };
        
    Shape.prototype.toString = function () {
        return this.serialize();
    };
        
    return Shape;
}());
    
var Rectangle = (function () {
    function Rectangle(x, y, color, width, height) {
        Shape.call(this, x, y, color);
        this._width = width;
        this._height = height;
    }
        
    Rectangle.prototype = new Shape();
        
    Rectangle.prototype.serialize = function () {
        var serializedRect = Shape.prototype.serialize.call(this);
        serializedRect.width = this._width;
        serializedRect.height = this._height;
        return serializedRect;
    };
        
    Rectangle.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.fillStyle = this.serialize().color;
        this.canvas().element.fillRect(this.serialize().x,
            this.serialize().y, this.serialize().width, this.serialize().height);
    };
        
    Rectangle.prototype.toString = function () {
        return "Rectangle: " + JSON.stringify(this.serialize());
    };
        
    return Rectangle;
}());
    
var Triangle = (function () {
    function Triangle(x, y, color, x2, y2, x3, y3) {
        Shape.call(this, x, y, color);
        this._x2 = x2;
        this._y2 = y2;
        this._x3 = x3;
        this._y3 = y3;
    }
        
    Triangle.prototype = new Shape();
        
    Triangle.prototype.serialize = function () {
        var serializedTriangle = Shape.prototype.serialize.call(this);
        serializedTriangle.x2 = this._x2;
        serializedTriangle.y2 = this._y2;
        serializedTriangle.x3 = this._x3;
        serializedTriangle.y3 = this._y3;
        return serializedTriangle;
    };
        
    Triangle.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.fillStyle = this.serialize().color;
        this.canvas().element.moveTo(this.serialize().x, this.serialize().y);
        this.canvas().element.lineTo(this.serialize().x2 + this.serialize().x, this.serialize().y2 + this.serialize().y);
        this.canvas().element.lineTo(this.serialize().x3 + this.serialize().x, this.serialize().y3 + this.serialize().y);
        this.canvas().element.fill();
    };
        
    Triangle.prototype.toString = function () {
        return "Triangle: " + JSON.stringify(this.serialize());
    };
        
    return Triangle;
}());
    
var Segment = (function () {
    function Segment(x, y, color, x2, y2) {
        Shape.call(this, x, y, color);
        this._x2 = x2;
        this._y2 = y2;
    }
        
    Segment.prototype = new Shape();
        
    Segment.prototype.serialize = function () {
        var serializedSegment = Shape.prototype.serialize.call(this);
        serializedSegment.x2 = this._x2;
        serializedSegment.y2 = this._y2;
        return serializedSegment;
    };
        
    Segment.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.moveTo(this.serialize().x, this.serialize().y);
        this.canvas().element.lineTo(this.serialize().x2 + this.serialize().x, this.serialize().y2 + this.serialize().y);
        this.canvas().element.strokeStyle = this.serialize().color;
        this.canvas().element.stroke();
    };
        
    Segment.prototype.toString = function () {
        return "Segment: " + JSON.stringify(this.serialize());
    };
        
    return Segment;
}());
    
var Point = (function () {
    function Point(x, y, color) {
        Shape.call(this, x, y, color);
    }
        
    Point.prototype = new Shape();
        
    Point.prototype.serialize = function () {
        var serializedPoint = Shape.prototype.serialize.call(this);
        return serializedPoint;
    };
        
    Point.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.fillStyle = this.serialize().color;
        this.canvas().element.fillRect(this.serialize().x, this.serialize().y, 3, 3);
    };
        
    Point.prototype.toString = function () {
        return "Point: " + JSON.stringify(this.serialize());
    };
        
    return Point;
}());

var point = new Point(1, 2, "red");
console.log(point.toString());

var triangle = new Triangle(1, 2, "red", 34, 57, 88, 90);
console.log(triangle.toString());

var rectangle = new Rectangle(1, 2, "red", 200, 300);
console.log(rectangle.toString());

var segment = new Segment(1, 2, "red", 22, 45);
console.log(segment.toString());