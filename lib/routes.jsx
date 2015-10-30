FlowRouter.route('/',{
  name: 'Home', 
  action(params) {
    ReactLayout.render(MainLayout, { 
      header:   <MainHeader />,
      content:  <MainMap />
    });
  }
});