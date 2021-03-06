/*exported setupBackendMock*/
function setupBackendMock($httpBackend)
{
    'use strict';


    var sequenceProduct = 0;
    var products = [{
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 28
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }, {
                        id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1
                    }];

    var sequenceProductGroup = 0;
    var productsGroup = [{
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }, {
                             id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup
                         }];
    var lineViewSettings = {
        colormode: 1, normalMarker: 100, slowMarker: 75, extraSlowMarker: 25, stoppageMarker: 0, effLowLimit: 50, effMediumLimit: 75, effHighLimit: 100
    };

    var teamsSequence = 0, teams = [{
                                        id: teamsSequence++, name: 'Dobry Tim', operators: [10, 11]
                                    }, {
                                        id: teamsSequence++, name: 'Slaby Tim', operators: [1, 2, 6]
                                    }, {
                                        id: teamsSequence++, name: 'Mocny Tim', operators: [3, 5, 7]
                                    }, {
                                        id: teamsSequence++, name: 'ITCrowd', operators: [0, 4, 8, 9]
                                    }];

    //Comments
    var sequenceGroup = 1;
    var commentsGroup = [{
                             id: sequenceGroup++, name: 'first', ordering: 12, color: 'yellow'
                         }, {
                             id: sequenceGroup++, name: 'second', ordering: 10, color: 'yellow'
                         }];
    var sequence = 1;
    var comments = [{
                        id: sequence++, name: 'Broken', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Adam', groupId: 2, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Simple', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Broken', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Phone', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Mock', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Backend', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Cat', groupId: 1, category: 'Productive', color: 'Pause'
                    }];
    $httpBackend.whenGET('/rest/v1/comments').respond(function ()
    {
        comments = comments.map(function (element)
        {
            for (var i = 0; i < commentsGroup.length; i++) {
                if (element.groupId === commentsGroup[i].id) {
                    element.color = commentsGroup[i].color;
                }
            }
            return element;
        });
        return [200, comments];
    });
    $httpBackend.whenPOST(/\/rest\/v1\/comments$/).respond(function (method, url, jsonParams)
    {

        var comment = JSON.parse(jsonParams);
        comment.id = sequence++;
        comments.push(comment);
        return [200, comment];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/comments\/(\d+)/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/comments\/(\d+)/.exec(url);
        var searchIndex = -1;
        comments = comments.map(function (element, index)
        {
            if (element.id === parseInt(match[1], 10)) {
                searchIndex = index;
            }
            return element;
        });
        if (-1 < searchIndex) {
            comments.splice(searchIndex, 1);
            return [200];
        } else {
            return [404];
        }

    });
    $httpBackend.whenPUT(/\/rest\/v1\/comments\/(\d+)$/).respond(function (method, url, jsonParams)
    {
        var comment = JSON.parse(jsonParams);
        if (comment.hasOwnProperty('id')) {
            comments = comments.map(function (element)
            {
                if (element.id === comment.id) {
                    return comment;
                }
                return element;
            });
            return [200];
        } else {
            return [404];
        }
    });


    //commentsGroup
    $httpBackend.whenGET('/rest/v1/commentgroups').respond(function ()
    {
        return [200, commentsGroup];
    });
    $httpBackend.whenGET(/\/rest\/v1\/commentgroups\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/commentgroups\/(\d+)$/.exec(url);
        return [200, commentsGroup[match[1] - 1]];

    });
    $httpBackend.whenPOST(/\/rest\/v1\/commentgroups$/).respond(function (method, url, json)
    {
        var data = JSON.parse(json);
        commentsGroup.push(data);
        return [200];

    });
    $httpBackend.whenPUT(/\/rest\/v1\/commentgroups\/(\d+)$/).respond(function (method, url, json)
    {
        var match = /\/rest\/v1\/commentgroups\/(\d+)$/.exec(url);
        commentsGroup[match[1] - 1] = JSON.parse(json);
        return [200];

    });
    $httpBackend.whenDELETE(/\/rest\/v1\/commentgroups\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/commentgroups\/(\d+)$/.exec(url);
        var searchIndex = -1;
        commentsGroup = commentsGroup.map(function (element, index)
        {
            if (element.id === parseInt(match[1], 10)) {
                searchIndex = index;
            }
            return element;
        });
        if (-1 < searchIndex) {
            commentsGroup.splice(searchIndex, 1);
            return [200];
        } else {
            return [404];
        }

    });
    $httpBackend.whenGET(/rest\/v1\/commentgroups\/(\d+)\/comments/).respond(function ()
    {
        return [200, []];
    });

    //stations
    var stationSeq = 1;
    var stationDefect = [{
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }, {
                             stationId: stationSeq++, name: 'first', description: 'some text', groupId: 1, stopTime: true
                         }, {
                             stationId: stationSeq++, name: 'second', description: 'second text', groupId: 2, enabled: true
                         }];
    $httpBackend.whenGET('/rest/v1/stations').respond(function ()
    {
        return [200, stationDefect];
    });
    $httpBackend.whenPOST('/rest/v1/stations').respond(function (method, url, json)
    {
        var station = JSON.parse(json);
        station.stationId = stationSeq++;
        stationDefect.push(station);
        return [200];
    });
    $httpBackend.whenPUT(/\/rest\/v1\/stations\/(\d+)$/).respond(function (method, url, json)
    {
        var match = /\/rest\/v1\/stations\/(\d+)$/.exec(url);
        stationDefect[match[1] - 1] = JSON.parse(json);
        return [200, stationDefect[match[1] - 1]];
    });
    $httpBackend.whenGET(/\/rest\/v1\/stations\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/stations\/(\d+)$/.exec(url);
        return [200, stationDefect[match[1] - 1]];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/stations\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/stations\/(\d+)/.exec(url);
        var searchIndex = -1;
        stationDefect = stationDefect.map(function (element, index)
        {
            if (element.stationId === parseInt(match[1], 10)) {
                searchIndex = index;
            }
            return element;
        });
        if (-1 < searchIndex) {
            stationDefect.splice(searchIndex, 1);
            return [200];
        } else {
            return [404];
        }

    });


    //stationGroup
    stationSeq = 1;
    var stationGroup = [{
                            id: stationSeq++, name: 'backendMock', description: 'simpleTest'
                        }, {
                            id: stationSeq++, name: 'secondStation', description: 'simpleTest'
                        }];
    $httpBackend.whenGET('/rest/v1/stationgroup').respond(function ()
    {
        return [200, stationGroup];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/stationgroup\/(\d+)$/).respond(function (method, url, json)
    {
        var match = /\/rest\/v1\/stationgroup\/(\d+)$/.exec(url);
        var searchIndex = -1;
        stationGroup = stationGroup.map(function (element, index)
        {
            if (element.id === parseInt(match[1], 10)) {
                searchIndex = index;
            }
            return element;
        });
        if (-1 < searchIndex) {
            stationGroup.splice(searchIndex, 1);
            return [200];
        } else {
            return [404];
        }
    });
    $httpBackend.whenPOST('/rest/v1/stationgroup').respond(function (method, url, json)
    {
        var station = JSON.parse(json);
        stationGroup.id = stationSeq++;
        stationGroup.push(station);
        return [200];
    });
    $httpBackend.whenPUT(/\/rest\/v1\/stationgroup\/(\d+)$/).respond(function (method, url, json)
    {
        var match = /\/rest\/v1\/stationgroup\/(\d+)$/.exec(url);
        stationGroup[match[1] - 1] = JSON.parse(json);
        return [200, stationGroup[match[1] - 1]];
    });
    $httpBackend.whenGET(/\/rest\/v1\/stationgroup\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/stationgroup\/(\d+)$/.exec(url);
        return [200, stationGroup[match[1] - 1]];
    });


    //products
    $httpBackend.whenGET('/rest/v1/products').respond(function ()
    {
        return [200, products];
    });
    $httpBackend.whenPOST('/rest/v1/products').respond(function (method, url, json)
    {
        var data = JSON.parse(json);
        data.id = sequenceProduct++;
        products.push(data);
        return [200, {}];
    });
    $httpBackend.whenGET(/\/rest\/v1\/products\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/products\/(\d+)$/.exec(url);
        return [200, products[match[1]]];
    });
    $httpBackend.whenPUT(/\/rest\/v1\/products\/(\d+)$/).respond(function (method, url, json)
    {
        var match = /\/rest\/v1\/products\/(\d+)$/.exec(url);
        products[match[1]] = JSON.parse(json);
        return [200, products[match[1]]];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/products\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/products\/(\d+)$/.exec(url);
        var searchIndex = -1;
        products = products.map(function (element, index)
        {
            if (element.id === parseInt(match[1], 10)) {
                searchIndex = index;
            }
            return element;
        });
        if (-1 < searchIndex) {
            products.splice(searchIndex, 1);
            return [200];
        } else {
            return [404];
        }
    });


    // - - - - - - lineViewSettings


    var lineViewSettings = {
        colormode: 1, normalMarker: 100, slowMarker: 75, extraSlowMarker: 25, stoppageMarker: 0, effLowLimit: 50, effMediumLimit: 75, effHighLimit: 100
    };


    $httpBackend.whenPUT('/rest/v1/lineviewsettings').respond(function (method, url, json)
    {
        lineViewSettings = JSON.parse(json);
        return [200];
    });
    $httpBackend.whenGET('/rest/v1/lineviewsettings').respond(function ()
    {
        return [200, lineViewSettings];
    });


    // - - - - - - teams


    var teamsSequence = 0, teams = [{
                                        teamId: teamsSequence++, name: 'Dobry Tim', operators: [10]
                                    }, {
                                        teamId: teamsSequence++, name: 'Slaby Tim', operators: [1, 2, 6, 11]
                                    }, {
                                        teamId: teamsSequence++, name: 'Mocny Tim', operators: [3, 5, 7]
                                    }, {
                                        teamId: teamsSequence++, name: 'ITCrowd', operators: [0, 4, 8, 9]
                                    }];


    $httpBackend.whenGET('/rest/v1/teams').respond(function ()
    {
        return [200, teams];
    });
    $httpBackend.whenPOST('/rest/v1/teams').respond(function (method, url, jsonParams)
    {
        var data = JSON.parse(jsonParams), newRow = {
            id: teamsSequence++, name: data.name, operators: []
        };
        teams.push(newRow);
        return [200, newRow];
    });
    $httpBackend.whenPUT(/\/rest\/v1\/teams\/(\d+)$/).respond(function (method, url, jsonParams)
    {
        var data = JSON.parse(jsonParams), toUpdate = -1;

        for (var i = 0; i < teams.length; i++) {
            if (teams[i].id === parseInt(data.id)) {
                toUpdate = i;
                break;
            }
        }
        teams[toUpdate] = data;

        return [200];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/teams\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)$/.exec(url);
        var toDelete = -1;

        for (var i = 0; i < teams.length; i++) {
            if (teams[i].id === parseInt(match[1])) {
                toDelete = i;
                break;
            }
        }

        if (toDelete > -1) {
            teams.splice(toDelete, 1);
            return [200];
        } else {
            return [404];
        }
    });


    // - - - - - operators membership


    var opMembership = [{
                            operatorId: 0, teamId: 3
                        }, {
                            operatorId: 1, teamId: 1
                        }, {
                            operatorId: 2, teamId: 1
                        }, {
                            operatorId: 3, teamId: 2
                        }, {
                            operatorId: 4, teamId: 3
                        }, {
                            operatorId: 5, teamId: 2
                        }, {
                            operatorId: 6, teamId: 1
                        }, {
                            operatorId: 7, teamId: 2
                        }, {
                            operatorId: 8, teamId: 3
                        }, {
                            operatorId: 9, teamId: 3
                        }, {
                            operatorId: 10, teamId: 0
                        }, {
                            operatorId: 11, teamId: 0
                        }];


    $httpBackend.whenGET(/\/rest\/v1\/teams\/(\d+)\/operators/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)\/operators/.exec(url), realIndex = -1, result = [];

        for (var i = 0; i < teams.length; i++) {
            if (teams[i].teamId === parseInt(match[1])) {
                realIndex = i;
                break;
            }
        }

        if (realIndex < 0) {
            return [404];
        }
        console.log('ad');

        angular.forEach(teams[realIndex].operators, function (elem)
        {
            result.push(operators[elem]);
        });

        return [200, result];
    });
    $httpBackend.whenPOST(/\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/.exec(url);

        console.log('Jesli tu bedzie blad to tylko z winy mockowanego backendu');

        teams[parseInt(match[1])].operators.push(parseInt(match[2]));

        return [200];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/.exec(url), realIndex;

        realIndex = teams[parseInt(match[1])].operators.indexOf(parseInt(match[2]));


        if (realIndex > -1) {
            teams[parseInt(match[1])].operators = teams[parseInt(match[1])].operators.splice(realIndex, 1);
            return [404];
        } else {
            return [404];
        }
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/teams\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)$/.exec(url);
        var toDelete = -1;


        for (var i = 0; i < teams.length; i++) {
            if (teams[i].id === parseInt(match[1])) {
                toDelete = i;
                break;
            }
        }

        if (toDelete > -1) {
            teams.splice(toDelete, 1);
            return [200];
        } else {
            return [404];
        }
    });


    // - - - - - operators


    var opSequence = 0, operators = [{
                                         id: opSequence++, firstname: 'Roman', lastname: 'Polanski', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'Leo', lastname: 'Messi', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'Maciej', lastname: 'Makula', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'Stanley', lastname: 'Kubrick', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'aaa', lastname: 'aaa', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'bbb', lastname: 'bbb', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'ccc', lastname: 'ccc', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'ddd', lastname: 'ddd', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'ee', lastname: 'ee', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'ff', lastname: 'ff', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'gg', lastname: 'gg', barcode: 'codebar'
                                     }, {
                                         id: opSequence++, firstname: 'rr', lastname: 'rr', barcode: 'codebar'
                                     }];


    $httpBackend.whenGET('/rest/v1/operators').respond(function ()
    {
        return [200, operators];
    });

    $httpBackend.whenPUT(/\/rest\/v1\/operators\/(\d+)$/).respond(function (method, url, jsonParams)
    {
        var match = /\/rest\/v1\/operators\/(\d+)$/.exec(url);
        var data = JSON.parse(jsonParams);
        var toUpdate = -1;


        for (var i = 0; i < operators.length; i++) {
            if (operators[i].id === parseInt(match[1])) {
                toUpdate = i;
                break;
            }
        }

        if (toUpdate > -1) {
            operators[toUpdate] = data;
            return [200];
        } else {
            return [404];
        }
    });

    $httpBackend.whenPOST('/rest/v1/operators').respond(function (method, url, jsonParams)
    {
        var data = JSON.parse(jsonParams);

        operators.push(angular.extend(data, {id: opSequence++}));

        return [200];
    });

    $httpBackend.whenDELETE(/\/rest\/v1\/operators\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/operators\/(\d+)$/.exec(url);
        var toDelete = -1;

        for (var i = 0; i < operators.length; i++) {
            if (operators[i].id === parseInt(match[1])) {
                toDelete = i;
                break;
            }
        }

        if (toDelete > -1) {
            operators.splice(toDelete, 1);
            return [200];
        } else {
            return [404];
        }
    });
    var deviceSeq = 1;
    var devices = [{
                       id: deviceSeq++, description: 'first', inputs: 2123
                   }, {
                       id: deviceSeq++, description: 'second', inputs: 23
                   }, {
                       id: deviceSeq++, description: 'third', inputs: 213
                   }];
    $httpBackend.whenGET('/rest/v1/device').respond(function ()
    {
        return [200, devices];
    });
    $httpBackend.whenPUT(/\/rest\/v1\/device\/(\d+)$/).respond(function (method, url, json)
    {
        var match = /\/rest\/v1\/device\/(\d+)$/.exec(url);
        devices[match[1] - 1] = JSON.parse(json);
        return [200, devices[match[1] - 1]];
    });
    $httpBackend.whenPOST('/rest/v1/device').respond(function (method, url, json)
    {
        var data = JSON.parse(json);
        data.id = deviceSeq++;
        devices.push(data);
        return [200, data];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/device\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/device\/(\d+)$/.exec(url);
        var searchIndex = -1;
        devices = devices.map(function (element, index)
        {
            if (element.id === parseInt(match[1], 10)) {
                searchIndex = index;
            }
            return element;
        });
        if (-1 < searchIndex) {
            devices.splice(searchIndex, 1);
            return [200];
        } else {
            return [404];
        }
    });

    $httpBackend.whenGET(/.*\.html/).passThrough();
    $httpBackend.whenGET(/\/rest\/v1\?|\/.*/).passThrough();
    $httpBackend.whenPOST(/\/rest\/v1\?|\/.*/).passThrough();
    $httpBackend.whenPUT(/\/rest\/v1\?|\/.*/).passThrough();
    $httpBackend.whenDELETE(/\/rest\/v1\?|\/.*/).passThrough();
}

