import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

// const MAIN_NAV_QUERY = gql`
//   query mainNav {
//     item(path: "{8A7F47E6-564F-488C-91E6-9E11E2C1EE6A}") {
//       children {
//         ... on NavLink {
//           title {
//             value
//           }
//           link {
//             text
//             linkType
//             targetItem {
//               url
//             }
//           }
//           children {
//             ... on NavLink {
//               title {
//                 value
//               }
//               link {
//                 text
//                 linkType
//                 targetItem {
//                   url
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export interface MainNavProps extends RouteComponentProps {
  context: {
    language: string;
  };
  route?: {
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

const MainNav: React.FunctionComponent<MainNavProps> = () => {
  return <p>Nav goes here</p>
  // const { loading, error, data } = useQuery(MAIN_NAV_QUERY);
  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>Error ...</p>;
  // return (
  //   <ul>
  //     {data.item.children.map((navItem: any, index: number) => (
  //       <li key={index}>
  //         <Link to={navItem.link.targetItem.url}>{navItem.title.value}</Link>
  //       </li>
  //     ))}
  //   </ul>
  // );
};

export default withRouter(MainNav);
