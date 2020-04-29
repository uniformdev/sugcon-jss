// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'CtaBlock',
    fields: [
      { name: 'title', type: CommonFieldTypes.RichText },
      { name: 'text', type: CommonFieldTypes.RichText },
      { name: 'ctaTitle', type: CommonFieldTypes.SingleLineText },
      { name: 'ctaLink', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
