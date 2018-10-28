'use strict';

const createWidget = (config) => {
  const apiName = '${AWS::StackName}';

  const widget = {
    type: 'metric',
    x: config.coordinates.x,
    y: config.coordinates.y,
    width: config.coordinates.width,
    height: config.coordinates.height,
    properties: {
      title: config.title,
      view: 'timeSeries',
      stacked: false,
      metrics: [
          [ 'AWS/ApiGateway', '5XXError', 'ApiName', apiName, { stat: 'Sum', period: 900 } ],
          [ 'AWS/ApiGateway', '4XXError', 'ApiName', apiName, { stat: 'Sum', period: 900 } ],
          [ 'AWS/ApiGateway', 'Count', 'ApiName', apiName, { stat: 'Sum', period: 900 } ]
      ],
      region: '${AWS::Region}',
    }
  };

  return widget;
};

module.exports = {
  createWidget,
};
