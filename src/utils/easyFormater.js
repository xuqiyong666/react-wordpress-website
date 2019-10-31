
import _ from "lodash"
import moment from "moment"

const easyFormater = {
  format: function(value, formatFlag, opts){
  
    switch(formatFlag){
      case "int":
        return this.format_int(value);
      case "float":
        return this.format_float(value);
      case "percent":
        return this.format_percent(value);
      case "duration":
        return this.format_duration(value);
      case "averageDuration":
        return this.format_duration(value);
      case "game_duration":
        return this.format_duration(value);
      case "boolean":
        if(opts && opts.language==="en"){
          return this.format_en_boolean(value)
        }else{
          return this.format_boolean(value)
        }
      case "win":
        return this.format_win(value)
      case "date":
        return this.format_date_from_timestamp(value)
      case "time":
        return this.format_time_from_timestamp(value)
      case "date_and_time":
        return this.format_date_and_time_from_timestamp(value)
      default:
        return value
    }
  },
  format_int: function(value){

    var intValue = _.parseInt(value);
    var absValue = Math.abs(intValue);
    var head, tail;

    if(intValue < 0){
      head = "-";
    }else{
      head = "";
    }

    if(absValue > 10000000){
      tail = (_.parseInt(_.divide(absValue, 1000000))) + "m"
    }else if(absValue > 10000){
      tail = (_.parseInt(_.divide(absValue, 1000))) + "k"
    }else{
      tail = absValue
    }

    return "" + head + tail;
  },
  format_float: function(value){

    if(value === 0){
      return "0"
    }

    var absValue = Math.abs(value);
    var head, tail;

    if(value < 0){
      head = "-";
    }else{
      head = "";
    }

    if(absValue >= 100){
      tail = absValue.toFixed(0);
    }else if(absValue >= 1){
      tail = absValue.toFixed(2);
    }else{
      tail = absValue.toFixed(2);
    }

    return "" + head + tail;
  },
  format_percent: function(value){

    if(value === 0){
      return "0%"
    }

    return (value * 100.0).toFixed(1) + "%"

  },
  format_duration: function(value){

    var valueInMinutes = _.parseInt(value / 60);
    var seconds = _.parseInt(value % 60);

    var hours = _.parseInt(valueInMinutes / 60);
    var minutes = _.parseInt(valueInMinutes % 60);

    if(hours > 0){
      return "" + this.rjust(hours, 2, "0") + ":" + this.rjust(minutes, 2, "0") + ":" + this.rjust(seconds, 2, "0")
    }else{
      return "" + this.rjust(minutes, 2, "0") + ":" + this.rjust(seconds, 2, "0")
    }    
  },
  format_average_duration: function(value){

      var minutes = _.parseInt(value / 60),
        minutesTail = _.parseInt(value % 60);

      return "" + this.rjust(minutes, 2, "0") + ":" + this.rjust(minutesTail, 2, "0");
  },
  rjust: function( obj, width, padding ) {

      var string = obj.toString();

      padding = padding || " ";
      padding = padding.substr( 0, 1 );
      if ( string.length < width )
        return padding.repeat( width - string.length ) + string;
      else
        return string;
  },
  format_boolean: function(value){
    if(value===true){
      return "是"
    }else if(value===false){
      return "否"
    }else{
      return value
    }
  },
  format_en_boolean: function(value){
    if(value===true){
      return "Yes"
    }else if(value===false){
      return "No"
    }else{
      return value
    }
  },
  format_win: function(value){
    if(value===true){
      return "胜"
    }else if(value===false){
      return "负"
    }else{
      return value
    }
  },
  format_date_from_timestamp: function(timestamp){
    var time = new Date(timestamp * 1000)
    return this.format_date(time)
  },
  format_time_from_timestamp: function(timestamp){
    var time = new Date(timestamp * 1000)
    return this.format_time(time)
  },
  format_date: function(time){
    return moment(time).format("YYYY-MM-DD")
  },
  format_time: function(time){
    return moment(time).format("HH:mm:ss")
  },
  format_date_and_time_from_timestamp: function(timestamp){

    var time = new Date(timestamp * 1000)

    return this.format_date_and_time(time)
  },
  format_date_and_time: function(time){
    return this.format_date(time) + " " + this.format_time(time)
  }
}

export default easyFormater