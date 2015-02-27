/*exported setupBackendMock*/
function setupBackendMock($httpBackend)
{
    'use strict';

    var sequence = 1;
    var comments = [{
                        id: sequence++, name: 'Broken', groupId: 1, category: 'Productive', color: 'Pause'
                    }, {
                        id: sequence++, name: 'Adam', groupId: 2, category: 'Productive', color: 'Pause'
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
    var sequenceGroup = 1;
    var commentsGroup = [{
                             id: sequenceGroup++, name: 'first', ordering: 12, color: 'yellow'
                         }, {
                             id: sequenceGroup++, name: 'second', ordering: 10, color: 'yellow'
                         }];


    var sequenceProduct = 0;
    var products = [
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 28},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1},
        {id: sequenceProduct++, name: 'Product ' + sequenceProduct, barcode: 'BarCode', sku: 'Sku', enabled: true, groupId: 1}
    ];

    var sequenceProductGroup = 0;
    var productsGroup = [
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup},
        {id: sequenceProductGroup++, name: 'Group ' + sequenceProductGroup}
    ];
    var lineViewSettings = {
        colormode: 1,
        normalMarker: 100,
        slowMarker: 75,
        extraSlowMarker: 25,
        stoppageMarker: 0,
        effLowLimit: 50,
        effMediumLimit: 75,
        effHighLimit: 100
    };

    var teamsSequence = 0,
        teams = [
            { id: teamsSequence++, name: 'Dobry Tim', operators: [ 10, 11 ] },
            { id: teamsSequence++, name: 'Slaby Tim', operators: [ 1, 2, 6 ] },
            { id: teamsSequence++, name: 'Mocny Tim', operators: [ 3, 5, 7 ] },
            { id: teamsSequence++, name: 'ITCrowd', operators: [ 0, 4, 8, 9 ] }
        ];

    var opSequence = 0,
        operators = [
            { id: opSequence++, firstName: 'Roman', lastName: 'Polanski', barcode: 'codebar' },
            { id: opSequence++, firstName: 'Leo', lastName: 'Messi', barcode: 'codebar' },
            { id: opSequence++, firstName: 'Maciej', lastName: 'Makula', barcode: 'codebar' },
            { id: opSequence++, firstName: 'Stanley', lastName: 'Kubrick', barcode: 'codebar' },
            { id: opSequence++, firstName: 'aaa', lastName: 'aaa', barcode: 'codebar' },
            { id: opSequence++, firstName: 'bbb', lastName: 'bbb', barcode: 'codebar' },
            { id: opSequence++, firstName: 'ccc', lastName: 'ccc', barcode: 'codebar' },
            { id: opSequence++, firstName: 'ddd', lastName: 'ddd', barcode: 'codebar' },
            { id: opSequence++, firstName: 'ee', lastName: 'ee', barcode: 'codebar' },
            { id: opSequence++, firstName: 'ff', lastName: 'ff', barcode: 'codebar' },
            { id: opSequence++, firstName: 'gg', lastName: 'gg', barcode: 'codebar' },
            { id: opSequence++, firstName: 'rr', lastName: 'rr', barcode: 'codebar' }
        ];

    var opMembership = [
        { operatorId: 0, teamId: 3 },
        { operatorId: 1, teamId: 1 },
        { operatorId: 2, teamId: 1 },
        { operatorId: 3, teamId: 2 },
        { operatorId: 4, teamId: 3 },
        { operatorId: 5, teamId: 2 },
        { operatorId: 6, teamId: 1 },
        { operatorId: 7, teamId: 2 },
        { operatorId: 8, teamId: 3 },
        { operatorId: 9, teamId: 3 },
        { operatorId: 10, teamId: 0 },
        { operatorId: 11, teamId: 0 }
    ];
    $httpBackend.whenGET('/rest/v1/comments').respond(function ()
    {
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
    $httpBackend.whenPUT(/\/rest\/v1\/comments$/).respond(function ()
    {
        return [200];
    });


    $httpBackend.whenGET('/rest/v1/commentgroups').respond(function ()
    {
        return [200, commentsGroup];
    });
    $httpBackend.whenGET('/rest/v1/defects').respond(function ()
    {
        return [200, [{id: 2, name: 'FirstDefect', groupId: 2, createdDate: new Date().getTime()}]];
    });
    $httpBackend.whenGET(/\/rest\/v1\/commentgroups\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/commentgroups\/(\d+)$/.exec(url);
        return [200, commentsGroup[match[1] - 1]];

    });
    $httpBackend.whenGET(/rest\/v1\/commentgroups\/(\d+)\/comments/).respond(function ()
    {
        return [200, []];
    });

    $httpBackend.whenGET('/rest/v1/products').respond(function ()
    {
        return [200, products];
    });

    $httpBackend.whenGET(/\/rest\/v1\/products\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/products\/(\d+)$/.exec(url);
        return [200, products[match[1]]];
    });

    $httpBackend.whenGET('/rest/v1/productgroups').respond(function ()
    {
        return [200, productsGroup];
    });

    $httpBackend.whenPUT( '/rest/v1/lineviewsettings' ).respond( function( method, url, json ) {
        lineViewSettings = JSON.parse( json );
        return [ 200 ];
    } );
    $httpBackend.whenGET( '/rest/v1/lineviewsettings' ).respond( function() {
        return [ 200, lineViewSettings ];
    } );





    $httpBackend.whenGET('/rest/v1/teams').respond(function (method, url, jsonParams)
    {
        return[ 200, teams ];
    });
    $httpBackend.whenPOST('/rest/v1/teams').respond(function (method, url, jsonParams)
    {
        var data = JSON.parse(jsonParams),
            newRow = {
                id: teamsSequence++,
                name: data.name,
                operators: []
            };
        teams.push( newRow );
        console.log( teams );
        return[ 200, newRow ];
    });
    $httpBackend.whenPUT(/\/rest\/v1\/teams\/(\d+)$/).respond(function (method, url, jsonParams)
    {
        var data = JSON.parse(jsonParams),
            toUpdate = -1;

        for( var i=0; i<teams.length; i++ )
            if( teams[ i ].id === parseInt( data.id ) ) {
                toUpdate = i;
                break;
            }
        teams[ toUpdate ] = data;

        return[ 200 ];
    });


    $httpBackend.whenGET(/\/rest\/v1\/teams\/(\d+)\/operators/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)\/operators/.exec(url),
            realIndex = -1,
            result = [];

        for( var i=0; i<teams.length; i++ )
            if( teams[ i ].id === parseInt( match[ 1 ] ) ) {
                realIndex = i;
                break;
            }

        angular.forEach( teams[ realIndex ].operators, function( elem ) {
            result.push( operators[ elem ] );
        } );

        return[ 200, result ];
    });
    $httpBackend.whenPOST(/\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/.exec(url);

        console.log( 'Jesli tu bedzie blad to tylko z winy mockowanego backendu' );

        teams[ parseInt( match[ 1 ] ) ].operators.push( parseInt( match[ 2 ] ) );

        return[ 200 ];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)\/operators\/(\d+)$/.exec(url),
            realIndex;

        realIndex = teams[ parseInt( match[ 1 ] ) ].operators.indexOf( parseInt( match[ 2 ] ) );

        if( realIndex > -1 ) {
            teams[ parseInt( match[ 1 ] ) ].operators = teams[ parseInt( match[ 1 ] ) ].operators.splice( realIndex, 1 );
            return[ 200 ];
        }
        else
            return[ 404 ];
    });
    $httpBackend.whenDELETE(/\/rest\/v1\/teams\/(\d+)$/).respond(function (method, url)
    {
        var match = /\/rest\/v1\/teams\/(\d+)$/.exec(url);
        var toDelete = -1;


        for( var i=0; i<teams.length; i++ )
            if( teams[ i ].id === parseInt( match[ 1 ] ) ) {
                toDelete = i;
                break;
            }

        if( toDelete > -1 ) {
            teams.splice( toDelete, 1 );
            return [200];
        }
        else
            return [404];
    });
    $httpBackend.whenGET('/rest/v1/operators').respond(function ()
    {
        return[ 200, operators ];
    });


    $httpBackend.whenGET(/.*\.html/).passThrough();
    $httpBackend.whenGET(/\/rest\/v1\?|\/.*/).passThrough();
    $httpBackend.whenPOST(/\/rest\/v1\?|\/.*/).passThrough();
    $httpBackend.whenPUT(/\/rest\/v1\?|\/.*/).passThrough();
    $httpBackend.whenDELETE(/\/rest\/v1\?|\/.*/).passThrough();
}

