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
        canvas: function () {
            var canvas = {
                element: document.getElementById("container").getContext("2d")
            };
            
            canvas.element.fillStyle = this.serialize().Color;     
            return canvas;
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
        var name = this.constructor.name;
        result.name = name;
        for (var prop in serializedRectangle) {
            result[prop] = serializedRectangle[prop];
        }
        result.width = this._width;
        result.height = this._height;
        return result;
    };
    Rectangle.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.fillStyle = this._color;
        this.canvas().element.fillRect(this._x, this._y, this._width, this._height);
    };
    Rectangle.prototype.toString = function () {
        return JSON.stringify(this.serialize());
    };

    return Rectangle;
}());

var Triangle = (function () {
    function validateTriangle() {
        if ((this._y - this._y2) * (this._x - this._x3) == (this._y1 - this._y3) * (this._x1 - this._x2) || 
            this._x < 0 || this._y < 0 || this._x2 < 0 || this._y2 < 0 || this._x3 < 0 || this._y3 < 0) {
            return false;
        }
        return true;
    }
    
    function Triangle(x, y, color, x2, y2, x3, y3) {
        Shape.call(this, x, y, color);
        this._x2 = x2;
        this._y2 = y2;
        this._x3 = x3;
        this._y3 = y3;
        if (!validateTriangle.call(this)) {
            throw new Error('Invalid coordinates. Must not lye on single line.');
        }
    }
    
    Triangle.extends(Shape);
    
    Triangle.prototype.serialize = function () {
        var serializedTriangle = Shape.prototype.serialize.call(this);
        var result = new Object;
        var name = this.constructor.name;
        result.name = name;

        for (var prop in serializedTriangle) {
            result[prop] = serializedTriangle[prop];
        }

        result.x2 = this._x2;
        result.y2 = this._y2;
        result.x3 = this._x3;
        result.y3 = this._y3;

        return result;
    };
    Triangle.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.moveTo(this.serialize().X, this.serialize().Y);
        this.canvas().element.lineTo(this.serialize().x2, this.serialize().y2);
        this.canvas().element.lineTo(this.serialize().x3, this.serialize().y3);
        this.canvas().element.closePath();
        this.canvas().element.fill();
    };
    Triangle.prototype.toString = function () {
        return JSON.stringify(this.serialize());
    };
    
    return Triangle;
}());

var Circle = (function () {
    function validateRadius() {
        if (this._radius < 0) {
            return false;
        }
        return true;
    }
    
    function Circle(x, y, color, radius) {
        Shape.call(this, x, y, color);
        this._radius = radius;
        if (!validateRadius.call(this)) {
            throw new Error('Invalid radius. Must be positive number.');
        }
    }
    
    Circle.extends(Shape);
    
    Circle.prototype.serialize = function () {
        var serializedCircle = Shape.prototype.serialize.call(this);
        var result = new Object;
        var name = this.constructor.name;
        result.name = name;
        
        for (var prop in serializedCircle) {
            result[prop] = serializedCircle[prop];
        }
        
        result.radius = this._radius;
        
        return result;
    };
    Circle.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.arc(this.serialize().X, this.serialize().Y, this.serialize().radius, 0, 2 * Math.PI);
        this.canvas().element.fill();
    };
    Circle.prototype.toString = function () {
        return JSON.stringify(this.serialize());
    };
    
    return Circle;
}());

var Segment = (function () {
    function validateSegment() {
        if (this._x == this._x2 || this._x == this._y2 || this._y == this._x2 || this._y == this._y2) {
            return false;
        }
        return true;
    }
    
    function Segment(x, y, color, x2, y2) {
        Shape.call(this, x, y, color);
        this._x2 = x2;
        this._y2 = y2;
        if (!validateSegment.call(this)) {
            throw new Error('Invalid coordinates. Must be different.');
        }
    }
    
    Segment.extends(Shape);
    
    Segment.prototype.serialize = function () {
        var serializedSegment = Shape.prototype.serialize.call(this);
        var result = new Object;
        var name = this.constructor.name;
        result.name = name;
        
        for (var prop in serializedSegment) {
            result[prop] = serializedSegment[prop];
        }
        
        result.x2 = this._x2;
        result.y2 = this._y2;
        
        return result;
    };
    Segment.prototype.draw = function () {
        var result = {
            element: document.getElementById("shapesContainer").getContext("2d")
        };
        return result;
    };
    Segment.prototype.toString = function () {
        return JSON.stringify(this.serialize());
    };
    
    return Segment;
}());

var Point = (function () {    
    function Point(x, y, color) {
        Shape.call(this, x, y, color);
    }
    
    Point.extends(Shape);
    
    Point.prototype.serialize = function () {
        var serializedSegment = Shape.prototype.serialize.call(this);
        var result = new Object;
        var name = this.constructor.name;
        result.name = name;
        
        for (var prop in serializedSegment) {
            result[prop] = serializedSegment[prop];
        }
        
        return result;
    };
    Point.prototype.draw = function () {
        this.canvas().element.beginPath();
        this.canvas().element.arc(this.serialize().X, this.serialize().Y, 2, 0, 2 * Math.PI);
        this.canvas().element.fill();
    };
    Point.prototype.toString = function () {
        return JSON.stringify(this.serialize());
    };
    
    return Point;
}());

var Shapes = {
    Rectangle: function (x, y, color, width, height){
        return new Rectangle(x, y, color, width, height);
    },
    Circle: function (x, y, color, radius) {
        return new Circle(x, y, color, radius);
    },
    Triangle: function (x, y, color, x2, y2, x3, y3) {
        return new Triangle(x, y, color, x2, y2, x3, y3);
    },
    Segment: function (x, y, color, x2, y2) {
        return new Segment(x, y, color, x2, y2);
    },
    Point: function (x, y, color) {
        return new Point(x, y, color);
    }
};

var shape = new Shape(200, 300, "#FF3451");
console.log(shape.toString());

var rect = new Rectangle(100, 150, "#ADF456", 125, 222);
console.log(rect.toString());
rect.draw();
console.log(rect instanceof Shape);

var rect2 = new Shapes.Rectangle(100, 150, "#ADF456", 125, 222);
console.log(rect2.toString());
console.log(rect2 instanceof Shape);

var triangle = new Shapes.Triangle(20, 33, "#FF4522", 323, 123, 435, 66);
console.log(triangle.toString());

var circle = new Shapes.Circle(100, 200, "#546454", 30);
circle.draw();

var segment = new Shapes.Segment(500, 200, "#333333", 555, 260);
console.log(segment.toString());

var point = new Point(600, 300, "#FF3451");
console.log(point.toString());