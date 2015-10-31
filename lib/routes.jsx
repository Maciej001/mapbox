FlowRouter.route('/',{
  name: 'Home', 
  action(params) {
    ReactLayout.render(MainLayout, { 
      header:   <MainHeader />,
      content:  <MainMap />
    });
  }
});

FlowRouter.route("/admin", {
  name: "Admin",
  action(params) {
    ReactLayout.render(MainLayout, {
      header:   <MainHeader />,
      content:  <Admin />
    })
  }
});
