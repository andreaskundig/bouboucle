
// for future reference
// var simplifyAndSmooth = function(referencePath){
//     var offsets = referencePath.segments.map(function(s){
//         return referencePath.getOffsetOf(s.point);
//     });
//     referencePath.simplify();
//     var points = offsets.map(function(o){
//         return referencePath.getPointAt(o);
//     }).filter(function(p){return p;});
//     referencePath.removeSegments();
//     referencePath.addSegments(points);
//     referencePath.smooth({ type: 'catmull-rom'});
// };

export class PaperJsGraphics {
  constructor(graphicsConfig){
    this.paperScope = new graphicsConfig.paper.PaperScope()
    this.paperScope.setup(graphicsConfig.canvas);
  }

  makeLine(color, strokeWidth){
    return new PaperJsLine(this.paperScope, color, strokeWidth);
  }
}

export class PaperJsLine {

  constructor(paperScope, color, strokeWidth){
    this.paperScope = paperScope;
    this.referencePath = new paperScope.Path({visible: false});
    this.drawingPaths = [];
    this.color = color ?? "black";
    this.strokeWidth = strokeWidth ?? 2;
  }

  #makePath(){
    return new this.paperScope.Path({strokeColor: this.color,
                            strokeWidth: this.strokeWidth,
                            strokeJoin: 'round',
                            strokeCap: 'round'});
  }

  getPoints() {
    return this.referencePath.segments;
  }

  updateLines(visibleSegments){
    visibleSegments.forEach((segs, i) => {
      if (this.drawingPaths.length < i + 1) {
        // create a path without segments
        this.drawingPaths.push(this.#makePath());
        // drawingPaths[drawingPaths.length - 1].blendMode='multiply';
      }
      var path = this.drawingPaths[i];
      path.removeSegments();
      path.addSegments(segs);
      //path needs two segments to display one point :-P
      if (path.segments.length === 1) { path.add(path.segments[0]); }
    });
  }

  addPoint(point){
    var segment = { point: point };
    this.referencePath.add(segment);
  }

  smoothLastSegment(){
    var previousIndex = this.referencePath.segments.length - 2;
    this.referencePath.segments[Math.max(0, previousIndex)].smooth();
  }

  smoothAllSegments_v1(){
    if (this.referencePath.segments.length > 1) {
      this.referencePath.smooth({ type: 'catmull-rom' });
    }
  }

  smoothAllSegments_v2(){
    this.referencePath.segments.forEach(function(s){ s.smooth(); });
  }

  clear(){
    this.drawingPaths.forEach(function(drawingPath){
      drawingPath.removeSegments();
    });
  }

  importPoints(points){
    this.referencePath.removeSegments();
    this.referencePath.addSegments(points);
  }

  exportPoints(){
    return this.referencePath.segments.map(function(s){
        return [s.point.x, s.point.y]; 
    });
  }
}