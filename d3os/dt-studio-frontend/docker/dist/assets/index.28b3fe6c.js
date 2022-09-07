import { f as commonjsGlobal, j as reactive, l as ref, h as computed, v as onActivated, T as onMounted, q as onUnmounted, x as ElMessage, F as toRefs, r as resolveComponent, o as openBlock, B as createElementBlock, C as createBaseVNode, a as createVNode, w as withCtx, L as Fragment, M as renderList, c as createBlock, Y as normalizeClass, O as toDisplayString, G as createCommentVNode, a4 as withModifiers, W as pushScopeId, X as popScopeId, N as createTextVNode } from './element-plus.da98f360.js';
import { n as nanoid } from './index.browser.8e74d592.js';
import { _ as _export_sfc, u as useRouter, a as useRoute, b as useStore, U as UE } from './index.acc4a696.js';
import './monaco-editor.e9574fd0.js';

var jsplumb = {};

/**
 * jsBezier
 *
 * Copyright (c) 2010 - 2017 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * licensed under the MIT license.
 *
 * a set of Bezier curve functions that deal with Beziers, used by jsPlumb, and perhaps useful for other people.  These functions work with Bezier
 * curves of arbitrary degree.
 *
 * - functions are all in the 'jsBezier' namespace.
 *
 * - all input points should be in the format {x:.., y:..}. all output points are in this format too.
 *
 * - all input curves should be in the format [ {x:.., y:..}, {x:.., y:..}, {x:.., y:..}, {x:.., y:..} ]
 *
 * - 'location' as used as an input here refers to a decimal in the range 0-1 inclusive, which indicates a point some proportion along the length
 * of the curve.  location as output has the same format and meaning.
 *
 *
 * Function List:
 * --------------
 *
 * distanceFromCurve(point, curve)
 *
 * 	Calculates the distance that the given point lies from the given Bezier.  Note that it is computed relative to the center of the Bezier,
 * so if you have stroked the curve with a wide pen you may wish to take that into account!  The distance returned is relative to the values
 * of the curve and the point - it will most likely be pixels.
 *
 * gradientAtPoint(curve, location)
 *
 * 	Calculates the gradient to the curve at the given location, as a decimal between 0 and 1 inclusive.
 *
 * gradientAtPointAlongCurveFrom (curve, location)
 *
 *	Calculates the gradient at the point on the given curve that is 'distance' units from location.
 *
 * nearestPointOnCurve(point, curve)
 *
 *	Calculates the nearest point to the given point on the given curve.  The return value of this is a JS object literal, containing both the
 *point's coordinates and also the 'location' of the point (see above), for example:  { point:{x:551,y:150}, location:0.263365 }.
 *
 * pointOnCurve(curve, location)
 *
 * 	Calculates the coordinates of the point on the given Bezier curve at the given location.
 *
 * pointAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the coordinates of the point on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * locationAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the location on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * perpendicularToCurveAt(curve, location, length, distance)
 *
 * 	Calculates the perpendicular to the given curve at the given location.  length is the length of the line you wish for (it will be centered
 * on the point at 'location'). distance is optional, and allows you to specify a point along the path from the given location as the center of
 * the perpendicular returned.  The return value of this is an array of two points: [ {x:...,y:...}, {x:...,y:...} ].
 *
 *
 */

(function (exports) {
(function() {

    if(typeof Math.sgn == "undefined") {
        Math.sgn = function(x) { return x == 0 ? 0 : x > 0 ? 1 :-1; };
    }

    var Vectors = {
            subtract 	: 	function(v1, v2) { return {x:v1.x - v2.x, y:v1.y - v2.y }; },
            dotProduct	: 	function(v1, v2) { return (v1.x * v2.x)  + (v1.y * v2.y); },
            square		:	function(v) { return Math.sqrt((v.x * v.x) + (v.y * v.y)); },
            scale		:	function(v, s) { return {x:v.x * s, y:v.y * s }; }
        },

        maxRecursion = 64,
        flatnessTolerance = Math.pow(2.0,-maxRecursion-1);

    /**
     * Calculates the distance that the point lies from the curve.
     *
     * @param point a point in the form {x:567, y:3342}
     * @param curve a Bezier curve in the form [{x:..., y:...}, {x:..., y:...}, {x:..., y:...}, {x:..., y:...}].  note that this is currently
     * hardcoded to assume cubiz beziers, but would be better off supporting any degree.
     * @return a JS object literal containing location and distance, for example: {location:0.35, distance:10}.  Location is analogous to the location
     * argument you pass to the pointOnPath function: it is a ratio of distance travelled along the curve.  Distance is the distance in pixels from
     * the point to the curve.
     */
    var _distanceFromCurve = function(point, curve) {
        var candidates = [],
            w = _convertToBezier(point, curve),
            degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            numSolutions = _findRoots(w, higherDegree, candidates, 0),
            v = Vectors.subtract(point, curve[0]), dist = Vectors.square(v), t = 0.0;

        for (var i = 0; i < numSolutions; i++) {
            v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
            var newDist = Vectors.square(v);
            if (newDist < dist) {
                dist = newDist;
                t = candidates[i];
            }
        }
        v = Vectors.subtract(point, curve[degree]);
        newDist = Vectors.square(v);
        if (newDist < dist) {
            dist = newDist;
            t = 1.0;
        }
        return {location:t, distance:dist};
    };
    /**
     * finds the nearest point on the curve to the given point.
     */
    var _nearestPointOnCurve = function(point, curve) {
        var td = _distanceFromCurve(point, curve);
        return {point:_bezier(curve, curve.length - 1, td.location, null, null), location:td.location};
    };
    var _convertToBezier = function(point, curve) {
        var degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            c = [], d = [], cdTable = [], w = [],
            z = [ [1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0] ];

        for (var i = 0; i <= degree; i++) c[i] = Vectors.subtract(curve[i], point);
        for (var i = 0; i <= degree - 1; i++) {
            d[i] = Vectors.subtract(curve[i+1], curve[i]);
            d[i] = Vectors.scale(d[i], 3.0);
        }
        for (var row = 0; row <= degree - 1; row++) {
            for (var column = 0; column <= degree; column++) {
                if (!cdTable[row]) cdTable[row] = [];
                cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
            }
        }
        for (i = 0; i <= higherDegree; i++) {
            if (!w[i]) w[i] = [];
            w[i].y = 0.0;
            w[i].x = parseFloat(i) / higherDegree;
        }
        var n = degree, m = degree-1;
        for (var k = 0; k <= n + m; k++) {
            var lb = Math.max(0, k - m),
                ub = Math.min(k, n);
            for (i = lb; i <= ub; i++) {
                var j = k - i;
                w[i+j].y += cdTable[j][i] * z[j][i];
            }
        }
        return w;
    };
    /**
     * counts how many roots there are.
     */
    var _findRoots = function(w, degree, t, depth) {
        var left = [], right = [],
            left_count, right_count,
            left_t = [], right_t = [];

        switch (_getCrossingCount(w, degree)) {
            case 0 : {
                return 0;
            }
            case 1 : {
                if (depth >= maxRecursion) {
                    t[0] = (w[0].x + w[degree].x) / 2.0;
                    return 1;
                }
                if (_isFlatEnough(w, degree)) {
                    t[0] = _computeXIntercept(w, degree);
                    return 1;
                }
                break;
            }
        }
        _bezier(w, degree, 0.5, left, right);
        left_count  = _findRoots(left,  degree, left_t, depth+1);
        right_count = _findRoots(right, degree, right_t, depth+1);
        for (var i = 0; i < left_count; i++) t[i] = left_t[i];
        for (var i = 0; i < right_count; i++) t[i+left_count] = right_t[i];
        return (left_count+right_count);
    };
    var _getCrossingCount = function(curve, degree) {
        var n_crossings = 0, sign, old_sign;
        sign = old_sign = Math.sgn(curve[0].y);
        for (var i = 1; i <= degree; i++) {
            sign = Math.sgn(curve[i].y);
            if (sign != old_sign) n_crossings++;
            old_sign = sign;
        }
        return n_crossings;
    };
    var _isFlatEnough = function(curve, degree) {
        var  error,
            intercept_1, intercept_2, left_intercept, right_intercept,
            a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
        a = curve[0].y - curve[degree].y;
        b = curve[degree].x - curve[0].x;
        c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;

        var max_distance_above, max_distance_below;
        max_distance_above = max_distance_below = 0.0;

        for (var i = 1; i < degree; i++) {
            var value = a * curve[i].x + b * curve[i].y + c;
            if (value > max_distance_above)
                max_distance_above = value;
            else if (value < max_distance_below)
                max_distance_below = value;
        }

        a1 = 0.0; b1 = 1.0; c1 = 0.0; a2 = a; b2 = b;
        c2 = c - max_distance_above;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_1 = (b1 * c2 - b2 * c1) * dInv;
        a2 = a; b2 = b; c2 = c - max_distance_below;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_2 = (b1 * c2 - b2 * c1) * dInv;
        left_intercept = Math.min(intercept_1, intercept_2);
        right_intercept = Math.max(intercept_1, intercept_2);
        error = right_intercept - left_intercept;
        return (error < flatnessTolerance)? 1 : 0;
    };
    var _computeXIntercept = function(curve, degree) {
        var XLK = 1.0, YLK = 0.0,
            XNM = curve[degree].x - curve[0].x, YNM = curve[degree].y - curve[0].y,
            XMK = curve[0].x - 0.0, YMK = curve[0].y - 0.0,
            det = XNM*YLK - YNM*XLK, detInv = 1.0/det,
            S = (XNM*YMK - YNM*XMK) * detInv;
        return 0.0 + XLK * S;
    };
    var _bezier = function(curve, degree, t, left, right) {
        var temp = [[]];
        for (var j =0; j <= degree; j++) temp[0][j] = curve[j];
        for (var i = 1; i <= degree; i++) {
            for (var j =0 ; j <= degree - i; j++) {
                if (!temp[i]) temp[i] = [];
                if (!temp[i][j]) temp[i][j] = {};
                temp[i][j].x = (1.0 - t) * temp[i-1][j].x + t * temp[i-1][j+1].x;
                temp[i][j].y = (1.0 - t) * temp[i-1][j].y + t * temp[i-1][j+1].y;
            }
        }
        if (left != null)
            for (j = 0; j <= degree; j++) left[j]  = temp[j][0];
        if (right != null)
            for (j = 0; j <= degree; j++) right[j] = temp[degree-j][j];

        return (temp[degree][0]);
    };

    var _curveFunctionCache = {};
    var _getCurveFunctions = function(order) {
        var fns = _curveFunctionCache[order];
        if (!fns) {
            fns = [];
            var f_term = function() { return function(t) { return Math.pow(t, order); }; },
                l_term = function() { return function(t) { return Math.pow((1-t), order); }; },
                c_term = function(c) { return function(t) { return c; }; },
                t_term = function() { return function(t) { return t; }; },
                one_minus_t_term = function() { return function(t) { return 1-t; }; },
                _termFunc = function(terms) {
                    return function(t) {
                        var p = 1;
                        for (var i = 0; i < terms.length; i++) p = p * terms[i](t);
                        return p;
                    };
                };

            fns.push(new f_term());  // first is t to the power of the curve order
            for (var i = 1; i < order; i++) {
                var terms = [new c_term(order)];
                for (var j = 0 ; j < (order - i); j++) terms.push(new t_term());
                for (var j = 0 ; j < i; j++) terms.push(new one_minus_t_term());
                fns.push(new _termFunc(terms));
            }
            fns.push(new l_term());  // last is (1-t) to the power of the curve order

            _curveFunctionCache[order] = fns;
        }

        return fns;
    };


    /**
     * calculates a point on the curve, for a Bezier of arbitrary order.
     * @param curve an array of control points, eg [{x:10,y:20}, {x:50,y:50}, {x:100,y:100}, {x:120,y:100}].  For a cubic bezier this should have four points.
     * @param location a decimal indicating the distance along the curve the point should be located at.  this is the distance along the curve as it travels, taking the way it bends into account.  should be a number from 0 to 1, inclusive.
     */
    var _pointOnPath = function(curve, location) {
        var cc = _getCurveFunctions(curve.length - 1),
            _x = 0, _y = 0;
        for (var i = 0; i < curve.length ; i++) {
            _x = _x + (curve[i].x * cc[i](location));
            _y = _y + (curve[i].y * cc[i](location));
        }

        return {x:_x, y:_y};
    };

    var _dist = function(p1,p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    var _isPoint = function(curve) {
        return curve[0].x === curve[1].x && curve[0].y === curve[1].y;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.  this method returns both the x,y location of the point and also
     * its 'location' (proportion of travel along the path); the method below - _pointAlongPathFrom - calls this method and just returns the
     * point.
     */
    var _pointAlongPath = function(curve, location, distance) {
        
        if (_isPoint(curve)) {
            return {
                point:curve[0],
                location:location
            };
        }

        var prev = _pointOnPath(curve, location),
            tally = 0,
            curLoc = location,
            direction = distance > 0 ? 1 : -1,
            cur = null;

        while (tally < Math.abs(distance)) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }

        return {point:cur, location:curLoc};
    };

    var _length = function(curve) {

        var d = new Date().getTime();

        if (_isPoint(curve)) return 0;

        var prev = _pointOnPath(curve, 0),
            tally = 0,
            curLoc = 0,
            direction = 1,
            cur = null;

        while (curLoc < 1) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        console.log("length", new Date().getTime() - d);

        return tally;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.
     */
    var _pointAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).point;
    };

    /**
     * finds the location that is 'distance' along the path from 'location'.
     */
    var _locationAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).location;
    };

    /**
     * returns the gradient of the curve at the given location, which is a decimal between 0 and 1 inclusive.
     *
     * thanks // http://bimixual.org/AnimationLibrary/beziertangents.html
     */
    var _gradientAtPoint = function(curve, location) {

        var p1 = _pointOnPath(curve, location),
            p2 = _pointOnPath(curve.slice(0, curve.length - 1), location),
            dy = p2.y - p1.y, dx = p2.x - p1.x;

        return dy === 0 ? Infinity : Math.atan(dy / dx);
    };

    /**
     returns the gradient of the curve at the point which is 'distance' from the given location.
     if this point is greater than location 1, the gradient at location 1 is returned.
     if this point is less than location 0, the gradient at location 0 is returned.
     */
    var _gradientAtPointAlongPathFrom = function(curve, location, distance) {
        var p = _pointAlongPath(curve, location, distance);
        if (p.location > 1) p.location = 1;
        if (p.location < 0) p.location = 0;
        return _gradientAtPoint(curve, p.location);
    };

    /**
     * calculates a line that is 'length' pixels long, perpendicular to, and centered on, the path at 'distance' pixels from the given location.
     * if distance is not supplied, the perpendicular for the given location is computed (ie. we set distance to zero).
     */
    var _perpendicularToPathAt = function(curve, location, length, distance) {
        distance = distance == null ? 0 : distance;
        var p = _pointAlongPath(curve, location, distance),
            m = _gradientAtPoint(curve, p.location),
            _theta2 = Math.atan(-1 / m),
            y =  length / 2 * Math.sin(_theta2),
            x =  length / 2 * Math.cos(_theta2);
        return [{x:p.point.x + x, y:p.point.y + y}, {x:p.point.x - x, y:p.point.y - y}];
    };

    /**
     * Calculates all intersections of the given line with the given curve.
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param curve
     * @returns {Array}
     */
    var _lineIntersection = function(x1, y1, x2, y2, curve) {
        var a = y2 - y1,
            b = x1 - x2,
            c = (x1 * (y1 - y2)) + (y1 * (x2-x1)),
            coeffs = _computeCoefficients(curve),
            p = [
                (a*coeffs[0][0]) + (b * coeffs[1][0]),
                (a*coeffs[0][1])+(b*coeffs[1][1]),
                (a*coeffs[0][2])+(b*coeffs[1][2]),
                (a*coeffs[0][3])+(b*coeffs[1][3]) + c
            ],
            r = _cubicRoots.apply(null, p),
            intersections = [];

        if (r != null) {

            for (var i = 0; i < 3; i++) {
                var t = r[i],
                    t2 = Math.pow(t, 2),
                    t3 = Math.pow(t, 3),
                    x = [
                        (coeffs[0][0] * t3) + (coeffs[0][1] * t2) + (coeffs[0][2] * t) + coeffs[0][3],
                        (coeffs[1][0] * t3) + (coeffs[1][1] * t2) + (coeffs[1][2] * t) + coeffs[1][3]
                    ];

                // check bounds of the line
                var s;
                if ((x2 - x1) !== 0) {
                    s = (x[0] - x1) / (x2 - x1);
                }
                else {
                    s = (x[1] - y1) / (y2 - y1);
                }

                if (t >= 0 && t <= 1.0 && s >= 0 && s <= 1.0) {
                    intersections.push(x);
                }
            }
        }

        return intersections;
    };

    /**
     * Calculates all intersections of the given box with the given curve.
     * @param x X position of top left corner of box
     * @param y Y position of top left corner of box
     * @param w width of box
     * @param h height of box
     * @param curve
     * @returns {Array}
     */
    var _boxIntersection = function(x, y, w, h, curve) {
        var i = [];
        i.push.apply(i, _lineIntersection(x, y, x + w, y, curve));
        i.push.apply(i, _lineIntersection(x + w, y, x + w, y + h, curve));
        i.push.apply(i, _lineIntersection(x + w, y + h, x, y + h, curve));
        i.push.apply(i, _lineIntersection(x, y + h, x, y, curve));
        return i;
    };

    /**
     * Calculates all intersections of the given bounding box with the given curve.
     * @param boundingBox Bounding box, in { x:.., y:..., w:..., h:... } format.
     * @param curve
     * @returns {Array}
     */
    var _boundingBoxIntersection = function(boundingBox, curve) {
        var i = [];
        i.push.apply(i, _lineIntersection(boundingBox.x, boundingBox.y, boundingBox.x + boundingBox.w, boundingBox.y, curve));
        i.push.apply(i, _lineIntersection(boundingBox.x + boundingBox.w, boundingBox.y, boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h, curve));
        i.push.apply(i, _lineIntersection(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h, boundingBox.x, boundingBox.y + boundingBox.h, curve));
        i.push.apply(i, _lineIntersection(boundingBox.x, boundingBox.y + boundingBox.h, boundingBox.x, boundingBox.y, curve));
        return i;
    };


    function _computeCoefficientsForAxis(curve, axis) {
        return [
            -(curve[0][axis]) + (3*curve[1][axis]) + (-3 * curve[2][axis]) + curve[3][axis],
            (3*(curve[0][axis])) - (6*(curve[1][axis])) + (3*(curve[2][axis])),
            -3*curve[0][axis] + 3*curve[1][axis],
            curve[0][axis]
        ];
    }

    function _computeCoefficients(curve)
    {
        return [
            _computeCoefficientsForAxis(curve, "x"),
            _computeCoefficientsForAxis(curve, "y")
        ];
    }

    function sgn(x) {
        return x < 0 ? -1 : x > 0 ? 1 : 0;
    }

    function _cubicRoots(a, b, c, d) {
        var A = b / a,
            B = c / a,
            C = d / a,
            Q = (3*B - Math.pow(A, 2))/9,
            R = (9*A*B - 27*C - 2*Math.pow(A, 3))/54,
            D = Math.pow(Q, 3) + Math.pow(R, 2),
            S,
            T,
            t = [];

        if (D >= 0)                                 // complex or duplicate roots
        {
            S = sgn(R + Math.sqrt(D))*Math.pow(Math.abs(R + Math.sqrt(D)),(1/3));
            T = sgn(R - Math.sqrt(D))*Math.pow(Math.abs(R - Math.sqrt(D)),(1/3));

            t[0] = -A/3 + (S + T);
            t[1] = -A/3 - (S + T)/2;
            t[2] = -A/3 - (S + T)/2;

            /*discard complex roots*/
            if (Math.abs(Math.sqrt(3)*(S - T)/2) !== 0) {
                t[1] = -1;
                t[2] = -1;
            }
        }
        else                                          // distinct real roots
        {
            var th = Math.acos(R/Math.sqrt(-Math.pow(Q, 3)));
            t[0] = 2*Math.sqrt(-Q)*Math.cos(th/3) - A/3;
            t[1] = 2*Math.sqrt(-Q)*Math.cos((th + 2*Math.PI)/3) - A/3;
            t[2] = 2*Math.sqrt(-Q)*Math.cos((th + 4*Math.PI)/3) - A/3;
        }

        // discard out of spec roots
        for (var i = 0; i < 3; i++) {
            if (t[i] < 0 || t[i] > 1.0) {
                t[i] = -1;
            }
        }

        return t;
    }

    var jsBezier = this.jsBezier = {
        distanceFromCurve : _distanceFromCurve,
        gradientAtPoint : _gradientAtPoint,
        gradientAtPointAlongCurveFrom : _gradientAtPointAlongPathFrom,
        nearestPointOnCurve : _nearestPointOnCurve,
        pointOnCurve : _pointOnPath,
        pointAlongCurveFrom : _pointAlongPathFrom,
        perpendicularToCurveAt : _perpendicularToPathAt,
        locationAlongCurveFrom:_locationAlongPathFrom,
        getLength:_length,
        lineIntersection:_lineIntersection,
        boxIntersection:_boxIntersection,
        boundingBoxIntersection:_boundingBoxIntersection,
        version:"0.9.0"
    };

    {
        exports.jsBezier = jsBezier;
    }

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function() {
    var root = this;

    var Biltong = root.Biltong = {
        version:"0.4.0"
    };

    {
        exports.Biltong = Biltong;
    }

    var _isa = function(a) { return Object.prototype.toString.call(a) === "[object Array]"; },
        _pointHelper = function(p1, p2, fn) {
            p1 = _isa(p1) ? p1 : [p1.x, p1.y];
            p2 = _isa(p2) ? p2 : [p2.x, p2.y];
            return fn(p1, p2);
        },
        /**
         * @name Biltong.gradient
         * @function
         * @desc Calculates the gradient of a line between the two points.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Float} The gradient of a line between the two points.
         */
        _gradient = Biltong.gradient = function(p1, p2) {
            return _pointHelper(p1, p2, function(_p1, _p2) {
                if (_p2[0] == _p1[0])
                    return _p2[1] > _p1[1] ? Infinity : -Infinity;
                else if (_p2[1] == _p1[1])
                    return _p2[0] > _p1[0] ? 0 : -0;
                else
                    return (_p2[1] - _p1[1]) / (_p2[0] - _p1[0]);
            });
        };
        /**
         * @name Biltong.normal
         * @function
         * @desc Calculates the gradient of a normal to a line between the two points.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Float} The gradient of a normal to a line between the two points.
         */
        Biltong.normal = function(p1, p2) {
            return -1 / _gradient(p1, p2);
        };
        /**
         * @name Biltong.lineLength
         * @function
         * @desc Calculates the length of a line between the two points.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Float} The length of a line between the two points.
         */
        Biltong.lineLength = function(p1, p2) {
            return _pointHelper(p1, p2, function(_p1, _p2) {
                return Math.sqrt(Math.pow(_p2[1] - _p1[1], 2) + Math.pow(_p2[0] - _p1[0], 2));
            });
        };
        var /**
         * @name Biltong.quadrant
         * @function
         * @desc Calculates the quadrant in which the angle between the two points lies.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Integer} The quadrant - 1 for upper right, 2 for lower right, 3 for lower left, 4 for upper left.
         */
        _quadrant = Biltong.quadrant = function(p1, p2) {
            return _pointHelper(p1, p2, function(_p1, _p2) {
                if (_p2[0] > _p1[0]) {
                    return (_p2[1] > _p1[1]) ? 2 : 1;
                }
                else if (_p2[0] == _p1[0]) {
                    return _p2[1] > _p1[1] ? 2 : 1;
                }
                else {
                    return (_p2[1] > _p1[1]) ? 3 : 4;
                }
            });
        };
        /**
         * @name Biltong.theta
         * @function
         * @desc Calculates the angle between the two points.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Float} The angle between the two points.
         */
        Biltong.theta = function(p1, p2) {
            return _pointHelper(p1, p2, function(_p1, _p2) {
                var m = _gradient(_p1, _p2),
                    t = Math.atan(m),
                    s = _quadrant(_p1, _p2);
                if ((s == 4 || s== 3)) t += Math.PI;
                if (t < 0) t += (2 * Math.PI);

                return t;
            });
        };
        /**
         * @name Biltong.intersects
         * @function
         * @desc Calculates whether or not the two rectangles intersect.
         * @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
         * @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
         * @return {Boolean} True if the rectangles intersect, false otherwise.
         */
        Biltong.intersects = function(r1, r2) {
            var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
                a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;

            return  ( (x1 <= a1 && a1 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
                ( (x1 <= a2 && a2 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
                ( (x1 <= a1 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
                ( (x1 <= a2 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
                ( (a1 <= x1 && x1 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
                ( (a1 <= x2 && x2 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
                ( (a1 <= x1 && x1 <= a2) && (b1 <= y2 && y2 <= b2) ) ||
                ( (a1 <= x2 && x1 <= a2) && (b1 <= y2 && y2 <= b2) );
        };
        /**
         * @name Biltong.encloses
         * @function
         * @desc Calculates whether or not r2 is completely enclosed by r1.
         * @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
         * @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
         * @param {Boolean} [allowSharedEdges=false] If true, the concept of enclosure allows for one or more edges to be shared by the two rectangles.
         * @return {Boolean} True if r1 encloses r2, false otherwise.
         */
        Biltong.encloses = function(r1, r2, allowSharedEdges) {
            var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
                a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h,
                c = function(v1, v2, v3, v4) { return allowSharedEdges ? v1 <= v2 && v3>= v4 : v1 < v2 && v3 > v4; };

            return c(x1,a1,x2,a2) && c(y1,b1,y2,b2);
        };
        var _segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1] ],
        _inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1] ];
        /**
         * @name Biltong.pointOnLine
         * @function
         * @desc Calculates a point on the line from `fromPoint` to `toPoint` that is `distance` units along the length of the line.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Point} Point on the line, in the form `{ x:..., y:... }`.
         */
        Biltong.pointOnLine = function(fromPoint, toPoint, distance) {
            var m = _gradient(fromPoint, toPoint),
                s = _quadrant(fromPoint, toPoint),
                segmentMultiplier = distance > 0 ? _segmentMultipliers[s] : _inverseSegmentMultipliers[s],
                theta = Math.atan(m),
                y = Math.abs(distance * Math.sin(theta)) * segmentMultiplier[1],
                x =  Math.abs(distance * Math.cos(theta)) * segmentMultiplier[0];
            return { x:fromPoint.x + x, y:fromPoint.y + y };
        };
        /**
         * @name Biltong.perpendicularLineTo
         * @function
         * @desc Calculates a line of length `length` that is perpendicular to the line from `fromPoint` to `toPoint` and passes through `toPoint`.
         * @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
         * @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
         * @return {Line} Perpendicular line, in the form `[ { x:..., y:... }, { x:..., y:... } ]`.
         */
        Biltong.perpendicularLineTo = function(fromPoint, toPoint, length) {
            var m = _gradient(fromPoint, toPoint),
                theta2 = Math.atan(-1 / m),
                y =  length / 2 * Math.sin(theta2),
                x =  length / 2 * Math.cos(theta2);
            return [{x:toPoint.x + x, y:toPoint.y + y}, {x:toPoint.x - x, y:toPoint.y - y}];
        };
}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {

    /**
     * Creates a Touch object.
     * @param view
     * @param target
     * @param pageX
     * @param pageY
     * @param screenX
     * @param screenY
     * @param clientX
     * @param clientY
     * @returns {Touch}
     * @private
     */
    function _touch(view, target, pageX, pageY, screenX, screenY, clientX, clientY) {

            return new Touch({
                target:target,
                identifier:_uuid(),
                pageX: pageX,
                pageY: pageY,
                screenX: screenX,
                screenY: screenY,
                clientX: clientX || screenX,
                clientY: clientY || screenY
            });
    }

    /**
     * Create a synthetic touch list from the given list of Touch objects.
     * @returns {Array}
     * @private
     */
    function _touchList() {
        var list = [];
        Array.prototype.push.apply(list, arguments);
        list.item =  function(index) { return this[index]; };
        return list;
    }

    /**
     * Create a Touch object and then insert it into a synthetic touch list, returning the list.s
     * @param view
     * @param target
     * @param pageX
     * @param pageY
     * @param screenX
     * @param screenY
     * @param clientX
     * @param clientY
     * @returns {Array}
     * @private
     */
    function _touchAndList(view, target, pageX, pageY, screenX, screenY, clientX, clientY) {
        return _touchList(_touch.apply(null, arguments));
    }

    var root = this,
        matchesSelector = function (el, selector, ctx) {
            ctx = ctx || el.parentNode;
            var possibles = ctx.querySelectorAll(selector);
            for (var i = 0; i < possibles.length; i++) {
                if (possibles[i] === el) {
                    return true;
                }
            }
            return false;
        },
        _gel = function (el) {
            return (typeof el == "string" || el.constructor === String) ? document.getElementById(el) : el;
        },
        _t = function (e) {
            return e.srcElement || e.target;
        },
    //
    // gets path info for the given event - the path from target to obj, in the event's bubble chain. if doCompute
    // is false we just return target for the path.
    //
        _pi = function(e, target, obj, doCompute) {
            if (!doCompute) return { path:[target], end:1 };
            else if (typeof e.path !== "undefined" && e.path.indexOf) {
                return { path: e.path, end: e.path.indexOf(obj) };
            } else {
                var out = { path:[], end:-1 }, _one = function(el) {
                    out.path.push(el);
                    if (el === obj) {
                        out.end = out.path.length - 1;
                    }
                    else if (el.parentNode != null) {
                        _one(el.parentNode);
                    }
                };
                _one(target);
                return out;
            }
        },
        _d = function (l, fn) {
            for (var i = 0, j = l.length; i < j; i++) {
                if (l[i] == fn) break;
            }
            if (i < l.length) l.splice(i, 1);
        },
        guid = 1,
    //
    // this function generates a guid for every handler, sets it on the handler, then adds
    // it to the associated object's map of handlers for the given event. this is what enables us
    // to unbind all events of some type, or all events (the second of which can be requested by the user,
    // but it also used by Mottle when an element is removed.)
        _store = function (obj, event, fn) {
            var g = guid++;
            obj.__ta = obj.__ta || {};
            obj.__ta[event] = obj.__ta[event] || {};
            // store each handler with a unique guid.
            obj.__ta[event][g] = fn;
            // set the guid on the handler.
            fn.__tauid = g;
            return g;
        },
        _unstore = function (obj, event, fn) {
            obj.__ta && obj.__ta[event] && delete obj.__ta[event][fn.__tauid];
            // a handler might have attached extra functions, so we unbind those too.
            if (fn.__taExtra) {
                for (var i = 0; i < fn.__taExtra.length; i++) {
                    _unbind(obj, fn.__taExtra[i][0], fn.__taExtra[i][1]);
                }
                fn.__taExtra.length = 0;
            }
            // a handler might have attached an unstore callback
            fn.__taUnstore && fn.__taUnstore();
        },
        _curryChildFilter = function (children, obj, fn, evt) {
            if (children == null) return fn;
            else {
                var c = children.split(","),
                    _fn = function (e) {
                        _fn.__tauid = fn.__tauid;
                        var t = _t(e), target = t;  // t is the target element on which the event occurred. it is the
                        // element we will wish to pass to any callbacks.
                        var pathInfo = _pi(e, t, obj, children != null);
                        if (pathInfo.end != -1) {
                            for (var p = 0; p < pathInfo.end; p++) {
                                target = pathInfo.path[p];
                                for (var i = 0; i < c.length; i++) {
                                    if (matchesSelector(target, c[i], obj)) {
                                        fn.apply(target, arguments);
                                    }
                                }
                            }
                        }
                    };
                registerExtraFunction(fn, evt, _fn);
                return _fn;
            }
        },
    //
    // registers an 'extra' function on some event listener function we were given - a function that we
    // created and bound to the element as part of our housekeeping, and which we want to unbind and remove
    // whenever the given function is unbound.
        registerExtraFunction = function (fn, evt, newFn) {
            fn.__taExtra = fn.__taExtra || [];
            fn.__taExtra.push([evt, newFn]);
        },
        DefaultHandler = function (obj, evt, fn, children) {
            if (isTouchDevice && touchMap[evt]) {
                var tfn = _curryChildFilter(children, obj, fn, touchMap[evt]);
                _bind(obj, touchMap[evt], tfn , fn);
            }
            if (evt === "focus" && obj.getAttribute("tabindex") == null) {
                obj.setAttribute("tabindex", "1");
            }
            _bind(obj, evt, _curryChildFilter(children, obj, fn, evt), fn);
        },
        SmartClickHandler = function (obj, evt, fn, children) {
            if (obj.__taSmartClicks == null) {
                var down = function (e) {
                        obj.__tad = _pageLocation(e);
                    },
                    up = function (e) {
                        obj.__tau = _pageLocation(e);
                    },
                    click = function (e) {
                        if (obj.__tad && obj.__tau && obj.__tad[0] === obj.__tau[0] && obj.__tad[1] === obj.__tau[1]) {
                            for (var i = 0; i < obj.__taSmartClicks.length; i++)
                                obj.__taSmartClicks[i].apply(_t(e), [ e ]);
                        }
                    };
                DefaultHandler(obj, "mousedown", down, children);
                DefaultHandler(obj, "mouseup", up, children);
                DefaultHandler(obj, "click", click, children);
                obj.__taSmartClicks = [];
            }

            // store in the list of callbacks
            obj.__taSmartClicks.push(fn);
            // the unstore function removes this function from the object's listener list for this type.
            fn.__taUnstore = function () {
                _d(obj.__taSmartClicks, fn);
            };
        },
        _tapProfiles = {
            "tap": {touches: 1, taps: 1},
            "dbltap": {touches: 1, taps: 2},
            "contextmenu": {touches: 2, taps: 1}
        },
        TapHandler = function (clickThreshold, dblClickThreshold) {
            return function (obj, evt, fn, children) {
                // if event is contextmenu, for devices which are mouse only, we want to
                // use the default bind.
                if (evt == "contextmenu" && isMouseDevice)
                    DefaultHandler(obj, evt, fn, children);
                else {
                    // the issue here is that this down handler gets registered only for the
                    // child nodes in the first registration. in fact it should be registered with
                    // no child selector and then on down we should cycle through the registered
                    // functions to see if one of them matches. on mouseup we should execute ALL of
                    // the functions whose children are either null or match the element.
                    if (obj.__taTapHandler == null) {
                        var tt = obj.__taTapHandler = {
                            tap: [],
                            dbltap: [],
                            contextmenu: [],
                            down: false,
                            taps: 0,
                            downSelectors: []
                        };
                        var down = function (e) {
                                var target = _t(e), pathInfo = _pi(e, target, obj, children != null), finished = false;
                                for (var p = 0; p < pathInfo.end; p++) {
                                    if (finished) return;
                                    target = pathInfo.path[p];
                                    for (var i = 0; i < tt.downSelectors.length; i++) {
                                        if (tt.downSelectors[i] == null || matchesSelector(target, tt.downSelectors[i], obj)) {
                                            tt.down = true;
                                            setTimeout(clearSingle, clickThreshold);
                                            setTimeout(clearDouble, dblClickThreshold);
                                            finished = true;
                                            break; // we only need one match on mousedown
                                        }
                                    }
                                }
                            },
                            up = function (e) {
                                if (tt.down) {
                                    var target = _t(e), currentTarget, pathInfo;
                                    tt.taps++;
                                    var tc = _touchCount(e);
                                    for (var eventId in _tapProfiles) {
                                        if (_tapProfiles.hasOwnProperty(eventId)) {
                                            var p = _tapProfiles[eventId];
                                            if (p.touches === tc && (p.taps === 1 || p.taps === tt.taps)) {
                                                for (var i = 0; i < tt[eventId].length; i++) {
                                                    pathInfo = _pi(e, target, obj, tt[eventId][i][1] != null);
                                                    for (var pLoop = 0; pLoop < pathInfo.end; pLoop++) {
                                                        currentTarget = pathInfo.path[pLoop];
                                                        // this is a single event registration handler.
                                                        if (tt[eventId][i][1] == null || matchesSelector(currentTarget, tt[eventId][i][1], obj)) {
                                                            tt[eventId][i][0].apply(currentTarget, [ e ]);
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            clearSingle = function () {
                                tt.down = false;
                            },
                            clearDouble = function () {
                                tt.taps = 0;
                            };

                        DefaultHandler(obj, "mousedown", down);
                        DefaultHandler(obj, "mouseup", up);
                    }
                    // add this child selector (it can be null, that's fine).
                    obj.__taTapHandler.downSelectors.push(children);

                    obj.__taTapHandler[evt].push([fn, children]);
                    // the unstore function removes this function from the object's listener list for this type.
                    fn.__taUnstore = function () {
                        _d(obj.__taTapHandler[evt], fn);
                    };
                }
            };
        },
        meeHelper = function (type, evt, obj, target) {
            for (var i in obj.__tamee[type]) {
                if (obj.__tamee[type].hasOwnProperty(i)) {
                    obj.__tamee[type][i].apply(target, [ evt ]);
                }
            }
        },
        MouseEnterExitHandler = function () {
            var activeElements = [];
            return function (obj, evt, fn, children) {
                if (!obj.__tamee) {
                    // __tamee holds a flag saying whether the mouse is currently "in" the element, and a list of
                    // both mouseenter and mouseexit functions.
                    obj.__tamee = { over: false, mouseenter: [], mouseexit: [] };
                    // register over and out functions
                    var over = function (e) {
                            var t = _t(e);
                            if ((children == null && (t == obj && !obj.__tamee.over)) || (matchesSelector(t, children, obj) && (t.__tamee == null || !t.__tamee.over))) {
                                meeHelper("mouseenter", e, obj, t);
                                t.__tamee = t.__tamee || {};
                                t.__tamee.over = true;
                                activeElements.push(t);
                            }
                        },
                        out = function (e) {
                            var t = _t(e);
                            // is the current target one of the activeElements? and is the
                            // related target NOT a descendant of it?
                            for (var i = 0; i < activeElements.length; i++) {
                                if (t == activeElements[i] && !matchesSelector((e.relatedTarget || e.toElement), "*", t)) {
                                    t.__tamee.over = false;
                                    activeElements.splice(i, 1);
                                    meeHelper("mouseexit", e, obj, t);
                                }
                            }
                        };

                    _bind(obj, "mouseover", _curryChildFilter(children, obj, over, "mouseover"), over);
                    _bind(obj, "mouseout", _curryChildFilter(children, obj, out, "mouseout"), out);
                }

                fn.__taUnstore = function () {
                    delete obj.__tamee[evt][fn.__tauid];
                };

                _store(obj, evt, fn);
                obj.__tamee[evt][fn.__tauid] = fn;
            };
        },
        isTouchDevice = "ontouchstart" in document.documentElement || navigator.maxTouchPoints,
        isMouseDevice = "onmousedown" in document.documentElement,
        touchMap = { "mousedown": "touchstart", "mouseup": "touchend", "mousemove": "touchmove" },
        iev = (function () {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        isIELT9 = iev > -1 && iev < 9,
        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                return _genLoc(e, "page");
            }
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _touchCount = function (e) {
            return _touches(e).length;
        },
    //http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
        _bind = function (obj, type, fn, originalFn) {
            _store(obj, type, fn);
            originalFn.__tauid = fn.__tauid;
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                var key = type + fn.__tauid;
                obj["e" + key] = fn;
                // TODO look at replacing with .call(..)
                obj[key] = function () {
                    obj["e" + key] && obj["e" + key](window.event);
                };
                obj.attachEvent("on" + type, obj[key]);
            }
        },
        _unbind = function (obj, type, fn) {
            if (fn == null) return;
            _each(obj, function () {
                var _el = _gel(this);
                _unstore(_el, type, fn);
                // it has been bound if there is a tauid. otherwise it was not bound and we can ignore it.
                if (fn.__tauid != null) {
                    if (_el.removeEventListener) {
                        _el.removeEventListener(type, fn, false);
                        if (isTouchDevice && touchMap[type]) _el.removeEventListener(touchMap[type], fn, false);
                    }
                    else if (this.detachEvent) {
                        var key = type + fn.__tauid;
                        _el[key] && _el.detachEvent("on" + type, _el[key]);
                        _el[key] = null;
                        _el["e" + key] = null;
                    }
                }

                // if a touch event was also registered, deregister now.
                if (fn.__taTouchProxy) {
                    _unbind(obj, fn.__taTouchProxy[1], fn.__taTouchProxy[0]);
                }
            });
        },
        _each = function (obj, fn) {
            if (obj == null) return;
            // if a list (or list-like), use it. if a string, get a list
            // by running the string through querySelectorAll. else, assume
            // it's an Element.
            // obj.top is "unknown" in IE8.
            obj = (typeof Window !== "undefined" && (typeof obj.top !== "unknown" && obj == obj.top)) ? [ obj ] :
                    (typeof obj !== "string") && (obj.tagName == null && obj.length != null) ? obj :
                    typeof obj === "string" ? document.querySelectorAll(obj)
                : [ obj ];

            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i]);
        },
        _uuid = function () {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        };

    /**
     * Mottle offers support for abstracting out the differences
     * between touch and mouse devices, plus "smart click" functionality
     * (don't fire click if the mouse has moved between mousedown and mouseup),
     * and synthesized click/tap events.
     * @class Mottle
     * @constructor
     * @param {Object} params Constructor params
     * @param {Number} [params.clickThreshold=250] Threshold, in milliseconds beyond which a touchstart followed by a touchend is not considered to be a click.
     * @param {Number} [params.dblClickThreshold=450] Threshold, in milliseconds beyond which two successive tap events are not considered to be a click.
     * @param {Boolean} [params.smartClicks=false] If true, won't fire click events if the mouse has moved between mousedown and mouseup. Note that this functionality
     * requires that Mottle consume the mousedown event, and so may not be viable in all use cases.
     */
    root.Mottle = function (params) {
        params = params || {};
        var clickThreshold = params.clickThreshold || 250,
            dblClickThreshold = params.dblClickThreshold || 450,
            mouseEnterExitHandler = new MouseEnterExitHandler(),
            tapHandler = new TapHandler(clickThreshold, dblClickThreshold),
            _smartClicks = params.smartClicks,
            _doBind = function (obj, evt, fn, children) {
                if (fn == null) return;
                _each(obj, function () {
                    var _el = _gel(this);
                    if (_smartClicks && evt === "click")
                        SmartClickHandler(_el, evt, fn, children);
                    else if (evt === "tap" || evt === "dbltap" || evt === "contextmenu") {
                        tapHandler(_el, evt, fn, children);
                    }
                    else if (evt === "mouseenter" || evt == "mouseexit")
                        mouseEnterExitHandler(_el, evt, fn, children);
                    else
                        DefaultHandler(_el, evt, fn, children);
                });
            };

        /**
         * Removes an element from the DOM, and deregisters all event handlers for it. You should use this
         * to ensure you don't leak memory.
         * @method remove
         * @param {String|Element} el Element, or id of the element, to remove.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.remove = function (el) {
            _each(el, function () {
                var _el = _gel(this);
                if (_el.__ta) {
                    for (var evt in _el.__ta) {
                        if (_el.__ta.hasOwnProperty(evt)) {
                            for (var h in _el.__ta[evt]) {
                                if (_el.__ta[evt].hasOwnProperty(h))
                                    _unbind(_el, evt, _el.__ta[evt][h]);
                            }
                        }
                    }
                }
                _el.parentNode && _el.parentNode.removeChild(_el);
            });
            return this;
        };

        /**
         * Register an event handler, optionally as a delegate for some set of descendant elements. Note
         * that this method takes either 3 or 4 arguments - if you supply 3 arguments it is assumed you have
         * omitted the `children` parameter, and that the event handler should be bound directly to the given element.
         * @method on
         * @param {Element[]|Element|String} el Either an Element, or a CSS spec for a list of elements, or an array of Elements.
         * @param {String} [children] Comma-delimited list of selectors identifying allowed children.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.on = function (el, event, children, fn) {
            var _el = arguments[0],
                _c = arguments.length == 4 ? arguments[2] : null,
                _e = arguments[1],
                _f = arguments[arguments.length - 1];

            _doBind(_el, _e, _f, _c);
            return this;
        };

        /**
         * Cancel delegate event handling for the given function. Note that unlike with 'on' you do not supply
         * a list of child selectors here: it removes event delegation from all of the child selectors for which the
         * given function was registered (if any).
         * @method off
         * @param {Element[]|Element|String} el Element - or ID of element - from which to remove event listener.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.off = function (el, event, fn) {
            _unbind(el, event, fn);
            return this;
        };

        /**
         * Triggers some event for a given element.
         * @method trigger
         * @param {Element} el Element for which to trigger the event.
         * @param {String} event Event ID.
         * @param {Event} originalEvent The original event. Should be optional of course, but currently is not, due
         * to the jsPlumb use case that caused this method to be added.
         * @param {Object} [payload] Optional object to set as `payload` on the generated event; useful for message passing.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.trigger = function (el, event, originalEvent, payload) {
            // MouseEvent undefined in old IE; that's how we know it's a mouse event.  A fine Microsoft paradox.
            var originalIsMouse = isMouseDevice && (typeof MouseEvent === "undefined" || originalEvent == null || originalEvent.constructor === MouseEvent);

            var eventToBind = (isTouchDevice && !isMouseDevice && touchMap[event]) ? touchMap[event] : event,
                bindingAMouseEvent = !(isTouchDevice && !isMouseDevice && touchMap[event]);

            var pl = _pageLocation(originalEvent), sl = _screenLocation(originalEvent), cl = _clientLocation(originalEvent);
            _each(el, function () {
                var _el = _gel(this), evt;
                originalEvent = originalEvent || {
                    screenX: sl[0],
                    screenY: sl[1],
                    clientX: cl[0],
                    clientY: cl[1]
                };

                var _decorate = function (_evt) {
                    if (payload) _evt.payload = payload;
                };

                var eventGenerators = {
                    "TouchEvent": function (evt) {

                        var touchList = _touchAndList(window, _el, 0, pl[0], pl[1], sl[0], sl[1], cl[0], cl[1]),
                            init = evt.initTouchEvent || evt.initEvent;

                        init(eventToBind, true, true, window, null, sl[0], sl[1],
                            cl[0], cl[1], false, false, false, false,
                            touchList, touchList, touchList, 1, 0);
                    },
                    "MouseEvents": function (evt) {
                        evt.initMouseEvent(eventToBind, true, true, window, 0,
                            sl[0], sl[1],
                            cl[0], cl[1],
                            false, false, false, false, 1, _el);
                    }
                };

                if (document.createEvent) {

                    var ite = !bindingAMouseEvent && !originalIsMouse && (isTouchDevice && touchMap[event]),
                        evtName = ite ? "TouchEvent" : "MouseEvents";

                    evt = document.createEvent(evtName);
                    eventGenerators[evtName](evt);
                    _decorate(evt);
                    _el.dispatchEvent(evt);
                }
                else if (document.createEventObject) {
                    evt = document.createEventObject();
                    evt.eventType = evt.eventName = eventToBind;
                    evt.screenX = sl[0];
                    evt.screenY = sl[1];
                    evt.clientX = cl[0];
                    evt.clientY = cl[1];
                    _decorate(evt);
                    _el.fireEvent('on' + eventToBind, evt);
                }
            });
            return this;
        };
    };

    /**
     * Static method to assist in 'consuming' an element: uses `stopPropagation` where available, or sets
     * `e.returnValue=false` where it is not.
     * @method Mottle.consume
     * @param {Event} e Event to consume
     * @param {Boolean} [doNotPreventDefault=false] If true, does not call `preventDefault()` on the event.
     */
    root.Mottle.consume = function (e, doNotPreventDefault) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.returnValue = false;

        if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
    };

    /**
     * Gets the page location corresponding to the given event. For touch events this means get the page location of the first touch.
     * @method Mottle.pageLocation
     * @param {Event} e Event to get page location for.
     * @return {Number[]} [left, top] for the given event.
     */
    root.Mottle.pageLocation = _pageLocation;

    /**
     * Forces touch events to be turned "on". Useful for testing: even if you don't have a touch device, you can still
     * trigger a touch event when this is switched on and it will be captured and acted on.
     * @method setForceTouchEvents
     * @param {Boolean} value If true, force touch events to be on.
     */
    root.Mottle.setForceTouchEvents = function (value) {
        isTouchDevice = value;
    };

    /**
     * Forces mouse events to be turned "on". Useful for testing: even if you don't have a mouse, you can still
     * trigger a mouse event when this is switched on and it will be captured and acted on.
     * @method setForceMouseEvents
     * @param {Boolean} value If true, force mouse events to be on.
     */
    root.Mottle.setForceMouseEvents = function (value) {
        isMouseDevice = value;
    };

    root.Mottle.version = "0.8.0";

    {
        exports.Mottle = root.Mottle;
    }

}).call(typeof window === "undefined" ? commonjsGlobal : window);
(function() {
    var root = this;

    var _suggest = function(list, item, head) {
        if (list.indexOf(item) === -1) {
            head ? list.unshift(item) : list.push(item);
            return true;
        }
        return false;
    };

    var _vanquish = function(list, item) {
        var idx = list.indexOf(item);
        if (idx !== -1) list.splice(idx, 1);
    };

    var _difference = function(l1, l2) {
        var d = [];
        for (var i = 0; i < l1.length; i++) {
            if (l2.indexOf(l1[i]) === -1)
                d.push(l1[i]);
        }
        return d;
    };

    var _isString = function(f) {
        return f == null ? false : (typeof f === "string" || f.constructor === String);
    };

    var getOffsetRect = function (elem) {
        // (1)
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
        // (2)
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        // (3)
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
        // (4)
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    };

    var matchesSelector = function(el, selector, ctx) {
        ctx = ctx || el.parentNode;
        var possibles = ctx.querySelectorAll(selector);
        for (var i = 0; i < possibles.length; i++) {
            if (possibles[i] === el)
                return true;
        }
        return false;
    };

    var findDelegateElement = function(parentElement, childElement, selector) {
        if (matchesSelector(childElement, selector, parentElement)) {
            return childElement;
        } else {
            var currentParent = childElement.parentNode;
            while (currentParent != null && currentParent !== parentElement) {
                if (matchesSelector(currentParent, selector, parentElement)) {
                    return currentParent;
                } else {
                    currentParent = currentParent.parentNode;
                }
            }
        }
    };

    /**
     * Finds all elements matching the given selector, for the given parent. In order to support "scoped root" selectors,
     * ie. things like "> .someClass", that is .someClass elements that are direct children of `parentElement`, we have to
     * jump through a small hoop here: when a delegate draggable is registered, we write a `katavorio-draggable` attribute
     * on the element on which the draggable is registered. Then when this method runs, we grab the value of that attribute and
     * prepend it as part of the selector we're looking for.  So "> .someClass" ends up being written as
     * "[katavorio-draggable='...' > .someClass]", which works with querySelectorAll.
     *
     * @param availableSelectors
     * @param parentElement
     * @param childElement
     * @returns {*}
     */
    var findMatchingSelector = function(availableSelectors, parentElement, childElement) {
        var el = null;
        var draggableId = parentElement.getAttribute("katavorio-draggable"),
            prefix = draggableId != null ? "[katavorio-draggable='" + draggableId + "'] " : "";

        for (var i = 0; i < availableSelectors.length; i++) {
            el = findDelegateElement(parentElement, childElement, prefix + availableSelectors[i].selector);
            if (el != null) {
                if (availableSelectors[i].filter) {
                    var matches = matchesSelector(childElement, availableSelectors[i].filter, el),
                        exclude = availableSelectors[i].filterExclude === true;

                    if ( (exclude && !matches) || matches) {
                        return null;
                    }

                }
                return [ availableSelectors[i], el ];
            }
        }
        return null;
    };

    var iev = (function() {
            var rv = -1;
            if (navigator.appName === 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        DEFAULT_GRID_X = 10,
        DEFAULT_GRID_Y = 10,
        isIELT9 = iev > -1 && iev < 9,
        isIE9 = iev === 9,
        _pl = function(e) {
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                var ts = _touches(e), t = _getTouch(ts, 0);
                // for IE9 pageX might be null if the event was synthesized. We try for pageX/pageY first,
                // falling back to clientX/clientY if necessary. In every other browser we want to use pageX/pageY.
                return isIE9 ? [t.pageX || t.clientX, t.pageY || t.clientY] : [t.pageX, t.pageY];
            }
        },
        _getTouch = function(touches, idx) { return touches.item ? touches.item(idx) : touches[idx]; },
        _touches = function(e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _classes = {
            delegatedDraggable:"katavorio-delegated-draggable",  // elements that are the delegated drag handler for a bunch of other elements
            draggable:"katavorio-draggable",    // draggable elements
            droppable:"katavorio-droppable",    // droppable elements
            drag : "katavorio-drag",            // elements currently being dragged
            selected:"katavorio-drag-selected", // elements in current drag selection
            active : "katavorio-drag-active",   // droppables that are targets of a currently dragged element
            hover : "katavorio-drag-hover",     // droppables over which a matching drag element is hovering
            noSelect : "katavorio-drag-no-select", // added to the body to provide a hook to suppress text selection
            ghostProxy:"katavorio-ghost-proxy",  // added to a ghost proxy element in use when a drag has exited the bounds of its parent.
            clonedDrag:"katavorio-clone-drag"     // added to a node that is a clone of an element created at the start of a drag
        },
        _defaultScope = "katavorio-drag-scope",
        _events = [ "stop", "start", "drag", "drop", "over", "out", "beforeStart" ],
        _devNull = function() {},
        _true = function() { return true; },
        _foreach = function(l, fn, from) {
            for (var i = 0; i < l.length; i++) {
                if (l[i] != from)
                    fn(l[i]);
            }
        },
        _setDroppablesActive = function(dd, val, andHover, drag) {
            _foreach(dd, function(e) {
                e.setActive(val);
                if (val) e.updatePosition();
                if (andHover) e.setHover(drag, val);
            });
        },
        _each = function(obj, fn) {
            if (obj == null) return;
            obj = !_isString(obj) && (obj.tagName == null && obj.length != null) ? obj : [ obj ];
            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i], [ obj[i] ]);
        },
        _consume = function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        },
        _defaultInputFilterSelector = "input,textarea,select,button,option",
    //
    // filters out events on all input elements, like textarea, checkbox, input, select.
        _inputFilter = function(e, el, _katavorio) {
            var t = e.srcElement || e.target;
            return !matchesSelector(t, _katavorio.getInputFilterSelector(), el);
        };

    var Super = function(el, params, css, scope) {
        this.params = params || {};
        this.el = el;
        this.params.addClass(this.el, this._class);
        this.uuid = _uuid();
        var enabled = true;
        this.setEnabled = function(e) { enabled = e; };
        this.isEnabled = function() { return enabled; };
        this.toggleEnabled = function() { enabled = !enabled; };
        this.setScope = function(scopes) {
            this.scopes = scopes ? scopes.split(/\s+/) : [ scope ];
        };
        this.addScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { m[s] = true;});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.removeScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { delete m[s];});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.toggleScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) {
                if (m[s]) delete m[s];
                else m[s] = true;
            });
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.setScope(params.scope);
        this.k = params.katavorio;
        return params.katavorio;
    };

    var TRUE = function() { return true; };
    var FALSE = function() { return false; };

    var Drag = function(el, params, css, scope) {
        this._class = css.draggable;
        var k = Super.apply(this, arguments);
        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
        var downAt = [0,0], posAtDown = null, pagePosAtDown = null, pageDelta = [0,0], moving = false, initialScroll = [0,0],
            consumeStartEvent = this.params.consumeStartEvent !== false,
            dragEl = this.el,
            clone = this.params.clone;
            this.params.scroll;
            var _multipleDrop = params.multipleDrop !== false,
            isConstrained = false,
            //useGhostProxy = params.ghostProxy === true ? TRUE : params.ghostProxy && typeof params.ghostProxy === "function" ? params.ghostProxy : FALSE,
            useGhostProxy,
            ghostProxy,// = function(el) { return el.cloneNode(true); },
            elementToDrag = null,
            availableSelectors = [],
            activeSelectorParams = null, // which, if any, selector config is currently active.
            ghostProxyParent = params.ghostProxyParent,
            currentParentPosition,
            ghostParentPosition,
            ghostDx,
            ghostDy;

        if (params.ghostProxy === true) {
            useGhostProxy = TRUE;
        } else {
            if (params.ghostProxy && typeof params.ghostProxy === "function") {
                useGhostProxy = params.ghostProxy;
            } else {
                useGhostProxy = function(container, dragEl) {
                    if (activeSelectorParams && activeSelectorParams.useGhostProxy) {
                        return activeSelectorParams.useGhostProxy(container, dragEl);
                    } else {
                        return false;
                    }
                };
            }
        }

        if (params.makeGhostProxy) {
            ghostProxy = params.makeGhostProxy;
        } else {

            ghostProxy = function(el) {
                if (activeSelectorParams && activeSelectorParams.makeGhostProxy) {
                    return activeSelectorParams.makeGhostProxy(el);
                } else {
                    return el.cloneNode(true);
                }
            };

        }

        // if an initial selector was provided, push the entire set of params as a selector config.
        if (params.selector) {
            var draggableId = el.getAttribute("katavorio-draggable");
            if (draggableId == null) {
                draggableId = "" + new Date().getTime();
                el.setAttribute("katavorio-draggable", draggableId);
            }

            availableSelectors.push(params);
        }

        var snapThreshold = params.snapThreshold,
            _snap = function(pos, gridX, gridY, thresholdX, thresholdY) {
                var _dx = Math.floor(pos[0] / gridX),
                    _dxl = gridX * _dx,
                    _dxt = _dxl + gridX,
                    _x = Math.abs(pos[0] - _dxl) <= thresholdX ? _dxl : Math.abs(_dxt - pos[0]) <= thresholdX ? _dxt : pos[0];

                var _dy = Math.floor(pos[1] / gridY),
                    _dyl = gridY * _dy,
                    _dyt = _dyl + gridY,
                    _y = Math.abs(pos[1] - _dyl) <= thresholdY ? _dyl : Math.abs(_dyt - pos[1]) <= thresholdY ? _dyt : pos[1];

                return [ _x, _y];
            };

        this.posses = [];
        this.posseRoles = {};

        this.toGrid = function(pos) {
            if (this.params.grid == null) {
                return pos;
            }
            else {
                var tx = this.params.grid ? this.params.grid[0] / 2 : snapThreshold ? snapThreshold : DEFAULT_GRID_X / 2,
                    ty = this.params.grid ? this.params.grid[1] / 2 : snapThreshold ? snapThreshold : DEFAULT_GRID_Y / 2;

                return _snap(pos, this.params.grid[0], this.params.grid[1], tx, ty);
            }
        };

        this.snap = function(x, y) {
            if (dragEl == null) return;
            x = x || (this.params.grid ? this.params.grid[0] : DEFAULT_GRID_X);
            y = y || (this.params.grid ? this.params.grid[1] : DEFAULT_GRID_Y);
            var p = this.params.getPosition(dragEl),
                tx = this.params.grid ? this.params.grid[0] / 2 : snapThreshold,
                ty = this.params.grid ? this.params.grid[1] / 2 : snapThreshold,
                snapped = _snap(p, x, y, tx, ty);

            this.params.setPosition(dragEl, snapped);
            return snapped;
        };

        this.setUseGhostProxy = function(val) {
            useGhostProxy = val ? TRUE : FALSE;
        };

        var constrain;
        var negativeFilter = function(pos) {
            return (params.allowNegative === false) ? [ Math.max (0, pos[0]), Math.max(0, pos[1]) ] : pos;
        };

        var _setConstrain = function(value) {
            constrain = typeof value === "function" ? value : value ? function(pos, dragEl, _constrainRect, _size) {
                return negativeFilter([
                    Math.max(0, Math.min(_constrainRect.w - _size[0], pos[0])),
                    Math.max(0, Math.min(_constrainRect.h - _size[1], pos[1]))
                ]);
            }.bind(this) : function(pos) { return negativeFilter(pos); };
        }.bind(this);

        _setConstrain(typeof this.params.constrain === "function" ? this.params.constrain  : (this.params.constrain || this.params.containment));


        /**
         * Sets whether or not the Drag is constrained. A value of 'true' means constrain to parent bounds; a function
         * will be executed and returns true if the position is allowed.
         * @param value
         */
        this.setConstrain = function(value) {
            _setConstrain(value);
        };

        /* private */ var _doConstrain = function(pos, dragEl, _constrainRect, _size) {
            if (activeSelectorParams != null && activeSelectorParams.constrain && typeof activeSelectorParams.constrain === "function") {
                return activeSelectorParams.constrain(pos, dragEl, _constrainRect, _size);
            } else {
                return constrain(pos, dragEl, _constrainRect, _size);
            }
        };

        var revertFunction;
        /**
         * Sets a function to call on drag stop, which, if it returns true, indicates that the given element should
         * revert to its position before the previous drag.
         * @param fn
         */
        this.setRevert = function(fn) {
            revertFunction = fn;
        };

        if (this.params.revert) {
            revertFunction = this.params.revert;
        }

        var _assignId = function(obj) {
                if (typeof obj === "function") {
                    obj._katavorioId = _uuid();
                    return obj._katavorioId;
                } else {
                    return obj;
                }
            },
        // a map of { spec -> [ fn, exclusion ] } entries.
            _filters = {},
            _testFilter = function(e) {
                for (var key in _filters) {
                    var f = _filters[key];
                    var rv = f[0](e);
                    if (f[1]) rv = !rv;
                    if (!rv) return false;
                }
                return true;
            },
            _setFilter = this.setFilter = function(f, _exclude) {
                if (f) {
                    var key = _assignId(f);
                    _filters[key] = [
                        function(e) {
                            var t = e.srcElement || e.target, m;
                            if (_isString(f)) {
                                m = matchesSelector(t, f, el);
                            }
                            else if (typeof f === "function") {
                                m = f(e, el);
                            }
                            return m;
                        },
                            _exclude !== false
                    ];

                }
            };
            this.addFilter = _setFilter;
            this.removeFilter = function(f) {
                var key = typeof f === "function" ? f._katavorioId : f;
                delete _filters[key];
            };

        this.clearAllFilters = function() {
            _filters = {};
        };

        this.canDrag = this.params.canDrag || _true;

        var constrainRect,
            matchingDroppables = [],
            intersectingDroppables = [];

        this.addSelector = function(params) {
            if (params.selector) {
                availableSelectors.push(params);
            }
        };

        this.downListener = function(e) {
            if (e.defaultPrevented) { return; }
            var isNotRightClick = this.rightButtonCanDrag || (e.which !== 3 && e.button !== 2);
            if (isNotRightClick && this.isEnabled() && this.canDrag()) {

                var _f =  _testFilter(e) && _inputFilter(e, this.el, this.k);
                if (_f) {

                    activeSelectorParams = null;
                    elementToDrag = null;

                    // if (selector) {
                    //     elementToDrag = findDelegateElement(this.el, e.target || e.srcElement, selector);
                    //     if(elementToDrag == null) {
                    //         return;
                    //     }
                    // }
                    if (availableSelectors.length > 0) {
                        var match = findMatchingSelector(availableSelectors, this.el, e.target || e.srcElement);
                        if (match != null) {
                            activeSelectorParams = match[0];
                            elementToDrag = match[1];
                        }
                        // elementToDrag = findDelegateElement(this.el, e.target || e.srcElement, selector);
                        if(elementToDrag == null) {
                            return;
                        }
                    }
                    else {
                        elementToDrag = this.el;
                    }

                    if (clone) {
                        dragEl = elementToDrag.cloneNode(true);
                        this.params.addClass(dragEl, _classes.clonedDrag);

                        dragEl.setAttribute("id", null);
                        dragEl.style.position = "absolute";

                        if (this.params.parent != null) {
                            var p = this.params.getPosition(this.el);
                            dragEl.style.left = p[0] + "px";
                            dragEl.style.top = p[1] + "px";
                            this.params.parent.appendChild(dragEl);
                        } else {
                            // the clone node is added to the body; getOffsetRect gives us a value
                            // relative to the body.
                            var b = getOffsetRect(elementToDrag);
                            dragEl.style.left = b.left + "px";
                            dragEl.style.top = b.top + "px";

                            document.body.appendChild(dragEl);
                        }

                    } else {
                        dragEl = elementToDrag;
                    }

                    consumeStartEvent && _consume(e);
                    downAt = _pl(e);
                    if (dragEl && dragEl.parentNode)
                    {
                        initialScroll = [dragEl.parentNode.scrollLeft, dragEl.parentNode.scrollTop];
                    }
                    //
                    this.params.bind(document, "mousemove", this.moveListener);
                    this.params.bind(document, "mouseup", this.upListener);
                    k.markSelection(this);
                    k.markPosses(this);
                    this.params.addClass(document.body, css.noSelect);
                    _dispatch("beforeStart", {el:this.el, pos:posAtDown, e:e, drag:this});
                }
                else if (this.params.consumeFilteredEvents) {
                    _consume(e);
                }
            }
        }.bind(this);

        this.moveListener = function(e) {
            if (downAt) {
                if (!moving) {
                    var _continue = _dispatch("start", {el:this.el, pos:posAtDown, e:e, drag:this});
                    if (_continue !== false) {
                        if (!downAt) {
                            return;
                        }
                        this.mark(true);
                        moving = true;
                    } else {
                        this.abort();
                    }
                }

                // it is possible that the start event caused the drag to be aborted. So we check
                // again that we are currently dragging.
                if (downAt) {
                    intersectingDroppables.length = 0;
                    var pos = _pl(e), dx = pos[0] - downAt[0], dy = pos[1] - downAt[1],
                        z = this.params.ignoreZoom ? 1 : k.getZoom();
                    if (dragEl && dragEl.parentNode)
                    {
                        dx += dragEl.parentNode.scrollLeft - initialScroll[0];
                        dy += dragEl.parentNode.scrollTop - initialScroll[1];
                    }
                    dx /= z;
                    dy /= z;
                    this.moveBy(dx, dy, e);
                    k.updateSelection(dx, dy, this);
                    k.updatePosses(dx, dy, this);
                }
            }
        }.bind(this);

        this.upListener = function(e) {
            if (downAt) {
                downAt = null;
                this.params.unbind(document, "mousemove", this.moveListener);
                this.params.unbind(document, "mouseup", this.upListener);
                this.params.removeClass(document.body, css.noSelect);
                this.unmark(e);
                k.unmarkSelection(this, e);
                k.unmarkPosses(this, e);
                this.stop(e);

                k.notifyPosseDragStop(this, e);
                moving = false;
                intersectingDroppables.length = 0;

                if (clone) {
                    dragEl && dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
                    dragEl = null;
                } else {
                    if (revertFunction && revertFunction(dragEl, this.params.getPosition(dragEl)) === true) {
                        this.params.setPosition(dragEl, posAtDown);
                        _dispatch("revert", dragEl);
                    }
                }

            }
        }.bind(this);

        this.getFilters = function() { return _filters; };

        this.abort = function() {
            if (downAt != null) {
                this.upListener();
            }
        };

        /**
         * Returns the element that was last dragged. This may be some original element from the DOM, or if `clone` is
         * set, then its actually a copy of some original DOM element. In some client calls to this method, it is the
         * actual element that was dragged that is desired. In others, it is the original DOM element that the user
         * wishes to get - in which case, pass true for `retrieveOriginalElement`.
         *
         * @returns {*}
         */
        this.getDragElement = function(retrieveOriginalElement) {
            return retrieveOriginalElement ? elementToDrag || this.el : dragEl || this.el;
        };

        var listeners = {"start":[], "drag":[], "stop":[], "over":[], "out":[], "beforeStart":[], "revert":[] };
        if (params.events.start) listeners.start.push(params.events.start);
        if (params.events.beforeStart) listeners.beforeStart.push(params.events.beforeStart);
        if (params.events.stop) listeners.stop.push(params.events.stop);
        if (params.events.drag) listeners.drag.push(params.events.drag);
        if (params.events.revert) listeners.revert.push(params.events.revert);

        this.on = function(evt, fn) {
            if (listeners[evt]) listeners[evt].push(fn);
        };

        this.off = function(evt, fn) {
            if (listeners[evt]) {
                var l = [];
                for (var i = 0; i < listeners[evt].length; i++) {
                    if (listeners[evt][i] !== fn) l.push(listeners[evt][i]);
                }
                listeners[evt] = l;
            }
        };

        var _dispatch = function(evt, value) {
            var result = null;
            if (activeSelectorParams && activeSelectorParams[evt]) {
                result = activeSelectorParams[evt](value);
            } else if (listeners[evt]) {
                for (var i = 0; i < listeners[evt].length; i++) {
                    try {
                        var v = listeners[evt][i](value);
                        if (v != null) {
                            result = v;
                        }
                    }
                    catch (e) { }
                }
            }
            return result;
        };

        this.notifyStart = function(e) {
            _dispatch("start", {el:this.el, pos:this.params.getPosition(dragEl), e:e, drag:this});
        };

        this.stop = function(e, force) {
            if (force || moving) {
                var positions = [],
                    sel = k.getSelection(),
                    dPos = this.params.getPosition(dragEl);

                if (sel.length > 0) {
                    for (var i = 0; i < sel.length; i++) {
                        var p = this.params.getPosition(sel[i].el);
                        positions.push([ sel[i].el, { left: p[0], top: p[1] }, sel[i] ]);
                    }
                }
                else {
                    positions.push([ dragEl, {left:dPos[0], top:dPos[1]}, this ]);
                }

                _dispatch("stop", {
                    el: dragEl,
                    pos: ghostProxyOffsets || dPos,
                    finalPos:dPos,
                    e: e,
                    drag: this,
                    selection:positions
                });
            }
        };

        this.mark = function(andNotify) {
            posAtDown = this.params.getPosition(dragEl);
            pagePosAtDown = this.params.getPosition(dragEl, true);
            pageDelta = [pagePosAtDown[0] - posAtDown[0], pagePosAtDown[1] - posAtDown[1]];
            this.size = this.params.getSize(dragEl);
            matchingDroppables = k.getMatchingDroppables(this);
            _setDroppablesActive(matchingDroppables, true, false, this);
            this.params.addClass(dragEl, this.params.dragClass || css.drag);

            var cs;
            if (this.params.getConstrainingRectangle) {
                cs = this.params.getConstrainingRectangle(dragEl);
            } else {
                cs = this.params.getSize(dragEl.parentNode);
            }
            constrainRect = {w: cs[0], h: cs[1]};

            ghostDx = 0;
            ghostDy = 0;

            if (andNotify) {
                k.notifySelectionDragStart(this);
            }
        };
        var ghostProxyOffsets;
        this.unmark = function(e, doNotCheckDroppables) {
            _setDroppablesActive(matchingDroppables, false, true, this);

            if (isConstrained && useGhostProxy(elementToDrag, dragEl)) {
                ghostProxyOffsets = [dragEl.offsetLeft - ghostDx, dragEl.offsetTop - ghostDy];
                dragEl.parentNode.removeChild(dragEl);
                dragEl = elementToDrag;
            }
            else {
                ghostProxyOffsets = null;
            }

            this.params.removeClass(dragEl, this.params.dragClass || css.drag);
            matchingDroppables.length = 0;
            isConstrained = false;
            if (!doNotCheckDroppables) {
                if (intersectingDroppables.length > 0 && ghostProxyOffsets) {
                    params.setPosition(elementToDrag, ghostProxyOffsets);
                }
                intersectingDroppables.sort(_rankSort);
                for (var i = 0; i < intersectingDroppables.length; i++) {
                    var retVal = intersectingDroppables[i].drop(this, e);
                    if (retVal === true) break;
                }
            }
        };
        this.moveBy = function(dx, dy, e) {
            intersectingDroppables.length = 0;

            var desiredLoc = this.toGrid([posAtDown[0] + dx, posAtDown[1] + dy]),
                cPos = _doConstrain(desiredLoc, dragEl, constrainRect, this.size);

            // if we should use a ghost proxy...
            if (useGhostProxy(this.el, dragEl)) {
                // and the element has been dragged outside of its parent bounds
                if (desiredLoc[0] !== cPos[0] || desiredLoc[1] !== cPos[1]) {

                    // ...if ghost proxy not yet created
                    if (!isConstrained) {
                        // create it
                        var gp = ghostProxy(elementToDrag);
                        params.addClass(gp, _classes.ghostProxy);

                        if (ghostProxyParent) {
                            ghostProxyParent.appendChild(gp);
                            // find offset between drag el's parent the ghost parent
                           currentParentPosition = params.getPosition(elementToDrag.parentNode, true);
                           ghostParentPosition = params.getPosition(params.ghostProxyParent, true);
                           ghostDx = currentParentPosition[0] - ghostParentPosition[0];
                           ghostDy = currentParentPosition[1] - ghostParentPosition[1];

                        } else {
                            elementToDrag.parentNode.appendChild(gp);
                        }

                        // the ghost proxy is the drag element
                        dragEl = gp;
                        // set this flag so we dont recreate the ghost proxy
                        isConstrained = true;
                    }
                    // now the drag position can be the desired position, as the ghost proxy can support it.
                    cPos = desiredLoc;
                }
                else {
                    // if the element is not outside of its parent bounds, and ghost proxy is in place,
                    if (isConstrained) {
                        // remove the ghost proxy from the dom
                        dragEl.parentNode.removeChild(dragEl);
                        // reset the drag element to the original element
                        dragEl = elementToDrag;
                        // clear this flag.
                        isConstrained = false;
                        currentParentPosition = null;
                        ghostParentPosition = null;
                        ghostDx = 0;
                        ghostDy = 0;
                    }
                }
            }

            var rect = { x:cPos[0], y:cPos[1], w:this.size[0], h:this.size[1]},
                pageRect = { x:rect.x + pageDelta[0], y:rect.y + pageDelta[1], w:rect.w, h:rect.h},
                focusDropElement = null;

            this.params.setPosition(dragEl, [cPos[0] + ghostDx, cPos[1] + ghostDy]);

            for (var i = 0; i < matchingDroppables.length; i++) {
                var r2 = { x:matchingDroppables[i].pagePosition[0], y:matchingDroppables[i].pagePosition[1], w:matchingDroppables[i].size[0], h:matchingDroppables[i].size[1]};
                if (this.params.intersects(pageRect, r2) && (_multipleDrop || focusDropElement == null || focusDropElement === matchingDroppables[i].el) && matchingDroppables[i].canDrop(this)) {
                    if (!focusDropElement) focusDropElement = matchingDroppables[i].el;
                    intersectingDroppables.push(matchingDroppables[i]);
                    matchingDroppables[i].setHover(this, true, e);
                }
                else if (matchingDroppables[i].isHover()) {
                    matchingDroppables[i].setHover(this, false, e);
                }
            }

            _dispatch("drag", {el:this.el, pos:cPos, e:e, drag:this});

            /* test to see if the parent needs to be scrolled (future)
             if (scroll) {
             var pnsl = dragEl.parentNode.scrollLeft, pnst = dragEl.parentNode.scrollTop;
             console.log("scroll!", pnsl, pnst);
             }*/
        };
        this.destroy = function() {
            this.params.unbind(this.el, "mousedown", this.downListener);
            this.params.unbind(document, "mousemove", this.moveListener);
            this.params.unbind(document, "mouseup", this.upListener);
            this.downListener = null;
            this.upListener = null;
            this.moveListener = null;
        };

        // init:register mousedown, and perhaps set a filter
        this.params.bind(this.el, "mousedown", this.downListener);

        // if handle provided, use that.  otherwise, try to set a filter.
        // note that a `handle` selector always results in filterExclude being set to false, ie.
        // the selector defines the handle element(s).
        if (this.params.handle)
            _setFilter(this.params.handle, false);
        else
            _setFilter(this.params.filter, this.params.filterExclude);
    };

    var Drop = function(el, params, css, scope) {
        this._class = css.droppable;
        this.params = params || {};
        this.rank = params.rank || 0;
        this._activeClass = this.params.activeClass || css.active;
        this._hoverClass = this.params.hoverClass || css.hover;
        Super.apply(this, arguments);
        var hover = false;
        this.allowLoopback = this.params.allowLoopback !== false;

        this.setActive = function(val) {
            this.params[val ? "addClass" : "removeClass"](this.el, this._activeClass);
        };

        this.updatePosition = function() {
            this.position = this.params.getPosition(this.el);
            this.pagePosition = this.params.getPosition(this.el, true);
            this.size = this.params.getSize(this.el);
        };

        this.canDrop = this.params.canDrop || function(drag) {
            return true;
        };

        this.isHover = function() { return hover; };

        this.setHover = function(drag, val, e) {
            // if turning off hover but this was not the drag that caused the hover, ignore.
            if (val || this.el._katavorioDragHover == null || this.el._katavorioDragHover === drag.el._katavorio) {
                this.params[val ? "addClass" : "removeClass"](this.el, this._hoverClass);
                this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                if (hover !== val) {
                    this.params.events[val ? "over" : "out"]({el: this.el, e: e, drag: drag, drop: this});
                }
                hover = val;
            }
        };

        /**
         * A drop event. `drag` is the corresponding Drag object, which may be a Drag for some specific element, or it
         * may be a Drag on some element acting as a delegate for elements contained within it.
         * @param drag
         * @param event
         * @returns {*}
         */
        this.drop = function(drag, event) {
            return this.params.events["drop"]({ drag:drag, e:event, drop:this });
        };

        this.destroy = function() {
            this._class = null;
            this._activeClass = null;
            this._hoverClass = null;
            hover = null;
        };
    };

    var _uuid = function() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    };

    var _rankSort = function(a,b) {
        return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : 0;
    };

    var _gel = function(el) {
        if (el == null) return null;
        el = (typeof el === "string" || el.constructor === String)  ? document.getElementById(el) : el;
        if (el == null) return null;
        el._katavorio = el._katavorio || _uuid();
        return el;
    };

    root.Katavorio = function(katavorioParams) {

        var _selection = [],
            _selectionMap = {};

        this._dragsByScope = {};
        this._dropsByScope = {};
        var _zoom = 1,
            _reg = function(obj, map) {
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        map[_obj.scopes[i]] = map[_obj.scopes[i]] || [];
                        map[_obj.scopes[i]].push(_obj);
                    }
                });
            },
            _unreg = function(obj, map) {
                var c = 0;
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        if (map[_obj.scopes[i]]) {
                            var idx = katavorioParams.indexOf(map[_obj.scopes[i]], _obj);
                            if (idx !== -1) {
                                map[_obj.scopes[i]].splice(idx, 1);
                                c++;
                            }
                        }
                    }
                });

                return c > 0 ;
            };
            this.getMatchingDroppables = function(drag) {
                var dd = [], _m = {};
                for (var i = 0; i < drag.scopes.length; i++) {
                    var _dd = this._dropsByScope[drag.scopes[i]];
                    if (_dd) {
                        for (var j = 0; j < _dd.length; j++) {
                            if (_dd[j].canDrop(drag) &&  !_m[_dd[j].uuid] && (_dd[j].allowLoopback || _dd[j].el !== drag.el)) {
                                _m[_dd[j].uuid] = true;
                                dd.push(_dd[j]);
                            }
                        }
                    }
                }
                dd.sort(_rankSort);
                return dd;
            };
            var _prepareParams = function(p) {
                p = p || {};
                var _p = {
                    events:{}
                }, i;
                for (i in katavorioParams) _p[i] = katavorioParams[i];
                for (i in p) _p[i] = p[i];
                // events

                for (i = 0; i < _events.length; i++) {
                    _p.events[_events[i]] = p[_events[i]] || _devNull;
                }
                _p.katavorio = this;
                return _p;
            }.bind(this),
            _mistletoe = function(existingDrag, params) {
                for (var i = 0; i < _events.length; i++) {
                    if (params[_events[i]]) {
                        existingDrag.on(_events[i], params[_events[i]]);
                    }
                }
            }.bind(this),
            _css = {},
            overrideCss = katavorioParams.css || {},
            _scope = katavorioParams.scope || _defaultScope;

        // prepare map of css classes based on defaults frst, then optional overrides
        for (var i in _classes) _css[i] = _classes[i];
        for (var i in overrideCss) _css[i] = overrideCss[i];

        var inputFilterSelector = katavorioParams.inputFilterSelector || _defaultInputFilterSelector;
        /**
         * Gets the selector identifying which input elements to filter from drag events.
         * @method getInputFilterSelector
         * @return {String} Current input filter selector.
         */
        this.getInputFilterSelector = function() { return inputFilterSelector; };

        /**
         * Sets the selector identifying which input elements to filter from drag events.
         * @method setInputFilterSelector
         * @param {String} selector Input filter selector to set.
         * @return {Katavorio} Current instance; method may be chained.
         */
        this.setInputFilterSelector = function(selector) {
            inputFilterSelector = selector;
            return this;
        };

        /**
         * Either makes the given element draggable, or identifies it as an element inside which some identified list
         * of elements may be draggable.
         * @param el
         * @param params
         * @returns {Array}
         */
        this.draggable = function(el, params) {
            var o = [];
            _each(el, function (_el) {
                _el = _gel(_el);
                if (_el != null) {
                    if (_el._katavorioDrag == null) {
                        var p = _prepareParams(params);
                        _el._katavorioDrag = new Drag(_el, p, _css, _scope);
                        _reg(_el._katavorioDrag, this._dragsByScope);
                        o.push(_el._katavorioDrag);
                        katavorioParams.addClass(_el, p.selector ? _css.delegatedDraggable : _css.draggable);
                    }
                    else {
                        _mistletoe(_el._katavorioDrag, params);
                    }
                }
            }.bind(this));
            return o;
        };

        this.droppable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    var drop = new Drop(_el, _prepareParams(params), _css, _scope);
                    _el._katavorioDrop = _el._katavorioDrop || [];
                    _el._katavorioDrop.push(drop);
                    _reg(drop, this._dropsByScope);
                    o.push(drop);
                    katavorioParams.addClass(_el, _css.droppable);
                }
            }.bind(this));
            return o;
        };

        /**
         * @name Katavorio#select
         * @function
         * @desc Adds an element to the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to add.
         */
        this.select = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorioDrag) {
                    if (!_selectionMap[_el._katavorio]) {
                        _selection.push(_el._katavorioDrag);
                        _selectionMap[_el._katavorio] = [ _el, _selection.length - 1 ];
                        katavorioParams.addClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        /**
         * @name Katavorio#deselect
         * @function
         * @desc Removes an element from the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to remove.
         */
        this.deselect = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorio) {
                    var e = _selectionMap[_el._katavorio];
                    if (e) {
                        var _s = [];
                        for (var i = 0; i < _selection.length; i++)
                            if (_selection[i].el !== _el) _s.push(_selection[i]);
                        _selection = _s;
                        delete _selectionMap[_el._katavorio];
                        katavorioParams.removeClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        this.deselectAll = function() {
            for (var i in _selectionMap) {
                var d = _selectionMap[i];
                katavorioParams.removeClass(d[0], _css.selected);
            }

            _selection.length = 0;
            _selectionMap = {};
        };

        this.markSelection = function(drag) {
            _foreach(_selection, function(e) { e.mark(); }, drag);
        };

        this.markPosses = function(drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.mark();
                        }, drag);
                    }
                });
            }
        };

        this.unmarkSelection = function(drag, event) {
            _foreach(_selection, function(e) { e.unmark(event); }, drag);
        };

        this.unmarkPosses = function(drag, event) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.unmark(event, true);
                        }, drag);
                    }
                });
            }
        };

        this.getSelection = function() { return _selection.slice(0); };

        this.updateSelection = function(dx, dy, drag) {
            _foreach(_selection, function(e) { e.moveBy(dx, dy); }, drag);
        };

        var _posseAction = function(fn, drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (e) {
                            fn(e);
                        }, drag);
                    }
                });
            }
        };

        this.updatePosses = function(dx, dy, drag) {
            _posseAction(function(e) { e.moveBy(dx, dy); }, drag);
        };

        this.notifyPosseDragStop = function(drag, evt) {
            _posseAction(function(e) { e.stop(evt, true); }, drag);
        };

        this.notifySelectionDragStop = function(drag, evt) {
            _foreach(_selection, function(e) { e.stop(evt, true); }, drag);
        };

        this.notifySelectionDragStart = function(drag, evt) {
            _foreach(_selection, function(e) { e.notifyStart(evt);}, drag);
        };

        this.setZoom = function(z) { _zoom = z; };
        this.getZoom = function() { return _zoom; };

        // does the work of changing scopes
        var _scopeManip = function(kObj, scopes, map, fn) {
            _each(kObj, function(_kObj) {
                _unreg(_kObj, map);  // deregister existing scopes
                _kObj[fn](scopes); // set scopes
                _reg(_kObj, map); // register new ones
            });
        };

        _each([ "set", "add", "remove", "toggle"], function(v) {
            this[v + "Scope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
            this[v + "DragScope"] = function(el, scopes) {
                _scopeManip(el.constructor === Drag ? el : el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
            }.bind(this);
            this[v + "DropScope"] = function(el, scopes) {
                _scopeManip(el.constructor === Drop ? el : el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
        }.bind(this));

        this.snapToGrid = function(x, y) {
            for (var s in this._dragsByScope) {
                _foreach(this._dragsByScope[s], function(d) { d.snap(x, y); });
            }
        };

        this.getDragsForScope = function(s) { return this._dragsByScope[s]; };
        this.getDropsForScope = function(s) { return this._dropsByScope[s]; };

        var _destroy = function(el, type, map) {
            el = _gel(el);
            if (el[type]) {

                // remove from selection, if present.
                var selIdx = _selection.indexOf(el[type]);
                if (selIdx >= 0) {
                    _selection.splice(selIdx, 1);
                }

                if (_unreg(el[type], map)) {
                    _each(el[type], function(kObj) { kObj.destroy(); });
                }

                delete el[type];
            }
        };

        var _removeListener = function(el, type, evt, fn) {
            el = _gel(el);
            if (el[type]) {
                el[type].off(evt, fn);
            }
        };

        this.elementRemoved = function(el) {
            if (el["_katavorioDrag"]) {
                this.destroyDraggable(el);
            }
            if (el["_katavorioDrop"]) {
                this.destroyDroppable(el);
            }
        };

        /**
         * Either completely remove drag functionality from the given element, or remove a specific event handler. If you
         * call this method with a single argument - the element - all drag functionality is removed from it. Otherwise, if
         * you provide an event name and listener function, this function is de-registered (if found).
         * @param el Element to update
         * @param {string} [evt] Optional event name to unsubscribe
         * @param {Function} [fn] Optional function to unsubscribe
         */
        this.destroyDraggable = function(el, evt, fn) {
            if (arguments.length === 1) {
                _destroy(el, "_katavorioDrag", this._dragsByScope);
            } else {
                _removeListener(el, "_katavorioDrag", evt, fn);
            }
        };

        /**
         * Either completely remove drop functionality from the given element, or remove a specific event handler. If you
         * call this method with a single argument - the element - all drop functionality is removed from it. Otherwise, if
         * you provide an event name and listener function, this function is de-registered (if found).
         * @param el Element to update
         * @param {string} [evt] Optional event name to unsubscribe
         * @param {Function} [fn] Optional function to unsubscribe
         */
        this.destroyDroppable = function(el, evt, fn) {
            if (arguments.length === 1) {
                _destroy(el, "_katavorioDrop", this._dropsByScope);
            } else {
                _removeListener(el, "_katavorioDrop", evt, fn);
            }
        };

        this.reset = function() {
            this._dragsByScope = {};
            this._dropsByScope = {};
            _selection = [];
            _selectionMap = {};
            _posses = {};
        };

        // ----- groups
        var _posses = {};

        var _processOneSpec = function(el, _spec, dontAddExisting) {
            var posseId = _isString(_spec) ? _spec : _spec.id;
            var active = _isString(_spec) ? true : _spec.active !== false;
            var posse = _posses[posseId] || (function() {
                var g = {name:posseId, members:[]};
                _posses[posseId] = g;
                return g;
            })();
            _each(el, function(_el) {
                if (_el._katavorioDrag) {

                    if (dontAddExisting && _el._katavorioDrag.posseRoles[posse.name] != null) return;

                    _suggest(posse.members, _el._katavorioDrag);
                    _suggest(_el._katavorioDrag.posses, posse.name);
                    _el._katavorioDrag.posseRoles[posse.name] = active;
                }
            });
            return posse;
        };

        /**
         * Add the given element to the posse with the given id, creating the group if it at first does not exist.
         * @method addToPosse
         * @param {Element} el Element to add.
         * @param {String...|Object...} spec Variable args parameters. Each argument can be a either a String, indicating
         * the ID of a Posse to which the element should be added as an active participant, or an Object containing
         * `{ id:"posseId", active:false/true}`. In the latter case, if `active` is not provided it is assumed to be
         * true.
         * @returns {Posse|Posse[]} The Posse(s) to which the element(s) was/were added.
         */
        this.addToPosse = function(el, spec) {

            var posses = [];

            for (var i = 1; i < arguments.length; i++) {
                posses.push(_processOneSpec(el, arguments[i]));
            }

            return posses.length === 1 ? posses[0] : posses;
        };

        /**
         * Sets the posse(s) for the element with the given id, creating those that do not yet exist, and removing from
         * the element any current Posses that are not specified by this method call. This method will not change the
         * active/passive state if it is given a posse in which the element is already a member.
         * @method setPosse
         * @param {Element} el Element to set posse(s) on.
         * @param {String...|Object...} spec Variable args parameters. Each argument can be a either a String, indicating
         * the ID of a Posse to which the element should be added as an active participant, or an Object containing
         * `{ id:"posseId", active:false/true}`. In the latter case, if `active` is not provided it is assumed to be
         * true.
         * @returns {Posse|Posse[]} The Posse(s) to which the element(s) now belongs.
         */
        this.setPosse = function(el, spec) {

            var posses = [];

            for (var i = 1; i < arguments.length; i++) {
                posses.push(_processOneSpec(el, arguments[i], true).name);
            }

            _each(el, function(_el) {
                if (_el._katavorioDrag) {
                    var diff = _difference(_el._katavorioDrag.posses, posses);
                    var p = [];
                    Array.prototype.push.apply(p, _el._katavorioDrag.posses);
                    for (var i = 0; i < diff.length; i++) {
                        this.removeFromPosse(_el, diff[i]);
                    }
                }
            }.bind(this));

            return posses.length === 1 ? posses[0] : posses;
        };

        /**
         * Remove the given element from the given posse(s).
         * @method removeFromPosse
         * @param {Element} el Element to remove.
         * @param {String...} posseId Varargs parameter: one value for each posse to remove the element from.
         */
        this.removeFromPosse = function(el, posseId) {
            if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");
            for(var i = 1; i < arguments.length; i++) {
                posseId = arguments[i];
                _each(el, function (_el) {
                    if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                        var d = _el._katavorioDrag;
                        _each(posseId, function (p) {
                            _vanquish(_posses[p].members, d);
                            _vanquish(d.posses, p);
                            delete d.posseRoles[p];
                        });
                    }
                });
            }
        };

        /**
         * Remove the given element from all Posses to which it belongs.
         * @method removeFromAllPosses
         * @param {Element|Element[]} el Element to remove from Posses.
         */
        this.removeFromAllPosses = function(el) {
            _each(el, function(_el) {
                if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                    var d = _el._katavorioDrag;
                    _each(d.posses, function(p) {
                        _vanquish(_posses[p].members, d);
                    });
                    d.posses.length = 0;
                    d.posseRoles = {};
                }
            });
        };

        /**
         * Changes the participation state for the element in the Posse with the given ID.
         * @param {Element|Element[]} el Element(s) to change state for.
         * @param {String} posseId ID of the Posse to change element state for.
         * @param {Boolean} state True to make active, false to make passive.
         */
        this.setPosseState = function(el, posseId, state) {
            var posse = _posses[posseId];
            if (posse) {
                _each(el, function(_el) {
                    if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                        _el._katavorioDrag.posseRoles[posse.name] = state;
                    }
                });
            }
        };

    };

    root.Katavorio.version = "1.0.0";

    {
        exports.Katavorio = root.Katavorio;
    }

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);


(function() {

    var root = this;
    root.jsPlumbUtil = root.jsPlumbUtil || {};
    var jsPlumbUtil = root.jsPlumbUtil;

    { exports.jsPlumbUtil = jsPlumbUtil;}


    /**
     * Tests if the given object is an Array.
     * @param a
     */
    function isArray(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    }
    jsPlumbUtil.isArray = isArray;
    /**
     * Tests if the given object is a Number.
     * @param n
     */
    function isNumber(n) {
        return Object.prototype.toString.call(n) === "[object Number]";
    }
    jsPlumbUtil.isNumber = isNumber;
    function isString(s) {
        return typeof s === "string";
    }
    jsPlumbUtil.isString = isString;
    function isBoolean(s) {
        return typeof s === "boolean";
    }
    jsPlumbUtil.isBoolean = isBoolean;
    function isNull(s) {
        return s == null;
    }
    jsPlumbUtil.isNull = isNull;
    function isObject(o) {
        return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
    }
    jsPlumbUtil.isObject = isObject;
    function isDate(o) {
        return Object.prototype.toString.call(o) === "[object Date]";
    }
    jsPlumbUtil.isDate = isDate;
    function isFunction(o) {
        return Object.prototype.toString.call(o) === "[object Function]";
    }
    jsPlumbUtil.isFunction = isFunction;
    function isNamedFunction(o) {
        return isFunction(o) && o.name != null && o.name.length > 0;
    }
    jsPlumbUtil.isNamedFunction = isNamedFunction;
    function isEmpty(o) {
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }
    jsPlumbUtil.isEmpty = isEmpty;
    function clone(a) {
        if (isString(a)) {
            return "" + a;
        }
        else if (isBoolean(a)) {
            return !!a;
        }
        else if (isDate(a)) {
            return new Date(a.getTime());
        }
        else if (isFunction(a)) {
            return a;
        }
        else if (isArray(a)) {
            var b = [];
            for (var i = 0; i < a.length; i++) {
                b.push(clone(a[i]));
            }
            return b;
        }
        else if (isObject(a)) {
            var c = {};
            for (var j in a) {
                c[j] = clone(a[j]);
            }
            return c;
        }
        else {
            return a;
        }
    }
    jsPlumbUtil.clone = clone;
    function merge(a, b, collations, overwrites) {
        // first change the collations array - if present - into a lookup table, because its faster.
        var cMap = {}, ar, i, oMap = {};
        collations = collations || [];
        overwrites = overwrites || [];
        for (i = 0; i < collations.length; i++) {
            cMap[collations[i]] = true;
        }
        for (i = 0; i < overwrites.length; i++) {
            oMap[overwrites[i]] = true;
        }
        var c = clone(a);
        for (i in b) {
            if (c[i] == null || oMap[i]) {
                c[i] = b[i];
            }
            else if (isString(b[i]) || isBoolean(b[i])) {
                if (!cMap[i]) {
                    c[i] = b[i]; // if we dont want to collate, just copy it in.
                }
                else {
                    ar = [];
                    // if c's object is also an array we can keep its values.
                    ar.push.apply(ar, isArray(c[i]) ? c[i] : [c[i]]);
                    ar.push.apply(ar, isBoolean(b[i]) ? b[i] : [b[i]]);
                    c[i] = ar;
                }
            }
            else {
                if (isArray(b[i])) {
                    ar = [];
                    // if c's object is also an array we can keep its values.
                    if (isArray(c[i])) {
                        ar.push.apply(ar, c[i]);
                    }
                    ar.push.apply(ar, b[i]);
                    c[i] = ar;
                }
                else if (isObject(b[i])) {
                    // overwrite c's value with an object if it is not already one.
                    if (!isObject(c[i])) {
                        c[i] = {};
                    }
                    for (var j in b[i]) {
                        c[i][j] = b[i][j];
                    }
                }
            }
        }
        return c;
    }
    jsPlumbUtil.merge = merge;
    function replace(inObj, path, value) {
        if (inObj == null) {
            return;
        }
        var q = inObj, t = q;
        path.replace(/([^\.])+/g, function (term, lc, pos, str) {
            var array = term.match(/([^\[0-9]+){1}(\[)([0-9+])/), last = pos + term.length >= str.length, _getArray = function () {
                return t[array[1]] || (function () {
                    t[array[1]] = [];
                    return t[array[1]];
                })();
            };
            if (last) {
                // set term = value on current t, creating term as array if necessary.
                if (array) {
                    _getArray()[array[3]] = value;
                }
                else {
                    t[term] = value;
                }
            }
            else {
                // set to current t[term], creating t[term] if necessary.
                if (array) {
                    var a_1 = _getArray();
                    t = a_1[array[3]] || (function () {
                        a_1[array[3]] = {};
                        return a_1[array[3]];
                    })();
                }
                else {
                    t = t[term] || (function () {
                        t[term] = {};
                        return t[term];
                    })();
                }
            }
            return "";
        });
        return inObj;
    }
    jsPlumbUtil.replace = replace;
    //
    // chain a list of functions, supplied by [ object, method name, args ], and return on the first
    // one that returns the failValue. if none return the failValue, return the successValue.
    //
    function functionChain(successValue, failValue, fns) {
        for (var i = 0; i < fns.length; i++) {
            var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
            if (o === failValue) {
                return o;
            }
        }
        return successValue;
    }
    jsPlumbUtil.functionChain = functionChain;
    /**
     *
     * Take the given model and expand out any parameters. 'functionPrefix' is optional, and if present, helps jsplumb figure out what to do if a value is a Function.
     * if you do not provide it (and doNotExpandFunctions is null, or false), jsplumb will run the given values through any functions it finds, and use the function's
     * output as the value in the result. if you do provide the prefix, only functions that are named and have this prefix
     * will be executed; other functions will be passed as values to the output.
     *
     * @param model
     * @param values
     * @param functionPrefix
     * @param doNotExpandFunctions
     * @returns {any}
     */
    function populate(model, values, functionPrefix, doNotExpandFunctions) {
        // for a string, see if it has parameter matches, and if so, try to make the substitutions.
        var getValue = function (fromString) {
            var matches = fromString.match(/(\${.*?})/g);
            if (matches != null) {
                for (var i = 0; i < matches.length; i++) {
                    var val = values[matches[i].substring(2, matches[i].length - 1)] || "";
                    if (val != null) {
                        fromString = fromString.replace(matches[i], val);
                    }
                }
            }
            return fromString;
        };
        // process one entry.
        var _one = function (d) {
            if (d != null) {
                if (isString(d)) {
                    return getValue(d);
                }
                else if (isFunction(d) && !doNotExpandFunctions && (functionPrefix == null || (d.name || "").indexOf(functionPrefix) === 0)) {
                    return d(values);
                }
                else if (isArray(d)) {
                    var r = [];
                    for (var i = 0; i < d.length; i++) {
                        r.push(_one(d[i]));
                    }
                    return r;
                }
                else if (isObject(d)) {
                    var s = {};
                    for (var j in d) {
                        s[j] = _one(d[j]);
                    }
                    return s;
                }
                else {
                    return d;
                }
            }
        };
        return _one(model);
    }
    jsPlumbUtil.populate = populate;
    /**
     * Find the index of a given object in an array.
     * @param a The array to search
     * @param f The function to run on each element. Return true if the element matches.
     * @returns {number} -1 if not found, otherwise the index in the array.
     */
    function findWithFunction(a, f) {
        if (a) {
            for (var i = 0; i < a.length; i++) {
                if (f(a[i])) {
                    return i;
                }
            }
        }
        return -1;
    }
    jsPlumbUtil.findWithFunction = findWithFunction;
    /**
     * Remove some element from an array by matching each element in the array against some predicate function. Note that this
     * is an in-place removal; the array is altered.
     * @param a The array to search
     * @param f The function to run on each element. Return true if the element matches.
     * @returns {boolean} true if removed, false otherwise.
     */
    function removeWithFunction(a, f) {
        var idx = findWithFunction(a, f);
        if (idx > -1) {
            a.splice(idx, 1);
        }
        return idx !== -1;
    }
    jsPlumbUtil.removeWithFunction = removeWithFunction;
    /**
     * Remove some element from an array by simple lookup in the array for the given element. Note that this
     * is an in-place removal; the array is altered.
     * @param l The array to search
     * @param v The value to remove.
     * @returns {boolean} true if removed, false otherwise.
     */
    function remove(l, v) {
        var idx = l.indexOf(v);
        if (idx > -1) {
            l.splice(idx, 1);
        }
        return idx !== -1;
    }
    jsPlumbUtil.remove = remove;
    /**
     * Add some element to the given array, unless it is determined that it is already in the array.
     * @param list The array to add the element to.
     * @param item The item to add.
     * @param hashFunction A function to use to determine if the given item already exists in the array.
     */
    function addWithFunction(list, item, hashFunction) {
        if (findWithFunction(list, hashFunction) === -1) {
            list.push(item);
        }
    }
    jsPlumbUtil.addWithFunction = addWithFunction;
    /**
     * Add some element to a list that is contained in a map of lists.
     * @param map The map of [ key -> list ] entries
     * @param key The name of the list to insert into
     * @param value The value to insert
     * @param insertAtStart Whether or not to insert at the start; defaults to false.
     */
    function addToList(map, key, value, insertAtStart) {
        var l = map[key];
        if (l == null) {
            l = [];
            map[key] = l;
        }
        l[insertAtStart ? "unshift" : "push"](value);
        return l;
    }
    jsPlumbUtil.addToList = addToList;
    /**
     * Add an item to a list, unless it is already in the list. The test for pre-existence is a simple list lookup.
     * If you want to do something more complex, perhaps #addWithFunction might help.
     * @param list List to add the item to
     * @param item Item to add
     * @param insertAtHead Whether or not to insert at the start; defaults to false.
     */
    function suggest(list, item, insertAtHead) {
        if (list.indexOf(item) === -1) {
            if (insertAtHead) {
                list.unshift(item);
            }
            else {
                list.push(item);
            }
            return true;
        }
        return false;
    }
    jsPlumbUtil.suggest = suggest;
    /**
     * Extends the given obj (which can be an array) with the given constructor function, prototype functions, and class members, any of which may be null.
     * @param child
     * @param parent
     * @param _protoFn
     */
    function extend(child, parent, _protoFn) {
        var i;
        parent = isArray(parent) ? parent : [parent];
        var _copyProtoChain = function (focus) {
            var proto = focus.__proto__;
            while (proto != null) {
                if (proto.prototype != null) {
                    for (var j in proto.prototype) {
                        if (proto.prototype.hasOwnProperty(j) && !child.prototype.hasOwnProperty(j)) {
                            child.prototype[j] = proto.prototype[j];
                        }
                    }
                    proto = proto.prototype.__proto__;
                }
                else {
                    proto = null;
                }
            }
        };
        for (i = 0; i < parent.length; i++) {
            for (var j in parent[i].prototype) {
                if (parent[i].prototype.hasOwnProperty(j) && !child.prototype.hasOwnProperty(j)) {
                    child.prototype[j] = parent[i].prototype[j];
                }
            }
            _copyProtoChain(parent[i]);
        }
        var _makeFn = function (name, protoFn) {
            return function () {
                for (i = 0; i < parent.length; i++) {
                    if (parent[i].prototype[name]) {
                        parent[i].prototype[name].apply(this, arguments);
                    }
                }
                return protoFn.apply(this, arguments);
            };
        };
        var _oneSet = function (fns) {
            for (var k in fns) {
                child.prototype[k] = _makeFn(k, fns[k]);
            }
        };
        if (arguments.length > 2) {
            for (i = 2; i < arguments.length; i++) {
                _oneSet(arguments[i]);
            }
        }
        return child;
    }
    jsPlumbUtil.extend = extend;
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
    }
    function uuid() {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    }
    jsPlumbUtil.uuid = uuid;
    /**
     * Trim a string.
     * @param s String to trim
     * @returns the String with leading and trailing whitespace removed.
     */
    function fastTrim(s) {
        if (s == null) {
            return null;
        }
        var str = s.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
        while (ws.test(str.charAt(--i))) {
        }
        return str.slice(0, i + 1);
    }
    jsPlumbUtil.fastTrim = fastTrim;
    function each(obj, fn) {
        obj = obj.length == null || typeof obj === "string" ? [obj] : obj;
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    jsPlumbUtil.each = each;
    function map(obj, fn) {
        var o = [];
        for (var i = 0; i < obj.length; i++) {
            o.push(fn(obj[i]));
        }
        return o;
    }
    jsPlumbUtil.map = map;
    function mergeWithParents(type, map, parentAttribute) {
        parentAttribute = parentAttribute || "parent";
        var _def = function (id) {
            return id ? map[id] : null;
        };
        var _parent = function (def) {
            return def ? _def(def[parentAttribute]) : null;
        };
        var _one = function (parent, def) {
            if (parent == null) {
                return def;
            }
            else {
                var overrides = ["anchor", "anchors", "cssClass", "connector", "paintStyle", "hoverPaintStyle", "endpoint", "endpoints"];
                if (def.mergeStrategy === "override") {
                    Array.prototype.push.apply(overrides, ["events", "overlays"]);
                }
                var d_1 = merge(parent, def, [], overrides);
                return _one(_parent(parent), d_1);
            }
        };
        var _getDef = function (t) {
            if (t == null) {
                return {};
            }
            if (typeof t === "string") {
                return _def(t);
            }
            else if (t.length) {
                var done = false, i = 0, _dd = void 0;
                while (!done && i < t.length) {
                    _dd = _getDef(t[i]);
                    if (_dd) {
                        done = true;
                    }
                    else {
                        i++;
                    }
                }
                return _dd;
            }
        };
        var d = _getDef(type);
        if (d) {
            return _one(_parent(d), d);
        }
        else {
            return {};
        }
    }
    jsPlumbUtil.mergeWithParents = mergeWithParents;
    jsPlumbUtil.logEnabled = true;
    function log() {
        if (jsPlumbUtil.logEnabled && typeof console !== "undefined") {
            try {
                var msg = arguments[arguments.length - 1];
                console.log(msg);
            }
            catch (e) {
            }
        }
    }
    jsPlumbUtil.log = log;
    /**
     * Wraps one function with another, creating a placeholder for the
     * wrapped function if it was null. this is used to wrap the various
     * drag/drop event functions - to allow jsPlumb to be notified of
     * important lifecycle events without imposing itself on the user's
     * drag/drop functionality.
     * @method jsPlumbUtil.wrap
     * @param {Function} wrappedFunction original function to wrap; may be null.
     * @param {Function} newFunction function to wrap the original with.
     * @param {Object} [returnOnThisValue] Optional. Indicates that the wrappedFunction should
     * not be executed if the newFunction returns a value matching 'returnOnThisValue'.
     * note that this is a simple comparison and only works for primitives right now.
     */
    function wrap(wrappedFunction, newFunction, returnOnThisValue) {
        return function () {
            var r = null;
            try {
                if (newFunction != null) {
                    r = newFunction.apply(this, arguments);
                }
            }
            catch (e) {
                log("jsPlumb function failed : " + e);
            }
            if ((wrappedFunction != null) && (returnOnThisValue == null || (r !== returnOnThisValue))) {
                try {
                    r = wrappedFunction.apply(this, arguments);
                }
                catch (e) {
                    log("wrapped function failed : " + e);
                }
            }
            return r;
        };
    }
    jsPlumbUtil.wrap = wrap;
    var EventGenerator = /** @class */ (function () {
        function EventGenerator() {
            var _this = this;
            this._listeners = {};
            this.eventsSuspended = false;
            this.tick = false;
            // this is a list of events that should re-throw any errors that occur during their dispatch.
            this.eventsToDieOn = { "ready": true };
            this.queue = [];
            this.bind = function (event, listener, insertAtStart) {
                var _one = function (evt) {
                    addToList(_this._listeners, evt, listener, insertAtStart);
                    listener.__jsPlumb = listener.__jsPlumb || {};
                    listener.__jsPlumb[uuid()] = evt;
                };
                if (typeof event === "string") {
                    _one(event);
                }
                else if (event.length != null) {
                    for (var i = 0; i < event.length; i++) {
                        _one(event[i]);
                    }
                }
                return _this;
            };
            this.fire = function (event, value, originalEvent) {
                if (!this.tick) {
                    this.tick = true;
                    if (!this.eventsSuspended && this._listeners[event]) {
                        var l = this._listeners[event].length, i = 0, _gone = false, ret = null;
                        if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
                            while (!_gone && i < l && ret !== false) {
                                // doing it this way rather than catching and then possibly re-throwing means that an error propagated by this
                                // method will have the whole call stack available in the debugger.
                                if (this.eventsToDieOn[event]) {
                                    this._listeners[event][i].apply(this, [value, originalEvent]);
                                }
                                else {
                                    try {
                                        ret = this._listeners[event][i].apply(this, [value, originalEvent]);
                                    }
                                    catch (e) {
                                        log("jsPlumb: fire failed for event " + event + " : " + e);
                                    }
                                }
                                i++;
                                if (this._listeners == null || this._listeners[event] == null) {
                                    _gone = true;
                                }
                            }
                        }
                    }
                    this.tick = false;
                    this._drain();
                }
                else {
                    this.queue.unshift(arguments);
                }
                return this;
            };
            this._drain = function () {
                var n = _this.queue.pop();
                if (n) {
                    _this.fire.apply(_this, n);
                }
            };
            this.unbind = function (eventOrListener, listener) {
                if (arguments.length === 0) {
                    this._listeners = {};
                }
                else if (arguments.length === 1) {
                    if (typeof eventOrListener === "string") {
                        delete this._listeners[eventOrListener];
                    }
                    else if (eventOrListener.__jsPlumb) {
                        var evt = void 0;
                        for (var i in eventOrListener.__jsPlumb) {
                            evt = eventOrListener.__jsPlumb[i];
                            remove(this._listeners[evt] || [], eventOrListener);
                        }
                    }
                }
                else if (arguments.length === 2) {
                    remove(this._listeners[eventOrListener] || [], listener);
                }
                return this;
            };
            this.getListener = function (forEvent) {
                return _this._listeners[forEvent];
            };
            this.setSuspendEvents = function (val) {
                _this.eventsSuspended = val;
            };
            this.isSuspendEvents = function () {
                return _this.eventsSuspended;
            };
            this.silently = function (fn) {
                _this.setSuspendEvents(true);
                try {
                    fn();
                }
                catch (e) {
                    log("Cannot execute silent function " + e);
                }
                _this.setSuspendEvents(false);
            };
            this.cleanupListeners = function () {
                for (var i in _this._listeners) {
                    _this._listeners[i] = null;
                }
            };
        }
        return EventGenerator;
    }());
    jsPlumbUtil.EventGenerator = EventGenerator;
    function rotatePoint(point, center, rotation) {
        var radial = [point[0] - center[0], point[1] - center[1]], cr = Math.cos(rotation / 360 * Math.PI * 2), sr = Math.sin(rotation / 360 * Math.PI * 2);
        return [
            (radial[0] * cr) - (radial[1] * sr) + center[0],
            (radial[1] * cr) + (radial[0] * sr) + center[1],
            cr,
            sr
        ];
    }
    jsPlumbUtil.rotatePoint = rotatePoint;
    function rotateAnchorOrientation(orientation, rotation) {
        var r = rotatePoint(orientation, [0, 0], rotation);
        return [
            Math.round(r[0]),
            Math.round(r[1])
        ];
    }
    jsPlumbUtil.rotateAnchorOrientation = rotateAnchorOrientation;

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function() {

   var root = this;

    root.jsPlumbUtil.matchesSelector = function(el, selector, ctx) {
       ctx = ctx || el.parentNode;
       var possibles = ctx.querySelectorAll(selector);
       for (var i = 0; i < possibles.length; i++) {
           if (possibles[i] === el) {
               return true;
           }
       }
       return false;
   };

    root.jsPlumbUtil.consume = function(e, doNotPreventDefault) {
       if (e.stopPropagation) {
           e.stopPropagation();
       }
       else {
           e.returnValue = false;
       }

       if (!doNotPreventDefault && e.preventDefault){
           e.preventDefault();
       }
   };

   /*
    * Function: sizeElement
    * Helper to size and position an element. You would typically use
    * this when writing your own Connector or Endpoint implementation.
    *
    * Parameters:
    *  x - [int] x position for the element origin
    *  y - [int] y position for the element origin
    *  w - [int] width of the element
    *  h - [int] height of the element
    *
    */
    root.jsPlumbUtil.sizeElement = function(el, x, y, w, h) {
       if (el) {
           el.style.height = h + "px";
           el.height = h;
           el.style.width = w + "px";
           el.width = w;
           el.style.left = x + "px";
           el.style.top = y + "px";
       }
   };

 }).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function() {

    var DEFAULT_OPTIONS = {
        deriveAnchor:function(edge, index, ep, conn) {
            return {
                top:["TopRight", "TopLeft"],
                bottom:["BottomRight", "BottomLeft"]
            }[edge][index];
        }
    };

    var root = this;

    var ListManager = function(jsPlumbInstance, params) {

        this.count = 0;
        this.instance = jsPlumbInstance;
        this.lists = {};
        this.options = params || {};

        this.instance.addList = function(el, options) {
            return this.listManager.addList(el, options);
        };

        this.instance.removeList = function(el) {
            this.listManager.removeList(el);
        };

        this.instance.bind("manageElement", function(p) {

            //look for [jtk-scrollable-list] elements and attach scroll listeners if necessary
            var scrollableLists = this.instance.getSelector(p.el, "[jtk-scrollable-list]");
            for (var i = 0; i < scrollableLists.length; i++) {
                this.addList(scrollableLists[i]);
            }

        }.bind(this));

        this.instance.bind("unmanageElement", function(p) {
            this.removeList(p.el);
        });


        this.instance.bind("connection", function(c, evt) {
            if (evt == null) {
                // not added by mouse. look for an ancestor of the source and/or target element that is a scrollable list, and run
                // its scroll method.
                this._maybeUpdateParentList(c.source);
                this._maybeUpdateParentList(c.target);
            }
        }.bind(this));
    };

    root.jsPlumbListManager = ListManager;

    ListManager.prototype = {

        addList : function(el, options) {
            var dp = this.instance.extend({}, DEFAULT_OPTIONS);
            this.instance.extend(dp, this.options);
            options = this.instance.extend(dp,  options || {});
            var id = [this.instance.getInstanceIndex(), this.count++].join("_");
            this.lists[id] = new List(this.instance, el, options, id);
        },

        removeList:function(el) {
            var list = this.lists[el._jsPlumbList];
            if (list) {
                list.destroy();
                delete this.lists[el._jsPlumbList];
            }
        },

        _maybeUpdateParentList:function (el) {
            var parent = el.parentNode, container = this.instance.getContainer();
            while(parent != null && parent !== container) {
                if (parent._jsPlumbList != null && this.lists[parent._jsPlumbList] != null) {
                    parent._jsPlumbScrollHandler();
                    return
                }
                parent = parent.parentNode;
            }
        }


    };

    var List = function(instance, el, options, id) {

        el["_jsPlumbList"] = id;

        //
        // Derive an anchor to use for the current situation. In contrast to the way we derive an endpoint, here we use `anchor` from the options, if present, as
        // our first choice, and then `deriveAnchor` as our next choice. There is a default `deriveAnchor` implementation that uses TopRight/TopLeft for top and
        // BottomRight/BottomLeft for bottom.
        //
        // edge - "top" or "bottom"
        // index - 0 when endpoint is connection source, 1 when endpoint is connection target
        // ep - the endpoint that is being proxied
        // conn - the connection that is being proxied
        //
        function deriveAnchor(edge, index, ep, conn) {
            return options.anchor ? options.anchor : options.deriveAnchor(edge, index, ep, conn);
        }

        //
        // Derive an endpoint to use for the current situation. We'll use a `deriveEndpoint` function passed in to the options as our first choice,
        // followed by `endpoint` (an endpoint spec) from the options, and failing either of those we just use the `type` of the endpoint that is being proxied.
        //
        // edge - "top" or "bottom"
        // index - 0 when endpoint is connection source, 1 when endpoint is connection target
        // endpoint - the endpoint that is being proxied
        // connection - the connection that is being proxied
        //
        function deriveEndpoint(edge, index, ep, conn) {
            return options.deriveEndpoint ? options.deriveEndpoint(edge, index, ep, conn) : options.endpoint ? options.endpoint : ep.type;
        }

        //
        // look for a parent of the given scrollable list that is draggable, and then update the child offsets for it. this should not
        // be necessary in the delegated drag stuff from the upcoming 3.0.0 release.
        //
        function _maybeUpdateDraggable(el) {
            var parent = el.parentNode, container = instance.getContainer();
            while(parent != null && parent !== container) {
                if (instance.hasClass(parent, "jtk-managed")) {
                    instance.recalculateOffsets(parent);
                    return
                }
                parent = parent.parentNode;
            }
        }

        var scrollHandler = function(e) {

            var children = instance.getSelector(el, ".jtk-managed");
            var elId = instance.getId(el);

            for (var i = 0; i < children.length; i++) {

                if (children[i].offsetTop < el.scrollTop) {
                    if (!children[i]._jsPlumbProxies) {
                        children[i]._jsPlumbProxies = children[i]._jsPlumbProxies || [];
                        instance.select({source: children[i]}).each(function (c) {


                            instance.proxyConnection(c, 0, el, elId, function () {
                                return deriveEndpoint("top", 0, c.endpoints[0], c);
                            }, function () {
                                return deriveAnchor("top", 0, c.endpoints[0], c);
                            });
                            children[i]._jsPlumbProxies.push([c, 0]);
                        });

                        instance.select({target: children[i]}).each(function (c) {
                            instance.proxyConnection(c, 1, el, elId, function () {
                                return deriveEndpoint("top", 1, c.endpoints[1], c);
                            }, function () {
                                return deriveAnchor("top", 1, c.endpoints[1], c);
                            });
                            children[i]._jsPlumbProxies.push([c, 1]);
                        });
                    }
                }
                //
                else if (children[i].offsetTop + children[i].offsetHeight > el.scrollTop + el.offsetHeight) {
                    if (!children[i]._jsPlumbProxies) {
                        children[i]._jsPlumbProxies = children[i]._jsPlumbProxies || [];

                        instance.select({source: children[i]}).each(function (c) {
                            instance.proxyConnection(c, 0, el, elId, function () {
                                return deriveEndpoint("bottom", 0, c.endpoints[0], c);
                            }, function () {
                                return deriveAnchor("bottom", 0, c.endpoints[0], c);
                            });
                            children[i]._jsPlumbProxies.push([c, 0]);
                        });

                        instance.select({target: children[i]}).each(function (c) {
                            instance.proxyConnection(c, 1, el, elId, function () {
                                return deriveEndpoint("bottom", 1, c.endpoints[1], c);
                            }, function () {
                                return deriveAnchor("bottom", 1, c.endpoints[1], c);
                            });
                            children[i]._jsPlumbProxies.push([c, 1]);
                        });
                    }
                } else if (children[i]._jsPlumbProxies) {
                    for (var j = 0; j < children[i]._jsPlumbProxies.length; j++) {
                        instance.unproxyConnection(children[i]._jsPlumbProxies[j][0], children[i]._jsPlumbProxies[j][1], elId);
                    }

                    delete children[i]._jsPlumbProxies;
                }

                instance.revalidate(children[i]);
            }

            _maybeUpdateDraggable(el);
        };

        instance.setAttribute(el, "jtk-scrollable-list", "true");
        el._jsPlumbScrollHandler = scrollHandler;
        instance.on(el, "scroll", scrollHandler);
        scrollHandler(); // run it once; there may be connections already.

        this.destroy = function() {
            instance.off(el, "scroll", scrollHandler);
            delete el._jsPlumbScrollHandler;

            var children = instance.getSelector(el, ".jtk-managed");
            var elId = instance.getId(el);

            for (var i = 0; i < children.length; i++) {
                if (children[i]._jsPlumbProxies) {
                    for (var j = 0; j < children[i]._jsPlumbProxies.length; j++) {
                        instance.unproxyConnection(children[i]._jsPlumbProxies[j][0], children[i]._jsPlumbProxies[j][1], elId);
                    }

                    delete children[i]._jsPlumbProxies;
                }
            }
        };
    };


}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {

    var root = this;

    var _ju = root.jsPlumbUtil,

        // helper method to update the hover style whenever it, or paintStyle, changes.
        // we use paintStyle as the foundation and merge hoverPaintStyle over the
        // top.
        _updateHoverStyle = function (component) {
            if (component._jsPlumb.paintStyle && component._jsPlumb.hoverPaintStyle) {
                var mergedHoverStyle = {};
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.paintStyle);
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.hoverPaintStyle);
                delete component._jsPlumb.hoverPaintStyle;
                // we want the fill of paintStyle to override a gradient, if possible.
                if (mergedHoverStyle.gradient && component._jsPlumb.paintStyle.fill) {
                    delete mergedHoverStyle.gradient;
                }
                component._jsPlumb.hoverPaintStyle = mergedHoverStyle;
            }
        },
        events = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu" ],
        _updateAttachedElements = function (component, state, timestamp, sourceElement) {
            var affectedElements = component.getAttachedElements();
            if (affectedElements) {
                for (var i = 0, j = affectedElements.length; i < j; i++) {
                    if (!sourceElement || sourceElement !== affectedElements[i]) {
                        affectedElements[i].setHover(state, true, timestamp);			// tell the attached elements not to inform their own attached elements.
                    }
                }
            }
        },
        _splitType = function (t) {
            return t == null ? null : t.split(" ");
        },
        _mapType = function(map, obj, typeId) {
            for (var i in obj) {
                map[i] = typeId;
            }
        },
        _applyTypes = function (component, params, doNotRepaint) {
            if (component.getDefaultType) {
                var td = component.getTypeDescriptor(), map = {};
                var defType = component.getDefaultType();
                var o = _ju.merge({}, defType);
                _mapType(map, defType, "__default");
                for (var i = 0, j = component._jsPlumb.types.length; i < j; i++) {
                    var tid = component._jsPlumb.types[i];
                    if (tid !== "__default") {
                        var _t = component._jsPlumb.instance.getType(tid, td);
                        if (_t != null) {

                            var overrides = ["anchor", "anchors", "connector", "paintStyle", "hoverPaintStyle", "endpoint", "endpoints", "connectorOverlays", "connectorStyle", "connectorHoverStyle", "endpointStyle", "endpointHoverStyle"];
                            var collations = [ ];

                            if (_t.mergeStrategy === "override") {
                                Array.prototype.push.apply(overrides, ["events", "overlays", "cssClass"]);
                            } else {
                                collations.push("cssClass");
                            }

                            o = _ju.merge(o, _t, collations, overrides);
                            _mapType(map, _t, tid);
                        }
                    }
                }

                if (params) {
                    o = _ju.populate(o, params, "_");
                }

                component.applyType(o, doNotRepaint, map);
                if (!doNotRepaint) {
                    component.repaint();
                }
            }
        },

// ------------------------------ BEGIN jsPlumbUIComponent --------------------------------------------

        jsPlumbUIComponent = root.jsPlumbUIComponent = function (params) {

            _ju.EventGenerator.apply(this, arguments);

            var self = this,
                a = arguments,
                idPrefix = self.idPrefix,
                id = idPrefix + (new Date()).getTime();

            this._jsPlumb = {
                instance: params._jsPlumb,
                parameters: params.parameters || {},
                paintStyle: null,
                hoverPaintStyle: null,
                paintStyleInUse: null,
                hover: false,
                beforeDetach: params.beforeDetach,
                beforeDrop: params.beforeDrop,
                overlayPlacements: [],
                hoverClass: params.hoverClass || params._jsPlumb.Defaults.HoverClass,
                types: [],
                typeCache:{}
            };

            this.cacheTypeItem = function(key, item, typeId) {
                this._jsPlumb.typeCache[typeId] = this._jsPlumb.typeCache[typeId] || {};
                this._jsPlumb.typeCache[typeId][key] = item;
            };
            this.getCachedTypeItem = function(key, typeId) {
                return this._jsPlumb.typeCache[typeId] ? this._jsPlumb.typeCache[typeId][key] : null;
            };

            this.getId = function () {
                return id;
            };

// ----------------------------- default type --------------------------------------------


            var o = params.overlays || [], oo = {};
            if (this.defaultOverlayKeys) {
                for (var i = 0; i < this.defaultOverlayKeys.length; i++) {
                    Array.prototype.push.apply(o, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[i]] || []);
                }

                for (i = 0; i < o.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = jsPlumb.convertToFullOverlaySpec(o[i]);
                    oo[fo[1].id] = fo;
                }
            }

            var _defaultType = {
                overlays:oo,
                parameters: params.parameters || {},
                scope: params.scope || this._jsPlumb.instance.getDefaultScope()
            };
            this.getDefaultType = function() {
                return _defaultType;
            };
            this.appendToDefaultType = function(obj) {
                for (var i in obj) {
                    _defaultType[i] = obj[i];
                }
            };

// ----------------------------- end default type --------------------------------------------

            // all components can generate events

            if (params.events) {
                for (var evtName in params.events) {
                    self.bind(evtName, params.events[evtName]);
                }
            }

            // all components get this clone function.
            // TODO issue 116 showed a problem with this - it seems 'a' that is in
            // the clone function's scope is shared by all invocations of it, the classic
            // JS closure problem.  for now, jsPlumb does a version of this inline where
            // it used to call clone.  but it would be nice to find some time to look
            // further at this.
            this.clone = function () {
                var o = Object.create(this.constructor.prototype);
                this.constructor.apply(o, a);
                return o;
            }.bind(this);

            // user can supply a beforeDetach callback, which will be executed before a detach
            // is performed; returning false prevents the detach.
            this.isDetachAllowed = function (connection) {
                var r = true;
                if (this._jsPlumb.beforeDetach) {
                    try {
                        r = this._jsPlumb.beforeDetach(connection);
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDetach callback failed", e);
                    }
                }
                return r;
            };

            // user can supply a beforeDrop callback, which will be executed before a dropped
            // connection is confirmed. user can return false to reject connection.
            this.isDropAllowed = function (sourceId, targetId, scope, connection, dropEndpoint, source, target) {
                var r = this._jsPlumb.instance.checkCondition("beforeDrop", {
                    sourceId: sourceId,
                    targetId: targetId,
                    scope: scope,
                    connection: connection,
                    dropEndpoint: dropEndpoint,
                    source: source, target: target
                });
                if (this._jsPlumb.beforeDrop) {
                    try {
                        r = this._jsPlumb.beforeDrop({
                            sourceId: sourceId,
                            targetId: targetId,
                            scope: scope,
                            connection: connection,
                            dropEndpoint: dropEndpoint,
                            source: source, target: target
                        });
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDrop callback failed", e);
                    }
                }
                return r;
            };

            var domListeners = [];

            // sets the component associated with listener events. for instance, an overlay delegates
            // its events back to a connector. but if the connector is swapped on the underlying connection,
            // then this component must be changed. This is called by setConnector in the Connection class.
            this.setListenerComponent = function (c) {
                for (var i = 0; i < domListeners.length; i++) {
                    domListeners[i][3] = c;
                }
            };


        };

    var _removeTypeCssHelper = function (component, typeIndex) {
        var typeId = component._jsPlumb.types[typeIndex],
            type = component._jsPlumb.instance.getType(typeId, component.getTypeDescriptor());

        if (type != null && type.cssClass && component.canvas) {
            component._jsPlumb.instance.removeClass(component.canvas, type.cssClass);
        }
    };

    _ju.extend(root.jsPlumbUIComponent, _ju.EventGenerator, {

        getParameter: function (name) {
            return this._jsPlumb.parameters[name];
        },

        setParameter: function (name, value) {
            this._jsPlumb.parameters[name] = value;
        },

        getParameters: function () {
            return this._jsPlumb.parameters;
        },

        setParameters: function (p) {
            this._jsPlumb.parameters = p;
        },

        getClass:function() {
            return jsPlumb.getClass(this.canvas);
        },

        hasClass:function(clazz) {
            return jsPlumb.hasClass(this.canvas, clazz);
        },

        addClass: function (clazz) {
            jsPlumb.addClass(this.canvas, clazz);
        },

        removeClass: function (clazz) {
            jsPlumb.removeClass(this.canvas, clazz);
        },

        updateClasses: function (classesToAdd, classesToRemove) {
            jsPlumb.updateClasses(this.canvas, classesToAdd, classesToRemove);
        },

        setType: function (typeId, params, doNotRepaint) {
            this.clearTypes();
            this._jsPlumb.types = _splitType(typeId) || [];
            _applyTypes(this, params, doNotRepaint);
        },

        getType: function () {
            return this._jsPlumb.types;
        },

        reapplyTypes: function (params, doNotRepaint) {
            _applyTypes(this, params, doNotRepaint);
        },

        hasType: function (typeId) {
            return this._jsPlumb.types.indexOf(typeId) !== -1;
        },

        addType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId), _cont = false;
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    if (!this.hasType(t[i])) {
                        this._jsPlumb.types.push(t[i]);
                        _cont = true;
                    }
                }
                if (_cont) {
                    _applyTypes(this, params, doNotRepaint);
                }
            }
        },

        removeType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId), _cont = false, _one = function (tt) {
                var idx = this._jsPlumb.types.indexOf(tt);
                if (idx !== -1) {
                    // remove css class if necessary
                    _removeTypeCssHelper(this, idx);
                    this._jsPlumb.types.splice(idx, 1);
                    return true;
                }
                return false;
            }.bind(this);

            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    _cont = _one(t[i]) || _cont;
                }
                if (_cont) {
                    _applyTypes(this, params, doNotRepaint);
                }
            }
        },
        clearTypes: function (params, doNotRepaint) {
            var i = this._jsPlumb.types.length;
            for (var j = 0; j < i; j++) {
                _removeTypeCssHelper(this, 0);
                this._jsPlumb.types.splice(0, 1);
            }
            _applyTypes(this, params, doNotRepaint);
        },

        toggleType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId);
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    var idx = this._jsPlumb.types.indexOf(t[i]);
                    if (idx !== -1) {
                        _removeTypeCssHelper(this, idx);
                        this._jsPlumb.types.splice(idx, 1);
                    }
                    else {
                        this._jsPlumb.types.push(t[i]);
                    }
                }

                _applyTypes(this, params, doNotRepaint);
            }
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.hoverPaintStyle, doNotRepaint);
            if (t.parameters) {
                for (var i in t.parameters) {
                    this.setParameter(i, t.parameters[i]);
                }
            }
            this._jsPlumb.paintStyleInUse = this.getPaintStyle();
        },
        setPaintStyle: function (style, doNotRepaint) {
            // this._jsPlumb.paintStyle = jsPlumb.extend({}, style);
            // TODO figure out if we want components to clone paintStyle so as not to share it.
            this._jsPlumb.paintStyle = style;
            this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle;
            _updateHoverStyle(this);
            if (!doNotRepaint) {
                this.repaint();
            }
        },
        getPaintStyle: function () {
            return this._jsPlumb.paintStyle;
        },
        setHoverPaintStyle: function (style, doNotRepaint) {
            //this._jsPlumb.hoverPaintStyle = jsPlumb.extend({}, style);
            // TODO figure out if we want components to clone paintStyle so as not to share it.
            this._jsPlumb.hoverPaintStyle = style;
            _updateHoverStyle(this);
            if (!doNotRepaint) {
                this.repaint();
            }
        },
        getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle;
        },
        destroy: function (force) {
            if (force || this.typeId == null) {
                this.cleanupListeners(); // this is on EventGenerator
                this.clone = null;
                this._jsPlumb = null;
            }
        },

        isHover: function () {
            return this._jsPlumb.hover;
        },

        setHover: function (hover, ignoreAttachedElements, timestamp) {
            // while dragging, we ignore these events.  this keeps the UI from flashing and
            // swishing and whatevering.
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {

                this._jsPlumb.hover = hover;
                var method = hover ? "addClass" : "removeClass";

                if (this.canvas != null) {
                    if (this._jsPlumb.instance.hoverClass != null) {
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.instance.hoverClass);
                    }
                    if (this._jsPlumb.hoverClass != null) {
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.hoverClass);
                    }
                }
                if (this._jsPlumb.hoverPaintStyle != null) {
                    this._jsPlumb.paintStyleInUse = hover ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle;
                    if (!this._jsPlumb.instance.isSuspendDrawing()) {
                        timestamp = timestamp || jsPlumbUtil.uuid();
                        this.repaint({timestamp: timestamp, recalc: false});
                    }
                }
                // get the list of other affected elements, if supported by this component.
                // for a connection, its the endpoints.  for an endpoint, its the connections! surprise.
                if (this.getAttachedElements && !ignoreAttachedElements) {
                    _updateAttachedElements(this, hover, jsPlumbUtil.uuid(), this);
                }
            }
        }
    });

// ------------------------------ END jsPlumbUIComponent --------------------------------------------

    var _jsPlumbInstanceIndex = 0,
        getInstanceIndex = function () {
            var i = _jsPlumbInstanceIndex + 1;
            _jsPlumbInstanceIndex++;
            return i;
        };

    var jsPlumbInstance = root.jsPlumbInstance = function (_defaults) {

        this.version = "2.15.6";

        this.Defaults = {
            Anchor: "Bottom",
            Anchors: [ null, null ],
            ConnectionsDetachable: true,
            ConnectionOverlays: [ ],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: false,
            DragOptions: { },
            DropOptions: { },
            Endpoint: "Dot",
            EndpointOverlays: [ ],
            Endpoints: [ null, null ],
            EndpointStyle: { fill: "#456" },
            EndpointStyles: [ null, null ],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [ null, null ],
            HoverPaintStyle: null,
            LabelStyle: { color: "black" },
            ListStyle: { },
            LogEnabled: false,
            Overlays: [ ],
            MaxConnections: 1,
            PaintStyle: { "stroke-width": 4, stroke: "#456" },
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };

        if (_defaults) {
            jsPlumb.extend(this.Defaults, _defaults);
        }

        this.logEnabled = this.Defaults.LogEnabled;
        this._connectionTypes = {};
        this._endpointTypes = {};

        _ju.EventGenerator.apply(this);

        var _currentInstance = this,
            _instanceIndex = getInstanceIndex(),
            _bb = _currentInstance.bind,
            _initialDefaults = {},
            _zoom = 1,
            _info = function (el) {
                if (el == null) {
                    return null;
                }
                else if (el.nodeType === 3 || el.nodeType === 8) {
                    return { el:el, text:true };
                }
                else {
                    var _el = _currentInstance.getElement(el);
                    return { el: _el, id: (_ju.isString(el) && _el == null) ? el : _getId(_el) };
                }
            };

        this.getInstanceIndex = function () {
            return _instanceIndex;
        };

        // CONVERTED
        this.setZoom = function (z, repaintEverything) {
            _zoom = z;
            _currentInstance.fire("zoom", _zoom);
            if (repaintEverything) {
                _currentInstance.repaintEverything();
            }
            return true;
        };
        // CONVERTED
        this.getZoom = function () {
            return _zoom;
        };

        for (var i in this.Defaults) {
            _initialDefaults[i] = this.Defaults[i];
        }

        var _container, _containerDelegations = [];
        this.unbindContainer = function() {
            if (_container != null && _containerDelegations.length > 0) {
                for (var i = 0; i < _containerDelegations.length; i++) {
                    _currentInstance.off(_container, _containerDelegations[i][0], _containerDelegations[i][1]);
                }
            }
        };
        this.setContainer = function (c) {

            this.unbindContainer();

            // get container as dom element.
            c = this.getElement(c);
            // move existing connections and endpoints, if any.
            this.select().each(function (conn) {
                conn.moveParent(c);
            });
            this.selectEndpoints().each(function (ep) {
                ep.moveParent(c);
            });

            // set container.
            var previousContainer = _container;
            _container = c;
            _containerDelegations.length = 0;
            var eventAliases = {
                "endpointclick":"endpointClick",
                "endpointdblclick":"endpointDblClick"
            };

            var _oneDelegateHandler = function (id, e, componentType) {
                var t = e.srcElement || e.target,
                    jp = (t && t.parentNode ? t.parentNode._jsPlumb : null) || (t ? t._jsPlumb : null) || (t && t.parentNode && t.parentNode.parentNode ? t.parentNode.parentNode._jsPlumb : null);
                if (jp) {
                    jp.fire(id, jp, e);
                    var alias = componentType ? eventAliases[componentType + id] || id : id;
                    // jsplumb also fires every event coming from components/overlays. That's what the test for `jp.component` is for.
                    _currentInstance.fire(alias, jp.component || jp, e);
                }
            };

            var _addOneDelegate = function(eventId, selector, fn) {
                _containerDelegations.push([eventId, fn]);
                _currentInstance.on(_container, eventId, selector, fn);
            };

            // delegate one event on the container to jsplumb elements. it might be possible to
            // abstract this out: each of endpoint, connection and overlay could register themselves with
            // jsplumb as "component types" or whatever, and provide a suitable selector. this would be
            // done by the renderer (although admittedly from 2.0 onwards we're not supporting vml anymore)
            var _oneDelegate = function (id) {
                // connections.
                _addOneDelegate(id, ".jtk-connector", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // endpoints. note they can have an enclosing div, or not.
                _addOneDelegate(id, ".jtk-endpoint", function (e) {
                    _oneDelegateHandler(id, e, "endpoint");
                });
                // overlays
                _addOneDelegate(id, ".jtk-overlay", function (e) {
                    _oneDelegateHandler(id, e);
                });
            };

            for (var i = 0; i < events.length; i++) {
                _oneDelegate(events[i]);
            }

            // managed elements
            for (var elId in managedElements) {
                var el = managedElements[elId].el;
                if (el.parentNode === previousContainer) {
                    previousContainer.removeChild(el);
                    _container.appendChild(el);
                }
            }

        };
        this.getContainer = function () {
            return _container;
        };

        this.bind = function (event, fn) {
            if ("ready" === event && initialized) {
                fn();
            }
            else {
                _bb.apply(_currentInstance, [event, fn]);
            }
        };

        _currentInstance.importDefaults = function (d) {
            for (var i in d) {
                _currentInstance.Defaults[i] = d[i];
            }
            if (d.Container) {
                _currentInstance.setContainer(d.Container);
            }

            return _currentInstance;
        };

        _currentInstance.restoreDefaults = function () {
            _currentInstance.Defaults = jsPlumb.extend({}, _initialDefaults);
            return _currentInstance;
        };

        var log = null,
            initialized = false,
            // TODO remove from window scope
            connections = [],
            // map of element id -> endpoint lists. an element can have an arbitrary
            // number of endpoints on it, and not all of them have to be connected
            // to anything.
            endpointsByElement = {},
            endpointsByUUID = {},
            managedElements = {},
            offsets = {},
            offsetTimestamps = {},
            connectionBeingDragged = false,
            sizes = [],
            _suspendDrawing = false,
            _suspendedAt = null,
            DEFAULT_SCOPE = this.Defaults.Scope,
            _curIdStamp = 1,
            _idstamp = function () {
                return "" + _curIdStamp++;
            },

            //
            // appends an element to some other element, which is calculated as follows:
            //
            // 1. if Container exists, use that element.
            // 2. if the 'parent' parameter exists, use that.
            // 3. otherwise just use the root element.
            //
            //
            _appendElement = function (el, parent) {
                if (_container) {
                    _container.appendChild(el);
                }
                else if (!parent) {
                    this.appendToRoot(el);
                }
                else {
                    this.getElement(parent).appendChild(el);
                }
            }.bind(this),

            //
            // Draws an endpoint and its connections. this is the main entry point into drawing connections as well
            // as endpoints, since jsPlumb is endpoint-centric under the hood.
            //
            // @param element element to draw (of type library specific element object)
            // @param ui UI object from current library's event system. optional.
            // @param timestamp timestamp for this paint cycle. used to speed things up a little by cutting down the amount of offset calculations we do.
            // @param clearEdits defaults to false; indicates that mouse edits for connectors should be cleared
            ///
            _draw = function (element, ui, timestamp, clearEdits) {

                var drawResult = { c:[], e:[] };

                if (!_suspendDrawing) {

                    element = _currentInstance.getElement(element);

                    if (element != null) {

                        var id = _getId(element),
                            repaintEls = element.querySelectorAll(".jtk-managed");

                        if (timestamp == null) {
                            timestamp = jsPlumbUtil.uuid();
                        }

                        // update the offset of everything _before_ we try to draw anything.
                        _updateOffset({elId: id, offset: ui, recalc: false, timestamp: timestamp});

                        for (var i = 0; i < repaintEls.length; i++) {
                            _updateOffset({
                                elId: repaintEls[i].getAttribute("id"),
                                // offset: {
                                //     left: o.o.left + repaintEls[i].offset.left,
                                //     top: o.o.top + repaintEls[i].offset.top
                                // },
                                recalc: true,
                                timestamp: timestamp
                            });
                        }

                        var d2 = _currentInstance.router.redraw(id, ui, timestamp, null, clearEdits);
                        Array.prototype.push.apply(drawResult.c, d2.c);
                        Array.prototype.push.apply(drawResult.e, d2.e);

                        if (repaintEls) {
                            for (var j = 0; j < repaintEls.length; j++) {
                                d2 = _currentInstance.router.redraw(repaintEls[j].getAttribute("id"), null, timestamp, null, clearEdits, true);
                                Array.prototype.push.apply(drawResult.c, d2.c);
                                Array.prototype.push.apply(drawResult.e, d2.e);
                            }
                        }
                    }
                }

                return drawResult;
            },

            //
            // gets an Endpoint by uuid.
            //
            _getEndpoint = function (uuid) {
                return endpointsByUUID[uuid];
            },

            /**
             * inits a draggable if it's not already initialised.
             * TODO: somehow abstract this to the adapter, because the concept of "draggable" has no
             * place on the server.
             */


            _scopeMatch = function (e1, e2) {
                var s1 = e1.scope.split(/\s/), s2 = e2.scope.split(/\s/);
                for (var i = 0; i < s1.length; i++) {
                    for (var j = 0; j < s2.length; j++) {
                        if (s2[j] === s1[i]) {
                            return true;
                        }
                    }
                }

                return false;
            },

            _mergeOverrides = function (def, values) {
                var m = jsPlumb.extend({}, def);
                for (var i in values) {
                    if (values[i]) {
                        m[i] = values[i];
                    }
                }
                return m;
            },

            /*
             * prepares a final params object that can be passed to _newConnection, taking into account defaults, events, etc.
             */
            _prepareConnectionParams = function (params, referenceParams) {
                var _p = jsPlumb.extend({ }, params);
                if (referenceParams) {
                    jsPlumb.extend(_p, referenceParams);
                }

                // hotwire endpoints passed as source or target to sourceEndpoint/targetEndpoint, respectively.
                if (_p.source) {
                    if (_p.source.endpoint) {
                        _p.sourceEndpoint = _p.source;
                    }
                    else {
                        _p.source = _currentInstance.getElement(_p.source);
                    }
                }
                if (_p.target) {
                    if (_p.target.endpoint) {
                        _p.targetEndpoint = _p.target;
                    }
                    else {
                        _p.target = _currentInstance.getElement(_p.target);
                    }
                }

                // test for endpoint uuids to connect
                if (params.uuids) {
                    _p.sourceEndpoint = _getEndpoint(params.uuids[0]);
                    _p.targetEndpoint = _getEndpoint(params.uuids[1]);
                }

                // now ensure that if we do have Endpoints already, they're not full.
                // source:
                if (_p.sourceEndpoint && _p.sourceEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; source endpoint is full");
                    return;
                }

                // target:
                if (_p.targetEndpoint && _p.targetEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; target endpoint is full");
                    return;
                }

                // if source endpoint mandates connection type and nothing specified in our params, use it.
                if (!_p.type && _p.sourceEndpoint) {
                    _p.type = _p.sourceEndpoint.connectionType;
                }

                // copy in any connectorOverlays that were specified on the source endpoint.
                // it doesnt copy target endpoint overlays.  i'm not sure if we want it to or not.
                if (_p.sourceEndpoint && _p.sourceEndpoint.connectorOverlays) {
                    _p.overlays = _p.overlays || [];
                    for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
                        _p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
                    }
                }

                // scope
                if (_p.sourceEndpoint && _p.sourceEndpoint.scope) {
                    _p.scope = _p.sourceEndpoint.scope;
                }

                // pointer events
                if (!_p["pointer-events"] && _p.sourceEndpoint && _p.sourceEndpoint.connectorPointerEvents) {
                    _p["pointer-events"] = _p.sourceEndpoint.connectorPointerEvents;
                }


                var _addEndpoint = function (el, def, idx) {
                    var params = _mergeOverrides(def, {
                        anchor: _p.anchors ? _p.anchors[idx] : _p.anchor,
                        endpoint: _p.endpoints ? _p.endpoints[idx] : _p.endpoint,
                        paintStyle: _p.endpointStyles ? _p.endpointStyles[idx] : _p.endpointStyle,
                        hoverPaintStyle: _p.endpointHoverStyles ? _p.endpointHoverStyles[idx] : _p.endpointHoverStyle
                    });
                    return _currentInstance.addEndpoint(el, params);
                };

                // check for makeSource/makeTarget specs.

                var _oneElementDef = function (type, idx, defs, matchType) {
                    if (_p[type] && !_p[type].endpoint && !_p[type + "Endpoint"] && !_p.newConnection) {
                        var tid = _getId(_p[type]), tep = defs[tid];

                        tep = tep ? tep[matchType] : null;

                        if (tep) {
                            // if not enabled, return.
                            if (!tep.enabled) {
                                return false;
                            }

                            var epDef = jsPlumb.extend({}, tep.def);
                            delete epDef.label;

                            var newEndpoint = tep.endpoint != null && tep.endpoint._jsPlumb ? tep.endpoint : _addEndpoint(_p[type], epDef, idx);
                            if (newEndpoint.isFull()) {
                                return false;
                            }
                            _p[type + "Endpoint"] = newEndpoint;
                            if (!_p.scope && epDef.scope) {
                                _p.scope = epDef.scope;
                            } // provide scope if not already provided and endpoint def has one.
                            if (tep.uniqueEndpoint) {
                                if (!tep.endpoint) {
                                    tep.endpoint = newEndpoint;
                                    newEndpoint.setDeleteOnEmpty(false);
                                }
                                else {
                                    newEndpoint.finalEndpoint = tep.endpoint;
                                }
                            } else {
                                newEndpoint.setDeleteOnEmpty(true);
                            }

                            //
                            // copy in connector overlays if present on the source definition.
                            //
                            if (idx === 0 && tep.def.connectorOverlays) {
                                _p.overlays = _p.overlays || [];
                                Array.prototype.push.apply(_p.overlays, tep.def.connectorOverlays);
                            }
                        }
                    }
                };

                if (_oneElementDef("source", 0, this.sourceEndpointDefinitions, _p.type || "default") === false) {
                    return;
                }
                if (_oneElementDef("target", 1, this.targetEndpointDefinitions, _p.type || "default") === false) {
                    return;
                }

                // last, ensure scopes match
                if (_p.sourceEndpoint && _p.targetEndpoint) {
                    if (!_scopeMatch(_p.sourceEndpoint, _p.targetEndpoint)) {
                        _p = null;
                    }
                }

                return _p;
            }.bind(_currentInstance),

            _newConnection = function (params) {
                var connectionFunc = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType();

                params._jsPlumb = _currentInstance;
                params.newConnection = _newConnection;
                params.newEndpoint = _newEndpoint;
                params.endpointsByUUID = endpointsByUUID;
                params.endpointsByElement = endpointsByElement;
                params.finaliseConnection = _finaliseConnection;
                params.id = "con_" + _idstamp();
                var con = new connectionFunc(params);

                // if the connection is draggable, then maybe we need to tell the target endpoint to init the
                // dragging code. it won't run again if it already configured to be draggable.
                if (con.isDetachable()) {
                    con.endpoints[0].initDraggable("_jsPlumbSource");
                    con.endpoints[1].initDraggable("_jsPlumbTarget");
                }

                return con;
            },

            //
            // adds the connection to the backing model, fires an event if necessary and then redraws
            //
            _finaliseConnection = _currentInstance.finaliseConnection = function (jpc, params, originalEvent, doInformAnchorManager) {
                params = params || {};
                // add to list of connections (by scope).
                if (!jpc.suspendedEndpoint) {
                    connections.push(jpc);
                }

                jpc.pending = null;

                // turn off isTemporarySource on the source endpoint (only viable on first draw)
                jpc.endpoints[0].isTemporarySource = false;

                // always inform the anchor manager
                // except that if jpc has a suspended endpoint it's not true to say the
                // connection is new; it has just (possibly) moved. the question is whether
                // to make that call here or in the anchor manager.  i think perhaps here.
                if (doInformAnchorManager !== false) {
                    _currentInstance.router.newConnection(jpc);
                }

                // force a paint
                _draw(jpc.source);

                // fire an event
                if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {

                    var eventArgs = {
                        connection: jpc,
                        source: jpc.source, target: jpc.target,
                        sourceId: jpc.sourceId, targetId: jpc.targetId,
                        sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                    };

                    _currentInstance.fire("connection", eventArgs, originalEvent);
                }
            },

            /*
             factory method to prepare a new endpoint.  this should always be used instead of creating Endpoints
             manually, since this method attaches event listeners and an id.
             */
            _newEndpoint = function (params, id) {
                var endpointFunc = _currentInstance.Defaults.EndpointType || jsPlumb.Endpoint;
                var _p = jsPlumb.extend({}, params);
                //delete _p.label; // not supported by endpoint.
                _p._jsPlumb = _currentInstance;
                _p.newConnection = _newConnection;
                _p.newEndpoint = _newEndpoint;
                _p.endpointsByUUID = endpointsByUUID;
                _p.endpointsByElement = endpointsByElement;
                _p.fireDetachEvent = fireDetachEvent;
                _p.elementId = id || _getId(_p.source);
                var ep = new endpointFunc(_p);
                ep.id = "ep_" + _idstamp();
                _manage(_p.elementId, _p.source);

                if (!jsPlumb.headless) {
                    _currentInstance.getDragManager().endpointAdded(_p.source, id);
                }

                return ep;
            },

            /*
             * performs the given function operation on all the connections found
             * for the given element id; this means we find all the endpoints for
             * the given element, and then for each endpoint find the connectors
             * connected to it. then we pass each connection in to the given
             * function.
             */
            _operation = function (elId, func, endpointFunc) {
                var endpoints = endpointsByElement[elId];
                if (endpoints && endpoints.length) {
                    for (var i = 0, ii = endpoints.length; i < ii; i++) {
                        for (var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
                            var retVal = func(endpoints[i].connections[j]);
                            // if the function passed in returns true, we exit.
                            // most functions return false.
                            if (retVal) {
                                return;
                            }
                        }
                        if (endpointFunc) {
                            endpointFunc(endpoints[i]);
                        }
                    }
                }
            },

            /*
             * private method to do the business of hiding/showing.
             *
             * @param el
             *            either Id of the element in question or a library specific
             *            object for the element.
             * @param state
             *            String specifying a value for the css 'display' property
             *            ('block' or 'none').
             */
            _setVisible = function (el, state, alsoChangeEndpoints) {
                state = state === "block";
                var endpointFunc = null;
                if (alsoChangeEndpoints) {
                    endpointFunc = function (ep) {
                        ep.setVisible(state, true, true);
                    };
                }
                var info = _info(el);
                _operation(info.id, function (jpc) {
                    if (state && alsoChangeEndpoints) {
                        // this test is necessary because this functionality is new, and i wanted to maintain backwards compatibility.
                        // this block will only set a connection to be visible if the other endpoint in the connection is also visible.
                        var oidx = jpc.sourceId === info.id ? 1 : 0;
                        if (jpc.endpoints[oidx].isVisible()) {
                            jpc.setVisible(true);
                        }
                    }
                    else { // the default behaviour for show, and what always happens for hide, is to just set the visibility without getting clever.
                        jpc.setVisible(state);
                    }
                }, endpointFunc);
            },
            /**
             * private method to do the business of toggling hiding/showing.
             */
            _toggleVisible = function (elId, changeEndpoints) {
                var endpointFunc = null;
                if (changeEndpoints) {
                    endpointFunc = function (ep) {
                        var state = ep.isVisible();
                        ep.setVisible(!state);
                    };
                }
                _operation(elId, function (jpc) {
                    var state = jpc.isVisible();
                    jpc.setVisible(!state);
                }, endpointFunc);
            },

            // TODO comparison performance
            _getCachedData = function (elId) {
                var o = offsets[elId];
                if (!o) {
                    return _updateOffset({elId: elId});
                }
                else {
                    return {o: o, s: sizes[elId]};
                }
            },

            /**
             * gets an id for the given element, creating and setting one if
             * necessary.  the id is of the form
             *
             *    jsPlumb_<instance index>_<index in instance>
             *
             * where "index in instance" is a monotonically increasing integer that starts at 0,
             * for each instance.  this method is used not only to assign ids to elements that do not
             * have them but also to connections and endpoints.
             */
            _getId = function (element, uuid, doNotCreateIfNotFound) {
                if (_ju.isString(element)) {
                    return element;
                }
                if (element == null) {
                    return null;
                }
                var id = _currentInstance.getAttribute(element, "id");
                if (!id || id === "undefined") {
                    // check if fixed uuid parameter is given
                    if (arguments.length === 2 && arguments[1] !== undefined) {
                        id = uuid;
                    }
                    else if (arguments.length === 1 || (arguments.length === 3 && !arguments[2])) {
                        id = "jsPlumb_" + _instanceIndex + "_" + _idstamp();
                    }

                    if (!doNotCreateIfNotFound) {
                        _currentInstance.setAttribute(element, "id", id);
                    }
                }
                return id;
            };

        this.setConnectionBeingDragged = function (v) {
            connectionBeingDragged = v;
        };
        this.isConnectionBeingDragged = function () {
            return connectionBeingDragged;
        };

        /**
         * Returns a map of all the elements this jsPlumbInstance is currently managing.
         * @returns {Object} Map of [id-> {el, endpoint[], connection, position}] information.
         */
        this.getManagedElements = function() {
            return managedElements;
        };

        this.connectorClass = "jtk-connector";
        this.connectorOutlineClass = "jtk-connector-outline";
        this.connectedClass = "jtk-connected";
        this.hoverClass = "jtk-hover";
        this.endpointClass = "jtk-endpoint";
        this.endpointConnectedClass = "jtk-endpoint-connected";
        this.endpointFullClass = "jtk-endpoint-full";
        this.endpointDropAllowedClass = "jtk-endpoint-drop-allowed";
        this.endpointDropForbiddenClass = "jtk-endpoint-drop-forbidden";
        this.overlayClass = "jtk-overlay";
        this.draggingClass = "jtk-dragging";// CONVERTED
        this.elementDraggingClass = "jtk-element-dragging";// CONVERTED
        this.sourceElementDraggingClass = "jtk-source-element-dragging"; // CONVERTED
        this.targetElementDraggingClass = "jtk-target-element-dragging";// CONVERTED
        this.endpointAnchorClassPrefix = "jtk-endpoint-anchor";
        this.hoverSourceClass = "jtk-source-hover";
        this.hoverTargetClass = "jtk-target-hover";
        this.dragSelectClass = "jtk-drag-select";

        this.Anchors = {};
        this.Connectors = {  "svg": {} };
        this.Endpoints = { "svg": {} };
        this.Overlays = { "svg": {} } ;
        this.ConnectorRenderers = {};
        this.SVG = "svg";

// --------------------------- jsPlumbInstance public API ---------------------------------------------------------


        this.addEndpoint = function (el, params, referenceParams) {
            referenceParams = referenceParams || {};
            var p = jsPlumb.extend({}, referenceParams);
            jsPlumb.extend(p, params);
            p.endpoint = p.endpoint || _currentInstance.Defaults.Endpoint;
            p.paintStyle = p.paintStyle || _currentInstance.Defaults.EndpointStyle;

            var results = [],
                inputs = (_ju.isArray(el) || (el.length != null && !_ju.isString(el))) ? el : [ el ];

            for (var i = 0, j = inputs.length; i < j; i++) {
                p.source = _currentInstance.getElement(inputs[i]);
                _ensureContainer(p.source);

                var id = _getId(p.source), e = _newEndpoint(p, id);

                // ensure element is managed. force a recalc if drawing not suspended, to ensure the cached value is fresh
                var myOffset = _manage(id, p.source, null, !_suspendDrawing).info.o;
                _ju.addToList(endpointsByElement, id, e);

                if (!_suspendDrawing) {
                    e.paint({
                        anchorLoc: e.anchor.compute(
                            { xy: [ myOffset.left, myOffset.top ],
                                wh: sizes[id],
                                element: e,
                                timestamp: _suspendedAt,
                                rotation:this.getRotation(id)
                            }),
                        timestamp: _suspendedAt
                    });
                }

                results.push(e);
            }

            return results.length === 1 ? results[0] : results;
        };

        this.addEndpoints = function (el, endpoints, referenceParams) {
            var results = [];
            for (var i = 0, j = endpoints.length; i < j; i++) {
                var e = _currentInstance.addEndpoint(el, endpoints[i], referenceParams);
                if (_ju.isArray(e)) {
                    Array.prototype.push.apply(results, e);
                }
                else {
                    results.push(e);
                }
            }
            return results;
        };

        this.animate = function (el, properties, options) {
            if (!this.animationSupported) {
                return false;
            }

            options = options || {};
            var del = _currentInstance.getElement(el),
                id = _getId(del),
                stepFunction = jsPlumb.animEvents.step,
                completeFunction = jsPlumb.animEvents.complete;

            options[stepFunction] = _ju.wrap(options[stepFunction], function () {
                _currentInstance.revalidate(id);
            });

            // onComplete repaints, just to make sure everything looks good at the end of the animation.
            options[completeFunction] = _ju.wrap(options[completeFunction], function () {
                _currentInstance.revalidate(id);
            });

            _currentInstance.doAnimate(del, properties, options);
        };

        /**
         * checks for a listener for the given condition, executing it if found, passing in the given value.
         * condition listeners would have been attached using "bind" (which is, you could argue, now overloaded, since
         * firing click events etc is a bit different to what this does).  i thought about adding a "bindCondition"
         * or something, but decided against it, for the sake of simplicity. jsPlumb will never fire one of these
         * condition events anyway.
         */
        this.checkCondition = function (conditionName, args) {
            var l = _currentInstance.getListener(conditionName),
                r = true;

            if (l && l.length > 0) {
                var values = Array.prototype.slice.call(arguments, 1);
                try {
                    for (var i = 0, j = l.length; i < j; i++) {
                        r = r && l[i].apply(l[i], values);
                    }
                }
                catch (e) {
                    _ju.log(_currentInstance, "cannot check condition [" + conditionName + "]" + e);
                }
            }
            return r;
        };

        this.connect = function (params, referenceParams) {
            // prepare a final set of parameters to create connection with
            var _p = _prepareConnectionParams(params, referenceParams), jpc;
            // TODO probably a nicer return value if the connection was not made.  _prepareConnectionParams
            // will return null (and log something) if either endpoint was full.  what would be nicer is to
            // create a dedicated 'error' object.
            if (_p) {
                if (_p.source == null && _p.sourceEndpoint == null) {
                    _ju.log("Cannot establish connection - source does not exist");
                    return;
                }
                if (_p.target == null && _p.targetEndpoint == null) {
                    _ju.log("Cannot establish connection - target does not exist");
                    return;
                }
                _ensureContainer(_p.source);
                // create the connection.  it is not yet registered
                jpc = _newConnection(_p);
                // now add it the model, fire an event, and redraw
                _finaliseConnection(jpc, _p);
            }
            return jpc;
        };

        var stTypes = [
            { el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions" },
            { el: "target", elId: "targetId", epDefs: "targetEndpointDefinitions" }
        ];

        var _set = function (c, el, idx, doNotRepaint) {
            var ep, _st = stTypes[idx], cId = c[_st.elId]; c[_st.el]; var sid, sep,
                oldEndpoint = c.endpoints[idx];

            var evtParams = {
                index: idx,
                originalSourceId: idx === 0 ? cId : c.sourceId,
                newSourceId: c.sourceId,
                originalTargetId: idx === 1 ? cId : c.targetId,
                newTargetId: c.targetId,
                connection: c
            };

            if (el.constructor === jsPlumb.Endpoint) {
                ep = el;
                ep.addConnection(c);
                el = ep.element;
            }
            else {
                sid = _getId(el);
                sep = this[_st.epDefs][sid];

                if (sid === c[_st.elId]) {
                    ep = null; // dont change source/target if the element is already the one given.
                }
                else if (sep) {
                    for (var t in sep) {
                        if (!sep[t].enabled) {
                            return;
                        }
                        ep = sep[t].endpoint != null && sep[t].endpoint._jsPlumb ? sep[t].endpoint : this.addEndpoint(el, sep[t].def);
                        if (sep[t].uniqueEndpoint) {
                            sep[t].endpoint = ep;
                        }
                        ep.addConnection(c);
                    }
                }
                else {
                    ep = c.makeEndpoint(idx === 0, el, sid);
                }
            }

            if (ep != null) {
                oldEndpoint.detachFromConnection(c);
                c.endpoints[idx] = ep;
                c[_st.el] = ep.element;
                c[_st.elId] = ep.elementId;
                evtParams[idx === 0 ? "newSourceId" : "newTargetId"] = ep.elementId;

                fireMoveEvent(evtParams);

                if (!doNotRepaint) {
                    c.repaint();
                }
            }

            evtParams.element = el;
            return evtParams;

        }.bind(this);

        this.setSource = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 0, doNotRepaint);
            this.router.sourceOrTargetChanged(p.originalSourceId, p.newSourceId, connection, p.el, 0);
        };
        this.setTarget = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 1, doNotRepaint);
            this.router.sourceOrTargetChanged(p.originalTargetId, p.newTargetId, connection, p.el, 1);
        };

        this.deleteEndpoint = function (object, dontUpdateHover, deleteAttachedObjects) {
            var endpoint = (typeof object === "string") ? endpointsByUUID[object] : object;
            if (endpoint) {
                _currentInstance.deleteObject({ endpoint: endpoint, dontUpdateHover: dontUpdateHover, deleteAttachedObjects:deleteAttachedObjects });
            }
            return _currentInstance;
        };

        this.deleteEveryEndpoint = function () {
            var _is = _currentInstance.setSuspendDrawing(true);
            for (var id in endpointsByElement) {
                var endpoints = endpointsByElement[id];
                if (endpoints && endpoints.length) {
                    for (var i = 0, j = endpoints.length; i < j; i++) {
                        _currentInstance.deleteEndpoint(endpoints[i], true);
                    }
                }
            }
            endpointsByElement = {};
            managedElements = {};
            endpointsByUUID = {};
            offsets = {};
            offsetTimestamps = {};
            _currentInstance.router.reset();
            var dm = _currentInstance.getDragManager();
            if (dm) {
                dm.reset();
            }
            if (!_is) {
                _currentInstance.setSuspendDrawing(false);
            }
            return _currentInstance;
        };

        var fireDetachEvent = function (jpc, doFireEvent, originalEvent) {
            // may have been given a connection, or in special cases, an object
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                argIsConnection = jpc.constructor === connType,
                params = argIsConnection ? {
                    connection: jpc,
                    source: jpc.source, target: jpc.target,
                    sourceId: jpc.sourceId, targetId: jpc.targetId,
                    sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                } : jpc;

            if (doFireEvent) {
                _currentInstance.fire("connectionDetached", params, originalEvent);
            }

            // always fire this. used by internal jsplumb stuff.
            _currentInstance.fire("internal.connectionDetached", params, originalEvent);

            _currentInstance.router.connectionDetached(params);
        };

        var fireMoveEvent = _currentInstance.fireMoveEvent = function (params, evt) {
            _currentInstance.fire("connectionMoved", params, evt);
        };

        this.unregisterEndpoint = function (endpoint) {
            if (endpoint._jsPlumb.uuid) {
                endpointsByUUID[endpoint._jsPlumb.uuid] = null;
            }
            _currentInstance.router.deleteEndpoint(endpoint);
            // TODO at least replace this with a removeWithFunction call.
            for (var e in endpointsByElement) {
                var endpoints = endpointsByElement[e];
                if (endpoints) {
                    var newEndpoints = [];
                    for (var i = 0, j = endpoints.length; i < j; i++) {
                        if (endpoints[i] !== endpoint) {
                            newEndpoints.push(endpoints[i]);
                        }
                    }

                    endpointsByElement[e] = newEndpoints;
                }
                if (endpointsByElement[e].length < 1) {
                    delete endpointsByElement[e];
                }
            }
        };

        var IS_DETACH_ALLOWED = "isDetachAllowed";
        var BEFORE_DETACH = "beforeDetach";
        var CHECK_CONDITION = "checkCondition";

        /**
         * Deletes a Connection.
         * @method deleteConnection
         * @param connection Connection to delete
         * @param {Object} [params] Optional delete parameters
         * @param {Boolean} [params.fireEvent=true] If false, a connection detached event will not be fired. Otherwise one will.
         * @param {Boolean} [params.force=false] If true, the connection will be deleted even if a beforeDetach interceptor tries to stop the deletion.
         * @returns {Boolean} True if the connection was deleted, false otherwise.
         */
        this.deleteConnection = function(connection, params) {

            if (connection != null) {
                params = params || {};

                if (params.force || _ju.functionChain(true, false, [
                        [ connection.endpoints[0], IS_DETACH_ALLOWED, [ connection ] ],
                        [ connection.endpoints[1], IS_DETACH_ALLOWED, [ connection ] ],
                        [ connection, IS_DETACH_ALLOWED, [ connection ] ],
                        [ _currentInstance, CHECK_CONDITION, [ BEFORE_DETACH, connection ] ]
                    ])) {

                    connection.setHover(false);
                    fireDetachEvent(connection, !connection.pending && params.fireEvent !== false, params.originalEvent);

                    connection.endpoints[0].detachFromConnection(connection);
                    connection.endpoints[1].detachFromConnection(connection);
                    _ju.removeWithFunction(connections, function (_c) {
                        return connection.id === _c.id;
                    });

                    connection.cleanup();
                    connection.destroy();
                    return true;
                }
            }
            return false;
        };

        /**
         * Remove all Connections from all elements, but leaves Endpoints in place ((unless a connection is set to auto delete its Endpoints).
         * @method deleteEveryConnection
         * @param {Object} [params] optional params object for the call
         * @param {Boolean} [params.fireEvent=true] Whether or not to fire detach events
         * @param {Boolean} [params.forceDetach=false] If true, this call will ignore any `beforeDetach` interceptors.
         * @returns {Number} The number of connections that were deleted.
         */
        this.deleteEveryConnection = function (params) {
            params = params || {};
            var count = connections.length, deletedCount = 0;
            _currentInstance.batch(function () {
                for (var i = 0; i < count; i++) {
                    deletedCount += _currentInstance.deleteConnection(connections[0], params) ? 1 : 0;
                }
            });
            return deletedCount;
        };

        /**
         * Removes all an element's Connections.
         * @method deleteConnectionsForElement
         * @param {Object} el Either the id of the element, or a selector for the element.
         * @param {Object} [params] Optional parameters.
         * @param {Boolean} [params.fireEvent=true] Whether or not to fire the detach event.
         * @param {Boolean} [params.forceDetach=false] If true, this call will ignore any `beforeDetach` interceptors.
         * @return {jsPlumbInstance} The current jsPlumb instance.
         */
        this.deleteConnectionsForElement = function (el, params) {
            params = params || {};
            el = _currentInstance.getElement(el);
            var id = _getId(el), endpoints = endpointsByElement[id];
            if (endpoints && endpoints.length) {
                for (var i = 0, j = endpoints.length; i < j; i++) {
                    endpoints[i].deleteEveryConnection(params);
                }
            }
            return _currentInstance;
        };

        /// not public.  but of course its exposed. how to change this.
        this.deleteObject = function (params) {
            var result = {
                    endpoints: {},
                    connections: {},
                    endpointCount: 0,
                    connectionCount: 0
                },
                deleteAttachedObjects = params.deleteAttachedObjects !== false;

            var unravelConnection = function (connection) {
                if (connection != null && result.connections[connection.id] == null) {
                    if (!params.dontUpdateHover && connection._jsPlumb != null) {
                        connection.setHover(false);
                    }
                    result.connections[connection.id] = connection;
                    result.connectionCount++;
                }
            };
            var unravelEndpoint = function (endpoint) {
                if (endpoint != null && result.endpoints[endpoint.id] == null) {
                    if (!params.dontUpdateHover && endpoint._jsPlumb != null) {
                        endpoint.setHover(false);
                    }
                    result.endpoints[endpoint.id] = endpoint;
                    result.endpointCount++;

                    if (deleteAttachedObjects) {
                        for (var i = 0; i < endpoint.connections.length; i++) {
                            var c = endpoint.connections[i];
                            unravelConnection(c);
                        }
                    }
                }
            };

            if (params.connection) {
                unravelConnection(params.connection);
            }
            else {
                unravelEndpoint(params.endpoint);
            }

            // loop through connections
            for (var i in result.connections) {
                var c = result.connections[i];
                if (c._jsPlumb) {
                    _ju.removeWithFunction(connections, function (_c) {
                        return c.id === _c.id;
                    });

                    fireDetachEvent(c, params.fireEvent === false ? false : !c.pending, params.originalEvent);
                    var doNotCleanup = params.deleteAttachedObjects == null ? null : !params.deleteAttachedObjects;

                    c.endpoints[0].detachFromConnection(c, null, doNotCleanup);
                    c.endpoints[1].detachFromConnection(c, null, doNotCleanup);

                    c.cleanup(true);
                    c.destroy(true);
                }
            }

            // loop through endpoints
            for (var j in result.endpoints) {
                var e = result.endpoints[j];
                if (e._jsPlumb) {
                    _currentInstance.unregisterEndpoint(e);
                    // FIRE some endpoint deleted event?
                    e.cleanup(true);
                    e.destroy(true);
                }
            }

            return result;
        };


        // helpers for select/selectEndpoints
        var _setOperation = function (list, func, args, selector) {
                for (var i = 0, j = list.length; i < j; i++) {
                    list[i][func].apply(list[i], args);
                }
                return selector(list);
            },
            _getOperation = function (list, func, args) {
                var out = [];
                for (var i = 0, j = list.length; i < j; i++) {
                    out.push([ list[i][func].apply(list[i], args), list[i] ]);
                }
                return out;
            },
            setter = function (list, func, selector) {
                return function () {
                    return _setOperation(list, func, arguments, selector);
                };
            },
            getter = function (list, func) {
                return function () {
                    return _getOperation(list, func, arguments);
                };
            },
            prepareList = function (input, doNotGetIds) {
                var r = [];
                if (input) {
                    if (typeof input === 'string') {
                        if (input === "*") {
                            return input;
                        }
                        r.push(input);
                    }
                    else {
                        if (doNotGetIds) {
                            r = input;
                        }
                        else {
                            if (input.length) {
                                for (var i = 0, j = input.length; i < j; i++) {
                                    r.push(_info(input[i]).id);
                                }
                            }
                            else {
                                r.push(_info(input).id);
                            }
                        }
                    }
                }
                return r;
            },
            filterList = function (list, value, missingIsFalse) {
                if (list === "*") {
                    return true;
                }
                return list.length > 0 ? list.indexOf(value) !== -1 : !missingIsFalse;
            };

        // get some connections, specifying source/target/scope
        this.getConnections = function (options, flat) {
            if (!options) {
                options = {};
            } else if (options.constructor === String) {
                options = { "scope": options };
            }
            var scope = options.scope || _currentInstance.getDefaultScope(),
                scopes = prepareList(scope, true),
                sources = prepareList(options.source),
                targets = prepareList(options.target),
                results = (!flat && scopes.length > 1) ? {} : [],
                _addOne = function (scope, obj) {
                    if (!flat && scopes.length > 1) {
                        var ss = results[scope];
                        if (ss == null) {
                            ss = results[scope] = [];
                        }
                        ss.push(obj);
                    } else {
                        results.push(obj);
                    }
                };

            for (var j = 0, jj = connections.length; j < jj; j++) {
                var c = connections[j],
                    sourceId = c.proxies && c.proxies[0] ? c.proxies[0].originalEp.elementId : c.sourceId,
                    targetId = c.proxies && c.proxies[1] ? c.proxies[1].originalEp.elementId : c.targetId;

                if (filterList(scopes, c.scope) && filterList(sources, sourceId) && filterList(targets, targetId)) {
                    _addOne(c.scope, c);
                }
            }

            return results;
        };

        var _curryEach = function (list, executor) {
                return function (f) {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        f(list[i]);
                    }
                    return executor(list);
                };
            },
            _curryGet = function (list) {
                return function (idx) {
                    return list[idx];
                };
            };

        var _makeCommonSelectHandler = function (list, executor) {
            var out = {
                    length: list.length,
                    each: _curryEach(list, executor),
                    get: _curryGet(list)
                },
                setters = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay",
                    "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle",
                    "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible",
                    "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind" ],

                getters = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle",
                    "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents" ],
                i, ii;

            for (i = 0, ii = setters.length; i < ii; i++) {
                out[setters[i]] = setter(list, setters[i], executor);
            }

            for (i = 0, ii = getters.length; i < ii; i++) {
                out[getters[i]] = getter(list, getters[i]);
            }

            return out;
        };

        var _makeConnectionSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeConnectionSelectHandler);
            return jsPlumb.extend(common, {
                // setters
                setDetachable: setter(list, "setDetachable", _makeConnectionSelectHandler),
                setReattach: setter(list, "setReattach", _makeConnectionSelectHandler),
                setConnector: setter(list, "setConnector", _makeConnectionSelectHandler),
                delete: function () {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        _currentInstance.deleteConnection(list[i]);
                    }
                },
                // getters
                isDetachable: getter(list, "isDetachable"),
                isReattach: getter(list, "isReattach")
            });
        };

        var _makeEndpointSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeEndpointSelectHandler);
            return jsPlumb.extend(common, {
                setEnabled: setter(list, "setEnabled", _makeEndpointSelectHandler),
                setAnchor: setter(list, "setAnchor", _makeEndpointSelectHandler),
                isEnabled: getter(list, "isEnabled"),
                deleteEveryConnection: function () {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        list[i].deleteEveryConnection();
                    }
                },
                "delete": function () {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        _currentInstance.deleteEndpoint(list[i]);
                    }
                }
            });
        };

        this.select = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            return _makeConnectionSelectHandler(params.connections || _currentInstance.getConnections(params, true));
        };

        this.selectEndpoints = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            var noElementFilters = !params.element && !params.source && !params.target,
                elements = noElementFilters ? "*" : prepareList(params.element),
                sources = noElementFilters ? "*" : prepareList(params.source),
                targets = noElementFilters ? "*" : prepareList(params.target),
                scopes = prepareList(params.scope, true);

            var ep = [];

            for (var el in endpointsByElement) {
                var either = filterList(elements, el, true),
                    source = filterList(sources, el, true),
                    sourceMatchExact = sources !== "*",
                    target = filterList(targets, el, true),
                    targetMatchExact = targets !== "*";

                // if they requested 'either' then just match scope. otherwise if they requested 'source' (not as a wildcard) then we have to match only endpoints that have isSource set to to true, and the same thing with isTarget.
                if (either || source || target) {
                    inner:
                        for (var i = 0, ii = endpointsByElement[el].length; i < ii; i++) {
                            var _ep = endpointsByElement[el][i];
                            if (filterList(scopes, _ep.scope, true)) {

                                var noMatchSource = (sourceMatchExact && sources.length > 0 && !_ep.isSource),
                                    noMatchTarget = (targetMatchExact && targets.length > 0 && !_ep.isTarget);

                                if (noMatchSource || noMatchTarget) {
                                    continue inner;
                                }

                                ep.push(_ep);
                            }
                        }
                }
            }

            return _makeEndpointSelectHandler(ep);
        };

        // get all connections managed by the instance of jsplumb.
        this.getAllConnections = function () {
            return connections;
        };
        this.getDefaultScope = function () {
            return DEFAULT_SCOPE;
        };
        // get an endpoint by uuid.
        this.getEndpoint = _getEndpoint;
        /**
         * Gets the list of Endpoints for a given element.
         * @method getEndpoints
         * @param {String|Element|Selector} el The element to get endpoints for.
         * @return {Endpoint[]} An array of Endpoints for the specified element.
         */
        this.getEndpoints = function (el) {
            return endpointsByElement[_info(el).id] || [];
        };
        // gets the default endpoint type. used when subclassing. see wiki.
        this.getDefaultEndpointType = function () {
            return jsPlumb.Endpoint;
        };
        // gets the default connection type. used when subclassing.  see wiki.
        this.getDefaultConnectionType = function () {
            return jsPlumb.Connection;
        };
        /*
         * Gets an element's id, creating one if necessary. really only exposed
         * for the lib-specific functionality to access; would be better to pass
         * the current instance into the lib-specific code (even though this is
         * a static call. i just don't want to expose it to the public API).
         */
        this.getId = _getId;
        this.draw = _draw;
        this.info = _info;

        this.appendElement = _appendElement;

        var _hoverSuspended = false;
        this.isHoverSuspended = function () {
            return _hoverSuspended;
        };
        this.setHoverSuspended = function (s) {
            _hoverSuspended = s;
        };

        // set an element's connections to be hidden
        this.hide = function (el, changeEndpoints) {
            _setVisible(el, "none", changeEndpoints);
            return _currentInstance;
        };

        // exposed for other objects to use to get a unique id.
        this.idstamp = _idstamp;

        // ensure that, if the current container exists, it is a DOM element and not a selector.
        // if it does not exist and `candidate` is supplied, the offset parent of that element will be set as the Container.
        // this is used to do a better default behaviour for the case that the user has not set a container:
        // addEndpoint, makeSource, makeTarget and connect all call this method with the offsetParent of the
        // element in question (for connect it is the source element). So if no container is set, it is inferred
        // to be the offsetParent of the first element the user tries to connect.
        var _ensureContainer = function (candidate) {
            if (!_container && candidate) {
                var can = _currentInstance.getElement(candidate);
                if (can.offsetParent) {
                    _currentInstance.setContainer(can.offsetParent);
                }
            }
        };

        var _getContainerFromDefaults = function () {
            if (_currentInstance.Defaults.Container) {
                _currentInstance.setContainer(_currentInstance.Defaults.Container);
            }
        };

        // check if a given element is managed or not. if not, add to our map. if drawing is not suspended then
        // we'll also stash its dimensions; otherwise we'll do this in a lazy way through updateOffset.
        var _manage = _currentInstance.manage = function (id, element, _transient, _recalc) {
            if (!managedElements[id]) {
                managedElements[id] = {
                    el: element,
                    endpoints: [],
                    connections: [],
                    rotation: 0
                };

                managedElements[id].info = _updateOffset({ elId: id, timestamp: _suspendedAt });
                _currentInstance.addClass(element, "jtk-managed");

                if (!_transient) {
                    _currentInstance.fire("manageElement", { id:id, info:managedElements[id].info, el:element });
                }
            } else {
                if (_recalc) {
                    managedElements[id].info = _updateOffset({ elId: id, timestamp: _suspendedAt, recalc:true });
                }
            }

            return managedElements[id];
        };

        this.unmanage = function(id) {
            if (managedElements[id]) {
                var el = managedElements[id].el;
               _currentInstance.removeClass(el, "jtk-managed");
                delete managedElements[id];
                _currentInstance.fire("unmanageElement", {id:id, el:el});
            }
        };

        this.rotate = function(elId, amountInDegrees, doNotRedraw) {
            if (managedElements[elId]) {
                managedElements[elId].rotation = amountInDegrees;

                managedElements[elId].el.style.transform="rotate(" + amountInDegrees + "deg)";
                managedElements[elId].el.style.transformOrigin="center center";

                if (doNotRedraw !== true) {
                    return this.revalidate(elId);
                }
            }

            return {
                c:[], e:[]
            };
        };

        this.getRotation = function(elementId) {
            return managedElements[elementId] ? managedElements[elementId].rotation || 0 : 0;
        };

        /**
         * updates the offset and size for a given element, and stores the
         * values. if 'offset' is not null we use that (it would have been
         * passed in from a drag call) because it's faster; but if it is null,
         * or if 'recalc' is true in order to force a recalculation, we get the current values.
         * @method updateOffset
         */
        var _updateOffset = function (params) {

            var timestamp = params.timestamp, recalc = params.recalc, offset = params.offset, elId = params.elId, s;
            if (_suspendDrawing && !timestamp) {
                timestamp = _suspendedAt;
            }
            if (!recalc) {
                if (timestamp && timestamp === offsetTimestamps[elId]) {
                    return {o: params.offset || offsets[elId], s: sizes[elId]};
                }
            }
            if (recalc || (!offset && offsets[elId] == null)) { // if forced repaint or no offset available, we recalculate.

                // get the current size and offset, and store them
                s = managedElements[elId] ? managedElements[elId].el : null;
                if (s != null) {
                    sizes[elId] = _currentInstance.getSize(s);
                    offsets[elId] = _currentInstance.getOffset(s);
                    offsetTimestamps[elId] = timestamp;
                }
            } else {
                offsets[elId] = offset || offsets[elId];
                if (sizes[elId] == null) {
                    s = managedElements[elId].el;
                    if (s != null) {
                        sizes[elId] = _currentInstance.getSize(s);
                    }
                }
                offsetTimestamps[elId] = timestamp;
            }

            if (offsets[elId] && !offsets[elId].right) {
                offsets[elId].right = offsets[elId].left + sizes[elId][0];
                offsets[elId].bottom = offsets[elId].top + sizes[elId][1];
                offsets[elId].width = sizes[elId][0];
                offsets[elId].height = sizes[elId][1];
                offsets[elId].centerx = offsets[elId].left + (offsets[elId].width / 2);
                offsets[elId].centery = offsets[elId].top + (offsets[elId].height / 2);
            }

            return {o: offsets[elId], s: sizes[elId]};
        };

        this.updateOffset = _updateOffset;

        /**
         * callback from the current library to tell us to prepare ourselves (attach
         * mouse listeners etc; can't do that until the library has provided a bind method)
         */
        this.init = function () {
            if (!initialized) {
                _getContainerFromDefaults();
                _currentInstance.router = new root.jsPlumb.DefaultRouter(_currentInstance);
                _currentInstance.anchorManager = _currentInstance.router.anchorManager;
                initialized = true;
                _currentInstance.fire("ready", _currentInstance);
            }
        }.bind(this);

        this.log = log;
        this.jsPlumbUIComponent = jsPlumbUIComponent;

        /*
         * Creates an anchor with the given params.
         *
         *
         * Returns: The newly created Anchor.
         * Throws: an error if a named anchor was not found.
         */
        this.makeAnchor = function () {
            var pp, _a = function (t, p) {
                if (root.jsPlumb.Anchors[t]) {
                    return new root.jsPlumb.Anchors[t](p);
                }
                if (!_currentInstance.Defaults.DoNotThrowErrors) {
                    throw { msg: "jsPlumb: unknown anchor type '" + t + "'" };
                }
            };
            if (arguments.length === 0) {
                return null;
            }
            var specimen = arguments[0], elementId = arguments[1], newAnchor = null;
            // if it appears to be an anchor already...
            if (specimen.compute && specimen.getOrientation) {
                return specimen;
            }  //TODO hazy here about whether it should be added or is already added somehow.
            // is it the name of an anchor type?
            else if (typeof specimen === "string") {
                newAnchor = _a(arguments[0], {elementId: elementId, jsPlumbInstance: _currentInstance});
            }
            // is it an array? it will be one of:
            // an array of [spec, params] - this defines a single anchor, which may be dynamic, but has parameters.
            // an array of arrays - this defines some dynamic anchors
            // an array of numbers - this defines a single anchor.
            else if (_ju.isArray(specimen)) {
                if (_ju.isArray(specimen[0]) || _ju.isString(specimen[0])) {
                    // if [spec, params] format
                    if (specimen.length === 2 && _ju.isObject(specimen[1])) {
                        // if first arg is a string, its a named anchor with params
                        if (_ju.isString(specimen[0])) {
                            pp = root.jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance}, specimen[1]);
                            newAnchor = _a(specimen[0], pp);
                        }
                        // otherwise first arg is array, second is params. we treat as a dynamic anchor, which is fine
                        // even if the first arg has only one entry. you could argue all anchors should be implicitly dynamic in fact.
                        else {
                            pp = root.jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance, anchors: specimen[0]}, specimen[1]);
                            newAnchor = new root.jsPlumb.DynamicAnchor(pp);
                        }
                    }
                    else {
                        newAnchor = new jsPlumb.DynamicAnchor({anchors: specimen, selector: null, elementId: elementId, jsPlumbInstance: _currentInstance});
                    }

                }
                else {
                    var anchorParams = {
                        x: specimen[0], y: specimen[1],
                        orientation: (specimen.length >= 4) ? [ specimen[2], specimen[3] ] : [0, 0],
                        offsets: (specimen.length >= 6) ? [ specimen[4], specimen[5] ] : [ 0, 0 ],
                        elementId: elementId,
                        jsPlumbInstance: _currentInstance,
                        cssClass: specimen.length === 7 ? specimen[6] : null
                    };
                    newAnchor = new root.jsPlumb.Anchor(anchorParams);
                    newAnchor.clone = function () {
                        return new root.jsPlumb.Anchor(anchorParams);
                    };
                }
            }

            if (!newAnchor.id) {
                newAnchor.id = "anchor_" + _idstamp();
            }
            return newAnchor;
        };

        /**
         * makes a list of anchors from the given list of types or coords, eg
         * ["TopCenter", "RightMiddle", "BottomCenter", [0, 1, -1, -1] ]
         */
        this.makeAnchors = function (types, elementId, jsPlumbInstance) {
            var r = [];
            for (var i = 0, ii = types.length; i < ii; i++) {
                if (typeof types[i] === "string") {
                    r.push(root.jsPlumb.Anchors[types[i]]({elementId: elementId, jsPlumbInstance: jsPlumbInstance}));
                }
                else if (_ju.isArray(types[i])) {
                    r.push(_currentInstance.makeAnchor(types[i], elementId, jsPlumbInstance));
                }
            }
            return r;
        };

        /**
         * Makes a dynamic anchor from the given list of anchors (which may be in shorthand notation as strings or dimension arrays, or Anchor
         * objects themselves) and the given, optional, anchorSelector function (jsPlumb uses a default if this is not provided; most people will
         * not need to provide this - i think).
         */
        this.makeDynamicAnchor = function (anchors, anchorSelector) {
            return new root.jsPlumb.DynamicAnchor({anchors: anchors, selector: anchorSelector, elementId: null, jsPlumbInstance: _currentInstance});
        };

// --------------------- makeSource/makeTarget ----------------------------------------------

        this.targetEndpointDefinitions = {};
        this.sourceEndpointDefinitions = {};

        var selectorFilter = function (evt, _el, selector, _instance, negate) {
            var t = evt.target || evt.srcElement, ok = false,
                sel = _instance.getSelector(_el, selector);
            for (var j = 0; j < sel.length; j++) {
                if (sel[j] === t) {
                    ok = true;
                    break;
                }
            }
            return negate ? !ok : ok;
        };

        var _makeElementDropHandler = function (elInfo, p, dropOptions, isSource, isTarget) {
            var proxyComponent = new jsPlumbUIComponent(p);
            var _drop = p._jsPlumb.EndpointDropHandler({
                jsPlumb: _currentInstance,
                enabled: function () {
                    return elInfo.def.enabled;
                },
                isFull: function () {
                    var targetCount = _currentInstance.select({target: elInfo.id}).length;
                    return elInfo.def.maxConnections > 0 && targetCount >= elInfo.def.maxConnections;
                },
                element: elInfo.el,
                elementId: elInfo.id,
                isSource: isSource,
                isTarget: isTarget,
                addClass: function (clazz) {
                    _currentInstance.addClass(elInfo.el, clazz);
                },
                removeClass: function (clazz) {
                    _currentInstance.removeClass(elInfo.el, clazz);
                },
                onDrop: function (jpc) {
                    var source = jpc.endpoints[0];
                    source.anchor.locked = false;
                },
                isDropAllowed: function () {
                    return proxyComponent.isDropAllowed.apply(proxyComponent, arguments);
                },
                isRedrop:function(jpc) {
                    return (jpc.suspendedElement != null && jpc.suspendedEndpoint != null && jpc.suspendedEndpoint.element === elInfo.el);
                },
                getEndpoint: function (jpc) {

                    // make a new Endpoint for the target, or get it from the cache if uniqueEndpoint
                    // is set. if its a redrop the new endpoint will be immediately cleaned up.

                    var newEndpoint = elInfo.def.endpoint;

                    // if no cached endpoint, or there was one but it has been cleaned up
                    // (ie. detached), create a new one
                    if (newEndpoint == null || newEndpoint._jsPlumb == null) {
                        var eps = _currentInstance.deriveEndpointAndAnchorSpec(jpc.getType().join(" "), true);
                        var pp = eps.endpoints ? root.jsPlumb.extend(p, {
                            endpoint:elInfo.def.def.endpoint || eps.endpoints[1]
                        }) :p;
                        if (eps.anchors) {
                            pp = root.jsPlumb.extend(pp, {
                                anchor:elInfo.def.def.anchor || eps.anchors[1]
                            });
                        }
                        newEndpoint = _currentInstance.addEndpoint(elInfo.el, pp);
                        newEndpoint._mtNew = true;
                    }

                    if (p.uniqueEndpoint) {
                        elInfo.def.endpoint = newEndpoint;
                    }

                    newEndpoint.setDeleteOnEmpty(true);

                    // if connection is detachable, init the new endpoint to be draggable, to support that happening.
                    if (jpc.isDetachable()) {
                        newEndpoint.initDraggable();
                    }

                    // if the anchor has a 'positionFinder' set, then delegate to that function to find
                    // out where to locate the anchor.
                    if (newEndpoint.anchor.positionFinder != null) {
                        var dropPosition = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom()),
                            elPosition = _currentInstance.getOffset(elInfo.el),
                            elSize = _currentInstance.getSize(elInfo.el),
                            ap = dropPosition == null ? [0,0] : newEndpoint.anchor.positionFinder(dropPosition, elPosition, elSize, newEndpoint.anchor.constructorParams);

                        newEndpoint.anchor.x = ap[0];
                        newEndpoint.anchor.y = ap[1];
                        // now figure an orientation for it..kind of hard to know what to do actually. probably the best thing i can do is to
                        // support specifying an orientation in the anchor's spec. if one is not supplied then i will make the orientation
                        // be what will cause the most natural link to the source: it will be pointing at the source, but it needs to be
                        // specified in one axis only, and so how to make that choice? i think i will use whichever axis is the one in which
                        // the target is furthest away from the source.
                    }

                    return newEndpoint;
                },
                maybeCleanup: function (ep) {
                    if (ep._mtNew && ep.connections.length === 0) {
                        _currentInstance.deleteObject({endpoint: ep});
                    }
                    else {
                        delete ep._mtNew;
                    }
                }
            });

            // wrap drop events as needed and initialise droppable
            var dropEvent = root.jsPlumb.dragEvents.drop;
            dropOptions.scope = dropOptions.scope || (p.scope || _currentInstance.Defaults.Scope);
            dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], _drop, true);
            dropOptions.rank = p.rank || 0;

            // if target, return true from the over event. this will cause katavorio to stop setting drops to hover
            // if multipleDrop is set to false.
            if (isTarget) {
                dropOptions[root.jsPlumb.dragEvents.over] = function () { return true; };
            }

            // vanilla jsplumb only
            if (p.allowLoopback === false) {
                dropOptions.canDrop = function (_drag) {
                    var de = _drag.getDragElement()._jsPlumbRelatedElement;
                    return de !== elInfo.el;
                };
            }
            _currentInstance.initDroppable(elInfo.el, dropOptions, "internal");

            return _drop;

        };

        // see API docs
        this.makeTarget = function (el, params, referenceParams) {

            // put jsplumb ref into params without altering the params passed in
            var p = root.jsPlumb.extend({_jsPlumb: this}, referenceParams);
            root.jsPlumb.extend(p, params);

            var maxConnections = p.maxConnections || -1,

                _doOne = function (el) {

                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    // decode the info for this element (id and element)
                    var elInfo = _info(el),
                        elid = elInfo.id,
                        dropOptions = root.jsPlumb.extend({}, p.dropOptions || {}),
                        type = p.connectionType || "default";

                    this.targetEndpointDefinitions[elid] = this.targetEndpointDefinitions[elid] || {};

                    _ensureContainer(elid);

                    // if this is a group and the user has not mandated a rank, set to -1 so that Nodes takes
                    // precedence.
                    if (elInfo.el._isJsPlumbGroup && dropOptions.rank == null) {
                        dropOptions.rank = -1;
                    }

                    // store the definition
                    var _def = {
                        def: root.jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };

                    if (p.createEndpoint) {
                        _def.uniqueEndpoint = true;
                        _def.endpoint = _currentInstance.addEndpoint(el, _def.def);
                        _def.endpoint.setDeleteOnEmpty(false);
                    }

                    elInfo.def = _def;
                    this.targetEndpointDefinitions[elid][type] = _def;
                    _makeElementDropHandler(elInfo, p, dropOptions, p.isSource === true, true);
                    // stash the definition on the drop
                    elInfo.el._katavorioDrop[elInfo.el._katavorioDrop.length - 1].targetDef = _def;

                }.bind(this);

            // make an array if only given one element
            var inputs = el.length && el.constructor !== String ? el : [ el ];

            // register each one in the list.
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(inputs[i]);
            }

            return this;
        };

        // see api docs
        this.unmakeTarget = function (el, doNotClearArrays) {
            var info = _info(el);
            _currentInstance.destroyDroppable(info.el, "internal");
            if (!doNotClearArrays) {
                delete this.targetEndpointDefinitions[info.id];
            }

            return this;
        };

        // see api docs
        this.makeSource = function (el, params, referenceParams) {
            var p = root.jsPlumb.extend({_jsPlumb: this}, referenceParams);
            root.jsPlumb.extend(p, params);
            var type = p.connectionType || "default";
            var aae = _currentInstance.deriveEndpointAndAnchorSpec(type);
            p.endpoint = p.endpoint || aae.endpoints[0];
            p.anchor = p.anchor || aae.anchors[0];
            var maxConnections = p.maxConnections || -1,
                onMaxConnections = p.onMaxConnections,
                _doOne = function (elInfo) {
                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    var elid = elInfo.id,
                        _del = this.getElement(elInfo.el);

                    this.sourceEndpointDefinitions[elid] = this.sourceEndpointDefinitions[elid] || {};
                    _ensureContainer(elid);

                    var _def = {
                        def:root.jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };

                    if (p.createEndpoint) {
                        _def.uniqueEndpoint = true;
                        _def.endpoint = _currentInstance.addEndpoint(el, _def.def);
                        _def.endpoint.setDeleteOnEmpty(false);
                    }

                    this.sourceEndpointDefinitions[elid][type] = _def;
                    elInfo.def = _def;

                    var stopEvent = root.jsPlumb.dragEvents.stop,
                        dragEvent = root.jsPlumb.dragEvents.drag,
                        dragOptions = root.jsPlumb.extend({ }, p.dragOptions || {}),
                        existingDrag = dragOptions.drag,
                        existingStop = dragOptions.stop,
                        ep = null,
                        endpointAddedButNoDragYet = false;

                    // set scope if its not set in dragOptions but was passed in in params
                    dragOptions.scope = dragOptions.scope || p.scope;

                    dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], function () {
                        if (existingDrag) {
                            existingDrag.apply(this, arguments);
                        }
                        endpointAddedButNoDragYet = false;
                    });

                    dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], function () {

                        if (existingStop) {
                            existingStop.apply(this, arguments);
                        }
                        this.currentlyDragging = false;
                        if (ep._jsPlumb != null) { // if not cleaned up...

                            // reset the anchor to the anchor that was initially provided. the one we were using to drag
                            // the connection was just a placeholder that was located at the place the user pressed the
                            // mouse button to initiate the drag.
                            var anchorDef = p.anchor || this.Defaults.Anchor,
                                oldAnchor = ep.anchor,
                                oldConnection = ep.connections[0];

                            var    newAnchor = this.makeAnchor(anchorDef, elid, this),
                                _el = ep.element;

                            // if the anchor has a 'positionFinder' set, then delegate to that function to find
                            // out where to locate the anchor. issue 117.
                            if (newAnchor.positionFinder != null) {
                                var elPosition = _currentInstance.getOffset(_el),
                                    elSize = this.getSize(_el),
                                    dropPosition = { left: elPosition.left + (oldAnchor.x * elSize[0]), top: elPosition.top + (oldAnchor.y * elSize[1]) },
                                    ap = newAnchor.positionFinder(dropPosition, elPosition, elSize, newAnchor.constructorParams);

                                newAnchor.x = ap[0];
                                newAnchor.y = ap[1];
                            }

                            ep.setAnchor(newAnchor, true);
                            ep.repaint();
                            this.repaint(ep.elementId);
                            if (oldConnection != null) {
                                this.repaint(oldConnection.targetId);
                            }
                        }
                    }.bind(this));

                    // when the user presses the mouse, add an Endpoint, if we are enabled.
                    var mouseDownListener = function (e) {
                        // on right mouse button, abort.
                        if (e.which === 3 || e.button === 2) {
                            return;
                        }

                        elid = this.getId(this.getElement(elInfo.el)); // elid might have changed since this method was called to configure the element.

                        // TODO store def on element.
                        var def = this.sourceEndpointDefinitions[elid][type];

                        // if disabled, return.
                        if (!def.enabled) {
                            return;
                        }

                        // if a filter was given, run it, and return if it says no.
                        if (p.filter) {
                            var r = _ju.isString(p.filter) ? selectorFilter(e, elInfo.el, p.filter, this, p.filterExclude) : p.filter(e, elInfo.el);
                            if (r === false) {
                                return;
                            }
                        }

                        // if maxConnections reached
                        var sourceCount = this.select({source: elid}).length;
                        if (def.maxConnections >= 0 && (sourceCount >= def.maxConnections)) {
                            if (onMaxConnections) {
                                onMaxConnections({
                                    element: elInfo.el,
                                    maxConnections: maxConnections
                                }, e);
                            }
                            return false;
                        }

                        // find the position on the element at which the mouse was pressed; this is where the endpoint
                        // will be located.
                        var elxy = root.jsPlumb.getPositionOnElement(e, _del, _zoom);

                        // we need to override the anchor in here, and force 'isSource', but we don't want to mess with
                        // the params passed in, because after a connection is established we're going to reset the endpoint
                        // to have the anchor we were given.
                        var tempEndpointParams = {};
                        root.jsPlumb.extend(tempEndpointParams, def.def);
                        tempEndpointParams.isTemporarySource = true;
                        tempEndpointParams.anchor = [ elxy[0], elxy[1] , 0, 0];
                        tempEndpointParams.dragOptions = dragOptions;

                        if (def.def.scope) {
                            tempEndpointParams.scope = def.def.scope;
                        }

                        ep = this.addEndpoint(elid, tempEndpointParams);
                        endpointAddedButNoDragYet = true;
                        ep.setDeleteOnEmpty(true);

                        // if unique endpoint and it's already been created, push it onto the endpoint we create. at the end
                        // of a successful connection we'll switch to that endpoint.
                        // TODO this is the same code as the programmatic endpoints create on line 1050 ish
                        if (def.uniqueEndpoint) {
                            if (!def.endpoint) {
                                def.endpoint = ep;
                                ep.setDeleteOnEmpty(false);
                            }
                            else {
                                ep.finalEndpoint = def.endpoint;
                            }
                        }

                        var _delTempEndpoint = function () {
                            // this mouseup event is fired only if no dragging occurred, by jquery and yui, but for mootools
                            // it is fired even if dragging has occurred, in which case we would blow away a perfectly
                            // legitimate endpoint, were it not for this check.  the flag is set after adding an
                            // endpoint and cleared in a drag listener we set in the dragOptions above.
                            _currentInstance.off(ep.canvas, "mouseup", _delTempEndpoint);
                            _currentInstance.off(elInfo.el, "mouseup", _delTempEndpoint);
                            if (endpointAddedButNoDragYet) {
                                endpointAddedButNoDragYet = false;
                                _currentInstance.deleteEndpoint(ep);
                            }
                        };

                        _currentInstance.on(ep.canvas, "mouseup", _delTempEndpoint);
                        _currentInstance.on(elInfo.el, "mouseup", _delTempEndpoint);

                        // optionally check for attributes to extract from the source element
                        var payload = {};
                        if (def.def.extract) {
                            for (var att in def.def.extract) {
                                var v = (e.srcElement || e.target).getAttribute(att);
                                if (v) {
                                    payload[def.def.extract[att]] = v;
                                }
                            }
                        }

                        // and then trigger its mousedown event, which will kick off a drag, which will start dragging
                        // a new connection from this endpoint.
                        _currentInstance.trigger(ep.canvas, "mousedown", e, payload);

                        _ju.consume(e);

                    }.bind(this);

                    this.on(elInfo.el, "mousedown", mouseDownListener);
                    _def.trigger = mouseDownListener;

                    // if a filter was provided, set it as a dragFilter on the element,
                    // to prevent the element drag function from kicking in when we want to
                    // drag a new connection
                    if (p.filter && (_ju.isString(p.filter) || _ju.isFunction(p.filter))) {
                        _currentInstance.setDragFilter(elInfo.el, p.filter);
                    }

                    var dropOptions = root.jsPlumb.extend({}, p.dropOptions || {});

                    _makeElementDropHandler(elInfo, p, dropOptions, true, p.isTarget === true);

                }.bind(this);

            var inputs = el.length && el.constructor !== String ? el : [ el ];
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(_info(inputs[i]));
            }

            return this;
        };

        // see api docs
        this.unmakeSource = function (el, connectionType, doNotClearArrays) {
            var info = _info(el);
            _currentInstance.destroyDroppable(info.el, "internal");
            var eldefs = this.sourceEndpointDefinitions[info.id];
            if (eldefs) {
                for (var def in eldefs) {
                    if (connectionType == null || connectionType === def) {
                        var mouseDownListener = eldefs[def].trigger;
                        if (mouseDownListener) {
                            _currentInstance.off(info.el, "mousedown", mouseDownListener);
                        }
                        if (!doNotClearArrays) {
                            delete this.sourceEndpointDefinitions[info.id][def];
                        }
                    }
                }
            }

            return this;
        };

        // see api docs
        this.unmakeEverySource = function () {
            for (var i in this.sourceEndpointDefinitions) {
                _currentInstance.unmakeSource(i, null, true);
            }

            this.sourceEndpointDefinitions = {};
            return this;
        };

        var _getScope = function (el, types, connectionType) {
            types = _ju.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) {
                    return eldefs[connectionType].def.scope || this.Defaults.Scope;
                }
            }
        }.bind(this);

        var _setScope = function (el, scope, types, connectionType) {
            types = _ju.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) {
                    eldefs[connectionType].def.scope = scope;
                }
            }

        }.bind(this);

        this.getScope = function (el, scope) {
            return _getScope(el, [ "sourceEndpointDefinitions", "targetEndpointDefinitions" ]);
        };
        this.getSourceScope = function (el) {
            return _getScope(el, "sourceEndpointDefinitions");
        };
        this.getTargetScope = function (el) {
            return _getScope(el, "targetEndpointDefinitions");
        };
        this.setScope = function (el, scope, connectionType) {
            this.setSourceScope(el, scope, connectionType);
            this.setTargetScope(el, scope, connectionType);
        };
        this.setSourceScope = function (el, scope, connectionType) {
            _setScope(el, scope, "sourceEndpointDefinitions", connectionType);
            // we get the source scope during the mousedown event, but we also want to set this.
            this.setDragScope(el, scope);
        };
        this.setTargetScope = function (el, scope, connectionType) {
            _setScope(el, scope, "targetEndpointDefinitions", connectionType);
            this.setDropScope(el, scope);
        };

        // see api docs
        this.unmakeEveryTarget = function () {
            for (var i in this.targetEndpointDefinitions) {
                _currentInstance.unmakeTarget(i, true);
            }

            this.targetEndpointDefinitions = {};
            return this;
        };

        // does the work of setting a source enabled or disabled.
        var _setEnabled = function (type, el, state, toggle, connectionType) {
            var a = type === "source" ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions,
                originalState, info, newState;

            connectionType = connectionType || "default";

            // a selector or an array
            if (el.length && !_ju.isString(el)) {
                originalState = [];
                for (var i = 0, ii = el.length; i < ii; i++) {
                    info = _info(el[i]);
                    if (a[info.id] && a[info.id][connectionType]) {
                        originalState[i] = a[info.id][connectionType].enabled;
                        newState = toggle ? !originalState[i] : state;
                        a[info.id][connectionType].enabled = newState;
                        _currentInstance[newState ? "removeClass" : "addClass"](info.el, "jtk-" + type + "-disabled");
                    }
                }
            }
            // otherwise a DOM element or a String ID.
            else {
                info = _info(el);
                var id = info.id;
                if (a[id] && a[id][connectionType]) {
                    originalState = a[id][connectionType].enabled;
                    newState = toggle ? !originalState : state;
                    a[id][connectionType].enabled = newState;
                    _currentInstance[newState ? "removeClass" : "addClass"](info.el, "jtk-" + type + "-disabled");
                }
            }
            return originalState;
        }.bind(this);

        var _first = function (el, fn) {
            if (el != null) {
                if (_ju.isString(el) || !el.length) {
                    return fn.apply(this, [el]);
                } else if (el.length) {
                    return fn.apply(this, [el[0]]);
                }
            }

        }.bind(this);

        this.toggleSourceEnabled = function (el, connectionType) {
            _setEnabled("source", el, null, true, connectionType);
            return this.isSourceEnabled(el, connectionType);
        };

        this.setSourceEnabled = function (el, state, connectionType) {
            return _setEnabled("source", el, state, null, connectionType);
        };
        this.isSource = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.sourceEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isSourceEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var sep = this.sourceEndpointDefinitions[_info(_el).id];
                return sep && sep[connectionType] && sep[connectionType].enabled === true;
            }.bind(this));
        };

        this.toggleTargetEnabled = function (el, connectionType) {
            _setEnabled("target", el, null, true, connectionType);
            return this.isTargetEnabled(el, connectionType);
        };

        this.isTarget = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.targetEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isTargetEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var tep = this.targetEndpointDefinitions[_info(_el).id];
                return tep && tep[connectionType] && tep[connectionType].enabled === true;
            }.bind(this));
        };
        this.setTargetEnabled = function (el, state, connectionType) {
            return _setEnabled("target", el, state, null, connectionType);
        };

// --------------------- end makeSource/makeTarget ----------------------------------------------

        this.ready = function (fn) {
            _currentInstance.bind("ready", fn);
        };

        var _elEach = function(el, fn) {
            // support both lists...
            if (typeof el === 'object' && el.length) {
                for (var i = 0, ii = el.length; i < ii; i++) {
                    fn(el[i]);
                }
            }
            else {// ...and single strings or elements.
                fn(el);
            }

            return _currentInstance;
        };

        // repaint some element's endpoints and connections
        this.repaint = function (el, ui, timestamp) {
            return _elEach(el, function(_el) {
                _draw(_el, ui, timestamp);
            });
        };

        this.revalidate = function (el, timestamp, isIdAlready) {
            var elId = isIdAlready ? el : _currentInstance.getId(el);
            _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp:timestamp });
            var dm = _currentInstance.getDragManager();
            if (dm) {
                dm.updateOffsets(elId);
            }
            return _draw(el, null, timestamp);
        };

        // repaint every endpoint and connection.
        this.repaintEverything = function () {
            // TODO this timestamp causes continuous anchors to not repaint properly.
            // fix this. do not just take out the timestamp. it runs a lot faster with
            // the timestamp included.
            var timestamp = jsPlumbUtil.uuid(), elId;

            for (elId in endpointsByElement) {
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp: timestamp });
            }

            for (elId in endpointsByElement) {
                _draw(elId, null, timestamp);
            }

            return this;
        };

        this.removeAllEndpoints = function (el, recurse, affectedElements) {
            affectedElements = affectedElements || [];
            var _one = function (_el) {
                var info = _info(_el),
                    ebe = endpointsByElement[info.id],
                    i, ii;

                if (ebe) {
                    affectedElements.push(info);
                    for (i = 0, ii = ebe.length; i < ii; i++) {
                        _currentInstance.deleteEndpoint(ebe[i], false);
                    }
                }
                delete endpointsByElement[info.id];

                if (recurse) {
                    if (info.el && info.el.nodeType !== 3 && info.el.nodeType !== 8) {
                        for (i = 0, ii = info.el.childNodes.length; i < ii; i++) {
                            _one(info.el.childNodes[i]);
                        }
                    }
                }

            };
            _one(el);
            return this;
        };

        var _doRemove = function(info, affectedElements) {
            _currentInstance.removeAllEndpoints(info.id, true, affectedElements);
            var dm = _currentInstance.getDragManager();
            var _one = function(_info) {

                if (dm) {
                    dm.elementRemoved(_info.id);
                }
                _currentInstance.router.elementRemoved(_info.id);

                if (_currentInstance.isSource(_info.el)) {
                    _currentInstance.unmakeSource(_info.el);
                }
                if (_currentInstance.isTarget(_info.el)) {
                    _currentInstance.unmakeTarget(_info.el);
                }
                _currentInstance.destroyDraggable(_info.el);
                _currentInstance.destroyDroppable(_info.el);


                delete _currentInstance.floatingConnections[_info.id];
                delete managedElements[_info.id];
                delete offsets[_info.id];
                if (_info.el) {
                    _currentInstance.removeElement(_info.el);
                    _info.el._jsPlumb = null;
                }
            };

            // remove all affected child elements
            for (var ae = 1; ae < affectedElements.length; ae++) {
                _one(affectedElements[ae]);
            }
            // and always remove the requested one from the dom.
            _one(info);
        };

        /**
         * Remove the given element, including cleaning up all endpoints registered for it.
         * This is exposed in the public API but also used internally by jsPlumb when removing the
         * element associated with a connection drag.
         */
        this.remove = function (el, doNotRepaint) {
            var info = _info(el), affectedElements = [];
            if (info.text && info.el.parentNode) {
                info.el.parentNode.removeChild(info.el);
            }
            else if (info.id) {
                _currentInstance.batch(function () {
                    _doRemove(info, affectedElements);
                }, doNotRepaint === true);
            }
            return _currentInstance;
        };

        this.empty = function (el, doNotRepaint) {
            var affectedElements = [];
            var _one = function(el, dontRemoveFocus) {
                var info = _info(el);
                if (info.text) {
                    info.el.parentNode.removeChild(info.el);
                }
                else if (info.el) {
                    while(info.el.childNodes.length > 0) {
                        _one(info.el.childNodes[0]);
                    }
                    if (!dontRemoveFocus) {
                        _doRemove(info, affectedElements);
                    }
                }
            };

            _currentInstance.batch(function() {
                _one(el, true);
            }, doNotRepaint === false);

            return _currentInstance;
        };

        this.reset = function (doNotUnbindInstanceEventListeners) {
            _currentInstance.silently(function() {
                _hoverSuspended = false;
                _currentInstance.removeAllGroups();
                _currentInstance.removeGroupManager();
                _currentInstance.deleteEveryEndpoint();
                if (!doNotUnbindInstanceEventListeners) {
                    _currentInstance.unbind();
                }
                this.targetEndpointDefinitions = {};
                this.sourceEndpointDefinitions = {};
                connections.length = 0;
                if (this.doReset) {
                    this.doReset();
                }
            }.bind(this));
        };

        this.destroy = function() {
            this.reset();
            _container = null;
            _containerDelegations = null;
        };

        var _clearObject = function (obj) {
            if (obj.canvas && obj.canvas.parentNode) {
                obj.canvas.parentNode.removeChild(obj.canvas);
            }
            obj.cleanup();
            obj.destroy();
        };

        this.clear = function () {
            _currentInstance.select().each(_clearObject);
            _currentInstance.selectEndpoints().each(_clearObject);

            endpointsByElement = {};
            endpointsByUUID = {};
        };

        this.setDefaultScope = function (scope) {
            DEFAULT_SCOPE = scope;
            return _currentInstance;
        };

        this.deriveEndpointAndAnchorSpec = function(type, dontPrependDefault) {
            var bits = ((dontPrependDefault ? "" : "default ") + type).split(/[\s]/), eps = null, ep = null, a = null, as = null;
            for (var i = 0; i < bits.length; i++) {
                var _t = _currentInstance.getType(bits[i], "connection");
                if (_t) {
                    if (_t.endpoints) {
                        eps = _t.endpoints;
                    }
                    if (_t.endpoint) {
                        ep = _t.endpoint;
                    }
                    if (_t.anchors) {
                        as = _t.anchors;
                    }
                    if (_t.anchor) {
                        a = _t.anchor;
                    }
                }
            }
            return { endpoints: eps ? eps : [ ep, ep ], anchors: as ? as : [a, a ]};
        };

        // sets the id of some element, changing whatever we need to to keep track.
        this.setId = function (el, newId, doNotSetAttribute) {
            //
            var id;

            if (_ju.isString(el)) {
                id = el;
            }
            else {
                el = this.getElement(el);
                id = this.getId(el);
            }

            var sConns = this.getConnections({source: id, scope: '*'}, true),
                tConns = this.getConnections({target: id, scope: '*'}, true);

            newId = "" + newId;

            if (!doNotSetAttribute) {
                el = this.getElement(id);
                this.setAttribute(el, "id", newId);
            }
            else {
                el = this.getElement(newId);
            }

            endpointsByElement[newId] = endpointsByElement[id] || [];
            for (var i = 0, ii = endpointsByElement[newId].length; i < ii; i++) {
                endpointsByElement[newId][i].setElementId(newId);
                endpointsByElement[newId][i].setReferenceElement(el);
            }
            delete endpointsByElement[id];

            this.sourceEndpointDefinitions[newId] = this.sourceEndpointDefinitions[id];
            delete this.sourceEndpointDefinitions[id];
            this.targetEndpointDefinitions[newId] = this.targetEndpointDefinitions[id];
            delete this.targetEndpointDefinitions[id];

            this.router.changeId(id, newId);
            var dm = this.getDragManager();
            if (dm) {
                dm.changeId(id, newId);
            }
            managedElements[newId] = managedElements[id];
            delete managedElements[id];

            var _conns = function (list, epIdx, type) {
                for (var i = 0, ii = list.length; i < ii; i++) {
                    list[i].endpoints[epIdx].setElementId(newId);
                    list[i].endpoints[epIdx].setReferenceElement(el);
                    list[i][type + "Id"] = newId;
                    list[i][type] = el;
                }
            };
            _conns(sConns, 0, "source");
            _conns(tConns, 1, "target");

            this.repaint(newId);
        };

        this.setDebugLog = function (debugLog) {
            log = debugLog;
        };

        this.setSuspendDrawing = function (val, repaintAfterwards) {
            var curVal = _suspendDrawing;
            _suspendDrawing = val;
            if (val) {
                _suspendedAt = new Date().getTime();
            } else {
                _suspendedAt = null;
            }
            if (repaintAfterwards) {
                this.repaintEverything();
            }
            return curVal;
        };

        // returns whether or not drawing is currently suspended.
        this.isSuspendDrawing = function () {
            return _suspendDrawing;
        };

        // return timestamp for when drawing was suspended.
        this.getSuspendedAt = function () {
            return _suspendedAt;
        };

        this.batch = function (fn, doNotRepaintAfterwards) {
            var _wasSuspended = this.isSuspendDrawing();
            if (!_wasSuspended) {
                this.setSuspendDrawing(true);
            }
            try {
                fn();
            }
            catch (e) {
                _ju.log("Function run while suspended failed", e);
            }
            if (!_wasSuspended) {
                this.setSuspendDrawing(false, !doNotRepaintAfterwards);
            }
        };

        this.doWhileSuspended = this.batch;

        this.getCachedData = _getCachedData;
        this.show = function (el, changeEndpoints) {
            _setVisible(el, "block", changeEndpoints);
            return _currentInstance;
        };

        // TODO: update this method to return the current state.
        this.toggleVisible = _toggleVisible;
        this.addListener = this.bind;

        var floatingConnections = [];
        this.registerFloatingConnection = function(info, conn, ep) {
            floatingConnections[info.id] = conn;
            // only register for the target endpoint; we will not be dragging the source at any time
            // before this connection is either discarded or made into a permanent connection.
            _ju.addToList(endpointsByElement, info.id, ep);
        };
        this.getFloatingConnectionFor = function(id) {
            return floatingConnections[id];
        };

        this.listManager = new root.jsPlumbListManager(this, this.Defaults.ListStyle);
    };

    _ju.extend(root.jsPlumbInstance, _ju.EventGenerator, {
        setAttribute: function (el, a, v) {
            this.setAttribute(el, a, v);
        },
        getAttribute: function (el, a) {
            return this.getAttribute(root.jsPlumb.getElement(el), a);
        },
        convertToFullOverlaySpec: function(spec) {
            if (_ju.isString(spec)) {
                spec = [ spec, { } ];
            }
            spec[1].id = spec[1].id || _ju.uuid();
            return spec;
        },
        registerConnectionType: function (id, type) {
            this._connectionTypes[id] = root.jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._connectionTypes[id].overlays = to;
            }
        },
        registerConnectionTypes: function (types) {
            for (var i in types) {
                this.registerConnectionType(i, types[i]);
            }
        },
        registerEndpointType: function (id, type) {
            this._endpointTypes[id] = root.jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._endpointTypes[id].overlays = to;
            }
        },
        registerEndpointTypes: function (types) {
            for (var i in types) {
                this.registerEndpointType(i, types[i]);
            }
        },
        getType: function (id, typeDescriptor) {
            return typeDescriptor === "connection" ? this._connectionTypes[id] : this._endpointTypes[id];
        },
        setIdChanged: function (oldId, newId) {
            this.setId(oldId, newId, true);
        },
        // set parent: change the parent for some node and update all the registrations we need to.
        setParent: function (el, newParent) {
            var _dom = this.getElement(el),
                _id = this.getId(_dom),
                _pdom = this.getElement(newParent),
                _pid = this.getId(_pdom),
                dm = this.getDragManager();

            _dom.parentNode.removeChild(_dom);
            _pdom.appendChild(_dom);
            if (dm) {
                dm.setParent(_dom, _id, _pdom, _pid);
            }
        },
        extend: function (o1, o2, names) {
            var i;
            if (names) {
                for (i = 0; i < names.length; i++) {
                    o1[names[i]] = o2[names[i]];
                }
            }
            else {
                for (i in o2) {
                    o1[i] = o2[i];
                }
            }

            return o1;
        },
        floatingConnections: {},
        getFloatingAnchorIndex: function (jpc) {
            return jpc.endpoints[0].isFloating() ? 0 : jpc.endpoints[1].isFloating() ? 1 : -1;
        },
        proxyConnection :function(connection, index, proxyEl, proxyElId, endpointGenerator, anchorGenerator) {
            var proxyEp,
                originalElementId = connection.endpoints[index].elementId,
                originalEndpoint = connection.endpoints[index];

            connection.proxies = connection.proxies || [];
            if(connection.proxies[index]) {
                proxyEp = connection.proxies[index].ep;
            }else {
                proxyEp = this.addEndpoint(proxyEl, {
                    endpoint:endpointGenerator(connection, index),
                    anchor:anchorGenerator(connection, index),
                    parameters:{
                        isProxyEndpoint:true
                    }
                });
            }
            proxyEp.setDeleteOnEmpty(true);

            // for this index, stash proxy info: the new EP, the original EP.
            connection.proxies[index] = { ep:proxyEp, originalEp: originalEndpoint };

            // and advise the anchor manager
            if (index === 0) {
                this.router.sourceOrTargetChanged(originalElementId, proxyElId, connection, proxyEl, 0);
            }
            else {
                this.router.sourceOrTargetChanged(originalElementId, proxyElId, connection, proxyEl, 1);
            }

            // detach the original EP from the connection.
            originalEndpoint.detachFromConnection(connection, null, true);

            // set the proxy as the new ep
            proxyEp.connections = [ connection ];
            connection.endpoints[index] = proxyEp;

            originalEndpoint.setVisible(false);

            connection.setVisible(true);

            this.revalidate(proxyEl);
        },
        unproxyConnection : function(connection, index, proxyElId) {
            // if connection cleaned up, no proxies, or none for this end of the connection, abort.
            if (connection._jsPlumb == null || connection.proxies == null || connection.proxies[index] == null) {
                return;
            }

            var originalElement = connection.proxies[index].originalEp.element,
                originalElementId = connection.proxies[index].originalEp.elementId;

            connection.endpoints[index] = connection.proxies[index].originalEp;
            // and advise the anchor manager
            if (index === 0) {
                // TODO why are there two differently named methods? Why is there not one method that says "some end of this
                // connection changed (you give the index), and here's the new element and element id."
                this.router.sourceOrTargetChanged(proxyElId, originalElementId, connection, originalElement, 0);
            }
            else {
                this.router.sourceOrTargetChanged(proxyElId, originalElementId, connection, originalElement, 1);
            }

            // detach the proxy EP from the connection (which will cause it to be removed as we no longer need it)
            connection.proxies[index].ep.detachFromConnection(connection, null);

            connection.proxies[index].originalEp.addConnection(connection);
            if(connection.isVisible()) {
                connection.proxies[index].originalEp.setVisible(true);
            }

            // cleanup
            delete connection.proxies[index];
        }
    });

// --------------------- static instance + module registration -------------------------------------------

// create static instance and assign to window if window exists.
    var jsPlumb = new jsPlumbInstance();
    // register on 'root' (lets us run on server or browser)
    root.jsPlumb = jsPlumb;
    // add 'getInstance' method to static instance
    jsPlumb.getInstance = function (_defaults, overrideFns) {
        var j = new jsPlumbInstance(_defaults);
        if (overrideFns) {
            for (var ovf in overrideFns) {
                j[ovf] = overrideFns[ovf];
            }
        }
        j.init();
        return j;
    };
    jsPlumb.each = function (spec, fn) {
        if (spec == null) {
            return;
        }
        if (typeof spec === "string") {
            fn(jsPlumb.getElement(spec));
        }
        else if (spec.length != null) {
            for (var i = 0; i < spec.length; i++) {
                fn(jsPlumb.getElement(spec[i]));
            }
        }
        else {
            fn(spec);
        } // assume it's an element.
    };

    // CommonJS
    {
        exports.jsPlumb = jsPlumb;
    }

// --------------------- end static instance + AMD registration -------------------------------------------

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function() {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // ------------------------------ BEGIN OverlayCapablejsPlumbUIComponent --------------------------------------------

    var _internalLabelOverlayId = "__label",
    // this is a shortcut helper method to let people add a label as
    // overlay.
        _makeLabelOverlay = function (component, params) {

            var _params = {
                    cssClass: params.cssClass,
                    labelStyle: component.labelStyle,
                    id: _internalLabelOverlayId,
                    component: component,
                    _jsPlumb: component._jsPlumb.instance  // TODO not necessary, since the instance can be accessed through the component.
                },
                mergedParams = _jp.extend(_params, params);

            return new _jp.Overlays[component._jsPlumb.instance.getRenderMode()].Label(mergedParams);
        },
        _processOverlay = function (component, o) {
            var _newOverlay = null;
            if (_ju.isArray(o)) {	// this is for the shorthand ["Arrow", { width:50 }] syntax
                // there's also a three arg version:
                // ["Arrow", { width:50 }, {location:0.7}]
                // which merges the 3rd arg into the 2nd.
                var type = o[0],
                // make a copy of the object so as not to mess up anyone else's reference...
                    p = _jp.extend({component: component, _jsPlumb: component._jsPlumb.instance}, o[1]);
                if (o.length === 3) {
                    _jp.extend(p, o[2]);
                }
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][type](p);
            } else if (o.constructor === String) {
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][o]({component: component, _jsPlumb: component._jsPlumb.instance});
            } else {
                _newOverlay = o;
            }

            _newOverlay.id = _newOverlay.id || _ju.uuid();
            component.cacheTypeItem("overlay", _newOverlay, _newOverlay.id);
            component._jsPlumb.overlays[_newOverlay.id] = _newOverlay;

            return _newOverlay;
        };

    _jp.OverlayCapableJsPlumbUIComponent = function (params) {

        root.jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.overlays = {};
        this._jsPlumb.overlayPositions = {};

        if (params.label) {
            this.getDefaultType().overlays[_internalLabelOverlayId] = ["Label", {
                label: params.label,
                location: params.labelLocation || this.defaultLabelLocation || 0.5,
                labelStyle: params.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
                id:_internalLabelOverlayId
            }];
        }

        this.setListenerComponent = function (c) {
            if (this._jsPlumb) {
                for (var i in this._jsPlumb.overlays) {
                    this._jsPlumb.overlays[i].setListenerComponent(c);
                }
            }
        };
    };

    _jp.OverlayCapableJsPlumbUIComponent.applyType = function (component, t) {
        if (t.overlays) {
            // loop through the ones in the type. if already present on the component,
            // dont remove or re-add.
            var keep = {}, i;

            for (i in t.overlays) {

                var existing = component._jsPlumb.overlays[t.overlays[i][1].id];
                if (existing) {
                    // maybe update from data, if there were parameterised values for instance.
                    existing.updateFrom(t.overlays[i][1]);
                    keep[t.overlays[i][1].id] = true;

                    existing.reattach(component._jsPlumb.instance, component);
                }
                else {
                    var c = component.getCachedTypeItem("overlay", t.overlays[i][1].id);
                    if (c != null) {
                        c.reattach(component._jsPlumb.instance, component);
                        c.setVisible(true);
                        // maybe update from data, if there were parameterised values for instance.
                        c.updateFrom(t.overlays[i][1]);
                        component._jsPlumb.overlays[c.id] = c;
                    }
                    else {
                        c = component.addOverlay(t.overlays[i], true);
                    }
                    keep[c.id] = true;
                }
            }

            // now loop through the full overlays and remove those that we dont want to keep
            for (i in component._jsPlumb.overlays) {
                if (keep[component._jsPlumb.overlays[i].id] == null) {
                    component.removeOverlay(component._jsPlumb.overlays[i].id, true); // remove overlay but dont clean it up.
                    // that would remove event listeners etc; overlays are never discarded by the types stuff, they are
                    // just detached/reattached.
                }
            }
        }
    };

    _ju.extend(_jp.OverlayCapableJsPlumbUIComponent, root.jsPlumbUIComponent, {

        setHover: function (hover, ignoreAttachedElements) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                for (var i in this._jsPlumb.overlays) {
                    this._jsPlumb.overlays[i][hover ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass);
                }
            }
        },
        addOverlay: function (overlay, doNotRepaint) {
            var o = _processOverlay(this, overlay);

            if (this.getData && o.type === "Label" && _ju.isArray(overlay)) {
                //
                // component data might contain label location - look for it here.
                var d = this.getData(), p = overlay[1];
                if (d) {
                    var locationAttribute = p.labelLocationAttribute || "labelLocation";
                    var loc = d ? d[locationAttribute] : null;

                    if (loc) {
                        o.loc = loc;
                    }
                }
            }

            if (!doNotRepaint) {
                this.repaint();
            }
            return o;
        },
        getOverlay: function (id) {
            return this._jsPlumb.overlays[id];
        },
        getOverlays: function () {
            return this._jsPlumb.overlays;
        },
        hideOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) {
                o.hide();
            }
        },
        hideOverlays: function () {
            for (var i in this._jsPlumb.overlays) {
                this._jsPlumb.overlays[i].hide();
            }
        },
        showOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) {
                o.show();
            }
        },
        showOverlays: function () {
            for (var i in this._jsPlumb.overlays) {
                this._jsPlumb.overlays[i].show();
            }
        },
        removeAllOverlays: function (doNotRepaint) {
            for (var i in this._jsPlumb.overlays) {
                if (this._jsPlumb.overlays[i].cleanup) {
                    this._jsPlumb.overlays[i].cleanup();
                }
            }

            this._jsPlumb.overlays = {};
            this._jsPlumb.overlayPositions = null;
            this._jsPlumb.overlayPlacements= {};
            if (!doNotRepaint) {
                this.repaint();
            }
        },
        removeOverlay: function (overlayId, dontCleanup) {
            var o = this._jsPlumb.overlays[overlayId];
            if (o) {
                o.setVisible(false);
                if (!dontCleanup && o.cleanup) {
                    o.cleanup();
                }
                delete this._jsPlumb.overlays[overlayId];
                if (this._jsPlumb.overlayPositions) {
                    delete this._jsPlumb.overlayPositions[overlayId];
                }

                if (this._jsPlumb.overlayPlacements) {
                    delete this._jsPlumb.overlayPlacements[overlayId];
                }
            }
        },
        removeOverlays: function () {
            for (var i = 0, j = arguments.length; i < j; i++) {
                this.removeOverlay(arguments[i]);
            }
        },
        moveParent: function (newParent) {
            if (this.bgCanvas) {
                this.bgCanvas.parentNode.removeChild(this.bgCanvas);
                newParent.appendChild(this.bgCanvas);
            }

            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
                newParent.appendChild(this.canvas);

                for (var i in this._jsPlumb.overlays) {
                    if (this._jsPlumb.overlays[i].isAppendedAtTopLevel) {
                        var el = this._jsPlumb.overlays[i].getElement();
                        el.parentNode.removeChild(el);
                        newParent.appendChild(el);
                    }
                }
            }
        },
        getLabel: function () {
            var lo = this.getOverlay(_internalLabelOverlayId);
            return lo != null ? lo.getLabel() : null;
        },
        getLabelOverlay: function () {
            return this.getOverlay(_internalLabelOverlayId);
        },
        setLabel: function (l) {
            var lo = this.getOverlay(_internalLabelOverlayId);
            if (!lo) {
                var params = l.constructor === String || l.constructor === Function ? { label: l } : l;
                lo = _makeLabelOverlay(this, params);
                this._jsPlumb.overlays[_internalLabelOverlayId] = lo;
            }
            else {
                if (l.constructor === String || l.constructor === Function) {
                    lo.setLabel(l);
                }
                else {
                    if (l.label) {
                        lo.setLabel(l.label);
                    }
                    if (l.location) {
                        lo.setLocation(l.location);
                    }
                }
            }

            if (!this._jsPlumb.instance.isSuspendDrawing()) {
                this.repaint();
            }
        },
        cleanup: function (force) {
            for (var i in this._jsPlumb.overlays) {
                this._jsPlumb.overlays[i].cleanup(force);
                this._jsPlumb.overlays[i].destroy(force);
            }
            if (force) {
                this._jsPlumb.overlays = {};
                this._jsPlumb.overlayPositions = null;
            }
        },
        setVisible: function (v) {
            this[v ? "showOverlays" : "hideOverlays"]();
        },
        setAbsoluteOverlayPosition: function (overlay, xy) {
            this._jsPlumb.overlayPositions[overlay.id] = xy;
        },
        getAbsoluteOverlayPosition: function (overlay) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[overlay.id] : null;
        },
        _clazzManip:function(action, clazz, dontUpdateOverlays) {
            if (!dontUpdateOverlays) {
                for (var i in this._jsPlumb.overlays) {
                    this._jsPlumb.overlays[i][action + "Class"](clazz);
                }
            }
        },
        addClass:function(clazz, dontUpdateOverlays) {
            this._clazzManip("add", clazz, dontUpdateOverlays);
        },
        removeClass:function(clazz, dontUpdateOverlays) {
            this._clazzManip("remove", clazz, dontUpdateOverlays);
        }
    });

// ------------------------------ END OverlayCapablejsPlumbUIComponent --------------------------------------------

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // create the drag handler for a connection
    var _makeConnectionDragHandler = function (endpoint, placeholder, _jsPlumb) {
        var stopped = false;
        return {
            drag: function () {
                if (stopped) {
                    stopped = false;
                    return true;
                }

                if (placeholder.element) {
                    var _ui = _jsPlumb.getUIPosition(arguments, _jsPlumb.getZoom());
                    if (_ui != null) {
                        _jsPlumb.setPosition(placeholder.element, _ui);
                    }
                    _jsPlumb.repaint(placeholder.element, _ui);
                    // always repaint the source endpoint, because only continuous/dynamic anchors cause the endpoint
                    // to be repainted, so static anchors need to be told (or the endpoint gets dragged around)
                    endpoint.paint({anchorPoint:endpoint.anchor.getCurrentLocation({element:endpoint})});
                }
            },
            stopDrag: function () {
                stopped = true;
            }
        };
    };

    // creates a placeholder div for dragging purposes, adds it, and pre-computes its offset.
    var _makeDraggablePlaceholder = function (placeholder, _jsPlumb, ipco, ips) {
        var n = _jsPlumb.createElement("div", { position : "absolute" });
        _jsPlumb.appendElement(n);
        var id = _jsPlumb.getId(n);
        _jsPlumb.setPosition(n, ipco);
        n.style.width = ips[0] + "px";
        n.style.height = ips[1] + "px";
        _jsPlumb.manage(id, n, true); // TRANSIENT MANAGE
        // create and assign an id, and initialize the offset.
        placeholder.id = id;
        placeholder.element = n;
    };

    // create a floating endpoint (for drag connections)
    var _makeFloatingEndpoint = function (paintStyle, referenceAnchor, endpoint, referenceCanvas, sourceElement, _jsPlumb, _newEndpoint, scope) {
        var floatingAnchor = new _jp.FloatingAnchor({ reference: referenceAnchor, referenceCanvas: referenceCanvas, jsPlumbInstance: _jsPlumb });
        return _newEndpoint({
            paintStyle: paintStyle,
            endpoint: endpoint,
            anchor: floatingAnchor,
            source: sourceElement,
            scope: scope
        });
    };

    var typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays",
        "connector", "connectionType", "connectorClass", "connectorHoverClass" ];

    // a helper function that tries to find a connection to the given element, and returns it if so. if elementWithPrecedence is null,
    // or no connection to it is found, we return the first connection in our list.
    var findConnectionToUseForDynamicAnchor = function (ep, elementWithPrecedence) {
        var idx = 0;
        if (elementWithPrecedence != null) {
            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId === elementWithPrecedence || ep.connections[i].targetId === elementWithPrecedence) {
                    idx = i;
                    break;
                }
            }
        }

        return ep.connections[idx];
    };

    _jp.Endpoint = function (params) {
        var _jsPlumb = params._jsPlumb,
            _newConnection = params.newConnection,
            _newEndpoint = params.newEndpoint;

        this.idPrefix = "_jsplumb_e_";
        this.defaultLabelLocation = [ 0.5, 0.5 ];
        this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

// TYPE

        this.appendToDefaultType({
            connectionType:params.connectionType,
            maxConnections: params.maxConnections == null ? this._jsPlumb.instance.Defaults.MaxConnections : params.maxConnections, // maximum number of connections this endpoint can be the source of.,
            paintStyle: params.endpointStyle || params.paintStyle || params.style || this._jsPlumb.instance.Defaults.EndpointStyle || _jp.Defaults.EndpointStyle,
            hoverPaintStyle: params.endpointHoverStyle || params.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || _jp.Defaults.EndpointHoverStyle,
            connectorStyle: params.connectorStyle,
            connectorHoverStyle: params.connectorHoverStyle,
            connectorClass: params.connectorClass,
            connectorHoverClass: params.connectorHoverClass,
            connectorOverlays: params.connectorOverlays,
            connector: params.connector,
            connectorTooltip: params.connectorTooltip
        });

// END TYPE

        this._jsPlumb.enabled = !(params.enabled === false);
        this._jsPlumb.visible = true;
        this.element = _jp.getElement(params.source);
        this._jsPlumb.uuid = params.uuid;
        this._jsPlumb.floatingEndpoint = null;
        if (this._jsPlumb.uuid) {
            params.endpointsByUUID[this._jsPlumb.uuid] = this;
        }
        this.elementId = params.elementId;
        this.dragProxy = params.dragProxy;

        this._jsPlumb.connectionCost = params.connectionCost;
        this._jsPlumb.connectionsDirected = params.connectionsDirected;
        this._jsPlumb.currentAnchorClass = "";
        this._jsPlumb.events = {};

        var deleteOnEmpty = params.deleteOnEmpty === true;
        this.setDeleteOnEmpty = function(d) {
            deleteOnEmpty = d;
        };

        var _updateAnchorClass = function () {
            // stash old, get new
            var oldAnchorClass = _jsPlumb.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            var anchorClass = _jsPlumb.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");

            this.removeClass(oldAnchorClass);
            this.addClass(anchorClass);
            // add and remove at the same time to reduce the number of reflows.
            _jp.updateClasses(this.element, anchorClass, oldAnchorClass);
        }.bind(this);

        this.prepareAnchor = function(anchorParams) {
            var a = this._jsPlumb.instance.makeAnchor(anchorParams, this.elementId, _jsPlumb);
            a.bind("anchorChanged", function (currentAnchor) {
                this.fire("anchorChanged", {endpoint: this, anchor: currentAnchor});
                _updateAnchorClass();
            }.bind(this));
            return a;
        };

        this.setPreparedAnchor = function(anchor, doNotRepaint) {
            this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId);
            this.anchor = anchor;
            _updateAnchorClass();

            if (!doNotRepaint) {
                this._jsPlumb.instance.repaint(this.elementId);
            }

            return this;
        };

        this.setAnchor = function (anchorParams, doNotRepaint) {
            var a = this.prepareAnchor(anchorParams);
            this.setPreparedAnchor(a, doNotRepaint);
            return this;
        };

        var internalHover = function (state) {
            if (this.connections.length > 0) {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].setHover(state, false);
                }
            }
            else {
                this.setHover(state);
            }
        }.bind(this);

        this.bind("mouseover", function () {
            internalHover(true);
        });
        this.bind("mouseout", function () {
            internalHover(false);
        });

        // ANCHOR MANAGER
        if (!params._transient) { // in place copies, for example, are transient.  they will never need to be retrieved during a paint cycle, because they dont move, and then they are deleted.
            this._jsPlumb.instance.router.addEndpoint(this, this.elementId);
        }

        this.prepareEndpoint = function(ep, typeId) {
            var _e = function (t, p) {
                var rm = _jsPlumb.getRenderMode();
                if (_jp.Endpoints[rm][t]) {
                    return new _jp.Endpoints[rm][t](p);
                }
                if (!_jsPlumb.Defaults.DoNotThrowErrors) {
                    throw { msg: "jsPlumb: unknown endpoint type '" + t + "'" };
                }
            };

            var endpointArgs = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: params.cssClass,
                container: params.container,
                tooltip: params.tooltip,
                connectorTooltip: params.connectorTooltip,
                endpoint: this
            };

            var endpoint;

            if (_ju.isString(ep)) {
                endpoint = _e(ep, endpointArgs);
            }
            else if (_ju.isArray(ep)) {
                endpointArgs = _ju.merge(ep[1], endpointArgs);
                endpoint = _e(ep[0], endpointArgs);
            }
            else {
                endpoint = ep.clone();
            }

            // assign a clone function using a copy of endpointArgs. this is used when a drag starts: the endpoint that was dragged is cloned,
            // and the clone is left in its place while the original one goes off on a magical journey.
            // the copy is to get around a closure problem, in which endpointArgs ends up getting shared by
            // the whole world.
            //var argsForClone = jsPlumb.extend({}, endpointArgs);
            endpoint.clone = function () {
                // TODO this, and the code above, can be refactored to be more dry.
                if (_ju.isString(ep)) {
                    return _e(ep, endpointArgs);
                }
                else if (_ju.isArray(ep)) {
                    endpointArgs = _ju.merge(ep[1], endpointArgs);
                    return _e(ep[0], endpointArgs);
                }
            }.bind(this);

            endpoint.typeId = typeId;
            return endpoint;
        };

        this.setEndpoint = function(ep, doNotRepaint) {
            var _ep = this.prepareEndpoint(ep);
            this.setPreparedEndpoint(_ep, true);
        };

        this.setPreparedEndpoint = function (ep, doNotRepaint) {
            if (this.endpoint != null) {
                this.endpoint.cleanup();
                this.endpoint.destroy();
            }
            this.endpoint = ep;
            this.type = this.endpoint.type;
            this.canvas = this.endpoint.canvas;
        };

        _jp.extend(this, params, typeParameters);

        this.isSource = params.isSource || false;
        this.isTemporarySource = params.isTemporarySource || false;
        this.isTarget = params.isTarget || false;

        this.connections = params.connections || [];
        this.connectorPointerEvents = params["connector-pointer-events"];

        this.scope = params.scope || _jsPlumb.getDefaultScope();
        this.timestamp = null;
        this.reattachConnections = params.reattach || _jsPlumb.Defaults.ReattachConnections;
        this.connectionsDetachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.connectionsDetachable === false || params.detachable === false) {
            this.connectionsDetachable = false;
        }
        this.dragAllowedWhenFull = params.dragAllowedWhenFull !== false;

        if (params.onMaxConnections) {
            this.bind("maxConnections", params.onMaxConnections);
        }

        //
        // add a connection. not part of public API.
        //
        this.addConnection = function (connection) {
            this.connections.push(connection);
            this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
            this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
        };

        this.detachFromConnection = function (connection, idx, doNotCleanup) {
            idx = idx == null ? this.connections.indexOf(connection) : idx;
            if (idx >= 0) {
                this.connections.splice(idx, 1);
                this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
                this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
            }

            if (!doNotCleanup && deleteOnEmpty && this.connections.length === 0) {
                _jsPlumb.deleteObject({
                    endpoint: this,
                    fireEvent: false,
                    deleteAttachedObjects: doNotCleanup !== true
                });
            }
        };

        this.deleteEveryConnection = function(params) {
            var c = this.connections.length;
            for (var i = 0; i < c; i++) {
                _jsPlumb.deleteConnection(this.connections[0], params);
            }
        };

        this.detachFrom = function (targetEndpoint, fireEvent, originalEvent) {
            var c = [];
            for (var i = 0; i < this.connections.length; i++) {
                if (this.connections[i].endpoints[1] === targetEndpoint || this.connections[i].endpoints[0] === targetEndpoint) {
                    c.push(this.connections[i]);
                }
            }
            for (var j = 0, count = c.length; j < count; j++) {
                _jsPlumb.deleteConnection(c[0]);
            }
            return this;
        };

        this.getElement = function () {
            return this.element;
        };

        this.setElement = function (el) {
            var parentId = this._jsPlumb.instance.getId(el),
                curId = this.elementId;
            // remove the endpoint from the list for the current endpoint's element
            _ju.removeWithFunction(params.endpointsByElement[this.elementId], function (e) {
                return e.id === this.id;
            }.bind(this));
            this.element = _jp.getElement(el);
            this.elementId = _jsPlumb.getId(this.element);
            _jsPlumb.router.rehomeEndpoint(this, curId, this.element);
            _jsPlumb.dragManager.endpointAdded(this.element);
            _ju.addToList(params.endpointsByElement, parentId, this);
            return this;
        };

        /**
         * private but must be exposed.
         */
        this.makeInPlaceCopy = function () {
            var loc = this.anchor.getCurrentLocation({element: this}),
                o = this.anchor.getOrientation(this),
                acc = this.anchor.getCssClass(),
                inPlaceAnchor = {
                    bind: function () {
                    },
                    compute: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getCurrentLocation: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getOrientation: function () {
                        return o;
                    },
                    getCssClass: function () {
                        return acc;
                    }
                };

            return _newEndpoint({
                dropOptions: params.dropOptions,
                anchor: inPlaceAnchor,
                source: this.element,
                paintStyle: this.getPaintStyle(),
                endpoint: params.hideOnDrag ? "Blank" : this.endpoint,
                _transient: true,
                scope: this.scope,
                reference:this
            });
        };

        /**
         * returns a connection from the pool; used when dragging starts.  just gets the head of the array if it can.
         */
        this.connectorSelector = function () {
            return this.connections[0];
        };

        this.setStyle = this.setPaintStyle;

        this.paint = function (params) {
            params = params || {};
            var timestamp = params.timestamp, recalc = !(params.recalc === false);
            if (!timestamp || this.timestamp !== timestamp) {

                var info = _jsPlumb.updateOffset({ elId: this.elementId, timestamp: timestamp });

                var xy = params.offset ? params.offset.o : info.o;
                if (xy != null) {
                    var ap = params.anchorPoint, connectorPaintStyle = params.connectorPaintStyle;
                    if (ap == null) {
                        var wh = params.dimensions || info.s,
                            anchorParams = { xy: [ xy.left, xy.top ], wh: wh, element: this, timestamp: timestamp };
                        if (recalc && this.anchor.isDynamic && this.connections.length > 0) {
                            var c = findConnectionToUseForDynamicAnchor(this, params.elementWithPrecedence),
                                oIdx = c.endpoints[0] === this ? 1 : 0,
                                oId = oIdx === 0 ? c.sourceId : c.targetId,
                                oInfo = _jsPlumb.getCachedData(oId),
                                oOffset = oInfo.o, oWH = oInfo.s;

                            anchorParams.index = oIdx === 0 ? 1 : 0;
                            anchorParams.connection = c;
                            anchorParams.txy = [ oOffset.left, oOffset.top ];
                            anchorParams.twh = oWH;
                            anchorParams.tElement = c.endpoints[oIdx];
                            anchorParams.tRotation = _jsPlumb.getRotation(oId);
                        } else if (this.connections.length > 0) {
                            anchorParams.connection = this.connections[0];
                        }
                        anchorParams.rotation = _jsPlumb.getRotation(this.elementId);
                        ap = this.anchor.compute(anchorParams);
                    }

                    this.endpoint.compute(ap, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, connectorPaintStyle || this.paintStyleInUse);
                    this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor);
                    this.timestamp = timestamp;

                    // paint overlays
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.endpoint, this._jsPlumb.paintStyleInUse);
                                o.paint(this._jsPlumb.overlayPlacements[i]);
                            }
                        }
                    }
                }
            }
        };

        this.getTypeDescriptor = function () {
            return "endpoint";
        };
        this.isVisible = function () {
            return this._jsPlumb.visible;
        };

        this.repaint = this.paint;

        var draggingInitialised = false;
        this.initDraggable = function () {

            // is this a connection source? we make it draggable and have the
            // drag listener maintain a connection with a floating endpoint.
            if (!draggingInitialised && _jp.isDragSupported(this.element)) {
                var placeholderInfo = { id: null, element: null },
                    jpc = null,
                    existingJpc = false,
                    existingJpcParams = null,
                    _dragHandler = _makeConnectionDragHandler(this, placeholderInfo, _jsPlumb),
                    dragOptions = params.dragOptions || {},
                    defaultOpts = {},
                    startEvent = _jp.dragEvents.start,
                    stopEvent = _jp.dragEvents.stop,
                    dragEvent = _jp.dragEvents.drag,
                    beforeStartEvent = _jp.dragEvents.beforeStart,
                    payload;

                // respond to beforeStart from katavorio; this will have, optionally, a payload of attribute values
                // that were placed there by the makeSource mousedown listener.
                var beforeStart = function(beforeStartParams) {
                    payload = beforeStartParams.e.payload || {};
                };

                var start = function (startParams) {

// -------------   first, get a connection to drag. this may be null, in which case we are dragging a new one.

                    jpc = this.connectorSelector();

// -------------------------------- now a bunch of tests about whether or not to proceed -------------------------

                    var _continue = true;
                    // if not enabled, return
                    if (!this.isEnabled()) {
                        _continue = false;
                    }
                    // if no connection and we're not a source - or temporarily a source, as is the case with makeSource - return.
                    if (jpc == null && !this.isSource && !this.isTemporarySource) {
                        _continue = false;
                    }
                    // otherwise if we're full and not allowed to drag, also return false.
                    if (this.isSource && this.isFull() && !(jpc != null && this.dragAllowedWhenFull)) {
                        _continue = false;
                    }
                    // if the connection was setup as not detachable or one of its endpoints
                    // was setup as connectionsDetachable = false, or Defaults.ConnectionsDetachable
                    // is set to false...
                    if (jpc != null && !jpc.isDetachable(this)) {
                        // .. and the endpoint is full
                        if (this.isFull()) {
                            _continue = false;
                        } else {
                            // otherwise, if not full, set the connection to null, and we will now proceed
                            // to drag a new connection.
                            jpc = null;
                        }
                    }

                    var beforeDrag = _jsPlumb.checkCondition(jpc == null ? "beforeDrag" : "beforeStartDetach", {
                        endpoint:this,
                        source:this.element,
                        sourceId:this.elementId,
                        connection:jpc
                    });
                    if (beforeDrag === false) {
                        _continue = false;
                    }
                    // else we might have been given some data. we'll pass it in to a new connection as 'data'.
                    // here we also merge in the optional payload we were given on mousedown.
                    else if (typeof beforeDrag === "object") {
                        _jp.extend(beforeDrag, payload || {});
                    }
                    else {
                        // or if no beforeDrag data, maybe use the payload on its own.
                        beforeDrag = payload || {};
                    }

                    if (_continue === false) {
                        // this is for mootools and yui. returning false from this causes jquery to stop drag.
                        // the events are wrapped in both mootools and yui anyway, but i don't think returning
                        // false from the start callback would stop a drag.
                        if (_jsPlumb.stopDrag) {
                            _jsPlumb.stopDrag(this.canvas);
                        }
                        _dragHandler.stopDrag();
                        return false;
                    }

// ---------------------------------------------------------------------------------------------------------------------

                    // ok to proceed.

                    // clear hover for all connections for this endpoint before continuing.
                    for (var i = 0; i < this.connections.length; i++) {
                        this.connections[i].setHover(false);
                    }

                    this.addClass("endpointDrag");
                    _jsPlumb.setConnectionBeingDragged(true);

                    // if we're not full but there was a connection, make it null. we'll create a new one.
                    if (jpc && !this.isFull() && this.isSource) {
                        jpc = null;
                    }

                    _jsPlumb.updateOffset({ elId: this.elementId });

// ----------------    make the element we will drag around, and position it -----------------------------

                    var ipco = this._jsPlumb.instance.getOffset(this.canvas),
                        canvasElement = this.canvas,
                        ips = this._jsPlumb.instance.getSize(this.canvas);

                    _makeDraggablePlaceholder(placeholderInfo, _jsPlumb, ipco, ips);

                    // store the id of the dragging div and the source element. the drop function will pick these up.                   
                    _jsPlumb.setAttributes(this.canvas, {
                        "dragId": placeholderInfo.id,
                        "elId": this.elementId
                    });

// ------------------- create an endpoint that will be our floating endpoint ------------------------------------

                    var endpointToFloat = this.dragProxy || this.endpoint;
                    if (this.dragProxy == null && this.connectionType != null) {
                        var aae = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                        if (aae.endpoints[1]) {
                            endpointToFloat = aae.endpoints[1];
                        }
                    }
                    var centerAnchor = this._jsPlumb.instance.makeAnchor("Center");
                    centerAnchor.isFloating = true;
                    this._jsPlumb.floatingEndpoint = _makeFloatingEndpoint(this.getPaintStyle(), centerAnchor, endpointToFloat, this.canvas, placeholderInfo.element, _jsPlumb, _newEndpoint, this.scope);
                    var _savedAnchor = this._jsPlumb.floatingEndpoint.anchor;


                    if (jpc == null) {

                        this.setHover(false, false);
                        // create a connection. one end is this endpoint, the other is a floating endpoint.                    
                        jpc = _newConnection({
                            sourceEndpoint: this,
                            targetEndpoint: this._jsPlumb.floatingEndpoint,
                            source: this.element,  // for makeSource with parent option.  ensure source element is represented correctly.
                            target: placeholderInfo.element,
                            anchors: [ this.anchor, this._jsPlumb.floatingEndpoint.anchor ],
                            paintStyle: params.connectorStyle, // this can be null. Connection will use the default.
                            hoverPaintStyle: params.connectorHoverStyle,
                            connector: params.connector, // this can also be null. Connection will use the default.
                            overlays: params.connectorOverlays,
                            type: this.connectionType,
                            cssClass: this.connectorClass,
                            hoverClass: this.connectorHoverClass,
                            scope:params.scope,
                            data:beforeDrag
                        });
                        jpc.pending = true;
                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.anchor = _savedAnchor;
                        // fire an event that informs that a connection is being dragged
                        _jsPlumb.fire("connectionDrag", jpc);

                        // register the new connection on the drag manager. This connection, at this point, is 'pending',
                        // and has as its target a temporary element (the 'placeholder'). If the connection subsequently
                        // becomes established, the anchor manager is informed that the target of the connection has
                        // changed.

                        _jsPlumb.router.newConnection(jpc);

                    } else {
                        existingJpc = true;
                        jpc.setHover(false);
                        // new anchor idx
                        var anchorIdx = jpc.endpoints[0].id === this.id ? 0 : 1;
                        this.detachFromConnection(jpc, null, true);                         // detach from the connection while dragging is occurring. but dont cleanup automatically.

                        // store the original scope (issue 57)
                        var dragScope = _jsPlumb.getDragScope(canvasElement);
                        _jsPlumb.setAttribute(this.canvas, "originalScope", dragScope);

                        // fire an event that informs that a connection is being dragged. we do this before
                        // replacing the original target with the floating element info.
                        _jsPlumb.fire("connectionDrag", jpc);

                        // now we replace ourselves with the temporary div we created above:
                        if (anchorIdx === 0) {
                            existingJpcParams = [ jpc.source, jpc.sourceId, canvasElement, dragScope ];
                            _jsPlumb.router.sourceOrTargetChanged(jpc.endpoints[anchorIdx].elementId, placeholderInfo.id, jpc, placeholderInfo.element, 0);

                        } else {
                            existingJpcParams = [ jpc.target, jpc.targetId, canvasElement, dragScope ];
                            _jsPlumb.router.sourceOrTargetChanged(jpc.endpoints[anchorIdx].elementId, placeholderInfo.id, jpc, placeholderInfo.element, 1);
                        }

                        // store the original endpoint and assign the new floating endpoint for the drag.
                        jpc.suspendedEndpoint = jpc.endpoints[anchorIdx];

                        // PROVIDE THE SUSPENDED ELEMENT, BE IT A SOURCE OR TARGET (ISSUE 39)
                        jpc.suspendedElement = jpc.endpoints[anchorIdx].getElement();
                        jpc.suspendedElementId = jpc.endpoints[anchorIdx].elementId;
                        jpc.suspendedElementType = anchorIdx === 0 ? "source" : "target";

                        jpc.suspendedEndpoint.setHover(false);
                        this._jsPlumb.floatingEndpoint.referenceEndpoint = jpc.suspendedEndpoint;
                        jpc.endpoints[anchorIdx] = this._jsPlumb.floatingEndpoint;

                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                    }

                    _jsPlumb.registerFloatingConnection(placeholderInfo, jpc, this._jsPlumb.floatingEndpoint);

                    // tell jsplumb about it
                    _jsPlumb.currentlyDragging = true;
                }.bind(this);

                var stop = function () {
                    _jsPlumb.setConnectionBeingDragged(false);

                    if (jpc && jpc.endpoints != null) {
                        // get the actual drop event (decode from library args to stop function)
                        var originalEvent = _jsPlumb.getDropEvent(arguments);
                        // unlock the other endpoint (if it is dynamic, it would have been locked at drag start)
                        var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
                        jpc.endpoints[idx === 0 ? 1 : 0].anchor.locked = false;
                        jpc.removeClass(_jsPlumb.draggingClass);
                        // if we have the floating endpoint then the connection has not been dropped
                        // on another endpoint.  If it is a new connection we throw it away. If it is an
                        // existing connection we check to see if we should reattach it, throwing it away
                        // if not.
                        if (this._jsPlumb && (jpc.deleteConnectionNow || jpc.endpoints[idx] === this._jsPlumb.floatingEndpoint)) {
                            // 6a. if the connection was an existing one...
                            if (existingJpc && jpc.suspendedEndpoint) {
                                // fix for issue35, thanks Sylvain Gizard: when firing the detach event make sure the
                                // floating endpoint has been replaced.
                                if (idx === 0) {
                                    jpc.floatingElement = jpc.source;
                                    jpc.floatingId = jpc.sourceId;
                                    jpc.floatingEndpoint = jpc.endpoints[0];
                                    jpc.floatingIndex = 0;
                                    jpc.source = existingJpcParams[0];
                                    jpc.sourceId = existingJpcParams[1];
                                } else {
                                    // keep a copy of the floating element; the anchor manager will want to clean up.
                                    jpc.floatingElement = jpc.target;
                                    jpc.floatingId = jpc.targetId;
                                    jpc.floatingEndpoint = jpc.endpoints[1];
                                    jpc.floatingIndex = 1;
                                    jpc.target = existingJpcParams[0];
                                    jpc.targetId = existingJpcParams[1];
                                }

                                var fe = this._jsPlumb.floatingEndpoint; // store for later removal.
                                // restore the original scope (issue 57)
                                _jsPlumb.setDragScope(existingJpcParams[2], existingJpcParams[3]);
                                jpc.endpoints[idx] = jpc.suspendedEndpoint;
                                // if the connection should be reattached, or the other endpoint refuses detach, then
                                // reset the connection to its original state
                                if (jpc.isReattach() || jpc._forceReattach || jpc._forceDetach || !_jsPlumb.deleteConnection(jpc, {originalEvent: originalEvent})) {

                                    jpc.setHover(false);
                                    jpc._forceDetach = null;
                                    jpc._forceReattach = null;
                                    this._jsPlumb.floatingEndpoint.detachFromConnection(jpc);
                                    jpc.suspendedEndpoint.addConnection(jpc);

                                    // TODO this code is duplicated in lots of places...and there is nothing external
                                    // in the code; it all refers to the connection itself. we could add a
                                    // `checkSanity(connection)` method to anchorManager that did this.
                                    if (idx === 1) {
                                        _jsPlumb.router.sourceOrTargetChanged(jpc.floatingId, jpc.targetId, jpc, jpc.target, idx);
                                    }
                                    else {
                                        _jsPlumb.router.sourceOrTargetChanged(jpc.floatingId, jpc.sourceId, jpc, jpc.source, idx);
                                    }

                                    _jsPlumb.repaint(existingJpcParams[1]);
                                }
                                else {
                                    _jsPlumb.deleteObject({endpoint: fe});
                                }
                            }
                        }

                        // makeTargets sets this flag, to tell us we have been replaced and should delete this object.
                        if (this.deleteAfterDragStop) {
                            _jsPlumb.deleteObject({endpoint: this});
                        }
                        else {
                            if (this._jsPlumb) {
                                 this.paint({recalc: false});
                            }
                        }

                        // although the connection is no longer valid, there are use cases where this is useful.
                        _jsPlumb.fire("connectionDragStop", jpc, originalEvent);
                        // fire this event to give people more fine-grained control (connectionDragStop fires a lot)
                        if (jpc.pending) {
                            _jsPlumb.fire("connectionAborted", jpc, originalEvent);
                        }
                        // tell jsplumb that dragging is finished.
                        _jsPlumb.currentlyDragging = false;
                        jpc.suspendedElement = null;
                        jpc.suspendedEndpoint = null;
                        jpc = null;
                    }

                    // if no endpoints, jpc already cleaned up. but still we want to ensure we're reset properly.
                    // remove the element associated with the floating endpoint
                    // (and its associated floating endpoint and visual artefacts)
                    if (placeholderInfo && placeholderInfo.element) {
                        _jsPlumb.remove(placeholderInfo.element, false, false);
                    }

                    if (this._jsPlumb) {
                        // make our canvas visible (TODO: hand off to library; we should not know about DOM)
                        this.canvas.style.visibility = "visible";
                        // unlock our anchor
                        this.anchor.locked = false;
                        // clear floating anchor.
                        this._jsPlumb.floatingEndpoint = null;
                    }

                }.bind(this);

                dragOptions = _jp.extend(defaultOpts, dragOptions);
                dragOptions.scope = this.scope || dragOptions.scope;
                dragOptions[beforeStartEvent] = _ju.wrap(dragOptions[beforeStartEvent], beforeStart, false);
                dragOptions[startEvent] = _ju.wrap(dragOptions[startEvent], start, false);
                // extracted drag handler function so can be used by makeSource
                dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], _dragHandler.drag);
                dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], stop);
                dragOptions.multipleDrop = false;

                dragOptions.canDrag = function () {
                    return this.isSource || this.isTemporarySource || (this.connections.length > 0 && this.connectionsDetachable !== false);
                }.bind(this);

                _jsPlumb.initDraggable(this.canvas, dragOptions, "internal");

                this.canvas._jsPlumbRelatedElement = this.element;

                draggingInitialised = true;
            }
        };

        var ep = params.endpoint || this._jsPlumb.instance.Defaults.Endpoint || _jp.Defaults.Endpoint;
        this.setEndpoint(ep, true);
        var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : (_jsPlumb.Defaults.Anchor || "Top");
        this.setAnchor(anchorParamsToUse, true);

        // finally, set type if it was provided
        var type = [ "default", (params.type || "")].join(" ");
        this.addType(type, params.data, true);
        this.canvas = this.endpoint.canvas;
        this.canvas._jsPlumb = this;

        this.initDraggable();

        // pulled this out into a function so we can reuse it for the inPlaceCopy canvas; you can now drop detached connections
        // back onto the endpoint you detached it from.
        var _initDropTarget = function (canvas, isTransient, endpoint, referenceEndpoint) {

            if (_jp.isDropSupported(this.element)) {
                var dropOptions = params.dropOptions || _jsPlumb.Defaults.DropOptions || _jp.Defaults.DropOptions;
                dropOptions = _jp.extend({}, dropOptions);
                dropOptions.scope = dropOptions.scope || this.scope;
                var dropEvent = _jp.dragEvents.drop,
                    overEvent = _jp.dragEvents.over,
                    outEvent = _jp.dragEvents.out,
                    _ep = this,
                    drop = _jsPlumb.EndpointDropHandler({
                        getEndpoint: function () {
                            return _ep;
                        },
                        jsPlumb: _jsPlumb,
                        enabled: function () {
                            return endpoint != null ? endpoint.isEnabled() : true;
                        },
                        isFull: function () {
                            return endpoint.isFull();
                        },
                        element: this.element,
                        elementId: this.elementId,
                        isSource: this.isSource,
                        isTarget: this.isTarget,
                        addClass: function (clazz) {
                            _ep.addClass(clazz);
                        },
                        removeClass: function (clazz) {
                            _ep.removeClass(clazz);
                        },
                        isDropAllowed: function () {
                            return _ep.isDropAllowed.apply(_ep, arguments);
                        },
                        reference:referenceEndpoint,
                        isRedrop:function(jpc, dhParams) {
                            return jpc.suspendedEndpoint && dhParams.reference && (jpc.suspendedEndpoint.id === dhParams.reference.id);
                        }
                    });

                dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], drop, true);
                dropOptions[overEvent] = _ju.wrap(dropOptions[overEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = _jsPlumb.getFloatingConnectionFor(id);//_jsPlumb.floatingConnections[id];

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        // here we should fire the 'over' event if we are a target and this is a new connection,
                        // or we are the same as the floating endpoint.
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id === _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            var bb = _jsPlumb.checkCondition("checkDropAllowed", {
                                sourceEndpoint: _jpc.endpoints[idx],
                                targetEndpoint: this,
                                connection: _jpc
                            });
                            this[(bb ? "add" : "remove") + "Class"](_jsPlumb.endpointDropAllowedClass);
                            this[(bb ? "remove" : "add") + "Class"](_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.over(this.anchor, this);
                        }
                    }
                }.bind(this));

                dropOptions[outEvent] = _ju.wrap(dropOptions[outEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = draggable == null ? null : _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = id ? _jsPlumb.getFloatingConnectionFor(id) : null;

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id === _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            this.removeClass(_jsPlumb.endpointDropAllowedClass);
                            this.removeClass(_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.out();
                        }
                    }
                }.bind(this));

                _jsPlumb.initDroppable(canvas, dropOptions, "internal", isTransient);
            }
        }.bind(this);

        // Initialise the endpoint's canvas as a drop target. The drop handler will take care of the logic of whether
        // something can actually be dropped.
        if (!this.anchor.isFloating) {
            _initDropTarget(this.canvas, !(params._transient || this.anchor.isFloating), this, params.reference);
        }

        return this;
    };

    _ju.extend(_jp.Endpoint, _jp.OverlayCapableJsPlumbUIComponent, {

        setVisible: function (v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
            this._jsPlumb.visible = v;
            if (this.canvas) {
                this.canvas.style.display = v ? "block" : "none";
            }
            this[v ? "showOverlays" : "hideOverlays"]();
            if (!doNotChangeConnections) {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].setVisible(v);
                    if (!doNotNotifyOtherEndpoint) {
                        var oIdx = this === this.connections[i].endpoints[0] ? 1 : 0;
                        // only change the other endpoint if this is its only connection.
                        if (this.connections[i].endpoints[oIdx].connections.length === 1) {
                            this.connections[i].endpoints[oIdx].setVisible(v, true, true);
                        }
                    }
                }
            }
        },
        getAttachedElements: function () {
            return this.connections;
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.endpointStyle || t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.endpointHoverStyle || t.hoverPaintStyle, doNotRepaint);
            if (t.maxConnections != null) {
                this._jsPlumb.maxConnections = t.maxConnections;
            }
            if (t.scope) {
                this.scope = t.scope;
            }
            _jp.extend(this, t, typeParameters);
            if (t.cssClass != null && this.canvas) {
                this._jsPlumb.instance.addClass(this.canvas, t.cssClass);
            }
            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        isEnabled: function () {
            return this._jsPlumb.enabled;
        },
        setEnabled: function (e) {
            this._jsPlumb.enabled = e;
        },
        cleanup: function () {
            var anchorClass = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            _jp.removeClass(this.element, anchorClass);
            this.anchor = null;
            this.endpoint.cleanup(true);
            this.endpoint.destroy();
            this.endpoint = null;
            // drag/drop
            this._jsPlumb.instance.destroyDraggable(this.canvas, "internal");
            this._jsPlumb.instance.destroyDroppable(this.canvas, "internal");
        },
        setHover: function (h) {
            if (this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                this.endpoint.setHover(h);
            }
        },
        isFull: function () {
            return this._jsPlumb.maxConnections === 0 ? true : !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections);
        },
        /**
         * private but needs to be exposed.
         */
        isFloating: function () {
            return this.anchor != null && this.anchor.isFloating;
        },
        isConnectedTo: function (endpoint) {
            var found = false;
            if (endpoint) {
                for (var i = 0; i < this.connections.length; i++) {
                    if (this.connections[i].endpoints[1] === endpoint || this.connections[i].endpoints[0] === endpoint) {
                        found = true;
                        break;
                    }
                }
            }
            return found;
        },
        getConnectionCost: function () {
            return this._jsPlumb.connectionCost;
        },
        setConnectionCost: function (c) {
            this._jsPlumb.connectionCost = c;
        },
        areConnectionsDirected: function () {
            return this._jsPlumb.connectionsDirected;
        },
        setConnectionsDirected: function (b) {
            this._jsPlumb.connectionsDirected = b;
        },
        setElementId: function (_elId) {
            this.elementId = _elId;
            this.anchor.elementId = _elId;
        },
        setReferenceElement: function (_el) {
            this.element = _jp.getElement(_el);
        },
        setDragAllowedWhenFull: function (allowed) {
            this.dragAllowedWhenFull = allowed;
        },
        equals: function (endpoint) {
            return this.anchor.equals(endpoint.anchor);
        },
        getUuid: function () {
            return this._jsPlumb.uuid;
        },
        computeAnchor: function (params) {
            return this.anchor.compute(params);
        }
    });

    root.jsPlumbInstance.prototype.EndpointDropHandler = function (dhParams) {
        return function (e) {

            var _jsPlumb = dhParams.jsPlumb;

            // remove the classes that are added dynamically. drop is neither forbidden nor allowed now that
            // the drop is finishing.
            dhParams.removeClass(_jsPlumb.endpointDropAllowedClass);
            dhParams.removeClass(_jsPlumb.endpointDropForbiddenClass);

            var originalEvent = _jsPlumb.getDropEvent(arguments),
                draggable = _jsPlumb.getDragObject(arguments),
                id = _jsPlumb.getAttribute(draggable, "dragId");
                _jsPlumb.getAttribute(draggable, "elId");
                var scope = _jsPlumb.getAttribute(draggable, "originalScope"),
                jpc = _jsPlumb.getFloatingConnectionFor(id);

            // if no active connection, bail.
            if (jpc == null) {
                return;
            }

            // calculate if this is an existing connection.
            var existingConnection = jpc.suspendedEndpoint != null;

            // if suspended endpoint exists but has been cleaned up, bail. This means it's an existing connection
            // that has been detached and will shortly be discarded.
            if (existingConnection && jpc.suspendedEndpoint._jsPlumb == null) {
                return;
            }

            // get the drop endpoint. for a normal connection this is just the one that would replace the currently
            // floating endpoint. for a makeTarget this is a new endpoint that is created on drop. But we leave that to
            // the handler to figure out.
            var _ep = dhParams.getEndpoint(jpc);

            // If we're not given an endpoint to use, bail.
            if (_ep == null) {
                return;
            }

            // if this is a drop back where the connection came from, mark it force reattach and
            // return; the stop handler will reattach. without firing an event.
            if (dhParams.isRedrop(jpc, dhParams)) {
                jpc._forceReattach = true;
                jpc.setHover(false);
                if (dhParams.maybeCleanup) {
                    dhParams.maybeCleanup(_ep);
                }
                return;
            }

            // ensure we dont bother trying to drop sources on non-source eps, and same for target.
            var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
            if ((idx === 0 && !dhParams.isSource)|| (idx === 1 && !dhParams.isTarget)){
                if (dhParams.maybeCleanup) {
                    dhParams.maybeCleanup(_ep);
                }
                return;
            }

            if (dhParams.onDrop) {
                dhParams.onDrop(jpc);
            }

            // restore the original scope if necessary (issue 57)
            if (scope) {
                _jsPlumb.setDragScope(draggable, scope);
            }

            // if the target of the drop is full, fire an event (we abort below)
            // makeTarget: keep.
            var isFull = dhParams.isFull(e);
            if (isFull) {
                _ep.fire("maxConnections", {
                    endpoint: this,
                    connection: jpc,
                    maxConnections: _ep._jsPlumb.maxConnections
                }, originalEvent);
            }
            //
            // if endpoint enabled, not full, and matches the index of the floating endpoint...
            if (!isFull &&  dhParams.enabled()) {
                var _doContinue = true;

                // before testing for beforeDrop, reset the connection's source/target to be the actual DOM elements
                // involved (that is, stash any temporary stuff used for dragging. but we need to keep it around in
                // order that the anchor manager can clean things up properly).
                if (idx === 0) {
                    jpc.floatingElement = jpc.source;
                    jpc.floatingId = jpc.sourceId;
                    jpc.floatingEndpoint = jpc.endpoints[0];
                    jpc.floatingIndex = 0;
                    jpc.source = dhParams.element;
                    jpc.sourceId = _jsPlumb.getId(dhParams.element);
                } else {
                    jpc.floatingElement = jpc.target;
                    jpc.floatingId = jpc.targetId;
                    jpc.floatingEndpoint = jpc.endpoints[1];
                    jpc.floatingIndex = 1;
                    jpc.target = dhParams.element;
                    jpc.targetId = _jsPlumb.getId(dhParams.element);
                }

                // if this is an existing connection and detach is not allowed we won't continue. The connection's
                // endpoints have been reinstated; everything is back to how it was.
                if (existingConnection && jpc.suspendedEndpoint.id !== _ep.id) {
                    if (!jpc.isDetachAllowed(jpc) || !jpc.endpoints[idx].isDetachAllowed(jpc) || !jpc.suspendedEndpoint.isDetachAllowed(jpc) || !_jsPlumb.checkCondition("beforeDetach", jpc)) {
                        _doContinue = false;
                    }
                }

// ------------ wrap the execution path in a function so we can support asynchronous beforeDrop

                var continueFunction = function (optionalData) {
                    // remove this jpc from the current endpoint, which is a floating endpoint that we will
                    // subsequently discard.
                    jpc.endpoints[idx].detachFromConnection(jpc);

                    // if there's a suspended endpoint, detach it from the connection.
                    if (jpc.suspendedEndpoint) {
                        jpc.suspendedEndpoint.detachFromConnection(jpc);
                    }

                    jpc.endpoints[idx] = _ep;
                    _ep.addConnection(jpc);

                    // copy our parameters in to the connection:
                    var params = _ep.getParameters();
                    for (var aParam in params) {
                        jpc.setParameter(aParam, params[aParam]);
                    }

                    if (!existingConnection) {
                        // if not an existing connection and
                        if (params.draggable) {
                            _jsPlumb.initDraggable(this.element, dhParams.dragOptions, "internal", _jsPlumb);
                        }
                    }
                    else {
                        var suspendedElementId = jpc.suspendedEndpoint.elementId;
                        _jsPlumb.fireMoveEvent({
                            index: idx,
                            originalSourceId: idx === 0 ? suspendedElementId : jpc.sourceId,
                            newSourceId: idx === 0 ? _ep.elementId : jpc.sourceId,
                            originalTargetId: idx === 1 ? suspendedElementId : jpc.targetId,
                            newTargetId: idx === 1 ? _ep.elementId : jpc.targetId,
                            originalSourceEndpoint: idx === 0 ? jpc.suspendedEndpoint : jpc.endpoints[0],
                            newSourceEndpoint: idx === 0 ? _ep : jpc.endpoints[0],
                            originalTargetEndpoint: idx === 1 ? jpc.suspendedEndpoint : jpc.endpoints[1],
                            newTargetEndpoint: idx === 1 ? _ep : jpc.endpoints[1],
                            connection: jpc
                        }, originalEvent);
                    }

                    if (idx === 1) {
                        _jsPlumb.router.sourceOrTargetChanged(jpc.floatingId, jpc.targetId, jpc, jpc.target, 1);
                    }
                    else {
                        _jsPlumb.router.sourceOrTargetChanged(jpc.floatingId, jpc.sourceId, jpc, jpc.source, 0);
                    }

                    // when makeSource has uniqueEndpoint:true, we want to create connections with new endpoints
                    // that are subsequently deleted. So makeSource sets `finalEndpoint`, which is the Endpoint to
                    // which the connection should be attached. The `detachFromConnection` call below results in the
                    // temporary endpoint being cleaned up.
                    if (jpc.endpoints[0].finalEndpoint) {
                        var _toDelete = jpc.endpoints[0];
                        _toDelete.detachFromConnection(jpc);
                        jpc.endpoints[0] = jpc.endpoints[0].finalEndpoint;
                        jpc.endpoints[0].addConnection(jpc);
                    }

                    // if optionalData was given, merge it onto the connection's data.
                    if (_ju.isObject(optionalData)) {
                        jpc.mergeData(optionalData);
                    }
                    // finalise will inform the anchor manager and also add to
                    // connectionsByScope if necessary.
                    _jsPlumb.finaliseConnection(jpc, null, originalEvent, false);
                    jpc.setHover(false);

                    // SP continuous anchor flush
                    _jsPlumb.revalidate(jpc.endpoints[0].element);

                }.bind(this);

                var dontContinueFunction = function () {
                    // otherwise just put it back on the endpoint it was on before the drag.
                    if (jpc.suspendedEndpoint) {
                        jpc.endpoints[idx] = jpc.suspendedEndpoint;
                        jpc.setHover(false);
                        jpc._forceDetach = true;
                        if (idx === 0) {
                            jpc.source = jpc.suspendedEndpoint.element;
                            jpc.sourceId = jpc.suspendedEndpoint.elementId;
                        } else {
                            jpc.target = jpc.suspendedEndpoint.element;
                            jpc.targetId = jpc.suspendedEndpoint.elementId;
                        }
                        jpc.suspendedEndpoint.addConnection(jpc);

                        // TODO checkSanity
                        if (idx === 1) {
                            _jsPlumb.router.sourceOrTargetChanged(jpc.floatingId, jpc.targetId, jpc, jpc.target, 1);
                        }
                        else {
                            _jsPlumb.router.sourceOrTargetChanged(jpc.floatingId, jpc.sourceId, jpc, jpc.source, 0);
                        }

                        _jsPlumb.repaint(jpc.sourceId);
                        jpc._forceDetach = false;
                    }
                };

// --------------------------------------
                // now check beforeDrop.  this will be available only on Endpoints that are setup to
                // have a beforeDrop condition (although, secretly, under the hood all Endpoints and
                // the Connection have them, because they are on jsPlumbUIComponent.  shhh!), because
                // it only makes sense to have it on a target endpoint.
                _doContinue = _doContinue && dhParams.isDropAllowed(jpc.sourceId, jpc.targetId, jpc.scope, jpc, _ep);// && jpc.pending;

                if (_doContinue) {
                    continueFunction(_doContinue);
                    return true;
                }
                else {
                    dontContinueFunction();
                }
            }

            if (dhParams.maybeCleanup) {
                dhParams.maybeCleanup(_ep);
            }

            _jsPlumb.currentlyDragging = false;
        };
    };
}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this,
        _jp = root.jsPlumb,
        _ju = root.jsPlumbUtil;

    var makeConnector = function (_jsPlumb, renderMode, connectorName, connectorArgs, forComponent) {
            // first make sure we have a cache for the specified renderer
            _jp.Connectors[renderMode] = _jp.Connectors[renderMode] || {};

            // now see if the one we want exists; if not we will try to make it
            if (_jp.Connectors[renderMode][connectorName] == null) {

                if (_jp.Connectors[connectorName] == null) {
                    if (!_jsPlumb.Defaults.DoNotThrowErrors) {
                        throw new TypeError("jsPlumb: unknown connector type '" + connectorName + "'");
                    } else {
                        return null;
                    }
                }

                _jp.Connectors[renderMode][connectorName] = function() {
                    _jp.Connectors[connectorName].apply(this, arguments);
                    _jp.ConnectorRenderers[renderMode].apply(this, arguments);
                };

                _ju.extend(_jp.Connectors[renderMode][connectorName], [ _jp.Connectors[connectorName], _jp.ConnectorRenderers[renderMode]]);

            }

            return new _jp.Connectors[renderMode][connectorName](connectorArgs, forComponent);
        },
        _makeAnchor = function (anchorParams, elementId, _jsPlumb) {
            return (anchorParams) ? _jsPlumb.makeAnchor(anchorParams, elementId, _jsPlumb) : null;
        },
        _updateConnectedClass = function (conn, element, _jsPlumb, remove) {
            if (element != null) {
                element._jsPlumbConnections = element._jsPlumbConnections || {};
                if (remove) {
                    delete element._jsPlumbConnections[conn.id];
                }
                else {
                    element._jsPlumbConnections[conn.id] = true;
                }

                if (_ju.isEmpty(element._jsPlumbConnections)) {
                    _jsPlumb.removeClass(element, _jsPlumb.connectedClass);
                }
                else {
                    _jsPlumb.addClass(element, _jsPlumb.connectedClass);
                }
            }
        };

    _jp.Connection = function (params) {
        var _newEndpoint = params.newEndpoint;

        this.id = params.id;
        this.connector = null;
        this.idPrefix = "_jsplumb_c_";
        this.defaultLabelLocation = 0.5;
        this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        // if a new connection is the result of moving some existing connection, params.previousConnection
        // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
        // member and take action if they need to.
        this.previousConnection = params.previousConnection;
        this.source = _jp.getElement(params.source);
        this.target = _jp.getElement(params.target);


        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

        // sourceEndpoint and targetEndpoint override source/target, if they are present. but 
        // source is not overridden if the Endpoint has declared it is not the final target of a connection;
        // instead we use the source that the Endpoint declares will be the final source element.
        if (params.sourceEndpoint) {
            this.source = params.sourceEndpoint.getElement();
            this.sourceId = params.sourceEndpoint.elementId;
        } else {
            this.sourceId = this._jsPlumb.instance.getId(this.source);
        }

        if (params.targetEndpoint) {
            this.target = params.targetEndpoint.getElement();
            this.targetId = params.targetEndpoint.elementId;
        } else {
            this.targetId = this._jsPlumb.instance.getId(this.target);
        }


        this.scope = params.scope; // scope may have been passed in to the connect call. if it wasn't, we will pull it from the source endpoint, after having initialised the endpoints.            
        this.endpoints = [];
        this.endpointStyles = [];

        var _jsPlumb = this._jsPlumb.instance;

        _jsPlumb.manage(this.sourceId, this.source);
        _jsPlumb.manage(this.targetId, this.target);

        this._jsPlumb.visible = true;

        this._jsPlumb.params = {
            cssClass: params.cssClass,
            container: params.container,
            "pointer-events": params["pointer-events"],
            editorParams: params.editorParams,
            overlays: params.overlays
        };
        this._jsPlumb.lastPaintedAt = null;

        // listen to mouseover and mouseout events passed from the container delegate.
        this.bind("mouseover", function () {
            this.setHover(true);
        }.bind(this));
        this.bind("mouseout", function () {
            this.setHover(false);
        }.bind(this));


// INITIALISATION CODE

        this.makeEndpoint = function (isSource, el, elId, ep, definition) {
            elId = elId || this._jsPlumb.instance.getId(el);
            return this.prepareEndpoint(_jsPlumb, _newEndpoint, this, ep, isSource ? 0 : 1, params, el, elId, definition);
        };

        // if type given, get the endpoint definitions mapping to that type from the jsplumb instance, and use those.
        // we apply types at the end of this constructor but endpoints are only honoured in a type definition at
        // create time.
        if (params.type) {
            params.endpoints = params.endpoints || this._jsPlumb.instance.deriveEndpointAndAnchorSpec(params.type).endpoints;
        }

        var eS = this.makeEndpoint(true, this.source, this.sourceId, params.sourceEndpoint),
            eT = this.makeEndpoint(false, this.target, this.targetId, params.targetEndpoint);

        if (eS) {
            _ju.addToList(params.endpointsByElement, this.sourceId, eS);
        }
        if (eT) {
            _ju.addToList(params.endpointsByElement, this.targetId, eT);
        }
        // if scope not set, set it to be the scope for the source endpoint.
        if (!this.scope) {
            this.scope = this.endpoints[0].scope;
        }

        // if explicitly told to (or not to) delete endpoints when empty, override endpoint's preferences
        if (params.deleteEndpointsOnEmpty != null) {
            this.endpoints[0].setDeleteOnEmpty(params.deleteEndpointsOnEmpty);
            this.endpoints[1].setDeleteOnEmpty(params.deleteEndpointsOnEmpty);
        }

// -------------------------- DEFAULT TYPE ---------------------------------------------

        // DETACHABLE
        var _detachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.detachable === false) {
            _detachable = false;
        }
        if (this.endpoints[0].connectionsDetachable === false) {
            _detachable = false;
        }
        if (this.endpoints[1].connectionsDetachable === false) {
            _detachable = false;
        }
        // REATTACH
        var _reattach = params.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || _jsPlumb.Defaults.ReattachConnections;

        this.appendToDefaultType({
            detachable: _detachable,
            reattach: _reattach,
            paintStyle:this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || params.paintStyle || _jsPlumb.Defaults.PaintStyle || _jp.Defaults.PaintStyle,
            hoverPaintStyle:this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || _jsPlumb.Defaults.HoverPaintStyle || _jp.Defaults.HoverPaintStyle
        });

        var _suspendedAt = _jsPlumb.getSuspendedAt();
        if (!_jsPlumb.isSuspendDrawing()) {
            // paint the endpoints
            var myInfo = _jsPlumb.getCachedData(this.sourceId),
                myOffset = myInfo.o, myWH = myInfo.s,
                otherInfo = _jsPlumb.getCachedData(this.targetId),
                otherOffset = otherInfo.o,
                otherWH = otherInfo.s,
                initialTimestamp = _suspendedAt || jsPlumbUtil.uuid(),
                anchorLoc = this.endpoints[0].anchor.compute({
                    xy: [ myOffset.left, myOffset.top ], wh: myWH, element: this.endpoints[0],
                    elementId: this.endpoints[0].elementId,
                    txy: [ otherOffset.left, otherOffset.top ], twh: otherWH, tElement: this.endpoints[1],
                    timestamp: initialTimestamp,
                    rotation:_jsPlumb.getRotation(this.endpoints[0].elementId)
                });

            this.endpoints[0].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });

            anchorLoc = this.endpoints[1].anchor.compute({
                xy: [ otherOffset.left, otherOffset.top ], wh: otherWH, element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [ myOffset.left, myOffset.top ], twh: myWH, tElement: this.endpoints[0],
                timestamp: initialTimestamp,
                rotation:_jsPlumb.getRotation(this.endpoints[1].elementId)
            });
            this.endpoints[1].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });
        }

        this.getTypeDescriptor = function () {
            return "connection";
        };
        this.getAttachedElements = function () {
            return this.endpoints;
        };

        this.isDetachable = function (ep) {
            return this._jsPlumb.detachable === false ? false : ep != null ? ep.connectionsDetachable === true : this._jsPlumb.detachable === true;
        };
        this.setDetachable = function (detachable) {
            this._jsPlumb.detachable = detachable === true;
        };
        this.isReattach = function () {
            return this._jsPlumb.reattach === true || this.endpoints[0].reattachConnections === true || this.endpoints[1].reattachConnections === true;
        };
        this.setReattach = function (reattach) {
            this._jsPlumb.reattach = reattach === true;
        };

// END INITIALISATION CODE


// COST + DIRECTIONALITY
        // if cost not supplied, try to inherit from source endpoint
        this._jsPlumb.cost = params.cost || this.endpoints[0].getConnectionCost();
        this._jsPlumb.directed = params.directed;
        // inherit directed flag if set no source endpoint
        if (params.directed == null) {
            this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected();
        }
// END COST + DIRECTIONALITY

// PARAMETERS
        // merge all the parameters objects into the connection.  parameters set
        // on the connection take precedence; then source endpoint params, then
        // finally target endpoint params.
        var _p = _jp.extend({}, this.endpoints[1].getParameters());
        _jp.extend(_p, this.endpoints[0].getParameters());
        _jp.extend(_p, this.getParameters());
        this.setParameters(_p);
// END PARAMETERS

// PAINTING

        this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || params.connector || _jsPlumb.Defaults.Connector || _jp.Defaults.Connector, true);
        var data = params.data == null || !_ju.isObject(params.data) ? {} : params.data;
        this.getData = function() { return data; };
        this.setData = function(d) { data = d || {}; };
        this.mergeData = function(d) { data = _jp.extend(data, d); };

        // the very last thing we do is apply types, if there are any.
        var _types = [ "default", this.endpoints[0].connectionType, this.endpoints[1].connectionType,  params.type ].join(" ");
        if (/[^\s]/.test(_types)) {
            this.addType(_types, params.data, true);
        }

        this.updateConnectedClass();

// END PAINTING    
    };

    _ju.extend(_jp.Connection, _jp.OverlayCapableJsPlumbUIComponent, {
        applyType: function (t, doNotRepaint, typeMap) {

            var _connector = null;
            if (t.connector != null) {
                _connector = this.getCachedTypeItem("connector", typeMap.connector);
                if (_connector == null) {
                    _connector = this.prepareConnector(t.connector, typeMap.connector);
                    this.cacheTypeItem("connector", _connector, typeMap.connector);
                }
                this.setPreparedConnector(_connector);
            }

            // none of these things result in the creation of objects so can be ignored.
            if (t.detachable != null) {
                this.setDetachable(t.detachable);
            }
            if (t.reattach != null) {
                this.setReattach(t.reattach);
            }
            if (t.scope) {
                this.scope = t.scope;
            }

            if (t.cssClass != null && this.canvas) {
                this._jsPlumb.instance.addClass(this.canvas, t.cssClass);
            }

            var _anchors = null;
            // this also results in the creation of objects.
            if (t.anchor) {
                // note that even if the param was anchor, we store `anchors`.
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchor);
                if (_anchors == null) {
                    _anchors = [ this._jsPlumb.instance.makeAnchor(t.anchor), this._jsPlumb.instance.makeAnchor(t.anchor) ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchor);
                }
            }
            else if (t.anchors) {
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchors);
                if (_anchors == null) {
                    _anchors = [
                        this._jsPlumb.instance.makeAnchor(t.anchors[0]),
                        this._jsPlumb.instance.makeAnchor(t.anchors[1])
                    ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchors);
                }
            }
            if (_anchors != null) {
                this.endpoints[0].anchor = _anchors[0];
                this.endpoints[1].anchor = _anchors[1];
                if (this.endpoints[1].anchor.isDynamic) {
                    this._jsPlumb.instance.repaint(this.endpoints[1].elementId);
                }
            }

            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        addClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].addClass(c);
                this.endpoints[1].addClass(c);
                if (this.suspendedEndpoint) {
                    this.suspendedEndpoint.addClass(c);
                }
            }
            if (this.connector) {
                this.connector.addClass(c);
            }
        },
        removeClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].removeClass(c);
                this.endpoints[1].removeClass(c);
                if (this.suspendedEndpoint) {
                    this.suspendedEndpoint.removeClass(c);
                }
            }
            if (this.connector) {
                this.connector.removeClass(c);
            }
        },
        isVisible: function () {
            return this._jsPlumb.visible;
        },
        setVisible: function (v) {
            this._jsPlumb.visible = v;
            if (this.connector) {
                this.connector.setVisible(v);
            }
            this.repaint();
        },
        cleanup: function () {
            this.updateConnectedClass(true);
            this.endpoints = null;
            this.source = null;
            this.target = null;
            if (this.connector != null) {
                this.connector.cleanup(true);
                this.connector.destroy(true);
            }
            this.connector = null;
        },
        updateConnectedClass:function(remove) {
            if (this._jsPlumb) {
                _updateConnectedClass(this, this.source, this._jsPlumb.instance, remove);
                _updateConnectedClass(this, this.target, this._jsPlumb.instance, remove);
            }
        },
        setHover: function (state) {
            if (this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                this.connector.setHover(state);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass);
            }
        },
        getUuids:function() {
            return [ this.endpoints[0].getUuid(), this.endpoints[1].getUuid() ];
        },
        getCost: function () {
            return this._jsPlumb ? this._jsPlumb.cost : -Infinity;
        },
        setCost: function (c) {
            this._jsPlumb.cost = c;
        },
        isDirected: function () {
            return this._jsPlumb.directed;
        },
        getConnector: function () {
            return this.connector;
        },
        prepareConnector:function(connectorSpec, typeId) {
            var connectorArgs = {
                    _jsPlumb: this._jsPlumb.instance,
                    cssClass: this._jsPlumb.params.cssClass,
                    container: this._jsPlumb.params.container,
                    "pointer-events": this._jsPlumb.params["pointer-events"]
                },
                renderMode = this._jsPlumb.instance.getRenderMode(),
                connector;

            if (_ju.isString(connectorSpec)) {
                connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec, connectorArgs, this);
            } // lets you use a string as shorthand.
            else if (_ju.isArray(connectorSpec)) {
                if (connectorSpec.length === 1) {
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], connectorArgs, this);
                }
                else {
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], _ju.merge(connectorSpec[1], connectorArgs), this);
                }
            }
            if (typeId != null) {
                connector.typeId = typeId;
            }
            return connector;
        },
        setPreparedConnector: function(connector, doNotRepaint, doNotChangeListenerComponent, typeId) {

            if (this.connector !== connector) {

                var previous, previousClasses = "";
                // the connector will not be cleaned up if it was set as part of a type, because `typeId` will be set on it
                // and we havent passed in `true` for "force" here.
                if (this.connector != null) {
                    previous = this.connector;
                    previousClasses = previous.getClass();
                    this.connector.cleanup();
                    this.connector.destroy();
                }

                this.connector = connector;
                if (typeId) {
                    this.cacheTypeItem("connector", connector, typeId);
                }

                this.canvas = this.connector.canvas;
                this.bgCanvas = this.connector.bgCanvas;

                this.connector.reattach(this._jsPlumb.instance);

                // put classes from prior connector onto the canvas
                this.addClass(previousClasses);

                // new: instead of binding listeners per connector, we now just have one delegate on the container.
                // so for that handler we set the connection as the '_jsPlumb' member of the canvas element, and
                // bgCanvas, if it exists, which it does right now in the VML renderer, so it won't from v 2.0.0 onwards.
                if (this.canvas) {
                    this.canvas._jsPlumb = this;
                }
                if (this.bgCanvas) {
                    this.bgCanvas._jsPlumb = this;
                }

                if (previous != null) {
                    var o = this.getOverlays();
                    for (var i = 0; i < o.length; i++) {
                        if (o[i].transfer) {
                            o[i].transfer(this.connector);
                        }
                    }
                }

                if (!doNotChangeListenerComponent) {
                    this.setListenerComponent(this.connector);
                }
                if (!doNotRepaint) {
                    this.repaint();
                }
            }
        },
        setConnector: function (connectorSpec, doNotRepaint, doNotChangeListenerComponent, typeId) {
            var connector = this.prepareConnector(connectorSpec, typeId);
            this.setPreparedConnector(connector, doNotRepaint, doNotChangeListenerComponent, typeId);
        },
        paint: function (params) {

            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                params = params || {};
                var timestamp = params.timestamp,
                // if the moving object is not the source we must transpose the two references.
                    swap = false,
                    tId = swap ? this.sourceId : this.targetId, sId = swap ? this.targetId : this.sourceId,
                    tIdx = swap ? 0 : 1, sIdx = swap ? 1 : 0;

                if (timestamp == null || timestamp !== this._jsPlumb.lastPaintedAt) {
                    var sourceInfo = this._jsPlumb.instance.updateOffset({elId:sId}).o,
                        targetInfo = this._jsPlumb.instance.updateOffset({elId:tId}).o,
                        sE = this.endpoints[sIdx], tE = this.endpoints[tIdx];

                    var sAnchorP = sE.anchor.getCurrentLocation(
                        {
                            xy: [sourceInfo.left, sourceInfo.top],
                            wh: [sourceInfo.width, sourceInfo.height],
                            element: sE,
                            timestamp: timestamp,
                            rotation:this._jsPlumb.instance.getRotation(this.sourceId)
                        }),
                        tAnchorP = tE.anchor.getCurrentLocation({
                            xy: [targetInfo.left, targetInfo.top],
                            wh: [targetInfo.width, targetInfo.height],
                            element: tE,
                            timestamp: timestamp,
                            rotation:this._jsPlumb.instance.getRotation(this.targetId)
                        });

                    this.connector.resetBounds();

                    this.connector.compute({
                        sourcePos: sAnchorP,
                        targetPos: tAnchorP,
                        sourceOrientation:sE.anchor.getOrientation(sE),
                        targetOrientation:tE.anchor.getOrientation(tE),
                        sourceEndpoint: this.endpoints[sIdx],
                        targetEndpoint: this.endpoints[tIdx],
                        "stroke-width": this._jsPlumb.paintStyleInUse.strokeWidth,
                        sourceInfo: sourceInfo,
                        targetInfo: targetInfo
                    });

                    var overlayExtents = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

                    // compute overlays. we do this first so we can get their placements, and adjust the
                    // container if needs be (if an overlay would be clipped)
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(o));
                                overlayExtents.minX = Math.min(overlayExtents.minX, this._jsPlumb.overlayPlacements[i].minX);
                                overlayExtents.maxX = Math.max(overlayExtents.maxX, this._jsPlumb.overlayPlacements[i].maxX);
                                overlayExtents.minY = Math.min(overlayExtents.minY, this._jsPlumb.overlayPlacements[i].minY);
                                overlayExtents.maxY = Math.max(overlayExtents.maxY, this._jsPlumb.overlayPlacements[i].maxY);
                            }
                        }
                    }

                    var lineWidth = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 1) / 2,
                        outlineWidth = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 0),
                        extents = {
                            xmin: Math.min(this.connector.bounds.minX - (lineWidth + outlineWidth), overlayExtents.minX),
                            ymin: Math.min(this.connector.bounds.minY - (lineWidth + outlineWidth), overlayExtents.minY),
                            xmax: Math.max(this.connector.bounds.maxX + (lineWidth + outlineWidth), overlayExtents.maxX),
                            ymax: Math.max(this.connector.bounds.maxY + (lineWidth + outlineWidth), overlayExtents.maxY)
                        };
                    // paint the connector.
                    this.connector.paintExtents = extents;
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, extents);
                    // and then the overlays
                    for (var j in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(j)) {
                            var p = this._jsPlumb.overlays[j];
                            if (p.isVisible()) {
                                p.paint(this._jsPlumb.overlayPlacements[j], extents);
                            }
                        }
                    }
                }
                this._jsPlumb.lastPaintedAt = timestamp;
            }
        },
        repaint: function (params) {
            var p = jsPlumb.extend(params || {}, {});
            p.elId = this.sourceId;
            this.paint(p);
        },
        prepareEndpoint: function (_jsPlumb, _newEndpoint, conn, existing, index, params, element, elementId, definition) {
            var e;
            if (existing) {
                conn.endpoints[index] = existing;
                existing.addConnection(conn);
            } else {
                if (!params.endpoints) {
                    params.endpoints = [ null, null ];
                }
                var ep = definition || params.endpoints[index] || params.endpoint || _jsPlumb.Defaults.Endpoints[index] || _jp.Defaults.Endpoints[index] || _jsPlumb.Defaults.Endpoint || _jp.Defaults.Endpoint;
                if (!params.endpointStyles) {
                    params.endpointStyles = [ null, null ];
                }
                if (!params.endpointHoverStyles) {
                    params.endpointHoverStyles = [ null, null ];
                }
                var es = params.endpointStyles[index] || params.endpointStyle || _jsPlumb.Defaults.EndpointStyles[index] || _jp.Defaults.EndpointStyles[index] || _jsPlumb.Defaults.EndpointStyle || _jp.Defaults.EndpointStyle;
                // Endpoints derive their fill from the connector's stroke, if no fill was specified.
                if (es.fill == null && params.paintStyle != null) {
                    es.fill = params.paintStyle.stroke;
                }

                if (es.outlineStroke == null && params.paintStyle != null) {
                    es.outlineStroke = params.paintStyle.outlineStroke;
                }
                if (es.outlineWidth == null && params.paintStyle != null) {
                    es.outlineWidth = params.paintStyle.outlineWidth;
                }

                var ehs = params.endpointHoverStyles[index] || params.endpointHoverStyle || _jsPlumb.Defaults.EndpointHoverStyles[index] || _jp.Defaults.EndpointHoverStyles[index] || _jsPlumb.Defaults.EndpointHoverStyle || _jp.Defaults.EndpointHoverStyle;
                // endpoint hover fill style is derived from connector's hover stroke style
                if (params.hoverPaintStyle != null) {
                    if (ehs == null) {
                        ehs = {};
                    }
                    if (ehs.fill == null) {
                        ehs.fill = params.hoverPaintStyle.stroke;
                    }
                }
                var a = params.anchors ? params.anchors[index] :
                        params.anchor ? params.anchor :
                            _makeAnchor(_jsPlumb.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jsPlumb.Defaults.Anchor, elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchor, elementId, _jsPlumb),
                    u = params.uuids ? params.uuids[index] : null;

                e = _newEndpoint({
                    paintStyle: es, hoverPaintStyle: ehs, endpoint: ep, connections: [ conn ],
                    uuid: u, anchor: a, source: element, scope: params.scope,
                    reattach: params.reattach || _jsPlumb.Defaults.ReattachConnections,
                    detachable: params.detachable || _jsPlumb.Defaults.ConnectionsDetachable
                });
                if (existing == null) {
                    e.setDeleteOnEmpty(true);
                }
                conn.endpoints[index] = e;

                if (params.drawEndpoints === false) {
                    e.setVisible(false, true, true);
                }

            }
            return e;
        },
        replaceEndpoint:function(idx, endpointDef) {

            var current = this.endpoints[idx],
                elId = current.elementId,
                ebe = this._jsPlumb.instance.getEndpoints(elId),
                _idx = ebe.indexOf(current),
                _new = this.makeEndpoint(idx === 0, current.element, elId, null, endpointDef);

            this.endpoints[idx] = _new;

            ebe.splice(_idx, 1, _new);
            this._jsPlumb.instance.deleteObject({endpoint:current, deleteAttachedObjects:false});
            this._jsPlumb.instance.fire("endpointReplaced", {previous:current, current:_new});

            this._jsPlumb.instance.router.sourceOrTargetChanged(this.endpoints[1].elementId, this.endpoints[1].elementId, this, this.endpoints[1].element, 1);

        }

    }); // END Connection class            
}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {

    var root = this,
        _ju = root.jsPlumbUtil,
        _jp = root.jsPlumb;

    //
    // manages anchors for all elements.
    //
    _jp.AnchorManager = function (params) {
        var _amEndpoints = {},
            continuousAnchorLocations = {},
            continuousAnchorOrientations = {},
            connectionsByElementId = {},
            self = this,
            anchorLists = {},
            jsPlumbInstance = params.jsPlumbInstance,
            floatingConnections = {},
            // used by placeAnchors function
            placeAnchorsOnLine = function (desc, elementDimensions, elementPosition, connections, horizontal, otherMultiplier, reverse, rotation) {
                var a = [], step = elementDimensions[horizontal ? 0 : 1] / (connections.length + 1);

                for (var i = 0; i < connections.length; i++) {
                    var val = (i + 1) * step, other = otherMultiplier * elementDimensions[horizontal ? 1 : 0];
                    if (reverse) {
                        val = elementDimensions[horizontal ? 0 : 1] - val;
                    }

                    var dx = (horizontal ? val : other), x = elementPosition.left + dx, xp = dx / elementDimensions[0],
                        dy = (horizontal ? other : val), y = elementPosition.top + dy, yp = dy / elementDimensions[1];

                    if (rotation !== 0) {
                        var rotated = jsPlumbUtil.rotatePoint([x, y], [elementPosition.centerx, elementPosition.centery], rotation);
                        x = rotated[0];
                        y = rotated[1];
                    }

                    a.push([ x, y, xp, yp, connections[i][1], connections[i][2] ]);
                }

                return a;
            },
            rightAndBottomSort = function(a, b) {
                return b[0][0] - a[0][0];
            },
            // used by edgeSortFunctions
            leftAndTopSort = function (a, b) {
                var p1 = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                    p2 = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];

                return p1 - p2;
            },
            // used by placeAnchors
            edgeSortFunctions = {
                "top":leftAndTopSort,
                "right": rightAndBottomSort,
                "bottom": rightAndBottomSort,
                "left": leftAndTopSort
            },
            // used by placeAnchors
            _sortHelper = function (_array, _fn) {
                return _array.sort(_fn);
            },
            // used by AnchorManager.redraw
            placeAnchors = function (elementId, _anchorLists) {
                var cd = jsPlumbInstance.getCachedData(elementId), sS = cd.s, sO = cd.o,
                    placeSomeAnchors = function (desc, elementDimensions, elementPosition, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
                        if (unsortedConnections.length > 0) {
                            var sc = _sortHelper(unsortedConnections, edgeSortFunctions[desc]), // puts them in order based on the target element's pos on screen
                                reverse = desc === "right" || desc === "top",
                                rotation = jsPlumbInstance.getRotation(elementId),
                                anchors = placeAnchorsOnLine(desc, elementDimensions,
                                    elementPosition, sc,
                                    isHorizontal, otherMultiplier, reverse, rotation);

                            // takes a computed anchor position and adjusts it for parent offset and scroll, then stores it.
                            var _setAnchorLocation = function (endpoint, anchorPos) {
                                continuousAnchorLocations[endpoint.id] = [ anchorPos[0], anchorPos[1], anchorPos[2], anchorPos[3] ];
                                continuousAnchorOrientations[endpoint.id] = orientation;
                            };

                            for (var i = 0; i < anchors.length; i++) {
                                var c = anchors[i][4], weAreSource = c.endpoints[0].elementId === elementId, weAreTarget = c.endpoints[1].elementId === elementId;
                                if (weAreSource) {
                                    _setAnchorLocation(c.endpoints[0], anchors[i]);
                                }
                                if (weAreTarget) {
                                    _setAnchorLocation(c.endpoints[1], anchors[i]);
                                }
                            }
                        }
                    };

                placeSomeAnchors("bottom", sS, sO, _anchorLists.bottom, true, 1, [0, 1]);
                placeSomeAnchors("top", sS, sO, _anchorLists.top, true, 0, [0, -1]);
                placeSomeAnchors("left", sS, sO, _anchorLists.left, false, 0, [-1, 0]);
                placeSomeAnchors("right", sS, sO, _anchorLists.right, false, 1, [1, 0]);
            };

        this.reset = function () {
            _amEndpoints = {};
            connectionsByElementId = {};
            anchorLists = {};
        };
        this.addFloatingConnection = function (key, conn) {
            floatingConnections[key] = conn;
        };
        this.newConnection = function (conn) {
            var sourceId = conn.sourceId, targetId = conn.targetId,
                ep = conn.endpoints,
                doRegisterTarget = true,
                registerConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                    if ((sourceId === targetId) && otherAnchor.isContinuous) {
                        // remove the target endpoint's canvas.  we dont need it.
                        conn._jsPlumb.instance.removeElement(ep[1].canvas);
                        doRegisterTarget = false;
                    }
                    _ju.addToList(connectionsByElementId, elId, [c, otherEndpoint, otherAnchor.constructor === _jp.DynamicAnchor]);
                };

            registerConnection(0, ep[0], ep[0].anchor, targetId, conn);
            if (doRegisterTarget) {
                registerConnection(1, ep[1], ep[1].anchor, sourceId, conn);
            }
        };
        var removeEndpointFromAnchorLists = function (endpoint) {
            (function (list, eId) {
                if (list) {  // transient anchors dont get entries in this list.
                    var f = function (e) {
                        return e[4] === eId;
                    };
                    _ju.removeWithFunction(list.top, f);
                    _ju.removeWithFunction(list.left, f);
                    _ju.removeWithFunction(list.bottom, f);
                    _ju.removeWithFunction(list.right, f);
                }
            })(anchorLists[endpoint.elementId], endpoint.id);
        };
        this.connectionDetached = function (connInfo, doNotRedraw) {
            var connection = connInfo.connection || connInfo,
                sourceId = connInfo.sourceId,
                targetId = connInfo.targetId,
                ep = connection.endpoints,
                removeConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                    _ju.removeWithFunction(connectionsByElementId[elId], function (_c) {
                        return _c[0].id === c.id;
                    });
                };

            removeConnection(1, ep[1], ep[1].anchor, sourceId, connection);
            removeConnection(0, ep[0], ep[0].anchor, targetId, connection);
            if (connection.floatingId) {
                removeConnection(connection.floatingIndex, connection.floatingEndpoint, connection.floatingEndpoint.anchor, connection.floatingId, connection);
                removeEndpointFromAnchorLists(connection.floatingEndpoint);
            }

            // remove from anchorLists
            removeEndpointFromAnchorLists(connection.endpoints[0]);
            removeEndpointFromAnchorLists(connection.endpoints[1]);

            if (!doNotRedraw) {
                self.redraw(connection.sourceId);
                if (connection.targetId !== connection.sourceId) {
                    self.redraw(connection.targetId);
                }
            }
        };
        this.addEndpoint = function (endpoint, elementId) {
            _ju.addToList(_amEndpoints, elementId, endpoint);
        };
        this.changeId = function (oldId, newId) {
            connectionsByElementId[newId] = connectionsByElementId[oldId];
            _amEndpoints[newId] = _amEndpoints[oldId];
            delete connectionsByElementId[oldId];
            delete _amEndpoints[oldId];
        };
        this.getConnectionsFor = function (elementId) {
            return connectionsByElementId[elementId] || [];
        };
        this.getEndpointsFor = function (elementId) {
            return _amEndpoints[elementId] || [];
        };
        this.deleteEndpoint = function (endpoint) {
            _ju.removeWithFunction(_amEndpoints[endpoint.elementId], function (e) {
                return e.id === endpoint.id;
            });
            removeEndpointFromAnchorLists(endpoint);
        };
        this.elementRemoved = function (elementId) {
            delete floatingConnections[elementId];
            delete _amEndpoints[elementId];
            _amEndpoints[elementId] = [];
        };
        // updates the given anchor list by either updating an existing anchor's info, or adding it. this function
        // also removes the anchor from its previous list, if the edge it is on has changed.
        // all connections found along the way (those that are connected to one of the faces this function
        // operates on) are added to the connsToPaint list, as are their endpoints. in this way we know to repaint
        // them wthout having to calculate anything else about them.
        var _updateAnchorList = function (lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, elId, connsToPaint, endpointsToPaint) {
            // first try to find the exact match, but keep track of the first index of a matching element id along the way.s
            var firstMatchingElIdx = -1,
                endpoint = conn.endpoints[idx],
                endpointId = endpoint.id,
                oIdx = [1, 0][idx],
                values = [
                    [ theta, order ],
                    conn,
                    aBoolean,
                    otherElId,
                    endpointId
                ],
                listToAddTo = lists[edgeId],
                listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null,
                i,
                candidate;

            if (listToRemoveFrom) {
                var rIdx = _ju.findWithFunction(listToRemoveFrom, function (e) {
                    return e[4] === endpointId;
                });
                if (rIdx !== -1) {
                    listToRemoveFrom.splice(rIdx, 1);
                    // get all connections from this list
                    for (i = 0; i < listToRemoveFrom.length; i++) {
                        candidate = listToRemoveFrom[i][1];
                        _ju.addWithFunction(connsToPaint, candidate, function (c) {
                            return c.id === candidate.id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[idx], function (e) {
                            return e.id === candidate.endpoints[idx].id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[oIdx], function (e) {
                            return e.id === candidate.endpoints[oIdx].id;
                        });
                    }
                }
            }

            for (i = 0; i < listToAddTo.length; i++) {
                candidate = listToAddTo[i][1];
                if (params.idx === 1 && listToAddTo[i][3] === otherElId && firstMatchingElIdx === -1) {
                    firstMatchingElIdx = i;
                }
                _ju.addWithFunction(connsToPaint, candidate, function (c) {
                    return c.id === candidate.id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[idx], function (e) {
                    return e.id === candidate.endpoints[idx].id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[oIdx], function (e) {
                    return e.id === candidate.endpoints[oIdx].id;
                });
            }
            {
                var insertIdx = reverse ? firstMatchingElIdx !== -1 ? firstMatchingElIdx : 0 : listToAddTo.length; // of course we will get this from having looked through the array shortly.
                listToAddTo.splice(insertIdx, 0, values);
            }

            // store this for next time.
            endpoint._continuousAnchorEdge = edgeId;
        };

        //
        // Notification that the connection given has changed source/target from the originalId to the newId.
        //
        // For a change of source this involves:
        // 1. removing the connection from the list of connections stored for the originalId
        // 2. updating the source information for the target of the connection
        // 3. re-registering the connection in connectionsByElementId with the newId
        //
        // For a change of target this means find the entry in an endpoint's list for this connection and update its target endpoint
        // with the current target in the connection.
        //
        this.sourceOrTargetChanged = function (originalId, newId, connection, newElement, anchorIndex) {
            if (anchorIndex === 0) {
                if (originalId !== newId) {

                    connection.sourceId = newId;
                    connection.source = newElement;

                    // remove the entry that points from the old source to the target
                    _ju.removeWithFunction(connectionsByElementId[originalId], function (info) {
                        return info[0].id === connection.id;
                    });
                    // find entry for target and update it
                    var tIdx = _ju.findWithFunction(connectionsByElementId[connection.targetId], function (i) {
                        return i[0].id === connection.id;
                    });
                    if (tIdx > -1) {
                        connectionsByElementId[connection.targetId][tIdx][0] = connection;
                        connectionsByElementId[connection.targetId][tIdx][1] = connection.endpoints[0];
                        connectionsByElementId[connection.targetId][tIdx][2] = connection.endpoints[0].anchor.constructor === _jp.DynamicAnchor;
                    }
                    // add entry for new source
                    _ju.addToList(connectionsByElementId, newId, [connection, connection.endpoints[1], connection.endpoints[1].anchor.constructor === _jp.DynamicAnchor]);

                    // TODO SP not final on this yet. when a user drags an existing connection and it turns into a self
                    // loop, then this code hides the target endpoint (by removing it from the DOM) But I think this should
                    // occur only if the anchor is Continuous
                    if (connection.endpoints[1].anchor.isContinuous) {
                        if (connection.source === connection.target) {
                            connection._jsPlumb.instance.removeElement(connection.endpoints[1].canvas);
                        } else {
                            if (connection.endpoints[1].canvas.parentNode == null) {
                                connection._jsPlumb.instance.appendElement(connection.endpoints[1].canvas);
                            }
                        }
                    }

                    connection.updateConnectedClass();
                }
            } else if (anchorIndex === 1) {
                var sourceElId = connection.endpoints[0].elementId;

                connection.target = newElement;
                connection.targetId = newId;

                var sIndex = _ju.findWithFunction(connectionsByElementId[sourceElId], function (i) {
                        return i[0].id === connection.id;
                    }),
                    tIndex = _ju.findWithFunction(connectionsByElementId[originalId], function (i) {
                        return i[0].id === connection.id;
                    });

                // update or add data for source
                if (sIndex !== -1) {
                    connectionsByElementId[sourceElId][sIndex][0] = connection;
                    connectionsByElementId[sourceElId][sIndex][1] = connection.endpoints[1];
                    connectionsByElementId[sourceElId][sIndex][2] = connection.endpoints[1].anchor.constructor === _jp.DynamicAnchor;
                }

                // remove entry for previous target (if there)
                if (tIndex > -1) {
                    connectionsByElementId[originalId].splice(tIndex, 1);
                    // add entry for new target
                    _ju.addToList(connectionsByElementId, newId, [connection, connection.endpoints[0], connection.endpoints[0].anchor.constructor === _jp.DynamicAnchor]);
                }

                connection.updateConnectedClass();
            }
        };

        //
        // moves the given endpoint from `currentId` to `element`.
        // This involves:
        //
        // 1. changing the key in _amEndpoints under which the endpoint is stored
        // 2. changing the source or target values in all of the endpoint's connections
        // 3. changing the array in connectionsByElementId in which the endpoint's connections
        //    are stored (done by either sourceChanged or updateOtherEndpoint)
        //
        this.rehomeEndpoint = function (ep, currentId, element) {
            var eps = _amEndpoints[currentId] || [],
                elementId = jsPlumbInstance.getId(element);

            if (elementId !== currentId) {
                var idx = eps.indexOf(ep);
                if (idx > -1) {
                    var _ep = eps.splice(idx, 1)[0];
                    self.add(_ep, elementId);
                }
            }

            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId === currentId) {
                    self.sourceOrTargetChanged(currentId, ep.elementId, ep.connections[i], ep.element, 0);
                }
                else if (ep.connections[i].targetId === currentId) {
                    self.sourceOrTargetChanged(currentId, ep.elementId, ep.connections[i], ep.element, 1);
                }
            }
        };

        this.redraw = function (elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint) {

            var connectionsToPaint = [],
                endpointsToPaint = [],
                anchorsToUpdate = [];

            if (!jsPlumbInstance.isSuspendDrawing()) {
                // get all the endpoints for this element
                var ep = _amEndpoints[elementId] || [],
                    endpointConnections = connectionsByElementId[elementId] || [];

                timestamp = timestamp || jsPlumbUtil.uuid();
                // offsetToUI are values that would have been calculated in the dragManager when registering
                // an endpoint for an element that had a parent (somewhere in the hierarchy) that had been
                // registered as draggable.
                offsetToUI = offsetToUI || {left: 0, top: 0};
                if (ui) {
                    ui = {
                        left: ui.left + offsetToUI.left,
                        top: ui.top + offsetToUI.top
                    };
                }

                // valid for one paint cycle.
                var myOffset = jsPlumbInstance.updateOffset({ elId: elementId, offset: ui, recalc: false, timestamp: timestamp }),
                    orientationCache = {};

                // actually, first we should compute the orientation of this element to all other elements to which
                // this element is connected with a continuous anchor (whether both ends of the connection have
                // a continuous anchor or just one)

                for (var i = 0; i < endpointConnections.length; i++) {
                    var conn = endpointConnections[i][0],
                        sourceId = conn.sourceId,
                        targetId = conn.targetId,
                        sourceContinuous = conn.endpoints[0].anchor.isContinuous,
                        targetContinuous = conn.endpoints[1].anchor.isContinuous;

                    if (sourceContinuous || targetContinuous) {
                        var oKey = sourceId + "_" + targetId,
                            o = orientationCache[oKey],
                            oIdx = conn.sourceId === elementId ? 1 : 0,
                            targetRotation = jsPlumbInstance.getRotation(targetId),
                            sourceRotation = jsPlumbInstance.getRotation(sourceId);

                        if (sourceContinuous && !anchorLists[sourceId]) {
                            anchorLists[sourceId] = { top: [], right: [], bottom: [], left: [] };
                        }
                        if (targetContinuous && !anchorLists[targetId]) {
                            anchorLists[targetId] = { top: [], right: [], bottom: [], left: [] };
                        }

                        if (elementId !== targetId) {
                            jsPlumbInstance.updateOffset({ elId: targetId, timestamp: timestamp });
                        }
                        if (elementId !== sourceId) {
                            jsPlumbInstance.updateOffset({ elId: sourceId, timestamp: timestamp });
                        }

                        var td = jsPlumbInstance.getCachedData(targetId),
                            sd = jsPlumbInstance.getCachedData(sourceId);

                        if (targetId === sourceId && (sourceContinuous || targetContinuous)) {
                            // here we may want to improve this by somehow determining the face we'd like
                            // to put the connector on.  ideally, when drawing, the face should be calculated
                            // by determining which face is closest to the point at which the mouse button
                            // was released.  for now, we're putting it on the top face.
                            _updateAnchorList( anchorLists[sourceId], -Math.PI / 2, 0, conn, false, targetId, 0, false, "top", sourceId, connectionsToPaint, endpointsToPaint);
                            _updateAnchorList( anchorLists[targetId], -Math.PI / 2, 0, conn, false, sourceId, 1, false, "top", targetId, connectionsToPaint, endpointsToPaint);
                        }
                        else {
                            if (!o) {
                                o = this.calculateOrientation(sourceId, targetId, sd.o, td.o, conn.endpoints[0].anchor, conn.endpoints[1].anchor, conn, sourceRotation, targetRotation);
                                orientationCache[oKey] = o;
                                // this would be a performance enhancement, but the computed angles need to be clamped to
                                //the (-PI/2 -> PI/2) range in order for the sorting to work properly.
                                /*  orientationCache[oKey2] = {
                                 orientation:o.orientation,
                                 a:[o.a[1], o.a[0]],
                                 theta:o.theta + Math.PI,
                                 theta2:o.theta2 + Math.PI
                                 };*/
                            }
                            if (sourceContinuous) {
                                _updateAnchorList(anchorLists[sourceId], o.theta, 0, conn, false, targetId, 0, false, o.a[0], sourceId, connectionsToPaint, endpointsToPaint);
                            }
                            if (targetContinuous) {
                                _updateAnchorList(anchorLists[targetId], o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], targetId, connectionsToPaint, endpointsToPaint);
                            }
                        }

                        if (sourceContinuous) {
                            _ju.addWithFunction(anchorsToUpdate, sourceId, function (a) {
                                return a === sourceId;
                            });
                        }
                        if (targetContinuous) {
                            _ju.addWithFunction(anchorsToUpdate, targetId, function (a) {
                                return a === targetId;
                            });
                        }
                        _ju.addWithFunction(connectionsToPaint, conn, function (c) {
                            return c.id === conn.id;
                        });
                        if ((sourceContinuous && oIdx === 0) || (targetContinuous && oIdx === 1)) {
                            _ju.addWithFunction(endpointsToPaint, conn.endpoints[oIdx], function (e) {
                                return e.id === conn.endpoints[oIdx].id;
                            });
                        }
                    }
                }

                // place Endpoints whose anchors are continuous but have no Connections
                for (i = 0; i < ep.length; i++) {
                    if (ep[i].connections.length === 0 && ep[i].anchor.isContinuous) {
                        if (!anchorLists[elementId]) {
                            anchorLists[elementId] = { top: [], right: [], bottom: [], left: [] };
                        }
                        _updateAnchorList(anchorLists[elementId], -Math.PI / 2, 0, {endpoints: [ep[i], ep[i]], paint: function () {
                        }}, false, elementId, 0, false, ep[i].anchor.getDefaultFace(), elementId, connectionsToPaint, endpointsToPaint);
                        _ju.addWithFunction(anchorsToUpdate, elementId, function (a) {
                            return a === elementId;
                        });
                    }
                }

                // now place all the continuous anchors we need to;
                for (i = 0; i < anchorsToUpdate.length; i++) {
                    placeAnchors(anchorsToUpdate[i], anchorLists[anchorsToUpdate[i]]);
                }

                // now that continuous anchors have been placed, paint all the endpoints for this element
                for (i = 0; i < ep.length; i++) {
                    ep[i].paint({ timestamp: timestamp, offset: myOffset, dimensions: myOffset.s, recalc: doNotRecalcEndpoint !== true });
                }

                // ... and any other endpoints we came across as a result of the continuous anchors.
                for (i = 0; i < endpointsToPaint.length; i++) {
                    var cd = jsPlumbInstance.getCachedData(endpointsToPaint[i].elementId);
                    //endpointsToPaint[i].paint({ timestamp: timestamp, offset: cd, dimensions: cd.s });
                    endpointsToPaint[i].paint({ timestamp: null, offset: cd, dimensions: cd.s });
                }

                // paint all the standard and "dynamic connections", which are connections whose other anchor is
                // static and therefore does need to be recomputed; we make sure that happens only one time.

                // TODO we could have compiled a list of these in the first pass through connections; might save some time.
                for (i = 0; i < endpointConnections.length; i++) {
                    var otherEndpoint = endpointConnections[i][1];
                    if (otherEndpoint.anchor.constructor === _jp.DynamicAnchor) {
                        otherEndpoint.paint({ elementWithPrecedence: elementId, timestamp: timestamp });
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id === endpointConnections[i][0].id;
                        });
                        // all the connections for the other endpoint now need to be repainted
                        for (var k = 0; k < otherEndpoint.connections.length; k++) {
                            if (otherEndpoint.connections[k] !== endpointConnections[i][0]) {
                                _ju.addWithFunction(connectionsToPaint, otherEndpoint.connections[k], function (c) {
                                    return c.id === otherEndpoint.connections[k].id;
                                });
                            }
                        }
                    } else {
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id === endpointConnections[i][0].id;
                        });
                    }
                }

                // paint current floating connection for this element, if there is one.
                var fc = floatingConnections[elementId];
                if (fc) {
                    fc.paint({timestamp: timestamp, recalc: false, elId: elementId});
                }

                // paint all the connections
                for (i = 0; i < connectionsToPaint.length; i++) {
                    connectionsToPaint[i].paint({elId: elementId, timestamp: null, recalc: false, clearEdits: clearEdits});
                }
            }

            return {
                c:connectionsToPaint,
                e:endpointsToPaint
            };
        };

        var ContinuousAnchor = function (anchorParams) {
            _ju.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var faces = anchorParams.faces || ["top", "right", "bottom", "left"],
                clockwise = !(anchorParams.clockwise === false),
                availableFaces = { },
                opposites = { "top": "bottom", "right": "left", "left": "right", "bottom": "top" },
                clockwiseOptions = { "top": "right", "right": "bottom", "left": "top", "bottom": "left" },
                antiClockwiseOptions = { "top": "left", "right": "top", "left": "bottom", "bottom": "right" },
                secondBest = clockwise ? clockwiseOptions : antiClockwiseOptions,
                lastChoice = clockwise ? antiClockwiseOptions : clockwiseOptions,
                cssClass = anchorParams.cssClass || "",
                _currentFace = null, _lockedFace = null, X_AXIS_FACES = ["left", "right"], Y_AXIS_FACES = ["top", "bottom"],
                _lockedAxis = null;

            for (var i = 0; i < faces.length; i++) {
                availableFaces[faces[i]] = true;
            }

            this.getDefaultFace = function () {
                return faces.length === 0 ? "top" : faces[0];
            };

            this.isRelocatable = function() { return true; };
            this.isSnapOnRelocate = function() { return true; };

            // if the given edge is supported, returns it. otherwise looks for a substitute that _is_
            // supported. if none supported we also return the request edge.
            this.verifyEdge = function (edge) {
                if (availableFaces[edge]) {
                    return edge;
                }
                else if (availableFaces[opposites[edge]]) {
                    return opposites[edge];
                }
                else if (availableFaces[secondBest[edge]]) {
                    return secondBest[edge];
                }
                else if (availableFaces[lastChoice[edge]]) {
                    return lastChoice[edge];
                }
                return edge; // we have to give them something.
            };

            this.isEdgeSupported = function (edge) {
                return  _lockedAxis == null ?

                    (_lockedFace == null ? availableFaces[edge] === true : _lockedFace === edge)

                    : _lockedAxis.indexOf(edge) !== -1;
            };

            this.setCurrentFace = function(face, overrideLock) {
                _currentFace = face;
                // if currently locked, and the user wants to override, do that.
                if (overrideLock && _lockedFace != null) {
                    _lockedFace = _currentFace;
                }
            };

            this.getCurrentFace = function() { return _currentFace; };
            this.getSupportedFaces = function() {
                var af = [];
                for (var k in availableFaces) {
                    if (availableFaces[k]) {
                        af.push(k);
                    }
                }
                return af;
            };

            this.lock = function() {
                _lockedFace = _currentFace;
            };
            this.unlock = function() {
                _lockedFace = null;
            };
            this.isLocked = function() {
                return _lockedFace != null;
            };

            this.lockCurrentAxis = function() {
                if (_currentFace != null) {
                    _lockedAxis = (_currentFace === "left" || _currentFace === "right") ? X_AXIS_FACES : Y_AXIS_FACES;
                }
            };

            this.unlockCurrentAxis = function() {
                _lockedAxis = null;
            };

            this.compute = function (params) {
                return continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getCurrentLocation = function (params) {
                return continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getOrientation = function (endpoint) {
                return continuousAnchorOrientations[endpoint.id] || [0, 0];
            };
            this.getCssClass = function () {
                return cssClass;
            };
        };

        // continuous anchors
        jsPlumbInstance.continuousAnchorFactory = {
            get: function (params) {
                return new ContinuousAnchor(params);
            },
            clear: function (elementId) {
                delete continuousAnchorLocations[elementId];
            }
        };
    };

    _jp.AnchorManager.prototype.calculateOrientation = function (sourceId,
                                                                 targetId,
                                                                 sd,
                                                                 td,
                                                                 sourceAnchor,
                                                                 targetAnchor,
                                                                 connection,
                                                                 sourceRotation,
                                                                 targetRotation) {

        var Orientation = { HORIZONTAL: "horizontal", VERTICAL: "vertical", DIAGONAL: "diagonal", IDENTITY: "identity" },
            axes = ["left", "top", "right", "bottom"];

        if (sourceId === targetId) {
            return {
                orientation: Orientation.IDENTITY,
                a: ["top", "top"]
            };
        }

        // since we only support rotation around the center of an element these two lines don't have to take rotation
        // into account.
        var theta = Math.atan2((td.centery - sd.centery), (td.centerx - sd.centerx)),
            theta2 = Math.atan2((sd.centery - td.centery), (sd.centerx - td.centerx));

// --------------------------------------------------------------------------------------

        // improved face calculation. get midpoints of each face for source and target, then put in an array with all combinations of
        // source/target faces. sort this array by distance between midpoints. the entry at index 0 is our preferred option. we can
        // go through the array one by one until we find an entry in which each requested face is supported.
        var candidates = [], midpoints = { };

        (function (types, dim) {
            for (var i = 0; i < types.length; i++) {
                midpoints[types[i]] = {
                    "left": [ dim[i][0].left, dim[i][0].centery ],
                    "right": [ dim[i][0].right, dim[i][0].centery ],
                    "top": [ dim[i][0].centerx, dim[i][0].top ],
                    "bottom": [ dim[i][0].centerx , dim[i][0].bottom]
                };
                if (dim[i][1] !== 0) {
                    for (var axis in midpoints[types[i]]) {
                        midpoints[types[i]][axis] = jsPlumbUtil.rotatePoint(midpoints[types[i]][axis], [dim[i][0].centerx, dim[i][0].centery], dim[i][1]);
                    }
                }
            }
        })([ "source", "target" ], [ [sd, sourceRotation], [td, targetRotation] ]);

        for (var sf = 0; sf < axes.length; sf++) {
            for (var tf = 0; tf < axes.length; tf++) {
                candidates.push({
                    source: axes[sf],
                    target: axes[tf],
                    dist: Biltong.lineLength(midpoints.source[axes[sf]], midpoints.target[axes[tf]])
                });
            }
        }

        candidates.sort(function (a, b) {
            return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0;
        });

        // now go through this list and try to get an entry that satisfies both (there will be one, unless one of the anchors
        // declares no available faces)
        var sourceEdge = candidates[0].source, targetEdge = candidates[0].target;
        for (var i = 0; i < candidates.length; i++) {

            if (sourceAnchor.isContinuous && sourceAnchor.locked) {
                sourceEdge = sourceAnchor.getCurrentFace();
            }
            else if (!sourceAnchor.isContinuous || sourceAnchor.isEdgeSupported(candidates[i].source)) {
                sourceEdge = candidates[i].source;
            }
            else {
                sourceEdge = null;
            }

            if (targetAnchor.isContinuous && targetAnchor.locked) {
                targetEdge = targetAnchor.getCurrentFace();
            }
            else if (!targetAnchor.isContinuous || targetAnchor.isEdgeSupported(candidates[i].target)) {
                targetEdge = candidates[i].target;
            }
            else {
                targetEdge = null;
            }

            if (sourceEdge != null && targetEdge != null) {
                break;
            }
        }

        if (sourceAnchor.isContinuous) {
            sourceAnchor.setCurrentFace(sourceEdge);
        }

        if (targetAnchor.isContinuous) {
            targetAnchor.setCurrentFace(targetEdge);
        }

// --------------------------------------------------------------------------------------

        return {
            a: [ sourceEdge, targetEdge ],
            theta: theta,
            theta2: theta2
        };
    };

    /**
     * Anchors model a position on some element at which an Endpoint may be located.  They began as a first class citizen of jsPlumb, ie. a user
     * was required to create these themselves, but over time this has been replaced by the concept of referring to them either by name (eg. "TopMiddle"),
     * or by an array describing their coordinates (eg. [ 0, 0.5, 0, -1 ], which is the same as "TopMiddle").  jsPlumb now handles all of the
     * creation of Anchors without user intervention.
     */
    _jp.Anchor = function (params) {
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.elementId = params.elementId;
        this.cssClass = params.cssClass || "";
        this.orientation = params.orientation || [ 0, 0 ];
        this.lastReturnValue = null;
        this.offsets = params.offsets || [ 0, 0 ];
        this.timestamp = null;

        this._unrotatedOrientation = [
            this.orientation[0],
            this.orientation[1]
        ];

        this.relocatable = params.relocatable !== false;
        this.snapOnRelocate = params.snapOnRelocate !== false;

        this.locked = false;

        _ju.EventGenerator.apply(this);

        this.compute = function (params) {

            var xy = params.xy, wh = params.wh, timestamp = params.timestamp;

            if (timestamp && timestamp === this.timestamp) {
                return this.lastReturnValue;
            }

            // unrotated position
            var candidate = [ xy[0] + (this.x * wh[0]) + this.offsets[0], xy[1] + (this.y * wh[1]) + this.offsets[1], this.x, this.y ];

            // if rotation set, adjust position.
            var rotation = params.rotation;
            if (rotation != null && rotation !== 0) {

                var c2 = jsPlumbUtil.rotatePoint(candidate, [xy[0] + (wh[0] / 2), xy[1] + (wh[1] / 2) ], rotation);

                // rotate the orientation values too. for rotations that are not multiples of 90 degrees, this will result in values that are not in the set
                // [0, -1, 1 ], and in that case the connector paint may not be perfect. need some evidence from real world usage.
                this.orientation[0] = Math.round((this._unrotatedOrientation[0] * c2[2]) - (this._unrotatedOrientation[1] * c2[3]));
                this.orientation[1] = Math.round((this._unrotatedOrientation[1] * c2[2]) + (this._unrotatedOrientation[0] * c2[3]));

                this.lastReturnValue = [c2[0], c2[1], this.x, this.y];
            } else {
                // if rotation not set (or 0), ensure orientation is original value
                this.orientation[0] = this._unrotatedOrientation[0];
                this.orientation[1] = this._unrotatedOrientation[1];
                this.lastReturnValue = candidate;
            }

            this.timestamp = timestamp;
            return this.lastReturnValue;
        };

        this.getCurrentLocation = function (params) {
            params = params || {};
            return (this.lastReturnValue == null || (params.timestamp != null && this.timestamp !== params.timestamp)) ? this.compute(params) : this.lastReturnValue;
        };

        this.setPosition = function(x, y, ox, oy, overrideLock) {
            if (!this.locked || overrideLock) {
                this.x = x;
                this.y = y;
                this.orientation = [ ox, oy ];
                this.lastReturnValue = null;
            }
        };
    };
    _ju.extend(_jp.Anchor, _ju.EventGenerator, {
        equals: function (anchor) {
            if (!anchor) {
                return false;
            }
            var ao = anchor.getOrientation(),
                o = this.getOrientation();
            return this.x === anchor.x && this.y === anchor.y && this.offsets[0] === anchor.offsets[0] && this.offsets[1] === anchor.offsets[1] && o[0] === ao[0] && o[1] === ao[1];
        },
        getOrientation: function () {
            return this.orientation;
        },
        getCssClass: function () {
            return this.cssClass;
        }
    });

    /**
     * An Anchor that floats. its orientation is computed dynamically from
     * its position relative to the anchor it is floating relative to.  It is used when creating
     * a connection through drag and drop.
     *
     * TODO FloatingAnchor could totally be refactored to extend Anchor just slightly.
     */
    _jp.FloatingAnchor = function (params) {

        _jp.Anchor.apply(this, arguments);

        // this is the anchor that this floating anchor is referenced to for
        // purposes of calculating the orientation.
        var ref = params.reference,
            // the canvas this refers to.
            refCanvas = params.referenceCanvas,
            size = _jp.getSize(refCanvas),
            // these are used to store the current relative position of our
            // anchor wrt the reference anchor. they only indicate
            // direction, so have a value of 1 or -1 (or, very rarely, 0). these
            // values are written by the compute method, and read
            // by the getOrientation method.
            xDir = 0, yDir = 0,
            // temporary member used to store an orientation when the floating
            // anchor is hovering over another anchor.
            orientation = null,
            _lastResult = null;

        // clear from parent. we want floating anchor orientation to always be computed.
        this.orientation = null;

        // set these to 0 each; they are used by certain types of connectors in the loopback case,
        // when the connector is trying to clear the element it is on. but for floating anchor it's not
        // very important.
        this.x = 0;
        this.y = 0;

        this.isFloating = true;

        this.compute = function (params) {
            var xy = params.xy,
                result = [ xy[0] + (size[0] / 2), xy[1] + (size[1] / 2) ]; // return origin of the element. we may wish to improve this so that any object can be the drag proxy.
            _lastResult = result;
            return result;
        };

        this.getOrientation = function (_endpoint) {
            if (orientation) {
                return orientation;
            }
            else {
                var o = ref.getOrientation(_endpoint);
                // here we take into account the orientation of the other
                // anchor: if it declares zero for some direction, we declare zero too. this might not be the most awesome. perhaps we can come
                // up with a better way. it's just so that the line we draw looks like it makes sense. maybe this wont make sense.
                return [ Math.abs(o[0]) * xDir * -1,
                    Math.abs(o[1]) * yDir * -1 ];
            }
        };

        /**
         * notification the endpoint associated with this anchor is hovering
         * over another anchor; we want to assume that anchor's orientation
         * for the duration of the hover.
         */
        this.over = function (anchor, endpoint) {
            orientation = anchor.getOrientation(endpoint);
        };

        /**
         * notification the endpoint associated with this anchor is no
         * longer hovering over another anchor; we should resume calculating
         * orientation as we normally do.
         */
        this.out = function () {
            orientation = null;
        };

        this.getCurrentLocation = function (params) {
            return _lastResult == null ? this.compute(params) : _lastResult;
        };
    };
    _ju.extend(_jp.FloatingAnchor, _jp.Anchor);

    var _convertAnchor = function (anchor, jsPlumbInstance, elementId) {
        return anchor.constructor === _jp.Anchor ? anchor : jsPlumbInstance.makeAnchor(anchor, elementId, jsPlumbInstance);
    };

    /* 
     * A DynamicAnchor is an Anchor that contains a list of other Anchors, which it cycles
     * through at compute time to find the one that is located closest to
     * the center of the target element, and returns that Anchor's compute
     * method result. this causes endpoints to follow each other with
     * respect to the orientation of their target elements, which is a useful
     * feature for some applications.
     * 
     */
    _jp.DynamicAnchor = function (params) {
        _jp.Anchor.apply(this, arguments);

        this.isDynamic = true;
        this.anchors = [];
        this.elementId = params.elementId;
        this.jsPlumbInstance = params.jsPlumbInstance;

        for (var i = 0; i < params.anchors.length; i++) {
            this.anchors[i] = _convertAnchor(params.anchors[i], this.jsPlumbInstance, this.elementId);
        }

        this.getAnchors = function () {
            return this.anchors;
        };

        var _curAnchor = this.anchors.length > 0 ? this.anchors[0] : null,
            _lastAnchor = _curAnchor,
            // helper method to calculate the distance between the centers of the two elements.
            _distance = function (anchor, cx, cy, xy, wh, r, tr) {
                var ax = xy[0] + (anchor.x * wh[0]), ay = xy[1] + (anchor.y * wh[1]),
                    acx = xy[0] + (wh[0] / 2), acy = xy[1] + (wh[1] / 2);

                if(r != null && r !== 0) {
                    var rotated = jsPlumbUtil.rotatePoint([ax,ay], [acx, acy], r);
                    ax = rotated[0];
                    ay = rotated[1];
                }

                return (Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) +
                        Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2)));
            },
            // default method uses distance between element centers.  you can provide your own method in the dynamic anchor
            // constructor (and also to jsPlumb.makeDynamicAnchor). the arguments to it are:
            // xy - xy loc of the anchor's element
            // wh - anchor's element's dimensions
            // txy - xy loc of the element of the other anchor in the connection
            // twh - dimensions of the element of the other anchor in the connection.
            // r - the rotation of the anchor's element
            // tr - the rotation of the target anchor's element. currently unused;  a placeholder for possible future refactoring.
            // anchors - the list of selectable anchors
            _anchorSelector = params.selector || function (xy, wh, txy, twh, r, tr, anchors) {
                    var cx = txy[0] + (twh[0] / 2), cy = txy[1] + (twh[1] / 2);
                    var minIdx = -1, minDist = Infinity;
                    for (var i = 0; i < anchors.length; i++) {
                        var d = _distance(anchors[i], cx, cy, xy, wh, r);
                        if (d < minDist) {
                            minIdx = i + 0;
                            minDist = d;
                        }
                    }
                    return anchors[minIdx];
                };

        this.compute = function (params) {
            var xy = params.xy, wh = params.wh, txy = params.txy, twh = params.twh, r = params.rotation, tr = params.tRotation;

            this.timestamp = params.timestamp;

            // if anchor is locked or an opposite element was not given, we
            // maintain our state. anchor will be locked
            // if it is the source of a drag and drop.
            if (this.locked || txy == null || twh == null) {
                this.lastReturnValue = _curAnchor.compute(params);
                return this.lastReturnValue;
            }
            else {
                params.timestamp = null; // otherwise clear this, i think. we want the anchor to compute.
            }

            _curAnchor = _anchorSelector(xy, wh, txy, twh, r, tr, this.anchors);
            this.x = _curAnchor.x;
            this.y = _curAnchor.y;

            if (_curAnchor !== _lastAnchor) {
                this.fire("anchorChanged", _curAnchor);
            }

            _lastAnchor = _curAnchor;

            this.lastReturnValue = _curAnchor.compute(params);
            return this.lastReturnValue;
        };

        this.getCurrentLocation = function (params) {
            return _curAnchor != null ? _curAnchor.getCurrentLocation(params) : null;
        };

        this.getOrientation = function (_endpoint) {
            return _curAnchor != null ? _curAnchor.getOrientation(_endpoint) : [ 0, 0 ];
        };
        this.over = function (anchor, endpoint) {
            if (_curAnchor != null) {
                _curAnchor.over(anchor, endpoint);
            }
        };
        this.out = function () {
            if (_curAnchor != null) {
                _curAnchor.out();
            }
        };

        this.setAnchor = function(a) {
            _curAnchor = a;
        };

        this.getCssClass = function () {
            return (_curAnchor && _curAnchor.getCssClass()) || "";
        };

        /**
         * Attempt to match an anchor with the given coordinates and then set it.
         * @param coords
         * @returns true if matching anchor found, false otherwise.
         */
        this.setAnchorCoordinates = function(coords) {
            var idx = jsPlumbUtil.findWithFunction(this.anchors, function(a) {
                return a.x === coords[0] && a.y === coords[1];
            });
            if (idx !== -1) {
                this.setAnchor(this.anchors[idx]);
                return true;
            } else {
                return false;
            }
        };
    };
    _ju.extend(_jp.DynamicAnchor, _jp.Anchor);

// -------- basic anchors ------------------    
    var _curryAnchor = function (x, y, ox, oy, type, fnInit) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor([ x, y, ox, oy, 0, 0 ], params.elementId, params.jsPlumbInstance);
            a.type = type;
            if (fnInit) {
                fnInit(a, params);
            }
            return a;
        };
    };

    _curryAnchor(0.5, 0, 0, -1, "TopCenter");
    _curryAnchor(0.5, 1, 0, 1, "BottomCenter");
    _curryAnchor(0, 0.5, -1, 0, "LeftMiddle");
    _curryAnchor(1, 0.5, 1, 0, "RightMiddle");

    _curryAnchor(0.5, 0, 0, -1, "Top");
    _curryAnchor(0.5, 1, 0, 1, "Bottom");
    _curryAnchor(0, 0.5, -1, 0, "Left");
    _curryAnchor(1, 0.5, 1, 0, "Right");
    _curryAnchor(0.5, 0.5, 0, 0, "Center");
    _curryAnchor(1, 0, 0, -1, "TopRight");
    _curryAnchor(1, 1, 0, 1, "BottomRight");
    _curryAnchor(0, 0, 0, -1, "TopLeft");
    _curryAnchor(0, 1, 0, 1, "BottomLeft");

// ------- dynamic anchors -------------------    

    // default dynamic anchors chooses from Top, Right, Bottom, Left
    _jp.Defaults.DynamicAnchors = function (params) {
        return params.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], params.elementId, params.jsPlumbInstance);
    };

    // default dynamic anchors bound to name 'AutoDefault'
    _jp.Anchors.AutoDefault = function (params) {
        var a = params.jsPlumbInstance.makeDynamicAnchor(_jp.Defaults.DynamicAnchors(params));
        a.type = "AutoDefault";
        return a;
    };

// ------- continuous anchors -------------------    

    var _curryContinuousAnchor = function (type, faces) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor(["Continuous", { faces: faces }], params.elementId, params.jsPlumbInstance);
            a.type = type;
            return a;
        };
    };

    _jp.Anchors.Continuous = function (params) {
        return params.jsPlumbInstance.continuousAnchorFactory.get(params);
    };

    _curryContinuousAnchor("ContinuousLeft", ["left"]);
    _curryContinuousAnchor("ContinuousTop", ["top"]);
    _curryContinuousAnchor("ContinuousBottom", ["bottom"]);
    _curryContinuousAnchor("ContinuousRight", ["right"]);

// ------- position assign anchors -------------------    

    // this anchor type lets you assign the position at connection time.
    _curryAnchor(0, 0, 0, 0, "Assign", function (anchor, params) {
        // find what to use as the "position finder". the user may have supplied a String which represents
        // the id of a position finder in jsPlumb.AnchorPositionFinders, or the user may have supplied the
        // position finder as a function.  we find out what to use and then set it on the anchor.
        var pf = params.position || "Fixed";
        anchor.positionFinder = pf.constructor === String ? params.jsPlumbInstance.AnchorPositionFinders[pf] : pf;
        // always set the constructor params; the position finder might need them later (the Grid one does,
        // for example)
        anchor.constructorParams = params;
    });

    // these are the default anchor positions finders, which are used by the makeTarget function.  supplying
    // a position finder argument to that function allows you to specify where the resulting anchor will
    // be located
    root.jsPlumbInstance.prototype.AnchorPositionFinders = {
        "Fixed": function (dp, ep, es) {
            return [ (dp.left - ep.left) / es[0], (dp.top - ep.top) / es[1] ];
        },
        "Grid": function (dp, ep, es, params) {
            var dx = dp.left - ep.left, dy = dp.top - ep.top,
                gx = es[0] / (params.grid[0]), gy = es[1] / (params.grid[1]),
                mx = Math.floor(dx / gx), my = Math.floor(dy / gy);
            return [ ((mx * gx) + (gx / 2)) / es[0], ((my * gy) + (gy / 2)) / es[1] ];
        }
    };

// ------- perimeter anchors -------------------    

    _jp.Anchors.Perimeter = function (params) {
        params = params || {};
        var anchorCount = params.anchorCount || 60,
            shape = params.shape;

        if (!shape) {
            throw new Error("no shape supplied to Perimeter Anchor type");
        }

        var _circle = function () {
                var r = 0.5, step = Math.PI * 2 / anchorCount, current = 0, a = [];
                for (var i = 0; i < anchorCount; i++) {
                    var x = r + (r * Math.sin(current)),
                        y = r + (r * Math.cos(current));
                    a.push([ x, y, 0, 0 ]);
                    current += step;
                }
                return a;
            },
            _path = function (segments) {
                var anchorsPerFace = anchorCount / segments.length, a = [],
                    _computeFace = function (x1, y1, x2, y2, fractionalLength, ox, oy) {
                        anchorsPerFace = anchorCount * fractionalLength;
                        var dx = (x2 - x1) / anchorsPerFace, dy = (y2 - y1) / anchorsPerFace;
                        for (var i = 0; i < anchorsPerFace; i++) {
                            a.push([
                                x1 + (dx * i),
                                y1 + (dy * i),
                                ox == null ? 0 : ox,
                                oy == null ? 0 : oy
                            ]);
                        }
                    };

                for (var i = 0; i < segments.length; i++) {
                    _computeFace.apply(null, segments[i]);
                }

                return a;
            },
            _shape = function (faces) {
                var s = [];
                for (var i = 0; i < faces.length; i++) {
                    s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length, faces[i][4], faces[i][5]]);
                }
                return _path(s);
            },
            _rectangle = function () {
                return _shape([
                    [ 0, 0, 1, 0, 0, -1 ],
                    [ 1, 0, 1, 1, 1, 0 ],
                    [ 1, 1, 0, 1, 0, 1 ],
                    [ 0, 1, 0, 0, -1, 0 ]
                ]);
            };

        var _shapes = {
                "Circle": _circle,
                "Ellipse": _circle,
                "Diamond": function () {
                    return _shape([
                        [ 0.5, 0, 1, 0.5 ],
                        [ 1, 0.5, 0.5, 1 ],
                        [ 0.5, 1, 0, 0.5 ],
                        [ 0, 0.5, 0.5, 0 ]
                    ]);
                },
                "Rectangle": _rectangle,
                "Square": _rectangle,
                "Triangle": function () {
                    return _shape([
                        [ 0.5, 0, 1, 1 ],
                        [ 1, 1, 0, 1 ],
                        [ 0, 1, 0.5, 0]
                    ]);
                },
                "Path": function (params) {
                    var points = params.points, p = [], tl = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        var l = Math.sqrt(Math.pow(points[i][2] - points[i][0]) + Math.pow(points[i][3] - points[i][1]));
                        tl += l;
                        p.push([points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], l]);
                    }
                    for (var j = 0; j < p.length; j++) {
                        p[j][4] = p[j][4] / tl;
                    }
                    return _path(p);
                }
            },
            _rotate = function (points, amountInDegrees) {
                var o = [], theta = amountInDegrees / 180 * Math.PI;
                for (var i = 0; i < points.length; i++) {
                    var _x = points[i][0] - 0.5,
                        _y = points[i][1] - 0.5;

                    o.push([
                        0.5 + ((_x * Math.cos(theta)) - (_y * Math.sin(theta))),
                        0.5 + ((_x * Math.sin(theta)) + (_y * Math.cos(theta))),
                        points[i][2],
                        points[i][3]
                    ]);
                }
                return o;
            };

        if (!_shapes[shape]) {
            throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");
        }

        var da = _shapes[shape](params);
        if (params.rotation) {
            da = _rotate(da, params.rotation);
        }
        var a = params.jsPlumbInstance.makeDynamicAnchor(da);
        a.type = "Perimeter";
        return a;
    };
}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {

    var root = this;
        root.jsPlumbUtil;
        var _jp = root.jsPlumb;

    _jp.DefaultRouter = function(jsPlumbInstance) {
        this.jsPlumbInstance = jsPlumbInstance;
        this.anchorManager = new _jp.AnchorManager({jsPlumbInstance:jsPlumbInstance});

        this.sourceOrTargetChanged = function (originalId, newId, connection, newElement, anchorIndex) {
            this.anchorManager.sourceOrTargetChanged(originalId, newId, connection, newElement, anchorIndex);
        };

        this.reset = function() {
            this.anchorManager.reset();
        };

        this.changeId = function (oldId, newId) {
            this.anchorManager.changeId(oldId, newId);
        };

        this.elementRemoved = function (elementId) {
            this.anchorManager.elementRemoved(elementId);
        };

        this.newConnection = function (conn) {
            this.anchorManager.newConnection(conn);
        };

        this.connectionDetached = function (connInfo, doNotRedraw) {
            this.anchorManager.connectionDetached(connInfo, doNotRedraw);
        };

        this.redraw = function (elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint) {
            return this.anchorManager.redraw(elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint);
        };

        this.deleteEndpoint = function (endpoint) {
            this.anchorManager.deleteEndpoint(endpoint);
        };

        this.rehomeEndpoint = function (ep, currentId, element) {
            this.anchorManager.rehomeEndpoint(ep, currentId, element);
        };

        this.addEndpoint = function (endpoint, elementId) {
            this.anchorManager.addEndpoint(endpoint, elementId);
        };
    };



}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil, _jg = root.Biltong;

    _jp.Segments = {

        /*
         * Class: AbstractSegment
         * A Connector is made up of 1..N Segments, each of which has a Type, such as 'Straight', 'Arc',
         * 'Bezier'. This is new from 1.4.2, and gives us a lot more flexibility when drawing connections: things such
         * as rounded corners for flowchart connectors, for example, or a straight line stub for Bezier connections, are
         * much easier to do now.
         *
         * A Segment is responsible for providing coordinates for painting it, and also must be able to report its length.
         * 
         */
        AbstractSegment: function (params) {
            this.params = params;

            /**
             * Function: findClosestPointOnPath
             * Finds the closest point on this segment to the given [x, y],
             * returning both the x and y of the point plus its distance from
             * the supplied point, and its location along the length of the
             * path inscribed by the segment.  This implementation returns
             * Infinity for distance and null values for everything else;
             * subclasses are expected to override.
             */
            this.findClosestPointOnPath = function (x, y) {
                return {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null
                };
            };

            this.getBounds = function () {
                return {
                    minX: Math.min(params.x1, params.x2),
                    minY: Math.min(params.y1, params.y2),
                    maxX: Math.max(params.x1, params.x2),
                    maxY: Math.max(params.y1, params.y2)
                };
            };

            /**
             * Computes the list of points on the segment that intersect the given line.
             * @method lineIntersection
             * @param {number} x1
             * @param {number} y1
             * @param {number} x2
             * @param {number} y2
             * @returns {Array<[number, number]>}
             */
            this.lineIntersection = function(x1, y1, x2, y2) {
                return [];
            };

            /**
             * Computes the list of points on the segment that intersect the box with the given origin and size.
             * @method boxIntersection
             * @param {number} x1
             * @param {number} y1
             * @param {number} w
             * @param {number} h
             * @returns {Array<[number, number]>}
             */
            this.boxIntersection = function(x, y, w, h) {
                var a = [];
                a.push.apply(a, this.lineIntersection(x, y, x + w, y));
                a.push.apply(a, this.lineIntersection(x + w, y, x + w, y + h));
                a.push.apply(a, this.lineIntersection(x + w, y + h, x, y + h));
                a.push.apply(a, this.lineIntersection(x, y + h, x, y));
                return a;
            };

            /**
             * Computes the list of points on the segment that intersect the given bounding box, which is an object of the form { x:.., y:.., w:.., h:.. }.
             * @method lineIntersection
             * @param {BoundingRectangle} box
             * @returns {Array<[number, number]>}
             */
            this.boundingBoxIntersection = function(box) {
                return this.boxIntersection(box.x, box.y, box.w, box.y);
            };
        },
        Straight: function (params) {
            _jp.Segments.AbstractSegment.apply(this, arguments);
                var length, m, m2, x1, x2, y1, y2,
                _recalc = function () {
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    m = _jg.gradient({x: x1, y: y1}, {x: x2, y: y2});
                    m2 = -1 / m;
                };

            this.type = "Straight";

            this.getLength = function () {
                return length;
            };
            this.getGradient = function () {
                return m;
            };

            this.getCoordinates = function () {
                return { x1: x1, y1: y1, x2: x2, y2: y2 };
            };
            this.setCoordinates = function (coords) {
                x1 = coords.x1;
                y1 = coords.y1;
                x2 = coords.x2;
                y2 = coords.y2;
                _recalc();
            };
            this.setCoordinates({x1: params.x1, y1: params.y1, x2: params.x2, y2: params.y2});

            this.getBounds = function () {
                return {
                    minX: Math.min(x1, x2),
                    minY: Math.min(y1, y2),
                    maxX: Math.max(x1, x2),
                    maxY: Math.max(y1, y2)
                };
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. for the straight line segment this is simple maths.
             */
            this.pointOnPath = function (location, absolute) {
                if (location === 0 && !absolute) {
                    return { x: x1, y: y1 };
                }
                else if (location === 1 && !absolute) {
                    return { x: x2, y: y2 };
                }
                else {
                    var l = absolute ? location > 0 ? location : length + location : location * length;
                    return _jg.pointOnLine({x: x1, y: y1}, {x: x2, y: y2}, l);
                }
            };

            /**
             * returns the gradient of the segment at the given point - which for us is constant.
             */
            this.gradientAtPoint = function (_) {
                return m;
            };

            /**
             * returns the point on the segment's path that is 'distance' along the length of the path from 'location', where
             * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.
             * this hands off to jsPlumbUtil to do the maths, supplying two points and the distance.
             */
            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    farAwayPoint = distance <= 0 ? {x: x1, y: y1} : {x: x2, y: y2 };

                /*
                 location == 1 ? {
                 x:x1 + ((x2 - x1) * 10),
                 y:y1 + ((y1 - y2) * 10)
                 } :
                 */

                if (distance <= 0 && Math.abs(distance) > 1) {
                    distance *= -1;
                }

                return _jg.pointOnLine(p, farAwayPoint, distance);
            };

            // is c between a and b?
            var within = function (a, b, c) {
                return c >= Math.min(a, b) && c <= Math.max(a, b);
            };
            // find which of a and b is closest to c
            var closest = function (a, b, c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b;
            };

            /**
             Function: findClosestPointOnPath
             Finds the closest point on this segment to [x,y]. See
             notes on this method in AbstractSegment.
             */
            this.findClosestPointOnPath = function (x, y) {
                var out = {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null,
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
                };

                if (m === 0) {
                    out.y = y1;
                    out.x = within(x1, x2, x) ? x : closest(x1, x2, x);
                }
                else if (m === Infinity || m === -Infinity) {
                    out.x = x1;
                    out.y = within(y1, y2, y) ? y : closest(y1, y2, y);
                }
                else {
                    // closest point lies on normal from given point to this line.  
                    var b = y1 - (m * x1),
                        b2 = y - (m2 * x),
                    // y1 = m.x1 + b and y1 = m2.x1 + b2
                    // so m.x1 + b = m2.x1 + b2
                    // x1(m - m2) = b2 - b
                    // x1 = (b2 - b) / (m - m2)
                        _x1 = (b2 - b) / (m - m2),
                        _y1 = (m * _x1) + b;

                    out.x = within(x1, x2, _x1) ? _x1 : closest(x1, x2, _x1);//_x1;
                    out.y = within(y1, y2, _y1) ? _y1 : closest(y1, y2, _y1);//_y1;
                }

                var fractionInSegment = _jg.lineLength([ out.x, out.y ], [ x1, y1 ]);
                out.d = _jg.lineLength([x, y], [out.x, out.y]);
                out.l = fractionInSegment / length;
                return out;
            };

            var _pointLiesBetween = function(q, p1, p2) {
                return (p2 > p1) ? (p1 <= q && q <= p2) : (p1 >= q && q >= p2);
            }, _plb = _pointLiesBetween;

            /**
             * Calculates all intersections of the given line with this segment.
             * @param _x1
             * @param _y1
             * @param _x2
             * @param _y2
             * @returns {Array}
             */
            this.lineIntersection = function(_x1, _y1, _x2, _y2) {
                var m2 = Math.abs(_jg.gradient({x: _x1, y: _y1}, {x: _x2, y: _y2})),
                    m1 = Math.abs(m),
                    b = m1 === Infinity ? x1 : y1 - (m1 * x1),
                    out = [],
                    b2 = m2 === Infinity ? _x1 : _y1 - (m2 * _x1);

                // if lines parallel, no intersection
                if  (m2 !== m1) {
                    // perpendicular, segment horizontal
                    if(m2 === Infinity  && m1 === 0) {
                        if (_plb(_x1, x1, x2) && _plb(y1, _y1, _y2)) {
                            out = [ _x1, y1 ];  // we return X on the incident line and Y from the segment
                        }
                    } else if(m2 === 0 && m1 === Infinity) {
                        // perpendicular, segment vertical
                        if(_plb(_y1, y1, y2) && _plb(x1, _x1, _x2)) {
                            out = [x1, _y1];  // we return X on the segment and Y from the incident line
                        }
                    } else {
                        var X, Y;
                        if (m2 === Infinity) {
                            // test line is a vertical line. where does it cross the segment?
                            X = _x1;
                            if (_plb(X, x1, x2)) {
                                Y = (m1 * _x1) + b;
                                if (_plb(Y, _y1, _y2)) {
                                    out = [ X, Y ];
                                }
                            }
                        } else if (m2 === 0) {
                            Y = _y1;
                            // test line is a horizontal line. where does it cross the segment?
                            if (_plb(Y, y1, y2)) {
                                X = (_y1 - b) / m1;
                                if (_plb(X, _x1, _x2)) {
                                    out = [ X, Y ];
                                }
                            }
                        } else {
                            // mX + b = m2X + b2
                            // mX - m2X = b2 - b
                            // X(m - m2) = b2 - b
                            // X = (b2 - b) / (m - m2)
                            // Y = mX + b
                            X = (b2 - b) / (m1 - m2);
                            Y = (m1 * X) + b;
                            if(_plb(X, x1, x2) && _plb(Y, y1, y2)) {
                                out = [ X,  Y];
                            }
                        }
                    }
                }

                return out;
            };

            /**
             * Calculates all intersections of the given box with this segment. By default this method simply calls `lineIntersection` with each of the four
             * faces of the box; subclasses can override this if they think there's a faster way to compute the entire box at once.
             * @param x X position of top left corner of box
             * @param y Y position of top left corner of box
             * @param w width of box
             * @param h height of box
             * @returns {Array}
             */
            this.boxIntersection = function(x, y, w, h) {
                var a = [];
                a.push.apply(a, this.lineIntersection(x, y, x + w, y));
                a.push.apply(a, this.lineIntersection(x + w, y, x + w, y + h));
                a.push.apply(a, this.lineIntersection(x + w, y + h, x, y + h));
                a.push.apply(a, this.lineIntersection(x, y + h, x, y));
                return a;
            };

            /**
             * Calculates all intersections of the given bounding box with this segment. By default this method simply calls `lineIntersection` with each of the four
             * faces of the box; subclasses can override this if they think there's a faster way to compute the entire box at once.
             * @param box Bounding box, in { x:.., y:..., w:..., h:... } format.
             * @returns {Array}
             */
            this.boundingBoxIntersection = function(box) {
                return this.boxIntersection(box.x, box.y, box.w, box.h);
            };
        },

        /*
         Arc Segment. You need to supply:

         r   -   radius
         cx  -   center x for the arc
         cy  -   center y for the arc
         ac  -   whether the arc is anticlockwise or not. default is clockwise.

         and then either:

         startAngle  -   startAngle for the arc.
         endAngle    -   endAngle for the arc.

         or:

         x1          -   x for start point
         y1          -   y for start point
         x2          -   x for end point
         y2          -   y for end point

         */
        Arc: function (params) {
            _jp.Segments.AbstractSegment.apply(this, arguments);
                var _calcAngle = function (_x, _y) {
                    return _jg.theta([params.cx, params.cy], [_x, _y]);
                },
                _calcAngleForLocation = function (segment, location) {
                    if (segment.anticlockwise) {
                        var sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
                            s = Math.abs(sa - segment.endAngle);
                        return sa - (s * location);
                    }
                    else {
                        var ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
                            ss = Math.abs(ea - segment.startAngle);

                        return segment.startAngle + (ss * location);
                    }
                },
                TWO_PI = 2 * Math.PI;

            this.radius = params.r;
            this.anticlockwise = params.ac;
            this.type = "Arc";

            if (params.startAngle && params.endAngle) {
                this.startAngle = params.startAngle;
                this.endAngle = params.endAngle;
                this.x1 = params.cx + (this.radius * Math.cos(params.startAngle));
                this.y1 = params.cy + (this.radius * Math.sin(params.startAngle));
                this.x2 = params.cx + (this.radius * Math.cos(params.endAngle));
                this.y2 = params.cy + (this.radius * Math.sin(params.endAngle));
            }
            else {
                this.startAngle = _calcAngle(params.x1, params.y1);
                this.endAngle = _calcAngle(params.x2, params.y2);
                this.x1 = params.x1;
                this.y1 = params.y1;
                this.x2 = params.x2;
                this.y2 = params.y2;
            }

            if (this.endAngle < 0) {
                this.endAngle += TWO_PI;
            }
            if (this.startAngle < 0) {
                this.startAngle += TWO_PI;
            }

            // segment is used by vml     
            //this.segment = _jg.quadrant([this.x1, this.y1], [this.x2, this.y2]);

            // we now have startAngle and endAngle as positive numbers, meaning the
            // absolute difference (|d|) between them is the sweep (s) of this arc, unless the
            // arc is 'anticlockwise' in which case 's' is given by 2PI - |d|.

            var ea = this.endAngle < this.startAngle ? this.endAngle + TWO_PI : this.endAngle;
            this.sweep = Math.abs(ea - this.startAngle);
            if (this.anticlockwise) {
                this.sweep = TWO_PI - this.sweep;
            }
            var circumference = 2 * Math.PI * this.radius,
                frac = this.sweep / TWO_PI,
                length = circumference * frac;

            this.getLength = function () {
                return length;
            };

            this.getBounds = function () {
                return {
                    minX: params.cx - params.r,
                    maxX: params.cx + params.r,
                    minY: params.cy - params.r,
                    maxY: params.cy + params.r
                };
            };

            var VERY_SMALL_VALUE = 0.0000000001,
                gentleRound = function (n) {
                    var f = Math.floor(n), r = Math.ceil(n);
                    if (n - f < VERY_SMALL_VALUE) {
                        return f;
                    }
                    else if (r - n < VERY_SMALL_VALUE) {
                        return r;
                    }
                    return n;
                };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {

                if (location === 0) {
                    return { x: this.x1, y: this.y1, theta: this.startAngle };
                }
                else if (location === 1) {
                    return { x: this.x2, y: this.y2, theta: this.endAngle };
                }

                if (absolute) {
                    location = location / length;
                }

                var angle = _calcAngleForLocation(this, location),
                    _x = params.cx + (params.r * Math.cos(angle)),
                    _y = params.cy + (params.r * Math.sin(angle));

                return { x: gentleRound(_x), y: gentleRound(_y), theta: angle };
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                var p = this.pointOnPath(location, absolute);
                var m = _jg.normal([ params.cx, params.cy ], [p.x, p.y ]);
                if (!this.anticlockwise && (m === Infinity || m === -Infinity)) {
                    m *= -1;
                }
                return m;
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    arcSpan = distance / circumference * 2 * Math.PI,
                    dir = this.anticlockwise ? -1 : 1,
                    startAngle = p.theta + (dir * arcSpan),
                    startX = params.cx + (this.radius * Math.cos(startAngle)),
                    startY = params.cy + (this.radius * Math.sin(startAngle));

                return {x: startX, y: startY};
            };

            // TODO: lineIntersection
        },

        Bezier: function (params) {
            this.curve = [
                { x: params.x1, y: params.y1},
                { x: params.cp1x, y: params.cp1y },
                { x: params.cp2x, y: params.cp2y },
                { x: params.x2, y: params.y2 }
            ];

            var _isPoint = function(c) {
                return c[0].x === c[1].x && c[0].y === c[1].y;
            };

            var _dist = function(p1, p2 ) {
                return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            };

            var _compute = function(loc) {

                var EMPTY_POINT  = {x:0, y:0};

                if (loc === 0) {
                    return this.curve[0];
                }

                var degree = this.curve.length - 1;

                if (loc === 1) {
                    return this.curve[degree];
                }

                var o = this.curve;
                var s = 1 - loc;

                if (degree === 0) {
                    return this.curve[0];
                }

                if (degree === 1) {
                    return {
                        x: s * o[0].x + loc * o[1].x,
                        y: s * o[0].y + loc * o[1].y
                    };
                }

                if (degree < 4) {

                    var l = s * s, h = loc * loc, u = 0, m, g, f;

                    if (degree === 2) {
                        o = [o[0], o[1], o[2], EMPTY_POINT];
                        m = l;
                        g = 2 * (s * loc);
                        f = h;
                    } else if (degree === 3) {
                        m = l * s;
                        g = 3 * (l * loc);
                        f = 3 * (s * h);
                        u = loc * h;
                    }

                    return {
                        x: m * o[0].x + g * o[1].x + f * o[2].x + u * o[3].x,
                        y: m * o[0].y + g * o[1].y + f * o[2].y + u * o[3].y
                    };
                } else {
                    return EMPTY_POINT; // not supported.
                }
            }.bind(this);

            var _getLUT = function(steps) {
                var out = [];
                steps--;
                for (var n = 0; n <= steps; n++) {
                    out.push(_compute(n / steps));
                }
                return out;
            };

            var _computeLength = function() {

                if (_isPoint(this.curve)) {
                    this.length = 0;
                }

                var steps = 16;
                var  lut = _getLUT(steps);
                this.length = 0;

                for (var i = 0; i < steps - 1; i++) {
                    var a = lut[i], b = lut[i + 1];
                    this.length += _dist(a, b);
                }
            }.bind(this);

            _jp.Segments.AbstractSegment.apply(this, arguments);
            // although this is not a strictly rigorous determination of bounds
            // of a bezier curve, it works for the types of curves that this segment
            // type produces.
            this.bounds = {
                minX: Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
                minY: Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
                maxX: Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
                maxY: Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
            };

            this.type = "Bezier";

            _computeLength();

            var _translateLocation = function (_curve, location, absolute) {
                if (absolute) {
                    location = root.jsBezier.locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);
                }

                return location;
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointOnCurve(this.curve, location);
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.gradientAtPoint(this.curve, location);
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointAlongCurveFrom(this.curve, location, distance);
            };

            this.getLength = function () {
                return this.length;
            };

            this.getBounds = function () {
                return this.bounds;
            };

            this.findClosestPointOnPath = function (x, y) {
                var p = root.jsBezier.nearestPointOnCurve({x:x,y:y}, this.curve);
                return {
                    d:Math.sqrt(Math.pow(p.point.x - x, 2) + Math.pow(p.point.y - y, 2)),
                    x:p.point.x,
                    y:p.point.y,
                    l:1 - p.location,
                    s:this
                };
            };

            this.lineIntersection = function(x1, y1, x2, y2) {
                return root.jsBezier.lineIntersection(x1, y1, x2, y2, this.curve);
            };
        }
    };

    _jp.SegmentRenderer = {
        getPath: function (segment, isFirstSegment) {
            return ({
                "Straight": function (isFirstSegment) {
                    var d = segment.getCoordinates();
                    return (isFirstSegment ? "M " + d.x1 + " " + d.y1 + " " : "") + "L " + d.x2 + " " + d.y2;
                },
                "Bezier": function (isFirstSegment) {
                    var d = segment.params;
                    return (isFirstSegment ? "M " + d.x2 + " " + d.y2 + " " : "") +
                        "C " + d.cp2x + " " + d.cp2y + " " + d.cp1x + " " + d.cp1y + " " + d.x1 + " " + d.y1;
                },
                "Arc": function (isFirstSegment) {
                    var d = segment.params,
                        laf = segment.sweep > Math.PI ? 1 : 0,
                        sf = segment.anticlockwise ? 0 : 1;

                    return  (isFirstSegment ? "M" + segment.x1 + " " + segment.y1  + " " : "")  + "A " + segment.radius + " " + d.r + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
                }
            })[segment.type](isFirstSegment);
        }
    };

    /*
     Class: UIComponent
     Superclass for Connector and AbstractEndpoint.
     */
    var AbstractComponent = function () {
        this.resetBounds = function () {
            this.bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
        };
        this.resetBounds();
    };

    /*
     * Class: Connector
     * Superclass for all Connectors; here is where Segments are managed.  This is exposed on jsPlumb just so it
     * can be accessed from other files. You should not try to instantiate one of these directly.
     *
     * When this class is asked for a pointOnPath, or gradient etc, it must first figure out which segment to dispatch
     * that request to. This is done by keeping track of the total connector length as segments are added, and also
     * their cumulative ratios to the total length.  Then when the right segment is found it is a simple case of dispatching
     * the request to it (and adjusting 'location' so that it is relative to the beginning of that segment.)
     */
    _jp.Connectors.AbstractConnector = function (params) {

        AbstractComponent.apply(this, arguments);

        var segments = [],
            totalLength = 0,
            segmentProportions = [],
            segmentProportionalLengths = [],
            stub = params.stub || 0,
            sourceStub = _ju.isArray(stub) ? stub[0] : stub,
            targetStub = _ju.isArray(stub) ? stub[1] : stub,
            gap = params.gap || 0,
            sourceGap = _ju.isArray(gap) ? gap[0] : gap,
            targetGap = _ju.isArray(gap) ? gap[1] : gap,
            userProvidedSegments = null,
            paintInfo = null;

        this.getPathData = function() {
            var p = "";
            for (var i = 0; i < segments.length; i++) {
                p += _jp.SegmentRenderer.getPath(segments[i], i === 0);
                p += " ";
            }
            return p;
        };

        /**
         * Function: findSegmentForPoint
         * Returns the segment that is closest to the given [x,y],
         * null if nothing found.  This function returns a JS
         * object with:
         *
         *   d   -   distance from segment
         *   l   -   proportional location in segment
         *   x   -   x point on the segment
         *   y   -   y point on the segment
         *   s   -   the segment itself.
         *   connectorLocation - the location on the connector of the point, expressed as a decimal between 0 and 1 inclusive.
         */
        this.findSegmentForPoint = function (x, y) {
            var out = { d: Infinity, s: null, x: null, y: null, l: null };
            for (var i = 0; i < segments.length; i++) {
                var _s = segments[i].findClosestPointOnPath(x, y);
                if (_s.d < out.d) {
                    out.d = _s.d;
                    out.l = _s.l;
                    out.x = _s.x;
                    out.y = _s.y;
                    out.s = segments[i];
                    out.x1 = _s.x1;
                    out.x2 = _s.x2;
                    out.y1 = _s.y1;
                    out.y2 = _s.y2;
                    out.index = i;
                    out.connectorLocation = segmentProportions[i][0] + (_s.l * (segmentProportions[i][1] - segmentProportions[i][0]));
                }
            }

            return out;
        };

        this.lineIntersection = function(x1, y1, x2, y2) {
            var out = [];
            for (var i = 0; i < segments.length; i++) {
                out.push.apply(out, segments[i].lineIntersection(x1, y1, x2, y2));
            }
            return out;
        };

        this.boxIntersection = function(x, y, w, h) {
            var out = [];
            for (var i = 0; i < segments.length; i++) {
                out.push.apply(out, segments[i].boxIntersection(x, y, w, h));
            }
            return out;
        };

        this.boundingBoxIntersection = function(box) {
            var out = [];
            for (var i = 0; i < segments.length; i++) {
                out.push.apply(out, segments[i].boundingBoxIntersection(box));
            }
            return out;
        };

        var _updateSegmentProportions = function () {
                var curLoc = 0;
                for (var i = 0; i < segments.length; i++) {
                    var sl = segments[i].getLength();
                    segmentProportionalLengths[i] = sl / totalLength;
                    segmentProportions[i] = [curLoc, (curLoc += (sl / totalLength)) ];
                }
            },

            /**
             * returns [segment, proportion of travel in segment, segment index] for the segment
             * that contains the point which is 'location' distance along the entire path, where
             * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
             * are made up of a list of segments, each of which contributes some fraction to
             * the total length.
             * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
             * as the absolute distance in pixels, rather than a proportion of the total path.
             */
            _findSegmentForLocation = function (location, absolute) {

                var idx, i, inSegmentProportion;

                if (absolute) {
                    location = location > 0 ? location / totalLength : (totalLength + location) / totalLength;
                }

                // if location 1 we know its the last segment
                if (location === 1) {
                    idx = segments.length - 1;
                    inSegmentProportion = 1;
                } else if (location === 0) {
                    // if location 0 we know its the first segment
                    inSegmentProportion = 0;
                    idx = 0;
                } else {

                    // if location >= 0.5, traverse backwards (of course not exact, who knows the segment proportions. but
                    // an educated guess at least)
                    if (location >= 0.5) {

                        idx = 0;
                        inSegmentProportion = 0;
                        for (i = segmentProportions.length - 1; i > -1; i--) {
                            if (segmentProportions[i][1] >= location && segmentProportions[i][0] <= location) {
                                idx = i;
                                inSegmentProportion = (location - segmentProportions[i][0]) / segmentProportionalLengths[i];
                                break;
                            }
                        }

                    } else {
                        idx = segmentProportions.length - 1;
                        inSegmentProportion = 1;
                        for (i = 0; i < segmentProportions.length; i++) {
                            if (segmentProportions[i][1] >= location) {
                                idx = i;
                                inSegmentProportion = (location - segmentProportions[i][0]) / segmentProportionalLengths[i];
                                break;
                            }
                        }
                    }
                }

                return { segment: segments[idx], proportion: inSegmentProportion, index: idx };
            },
            _addSegment = function (conn, type, params) {
                if (params.x1 === params.x2 && params.y1 === params.y2) {
                    return;
                }
                var s = new _jp.Segments[type](params);
                segments.push(s);
                totalLength += s.getLength();
                conn.updateBounds(s);
            },
            _clearSegments = function () {
                totalLength = segments.length = segmentProportions.length = segmentProportionalLengths.length = 0;
            };

        this.setSegments = function (_segs) {
            userProvidedSegments = [];
            totalLength = 0;
            for (var i = 0; i < _segs.length; i++) {
                userProvidedSegments.push(_segs[i]);
                totalLength += _segs[i].getLength();
            }
        };

        this.getLength = function() {
            return totalLength;
        };

        var _prepareCompute = function (params) {
            this.strokeWidth = params.strokeWidth;
            var segment = _jg.quadrant(params.sourcePos, params.targetPos),
                swapX = params.targetPos[0] < params.sourcePos[0],
                swapY = params.targetPos[1] < params.sourcePos[1],
                lw = params.strokeWidth || 1,
                so = params.sourceEndpoint.anchor.getOrientation(params.sourceEndpoint),
                to = params.targetEndpoint.anchor.getOrientation(params.targetEndpoint),
                x = swapX ? params.targetPos[0] : params.sourcePos[0],
                y = swapY ? params.targetPos[1] : params.sourcePos[1],
                w = Math.abs(params.targetPos[0] - params.sourcePos[0]),
                h = Math.abs(params.targetPos[1] - params.sourcePos[1]);
            
            // if either anchor does not have an orientation set, we derive one from their relative
            // positions.  we fix the axis to be the one in which the two elements are further apart, and
            // point each anchor at the other element.  this is also used when dragging a new connection.
            if (so[0] === 0 && so[1] === 0 || to[0] === 0 && to[1] === 0) {
                var index = w > h ? 0 : 1, oIndex = [1, 0][index];
                so = [];
                to = [];
                so[index] = params.sourcePos[index] > params.targetPos[index] ? -1 : 1;
                to[index] = params.sourcePos[index] > params.targetPos[index] ? 1 : -1;
                so[oIndex] = 0;
                to[oIndex] = 0;
            }

            var sx = swapX ? w + (sourceGap * so[0]) : sourceGap * so[0],
                sy = swapY ? h + (sourceGap * so[1]) : sourceGap * so[1],
                tx = swapX ? targetGap * to[0] : w + (targetGap * to[0]),
                ty = swapY ? targetGap * to[1] : h + (targetGap * to[1]),
                oProduct = ((so[0] * to[0]) + (so[1] * to[1]));

            var result = {
                sx: sx, sy: sy, tx: tx, ty: ty, lw: lw,
                xSpan: Math.abs(tx - sx),
                ySpan: Math.abs(ty - sy),
                mx: (sx + tx) / 2,
                my: (sy + ty) / 2,
                so: so, to: to, x: x, y: y, w: w, h: h,
                segment: segment,
                startStubX: sx + (so[0] * sourceStub),
                startStubY: sy + (so[1] * sourceStub),
                endStubX: tx + (to[0] * targetStub),
                endStubY: ty + (to[1] * targetStub),
                isXGreaterThanStubTimes2: Math.abs(sx - tx) > (sourceStub + targetStub),
                isYGreaterThanStubTimes2: Math.abs(sy - ty) > (sourceStub + targetStub),
                opposite: oProduct === -1,
                perpendicular: oProduct === 0,
                orthogonal: oProduct === 1,
                sourceAxis: so[0] === 0 ? "y" : "x",
                points: [x, y, w, h, sx, sy, tx, ty ],
                stubs:[sourceStub, targetStub]
            };
            result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
            return result;
        };

        this.getSegments = function () {
            return segments;
        };

        this.updateBounds = function (segment) {
            var segBounds = segment.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, segBounds.minX);
            this.bounds.maxX = Math.max(this.bounds.maxX, segBounds.maxX);
            this.bounds.minY = Math.min(this.bounds.minY, segBounds.minY);
            this.bounds.maxY = Math.max(this.bounds.maxY, segBounds.maxY);
        };

        this.pointOnPath = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.pointOnPath(seg.proportion, false) || [0, 0];
        };

        this.gradientAtPoint = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.gradientAtPoint(seg.proportion, false) || 0;
        };

        this.pointAlongPathFrom = function (location, distance, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            // TODO what happens if this crosses to the next segment?
            return seg.segment && seg.segment.pointAlongPathFrom(seg.proportion, distance, false) || [0, 0];
        };

        this.compute = function (params) {
            paintInfo = _prepareCompute.call(this, params);

            _clearSegments();
            this._compute(paintInfo, params);
            this.x = paintInfo.points[0];
            this.y = paintInfo.points[1];
            this.w = paintInfo.points[2];
            this.h = paintInfo.points[3];
            this.segment = paintInfo.segment;
            _updateSegmentProportions();
        };

        return {
            addSegment: _addSegment,
            prepareCompute: _prepareCompute,
            sourceStub: sourceStub,
            targetStub: targetStub,
            maxStub: Math.max(sourceStub, targetStub),
            sourceGap: sourceGap,
            targetGap: targetGap,
            maxGap: Math.max(sourceGap, targetGap)
        };
    };
    _ju.extend(_jp.Connectors.AbstractConnector, AbstractComponent);


    // ********************************* END OF CONNECTOR TYPES *******************************************************************

    // ********************************* ENDPOINT TYPES *******************************************************************

    _jp.Endpoints.AbstractEndpoint = function (params) {
        AbstractComponent.apply(this, arguments);
        var compute = this.compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var out = this._compute.apply(this, arguments);
            this.x = out[0];
            this.y = out[1];
            this.w = out[2];
            this.h = out[3];
            this.bounds.minX = this.x;
            this.bounds.minY = this.y;
            this.bounds.maxX = this.x + this.w;
            this.bounds.maxY = this.y + this.h;
            return out;
        };
        return {
            compute: compute,
            cssClass: params.cssClass
        };
    };
    _ju.extend(_jp.Endpoints.AbstractEndpoint, AbstractComponent);

    /**
     * Class: Endpoints.Dot
     * A round endpoint, with default radius 10 pixels.
     */

    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    radius    -    radius of the endpoint.  defaults to 10 pixels.
     */
    _jp.Endpoints.Dot = function (params) {
        this.type = "Dot";
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.radius = params.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.radius = endpointStyle.radius || this.radius;
            var x = anchorPoint[0] - this.radius,
                y = anchorPoint[1] - this.radius,
                w = this.radius * 2,
                h = this.radius * 2;

            if (endpointStyle.stroke) {
                var lw = endpointStyle.strokeWidth || 1;
                x -= lw;
                y -= lw;
                w += (lw * 2);
                h += (lw * 2);
            }
            return [ x, y, w, h, this.radius ];
        };
    };
    _ju.extend(_jp.Endpoints.Dot, _jp.Endpoints.AbstractEndpoint);

    _jp.Endpoints.Rectangle = function (params) {
        this.type = "Rectangle";
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.width = params.width || 20;
        this.height = params.height || 20;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || this.width,
                height = endpointStyle.height || this.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);

            return [ x, y, width, height];
        };
    };
    _ju.extend(_jp.Endpoints.Rectangle, _jp.Endpoints.AbstractEndpoint);

    var DOMElementEndpoint = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.displayElements = [];
    };
    _ju.extend(DOMElementEndpoint, _jp.jsPlumbUIComponent, {
        getDisplayElements: function () {
            return this._jsPlumb.displayElements;
        },
        appendDisplayElement: function (el) {
            this._jsPlumb.displayElements.push(el);
        }
    });

    /**
     * Class: Endpoints.Image
     * Draws an image as the Endpoint.
     */
    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    src    -    location of the image to use.

     TODO: multiple references to self. not sure quite how to get rid of them entirely. perhaps self = null in the cleanup
     function will suffice

     TODO this class still might leak memory.

     */
    _jp.Endpoints.Image = function (params) {

        this.type = "Image";
        DOMElementEndpoint.apply(this, arguments);
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);

        var _onload = params.onload,
            src = params.src || params.url,
            clazz = params.cssClass ? " " + params.cssClass : "";

        this._jsPlumb.img = new Image();
        this._jsPlumb.ready = false;
        this._jsPlumb.initialized = false;
        this._jsPlumb.deleted = false;
        this._jsPlumb.widthToUse = params.width;
        this._jsPlumb.heightToUse = params.height;
        this._jsPlumb.endpoint = params.endpoint;

        this._jsPlumb.img.onload = function () {
            if (this._jsPlumb != null) {
                this._jsPlumb.ready = true;
                this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width;
                this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height;
                if (_onload) {
                    _onload(this);
                }
            }
        }.bind(this);

        /*
         Function: setImage
         Sets the Image to use in this Endpoint.

         Parameters:
         img         -   may be a URL or an Image object
         onload      -   optional; a callback to execute once the image has loaded.
         */
        this._jsPlumb.endpoint.setImage = function (_img, onload) {
            var s = _img.constructor === String ? _img : _img.src;
            _onload = onload;
            this._jsPlumb.img.src = s;

            if (this.canvas != null) {
                this.canvas.setAttribute("src", this._jsPlumb.img.src);
            }
        }.bind(this);

        this._jsPlumb.endpoint.setImage(src, _onload);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.anchorPoint = anchorPoint;
            if (this._jsPlumb.ready) {
                return [anchorPoint[0] - this._jsPlumb.widthToUse / 2, anchorPoint[1] - this._jsPlumb.heightToUse / 2,
                    this._jsPlumb.widthToUse, this._jsPlumb.heightToUse];
            }
            else {
                return [0, 0, 0, 0];
            }
        };

        this.canvas = _jp.createElement("img", {
            position:"absolute",
            margin:0,
            padding:0,
            outline:0
        }, this._jsPlumb.instance.endpointClass + clazz);

        if (this._jsPlumb.widthToUse) {
            this.canvas.setAttribute("width", this._jsPlumb.widthToUse);
        }
        if (this._jsPlumb.heightToUse) {
            this.canvas.setAttribute("height", this._jsPlumb.heightToUse);
        }
        this._jsPlumb.instance.appendElement(this.canvas);

        this.actuallyPaint = function (d, style, anchor) {
            if (!this._jsPlumb.deleted) {
                if (!this._jsPlumb.initialized) {
                    this.canvas.setAttribute("src", this._jsPlumb.img.src);
                    this.appendDisplayElement(this.canvas);
                    this._jsPlumb.initialized = true;
                }
                var x = this.anchorPoint[0] - (this._jsPlumb.widthToUse / 2),
                    y = this.anchorPoint[1] - (this._jsPlumb.heightToUse / 2);
                _ju.sizeElement(this.canvas, x, y, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse);
            }
        };

        this.paint = function (style, anchor) {
            if (this._jsPlumb != null) {  // may have been deleted
                if (this._jsPlumb.ready) {
                    this.actuallyPaint(style, anchor);
                }
                else {
                    root.setTimeout(function () {
                        this.paint(style, anchor);
                    }.bind(this), 200);
                }
            }
        };
    };
    _ju.extend(_jp.Endpoints.Image, [ DOMElementEndpoint, _jp.Endpoints.AbstractEndpoint ], {
        cleanup: function (force) {
            if (force) {
                this._jsPlumb.deleted = true;
                if (this.canvas) {
                    this.canvas.parentNode.removeChild(this.canvas);
                }
                this.canvas = null;
            }
        }
    });

    /*
     * Class: Endpoints.Blank
     * An Endpoint that paints nothing (visible) on the screen.  Supports cssClass and hoverClass parameters like all Endpoints.
     */
    _jp.Endpoints.Blank = function (params) {
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank";
        DOMElementEndpoint.apply(this, arguments);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            return [anchorPoint[0], anchorPoint[1], 10, 0];
        };

        var clazz = params.cssClass ? " " + params.cssClass : "";

        this.canvas = _jp.createElement("div", {
            display: "block",
            width: "1px",
            height: "1px",
            background: "transparent",
            position: "absolute"
        }, this._jsPlumb.instance.endpointClass + clazz);

        this._jsPlumb.instance.appendElement(this.canvas);

        this.paint = function (style, anchor) {
            _ju.sizeElement(this.canvas, this.x, this.y, this.w, this.h);
        };
    };
    _ju.extend(_jp.Endpoints.Blank, [_jp.Endpoints.AbstractEndpoint, DOMElementEndpoint], {
        cleanup: function () {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    });

    /*
     * Class: Endpoints.Triangle
     * A triangular Endpoint.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * width   width of the triangle's base.  defaults to 55 pixels.
     * height  height of the triangle from base to apex.  defaults to 55 pixels.
     */
    _jp.Endpoints.Triangle = function (params) {
        this.type = "Triangle";
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        var self = this;
        params = params || {  };
        params.width = params.width || 55;
        params.height = params.height || 55;
        this.width = params.width;
        this.height = params.height;
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || self.width,
                height = endpointStyle.height || self.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);
            return [ x, y, width, height ];
        };
    };
// ********************************* END OF ENDPOINT TYPES *******************************************************************


// ********************************* OVERLAY DEFINITIONS ***********************************************************************    

    var AbstractOverlay = _jp.Overlays.AbstractOverlay = function (params) {
        this.visible = true;
        this.isAppendedAtTopLevel = true;
        this.component = params.component;
        this.loc = params.location == null ? 0.5 : params.location;
        this.endpointLoc = params.endpointLocation == null ? [ 0.5, 0.5] : params.endpointLocation;
        this.visible = params.visible !== false;
    };
    AbstractOverlay.prototype = {
        cleanup: function (force) {
            if (force) {
                this.component = null;
                this.canvas = null;
                this.endpointLoc = null;
            }
        },
        reattach:function(instance, component) { },
        setVisible: function (val) {
            this.visible = val;
            this.component.repaint();
        },
        isVisible: function () {
            return this.visible;
        },
        hide: function () {
            this.setVisible(false);
        },
        show: function () {
            this.setVisible(true);
        },
        incrementLocation: function (amount) {
            this.loc += amount;
            this.component.repaint();
        },
        setLocation: function (l) {
            this.loc = l;
            this.component.repaint();
        },
        getLocation: function () {
            return this.loc;
        },
        updateFrom:function() { }
    };


    /*
     * Class: Overlays.Arrow
     *
     * An arrow overlay, defined by four points: the head, the two sides of the tail, and a 'foldback' point at some distance along the length
     * of the arrow that lines from each tail point converge into.  The foldback point is defined using a decimal that indicates some fraction
     * of the length of the arrow and has a default value of 0.623.  A foldback point value of 1 would mean that the arrow had a straight line
     * across the tail.
     */
    /*
     * @constructor
     *
     * @param {Object} params Constructor params.
     * @param {Number} [params.length] Distance in pixels from head to tail baseline. default 20.
     * @param {Number} [params.width] Width in pixels of the tail baseline. default 20.
     * @param {String} [params.fill] Style to use when filling the arrow.  defaults to "black".
     * @param {String} [params.stroke] Style to use when stroking the arrow. defaults to null, which means the arrow is not stroked.
     * @param {Number} [params.stroke-width] Line width to use when stroking the arrow. defaults to 1, but only used if stroke is not null.
     * @param {Number} [params.foldback] Distance (as a decimal from 0 to 1 inclusive) along the length of the arrow marking the point the tail points should fold back to.  defaults to 0.623.
     * @param {Number} [params.location] Distance (as a decimal from 0 to 1 inclusive) marking where the arrow should sit on the connector. defaults to 0.5.
     * @param {NUmber} [params.direction] Indicates the direction the arrow points in. valid values are -1 and 1; 1 is default.
     */
    _jp.Overlays.Arrow = function (params) {
        this.type = "Arrow";
        AbstractOverlay.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
        params = params || {};
        var self = this;

        this.length = params.length || 20;
        this.width = params.width || 20;
        this.id = params.id;
        this.direction = (params.direction || 1) < 0 ? -1 : 1;
        var paintStyle = params.paintStyle || { "stroke-width": 1 },
        // how far along the arrow the lines folding back in come to. default is 62.3%.
            foldback = params.foldback || 0.623;

        this.computeMaxSize = function () {
            return self.width * 1.5;
        };

        this.elementCreated = function(p, component) {
            this.path = p;
            if (params.events) {
                for (var i in params.events) {
                    _jp.on(p, i, params.events[i]);
                }
            }
        };

        this.draw = function (component, currentConnectionPaintStyle) {

            var hxy, mid, txy, tail, cxy;
            if (component.pointAlongPathFrom) {

                if (_ju.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                    var l = parseInt(this.loc, 10),
                        fromLoc = this.loc < 0 ? 1 : 0;
                    hxy = component.pointAlongPathFrom(fromLoc, l, false);
                    mid = component.pointAlongPathFrom(fromLoc, l - (this.direction * this.length / 2), false);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }
                else if (this.loc === 1) {
                    hxy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, -(this.length));
                    txy = _jg.pointOnLine(hxy, mid, this.length);

                    if (this.direction === -1) {
                        var _ = txy;
                        txy = hxy;
                        hxy = _;
                    }
                }
                else if (this.loc === 0) {
                    txy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, this.length);
                    hxy = _jg.pointOnLine(txy, mid, this.length);
                    if (this.direction === -1) {
                        var __ = txy;
                        txy = hxy;
                        hxy = __;
                    }
                }
                else {
                    hxy = component.pointAlongPathFrom(this.loc, this.direction * this.length / 2);
                    mid = component.pointOnPath(this.loc);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }

                tail = _jg.perpendicularLineTo(hxy, txy, this.width);
                cxy = _jg.pointOnLine(hxy, txy, foldback * this.length);

                var d = { hxy: hxy, tail: tail, cxy: cxy },
                    stroke = paintStyle.stroke || currentConnectionPaintStyle.stroke,
                    fill = paintStyle.fill || currentConnectionPaintStyle.stroke,
                    lineWidth = paintStyle.strokeWidth || currentConnectionPaintStyle.strokeWidth;

                return {
                    component: component,
                    d: d,
                    "stroke-width": lineWidth,
                    stroke: stroke,
                    fill: fill,
                    minX: Math.min(hxy.x, tail[0].x, tail[1].x),
                    maxX: Math.max(hxy.x, tail[0].x, tail[1].x),
                    minY: Math.min(hxy.y, tail[0].y, tail[1].y),
                    maxY: Math.max(hxy.y, tail[0].y, tail[1].y)
                };
            }
            else {
                return {component: component, minX: 0, maxX: 0, minY: 0, maxY: 0};
            }
        };
    };
    _ju.extend(_jp.Overlays.Arrow, AbstractOverlay, {
        updateFrom:function(d) {
            this.length = d.length || this.length;
            this.width = d.width|| this.width;
            this.direction = d.direction != null ? d.direction : this.direction;
            this.foldback = d.foldback|| this.foldback;
        },
        cleanup:function() {
            if (this.path && this.path.parentNode) {
                this.path.parentNode.removeChild(this.path);
            }
        }
    });

    /*
     * Class: Overlays.PlainArrow
     *
     * A basic arrow.  This is in fact just one instance of the more generic case in which the tail folds back on itself to some
     * point along the length of the arrow: in this case, that foldback point is the full length of the arrow.  so it just does
     * a 'call' to Arrow with foldback set appropriately.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.PlainArrow = function (params) {
        params = params || {};
        var p = _jp.extend(params, {foldback: 1});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "PlainArrow";
    };
    _ju.extend(_jp.Overlays.PlainArrow, _jp.Overlays.Arrow);

    /*
     * Class: Overlays.Diamond
     * 
     * A diamond. Like PlainArrow, this is a concrete case of the more generic case of the tail points converging on some point...it just
     * happens that in this case, that point is greater than the length of the the arrow.
     *
     *      this could probably do with some help with positioning...due to the way it reuses the Arrow paint code, what Arrow thinks is the
     *      center is actually 1/4 of the way along for this guy.  but we don't have any knowledge of pixels at this point, so we're kind of
     *      stuck when it comes to helping out the Arrow class. possibly we could pass in a 'transpose' parameter or something. the value
     *      would be -l/4 in this case - move along one quarter of the total length.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.Diamond = function (params) {
        params = params || {};
        var l = params.length || 40,
            p = _jp.extend(params, {length: l / 2, foldback: 2});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "Diamond";
    };
    _ju.extend(_jp.Overlays.Diamond, _jp.Overlays.Arrow);

    var _getDimensions = function (component, forceRefresh) {
        if (component._jsPlumb.cachedDimensions == null || forceRefresh) {
            component._jsPlumb.cachedDimensions = component.getDimensions();
        }
        return component._jsPlumb.cachedDimensions;
    };

    // abstract superclass for overlays that add an element to the DOM.
    var AbstractDOMOverlay = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        AbstractOverlay.apply(this, arguments);

        // hand off fired events to associated component.
        var _f = this.fire;
        this.fire = function () {
            _f.apply(this, arguments);
            if (this.component) {
                this.component.fire.apply(this.component, arguments);
            }
        };

        this.detached=false;
        this.id = params.id;
        this._jsPlumb.div = null;
        this._jsPlumb.initialised = false;
        this._jsPlumb.component = params.component;
        this._jsPlumb.cachedDimensions = null;
        this._jsPlumb.create = params.create;
        this._jsPlumb.initiallyInvisible = params.visible === false;

        this.getElement = function () {
            if (this._jsPlumb.div == null) {
                var div = this._jsPlumb.div = _jp.getElement(this._jsPlumb.create(this._jsPlumb.component));
                div.style.position = "absolute";
                jsPlumb.addClass(div, this._jsPlumb.instance.overlayClass + " " +
                    (this.cssClass ? this.cssClass :
                        params.cssClass ? params.cssClass : ""));
                this._jsPlumb.instance.appendElement(div);
                this._jsPlumb.instance.getId(div);
                this.canvas = div;

                // in IE the top left corner is what it placed at the desired location.  This will not
                // be fixed. IE8 is not going to be supported for much longer.
                var ts = "translate(-50%, -50%)";
                div.style.webkitTransform = ts;
                div.style.mozTransform = ts;
                div.style.msTransform = ts;
                div.style.oTransform = ts;
                div.style.transform = ts;

                // write the related component into the created element
                div._jsPlumb = this;

                if (params.visible === false) {
                    div.style.display = "none";
                }
            }
            return this._jsPlumb.div;
        };

        this.draw = function (component, currentConnectionPaintStyle, absolutePosition) {
            var td = _getDimensions(this);
            if (td != null && td.length === 2) {
                var cxy = { x: 0, y: 0 };

                // absolutePosition would have been set by a call to connection.setAbsoluteOverlayPosition.
                if (absolutePosition) {
                    cxy = { x: absolutePosition[0], y: absolutePosition[1] };
                }
                else if (component.pointOnPath) {
                    var loc = this.loc, absolute = false;
                    if (_ju.isString(this.loc) || this.loc < 0 || this.loc > 1) {
                        loc = parseInt(this.loc, 10);
                        absolute = true;
                    }
                    cxy = component.pointOnPath(loc, absolute);  // a connection
                }
                else {
                    var locToUse = this.loc.constructor === Array ? this.loc : this.endpointLoc;
                    cxy = { x: locToUse[0] * component.w,
                        y: locToUse[1] * component.h };
                }

                var minx = cxy.x - (td[0] / 2),
                    miny = cxy.y - (td[1] / 2);

                return {
                    component: component,
                    d: { minx: minx, miny: miny, td: td, cxy: cxy },
                    minX: minx,
                    maxX: minx + td[0],
                    minY: miny,
                    maxY: miny + td[1]
                };
            }
            else {
                return {minX: 0, maxX: 0, minY: 0, maxY: 0};
            }
        };
    };
    _ju.extend(AbstractDOMOverlay, [_jp.jsPlumbUIComponent, AbstractOverlay], {
        getDimensions: function () {
            return [1,1];
        },
        setVisible: function (state) {
            if (this._jsPlumb.div) {
                this._jsPlumb.div.style.display = state ? "block" : "none";
                // if initially invisible, dimensions are 0,0 and never get updated
                if (state && this._jsPlumb.initiallyInvisible) {
                    _getDimensions(this, true);
                    this.component.repaint();
                    this._jsPlumb.initiallyInvisible = false;
                }
            }
        },
        /*
         * Function: clearCachedDimensions
         * Clears the cached dimensions for the label. As a performance enhancement, label dimensions are
         * cached from 1.3.12 onwards. The cache is cleared when you change the label text, of course, but
         * there are other reasons why the text dimensions might change - if you make a change through CSS, for
         * example, you might change the font size.  in that case you should explicitly call this method.
         */
        clearCachedDimensions: function () {
            this._jsPlumb.cachedDimensions = null;
        },
        cleanup: function (force) {
            if (force) {
                if (this._jsPlumb.div != null) {
                    this._jsPlumb.div._jsPlumb = null;
                    this._jsPlumb.instance.removeElement(this._jsPlumb.div);
                }
            }
            else {
                // if not a forced cleanup, just detach child from parent for now.
                if (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode) {
                    this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
                }
                this.detached = true;
            }

        },
        reattach:function(instance, component) {
            if (this._jsPlumb.div != null) {
                instance.getContainer().appendChild(this._jsPlumb.div);
            }
            this.detached = false;
        },
        computeMaxSize: function () {
            var td = _getDimensions(this);
            return Math.max(td[0], td[1]);
        },
        paint: function (p, containerExtents) {
            if (!this._jsPlumb.initialised) {
                this.getElement();
                p.component.appendDisplayElement(this._jsPlumb.div);
                this._jsPlumb.initialised = true;
                if (this.detached) {
                    this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
                }
            }
            this._jsPlumb.div.style.left = (p.component.x + p.d.minx) + "px";
            this._jsPlumb.div.style.top = (p.component.y + p.d.miny) + "px";
        }
    });

    /*
     * Class: Overlays.Custom
     * A Custom overlay. You supply a 'create' function which returns some DOM element, and jsPlumb positions it.
     * The 'create' function is passed a Connection or Endpoint.
     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * create - function for jsPlumb to call that returns a DOM element.
     * location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * id - optional id to use for later retrieval of this overlay.
     *
     */
    _jp.Overlays.Custom = function (params) {
        this.type = "Custom";
        AbstractDOMOverlay.apply(this, arguments);
    };
    _ju.extend(_jp.Overlays.Custom, AbstractDOMOverlay);

    _jp.Overlays.GuideLines = function () {
        var self = this;
        self.length = 50;
        self.strokeWidth = 5;
        this.type = "GuideLines";
        AbstractOverlay.apply(this, arguments);
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function (connector, currentConnectionPaintStyle) {

            var head = connector.pointAlongPathFrom(self.loc, self.length / 2),
                mid = connector.pointOnPath(self.loc),
                tail = _jg.pointOnLine(head, mid, self.length),
                tailLine = _jg.perpendicularLineTo(head, tail, 40),
                headLine = _jg.perpendicularLineTo(tail, head, 20);

            return {
                connector: connector,
                head: head,
                tail: tail,
                headLine: headLine,
                tailLine: tailLine,
                minX: Math.min(head.x, tail.x, headLine[0].x, headLine[1].x),
                minY: Math.min(head.y, tail.y, headLine[0].y, headLine[1].y),
                maxX: Math.max(head.x, tail.x, headLine[0].x, headLine[1].x),
                maxY: Math.max(head.y, tail.y, headLine[0].y, headLine[1].y)
            };
        };

        // this.cleanup = function() { };  // nothing to clean up for GuideLines
    };

    /*
     * Class: Overlays.Label

     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * cssClass - optional css class string to append to css class. This string is appended "as-is", so you can of course have multiple classes
     *             defined.  This parameter is preferred to using labelStyle, borderWidth and borderStyle.
     * label - the label to paint.  May be a string or a function that returns a string.  Nothing will be painted if your label is null or your
     *         label function returns null.  empty strings _will_ be painted.
     * location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * id - optional id to use for later retrieval of this overlay.
     * 
     *
     */
    _jp.Overlays.Label = function (params) {
        this.labelStyle = params.labelStyle;
        this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
        var p = _jp.extend({
            create: function () {
                return _jp.createElement("div");
            }}, params);
        _jp.Overlays.Custom.call(this, p);
        this.type = "Label";
        this.label = params.label || "";
        this.labelText = null;
        if (this.labelStyle) {
            var el = this.getElement();
            this.labelStyle.font = this.labelStyle.font || "12px sans-serif";
            el.style.font = this.labelStyle.font;
            el.style.color = this.labelStyle.color || "black";
            if (this.labelStyle.fill) {
                el.style.background = this.labelStyle.fill;
            }
            if (this.labelStyle.borderWidth > 0) {
                var dStyle = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                el.style.border = this.labelStyle.borderWidth + "px solid " + dStyle;
            }
            if (this.labelStyle.padding) {
                el.style.padding = this.labelStyle.padding;
            }
        }

    };
    _ju.extend(_jp.Overlays.Label, _jp.Overlays.Custom, {
        cleanup: function (force) {
            if (force) {
                this.div = null;
                this.label = null;
                this.labelText = null;
                this.cssClass = null;
                this.labelStyle = null;
            }
        },
        getLabel: function () {
            return this.label;
        },
        /*
         * Function: setLabel
         * sets the label's, um, label.  you would think i'd call this function
         * 'setText', but you can pass either a Function or a String to this, so
         * it makes more sense as 'setLabel'. This uses innerHTML on the label div, so keep
         * that in mind if you need escaped HTML.
         */
        setLabel: function (l) {
            this.label = l;
            this.labelText = null;
            this.clearCachedDimensions();
            this.update();
            this.component.repaint();
        },
        getDimensions: function () {
            this.update();
            return AbstractDOMOverlay.prototype.getDimensions.apply(this, arguments);
        },
        update: function () {
            if (typeof this.label === "function") {
                var lt = this.label(this);
                this.getElement().innerHTML = lt.replace(/\r\n/g, "<br/>");
            }
            else {
                if (this.labelText == null) {
                    this.labelText = this.label;
                    this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>");
                }
            }
        },
        updateFrom:function(d) {
            if(d.label != null){
                this.setLabel(d.label);
            }
        }
    });

    // ********************************* END OF OVERLAY DEFINITIONS ***********************************************************************

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function() {

    var root = this,
        _ju = root.jsPlumbUtil,
        _jpi = root.jsPlumbInstance;

    var GROUP_COLLAPSED_CLASS = "jtk-group-collapsed";
    var GROUP_EXPANDED_CLASS = "jtk-group-expanded";
    var GROUP_CONTAINER_SELECTOR = "[jtk-group-content]";
    var ELEMENT_DRAGGABLE_EVENT = "elementDraggable";
    var STOP = "stop";
    var REVERT = "revert";
    var GROUP_MANAGER = "_groupManager";
    var GROUP = "_jsPlumbGroup";
    var GROUP_DRAG_SCOPE = "_jsPlumbGroupDrag";
    var EVT_CHILD_ADDED = "group:addMember";
    var EVT_CHILD_REMOVED = "group:removeMember";
    var EVT_GROUP_ADDED = "group:add";
    var EVT_GROUP_REMOVED = "group:remove";
    var EVT_EXPAND = "group:expand";
    var EVT_COLLAPSE = "group:collapse";
    var EVT_GROUP_DRAG_STOP = "groupDragStop";
    var EVT_CONNECTION_MOVED = "connectionMoved";
    var EVT_INTERNAL_CONNECTION_DETACHED = "internal.connectionDetached";

    var CMD_REMOVE_ALL = "removeAll";
    var CMD_ORPHAN_ALL = "orphanAll";
    var CMD_SHOW = "show";
    var CMD_HIDE = "hide";

    var GroupManager = function(_jsPlumb) {
        var _managedGroups = {}, _connectionSourceMap = {}, _connectionTargetMap = {}, self = this;

        // function findGroupFor(el) {
        //     var c = _jsPlumb.getContainer();
        //     var abort = false, g = null, child = null;
        //     while (!abort) {
        //         if (el == null || el === c) {
        //             abort = true;
        //         } else {
        //             if (el[GROUP]) {
        //                 g = el[GROUP];
        //                 child = el;
        //                 abort = true;
        //             } else {
        //                 el = el.parentNode;
        //             }
        //         }
        //     }
        //     return g;
        // }

        function isDescendant(el, parentEl) {
            var c = _jsPlumb.getContainer();
            var abort = false;
            while (!abort) {
                if (el == null || el === c) {
                    return false;
                } else {
                    if (el === parentEl) {
                        return true;
                    } else {
                        el = el.parentNode;
                    }
                }
            }
        }

        _jsPlumb.bind("connection", function(p) {

            var sourceGroup = _jsPlumb.getGroupFor(p.source);
            var targetGroup = _jsPlumb.getGroupFor(p.target);

            if (sourceGroup != null && targetGroup != null && sourceGroup === targetGroup) {
                _connectionSourceMap[p.connection.id] = sourceGroup;
                _connectionTargetMap[p.connection.id] = sourceGroup;
            }
            else {
                if (sourceGroup != null) {
                    _ju.suggest(sourceGroup.connections.source, p.connection);
                    _connectionSourceMap[p.connection.id] = sourceGroup;
                }
                if (targetGroup != null) {
                    _ju.suggest(targetGroup.connections.target, p.connection);
                    _connectionTargetMap[p.connection.id] = targetGroup;
                }
            }
        });

        function _cleanupDetachedConnection(conn) {
            delete conn.proxies;
            var group = _connectionSourceMap[conn.id], f;
            if (group != null) {
                f = function(c) { return c.id === conn.id; };
                _ju.removeWithFunction(group.connections.source, f);
                _ju.removeWithFunction(group.connections.target, f);
                delete _connectionSourceMap[conn.id];
            }

            group = _connectionTargetMap[conn.id];
            if (group != null) {
                f = function(c) { return c.id === conn.id; };
                _ju.removeWithFunction(group.connections.source, f);
                _ju.removeWithFunction(group.connections.target, f);
                delete _connectionTargetMap[conn.id];
            }
        }

        _jsPlumb.bind(EVT_INTERNAL_CONNECTION_DETACHED, function(p) {
            _cleanupDetachedConnection(p.connection);
        });

        _jsPlumb.bind(EVT_CONNECTION_MOVED, function(p) {
            var connMap = p.index === 0 ? _connectionSourceMap : _connectionTargetMap;
            var group = connMap[p.connection.id];
            if (group) {
                var list = group.connections[p.index === 0 ? "source" : "target"];
                var idx = list.indexOf(p.connection);
                if (idx !== -1) {
                    list.splice(idx, 1);
                }
            }
        });

        this.addGroup = function(group) {
            _jsPlumb.addClass(group.getEl(), GROUP_EXPANDED_CLASS);
            _managedGroups[group.id] = group;
            group.manager = this;
            _updateConnectionsForGroup(group);
            _jsPlumb.fire(EVT_GROUP_ADDED, { group:group });
        };

        this.addToGroup = function(group, el, doNotFireEvent) {
            group = this.getGroup(group);
            if (group) {
                var groupEl = group.getEl();

                if (el._isJsPlumbGroup) {
                    return;
                }
                var currentGroup = el._jsPlumbGroup;
                // if already a member of this group, do nothing
                if (currentGroup !== group) {

                    _jsPlumb.removeFromDragSelection(el);

                    var elpos = _jsPlumb.getOffset(el, true);
                    var cpos = group.collapsed ? _jsPlumb.getOffset(groupEl, true) : _jsPlumb.getOffset(group.getDragArea(), true);

                    // otherwise, transfer to this group.
                    if (currentGroup != null) {
                        currentGroup.remove(el, false, doNotFireEvent, false, group);
                        self.updateConnectionsForGroup(currentGroup);
                    }
                    group.add(el, doNotFireEvent/*, currentGroup*/);

                    var handleDroppedConnections = function (list, index) {
                        var oidx = index === 0 ? 1 : 0;
                        list.each(function (c) {
                            c.setVisible(false);
                            if (c.endpoints[oidx].element._jsPlumbGroup === group) {
                                c.endpoints[oidx].setVisible(false);
                                _expandConnection(c, oidx, group);
                            }
                            else {
                                c.endpoints[index].setVisible(false);
                                _collapseConnection(c, index, group);
                            }
                        });
                    };

                    if (group.collapsed) {
                        handleDroppedConnections(_jsPlumb.select({source: el}), 0);
                        handleDroppedConnections(_jsPlumb.select({target: el}), 1);
                    }

                    var elId = _jsPlumb.getId(el);
                    _jsPlumb.dragManager.setParent(el, elId, groupEl, _jsPlumb.getId(groupEl), elpos);

                    var newPosition = { left: elpos.left - cpos.left, top: elpos.top - cpos.top };

                    _jsPlumb.setPosition(el, newPosition);

                    _jsPlumb.dragManager.revalidateParent(el, elId, elpos);

                    self.updateConnectionsForGroup(group);

                    _jsPlumb.revalidate(elId);

                    if (!doNotFireEvent) {
                        var p = {group: group, el: el, pos:newPosition};
                        if (currentGroup) {
                            p.sourceGroup = currentGroup;
                        }
                        _jsPlumb.fire(EVT_CHILD_ADDED, p);
                    }
                }
            }
        };

        this.removeFromGroup = function(group, el, doNotFireEvent) {
            group = this.getGroup(group);
            if (group) {

                // if this group is currently collapsed then any proxied connections for the given el (or its descendants) need
                // to be put back on their original element, and unproxied
                if (group.collapsed) {
                    var _expandSet = function (conns, index) {
                        for (var i = 0; i < conns.length; i++) {
                            var c = conns[i];
                            if (c.proxies) {
                                for(var j = 0; j < c.proxies.length; j++) {
                                    if (c.proxies[j] != null) {
                                        var proxiedElement = c.proxies[j].originalEp.element;
                                        if (proxiedElement === el || isDescendant(proxiedElement, el)) {
                                            _expandConnection(c, index, group);
                                        }
                                    }

                                }
                            }
                        }
                    };

                    // setup proxies for sources and targets
                    _expandSet(group.connections.source.slice(), 0);
                    _expandSet(group.connections.target.slice(), 1);
                }

                group.remove(el, null, doNotFireEvent);
            }
        };

        this.getGroup = function(groupId) {
            var group = groupId;
            if (_ju.isString(groupId)) {
                group = _managedGroups[groupId];
                if (group == null) {
                    throw new TypeError("No such group [" + groupId + "]");
                }
            }
            return group;
        };

        this.getGroups = function() {
            var o = [];
            for (var g in _managedGroups) {
                o.push(_managedGroups[g]);
            }
            return o;
        };

        this.removeGroup = function(group, deleteMembers, manipulateDOM, doNotFireEvent) {
            group = this.getGroup(group);
            this.expandGroup(group, true); // this reinstates any original connections and removes all proxies, but does not fire an event.
            var newPositions = group[deleteMembers ? CMD_REMOVE_ALL : CMD_ORPHAN_ALL](manipulateDOM, doNotFireEvent);
            _jsPlumb.remove(group.getEl());
            delete _managedGroups[group.id];
            delete _jsPlumb._groups[group.id];
            _jsPlumb.fire(EVT_GROUP_REMOVED, { group:group });
            return newPositions; // this will be null in the case or remove, but be a map of {id->[x,y]} in the case of orphan
        };

        this.removeAllGroups = function(deleteMembers, manipulateDOM, doNotFireEvent) {
            for (var g in _managedGroups) {
                this.removeGroup(_managedGroups[g], deleteMembers, manipulateDOM, doNotFireEvent);
            }
        };

        function _setVisible(group, state) {

            // TODO discovering the list of elements would ideally be a pluggable function.
            var m = group.getEl().querySelectorAll(".jtk-managed");
            for (var i = 0; i < m.length; i++) {
                _jsPlumb[state ? CMD_SHOW : CMD_HIDE](m[i], true);
            }
        }

        var _collapseConnection = function(c, index, group) {

            var otherEl = c.endpoints[index === 0 ? 1 : 0].element;
            if (otherEl[GROUP] && (!otherEl[GROUP].shouldProxy() && otherEl[GROUP].collapsed)) {
                return;
            }

            var groupEl = group.getEl(), groupElId = _jsPlumb.getId(groupEl);

            _jsPlumb.proxyConnection(c, index, groupEl, groupElId, function(c, index) { return group.getEndpoint(c, index); }, function(c, index) { return group.getAnchor(c, index); });
        };

        this.collapseGroup = function(group) {
            group = this.getGroup(group);
            if (group == null || group.collapsed) {
                return;
            }
            var groupEl = group.getEl();

            // todo remove old proxy endpoints first, just in case?
            //group.proxies.length = 0;

            // hide all connections
            _setVisible(group, false);

            if (group.shouldProxy()) {
                // collapses all connections in a group.
                var _collapseSet = function (conns, index) {
                    for (var i = 0; i < conns.length; i++) {
                        var c = conns[i];
                        _collapseConnection(c, index, group);
                    }
                };

                // setup proxies for sources and targets
                _collapseSet(group.connections.source, 0);
                _collapseSet(group.connections.target, 1);
            }

            group.collapsed = true;
            _jsPlumb.removeClass(groupEl, GROUP_EXPANDED_CLASS);
            _jsPlumb.addClass(groupEl, GROUP_COLLAPSED_CLASS);
            _jsPlumb.revalidate(groupEl);
            _jsPlumb.fire(EVT_COLLAPSE, { group:group  });
        };

        var _expandConnection = function(c, index, group) {
            _jsPlumb.unproxyConnection(c, index, _jsPlumb.getId(group.getEl()));
        };

        this.expandGroup = function(group, doNotFireEvent) {

            group = this.getGroup(group);

            if (group == null || !group.collapsed) {
                return;
            }
            var groupEl = group.getEl();

            _setVisible(group, true);

            if (group.shouldProxy()) {
                // expands all connections in a group.
                var _expandSet = function (conns, index) {
                    for (var i = 0; i < conns.length; i++) {
                        var c = conns[i];
                        _expandConnection(c, index, group);
                    }
                };

                // setup proxies for sources and targets
                _expandSet(group.connections.source, 0);
                _expandSet(group.connections.target, 1);
            }

            group.collapsed = false;
            _jsPlumb.addClass(groupEl, GROUP_EXPANDED_CLASS);
            _jsPlumb.removeClass(groupEl, GROUP_COLLAPSED_CLASS);
            _jsPlumb.revalidate(groupEl);
            this.repaintGroup(group);
            if (!doNotFireEvent) {
                _jsPlumb.fire(EVT_EXPAND, { group: group});
            }
        };

        this.repaintGroup = function(group) {
            group = this.getGroup(group);
            var m = group.getMembers();
            for (var i = 0; i < m.length; i++) {
                _jsPlumb.revalidate(m[i]);
            }
        };

        // TODO refactor this with the code that responds to `connection` events.
        function _updateConnectionsForGroup(group) {
            var members = group.getMembers().slice();

            var childMembers = [];
            for (var i = 0; i < members.length; i++) {
                Array.prototype.push.apply(childMembers, members[i].querySelectorAll(".jtk-managed"));
            }
            Array.prototype.push.apply(members, childMembers);

            var c1 = _jsPlumb.getConnections({source:members, scope:"*"}, true);
            var c2 = _jsPlumb.getConnections({target:members, scope:"*"}, true);

            var processed = {};
            group.connections.source.length = 0;
            group.connections.target.length = 0;
            var oneSet = function(c) {
                for (var i = 0; i < c.length; i++) {
                    if (processed[c[i].id]) {
                        continue;
                    }
                    processed[c[i].id] = true;
                    var gs = _jsPlumb.getGroupFor(c[i].source),
                        gt = _jsPlumb.getGroupFor(c[i].target);

                    if (gs === group) {
                        if (gt !== group) {
                            group.connections.source.push(c[i]);
                        }
                        _connectionSourceMap[c[i].id] = group;
                    }
                    else if (gt === group) {
                        group.connections.target.push(c[i]);
                        _connectionTargetMap[c[i].id] = group;
                    }
                }
            };
            oneSet(c1); oneSet(c2);
        }

        this.updateConnectionsForGroup = _updateConnectionsForGroup;
        this.refreshAllGroups = function() {
            for (var g in _managedGroups) {
                _updateConnectionsForGroup(_managedGroups[g]);
                _jsPlumb.dragManager.updateOffsets(_jsPlumb.getId(_managedGroups[g].getEl()));
            }
        };
    };

    /**
     *
     * @param {jsPlumbInstance} _jsPlumb Associated jsPlumb instance.
     * @param {Object} params
     * @param {Element} params.el The DOM element representing the Group.
     * @param {String} [params.id] Optional ID for the Group. A UUID will be assigned as the Group's ID if you do not provide one.
     * @param {Boolean} [params.constrain=false] If true, child elements will not be able to be dragged outside of the Group container.
     * @param {Boolean} [params.revert=true] By default, child elements revert to the container if dragged outside. You can change this by setting `revert:false`. This behaviour is also overridden if you set `orphan` or `prune`.
     * @param {Boolean} [params.orphan=false] If true, child elements dropped outside of the Group container will be removed from the Group (but not from the DOM).
     * @param {Boolean} [params.prune=false] If true, child elements dropped outside of the Group container will be removed from the Group and also from the DOM.
     * @param {Boolean} [params.dropOverride=false] If true, a child element that has been dropped onto some other Group will not be subject to the controls imposed by `prune`, `revert` or `orphan`.
     * @constructor
     */
    var Group = function(_jsPlumb, params) {
        var self = this;
        var el = params.el;
        this.getEl = function() { return el; };
        this.id = params.id || _ju.uuid();
        el._isJsPlumbGroup = true;

        var getDragArea = this.getDragArea = function() {
            var da = _jsPlumb.getSelector(el, GROUP_CONTAINER_SELECTOR);
            return da && da.length > 0 ? da[0] : el;
        };

        var ghost = params.ghost === true;
        var constrain = ghost || (params.constrain === true);
        var revert = params.revert !== false;
        var orphan = params.orphan === true;
        var prune = params.prune === true;
        var dropOverride = params.dropOverride === true;
        var proxied = params.proxied !== false;
        var elements = [];
        this.connections = { source:[], target:[], internal:[] };

        // this function, and getEndpoint below, are stubs for a future setup in which we can choose endpoint
        // and anchor based upon the connection and the index (source/target) of the endpoint to be proxied.
        this.getAnchor = function(conn, endpointIndex) {
            return params.anchor || "Continuous";
        };

        this.getEndpoint = function(conn, endpointIndex) {
            return params.endpoint || [ "Dot", { radius:10 }];
        };

        this.collapsed = false;
        if (params.draggable !== false) {
            var opts = {
                drag:function() {
                    for (var i = 0; i < elements.length; i++) {
                        _jsPlumb.draw(elements[i]);
                    }
                },
                stop:function(params) {
                    _jsPlumb.fire(EVT_GROUP_DRAG_STOP, jsPlumb.extend(params, {group:self}));
                },
                scope:GROUP_DRAG_SCOPE
            };
            if (params.dragOptions) {
                root.jsPlumb.extend(opts, params.dragOptions);
            }
            _jsPlumb.draggable(params.el, opts);
        }
        if (params.droppable !== false) {
            _jsPlumb.droppable(params.el, {
                drop:function(p) {
                    var el = p.drag.el;
                    if (el._isJsPlumbGroup) {
                        return;
                    }
                    var currentGroup = el._jsPlumbGroup;
                    if (currentGroup !== self) {
                        if (currentGroup != null) {
                            if (currentGroup.overrideDrop(el, self)) {
                                return;
                            }
                        }
                        _jsPlumb.getGroupManager().addToGroup(self, el, false);
                    }

                }
            });
        }
        var _each = function(_el, fn) {
            var els = _el.nodeType == null ?  _el : [ _el ];
            for (var i = 0; i < els.length; i++) {
                fn(els[i]);
            }
        };

        this.overrideDrop = function(_el, targetGroup) {
            return dropOverride && (revert || prune || orphan);
        };

        this.add = function(_el, doNotFireEvent/*, sourceGroup*/) {
            var dragArea = getDragArea();
            _each(_el, function(__el) {

                if (__el._jsPlumbGroup != null) {
                    if (__el._jsPlumbGroup === self) {
                        return;
                    } else {
                        __el._jsPlumbGroup.remove(__el, true, doNotFireEvent, false);
                    }
                }

                __el._jsPlumbGroup = self;
                elements.push(__el);
                // test if draggable and add handlers if so.
                if (_jsPlumb.isAlreadyDraggable(__el)) {
                    _bindDragHandlers(__el);
                }

                if (__el.parentNode !== dragArea) {
                    dragArea.appendChild(__el);
                }

                // if (!doNotFireEvent) {
                //     var p = {group: self, el: __el};
                //     if (sourceGroup) {
                //         p.sourceGroup = sourceGroup;
                //     }
                //     //_jsPlumb.fire(EVT_CHILD_ADDED, p);
                // }
            });

            _jsPlumb.getGroupManager().updateConnectionsForGroup(self);
        };

        this.remove = function(el, manipulateDOM, doNotFireEvent, doNotUpdateConnections, targetGroup) {

            _each(el, function(__el) {
                if (__el._jsPlumbGroup === self) {
                    delete __el._jsPlumbGroup;
                    _ju.removeWithFunction(elements, function (e) {
                        return e === __el;
                    });


                    if (manipulateDOM) {
                        try {
                            self.getDragArea().removeChild(__el);
                        } catch (e) {
                            jsPlumbUtil.log("Could not remove element from Group " + e);
                        }
                    }
                    _unbindDragHandlers(__el);

                    if (!doNotFireEvent) {
                        var p = {group: self, el: __el};
                        if (targetGroup) {
                            p.targetGroup = targetGroup;
                        }
                        _jsPlumb.fire(EVT_CHILD_REMOVED, p);
                    }
                }
            });
            if (!doNotUpdateConnections) {
                _jsPlumb.getGroupManager().updateConnectionsForGroup(self);
            }
        };
        this.removeAll = function(manipulateDOM, doNotFireEvent) {
            for (var i = 0, l = elements.length; i < l; i++) {
                var el = elements[0];
                self.remove(el, manipulateDOM, doNotFireEvent, true);
                _jsPlumb.remove(el, true);
            }
            elements.length = 0;
            _jsPlumb.getGroupManager().updateConnectionsForGroup(self);
        };
        this.orphanAll = function() {
            var orphanedPositions = {};
            for (var i = 0; i < elements.length; i++) {
                var newPosition = _orphan(elements[i]);
                orphanedPositions[newPosition[0]] = newPosition[1];
            }
            elements.length = 0;

            return orphanedPositions;
        };
        this.getMembers = function() { return elements; };

        el[GROUP] = this;

        _jsPlumb.bind(ELEMENT_DRAGGABLE_EVENT, function(dragParams) {
            // if its for the current group,
            if (dragParams.el._jsPlumbGroup === this) {
                _bindDragHandlers(dragParams.el);
            }
        }.bind(this));

        function _findParent(_el) {
            return _el.offsetParent;
        }

        function _isInsideParent(_el, pos) {
            var p = _findParent(_el),
                s = _jsPlumb.getSize(p),
                ss = _jsPlumb.getSize(_el),
                leftEdge = pos[0],
                rightEdge = leftEdge + ss[0],
                topEdge = pos[1],
                bottomEdge = topEdge + ss[1];

            return rightEdge > 0 && leftEdge < s[0] && bottomEdge > 0 && topEdge < s[1];
        }

        //
        // orphaning an element means taking it out of the group and adding it to the main jsplumb container.
        // we return the new calculated position from this method and the element's id.
        //
        function _orphan(_el) {
            var id = _jsPlumb.getId(_el);
            var pos = _jsPlumb.getOffset(_el);
            _el.parentNode.removeChild(_el);
            _jsPlumb.getContainer().appendChild(_el);
            _jsPlumb.setPosition(_el, pos);
            _unbindDragHandlers(_el);
            _jsPlumb.dragManager.clearParent(_el, id);
            return [id, pos];
        }

        //
        // remove an element from the group, then either prune it from the jsplumb instance, or just orphan it.
        //
        function _pruneOrOrphan(p) {

            var out = [];

            function _one(el, left, top) {
                var orphanedPosition = null;
                if (!_isInsideParent(el, [left, top])) {
                    var group = el._jsPlumbGroup;
                    if (prune) {
                        _jsPlumb.remove(el);
                    } else {
                        orphanedPosition = _orphan(el);
                    }

                    group.remove(el);
                }

                return orphanedPosition;
            }

            for (var i = 0; i < p.selection.length; i++) {
                out.push(_one(p.selection[i][0], p.selection[i][1].left, p.selection[i][1].top));
            }

            return out.length === 1 ? out[0] : out;

        }

        //
        // redraws the element
        //
        function _revalidate(_el) {
            var id = _jsPlumb.getId(_el);
            _jsPlumb.revalidate(_el);
            _jsPlumb.dragManager.revalidateParent(_el, id);
        }

        //
        // unbind the group specific drag/revert handlers.
        //
        function _unbindDragHandlers(_el) {
            if (!_el._katavorioDrag) {
                return;
            }
            if (prune || orphan) {
                _el._katavorioDrag.off(STOP, _pruneOrOrphan);
            }
            if (!prune && !orphan && revert) {
                _el._katavorioDrag.off(REVERT, _revalidate);
                _el._katavorioDrag.setRevert(null);
            }
        }

        function _bindDragHandlers(_el) {
            if (!_el._katavorioDrag) {
                return;
            }
            if (prune || orphan) {
                _el._katavorioDrag.on(STOP, _pruneOrOrphan);
            }

            if (constrain) {
                _el._katavorioDrag.setConstrain(true);
            }

            if (ghost) {
                _el._katavorioDrag.setUseGhostProxy(true);
            }

            if (!prune && !orphan && revert) {
                _el._katavorioDrag.on(REVERT, _revalidate);
                _el._katavorioDrag.setRevert(function(__el, pos) {
                    return !_isInsideParent(__el, pos);
                });
            }
        }

        this.shouldProxy = function() {
            return proxied;
        };

        _jsPlumb.getGroupManager().addGroup(this);
    };

    /**
     * Adds a group to the jsPlumb instance.
     * @method addGroup
     * @param {Object} params
     * @return {Group} The newly created Group.
     */
    _jpi.prototype.addGroup = function(params) {
        var j = this;
        j._groups = j._groups || {};
        if (j._groups[params.id] != null) {
            throw new TypeError("cannot create Group [" + params.id + "]; a Group with that ID exists");
        }
        if (params.el[GROUP] != null) {
            throw new TypeError("cannot create Group [" + params.id + "]; the given element is already a Group");
        }
        var group = new Group(j, params);
        j._groups[group.id] = group;
        if (params.collapsed) {
            this.collapseGroup(group);
        }
        return group;
    };

    /**
     * Add an element to a group.
     * @method addToGroup
     * @param {String} group Group, or ID of the group, to add the element to.
     * @param {Element} el Element to add to the group.
     */
    _jpi.prototype.addToGroup = function(group, el, doNotFireEvent) {

        var _one = function(_el) {
            var id = this.getId(_el);
            this.manage(id, _el);
            this.getGroupManager().addToGroup(group, _el, doNotFireEvent);
        }.bind(this);

        if (Array.isArray(el)) {
            for (var i = 0; i < el.length; i++) {
                _one(el[i]);
            }
        } else {
            _one(el);
        }
    };

    /**
     * Remove an element from a group, and sets its DOM element to be a child of the container again.  ??
     * @method removeFromGroup
     * @param {String} group Group, or ID of the group, to remove the element from.
     * @param {Element} el Element to add to the group.
     */
    _jpi.prototype.removeFromGroup = function(group, el, doNotFireEvent) {
        this.getGroupManager().removeFromGroup(group, el, doNotFireEvent);
        this.getContainer().appendChild(el);
    };

    /**
     * Remove a group, and optionally remove its members from the jsPlumb instance.
     * @method removeGroup
     * @param {String|Group} group Group to delete, or ID of Group to delete.
     * @param {Boolean} [deleteMembers=false] If true, group members will be removed along with the group. Otherwise they will
     * just be 'orphaned' (returned to the main container).
     * @returns {Map[String, Position}} When deleteMembers is false, this method returns a map of {id->position}
     */
    _jpi.prototype.removeGroup = function(group, deleteMembers, manipulateDOM, doNotFireEvent) {
        return this.getGroupManager().removeGroup(group, deleteMembers, manipulateDOM, doNotFireEvent);
    };

    /**
     * Remove all groups, and optionally remove their members from the jsPlumb instance.
     * @method removeAllGroup
     * @param {Boolean} [deleteMembers=false] If true, group members will be removed along with the groups. Otherwise they will
     * just be 'orphaned' (returned to the main container).
     */
    _jpi.prototype.removeAllGroups = function(deleteMembers, manipulateDOM, doNotFireEvent) {
        this.getGroupManager().removeAllGroups(deleteMembers, manipulateDOM, doNotFireEvent);
    };

    /**
     * Get a Group
     * @method getGroup
     * @param {String} groupId ID of the group to get
     * @return {Group} Group with the given ID, null if not found.
     */
    _jpi.prototype.getGroup = function(groupId) {
        return this.getGroupManager().getGroup(groupId);
    };

    /**
     * Gets all the Groups managed by the jsPlumb instance.
     * @returns {Group[]} List of Groups. Empty if none.
     */
    _jpi.prototype.getGroups = function() {
        return this.getGroupManager().getGroups();
    };

    /**
     * Expands a group element. jsPlumb doesn't do "everything" for you here, because what it means to expand a Group
     * will vary from application to application. jsPlumb does these things:
     *
     * - Hides any connections that are internal to the group (connections between members, and connections from member of
     * the group to the group itself)
     * - Proxies all connections for which the source or target is a member of the group.
     * - Hides the proxied connections.
     * - Adds the jtk-group-expanded class to the group's element
     * - Removes the jtk-group-collapsed class from the group's element.
     *
     * @method expandGroup
     * @param {String|Group} group Group to expand, or ID of Group to expand.
     */
    _jpi.prototype.expandGroup = function(group) {
        this.getGroupManager().expandGroup(group);
    };

    /**
     * Collapses a group element. jsPlumb doesn't do "everything" for you here, because what it means to collapse a Group
     * will vary from application to application. jsPlumb does these things:
     *
     * - Shows any connections that are internal to the group (connections between members, and connections from member of
     * the group to the group itself)
     * - Removes proxies for all connections for which the source or target is a member of the group.
     * - Shows the previously proxied connections.
     * - Adds the jtk-group-collapsed class to the group's element
     * - Removes the jtk-group-expanded class from the group's element.
     *
     * @method expandGroup
     * @param {String|Group} group Group to expand, or ID of Group to expand.
     */
    _jpi.prototype.collapseGroup = function(groupId) {
        this.getGroupManager().collapseGroup(groupId);
    };


    _jpi.prototype.repaintGroup = function(group) {
        this.getGroupManager().repaintGroup(group);
    };

    /**
     * Collapses or expands a group element depending on its current state. See notes in the collapseGroup and expandGroup method.
     *
     * @method toggleGroup
     * @param {String|Group} group Group to expand/collapse, or ID of Group to expand/collapse.
     */
    _jpi.prototype.toggleGroup = function(group) {
        group = this.getGroupManager().getGroup(group);
        if (group != null) {
            this.getGroupManager()[group.collapsed ? "expandGroup" : "collapseGroup"](group);
        }
    };

    //
    // lazy init a group manager for the given jsplumb instance.
    //
    _jpi.prototype.getGroupManager = function() {
        var mgr = this[GROUP_MANAGER];
        if (mgr == null) {
            mgr = this[GROUP_MANAGER] = new GroupManager(this);
        }
        return mgr;
    };

    _jpi.prototype.removeGroupManager = function() {
        delete this[GROUP_MANAGER];
    };

    /**
     * Gets the Group that the given element belongs to, null if none.
     * @method getGroupFor
     * @param {String|Element} el Element, or element ID.
     * @returns {Group} A Group, if found, or null.
     */
    _jpi.prototype.getGroupFor = function(el) {
        el = this.getElement(el);
        if (el) {
            var c = this.getContainer();
            var abort = false, g = null;
            while (!abort) {
                if (el == null || el === c) {
                    abort = true;
                } else {
                    if (el[GROUP]) {
                        g = el[GROUP];
                        abort = true;
                    } else {
                        el = el.parentNode;
                    }
                }
            }
            return g;
        }
    };

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;
    var STRAIGHT = "Straight";
    var ARC = "Arc";

    var Flowchart = function (params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub == null ? 30 : params.stub;
        var segments,
            _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            midpoint = params.midpoint == null || isNaN(params.midpoint) ? 0.5 : params.midpoint,
            alwaysRespectStubs = params.alwaysRespectStubs === true,
            lastx = null, lasty = null, cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0;

            // TODO now common between this and AbstractBezierEditor; refactor into superclass?
            params.loopbackRadius || 25;
            var sgn = function (n) {
                return n < 0 ? -1 : n === 0 ? 0 : 1;
            },
            segmentDirections = function(segment) {
            return [
                    sgn( segment[2] - segment[0] ),
                    sgn( segment[3] - segment[1] )
                ];
            },
            /**
             * helper method to add a segment.
             */
            addSegment = function (segments, x, y, paintInfo) {
                if (lastx === x && lasty === y) {
                    return;
                }
                var lx = lastx == null ? paintInfo.sx : lastx,
                    ly = lasty == null ? paintInfo.sy : lasty,
                    o = lx === x ? "v" : "h";

                lastx = x;
                lasty = y;
                segments.push([ lx, ly, x, y, o ]);
            },
            segLength = function (s) {
                return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2));
            },
            _cloneArray = function (a) {
                var _a = [];
                _a.push.apply(_a, a);
                return _a;
            },
            writeSegments = function (conn, segments, paintInfo) {
                var current = null, next, currentDirection, nextDirection;
                for (var i = 0; i < segments.length - 1; i++) {

                    current = current || _cloneArray(segments[i]);
                    next = _cloneArray(segments[i + 1]);

                    currentDirection = segmentDirections(current);
                    nextDirection = segmentDirections(next);

                    if (cornerRadius > 0 && current[4] !== next[4]) {

                        var minSegLength = Math.min(segLength(current), segLength(next));
                        var radiusToUse = Math.min(cornerRadius, minSegLength / 2);

                        current[2] -= currentDirection[0] * radiusToUse;
                        current[3] -= currentDirection[1] * radiusToUse;
                        next[0] += nextDirection[0] * radiusToUse;
                        next[1] += nextDirection[1] * radiusToUse;

                        var ac = (currentDirection[1] === nextDirection[0] && nextDirection[0] === 1) ||
                                ((currentDirection[1] === nextDirection[0] && nextDirection[0] === 0) && currentDirection[0] !== nextDirection[1]) ||
                                (currentDirection[1] === nextDirection[0] && nextDirection[0] === -1),
                                sgny = next[1] > current[3] ? 1 : -1,
                                sgnx = next[0] > current[2] ? 1 : -1,
                                sgnEqual = sgny === sgnx,
                                cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2],
                                cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];

                        _super.addSegment(conn, STRAIGHT, {
                            x1: current[0], y1: current[1], x2: current[2], y2: current[3]
                        });

                        _super.addSegment(conn, ARC, {
                            r: radiusToUse,
                            x1: current[2],
                            y1: current[3],
                            x2: next[0],
                            y2: next[1],
                            cx: cx,
                            cy: cy,
                            ac: ac
                        });
                    }
                    else {
                        // dx + dy are used to adjust for line width.
                        var dx = (current[2] === current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2),
                            dy = (current[3] === current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);

                        _super.addSegment(conn, STRAIGHT, {
                            x1: current[0] - dx, y1: current[1] - dy, x2: current[2] + dx, y2: current[3] + dy
                        });
                    }
                    current = next;
                }
                if (next != null) {
                    // last segment
                    _super.addSegment(conn, STRAIGHT, {
                        x1: next[0], y1: next[1], x2: next[2], y2: next[3]
                    });
                }
            };

        this.midpoint = midpoint;

        this._compute = function (paintInfo, params) {

            segments = [];
            lastx = null;
            lasty = null;

            var commonStubCalculator = function () {
                    return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY];
                },
                stubCalculators = {
                    perpendicular: commonStubCalculator,
                    orthogonal: commonStubCalculator,
                    opposite: function (axis) {
                        var pi = paintInfo,
                            idx = axis === "x" ? 0 : 1,
                            areInProximity = {
                                "x": function () {
                                    return ( (pi.so[idx] === 1 && (
                                        ( (pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX) ) ||
                                        ( (pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) ||

                                        ( (pi.so[idx] === -1 && (
                                        ( (pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX) ) ||
                                        ( (pi.sx < pi.endStubX) && (pi.tx < pi.sx)))));
                                },
                                "y": function () {
                                    return ( (pi.so[idx] === 1 && (
                                        ( (pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY) ) ||
                                        ( (pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) ||

                                        ( (pi.so[idx] === -1 && (
                                        ( (pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY) ) ||
                                        ( (pi.sy < pi.endStubY) && (pi.ty < pi.sy)))));
                                }
                            };

                        if (!alwaysRespectStubs && areInProximity[axis]()) {
                            return {
                                "x": [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                                "y": [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                            }[axis];
                        }
                        else {
                            return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY];
                        }
                    }
                };

            // calculate Stubs.
            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
                idx = paintInfo.sourceAxis === "x" ? 0 : 1,
                oidx = paintInfo.sourceAxis === "x" ? 1 : 0,
                ss = stubs[idx],
                oss = stubs[oidx],
                es = stubs[idx + 2],
                oes = stubs[oidx + 2];

            // add the start stub segment. use stubs for loopback as it will look better, with the loop spaced
            // away from the element.
            addSegment(segments, stubs[0], stubs[1], paintInfo);

            // if its a loopback and we should treat it differently.
            // if (false && params.sourcePos[0] === params.targetPos[0] && params.sourcePos[1] === params.targetPos[1]) {
            //
            //     // we use loopbackRadius here, as statemachine connectors do.
            //     // so we go radius to the left from stubs[0], then upwards by 2*radius, to the right by 2*radius,
            //     // down by 2*radius, left by radius.
            //     addSegment(segments, stubs[0] - loopbackRadius, stubs[1], paintInfo);
            //     addSegment(segments, stubs[0] - loopbackRadius, stubs[1] - (2 * loopbackRadius), paintInfo);
            //     addSegment(segments, stubs[0] + loopbackRadius, stubs[1] - (2 * loopbackRadius), paintInfo);
            //     addSegment(segments, stubs[0] + loopbackRadius, stubs[1], paintInfo);
            //     addSegment(segments, stubs[0], stubs[1], paintInfo);
            //
            // }
            // else {


                var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint),
                    midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);

                var orientations = {x: [0, 1], y: [1, 0]},
                    lineCalculators = {
                        perpendicular: function (axis) {
                            var pi = paintInfo,
                                sis = {
                                    x: [
                                        [[1, 2, 3, 4], null, [2, 1, 4, 3]],
                                        null,
                                        [[4, 3, 2, 1], null, [3, 4, 1, 2]]
                                    ],
                                    y: [
                                        [[3, 2, 1, 4], null, [2, 3, 4, 1]],
                                        null,
                                        [[4, 1, 2, 3], null, [1, 4, 3, 2]]
                                    ]
                                },
                                stubs = {
                                    x: [[pi.startStubX, pi.endStubX], null, [pi.endStubX, pi.startStubX]],
                                    y: [[pi.startStubY, pi.endStubY], null, [pi.endStubY, pi.startStubY]]
                                },
                                midLines = {
                                    x: [[midx, pi.startStubY], [midx, pi.endStubY]],
                                    y: [[pi.startStubX, midy], [pi.endStubX, midy]]
                                },
                                linesToEnd = {
                                    x: [[pi.endStubX, pi.startStubY]],
                                    y: [[pi.startStubX, pi.endStubY]]
                                },
                                startToEnd = {
                                    x: [[pi.startStubX, pi.endStubY], [pi.endStubX, pi.endStubY]],
                                    y: [[pi.endStubX, pi.startStubY], [pi.endStubX, pi.endStubY]]
                                },
                                startToMidToEnd = {
                                    x: [[pi.startStubX, midy], [pi.endStubX, midy], [pi.endStubX, pi.endStubY]],
                                    y: [[midx, pi.startStubY], [midx, pi.endStubY], [pi.endStubX, pi.endStubY]]
                                },
                                otherStubs = {
                                    x: [pi.startStubY, pi.endStubY],
                                    y: [pi.startStubX, pi.endStubX]
                                },
                                soIdx = orientations[axis][0], toIdx = orientations[axis][1],
                                _so = pi.so[soIdx] + 1,
                                _to = pi.to[toIdx] + 1,
                                otherFlipped = (pi.to[toIdx] === -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (pi.to[toIdx] === 1 && (otherStubs[axis][1] > otherStubs[axis][0])),
                                stub1 = stubs[axis][_so][0],
                                stub2 = stubs[axis][_so][1],
                                segmentIndexes = sis[axis][_so][_to];

                            if (pi.segment === segmentIndexes[3] || (pi.segment === segmentIndexes[2] && otherFlipped)) {
                                return midLines[axis];
                            }
                            else if (pi.segment === segmentIndexes[2] && stub2 < stub1) {
                                return linesToEnd[axis];
                            }
                            else if ((pi.segment === segmentIndexes[2] && stub2 >= stub1) || (pi.segment === segmentIndexes[1] && !otherFlipped)) {
                                return startToMidToEnd[axis];
                            }
                            else if (pi.segment === segmentIndexes[0] || (pi.segment === segmentIndexes[1] && otherFlipped)) {
                                return startToEnd[axis];
                            }
                        },
                        orthogonal: function (axis, startStub, otherStartStub, endStub, otherEndStub) {
                            var pi = paintInfo,
                                extent = {
                                    "x": pi.so[0] === -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                                    "y": pi.so[1] === -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                                }[axis];

                            return {
                                "x": [
                                    [extent, otherStartStub],
                                    [extent, otherEndStub],
                                    [endStub, otherEndStub]
                                ],
                                "y": [
                                    [otherStartStub, extent],
                                    [otherEndStub, extent],
                                    [otherEndStub, endStub]
                                ]
                            }[axis];
                        },
                        opposite: function (axis, ss, oss, es) {
                            var pi = paintInfo,
                                otherAxis = {"x": "y", "y": "x"}[axis],
                                dim = {"x": "height", "y": "width"}[axis],
                                comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];

                            if (params.sourceEndpoint.elementId === params.targetEndpoint.elementId) {
                                var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                                return {
                                    "x": [
                                        [ss, _val],
                                        [es, _val]
                                    ],
                                    "y": [
                                        [_val, ss],
                                        [_val, es]
                                    ]
                                }[axis];

                            }
                            else if (!comparator || (pi.so[idx] === 1 && ss > es) || (pi.so[idx] === -1 && ss < es)) {
                                return {
                                    "x": [
                                        [ss, midy],
                                        [es, midy]
                                    ],
                                    "y": [
                                        [midx, ss],
                                        [midx, es]
                                    ]
                                }[axis];
                            }
                            else if ((pi.so[idx] === 1 && ss < es) || (pi.so[idx] === -1 && ss > es)) {
                                return {
                                    "x": [
                                        [midx, pi.sy],
                                        [midx, pi.ty]
                                    ],
                                    "y": [
                                        [pi.sx, midy],
                                        [pi.tx, midy]
                                    ]
                                }[axis];
                            }
                        }
                    };

                // compute the rest of the line
                var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
                if (p) {
                    for (var i = 0; i < p.length; i++) {
                        addSegment(segments, p[i][0], p[i][1], paintInfo);
                    }
                }

                // line to end stub
                addSegment(segments, stubs[2], stubs[3], paintInfo);

            //}

            // end stub to end (common)
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);



            // write out the segments.
            writeSegments(this, segments, paintInfo);

        };
    };

    _jp.Connectors.Flowchart = Flowchart;
    _ju.extend(_jp.Connectors.Flowchart, _jp.Connectors.AbstractConnector);

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    _jp.Connectors.AbstractBezierConnector = function(params) {
        params = params || {};
        var showLoopback = params.showLoopback !== false;
            params.curviness || 10;
            var margin = params.margin || 5;
            params.proximityLimit || 80;
            var clockwise = params.orientation && params.orientation === "clockwise",
            loopbackRadius = params.loopbackRadius || 25,
            _super;

        this._compute = function (paintInfo, p) {

            var sp = p.sourcePos,
                tp = p.targetPos,
                _w = Math.abs(sp[0] - tp[0]),
                _h = Math.abs(sp[1] - tp[1]);

            if (!showLoopback || (p.sourceEndpoint.elementId !== p.targetEndpoint.elementId)) {
                this._computeBezier(paintInfo, p, sp, tp, _w, _h);
            } else {
                // a loopback connector.  draw an arc from one anchor to the other.
                var x1 = p.sourcePos[0], y1 = p.sourcePos[1] - margin,
                    cx = x1, cy = y1 - loopbackRadius,
                // canvas sizing stuff, to ensure the whole painted area is visible.
                    _x = cx - loopbackRadius,
                    _y = cy - loopbackRadius;

                _w = 2 * loopbackRadius;
                _h = 2 * loopbackRadius;

                paintInfo.points[0] = _x;
                paintInfo.points[1] = _y;
                paintInfo.points[2] = _w;
                paintInfo.points[3] = _h;

                // ADD AN ARC SEGMENT.
                _super.addSegment(this, "Arc", {
                    loopback: true,
                    x1: (x1 - _x) + 4,
                    y1: y1 - _y,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: loopbackRadius,
                    ac: !clockwise,
                    x2: (x1 - _x) - 4,
                    y2: y1 - _y,
                    cx: cx - _x,
                    cy: cy - _y
                });
            }
        };

        _super = _jp.Connectors.AbstractConnector.apply(this, arguments);
        return _super;
    };
    _ju.extend(_jp.Connectors.AbstractBezierConnector, _jp.Connectors.AbstractConnector);

    var Bezier = function (params) {
        params = params || {};
        this.type = "Bezier";

        var _super = _jp.Connectors.AbstractBezierConnector.apply(this, arguments),
            majorAnchor = params.curviness || 150,
            minorAnchor = 10;

        this.getCurviness = function () {
            return majorAnchor;
        };

        this._findControlPoint = function (point, sourceAnchorPosition, targetAnchorPosition, sourceEndpoint, targetEndpoint, soo, too) {
            // determine if the two anchors are perpendicular to each other in their orientation.  we swap the control
            // points around if so (code could be tightened up)
            var perpendicular = soo[0] !== too[0] || soo[1] === too[1],
                p = [];

            if (!perpendicular) {
                if (soo[0] === 0) {
                    p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                }
                else {
                    p.push(point[0] - (majorAnchor * soo[0]));
                }

                if (soo[1] === 0) {
                    p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                }
                else {
                    p.push(point[1] + (majorAnchor * too[1]));
                }
            }
            else {
                if (too[0] === 0) {
                    p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                }
                else {
                    p.push(point[0] + (majorAnchor * too[0]));
                }

                if (too[1] === 0) {
                    p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                }
                else {
                    p.push(point[1] + (majorAnchor * soo[1]));
                }
            }

            return p;
        };

        this._computeBezier = function (paintInfo, p, sp, tp, _w, _h) {

            var _CP, _CP2,
                _sx = sp[0] < tp[0] ? _w : 0,
                _sy = sp[1] < tp[1] ? _h : 0,
                _tx = sp[0] < tp[0] ? 0 : _w,
                _ty = sp[1] < tp[1] ? 0 : _h;

            _CP = this._findControlPoint([_sx, _sy], sp, tp, p.sourceEndpoint, p.targetEndpoint, paintInfo.so, paintInfo.to);
            _CP2 = this._findControlPoint([_tx, _ty], tp, sp, p.targetEndpoint, p.sourceEndpoint, paintInfo.to, paintInfo.so);


            _super.addSegment(this, "Bezier", {
                x1: _sx, y1: _sy, x2: _tx, y2: _ty,
                cp1x: _CP[0], cp1y: _CP[1], cp2x: _CP2[0], cp2y: _CP2[1]
            });
        };


    };

    _jp.Connectors.Bezier = Bezier;
    _ju.extend(Bezier, _jp.Connectors.AbstractBezierConnector);

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var _segment = function (x1, y1, x2, y2) {
            if (x1 <= x2 && y2 <= y1) {
                return 1;
            }
            else if (x1 <= x2 && y1 <= y2) {
                return 2;
            }
            else if (x2 <= x1 && y2 >= y1) {
                return 3;
            }
            return 4;
        },

    // the control point we will use depends on the faces to which each end of the connection is assigned, specifically whether or not the
    // two faces are parallel or perpendicular.  if they are parallel then the control point lies on the midpoint of the axis in which they
    // are parellel and varies only in the other axis; this variation is proportional to the distance that the anchor points lie from the
    // center of that face.  if the two faces are perpendicular then the control point is at some distance from both the midpoints; the amount and
    // direction are dependent on the orientation of the two elements. 'seg', passed in to this method, tells you which segment the target element
    // lies in with respect to the source: 1 is top right, 2 is bottom right, 3 is bottom left, 4 is top left.
    //
    // sourcePos and targetPos are arrays of info about where on the source and target each anchor is located.  their contents are:
    //
    // 0 - absolute x
    // 1 - absolute y
    // 2 - proportional x in element (0 is left edge, 1 is right edge)
    // 3 - proportional y in element (0 is top edge, 1 is bottom edge)
    //
        _findControlPoint = function (midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
            // TODO (maybe)
            // - if anchor pos is 0.5, make the control point take into account the relative position of the elements.
            if (distance <= proximityLimit) {
                return [midx, midy];
            }

            if (segment === 1) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) {
                    return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                }
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) {
                    return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                }
                else {
                    return [ midx + (-1 * dx) , midy + (-1 * dy) ];
                }
            }
            else if (segment === 2) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) {
                    return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                }
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) {
                    return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                }
                else {
                    return [ midx + dx, midy + (-1 * dy) ];
                }
            }
            else if (segment === 3) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) {
                    return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                }
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) {
                    return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                }
                else {
                    return [ midx + (-1 * dx) , midy + (-1 * dy) ];
                }
            }
            else if (segment === 4) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) {
                    return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                }
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) {
                    return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                }
                else {
                    return [ midx + dx , midy + (-1 * dy) ];
                }
            }

        };

    var StateMachine = function (params) {
        params = params || {};
        this.type = "StateMachine";

        var _super = _jp.Connectors.AbstractBezierConnector.apply(this, arguments),
            curviness = params.curviness || 10,
            margin = params.margin || 5,
            proximityLimit = params.proximityLimit || 80;
            params.orientation && params.orientation === "clockwise";
            var _controlPoint;

        this._computeBezier = function(paintInfo, params, sp, tp, w, h) {
            var _sx = params.sourcePos[0] < params.targetPos[0] ? 0 : w,
                _sy = params.sourcePos[1] < params.targetPos[1] ? 0 : h,
                _tx = params.sourcePos[0] < params.targetPos[0] ? w : 0,
                _ty = params.sourcePos[1] < params.targetPos[1] ? h : 0;

            // now adjust for the margin
            if (params.sourcePos[2] === 0) {
                _sx -= margin;
            }
            if (params.sourcePos[2] === 1) {
                _sx += margin;
            }
            if (params.sourcePos[3] === 0) {
                _sy -= margin;
            }
            if (params.sourcePos[3] === 1) {
                _sy += margin;
            }
            if (params.targetPos[2] === 0) {
                _tx -= margin;
            }
            if (params.targetPos[2] === 1) {
                _tx += margin;
            }
            if (params.targetPos[3] === 0) {
                _ty -= margin;
            }
            if (params.targetPos[3] === 1) {
                _ty += margin;
            }

            //
            // these connectors are quadratic bezier curves, having a single control point. if both anchors
            // are located at 0.5 on their respective faces, the control point is set to the midpoint and you
            // get a straight line.  this is also the case if the two anchors are within 'proximityLimit', since
            // it seems to make good aesthetic sense to do that. outside of that, the control point is positioned
            // at 'curviness' pixels away along the normal to the straight line connecting the two anchors.
            //
            // there may be two improvements to this.  firstly, we might actually support the notion of avoiding nodes
            // in the UI, or at least making a good effort at doing so.  if a connection would pass underneath some node,
            // for example, we might increase the distance the control point is away from the midpoint in a bid to
            // steer it around that node.  this will work within limits, but i think those limits would also be the likely
            // limits for, once again, aesthetic good sense in the layout of a chart using these connectors.
            //
            // the second possible change is actually two possible changes: firstly, it is possible we should gradually
            // decrease the 'curviness' as the distance between the anchors decreases; start tailing it off to 0 at some
            // point (which should be configurable).  secondly, we might slightly increase the 'curviness' for connectors
            // with respect to how far their anchor is from the center of its respective face. this could either look cool,
            // or stupid, and may indeed work only in a way that is so subtle as to have been a waste of time.
            //

            var _midx = (_sx + _tx) / 2,
                _midy = (_sy + _ty) / 2,
                segment = _segment(_sx, _sy, _tx, _ty),
                distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2)),
                cp1x, cp2x, cp1y, cp2y;


            // calculate the control point.  this code will be where we'll put in a rudimentary element avoidance scheme; it
            // will work by extending the control point to force the curve to be, um, curvier.
            _controlPoint = _findControlPoint(_midx,
                _midy,
                segment,
                params.sourcePos,
                params.targetPos,
                curviness, curviness,
                distance,
                proximityLimit);

            cp1x = _controlPoint[0];
            cp2x = _controlPoint[0];
            cp1y = _controlPoint[1];
            cp2y = _controlPoint[1];

            _super.addSegment(this, "Bezier", {
                x1: _tx, y1: _ty, x2: _sx, y2: _sy,
                cp1x: cp1x, cp1y: cp1y,
                cp2x: cp2x, cp2y: cp2y
            });
        };
    };

    _jp.Connectors.StateMachine = StateMachine;
    _ju.extend(StateMachine, _jp.Connectors.AbstractBezierConnector);

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;
    var STRAIGHT = "Straight";

    var Straight = function (params) {
        this.type = STRAIGHT;
        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments);

        this._compute = function (paintInfo, _) {
            _super.addSegment(this, STRAIGHT, {x1: paintInfo.sx, y1: paintInfo.sy, x2: paintInfo.startStubX, y2: paintInfo.startStubY});
            _super.addSegment(this, STRAIGHT, {x1: paintInfo.startStubX, y1: paintInfo.startStubY, x2: paintInfo.endStubX, y2: paintInfo.endStubY});
            _super.addSegment(this, STRAIGHT, {x1: paintInfo.endStubX, y1: paintInfo.endStubY, x2: paintInfo.tx, y2: paintInfo.ty});
        };
    };

    _jp.Connectors.Straight = Straight;
    _ju.extend(Straight, _jp.Connectors.AbstractConnector);

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var svgAttributeMap = {
            "stroke-linejoin": "stroke-linejoin",
            "stroke-dashoffset": "stroke-dashoffset",
            "stroke-linecap": "stroke-linecap"
        },
        STROKE_DASHARRAY = "stroke-dasharray",
        DASHSTYLE = "dashstyle",
        LINEAR_GRADIENT = "linearGradient",
        RADIAL_GRADIENT = "radialGradient",
        DEFS = "defs",
        FILL = "fill",
        STOP = "stop",
        STROKE = "stroke",
        STROKE_WIDTH = "stroke-width",
        STYLE = "style",
        NONE = "none",
        JSPLUMB_GRADIENT = "jsplumb_gradient_",
        LINE_WIDTH = "strokeWidth",
        ns = {
            svg: "http://www.w3.org/2000/svg"
        },
        _attr = function (node, attributes) {
            for (var i in attributes) {
                node.setAttribute(i, "" + attributes[i]);
            }
        },
        _node = function (name, attributes) {
            attributes = attributes || {};
            attributes.version = "1.1";
            attributes.xmlns = ns.svg;
            return _jp.createElementNS(ns.svg, name, null, null, attributes);
        },
        _pos = function (d) {
            return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px";
        },
        _clearGradient = function (parent) {
            var els = parent.querySelectorAll(" defs,linearGradient,radialGradient");
            for (var i = 0; i < els.length; i++) {
                els[i].parentNode.removeChild(els[i]);
            }
        },
        _updateGradient = function (parent, node, style, dimensions, uiComponent) {
            var id = JSPLUMB_GRADIENT + uiComponent._jsPlumb.instance.idstamp();
            // first clear out any existing gradient
            _clearGradient(parent);
            // this checks for an 'offset' property in the gradient, and in the absence of it, assumes
            // we want a linear gradient. if it's there, we create a radial gradient.
            // it is possible that a more explicit means of defining the gradient type would be
            // better. relying on 'offset' means that we can never have a radial gradient that uses
            // some default offset, for instance.
            // issue 244 suggested the 'gradientUnits' attribute; without this, straight/flowchart connectors with gradients would
            // not show gradients when the line was perfectly horizontal or vertical.
            var g;
            if (!style.gradient.offset) {
                g = _node(LINEAR_GRADIENT, {id: id, gradientUnits: "userSpaceOnUse"});
            }
            else {
                g = _node(RADIAL_GRADIENT, { id: id });
            }

            var defs = _node(DEFS);
            parent.appendChild(defs);
            defs.appendChild(g);

            // the svg radial gradient seems to treat stops in the reverse
            // order to how canvas does it.  so we want to keep all the maths the same, but
            // iterate the actual style declarations in reverse order, if the x indexes are not in order.
            for (var i = 0; i < style.gradient.stops.length; i++) {
                var styleToUse = uiComponent.segment === 1 || uiComponent.segment === 2 ? i : style.gradient.stops.length - 1 - i,
                    stopColor = style.gradient.stops[styleToUse][1],
                    s = _node(STOP, {"offset": Math.floor(style.gradient.stops[i][0] * 100) + "%", "stop-color": stopColor});

                g.appendChild(s);
            }
            var applyGradientTo = style.stroke ? STROKE : FILL;
            node.setAttribute(applyGradientTo, "url(#" + id + ")");
        },
        _applyStyles = function (parent, node, style, dimensions, uiComponent) {

            node.setAttribute(FILL, style.fill ? style.fill : NONE);
            node.setAttribute(STROKE, style.stroke ? style.stroke : NONE);

            if (style.gradient) {
                _updateGradient(parent, node, style, dimensions, uiComponent);
            }
            else {
                // make sure we clear any existing gradient
                _clearGradient(parent);
                node.setAttribute(STYLE, "");
            }

            if (style.strokeWidth) {
                node.setAttribute(STROKE_WIDTH, style.strokeWidth);
            }

            // in SVG there is a stroke-dasharray attribute we can set, and its syntax looks like
            // the syntax in VML but is actually kind of nasty: values are given in the pixel
            // coordinate space, whereas in VML they are multiples of the width of the stroked
            // line, which makes a lot more sense.  for that reason, jsPlumb is supporting both
            // the native svg 'stroke-dasharray' attribute, and also the 'dashstyle' concept from
            // VML, which will be the preferred method.  the code below this converts a dashstyle
            // attribute given in terms of stroke width into a pixel representation, by using the
            // stroke's lineWidth.
            if (style[DASHSTYLE] && style[LINE_WIDTH] && !style[STROKE_DASHARRAY]) {
                var sep = style[DASHSTYLE].indexOf(",") === -1 ? " " : ",",
                    parts = style[DASHSTYLE].split(sep),
                    styleToUse = "";
                parts.forEach(function (p) {
                    styleToUse += (Math.floor(p * style.strokeWidth) + sep);
                });
                node.setAttribute(STROKE_DASHARRAY, styleToUse);
            }
            else if (style[STROKE_DASHARRAY]) {
                node.setAttribute(STROKE_DASHARRAY, style[STROKE_DASHARRAY]);
            }

            // extra attributes such as join type, dash offset.
            for (var i in svgAttributeMap) {
                if (style[i]) {
                    node.setAttribute(svgAttributeMap[i], style[i]);
                }
            }
        },
        _appendAtIndex = function (svg, path, idx) {
            if (svg.childNodes.length > idx) {
                svg.insertBefore(path, svg.childNodes[idx]);
            }
            else {
                svg.appendChild(path);
            }
        };

    /**
     utility methods for other objects to use.
     */
    _ju.svg = {
        node: _node,
        attr: _attr,
        pos: _pos
    };

    // ************************** / SVG utility methods ********************************************

    /*
     * Base class for SVG components.
     */
    var SvgComponent = function (params) {
        var pointerEventsSpec = params.pointerEventsSpec || "all", renderer = {};

        _jp.jsPlumbUIComponent.apply(this, params.originalArgs);
        this.canvas = null;
        this.path = null;
        this.svg = null;
        this.bgCanvas = null;

        var clazz = params.cssClass + " " + (params.originalArgs[0].cssClass || ""),
            svgParams = {
                "style": "",
                "width": 0,
                "height": 0,
                "pointer-events": pointerEventsSpec,
                "position": "absolute"
            };

        this.svg = _node("svg", svgParams);

        if (params.useDivWrapper) {
            this.canvas = _jp.createElement("div", { position : "absolute" });
            _ju.sizeElement(this.canvas, 0, 0, 1, 1);
            this.canvas.className = clazz;
        }
        else {
            _attr(this.svg, { "class": clazz });
            this.canvas = this.svg;
        }

        params._jsPlumb.appendElement(this.canvas, params.originalArgs[0].parent);
        if (params.useDivWrapper) {
            this.canvas.appendChild(this.svg);
        }

        var displayElements = [ this.canvas ];
        this.getDisplayElements = function () {
            return displayElements;
        };

        this.appendDisplayElement = function (el) {
            displayElements.push(el);
        };

        this.paint = function (style, anchor, extents) {
            if (style != null) {

                var xy = [ this.x, this.y ], wh = [ this.w, this.h ], p;
                if (extents != null) {
                    if (extents.xmin < 0) {
                        xy[0] += extents.xmin;
                    }
                    if (extents.ymin < 0) {
                        xy[1] += extents.ymin;
                    }
                    wh[0] = extents.xmax + ((extents.xmin < 0) ? -extents.xmin : 0);
                    wh[1] = extents.ymax + ((extents.ymin < 0) ? -extents.ymin : 0);
                }

                if (params.useDivWrapper) {
                    _ju.sizeElement(this.canvas, xy[0], xy[1], wh[0] > 0 ? wh[0] : 1, wh[1] > 0 ? wh[1] : 1);
                    xy[0] = 0;
                    xy[1] = 0;
                    p = _pos([ 0, 0 ]);
                }
                else {
                    p = _pos([ xy[0], xy[1] ]);
                }

                renderer.paint.apply(this, arguments);

                _attr(this.svg, {
                    "style": p,
                    "width": wh[0] || 1,
                    "height": wh[1] || 1
                });
            }
        };

        return {
            renderer: renderer
        };
    };

    _ju.extend(SvgComponent, _jp.jsPlumbUIComponent, {
        cleanup: function (force) {
            if (force || this.typeId == null) {
                if (this.canvas) {
                    this.canvas._jsPlumb = null;
                }
                if (this.svg) {
                    this.svg._jsPlumb = null;
                }
                if (this.bgCanvas) {
                    this.bgCanvas._jsPlumb = null;
                }

                if (this.canvas && this.canvas.parentNode) {
                    this.canvas.parentNode.removeChild(this.canvas);
                }
                if (this.bgCanvas && this.bgCanvas.parentNode) {
                    this.canvas.parentNode.removeChild(this.canvas);
                }

                this.svg = null;
                this.canvas = null;
                this.path = null;
                this.group = null;
                this._jsPlumb = null;
            }
            else {
                // if not a forced cleanup, just detach from DOM for now.
                if (this.canvas && this.canvas.parentNode) {
                    this.canvas.parentNode.removeChild(this.canvas);
                }
                if (this.bgCanvas && this.bgCanvas.parentNode) {
                    this.bgCanvas.parentNode.removeChild(this.bgCanvas);
                }
            }
        },
        reattach:function(instance) {
            var c = instance.getContainer();
            if (this.canvas && this.canvas.parentNode == null) {
                c.appendChild(this.canvas);
            }
            if (this.bgCanvas && this.bgCanvas.parentNode == null) {
                c.appendChild(this.bgCanvas);
            }
        },
        setVisible: function (v) {
            if (this.canvas) {
                this.canvas.style.display = v ? "block" : "none";
            }
        }
    });

    /*
     * Base class for SVG connectors.
     */
    _jp.ConnectorRenderers.svg = function (params) {
        var self = this,
            _super = SvgComponent.apply(this, [
                {
                    cssClass: params._jsPlumb.connectorClass,
                    originalArgs: arguments,
                    pointerEventsSpec: "none",
                    _jsPlumb: params._jsPlumb
                }
            ]);

        _super.renderer.paint = function (style, anchor, extents) {

            var segments = self.getSegments(), p = "", offset = [0, 0];
            if (extents.xmin < 0) {
                offset[0] = -extents.xmin;
            }
            if (extents.ymin < 0) {
                offset[1] = -extents.ymin;
            }

            if (segments.length > 0) {

                p = self.getPathData();

                var a = {
                        d: p,
                        transform: "translate(" + offset[0] + "," + offset[1] + ")",
                        "pointer-events": params["pointer-events"] || "visibleStroke"
                    },
                    outlineStyle = null,
                    d = [self.x, self.y, self.w, self.h];

                // outline style.  actually means drawing an svg object underneath the main one.
                if (style.outlineStroke) {
                    var outlineWidth = style.outlineWidth || 1,
                        outlineStrokeWidth = style.strokeWidth + (2 * outlineWidth);
                    outlineStyle = _jp.extend({}, style);
                    delete outlineStyle.gradient;
                    outlineStyle.stroke = style.outlineStroke;
                    outlineStyle.strokeWidth = outlineStrokeWidth;

                    if (self.bgPath == null) {
                        self.bgPath = _node("path", a);
                        _jp.addClass(self.bgPath, _jp.connectorOutlineClass);
                        _appendAtIndex(self.svg, self.bgPath, 0);
                    }
                    else {
                        _attr(self.bgPath, a);
                    }

                    _applyStyles(self.svg, self.bgPath, outlineStyle, d, self);
                }

                if (self.path == null) {
                    self.path = _node("path", a);
                    _appendAtIndex(self.svg, self.path, style.outlineStroke ? 1 : 0);
                }
                else {
                    _attr(self.path, a);
                }

                _applyStyles(self.svg, self.path, style, d, self);
            }
        };
    };
    _ju.extend(_jp.ConnectorRenderers.svg, SvgComponent);

// ******************************* svg segment renderer *****************************************************	


// ******************************* /svg segments *****************************************************

    /*
     * Base class for SVG endpoints.
     */
    var SvgEndpoint = _jp.SvgEndpoint = function (params) {
        var _super = SvgComponent.apply(this, [
            {
                cssClass: params._jsPlumb.endpointClass,
                originalArgs: arguments,
                pointerEventsSpec: "all",
                useDivWrapper: true,
                _jsPlumb: params._jsPlumb
            }
        ]);

        _super.renderer.paint = function (style) {
            var s = _jp.extend({}, style);
            if (s.outlineStroke) {
                s.stroke = s.outlineStroke;
            }

            if (this.node == null) {
                this.node = this.makeNode(s);
                this.svg.appendChild(this.node);
            }
            else if (this.updateNode != null) {
                this.updateNode(this.node);
            }
            _applyStyles(this.svg, this.node, s, [ this.x, this.y, this.w, this.h ], this);
            _pos(this.node, [ this.x, this.y ]);
        }.bind(this);

    };
    _ju.extend(SvgEndpoint, SvgComponent);

    /*
     * SVG Dot Endpoint
     */
    _jp.Endpoints.svg.Dot = function () {
        _jp.Endpoints.Dot.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("circle", {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Dot, [_jp.Endpoints.Dot, SvgEndpoint]);

    /*
     * SVG Rectangle Endpoint
     */
    _jp.Endpoints.svg.Rectangle = function () {
        _jp.Endpoints.Rectangle.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("rect", {
                "width": this.w,
                "height": this.h
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "width": this.w,
                "height": this.h
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Rectangle, [_jp.Endpoints.Rectangle, SvgEndpoint]);

    /*
     * SVG Image Endpoint is the default image endpoint.
     */
    _jp.Endpoints.svg.Image = _jp.Endpoints.Image;
    /*
     * Blank endpoint in svg renderer is the default Blank endpoint.
     */
    _jp.Endpoints.svg.Blank = _jp.Endpoints.Blank;
    /*
     * Label overlay in svg renderer is the default Label overlay.
     */
    _jp.Overlays.svg.Label = _jp.Overlays.Label;
    /*
     * Custom overlay in svg renderer is the default Custom overlay.
     */
    _jp.Overlays.svg.Custom = _jp.Overlays.Custom;

    var AbstractSvgArrowOverlay = function (superclass, originalArgs) {
        superclass.apply(this, originalArgs);
        _jp.jsPlumbUIComponent.apply(this, originalArgs);
        this.isAppendedAtTopLevel = false;
        this.path = null;
        this.paint = function (params, containerExtents) {
            // only draws on connections, not endpoints.
            if (params.component.svg && containerExtents) {
                if (this.path == null) {
                    this.path = _node("path", {
                        "pointer-events": "all"
                    });
                    params.component.svg.appendChild(this.path);
                    if (this.elementCreated) {
                        this.elementCreated(this.path, params.component);
                    }

                    this.canvas = params.component.svg; // for the sake of completeness; this behaves the same as other overlays
                }
                var clazz = originalArgs && (originalArgs.length === 1) ? (originalArgs[0].cssClass || "") : "",
                    offset = [0, 0];

                if (containerExtents.xmin < 0) {
                    offset[0] = -containerExtents.xmin;
                }
                if (containerExtents.ymin < 0) {
                    offset[1] = -containerExtents.ymin;
                }

                _attr(this.path, {
                    "d": makePath(params.d),
                    "class": clazz,
                    stroke: params.stroke ? params.stroke : null,
                    fill: params.fill ? params.fill : null,
                    transform: "translate(" + offset[0] + "," + offset[1] + ")"
                });
            }
        };
        var makePath = function (d) {
            return (isNaN(d.cxy.x) || isNaN(d.cxy.y)) ? "" : "M" + d.hxy.x + "," + d.hxy.y +
                " L" + d.tail[0].x + "," + d.tail[0].y +
                " L" + d.cxy.x + "," + d.cxy.y +
                " L" + d.tail[1].x + "," + d.tail[1].y +
                " L" + d.hxy.x + "," + d.hxy.y;
        };
        this.transfer = function(target) {
            if (target.canvas && this.path && this.path.parentNode) {
                this.path.parentNode.removeChild(this.path);
                target.canvas.appendChild(this.path);
            }
        };
    };

    var svgProtoFunctions = {
        cleanup : function (force) {
            if (this.path != null) {
                if (force) {
                    this._jsPlumb.instance.removeElement(this.path);
                }
                else {
                    if (this.path.parentNode) {
                        this.path.parentNode.removeChild(this.path);
                    }
                }
            }
        }, reattach :function(instance, component) {
            if (this.path && component.canvas) {
                component.canvas.appendChild(this.path);
            }
        },
        setVisible : function (v) {
            if (this.path != null) {
                (this.path.style.display = (v ? "block" : "none"));
            }
        }
    };

    _ju.extend(AbstractSvgArrowOverlay, [_jp.jsPlumbUIComponent, _jp.Overlays.AbstractOverlay]);

    _jp.Overlays.svg.Arrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Arrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Arrow, [ _jp.Overlays.Arrow, AbstractSvgArrowOverlay ], svgProtoFunctions);

    _jp.Overlays.svg.PlainArrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.PlainArrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.PlainArrow, [ _jp.Overlays.PlainArrow, AbstractSvgArrowOverlay ], svgProtoFunctions);

    _jp.Overlays.svg.Diamond = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Diamond, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Diamond, [ _jp.Overlays.Diamond, AbstractSvgArrowOverlay ], svgProtoFunctions);

    // a test
    _jp.Overlays.svg.GuideLines = function () {
        var path = null, self = this, p1_1, p1_2;
        _jp.Overlays.GuideLines.apply(this, arguments);
        this.paint = function (params, containerExtents) {
            if (path == null) {
                path = _node("path");
                params.connector.svg.appendChild(path);
                self.attachListeners(path, params.connector);
                self.attachListeners(path, self);

                p1_1 = _node("path");
                params.connector.svg.appendChild(p1_1);
                self.attachListeners(p1_1, params.connector);
                self.attachListeners(p1_1, self);

                p1_2 = _node("path");
                params.connector.svg.appendChild(p1_2);
                self.attachListeners(p1_2, params.connector);
                self.attachListeners(p1_2, self);
            }

            var offset = [0, 0];
            if (containerExtents.xmin < 0) {
                offset[0] = -containerExtents.xmin;
            }
            if (containerExtents.ymin < 0) {
                offset[1] = -containerExtents.ymin;
            }

            _attr(path, {
                "d": makePath(params.head, params.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_1, {
                "d": makePath(params.tailLine[0], params.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_2, {
                "d": makePath(params.headLine[0], params.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });
        };

        var makePath = function (d1, d2) {
            return "M " + d1.x + "," + d1.y +
                " L" + d2.x + "," + d2.y;
        };
    };
    _ju.extend(_jp.Overlays.svg.GuideLines, _jp.Overlays.GuideLines);
}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
(function () {

    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil,
        _jk = root.Katavorio, _jg = root.Biltong;

    var _getEventManager = function(instance) {
        var e = instance._mottle;
        if (!e) {
            e = instance._mottle = new root.Mottle();
        }
        return e;
    };

    var _getDragManager = function (instance, category) {

        category = category || "main";
        var key = "_katavorio_" + category;
        var k = instance[key],
            e = instance.getEventManager();

        if (!k) {
            k = new _jk({
                bind: e.on,
                unbind: e.off,
                getSize: _jp.getSize,
                getConstrainingRectangle:function(el) {
                    return [ el.parentNode.scrollWidth, el.parentNode.scrollHeight ];
                },
                getPosition: function (el, relativeToRoot) {
                    // if this is a nested draggable then compute the offset against its own offsetParent, otherwise
                    // compute against the Container's origin. see also the getUIPosition method below.
                    var o = instance.getOffset(el, relativeToRoot, el._katavorioDrag ? el.offsetParent : null);
                    return [o.left, o.top];
                },
                setPosition: function (el, xy) {
                    el.style.left = xy[0] + "px";
                    el.style.top = xy[1] + "px";
                },
                addClass: _jp.addClass,
                removeClass: _jp.removeClass,
                intersects: _jg.intersects,
                indexOf: function(l, i) { return l.indexOf(i); },
                scope:instance.getDefaultScope(),
                css: {
                    noSelect: instance.dragSelectClass,
                    droppable: "jtk-droppable",
                    draggable: "jtk-draggable",
                    drag: "jtk-drag",
                    selected: "jtk-drag-selected",
                    active: "jtk-drag-active",
                    hover: "jtk-drag-hover",
                    ghostProxy:"jtk-ghost-proxy"
                }
            });
            k.setZoom(instance.getZoom());
            instance[key] = k;
            instance.bind("zoom", k.setZoom);
        }
        return k;
    };

    var _dragStart=function(params) {
        var options = params.el._jsPlumbDragOptions;
        var cont = true;
        if (options.canDrag) {
            cont = options.canDrag();
        }
        if (cont) {
            this.setHoverSuspended(true);
            this.select({source: params.el}).addClass(this.elementDraggingClass + " " + this.sourceElementDraggingClass, true);
            this.select({target: params.el}).addClass(this.elementDraggingClass + " " + this.targetElementDraggingClass, true);
            this.setConnectionBeingDragged(true);
        }
        return cont;
    };
    var _dragMove=function(params) {
        var ui = this.getUIPosition(arguments, this.getZoom());
        if (ui != null) {
            var o = params.el._jsPlumbDragOptions;
            this.draw(params.el, ui, null, true);
            if (o._dragging) {
                this.addClass(params.el, "jtk-dragged");
            }
            o._dragging = true;
        }
    };
    var _dragStop=function(params) {
        var elements = params.selection, uip;

        var _one = function (_e) {
            var drawResult;
            if (_e[1] != null) {
                // run the reported offset through the code that takes parent containers
                // into account, to adjust if necessary (issue 554)
                uip = this.getUIPosition([{
                    el:_e[2].el,
                    pos:[_e[1].left, _e[1].top]
                }]);
                drawResult = this.draw(_e[2].el, uip);
            }

            if (_e[0]._jsPlumbDragOptions != null) {
                delete _e[0]._jsPlumbDragOptions._dragging;
            }

            this.removeClass(_e[0], "jtk-dragged");
            this.select({source: _e[2].el}).removeClass(this.elementDraggingClass + " " + this.sourceElementDraggingClass, true);
            this.select({target: _e[2].el}).removeClass(this.elementDraggingClass + " " + this.targetElementDraggingClass, true);

            params.e._drawResult = params.e._drawResult || {c:[],e:[], a:[]};
            Array.prototype.push.apply(params.e._drawResult.c, drawResult.c);
            Array.prototype.push.apply(params.e._drawResult.e, drawResult.e);
            Array.prototype.push.apply(params.e._drawResult.a, drawResult.a);

            this.getDragManager().dragEnded(_e[2].el);

        }.bind(this);

        for (var i = 0; i < elements.length; i++) {
            _one(elements[i]);
        }

        this.setHoverSuspended(false);
        this.setConnectionBeingDragged(false);
    };

    var _animProps = function (o, p) {
        var _one = function (pName) {
            if (p[pName] != null) {
                if (_ju.isString(p[pName])) {
                    var m = p[pName].match(/-=/) ? -1 : 1,
                        v = p[pName].substring(2);
                    return o[pName] + (m * v);
                }
                else {
                    return p[pName];
                }
            }
            else {
                return o[pName];
            }
        };
        return [ _one("left"), _one("top") ];
    };

    var _genLoc = function (prefix, e) {
            if (e == null) {
                return [ 0, 0 ];
            }
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = _genLoc.bind(this, "page"),
        _screenLocation = _genLoc.bind(this, "screen"),
        _clientLocation = _genLoc.bind(this, "client"),
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                        [ e ];
        };

    /**
     Manages dragging for some instance of jsPlumb.

     TODO instead of this being accessed directly, it should subscribe to events on the jsPlumb instance: every method
     in here is called directly by jsPlumb. But what should happen is that we have unpublished events that this listens
     to.  The only trick is getting one of these instantiated with every jsPlumb instance: it needs to have a hook somehow.
     Basically the general idea is to pull ALL the drag code out (prototype method registrations plus this) into a
     dedicated drag script), that does not necessarily need to be included.


     */
    var DragManager = function (_currentInstance) {
        var _draggables = {}, _dlist = [], _delements = {}, _elementsWithEndpoints = {},
            // elementids mapped to the draggable to which they belong.
            _draggablesForElements = {};

        /**
         register some element as draggable.  right now the drag init stuff is done elsewhere, and it is
         possible that will continue to be the case.
         */
        this.register = function (el) {
            var id = _currentInstance.getId(el),
                parentOffset;

            if (!_draggables[id]) {
                _draggables[id] = el;
                _dlist.push(el);
                _delements[id] = {};
            }

            // look for child elements that have endpoints and register them against this draggable.
            var _oneLevel = function (p) {
                if (p) {
                    for (var i = 0; i < p.childNodes.length; i++) {
                        if (p.childNodes[i].nodeType !== 3 && p.childNodes[i].nodeType !== 8) {
                            var cEl = jsPlumb.getElement(p.childNodes[i]),
                                cid = _currentInstance.getId(p.childNodes[i], null, true);
                            if (cid && _elementsWithEndpoints[cid] && _elementsWithEndpoints[cid] > 0) {
                                if (!parentOffset) {
                                    parentOffset = _currentInstance.getOffset(el);
                                }
                                var cOff = _currentInstance.getOffset(cEl);
                                _delements[id][cid] = {
                                    id: cid,
                                    offset: {
                                        left: cOff.left - parentOffset.left,
                                        top: cOff.top - parentOffset.top
                                    }
                                };
                                _draggablesForElements[cid] = id;
                            }
                            _oneLevel(p.childNodes[i]);
                        }
                    }
                }
            };

            _oneLevel(el);
        };

        // refresh the offsets for child elements of this element.
        this.updateOffsets = function (elId, childOffsetOverrides) {
            if (elId != null) {
                childOffsetOverrides = childOffsetOverrides || {};
                var domEl = jsPlumb.getElement(elId),
                    id = _currentInstance.getId(domEl),
                    children = _delements[id],
                    parentOffset;

                if (children) {
                    for (var i in children) {
                        if (children.hasOwnProperty(i)) {
                            var cel = jsPlumb.getElement(i),
                                cOff = childOffsetOverrides[i] || _currentInstance.getOffset(cel);

                            // do not update if we have a value already and we'd just be writing 0,0
                            if (cel.offsetParent == null && _delements[id][i] != null) {
                                continue;
                            }

                            if (!parentOffset) {
                                parentOffset = _currentInstance.getOffset(domEl);
                            }

                            _delements[id][i] = {
                                id: i,
                                offset: {
                                    left: cOff.left - parentOffset.left,
                                    top: cOff.top - parentOffset.top
                                }
                            };
                            _draggablesForElements[i] = id;
                        }
                    }
                }
            }
        };

        /**
         notification that an endpoint was added to the given el.  we go up from that el's parent
         node, looking for a parent that has been registered as a draggable. if we find one, we add this
         el to that parent's list of elements to update on drag (if it is not there already)
         */
        this.endpointAdded = function (el, id) {

            id = id || _currentInstance.getId(el);

            var b = document.body,
                p = el.parentNode;

            _elementsWithEndpoints[id] = _elementsWithEndpoints[id] ? _elementsWithEndpoints[id] + 1 : 1;

            while (p != null && p !== b) {
                var pid = _currentInstance.getId(p, null, true);
                if (pid && _draggables[pid]) {
                    var pLoc = _currentInstance.getOffset(p);

                    if (_delements[pid][id] == null) {
                        var cLoc = _currentInstance.getOffset(el);
                        _delements[pid][id] = {
                            id: id,
                            offset: {
                                left: cLoc.left - pLoc.left,
                                top: cLoc.top - pLoc.top
                            }
                        };
                        _draggablesForElements[id] = pid;
                    }
                    break;
                }
                p = p.parentNode;
            }
        };

        this.endpointDeleted = function (endpoint) {
            if (_elementsWithEndpoints[endpoint.elementId]) {
                _elementsWithEndpoints[endpoint.elementId]--;
                if (_elementsWithEndpoints[endpoint.elementId] <= 0) {
                    for (var i in _delements) {
                        if (_delements.hasOwnProperty(i) && _delements[i]) {
                            delete _delements[i][endpoint.elementId];
                            delete _draggablesForElements[endpoint.elementId];
                        }
                    }
                }
            }
        };

        this.changeId = function (oldId, newId) {
            _delements[newId] = _delements[oldId];
            _delements[oldId] = {};
            _draggablesForElements[newId] = _draggablesForElements[oldId];
            _draggablesForElements[oldId] = null;
        };

        this.getElementsForDraggable = function (id) {
            return _delements[id];
        };

        this.elementRemoved = function (elementId) {
            var elId = _draggablesForElements[elementId];
            if (elId) {
                _delements[elId] && delete _delements[elId][elementId];
                delete _draggablesForElements[elementId];
            }
        };

        this.reset = function () {
            _draggables = {};
            _dlist = [];
            _delements = {};
            _elementsWithEndpoints = {};
        };

        //
        // notification drag ended. We check automatically if need to update some
        // ancestor's offsets.
        //
        this.dragEnded = function (el) {
            if (el.offsetParent != null) {
                var id = _currentInstance.getId(el),
                    ancestor = _draggablesForElements[id];

                if (ancestor) {
                    this.updateOffsets(ancestor);
                }
            }
        };

        this.setParent = function (el, elId, p, pId, currentChildLocation) {
            var current = _draggablesForElements[elId];
            if (!_delements[pId]) {
                _delements[pId] = {};
            }
            var pLoc = _currentInstance.getOffset(p),
                cLoc = currentChildLocation || _currentInstance.getOffset(el);

            if (current && _delements[current]) {
                delete _delements[current][elId];
            }

            _delements[pId][elId] = {
                id:elId,
                offset : {
                    left: cLoc.left - pLoc.left,
                    top: cLoc.top - pLoc.top
                }
            };
            _draggablesForElements[elId] = pId;
        };

        this.clearParent = function(el, elId) {
            var current = _draggablesForElements[elId];
            if (current) {
                delete _delements[current][elId];
                delete _draggablesForElements[elId];
            }
        };

        this.revalidateParent = function(el, elId, childOffset) {
            var current = _draggablesForElements[elId];
            if (current) {
                var co = {};
                co[elId] = childOffset;
                this.updateOffsets(current, co);
                _currentInstance.revalidate(current);
            }
        };

        this.getDragAncestor = function (el) {
            var de = jsPlumb.getElement(el),
                id = _currentInstance.getId(de),
                aid = _draggablesForElements[id];

            if (aid) {
                return jsPlumb.getElement(aid);
            }
            else {
                return null;
            }
        };

    };

    var _setClassName = function (el, cn, classList) {
            cn = _ju.fastTrim(cn);
            if (typeof el.className.baseVal !== "undefined") {
                el.className.baseVal = cn;
            }
            else {
                el.className = cn;
            }

            // recent (i currently have  61.0.3163.100) version of chrome do not update classList when you set the base val
            // of an svg element's className. in the long run we'd like to move to just using classList anyway
            try {
                var cl = el.classList;
                if (cl != null) {
                    while (cl.length > 0) {
                        cl.remove(cl.item(0));
                    }
                    for (var i = 0; i < classList.length; i++) {
                        if (classList[i]) {
                            cl.add(classList[i]);
                        }
                    }
                }
            }
            catch(e) {
                // not fatal
                _ju.log("JSPLUMB: cannot set class list", e);
            }
        },
        _getClassName = function (el) {
            return (typeof el.className.baseVal === "undefined") ? el.className : el.className.baseVal;
        },
        _classManip = function (el, classesToAdd, classesToRemove) {
            classesToAdd = classesToAdd == null ? [] : _ju.isArray(classesToAdd) ? classesToAdd : classesToAdd.split(/\s+/);
            classesToRemove = classesToRemove == null ? [] : _ju.isArray(classesToRemove) ? classesToRemove : classesToRemove.split(/\s+/);

            var className = _getClassName(el),
                curClasses = className.split(/\s+/);

            var _oneSet = function (add, classes) {
                for (var i = 0; i < classes.length; i++) {
                    if (add) {
                        if (curClasses.indexOf(classes[i]) === -1) {
                            curClasses.push(classes[i]);
                        }
                    }
                    else {
                        var idx = curClasses.indexOf(classes[i]);
                        if (idx !== -1) {
                            curClasses.splice(idx, 1);
                        }
                    }
                }
            };

            _oneSet(true, classesToAdd);
            _oneSet(false, classesToRemove);

            _setClassName(el, curClasses.join(" "), curClasses);
        };

    root.jsPlumb.extend(root.jsPlumbInstance.prototype, {

        headless: false,

        pageLocation: _pageLocation,
        screenLocation: _screenLocation,
        clientLocation: _clientLocation,

        getDragManager:function() {
            if (this.dragManager == null) {
                this.dragManager = new DragManager(this);
            }

            return this.dragManager;
        },

        recalculateOffsets:function(elId) {
            this.getDragManager().updateOffsets(elId);
        },

        createElement:function(tag, style, clazz, atts) {
            return this.createElementNS(null, tag, style, clazz, atts);
        },

        createElementNS:function(ns, tag, style, clazz, atts) {
            var e = ns == null ? document.createElement(tag) : document.createElementNS(ns, tag);
            var i;
            style = style || {};
            for (i in style) {
                e.style[i] = style[i];
            }

            if (clazz) {
                e.className = clazz;
            }

            atts = atts || {};
            for (i in atts) {
                e.setAttribute(i, "" + atts[i]);
            }

            return e;
        },

        getAttribute: function (el, attName) {
            return el.getAttribute != null ? el.getAttribute(attName) : null;
        },

        setAttribute: function (el, a, v) {
            if (el.setAttribute != null) {
                el.setAttribute(a, v);
            }
        },

        setAttributes: function (el, atts) {
            for (var i in atts) {
                if (atts.hasOwnProperty(i)) {
                    el.setAttribute(i, atts[i]);
                }
            }
        },
        appendToRoot: function (node) {
            document.body.appendChild(node);
        },
        getRenderModes: function () {
            return [ "svg"  ];
        },
        getClass:_getClassName,
        addClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, clazz);
            });
        },
        hasClass: function (el, clazz) {
            el = jsPlumb.getElement(el);
            if (el.classList) {
                return el.classList.contains(clazz);
            }
            else {
                return _getClassName(el).indexOf(clazz) !== -1;
            }
        },
        removeClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, null, clazz);
            });
        },
        toggleClass:function(el, clazz) {
            if (jsPlumb.hasClass(el, clazz)) {
                jsPlumb.removeClass(el, clazz);
            } else {
                jsPlumb.addClass(el, clazz);
            }
        },
        updateClasses: function (el, toAdd, toRemove) {
            jsPlumb.each(el, function (e) {
                _classManip(e, toAdd, toRemove);
            });
        },
        setClass: function (el, clazz) {
            if (clazz != null) {
                jsPlumb.each(el, function (e) {
                    _setClassName(e, clazz, clazz.split(/\s+/));
                });
            }
        },
        setPosition: function (el, p) {
            el.style.left = p.left + "px";
            el.style.top = p.top + "px";
        },
        getPosition: function (el) {
            var _one = function (prop) {
                var v = el.style[prop];
                return v ? v.substring(0, v.length - 2) : 0;
            };
            return {
                left: _one("left"),
                top: _one("top")
            };
        },
        getStyle:function(el, prop) {
            if (typeof window.getComputedStyle !== 'undefined') {
                return getComputedStyle(el, null).getPropertyValue(prop);
            } else {
                return el.currentStyle[prop];
            }
        },
        getSelector: function (ctx, spec) {
            var sel = null;
            if (arguments.length === 1) {
                sel = ctx.nodeType != null ? ctx : document.querySelectorAll(ctx);
            }
            else {
                sel = ctx.querySelectorAll(spec);
            }

            return sel;
        },
        getOffset:function(el, relativeToRoot, container) {
            el = jsPlumb.getElement(el);
            container = container || this.getContainer();
            var out = {
                    left: el.offsetLeft,
                    top: el.offsetTop
                },
                op = (relativeToRoot  || (container != null && (el !== container && el.offsetParent !== container))) ?  el.offsetParent : null,
                _maybeAdjustScroll = function(offsetParent) {
                    if (offsetParent != null && offsetParent !== document.body && (offsetParent.scrollTop > 0 || offsetParent.scrollLeft > 0)) {
                        out.left -= offsetParent.scrollLeft;
                        out.top -= offsetParent.scrollTop;
                    }
                }.bind(this);

            while (op != null) {
                out.left += op.offsetLeft;
                out.top += op.offsetTop;
                _maybeAdjustScroll(op);
                op = relativeToRoot ? op.offsetParent :
                    op.offsetParent === container ? null : op.offsetParent;
            }

            // if container is scrolled and the element (or its offset parent) is not absolute or fixed, adjust accordingly.
            if (container != null && !relativeToRoot && (container.scrollTop > 0 || container.scrollLeft > 0)) {
                var pp = el.offsetParent != null ? this.getStyle(el.offsetParent, "position") : "static",
                    p = this.getStyle(el, "position");
                if (p !== "absolute" && p !== "fixed" && pp !== "absolute" && pp !== "fixed") {
                    out.left -= container.scrollLeft;
                    out.top -= container.scrollTop;
                }
            }
            return out;
        },
        //
        // return x+y proportion of the given element's size corresponding to the location of the given event.
        //
        getPositionOnElement: function (evt, el, zoom) {
            var box = typeof el.getBoundingClientRect !== "undefined" ? el.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 },
                body = document.body,
                docElem = document.documentElement,
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                pst = 0,
                psl = 0,
                top = box.top + scrollTop - clientTop + (pst * zoom),
                left = box.left + scrollLeft - clientLeft + (psl * zoom),
                cl = jsPlumb.pageLocation(evt),
                w = box.width || (el.offsetWidth * zoom),
                h = box.height || (el.offsetHeight * zoom),
                x = (cl[0] - left) / w,
                y = (cl[1] - top) / h;

            return [ x, y ];
        },

        /**
         * Gets the absolute position of some element as read from the left/top properties in its style.
         * @method getAbsolutePosition
         * @param {Element} el The element to retrieve the absolute coordinates from. **Note** this is a DOM element, not a selector from the underlying library.
         * @return {Number[]} [left, top] pixel values.
         */
        getAbsolutePosition: function (el) {
            var _one = function (s) {
                var ss = el.style[s];
                if (ss) {
                    return parseFloat(ss.substring(0, ss.length - 2));
                }
            };
            return [ _one("left"), _one("top") ];
        },

        /**
         * Sets the absolute position of some element by setting the left/top properties in its style.
         * @method setAbsolutePosition
         * @param {Element} el The element to set the absolute coordinates on. **Note** this is a DOM element, not a selector from the underlying library.
         * @param {Number[]} xy x and y coordinates
         * @param {Number[]} [animateFrom] Optional previous xy to animate from.
         * @param {Object} [animateOptions] Options for the animation.
         */
        setAbsolutePosition: function (el, xy, animateFrom, animateOptions) {
            if (animateFrom) {
                this.animate(el, {
                    left: "+=" + (xy[0] - animateFrom[0]),
                    top: "+=" + (xy[1] - animateFrom[1])
                }, animateOptions);
            }
            else {
                el.style.left = xy[0] + "px";
                el.style.top = xy[1] + "px";
            }
        },
        /**
         * gets the size for the element, in an array : [ width, height ].
         */
        getSize: function (el) {
            return [ el.offsetWidth, el.offsetHeight ];
        },
        getWidth: function (el) {
            return el.offsetWidth;
        },
        getHeight: function (el) {
            return el.offsetHeight;
        },
        getRenderMode : function() { return "svg"; },
        draggable : function (el, options) {
            var info;
            el = _ju.isArray(el) || (el.length != null && !_ju.isString(el)) ? el: [ el ];
            Array.prototype.slice.call(el).forEach(function(_el) {
                info = this.info(_el);
                if (info.el) {
                    this._initDraggableIfNecessary(info.el, true, options, info.id, true);
                }
            }.bind(this));
            return this;
        },
        snapToGrid : function(el, x, y) {
            var out = [];
            var _oneEl = function(_el) {
                var info = this.info(_el);
                if (info.el != null && info.el._katavorioDrag) {
                    var snapped = info.el._katavorioDrag.snap(x, y);
                    this.revalidate(info.el);
                    out.push([info.el, snapped]);
                }
            }.bind(this);

            // if you call this method with 0 arguments or 2 arguments it is assumed you want to snap all managed elements to
            // a grid. if you supply one argument or 3, then you are assumed to be specifying one element.
            if(arguments.length === 1 || arguments.length === 3) {
                _oneEl(el, x, y);
            } else {
                var _me = this.getManagedElements();
                for (var mel in _me) {
                    _oneEl(mel, arguments[0], arguments[1]);
                }
            }

            return out;
        },
        initDraggable: function (el, options, category) {
            _getDragManager(this, category).draggable(el, options);
            el._jsPlumbDragOptions = options;
        },
        destroyDraggable: function (el, category) {
            _getDragManager(this, category).destroyDraggable(el);
            el._jsPlumbDragOptions = null;
            el._jsPlumbRelatedElement = null;
        },
        unbindDraggable: function (el, evt, fn, category) {
            _getDragManager(this, category).destroyDraggable(el, evt, fn);
        },
        setDraggable : function (element, draggable) {
            return jsPlumb.each(element, function (el) {
                if (this.isDragSupported(el)) {
                    this._draggableStates[this.getAttribute(el, "id")] = draggable;
                    this.setElementDraggable(el, draggable);
                }
            }.bind(this));
        },
        _draggableStates : {},
        /*
         * toggles the draggable state of the given element(s).
         * el is either an id, or an element object, or a list of ids/element objects.
         */
        toggleDraggable : function (el) {
            var state;
            jsPlumb.each(el, function (el) {
                var elId = this.getAttribute(el, "id");
                state = this._draggableStates[elId] == null ? false : this._draggableStates[elId];
                state = !state;
                this._draggableStates[elId] = state;
                this.setDraggable(el, state);
                return state;
            }.bind(this));
            return state;
        },
        _initDraggableIfNecessary : function (element, isDraggable, dragOptions, id, fireEvent) {
            // TODO FIRST: move to DragManager. including as much of the decision to init dragging as possible.
            if (!jsPlumb.headless) {
                var _draggable = isDraggable == null ? false : isDraggable;
                if (_draggable) {
                    if (jsPlumb.isDragSupported(element, this)) {
                        var options = dragOptions || this.Defaults.DragOptions;
                        options = jsPlumb.extend({}, options); // make a copy.
                        if (!jsPlumb.isAlreadyDraggable(element, this)) {
                            var dragEvent = jsPlumb.dragEvents.drag,
                                stopEvent = jsPlumb.dragEvents.stop,
                                startEvent = jsPlumb.dragEvents.start;

                            this.manage(id, element);

                            options[startEvent] = _ju.wrap(options[startEvent], _dragStart.bind(this));

                            options[dragEvent] = _ju.wrap(options[dragEvent], _dragMove.bind(this));

                            options[stopEvent] = _ju.wrap(options[stopEvent], _dragStop.bind(this));

                            var elId = this.getId(element); // need ID

                            this._draggableStates[elId] = true;
                            var draggable = this._draggableStates[elId];

                            options.disabled = draggable == null ? false : !draggable;
                            this.initDraggable(element, options);
                            this.getDragManager().register(element);
                            if (fireEvent) {
                                this.fire("elementDraggable", {el:element, options:options});
                            }
                        }
                        else {
                            // already draggable. attach any start, drag or stop listeners to the current Drag.
                            if (dragOptions.force) {
                                this.initDraggable(element, options);
                            }
                        }
                    }
                }
            }
        },
        animationSupported:true,
        getElement: function (el) {

            if (el == null) {
                return null;
            }
            // here we pluck the first entry if el was a list of entries.
            // this is not my favourite thing to do, but previous versions of
            // jsplumb supported jquery selectors, and it is possible a selector
            // will be passed in here.
            el = typeof el === "string" ? el : (el.tagName == null && el.length != null && el.enctype == null) ? el[0] : el;
            return typeof el === "string" ? document.getElementById(el) : el;
        },
        removeElement: function (element) {
            _getDragManager(this).elementRemoved(element);
            this.getEventManager().remove(element);
        },
        //
        // this adapter supports a rudimentary animation function. no easing is supported.  only
        // left/top properties are supported. property delta args are expected to be in the form
        //
        // +=x.xxxx
        //
        // or
        //
        // -=x.xxxx
        //
        doAnimate: function (el, properties, options) {
            options = options || {};
            var o = this.getOffset(el),
                ap = _animProps(o, properties),
                ldist = ap[0] - o.left,
                tdist = ap[1] - o.top,
                d = options.duration || 250,
                step = 15, steps = d / step,
                linc = (step / d) * ldist,
                tinc = (step / d) * tdist,
                idx = 0,
                _int = setInterval(function () {
                    _jp.setPosition(el, {
                        left: o.left + (linc * (idx + 1)),
                        top: o.top + (tinc * (idx + 1))
                    });
                    if (options.step != null) {
                        options.step(idx, Math.ceil(steps));
                    }
                    idx++;
                    if (idx >= steps) {
                        window.clearInterval(_int);
                        if (options.complete != null) {
                            options.complete();
                        }
                    }
                }, step);
        },
        // DRAG/DROP


        destroyDroppable: function (el, category) {
            _getDragManager(this, category).destroyDroppable(el);
        },
        unbindDroppable: function (el, evt, fn, category) {
            _getDragManager(this, category).destroyDroppable(el, evt, fn);
        },

        droppable :function(el, options) {
            el = _ju.isArray(el) || (el.length != null && !_ju.isString(el)) ? el: [ el ];
            var info;
            options = options || {};
            options.allowLoopback = false;
            Array.prototype.slice.call(el).forEach(function(_el) {
                info = this.info(_el);
                if (info.el) {
                    this.initDroppable(info.el, options);
                }
            }.bind(this));
            return this;
        },

        initDroppable: function (el, options, category) {
            _getDragManager(this, category).droppable(el, options);
        },
        isAlreadyDraggable: function (el) {
            return el._katavorioDrag != null;
        },
        isDragSupported: function (el, options) {
            return true;
        },
        isDropSupported: function (el, options) {
            return true;
        },
        isElementDraggable: function (el) {
            el = _jp.getElement(el);
            return el._katavorioDrag && el._katavorioDrag.isEnabled();
        },
        getDragObject: function (eventArgs) {
            return eventArgs[0].drag.getDragElement();
        },
        getDragScope: function (el) {
            return el._katavorioDrag && el._katavorioDrag.scopes.join(" ") || "";
        },
        getDropEvent: function (args) {
            return args[0].e;
        },
        getUIPosition: function (eventArgs, zoom) {
            // here the position reported to us by Katavorio is relative to the element's offsetParent. For top
            // level nodes that is fine, but if we have a nested draggable then its offsetParent is actually
            // not going to be the jsplumb container; it's going to be some child of that element. In that case
            // we want to adjust the UI position to account for the offsetParent's position relative to the Container
            // origin.
            var el = eventArgs[0].el;
            if (el.offsetParent == null) {
                return null;
            }
            var finalPos = eventArgs[0].finalPos || eventArgs[0].pos;
            var p = { left:finalPos[0], top:finalPos[1] };
            if (el._katavorioDrag && el.offsetParent !== this.getContainer()) {
                var oc = this.getOffset(el.offsetParent);
                p.left += oc.left;
                p.top += oc.top;
            }
            return p;
        },
        setDragFilter: function (el, filter, _exclude) {
            if (el._katavorioDrag) {
                el._katavorioDrag.setFilter(filter, _exclude);
            }
        },
        setElementDraggable: function (el, draggable) {
            el = _jp.getElement(el);
            if (el._katavorioDrag) {
                el._katavorioDrag.setEnabled(draggable);
            }
        },
        setDragScope: function (el, scope) {
            if (el._katavorioDrag) {
                el._katavorioDrag.k.setDragScope(el, scope);
            }
        },
        setDropScope:function(el, scope) {
            if (el._katavorioDrop && el._katavorioDrop.length > 0) {
                el._katavorioDrop[0].k.setDropScope(el, scope);
            }
        },
        addToPosse:function(el, spec) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            _jp.each(el, function(_el) {
                _el = [ _jp.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.addToPosse.apply(dm, _el);
            });
        },
        setPosse:function(el, spec) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            _jp.each(el, function(_el) {
                _el = [ _jp.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.setPosse.apply(dm, _el);
            });
        },
        removeFromPosse:function(el, posseId) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            _jp.each(el, function(_el) {
                _el = [ _jp.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.removeFromPosse.apply(dm, _el);
            });
        },
        removeFromAllPosses:function(el) {
            var dm = _getDragManager(this);
            _jp.each(el, function(_el) { dm.removeFromAllPosses(_jp.getElement(_el)); });
        },
        setPosseState:function(el, posseId, state) {
            var dm = _getDragManager(this);
            _jp.each(el, function(_el) { dm.setPosseState(_jp.getElement(_el), posseId, state); });
        },
        dragEvents: {
            'start': 'start', 'stop': 'stop', 'drag': 'drag', 'step': 'step',
            'over': 'over', 'out': 'out', 'drop': 'drop', 'complete': 'complete',
            'beforeStart':'beforeStart'
        },
        animEvents: {
            'step': "step", 'complete': 'complete'
        },
        stopDrag: function (el) {
            if (el._katavorioDrag) {
                el._katavorioDrag.abort();
            }
        },
        addToDragSelection: function (spec) {
            var el = this.getElement(spec);
            if (el != null && (el._isJsPlumbGroup || el._jsPlumbGroup == null)) {
                _getDragManager(this).select(spec);
            }
        },
        removeFromDragSelection: function (spec) {
            _getDragManager(this).deselect(spec);
        },
        getDragSelection:function() {
            return _getDragManager(this).getSelection();
        },
        clearDragSelection: function () {
            _getDragManager(this).deselectAll();
        },
        trigger: function (el, event, originalEvent, payload) {
            this.getEventManager().trigger(el, event, originalEvent, payload);
        },
        doReset:function() {
            // look for katavorio instances and reset each one if found.
            for (var key in this) {
                if (key.indexOf("_katavorio_") === 0) {
                    this[key].reset();
                }
            }
        },
        getEventManager:function() {
            return _getEventManager(this);
        },
        on : function(el, event, callback) {
            // TODO: here we would like to map the tap event if we know its
            // an internal bind to a click. we have to know its internal because only
            // then can we be sure that the UP event wont be consumed (tap is a synthesized
            // event from a mousedown followed by a mouseup).
            //event = { "click":"tap", "dblclick":"dbltap"}[event] || event;
            this.getEventManager().on.apply(this, arguments);
            return this;
        },
        off : function(el, event, callback) {
            this.getEventManager().off.apply(this, arguments);
            return this;
        }

    });

    var ready = function (f) {
        var _do = function () {
            if (/complete|loaded|interactive/.test(document.readyState) && typeof(document.body) !== "undefined" && document.body != null) {
                f();
            }
            else {
                setTimeout(_do, 9);
            }
        };

        _do();
    };
    ready(_jp.init);

}).call(typeof window !== 'undefined' ? window : commonjsGlobal);
}(jsplumb));

var jquery = {exports: {}};

/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */

(function (module) {
( function( global, factory ) {

	{

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : commonjsGlobal, function( window, noGlobal ) {

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
}(jquery));

var $ = jquery.exports;

var getUeData = data => {
  let { sequenceNodes, connections } = data;
  let entities = [];

  // 获取所有节点
  sequenceNodes.forEach(node => {
    let { blockId, indexCode, animationCode, nodeType } = node;
    entities.push({
      logicNode: blockId,
      currentLogicNode: {
        indexCode,
        animationCode,
        nodeType,
      },
      preLogicNode: [],
      nextLogicNode: [],
    });
  });

  // 处理关系
  connections.forEach(item => {
    let { uuids } = item;
    let [from, to] = uuids;
    let fId = from.split('-')[0];
    let tId = to.split('-')[0];
    entities.forEach(e => {
      let { logicNode } = e;
      if (fId == logicNode) {
        e.nextLogicNode = [...new Set([...e.nextLogicNode, tId])];
      }
      if (tId == logicNode) {
        e.preLogicNode = [...new Set([...e.preLogicNode, fId])];
      }
    });
  });

  return { entities }
};

var index_vue_vue_type_style_index_0_lang = /* #__PURE__ */ (() => "@charset \"UTF-8\";.window:hover{cursor:pointer}.task{width:.895833rem;height:.25rem;background:rgba(255,255,255,.15);border:1px solid #346789;border-radius:.5em;color:#000;position:absolute;text-align:center;line-height:.25rem;color:#fff}.start-node{width:.895833rem;height:.166667rem;background:#428FFF;border-radius:.020833rem;position:absolute;text-align:center;color:#fff}.end-node{width:.895833rem;height:.166667rem;border:1px solid #428fff;border-radius:.020833rem;position:absolute;text-align:center;color:#428fff}.point{background-color:#007400;border:5px solid #AAAAAA;border-radius:.15625rem;-webkit-box-shadow:.010417rem .010417rem .026042rem #AAAAAA;box-shadow:.010417rem .010417rem .026042rem #aaa;color:#fff;min-width:.130208rem;line-height:.130208rem;font-size:10pt;padding:.052083rem;position:absolute;text-align:center}.point:hover{-webkit-box-shadow:.010417rem .010417rem .098958rem #AAAAAA;box-shadow:.010417rem .010417rem .098958rem #aaa}.decision{background-color:#eeeeef;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);border:1px solid #346789;border-radius:.3em;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-box-shadow:0 0 0 .005208rem #CCCCCC;box-shadow:0 0 0 .005208rem #ccc;color:#000;display:block;height:.416667rem;position:relative;position:absolute;text-decoration:none;width:.416667rem}.decision .ctrl-container{padding:0 .052083rem;-webkit-transform:rotate(45deg);transform:rotate(45deg);text-align:center;vertical-align:middle;width:.3125rem;position:absolute;right:-.416667rem;bottom:.130208rem}.button{text-align:center;border:1px solid;margin:.026042rem}.button:hover{cursor:pointer}.menu-button{padding:.026042rem}.menu-button:hover{background-color:#aaa;color:#000}.button_add{background-color:#0c0;float:left;border-radius:50%;-webkit-box-shadow:0 .015625rem .041667rem #aaa,inset 0 .010417rem .015625rem #fff;box-shadow:0 .015625rem .041667rem #aaa,inset 0 .010417rem .015625rem #fff;padding:.010417rem;height:.130208rem;width:.130208rem;color:gray}.button_add:hover{background-color:#0a0;color:#000}.button-remove{border-radius:20%;width:.078125rem;height:.104167rem;text-align:center;position:absolute;right:-.104167rem;top:-.104167rem;padding:.026042rem;background-color:#000;line-height:.104167rem;display:none}.button-edit{border-radius:20%;-webkit-box-shadow:0 .015625rem .041667rem #aaa,inset 0 .010417rem .015625rem #fff;box-shadow:0 .015625rem .041667rem #aaa,inset 0 .010417rem .015625rem #fff;padding:.026042rem;margin-right:.026042rem;width:.052083rem;height:.052083rem;background-image:url(../images/edit.png);background-size:.104167rem;float:right}.button-edit:hover{background-color:#4d92b9;color:#fff}.task .button-remove{float:right}.decision .button-remove{margin:auto;float:right}.button-remove:hover{background-color:#8b0000;color:#fff}.ctrl-container:hover div.button-remove{display:block}.menu-button-container{margin:.026042rem}.ctrl-container{width:97%;height:100%;text-align:center;line-height:.166667rem;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.task .ctrl-container{line-height:.25rem}.detail-label{font-size:9pt;color:gray}.detail-text{width:.416667rem;font-size:10pt}._jsPlumb_connector,._jsPlumb_startpoint{cursor:pointer}.djs-direct-editing-content{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;outline:none;word-wrap:break-word;font-family:Arial,sans-serif;font-size:.0625rem;font-weight:400;position:absolute}.select-class{background:#373b48}.select-class .el-select-dropdown__item.selected{color:#428fff}.select-class .el-scrollbar .el-select-dropdown__list,.select-class .el-scrollbar .el-select-dropdown__list .el-select-dropdown__item{color:#fff!important}.select-class .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{background:rgba(66,143,255,.3);color:#428fff}.time-series__dialog{background:rgb(24,26,33)}.time-series__dialog .el-dialog__header .el-dialog__title{color:#fff}.time-series__dialog .el-input{border:1px solid rgba(255,255,255,.14)}\n")();

var index_vue_vue_type_style_index_1_scoped_true_lang = /* #__PURE__ */ (() => ".box-card[data-v-c8947500]{background:transparent;color:#fff;border:none}.box-card[data-v-c8947500] .el-card__header{border:none}.box-card[data-v-c8947500] .el-card__body{padding-bottom:0}.box-card[data-v-c8947500] .el-form-item{margin-bottom:.041667rem}.box-card[data-v-c8947500] .el-form-item__label{font-size:.0625rem;color:#fff9;white-space:nowrap}.box-card[data-v-c8947500] .el-input,.box-card[data-v-c8947500] .el-textarea{border:1px solid rgba(255,255,255,.14)}.box-card[data-v-c8947500] .el-input__inner,.box-card[data-v-c8947500] .el-textarea__inner{color:#fff;border:none;-webkit-box-shadow:none;box-shadow:none;background:transparent}.el-input[data-v-c8947500]{border:1px solid rgba(255,255,255,.14)}ul li[data-v-c8947500]{list-style:none}.time-series[data-v-c8947500]{position:relative;height:100%;background:#000;display:-webkit-box;display:-ms-flexbox;display:flex}.time-series .box-card[data-v-c8947500]{width:2.083333rem}.time-series .box-card .el-select[data-v-c8947500]{width:100%;height:.145833rem}.time-series .box-card .process-directive-box[data-v-c8947500]{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.time-series .box-card .process-directive-box span[data-v-c8947500]{display:inline-block;width:.895833rem;height:.166667rem;line-height:.166667rem;text-align:center;border-radius:.020833rem}.time-series .box-card .process-directive-box span.process-start[data-v-c8947500]{color:#fff;background:#428fff}.time-series .box-card .process-directive-box span.process-end[data-v-c8947500]{color:#428fff;border:1px solid #428fff}.time-series .box-card .process-li[data-v-c8947500]{width:100%;margin-top:.104167rem;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.time-series .box-card .process-li span[data-v-c8947500]{display:inline-block;width:.895833rem;height:.25rem;line-height:.25rem;text-align:center;border-radius:.020833rem;background:#2a2e39;color:#fff;margin-top:.104167rem}.time-series #canvas[data-v-c8947500]{-webkit-box-flex:1;-ms-flex:1;flex:1;background:#181a21}.time-series .buttons[data-v-c8947500]{position:absolute;top:.104167rem;right:.104167rem;z-index:10;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.time-series .buttons .el-button[data-v-c8947500]{position:relative;font-size:.0625rem;color:#fff9;border:none;background-color:#373b48;border-radius:.083333rem}.time-series .buttons .el-button .icon[data-v-c8947500]{margin-right:.020833rem}\n")();

let canvasId = '#canvas';
let dataTransfer;

const _sfc_main = {
  emits: ['save'],
  setup(props, { emit }) {
    const router = useRouter();
    // eslint-disable-next-line no-unused-vars
    useRoute();
    const store = useStore();

    let state = reactive({
      dialogVisible: false,
      sequenceName: '',
      taskBtns: [
        {
          id: 1,
          type: 'start',
          nodeName: '开始',
        },
        {
          id: 2,
          type: 'end',
          nodeName: '结束',
        },
      ],
      model: {},
      jsPlumb: null,
      options: {
        MaxConnections: -1,
        Endpoint: ['Dot', { radius: 10 }],
        EndpointStyle: {
          width: 10,
          height: 10,
          borderRadius: 5,
          fill: 'rgba(255, 255, 255, 0.1)',
        }, // 链接填充色
        EndpointHoverStyle: {
          width: 10,
          height: 10,
          borderRadius: 5,
          fill: 'rgba(255, 255, 255, 0.1)',
        },
        PaintStyle: {
          stroke: 'rgba(255, 255, 255, 0.3)',
          strokeWidth: 1,
        },
        HoverPaintStyle: {
          stroke: '#428FFF',
          strokeWidth: 1,
        }, //鼠标移入颜色
        Connector: [
          'Flowchart',
          {
            gap: 0,
            cornerRadius: 5,
            alwaysRespectStubs: true,
            // midpoint: 0,
            // stub: 2,
            // cornerRadius: 2
          },
        ],
        ConnectionOverlays: [
          [
            'Arrow',
            {
              location: 1,
              id: 'arrow',
              length: 6,
              width: 14,
              foldback: 1,
            },
          ],
        ],
      },
    });
    let canvas = ref();
    const animations = computed(() =>
      store.state.draftsAn.animations.filter(item => item.animations.length)
    );
    const sequences = computed(() => store.state.draftsAn.sequences);
    const sequence = computed({
      get() {
        return store.state.draftsAn.sequence
      },
      set(data) {
        store.commit('draftsAn/setSequence', data);
      },
    });

    onActivated(() => {
      // proxy.initCanvas()
      UE.publish('JS2UE_SetGlobalState', { currentState: 'SequenceEditor' });
    });
    onMounted(() => {
      state.jsPlumb = jsplumb.jsPlumb.getInstance();
      methods.initNode();
    });
    onUnmounted(() => {
      state.jsPlumb.empty('canvas');
    });

    const methods = {
      // initCanvas() {
      //   state.jsPlumb.importDefaults()
      // },
      // 选择时序
      sequenceChange({ sequenceCode }) {
        if (sequenceCode === 'new') {
          return (state.dialogVisible = true)
        }
        state.jsPlumb.empty('canvas');
        methods.loadTimeSeries();
        // blockId, positionX, positionY, nodeType, nodeName, animationCode,
      },
      loadTimeSeries() {
        let { sequenceNodes, connections } = sequence.value;
        sequenceNodes.forEach(item => {
          methods.addNode(item);
          // methods.addEndpoint({ blockId, item.nodeType })
          state.jsPlumb.repaint(item.blockId);
        });
        connections.forEach(item => {
          state.jsPlumb.connect({
            uuids: item.uuids,
          });
        });
      },
      // 取消新建时序
      cancelSequence() {
        // TODO 有问题
        // state.sequence.value = {}
        state.sequenceName = '';
        state.dialogVisible = false;
      },
      // 新建时序
      addSequence() {
        if (!state.sequenceName) return ElMessage.error('请输入时序名称')
        let data = {
          sequenceCode: nanoid(),
          sequenceName: state.sequenceName,
          sequenceNodes: [],
          connections: [],
        };
        store.commit('draftsAn/addSequence', data);
        state.jsPlumb.empty('canvas');
        state.sequenceName = '';
        state.dialogVisible = false;
      },
      onMousedown(e) {
        dataTransfer = e.target.dataset;
      },
      onMouseup(e) {
        if (!dataTransfer) return

        let { id, type, name } = dataTransfer;

        // eslint-disable-next-line no-unused-vars
        const { originalEvent, clientX, clientY } = e;
        // 减去一半元素大小及导航，保证居中
        const positionX = clientX;
        const positionY = clientY - 60;

        // if (!originalEvent.dataTransfer) return // 连线时会触发 drop 事件，值为 undfined
        // const { id, type, name } = JSON.parse(
        //   originalEvent.dataTransfer.getData('data')
        // )

        // 开始结束只有一个
        if (type !== 'process') {
          let data = methods.flowchartData();
          let { sequenceNodes } = data;
          let hasType = sequenceNodes.some(item => item.nodeType == type);
          if (hasType) {
            dataTransfer = null;
            return
          }
        }

        let obj = {
          blockId: `node_${nanoid().replace(/-/g, '')}`,
          positionX,
          positionY,
          nodeType: type,
          nodeName: name,
        };
        if (type == 'process') {
          obj = {
            ...obj,
            animationCode: id,
            indexCode: state.model.indexCode,
          };
        }
        methods.addNode(obj);

        dataTransfer = null;
      },
      initNode() {
        state.jsPlumb.ready(() => {
          state.jsPlumb.importDefaults(state.options);
          state.jsPlumb.setSuspendDrawing(false, true);
          $(canvasId).on('click', '.button-remove', function() {
            const parentnode = $(this)[0].parentNode.parentNode;
            state.jsPlumb.deleteConnectionsForElement(parentnode);
            state.jsPlumb.removeAllEndpoints(parentnode);
            $(parentnode).remove();
          });

          state.jsPlumb.bind(
            'beforeDrop',
            ({ sourceId, targetId }, originalEvent) => {
              // console.log(sourceId, 'originalEvent')
              // console.log(targetId, 'originalEvent')
              // console.log(originalEvent, 'originalEvent')
              if (sourceId == targetId) {
                return false
              }
              return true
            }
          );
        });
      },
      addNode({
        blockId,
        positionX,
        positionY,
        nodeType,
        nodeName,
        animationCode,
        indexCode,
      }) {
        let taskNode = `
              <div class="window ${nodeType}-node node node-process" id="${blockId}" data-indexCode='' data-animationCode='' data-nodeType=${nodeType} style="left: ${positionX}px; top: ${positionY}px;">
                  <div class="ctrl-container">
                      <div class="button-remove">X</div>
                      <div id="edit_${blockId}" style="display: none;" class="button-edit"/>
                  </div>
                <div class="djs-direct-editing-content details-container" contenteditable="true" @click="editDiv(event)">
                    ${nodeName}
                  </div>
              </div>`;
        let decisionNode = `
                <div class="window task node node-process" id="${blockId}" data-indexCode=${indexCode} data-animationCode=${animationCode} data-nodeType=${nodeType} style="left: ${positionX}px; top: ${positionY}px;">
                    <div class="ctrl-container">
                        <div class="button-remove">X</div>
                        <div id="edit_${blockId}" style="display: none;" class="button-edit"/>
                    </div>
                  <div class="djs-direct-editing-content details-container" contenteditable="true" @click="editDiv(event)">
                      ${nodeName}
                    </div>
                </div>`;

        if (nodeType == 'start' || nodeType == 'end') {
          $(taskNode).appendTo(canvasId);
        }
        if (nodeType == 'process') {
          $(decisionNode).appendTo(canvasId);
        }
        methods.addEndpoint({ blockId, nodeType });
        state.jsPlumb.draggable(blockId);
      },
      addEndpoint({ blockId, nodeType }) {
        // TODO 开始结束未限制
        state.jsPlumb.addEndpoint(blockId, {
          uuid: blockId + '-tm-in',
          isTarget: true,
          anchor: 'TopCenter',
          endpoint: ['Rectangle', { width: 12, height: 12 }],
          maxConnections: -1,
        });
        state.jsPlumb.addEndpoint(blockId, {
          uuid: blockId + '-bm-out',
          isSource: true,
          anchor: 'BottomCenter',
          endpoint: ['Dot', { radius: 8 }],
          maxConnections: -1,
        });
      },

      // 获取数据
      flowchartData() {
        let sequenceNodes = [],
          connections = [];
        $('.node').each((index, el) => {
          let $el = $(el);
          // $el.animationCode = ''
          // 获取当前节点名称
          let divContainer = $el.find('.details-container')[0];
          let nodeName;
          if (divContainer) {
            nodeName = divContainer.innerText;
          }
          sequenceNodes.push({
            blockId: $el.attr('id'),
            nodeType: $el.attr('data-nodeType'),
            nodeName: nodeName,
            positionX: parseInt($el.css('left'), 10),
            positionY: parseInt($el.css('top'), 10),
            indexCode: $el.attr('data-indexCode'),
            animationCode: $el.attr('data-animationCode'),
          });
        });
        $.each(state.jsPlumb.getConnections(), (idx, connection) => {
          connections.push({
            uuids: connection.getUuids(),
          });
        });
        // let connectionsData = state.jsPlumb.getAllConnections()
        // flowChart.projectName = $("#project_name").val()
        // flowChart.unitName = $("#unit_name").val()
        // const flowChartJson = JSON.stringify(flowChart)
        // console.log(
        //   {
        //     sequenceNodes,
        //     connections,
        //   },
        //   '获取数据'
        // )
        return {
          sequenceNodes,
          connections,
        }
      },
      editDiv(event) {
        $(event.currentTarget).focus();
      },
      leaveCanvas() {
        if (!Object.keys(sequence.value).length) return
        methods.saveTimeSeries();
      },
      saveTimeSeries() {
        let data = methods.flowchartData();
        let { sequenceNodes, connections } = data;
        let obj = {
          // ...sequence.value,
          sequenceNodes,
          connections,
        };
        store.commit('draftsAn/setSequence', obj);
        let { entities } = getUeData(data);

        console.log(sequences.value, 'saveTimeSeries-sequences');
        console.log(data, 'saveTimeSeries-data');
        console.log(entities, 'saveTimeSeries-entities');

        // logicNode:当前节点的唯一ID
        // 1.preLogic对应上一条逻辑节点,可以有多个节点
        // 2.currentLogicNode:当前逻辑节点,包含indexCode和对应的动画唯一ID,节点类型等
        // 3.nextLogicNode:下一条要执行的逻辑节点,可以有多个
      },
      // 预览播放
      goToPreview() {
        if (!Object.keys(sequence.value).length) {
          return ElMessage.error('请选择时序')
        }

        let data = methods.flowchartData();
        let { sequenceNodes, connections } = data;
        let obj = {
          // ...sequence.value,
          sequenceNodes,
          connections,
        };
        store.commit('draftsAn/setSequence', obj);
        let { entities } = getUeData(data);

        console.log(sequences.value, 'pgoToPreview-sequences');
        console.log(data, 'pgoToPreview-data');
        console.log(entities, 'pgoToPreview-entities');

        let { sequenceCode: sceneSequenceId } = sequence.value;

        UE.publish('JS2UE_SaveSceneSequence', {
          sceneSequenceId,
          entities,
        });

        router.push({
          name: 'DraftsEditPreview',
          query: {
            sceneSequenceId,
          },
        });
      },
      // 清除
      clearCanvas() {
        if (!Object.keys(sequence.value).length) {
          return ElMessage.error('请选择时序')
        }
        state.jsPlumb.empty('canvas');
      },
      // 保存时序
      saveTimeSeriesData() {
        // if (!Object.keys(sequence.value).length) {
        //   return ElMessage.error('请选择时序')
        // }
        methods.saveTimeSeries();
        emit('save');
      },
      // 删除时序
      async deleteCaseSequences() {
        if (!Object.keys(sequence.value).length) {
          return ElMessage.error('请选择时序')
        }

        state.jsPlumb.empty('canvas');
        let { sequenceCode: sceneSequenceId } = sequence.value;

        UE.publish('JS2UE_DeleteSceneSequence', {
          sceneSequenceId,
        });

        store.commit('draftsAn/delSequence');

        ElMessage.success('已删除时序');
      },
    };
    return {
      ...toRefs(state),
      canvas,
      animations,
      sequences,
      sequence,
      ...methods,
    }
  },
};

const _withScopeId = n => (pushScopeId("data-v-c8947500"),n=n(),popScopeId(),n);
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("div", { class: "card-header" }, [
  /*#__PURE__*/createBaseVNode("span", null, "时序编辑器")
], -1));
const _hoisted_2 = { class: "process-directive-box" };
const _hoisted_3 = ["data-id", "data-type", "data-name"];
const _hoisted_4 = { class: "process-li" };
const _hoisted_5 = ["data-id", "data-name"];
const _hoisted_6 = { class: "buttons" };
const _hoisted_7 = /*#__PURE__*/createTextVNode(" 预览播放 ");
const _hoisted_8 = /*#__PURE__*/createTextVNode(" 清除所有 ");
const _hoisted_9 = /*#__PURE__*/createTextVNode(" 保存时序 ");
const _hoisted_10 = /*#__PURE__*/createTextVNode(" 删除时序 ");
const _hoisted_11 = /*#__PURE__*/createTextVNode(" 取消 ");
const _hoisted_12 = /*#__PURE__*/createTextVNode("确认");

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");
  const _component_el_button = resolveComponent("el-button");
  const _component_svg_icon = resolveComponent("svg-icon");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", {
      class: "time-series",
      onMouseleave: _cache[5] || (_cache[5] = withModifiers((...args) => (_ctx.leaveCanvas && _ctx.leaveCanvas(...args)), ["stop","prevent"]))
    }, [
      createVNode(_component_el_card, { class: "box-card" }, {
        header: withCtx(() => [
          _hoisted_1
        ]),
        default: withCtx(() => [
          createVNode(_component_el_form, {
            ref: "formRef",
            "label-width": "76px",
            "label-position": "top"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, { label: "场景时序" }, {
                default: withCtx(() => [
                  createVNode(_component_el_select, {
                    class: "time-select",
                    "popper-class": "select-class time-select",
                    placeholder: "请选择",
                    modelValue: $setup.sequence,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.sequence) = $event)),
                    "value-key": "sequenceCode",
                    onChange: _ctx.sequenceChange
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.sequences, (item, index) => {
                        return (openBlock(), createBlock(_component_el_option, {
                          key: index,
                          label: item.sequenceName,
                          value: item
                        }, null, 8, ["label", "value"]))
                      }), 128)),
                      createVNode(_component_el_option, {
                        label: "+ 新建",
                        value: { sequenceCode: 'new' }
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onChange"])
                ]),
                _: 1
              }),
              (Object.keys($setup.sequence).length && $setup.sequence.sequenceCode != 'new')
                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(_component_el_form_item, { label: "流程指令" }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_2, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.taskBtns, (item) => {
                            return (openBlock(), createElementBlock("span", {
                              class: normalizeClass(`ele-draggable process-${item.type}`),
                              draggable: false,
                              key: item.id,
                              "data-id": item.id,
                              "data-type": item.type,
                              "data-name": item.nodeName,
                              onMousedown: _cache[1] || (_cache[1] = (...args) => (_ctx.onMousedown && _ctx.onMousedown(...args)))
                            }, toDisplayString(item.nodeName), 43, _hoisted_3))
                          }), 128))
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "模型任务清单" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          class: "time-select",
                          "popper-class": "select-class",
                          placeholder: "请选择",
                          modelValue: _ctx.model,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.model) = $event)),
                          "value-key": "indexCode"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.animations, (item) => {
                              return (openBlock(), createBlock(_component_el_option, {
                                key: item.indexCode,
                                label: item.viewName,
                                value: item
                              }, null, 8, ["label", "value"]))
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        createBaseVNode("div", _hoisted_4, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model.animations, (item) => {
                            return (openBlock(), createElementBlock("span", {
                              class: "ele-draggable",
                              draggable: false,
                              key: item.animationCode,
                              "data-id": item.animationCode,
                              "data-type": "process",
                              "data-name": item.animationName,
                              onMousedown: _cache[3] || (_cache[3] = (...args) => (_ctx.onMousedown && _ctx.onMousedown(...args)))
                            }, toDisplayString(item.animationName), 41, _hoisted_5))
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ], 64))
                : createCommentVNode("", true)
            ]),
            _: 1
          }, 512)
        ]),
        _: 1
      }),
      createBaseVNode("div", {
        id: "canvas",
        ref: "canvas",
        onMouseup: _cache[4] || (_cache[4] = (...args) => (_ctx.onMouseup && _ctx.onMouseup(...args)))
      }, null, 544),
      createBaseVNode("div", _hoisted_6, [
        createVNode(_component_el_button, { onClick: _ctx.goToPreview }, {
          default: withCtx(() => [
            _hoisted_7
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, { onClick: _ctx.clearCanvas }, {
          default: withCtx(() => [
            _hoisted_8
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, { onClick: _ctx.saveTimeSeriesData }, {
          default: withCtx(() => [
            createVNode(_component_svg_icon, { name: "drafts-main-save" }),
            _hoisted_9
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, { onClick: _ctx.deleteCaseSequences }, {
          default: withCtx(() => [
            _hoisted_10
          ]),
          _: 1
        }, 8, ["onClick"])
      ])
    ], 32),
    createVNode(_component_el_dialog, {
      "custom-class": "time-series__dialog",
      title: "添加时序",
      width: "30%",
      modelValue: _ctx.dialogVisible,
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((_ctx.dialogVisible) = $event)),
      "close-on-click-modal": false
    }, {
      footer: withCtx(() => [
        createVNode(_component_el_button, { onClick: _ctx.cancelSequence }, {
          default: withCtx(() => [
            _hoisted_11
          ]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.addSequence
        }, {
          default: withCtx(() => [
            _hoisted_12
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_input, {
          modelValue: _ctx.sequenceName,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.sequenceName) = $event)),
          placeholder: "请输入时序名称"
        }, null, 8, ["modelValue"])
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-c8947500"]]);

export { index as default };
