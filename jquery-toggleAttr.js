// jQuery toggleAttr() method.
// George Adamson 2014
// Eg:
// $('DIV').toggleAttr( 'disabled' )            // Add or remove disabled attribute on each DIV.
// $(':text').toggleAttr( 'readonly', false )   // Remove readonly attribute on each textbox.
// $(':checkbox').toggleAttr( 'checked', true)  // Add checked attribute on each checkbox.
// $(':checkbox').toggleAttr( 'checked', fn )   // Run function on each checkbox to decide whether to add or remove checked attribute.
//
// Note: By writing each condition on one line we enable the minimiser to convert them to inline-conditions to reduce code side.
// This could be written with a fraction less code if the conditions were moved into the loops,
// but using a separate loop after each condition should be slightly more performant on larger collections.

/* jshint laxcomma:true, asi:true, debug:true, curly:false, camelcase:true, browser:true */
/* global define */

;(function (factory) {

  // Register as an anonymous AMD module if relevant, otherwise assume oldskool browser globals:
  if (typeof define === "function" && define.amd)
    define(["jquery"], factory);
  else
    factory(jQuery);

})(function( $ ) {

  if( !$.fn.toggleAttr ){

    // Define which jQuery methods to use to add and remove attributes:
    var addAttr    = 'attr'
      , removeAttr = 'removeAttr'

    $.fn.toggleAttr = function( attr, toggle ){

      var self = this
      var args = arguments.length

      // Do nothing if no params provided: (ie fail safely)
      if( args === 0 ){
        
        return self

      // When toggle arg not provided, add attribute where not present, remove it where prosent:
      } else if( args === 1 ){
      
        return self.each(function(){

          $(this)[ $(this).attr(attr) ? removeAttr : addAttr ]( attr, attr )
        
        })

      // Otherwise when both attr & toggle arguments have been provided:
      } else {
        
        // When toggle is a function, apply it to each element:
        if( $.isFunction( toggle ) ){
        
          return self.each(function(){

            $(this)[ toggle.call(this) ? addAttr : removeAttr ]( attr, attr )
          
          })

        // Or add attr if toggle is truthy, remove attr if toggle is falsey:
        } else {

          return self[ toggle ? addAttr : removeAttr ]( attr, attr )
        
        }
      
      }

    }

  }

});