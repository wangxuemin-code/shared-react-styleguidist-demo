"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Formatter_1 = require("./Formatter");
var DateTime = (function () {
    function DateTime() {
    }
    DateTime.getDateDifferenceString = function (startDate, endDate) {
        var endMoment = moment(endDate);
        var startMoment = moment(startDate);
        var duration = moment.duration(endMoment.diff(startMoment));
        var hours = Math.round(duration.asHours());
        if (hours >= 24) {
            return Formatter_1.default.pluralize(Math.round(duration.asDays()), 'day');
        }
        else if (hours <= 1) {
            return Formatter_1.default.pluralize(Math.round(duration.asMinutes()), 'minute');
        }
        else {
            return Formatter_1.default.pluralize(Math.round(hours), 'hour');
        }
    };
    DateTime.minusDateByDays = function (input, dayNumber) {
        var date = moment(input)
            .subtract(dayNumber, 'd')
            .toDate();
        return date;
    };
    return DateTime;
}());
exports.default = DateTime;
//# sourceMappingURL=DateTime.js.map