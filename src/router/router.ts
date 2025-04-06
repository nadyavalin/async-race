type Route = {
  path: string;
  render: () => Promise<void>;
};

const createRouter = () => {
  const routes: Route[] = [];

  const addRoute = (path: string, render: () => Promise<void>) => {
    routes.push({ path, render });
  };

  const navigate = (path: string) => {
    const route = routes.find((r) => r.path === path);
    if (route) {
      window.location.hash = `#${path}`;
      route.render();
    }
  };

  const init = () => {
    window.addEventListener("hashchange", () => {
      const hashPath = window.location.hash.slice(1);
      const route = routes.find((r) => r.path === hashPath);
      if (route) {
        route.render();
      } else {
        navigate("/garage");
      }
    });

    const initialHash = window.location.hash.slice(1);
    const initialRoute = routes.find((r) => r.path === initialHash);
    if (initialRoute) {
      initialRoute.render();
    } else {
      navigate("/garage");
    }
  };

  return { addRoute, navigate, init };
};

export default createRouter;
