import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Helmet from "react-helmet";
import { Placeholder } from "@sitecore-jss/sitecore-jss-react";
import Nav from "./Nav";
import Footer from "./Footer";

export interface MainContainerProps extends RouteComponentProps {
  context: {
    language: string;
  };
  route: {
    name: string;
    itemId: string;
    templateName: string;
    fields: {
      browserTitle: {
        value: string;
      };
    };
  };
}

const MainContainer: React.FunctionComponent<MainContainerProps> = ({
  route,
  context,
}) => {
  console.log({ route });
  return (
    <>
      <Helmet>
        <title>SUGCON</title>
      </Helmet>
      <Nav context={context} route={route as any} />
      <Placeholder
        name="sugcon-main"
        rendering={route as any}
        route={route as any}
      />
      <Footer context={context} route={route as any} />
    </>
  );
};

export default withRouter(MainContainer);
