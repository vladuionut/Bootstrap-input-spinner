 (function($) {
     $.fn.spinner = function(options) {
         var defaults = {
             verticalButtons: true,
             max: 100,
             min: 0,
             checkButtons: true,
             stepUpdateRate: 100,
             step: 1,
             decimals: 0,
             upIcon: "glyphicon glyphicon-plus",
             downIcon: "glyphicon glyphicon-minus"
         };
         var settings = $.extend({}, defaults, options);

         function Spinner(el, options) {
             this._settings = options;
             this._value;
             this._element = (el instanceof jQuery) ? el : $(el);
             this._container;
             this.upButton;
             this.downButton;
             this._container;
             this._spinnerTimer;
             this._buttonsContainer;
             this._createContainer = function() {
                 if (this._element.closest(".spinner").length == 0) {
                     this._element.wrap('<div class="input-group spinner">');                 }

                 this._container = this._element.closest(".spinner");
             };
             this._createButtons = function() {
                 this._buttonsContainer = $('<div class="input-group-btn-vertical">');
                 this.upButton = $('<button class="btn btn-default"><i class="' + this._settings.upIcon + '"></i></button>');
                 this.downButton = $('<button class="btn btn-default"><i class="' + this._settings.downIcon + '"></i></button>');
                 this._buttonsContainer.append(this.upButton);
                 this._buttonsContainer.append(this.downButton);
                 this._container.append(this._buttonsContainer);
             };
             this._checkButtons = function() {
                 if (!this._settings.checkButtons) {
                     return;
                 }
                 if (this._element.val() < this._settings.max || this._settings.max == undefined) {
                     this.upButton.prop("disabled", false);
                 } else {
                     this.upButton.prop("disabled", true);
                 }
                 if (this._element.val() > this._settings.min || this._settings.min == undefined) {
                     this.downButton.prop("disabled", false);
                 } else {
                     this.downButton.prop("disabled", true);
                 }
             };
             this._triggerEvent = function(eventName){
                 this._element.trigger(eventName);
             },
             this._initEvents = function() {
                 var butoane = $(this.upButton).add(this.downButton);

                 butoane.mousedown((function(e) {
                     var btn = e.currentTarget;
                     this._stopSpinnerTimer();
                     this._checkValue();
                     if (btn == this.upButton.get(0)) {
                         this._increaseValue(this._settings.step);
                         this._spinnerTimer = setInterval((function() {
                             if (!this._increaseValue(this._settings.step)) {
                                 if (this._settings.checkButtons) {
                                     $(btn).prop("disabled", true);
                                 }
                                 this._stopSpinnerTimer();
                             }
                         }).bind(this), this._settings.stepUpdateRate);
                     } else {
                         this._increaseValue(-this._settings.step);
                         this._spinnerTimer = setInterval((function() {
                             if (!this._increaseValue(-this._settings.step)) {
                                 if (this._settings.checkButtons) {
                                     $(btn).prop("disabled", true);
                                 }
                                 this._stopSpinnerTimer();
                             }
                         }).bind(this), this._settings.stepUpdateRate);
                     }
                     this._checkButtons();
                 }).bind(this));
                 butoane.mouseup((function() {
                     this._stopSpinnerTimer();
                     this._triggerEvent("change");
                 }).bind(this));
                 butoane.mouseout((function() {
                     this._stopSpinnerTimer();
                     this._triggerEvent("change");
                 }).bind(this));
                 this._element.on("blur", (function() {
                     this._checkValue();
                     this._checkButtons();
                 }).bind(this));

                 this._element.on('keydown', (function(event) {
                     var keyCode = event.keyCode || event.which;

                     this._stopSpinnerTimer();
                     this._checkValue();
                     if (keyCode === 38) {
                         this._increaseValue(this._settings.step);
                         this._spinnerTimer = setInterval((function() {
                             if (!this._increaseValue(this._settings.step)) {
                                 this._stopSpinnerTimer();
                             }
                         }).bind(this), this._settings.stepUpdateRate);
                         event.preventDefault();
                     }
                     else if (keyCode === 40) {
                         this._increaseValue(-this._settings.step);
                         this._spinnerTimer = setInterval((function() {
                             if (!this._increaseValue(-this._settings.step)) {
                                 this._stopSpinnerTimer();
                             }
                         }).bind(this), this._settings.stepUpdateRate);
                         event.preventDefault();
                     }
                 }).bind(this));
                 this._element.on('keyup', (function(ev) {
                     this._stopSpinnerTimer();
                     this._checkButtons();
                     this._triggerEvent("change");
                 }).bind(this));
             };
             this._checkValue = function() {
                 var value = parseFloat(this._element.val());
                 if (isNaN(value)) {
                     (this._settings.min == undefined) ? this._element.val(0): this._element.val(this._settings.min);
                 } else {
                     if (value > this._settings.max && this._settings.max != undefined) {
                         this._element.val(this._settings.max)
                     }
                     if (value < this._settings.min && this._settings.min != undefined) {
                         this._element.val(this._settings.min)
                     }
                 }
             };
             this._stopSpinnerTimer = function() {
                 clearInterval(this._spinnerTimer);
             };
             this._roudValue = function(value) {
                 return (Math.round(value / settings.step) * settings.step).toFixed(settings.decimals);
             };
             this._increaseValue = function(value) {
                 if ((value > 0 && (this._settings.max == undefined || parseFloat(this._element.val()) < parseFloat(this._settings.max))) ||
                     (value < 0 && (this._settings.min == undefined || parseFloat(this._element.val()) > parseFloat(this._settings.min)))) {
                     this._value = this._roudValue(parseFloat(this._element.val()) + value);
                     this._element.val(this._value);
                     return true;
                 }
                 return false;
             }
             this.init = function() {
                 this._createContainer();
                 this._createButtons();
                 this._initEvents();
             };
             this.destroy = function() {
                 var container = this._element.closest(".spinner");
                 if (!(container.length > 0)) return;
                 var buttonsContainer = container.find(".input-group-btn-vertical");
                 buttonsContainer.remove();
                 this._element.unwrap();
                 console.log("destroy");
             }
         }
         this.each(function() {
             var spinner = new Spinner(this, settings);
             if (options && typeof(options) == 'string') {
                 if (typeof spinner[options] == "function") {
                     spinner[options].call(spinner);
                 }
                 return;
             }
             spinner.init();
         });
         return this;
     };
 }(jQuery));