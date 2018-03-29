import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
var HistoricalEncounterDataService = (function () {
    function HistoricalEncounterDataService() {
        this.dataSources = {};
    }
    HistoricalEncounterDataService.prototype.registerEncounters = function (name, encounters) {
        var _this = this;
        var encStore = {
            data: [],
            getValue: function (key, index) {
                if (index === void 0) { index = 0; }
                var pathArray = key.split('.');
                if (pathArray.length > 0) {
                    return _this.getFirstValue(pathArray, encStore.data[index]);
                }
                return encStore.data[index][key];
            },
            getAllObjects: function () {
                return encStore.data;
            },
            getSingleObject: function (index) {
                if (index === void 0) { index = 0; }
                return encStore.data[index];
            }
        };
        if (_.isArray(encounters)) {
            var group_1 = [];
            _.each(encounters, function (encounter) {
                group_1.push(_this._transformEncounter(encounter));
            });
            // Sort them in reverse chronological order
            encStore.data = _.sortBy(group_1, 'encounterDatetime').reverse();
        }
        else {
            // Assume a single openmrs rest encounter object.
            encStore.data.push(this._transformEncounter(encounters));
        }
        this.putObject(name, encStore);
    };
    HistoricalEncounterDataService.prototype.putObject = function (name, object) {
        this.dataSources[name] = object;
    };
    HistoricalEncounterDataService.prototype.getObject = function (name) {
        return this.dataSources[name] || null;
    };
    HistoricalEncounterDataService.prototype.getFirstValue = function (path, object) {
        var answers = [];
        this.getAllValues(path, object, answers);
        if (answers.length > 0) {
            return {
                value: answers[0],
                valueDate: moment(object.encounterDatetime).format('ll')
            };
        }
    };
    HistoricalEncounterDataService.prototype.getAllValues = function (path, object, answers) {
        var _this = this;
        if (_.isNil(object)) {
            return;
        }
        if (path.length <= 1) {
            if (!_.isNil(object[path[0]])) {
                answers.push(object[path[0]]);
            }
            return;
        }
        var newpath = path.splice(1);
        var key = path[0];
        if (_.isArray(object[key]) && object[key].length > 0) {
            _.each(object[key], function (childObject) {
                _this.getAllValues(newpath.slice(0), childObject, answers);
            });
        }
        else {
            this.getAllValues(newpath.slice(0), object[key], answers);
        }
    };
    HistoricalEncounterDataService.prototype._transformEncounter = function (encounter) {
        if (_.isNil(encounter)) {
            return;
        }
        // Transform encounter Level details to key value pairs.
        var prevEncounter = {
            encounterDatetime: encounter.encounterDatetime
        };
        if (encounter.location && encounter.location.uuid) {
            prevEncounter.location = encounter.location.uuid;
        }
        if (encounter.patient && encounter.patient.uuid) {
            prevEncounter.patient = encounter.patient.uuid;
        }
        if (encounter.form && encounter.form.uuid) {
            prevEncounter.form = encounter.form.uuid;
        }
        if (encounter.encounterType && encounter.encounterType.uuid) {
            prevEncounter.encounterType = encounter.encounterType.uuid;
        }
        if (encounter.provider) {
            var provider = encounter.provider;
            prevEncounter.provider = provider.uuid;
        }
        // Deal with obs.
        if (encounter.obs) {
            var processedObs = this._transformObs(encounter.obs);
            // add in individual processed obs to prevEncounter
            _.extend(prevEncounter, processedObs);
        }
        return prevEncounter;
    };
    HistoricalEncounterDataService.prototype._transformObs = function (obs) {
        var _this = this;
        if (!obs) {
            return null;
        }
        var obsRep = {};
        if (_.isArray(obs)) {
            _.each(obs, function (singleObs) {
                _this._augumentObs(obsRep, _this._transformObs(singleObs));
            });
            return obsRep;
        }
        else if (obs.groupMembers) {
            var group_2 = {};
            _.each(obs.groupMembers, function (member) {
                _this._augumentObs(group_2, _this._transformObs(member));
            });
            // Handle already existing data
            if (obsRep[obs.concept.uuid] && _.isArray(obsRep[obs.concept.uuid])) {
                obsRep[obs.concept.uuid].push(group_2);
            }
            else {
                obsRep[obs.concept.uuid] = [group_2];
            }
            return obsRep;
        }
        else {
            if (obs.value instanceof Object) {
                obsRep[obs.concept.uuid] = obs.value.uuid;
            }
            else {
                obsRep[obs.concept.uuid] = obs.value;
            }
            return obsRep;
        }
    };
    HistoricalEncounterDataService.prototype._augumentObs = function (existing, toAdd) {
        for (var key in toAdd) {
            if (_.has(existing, key)) {
                // check if not an array yet
                if (!_.isArray(existing[key])) {
                    var temp = existing[key];
                    existing[key] = [temp];
                }
                // Check whether the incoming is array (for group members)
                if (_.isArray(toAdd[key])) {
                    Array.prototype.push.apply(existing[key], toAdd[key]);
                }
                else {
                    existing[key].push(toAdd[key]);
                }
            }
            else {
                existing[key] = toAdd[key];
            }
        }
        return existing;
    };
    return HistoricalEncounterDataService;
}());
export { HistoricalEncounterDataService };
HistoricalEncounterDataService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HistoricalEncounterDataService.ctorParameters = function () { return []; };
//# sourceMappingURL=historical-encounter-data.service.js.map