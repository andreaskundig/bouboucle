export default function makeLine(color, strokeWidth, lifetime, start, beat, multiPrd, graphics) {
    var data = {start: start,
                last: null,
                beat: beat || 2000,
                lifetime: lifetime || 500,
                color: color || "black",
                strokeWidth: strokeWidth || 2,
                //TODO accept only values 'auto', 'repeat' and falsy
                // currently we have 'auto', 1 and falsy
                multiPeriod: isNaN(multiPrd) ? 'auto' : parseFloat(multiPrd),
                times: [] };
    var gLine = graphics.makeLine(data.color, data.strokeWidth);
    var setLast = function(dateNow){
        // The end time of the line, after the last point is drawn.
        // This is important when there is no interval duration,
        // as it keeps the line from restarting immediately.
        /* .start    .dateNow
           ----------> last */
        var last = dateNow - data.start;
        /* If we're going back in time, Dates are deaths, not births.
                  .dateNow   .start
                  <----------  (uncorrected last)
         --------->            lifetime  
         <-------------------  last */
        last = last < 0 ? last - data.lifetime : last;
        data.last = last;
    };
   
    var calculateDuration = function(totalElapsedTime){
        if(data.multiPeriod > 0){
            return beat;
        } else if (data.last !== null && data.multiPeriod == 'auto'){
            /* ---------->    last + lifetime
               ......>......> beats
               .............> duration:
                 lowest multiple of beats greater than last 
             */
            var life = Math.abs(data.last) + data.lifetime;
            var intvCount =  Math.ceil(life/beat);
            // var intvCount =  Math.ceil(Math.abs(data.last)/beat);
            return Math.max(1, intvCount) * beat;
        } else if (data.last !== null && data.multiPeriod === 0){
            return Math.abs(data.last) + data.lifetime + 1;
        }else{ 
            // no data.last: the line is being drawn right now
            return totalElapsedTime + 1;
        }
    };

    var calculateTime =  function(dateNow){
        /*
         Calculates the time since the beginning of the current interval.

         .start                          .dateNow
         --------------------------------> totalElapsedTime

         .....>.....>.....>.....>.....> beats (if multiPeriod) 
                                       --> elapsed (since last looper interval)

         ...........>...........> line durations (if not multiPeriod) 
                                 --------> elapsed (since last line interval)

         .dateNow                        .start
         <-------------------------------- totalElapsedTime
      .....>.....>.....>.....>.....>.....> beats (if multiPeriod) 
      ---> elapsed (since last looper interval)
      ...........>...........> line durations 
      --------> elapsed (since last line interval)

         */
        var totalElapsedTime = dateNow - data.start;
        var duration = calculateDuration(totalElapsedTime);
        // Time since the start of last interval.
        var elapsed = totalElapsedTime % duration;
        /* elapsed time can be negative when speed < 0
         .start                      .start + duration
         .-----------------> elapsed = now
         
         .start - duration           .start
                   elapsed <---------. 
         ------------------> now = elapsed + duration
         */
        elapsed = elapsed < 0 ? duration + elapsed : elapsed;
        return {now: elapsed, duration: duration};
    };

    var isAlive = function(now, data, i) {
        var birth = data.times[i];
        return birth <= now && now < birth + data.lifetime;
    };
    return {
        calculateTime: calculateTime,
        calculateDuration: calculateDuration,
        getMultiPeriod: function(){ return data.multiPeriod; },
        segmentsToShow:  function(referencePathSegments, now){
            return referencePathSegments.filter((_, i) => isAlive(now, data, i));
        },
        periodSegmentsToShow:  function(referencePathSegments, dateNow){
            var periodsWithData = 1; 
            var ts = data.times;
            var t  = calculateTime(dateNow);
            var first = ts.length > 0 ? Math.min(ts[ts.length-1], ts[0]) : 0;
            var emptyPeriods = 0;
            if(data.multiPeriod > 0 || data.last !== null){
                // Shift to negative period if line was recorded in reverse.
                emptyPeriods = Math.floor(first / t.duration);
            }
            if(data.multiPeriod > 0 && ts.length > 0 ){
                var last = Math.max(ts[ts.length-1], ts[0]) + data.lifetime;
                var totalPeriods = Math.floor(last / t.duration);
                //var totalPeriods = Math.floor(last / (t.duration+data.lifetime);
                periodsWithData = totalPeriods - emptyPeriods + 1;
            }
            var periodSegments = [];
            for(var i = 0; i < periodsWithData; i++){
                var timeOffset = (emptyPeriods + i) * t.duration || 0;
                var segs = this.segmentsToShow(referencePathSegments, t.now + timeOffset);
                periodSegments.push(segs); 
            }
            return periodSegments;
        },
        redraw: function(dateNow){
            // Segments in our sense: groups of points
            var visibleSegments = this.periodSegmentsToShow(gLine.getPoints(), dateNow);
            gLine.updateLines(visibleSegments)
        },
        pushSegment: function(point, dateNow){
            var birth = dateNow - data.start;
            if(birth < 0){
                /* Going backwards, segments appear at death time.
                .birth      .dateNow
                ------------>  lifetime */
                birth -= lifetime;
            }
            data.times.push(birth);
            gLine.addPoint(point)
            
            gLine.smoothLastSegment()
        },
        completeCreation: function(absoluteLast){
            setLast(absoluteLast);
            gLine.smoothAllSegments_v1() // check difference with v2

            // unfortunately, this is too expensive. Try a worker?
            //https://developer.mozilla.org/en-US/docs/Web/API/Worker
            //simplifyAndSmooth(referencePath);
        },
        clear: function(){
            gLine.clear();
        },
        exportData: function(){
            return gLine.exportPoints();
        },
        importData: function(newdata){
            this.clear();

            gLine.importPoints(newdata.segments);

            gLine.smoothAllSegments_v2(); // check difference with v1
            
            //don't delete the segments, they might be needed for redo
            // but why was this even deleted in the first place?
            //delete newdata.segments;
            data = newdata;
            data.start = data.start;
        },
        getLastUpdateTime: function(){
            var length =  data.times.length ;
            return  data.start + data.times[length-1] || 0 ;
        }
    };
};
