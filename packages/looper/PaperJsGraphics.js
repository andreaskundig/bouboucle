
class PaperJsLineGfx {

  constructor(paperScope, color, strokeWidth){
    this.paperScope = paperScope;
    this.referencePath = new paperScope.Path({visible: false});
    this.drawingPaths = [];
    this.color = color;
    this.strokeWidth = strokeWidth
  }

  #makePath(){
    return new this.paperScope.Path({strokeColor: this.color,
                            strokeWidth: this.strokeWidth,
                            strokeJoin: 'round',
                            strokeCap: 'round'});
  }

  getReferencePoints() {
    this.referencePath.segments;
  }

  updateLines(visibleSegments){
    visibleSegments.forEach(function(segs, i){
      if (drawingPaths.length < i + 1) {
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

  addReferencePoint(point){
    var segment = { point: point };
    this.referencePath.add(segment);
  }

  smoothLastReferenceSegment(){
    var previousIndex = referencePath.segments.length - 2;
    this.referencePath.segments[Math.max(0, previousIndex)].smooth();
  }

  smoothAllReferenceSegments_v1(){
    if (this.referencePath.segments.length > 1) {
      this.referencePath.smooth({ type: 'catmull-rom' });
    }
  }

  smoothAllReferenceSegments_v2(){
    this.referencePath.segments.forEach(function(s){ s.smooth(); });
  }

  clear(){
    this.drawingPaths.forEach(function(drawingPath){
      drawingPath.removeSegments();
    });
  }

  exportReferencePoints(){
    return this.referencePath.segments.map(function(s){
        return [s.point.x, s.point.y]; 
    });
  }

  importReferencePoints(segments) {
    this.referencePath.removeSegments();
    this.referencePath.addSegments(segments);
  }
}