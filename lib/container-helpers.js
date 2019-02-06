const hocsList = {
  connect: {
    name: 'test',
    interfaces: [
      'StateToPropsInterface',
      'DispatchToPropsInterface'
    ],
    params: [
      'mapStateToProps',
      'mapDispatchToProps'
    ]
  },
  withStyles: {
    name: 'test',
    params: [
      'styles'
    ]
  }
};

function getHocCompose() {

}

module.exports.hocsList = hocsList;
