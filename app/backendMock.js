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
                  }];
  var sequenceGroup = 1;
  var commentsGroup = [{
                         id: sequenceGroup++, name: 'first', order: 'now', color: 'yellow'
                       }, {
                         id: sequenceGroup++, name: 'second', order: 'now', color: 'yellow'
                       }];
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
  $httpBackend.whenPUT(/\/rest\/v1\/comments$/).respond(function (method, url, jsonParams)
  {
    return [200];
  });


  $httpBackend.whenGET(/.*\.html/).passThrough();
  $httpBackend.whenGET(/\/rest\/v1\?|\/.*/).passThrough();
  $httpBackend.whenPOST(/\/rest\/v1\?|\/.*/).passThrough();
}
