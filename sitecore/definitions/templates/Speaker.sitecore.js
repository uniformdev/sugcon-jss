// eslint-disable-next-line no-unused-vars
import {
  CommonFieldTypes,
  Manifest,
} from "@sitecore-jss/sitecore-jss-manifest";

/**
 * This is the data template for an individual _item_ in the Styleguide's Content List field demo.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addTemplate({
    name: "Speaker",
    fields: [
      { name: "name", type: CommonFieldTypes.SingleLineText },
      { name: "company", type: CommonFieldTypes.SingleLineText },
      { name: "jobTitle", type: CommonFieldTypes.SingleLineText },
      { name: "picture", type: CommonFieldTypes.Image },
    ],
  });
}
