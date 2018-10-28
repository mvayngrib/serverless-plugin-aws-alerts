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
          [ 'AWS/ApiGateway', 'IntegrationLatency', 'ApiName', apiName, { stat: 'p50', period: 900, region: '${AWS::Region}' } ],
          [ 'AWS/ApiGateway', 'Latency', 'ApiName', apiName, { stat: 'p50', period: 900, region: '${AWS::Region}' } ],
          [ 'AWS/ApiGateway', 'IntegrationLatency', 'ApiName', apiName, { stat: 'p90', period: 900, region: '${AWS::Region}' } ],
          [ 'AWS/ApiGateway', 'Latency', 'ApiName', apiName, { stat: 'p90', period: 900, region: '${AWS::Region}' } ]
      ],
      region: '${AWS::Region}',
    }
  };

  return widget;
};

module.exports = {
  createWidget,
};
